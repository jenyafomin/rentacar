import { getActiveCars, getCarById, getFeaturedCars,  } from "@/back/models/car.model";
import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getServerLocale";
import { NextRequest, NextResponse } from "next/server";
import { Methods_Get_Cars } from "./methods.enum";

export async function GET(req: NextRequest, res: NextResponse) {
  const locale = getApiLocale(req)
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  const method = params.get("method");

  console.log("method:", method);
  try {
    if(id) {
      const car = await getCarById(id);
      if(!car) {
        return NextResponse.json({error: "Car Not Found"}, {status: 404})
      } else {
        return NextResponse.json(car)
      }
    } else {
      let cars: Array<any>;
      switch (method) {
        case Methods_Get_Cars.FEATURED:
          cars = await getFeaturedCars();
          break
        case Methods_Get_Cars.GET_ALL_SHORT:
        default:
          cars = await getActiveCars();
      }
      return NextResponse.json(cars)
    }
  } catch (error) {
    console.error("[GET /api/cars] error:", error);
    return NextResponse.json({error: "Internal Server Error" }, {status: 500})
  }
}
