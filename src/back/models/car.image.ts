import {v4 as uuidv4} from "uuid";
import { uploadToS3, deleteFromS3 } from "@/back/utils/s3Service";

/**
 * Валидирует и сохраняет изображения автомобилей в S3
 */
export async function saveCarImages(formData: FormData, namePrefix: string) {
    const fileUrls: string[] = [];
    const filesStreams = formData.getAll('images') as Array<any>;
    
    // Обработка ошибок при загрузке нескольких файлов
    const uploadErrors: string[] = [];
    
    // Максимальный размер файла (10 МБ)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    
    for (const fileStream of filesStreams) {
        try {
            if (typeof fileStream === "string") {
                // Если файл уже загружен (URL), добавляем в список
                console.log("Существующий файл URL:", fileStream);
                fileUrls.push(fileStream);
            } else {
                console.log("Загрузка нового файла:", fileStream.name, "Размер:", fileStream.size);
                
                // Проверка размера файла
                if (fileStream.size > MAX_FILE_SIZE) {
                    uploadErrors.push(`Файл ${fileStream.name} слишком большой (${Math.round(fileStream.size / 1024 / 1024)}MB). Максимальный размер: 10MB`);
                    continue;
                }
                
                // Проверка, что файл является изображением
                if (!fileStream.type.startsWith('image/')) {
                    uploadErrors.push(`Файл ${fileStream.name} не является изображением`);
                    continue;
                }
                
                // Формирование имени файла
                const splitName = fileStream.name.split(".");
                const extension = splitName[splitName.length-1].toLowerCase();
                
                // Проверка допустимых расширений
                const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
                if (!allowedExtensions.includes(extension)) {
                    uploadErrors.push(`Недопустимое расширение файла ${fileStream.name}. Разрешены только: ${allowedExtensions.join(', ')}`);
                    continue;
                }
                
                // Создание уникального имени файла
                const sanitizedPrefix = namePrefix.replace(/[^a-z0-9]/gi, '-').toLowerCase();
                const fileName = `${sanitizedPrefix}-${uuidv4()}.${extension}`;
                const uploadDir = '/img/cars';

                // *** Загрузка файла в S3 ***
                const fileUrl = await uploadToS3(fileStream, fileName, uploadDir);
                fileUrls.push(fileUrl);
            }
        } catch (error: any) {
            console.error(`Ошибка при загрузке файла:`, error);
            
            // Проверяем специфические ошибки
            if (error.message && error.message.includes('413')) {
                uploadErrors.push(`Файл слишком большой для загрузки. Попробуйте сжать изображение.`);
            } else {
                uploadErrors.push(`Ошибка загрузки: ${error?.message || error}`);
            }
            continue; // Продолжаем обработку других файлов вместо return
        }
    }
    
    // Если есть ошибки, выбрасываем исключение с детальной информацией
    if (uploadErrors.length > 0) {
        throw new Error(`Ошибки при загрузке файлов: ${uploadErrors.join('; ')}`);
    }
    
    return fileUrls;
}

/**
 * Удаляет изображения автомобилей из S3
 */
export async function removeCarImages(filePaths: string[]) {
    const deleteErrors: string[] = [];
    
    for (const filePath of filePaths) {
        try {
            await deleteFromS3(filePath);
        } catch (error: any) {
            console.error(`Ошибка при удалении файла ${filePath}:`, error);
            deleteErrors.push(`Не удалось удалить ${filePath}: ${error?.message || error}`);
        }
    }
    
    if (deleteErrors.length > 0) {
        throw new Error(`Ошибки при удалении файлов: ${deleteErrors.join('; ')}`);
    }
}