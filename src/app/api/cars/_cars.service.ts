import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../back-end/db/prisma/connection";
import { createCar, getAllCars } from "./_cars.module";

export async function httpGetCars(req: NextApiRequest, res: NextApiResponse) {
    const cars = await getAllCars()
    res.status(200).json(cars);
}

export async function httpCreateNewCar(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    const newCar = await createCar(body);
    res.status(200).json(newCar);
}