import { prisma } from "@/back/prismaConnect";
import { ICar } from "types/Car";

export async function createCar(car: ICar) {
    console.log("NEW CAR (BEFORE):", car);
    const newCar = await prisma.car.create({data: car})
    console.log("NEW CAR (AFTER):", newCar);
    return newCar;
}
