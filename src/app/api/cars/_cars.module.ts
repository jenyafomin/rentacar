import { Car } from "@prisma/client";
import { prisma } from "../../../back-end/db/prisma/connection";
import { EStatus } from "../../../types/enum/EStatus";

export async function getAllCars() {
    const cars = await prisma.car.findMany({ select: {
        make: true,
        model: true,
        year: true,
        color: true,
        type: true
    }})
    return cars
}
export async function getActiveCars() {
    const cars = await prisma.car.findMany({where: {status: EStatus.ACTIVE}})
    return cars
}

export async function createCar(car: Car) {
    return await prisma.car.create({data: {...car}})
}