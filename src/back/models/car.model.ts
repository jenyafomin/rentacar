import { prisma } from "@/back/prismaConnect";
import { saveImage } from "@/back/utils/saveImage";
import { ICar } from "types/Car";

export async function createCar(car: ICar) {
    const newCar = await prisma.car.create({ data: car })
    return newCar;
}

export async function updateCar(id: string, car: Partial<ICar>) {
    const updatedCar = await prisma.car.update({ where: { id }, data: car })
    return updatedCar;
}

export async function getCarById(id: string) {
    return await prisma.car.findUnique({where: {id}})
}

export async function deleteCarById(id: string) {
    return await prisma.car.delete({where: {id}})
}