import { NextRequest, NextResponse } from "next/server";
import { removeCarImages, saveCarImages } from "./carImage.service";
import { getErrorMessage } from "@/back/utils/getErrorMessage";
import { getCarById, updateCar } from "@/back/models/car.model";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const carId = formData.get("id");
        if(!carId) {
            throw new Error("id of the car is not provided");
        }

        const car = await getCarById(carId as string);
        const filePrefix = `${car?.make}-${car?.model}-${car?.year}-${car?.color}`

        const images = await saveCarImages(formData, filePrefix);
        console.log("IMAGES URLS", images);

        const updatedCar = await updateCar(carId as any, {images})


        // Respond with success
        return new NextResponse(JSON.stringify(updatedCar));
    } catch (e) {
        const error = getErrorMessage(e)
        console.error('Upload images:', error);
        return new NextResponse(JSON.stringify({ error }), { status: 500 });
    }
}

// * DELETE files/images
export async function PUT(req: NextRequest) {
    const filesToDelete = await req.json();
    try {
        await removeCarImages(filesToDelete);
        return NextResponse.json({success: true, removed: filesToDelete})
    } catch(e) {
        const error = getErrorMessage(e)
        console.error('[ERROR] remove images:', error);
        return new NextResponse(JSON.stringify({ error }), { status: 500 });
    }
}