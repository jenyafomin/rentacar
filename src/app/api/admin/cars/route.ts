import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getServerLocale";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { Car } from "@prisma/client";
import { getErrorMessage } from "@/back/utils/getErrorMessage";
import { createCar, deleteCarById, getAllCars, updateCar } from "@/back/models/car.model";


export async function GET(req: NextRequest, res: NextResponse) {
    const locale = getApiLocale(req)
    const cars = await getAllCars();
    return NextResponse.json(cars)
}

export async function POST(req: NextRequest) {
    const car = await req.json() as Car;
    try {
        const newCar = await createCar(car);

        revalidateTag("cars")
        return new NextResponse(JSON.stringify(newCar));
    } catch (error) {
        console.error('[ERROR] CREATE CAR:\n', error);
        console.error('CAR:', car);
        return new NextResponse(JSON.stringify({ error: 'Car Failed' }), { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const body = await req.json() as {id: string, car: Partial<Car>}
    try {
        const {id, car} = body;

        if(!id) {
            throw new Error("Invalid request. <id> is not set")
        }
        if(!car) {
            throw new Error("Invalid request. <car> is not set")
        }

        const updatedCar = await updateCar(id, car);

        revalidateTag("cars")
        return NextResponse.json(updatedCar)
    } catch (e) {
        const error = getErrorMessage(e)
        console.error("[ERROR] UPDATE CAR\n", e)
        console.log("\n\n=========\nERROR MESSAGE:", error);
        return NextResponse.json({error}, {status: 500})
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams
        const id = params.get("id");

        if(id) {
            const deletedCar = await deleteCarById(id)
            revalidateTag("cars")
            return NextResponse.json(deletedCar)
        } else {
            return NextResponse.json({error: "Invalid Request. id is not provided"}, {status: 400})
        }


    } catch(e) {
        const error = getErrorMessage(e);
        console.error('[ERROR] Delete a car:\n',error)
        return NextResponse.json({ error })
    }
    
}