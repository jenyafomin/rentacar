import { s3Client } from "@/s3Client";
import {  PutObjectCommand, DeleteObjectCommand, GetBucketLocationCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import sharp from "sharp";

// Конфигурация AWS
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION || "eu-central-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
//   }
// });
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

// Максимальный размер файла (10 МБ)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Допустимые типы файлов
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Оптимизирует изображение перед загрузкой
 */
async function optimizeImage(file: Buffer, fileType: string): Promise<Buffer> {
  try {
    console.log('🔄 Обработка изображения с автокоррекцией ориентации EXIF...');
    
    // Получаем метаданные изображения для отладки
    const metadata = await sharp(file).metadata();
    console.log('📊 Метаданные изображения:', {
      width: metadata.width,
      height: metadata.height,
      orientation: metadata.orientation,
      format: metadata.format,
      exif: metadata.exif ? 'присутствует' : 'отсутствует'
    });
    
    // Базовая обработка с автоматической коррекцией ориентации
    let sharpInstance = sharp(file)
      .rotate() // Автоматически поворачивает изображение согласно EXIF ориентации
      .withMetadata({ orientation: 1 }); // Сбрасываем EXIF ориентацию на нормальную

    // Для JPEG и PNG файлов используем сжатие
    if (fileType === 'image/jpeg') {
      const result = await sharpInstance
        .jpeg({ quality: 80, progressive: true })
        .toBuffer();
      console.log('✅ JPEG обработан и сохранен с правильной ориентацией');
      return result;
    } else if (fileType === 'image/png') {
      const result = await sharpInstance
        .png({ quality: 80, progressive: true })
        .toBuffer();
      console.log('✅ PNG обработан и сохранен с правильной ориентацией');
      return result;
    } else if (fileType === 'image/webp') {
      const result = await sharpInstance
        .webp({ quality: 80 })
        .toBuffer();
      console.log('✅ WebP обработан и сохранен с правильной ориентацией');
      return result;
    }
    
    // Для других типов все равно применяем коррекцию ориентации
    const result = await sharpInstance.toBuffer();
    console.log('✅ Изображение обработано с коррекцией ориентации');
    return result;
  } catch (error) {
    console.error('Ошибка при оптимизации изображения:', error);
    return file; // Возвращаем оригинальный файл в случае ошибки
  }
}

/**
 * Загружает файл в S3 с проверками и оптимизацией
 */
export async function uploadToS3(
  fileStream: any,
  fileName: string,
  uploadDir: string,
  generateThumbnail = true
): Promise<string> {
  const checkBucketRegion = async () => {
    const { LocationConstraint } = await s3Client.send(
      new GetBucketLocationCommand({ Bucket: BUCKET_NAME })
    );
    console.log("Bucket actual region:", LocationConstraint, BUCKET_NAME);
  };
  await checkBucketRegion();
  try {
    // Проверка типа файла
    if (!ALLOWED_FILE_TYPES.includes(fileStream.type)) {
      throw new Error(`Недопустимый тип файла. Разрешены то лько: ${ALLOWED_FILE_TYPES.join(', ')}`);
    }

    // Проверка размера файла
    if (fileStream.size > MAX_FILE_SIZE) {
      throw new Error(`Размер файла превышает максимально допустимый (${MAX_FILE_SIZE / 1024 / 1024} МБ)`);
    }

    // Чтение файла в буфер
    const buffer = Buffer.from(await fileStream.arrayBuffer());
    
    // Оптимизация изображения
    const optimizedBuffer = await optimizeImage(buffer, fileStream.type);

    // Полный путь к файлу в хранилище
    const key = `${uploadDir.replace(/^\/+/, '')}/${fileName}`;

    // Использование Upload из AWS SDK для потоковой загрузки
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: optimizedBuffer,
        ContentType: fileStream.type,
        // CacheControl: 'max-age=31536000', // Кэширование на 1 год
      },
    });

    // Обработчик прогресса загрузки (опционально)
    upload.on('httpUploadProgress', (progress) => {
      console.log(`Прогресс загрузки: ${progress.loaded}/${progress.total}`);
    });

    await upload.done();

    // Генерация миниатюры, если требуется
    // if (generateThumbnail && ALLOWED_FILE_TYPES.includes(fileStream.type)) {
    //   const thumbnail = await sharp(buffer)
    //     .resize(200, 200, { fit: 'inside' })
    //     .toBuffer();
      
    //   const thumbnailKey = `${uploadDir.replace(/^\/+/, '')}/thumbnails/${fileName}`;
      
    //   await s3Client.send(new PutObjectCommand({
    //     Bucket: BUCKET_NAME,
    //     Key: thumbnailKey,
    //     Body: thumbnail,
    //     ContentType: fileStream.type,
    //     CacheControl: 'max-age=31536000',
    //   }));
    // }

    // Возвращаем полный URL файла
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error: any) {
    console.error('Ошибка при загрузке в S3:', error);
    throw new Error(`Не удалось загрузить файл: ${error?.message || error}`);
  }
}

/**
 * Удаляет файл из S3
 */
export async function deleteFromS3(fileUrl: string): Promise<void> {
  try {
    // Извлечение ключа из URL
    const urlObj = new URL(fileUrl);
    const key = urlObj.pathname.substring(1); // Убираем начальный слеш

    // Удаление файла
    await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }));

    // Попытка удалить миниатюру, если она существует
    const keyParts = key.split('/');
    const fileName = keyParts.pop();
    const folderPath = keyParts.join('/');
    
    const thumbnailKey = `${folderPath}/thumbnails/${fileName}`;
    
    try {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: thumbnailKey,
      }));
    } catch (thumbnailError) {
      // Игнорируем ошибку, если миниатюра не существует
      console.log(`Миниатюра не найдена или не удалена: ${thumbnailKey}`);
    }
    
  } catch (error: any) {
    console.error('Ошибка при удалении файла из S3:', error);
    throw new Error(`Не удалось удалить файл: ${error?.message || error}`);
  }
} 