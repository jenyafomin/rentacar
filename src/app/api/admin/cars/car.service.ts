import { prisma } from "@/back/prismaConnect";
import { saveImage } from "@/back/utils/saveImage";
import { ICar } from "types/Car";

export async function createCar(car: ICar) {
    const newCar = await prisma.car.create({ data: car })
    return newCar;
}

export async function updateCar(carId: string, car: Partial<ICar>) {
    const updatedCar = await prisma.car.update({ where: { id: carId }, data: car })
    return updatedCar;
}