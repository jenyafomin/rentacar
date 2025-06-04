import { NextRequest, NextResponse } from "next/server";
import { removeCarImages, saveCarImages } from "@/back/models/car.image";
import { getErrorMessage } from "@/back/utils/getErrorMessage";
import { getCarById, updateCar } from "@/back/models/car.model";

// Для App Router - экспортируем максимальную длительность выполнения
export const maxDuration = 60; // 60 секунд

// * CREATE files/images
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const carId = formData.get("id");
        if (!carId) {
            return new NextResponse(
                JSON.stringify({ error: "ID автомобиля не указан" }), 
                { status: 400 }
            );
        }

        const car = await getCarById(carId as string);
        if (!car) {
            return new NextResponse(
                JSON.stringify({ error: "Автомобиль не найден" }), 
                { status: 404 }
            );
        }

        const filePrefix = `${car.make}-${car.model}-${car.year}-${car.color}`

        try {
            const images = await saveCarImages(formData, filePrefix);
            if (!images) {
                return new NextResponse(
                    JSON.stringify({ error: "Не удалось сохранить изображения" }), 
                    { status: 500 }
                );
            }
            
            console.log("Загруженные изображения:", images);

            // Если есть существующие изображения, добавляем новые к ним
            // const updatedImages = [...(car.images || []), ...images];
            const updatedImages = images;
            
            const updatedCar = await updateCar(carId as string, { images: updatedImages });
            console.log("Обновленный автомобиль:", updatedCar);
            return new NextResponse(JSON.stringify(updatedCar));
        } catch (uploadError: any) {
            console.error('Ошибка загрузки изображений:', uploadError);
            return new NextResponse(
                JSON.stringify({ error: `Ошибка загрузки изображений: ${uploadError?.message || uploadError}` }), 
                { status: 500 }
            );
        }
    } catch (e) {
        const error = getErrorMessage(e);
        console.error('Общая ошибка при обработке запроса:', error);
        return new NextResponse(JSON.stringify({ error }), { status: 500 });
    }
}

// * DELETE files/images
export async function PUT(req: NextRequest) {
    try {
        const filesToDelete = await req.json();
        
        if (!Array.isArray(filesToDelete) || filesToDelete.length === 0) {
            return new NextResponse(
                JSON.stringify({ error: "Необходимо указать список файлов для удаления" }), 
                { status: 400 }
            );
        }
        
        await removeCarImages(filesToDelete);
        return NextResponse.json({success: true, removed: filesToDelete});
    } catch(e) {
        const error = getErrorMessage(e);
        console.error('[ОШИБКА] удаление изображений:', error);
        return new NextResponse(JSON.stringify({ error }), { status: 500 });
    }
}