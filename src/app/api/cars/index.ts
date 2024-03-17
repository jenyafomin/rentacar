import { prisma } from "../../../back-end/db/prisma/connection";
import { ECarType } from "../../../types/enum/ECarType";
import { handleMethods } from "../utils/_methods";
import { createCarDto } from "./_cars.dto";
import { httpCreateNewCar, httpGetCars } from "./_cars.service";

export default async function handler(req, res) {
  await handleMethods(req, res, {
    GET: {
      execute: httpGetCars
    },
    POST: {
      dto: createCarDto,
      execute: httpCreateNewCar
    }
  });
}
