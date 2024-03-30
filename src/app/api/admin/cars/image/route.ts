import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getLocale";
import { NextRequest, NextResponse } from "next/server";
import { saveCarImages } from "./carImage.service";
import { updateCar } from "../car.service";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const carId = formData.get("id");
        if(!carId) {
            throw new Error("id of the car is not provided");
        }
        
        const images = await saveCarImages(formData);
        console.log("IMAGES URLS", images);

        const updatedCar = await updateCar(carId as any, {images})


        // Respond with success
        return new NextResponse(JSON.stringify(updatedCar));
    } catch (error) {
        console.error('Upload error:', error);
        return new NextResponse(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
    }
}