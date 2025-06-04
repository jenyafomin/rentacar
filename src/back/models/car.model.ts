import { prisma } from "@/back/prismaConnect";
import { ICar } from "types/Car";
import { ECarStatus } from "types/enum/ECar";

export async function getAllCars(searchParams?: {
  isAvailable?: boolean | string | null;
}) {
  const { isAvailable } = searchParams || {};
  const isAvailableBool =
    isAvailable === undefined || isAvailable === null
      ? undefined
      : ["true", "1", true].includes(isAvailable);
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    where: { isAvailable: isAvailableBool },
  });
  return cars;
}

export async function getActiveCars(searchParams?: {
  isAvailable?: boolean | string | null;
}) {
  const { isAvailable } = searchParams || {};
  const isAvailableBool =
    isAvailable === undefined || isAvailable === null
      ? undefined
      : ["true", "1", true].includes(isAvailable);
  const cars = await prisma.car.findMany({
    where: { status: ECarStatus.ACTIVE, isAvailable: isAvailableBool },
  });
  return cars;
}

export async function getFeaturedCars(searchParams?: {
  isAvailable?: boolean | string | null;
}) {
  const { isAvailable } = searchParams || {};
  const isAvailableBool =
    isAvailable === undefined || isAvailable === null
      ? undefined
      : ["true", "1", true].includes(isAvailable);
  const cars = await prisma.car.findMany({
    where: { isFeatured: true, isAvailable: isAvailableBool },
  });
  return cars;
}

export async function createCar(car: ICar) {
  const newCar = await prisma.car.create({ data: car });
  return newCar;
}

export async function updateCar(id: string, car: Partial<ICar>) {
  const updatedCar = await prisma.car.update({ where: { id }, data: car });
  return updatedCar;
}

export async function getCarById(id: string) {
  return await prisma.car.findUnique({ where: { id } });
}

export async function deleteCarById(id: string) {
  return await prisma.car.delete({ where: { id } });
}
