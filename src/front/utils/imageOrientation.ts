/**
 * Утилиты для работы с ориентацией изображений на клиентской стороне
 */

/**
 * Читает EXIF ориентацию из файла изображения
 */
export function getImageOrientation(file: File): Promise<number> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const view = new DataView(e.target?.result as ArrayBuffer);
      if (view.getUint16(0, false) !== 0xFFD8) {
        resolve(1); // Не JPEG файл
        return;
      }
      
      const length = view.byteLength;
      let offset = 2;
      
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) break;
        const marker = view.getUint16(offset, false);
        offset += 2;
        
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) break;
          
          const little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              const orientation = view.getUint16(offset + (i * 12) + 8, little);
              resolve(orientation);
              return;
            }
          }
        } else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      resolve(1); // По умолчанию нормальная ориентация
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Применяет коррекцию ориентации к изображению на canvas
 */
export function correctImageOrientation(
  img: HTMLImageElement, 
  orientation: number,
  canvas?: HTMLCanvasElement
): HTMLCanvasElement {
  const tempCanvas = canvas || document.createElement('canvas');
  const ctx = tempCanvas.getContext('2d')!;
  
  const { width, height } = img;
  
  // Устанавливаем размеры canvas в зависимости от ориентации
  if (orientation >= 5 && orientation <= 8) {
    tempCanvas.width = height;
    tempCanvas.height = width;
  } else {
    tempCanvas.width = width;
    tempCanvas.height = height;
  }
  
  // Применяем трансформации
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, width, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, width, height);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, height);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, height, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, height, width);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, width);
      break;
    default:
      // Ориентация 1 - без изменений
      break;
  }
  
  ctx.drawImage(img, 0, 0);
  return tempCanvas;
}

/**
 * Конвертирует File в исправленный blob с правильной ориентацией
 */
export async function fixImageOrientation(file: File, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    getImageOrientation(file).then((orientation) => {
      if (orientation === 1) {
        // Ориентация нормальная, возвращаем оригинальный файл
        resolve(file);
        return;
      }
      
      console.log(`🔄 Исправляем ориентацию изображения: ${orientation}`);
      
      const img = new Image();
      img.onload = () => {
        const canvas = correctImageOrientation(img, orientation);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const correctedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            console.log('✅ Ориентация изображения исправлена на клиенте');
            resolve(correctedFile);
          } else {
            reject(new Error('Не удалось создать исправленное изображение'));
          }
        }, file.type, quality);
      };
      
      img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
      img.src = URL.createObjectURL(file);
    }).catch(reject);
  });
}

/**
 * Создает превью изображения с правильной ориентацией
 */
export async function createOrientedPreview(file: File): Promise<string> {
  const orientation = await getImageOrientation(file);
  
  if (orientation === 1) {
    return URL.createObjectURL(file);
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = correctImageOrientation(img, orientation);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Не удалось создать превью'));
        }
      }, file.type, 0.8);
    };
    img.onerror = () => reject(new Error('Не удалось загрузить изображение для превью'));
    img.src = URL.createObjectURL(file);
  });
} 