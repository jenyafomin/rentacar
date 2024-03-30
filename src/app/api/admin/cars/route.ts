import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getLocale";
import { NextRequest, NextResponse } from "next/server";
import { createCar } from "./car.service";
import { revalidateTag } from "next/cache";


export async function GET(req: NextRequest, res: NextResponse) {
    const locale = getApiLocale(req)
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
}

export async function POST(req: NextRequest) {
    const car = await req.json()
    try {
        const newCar = await createCar(car);

        revalidateTag("cars")
        return new NextResponse(JSON.stringify(newCar));
    } catch (error) {
        console.error('Upload error:', error);
        console.error('CAR:', car);
        return new NextResponse(JSON.stringify({ error: 'Car Failed' }), { status: 500 });
    }
}