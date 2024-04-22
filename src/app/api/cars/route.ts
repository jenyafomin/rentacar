import { getActiveCars, getCarById, getFeaturedCars,  } from "@/back/models/car.model";
import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getServerLocale";
import { NextRequest, NextResponse } from "next/server";

export enum Methods_Get_Cars {
  FEATURED = "featured",
  GET_ALL_SHORT = "get_all_short",
}

export async function GET(req: NextRequest, res: NextResponse) {
  const locale = getApiLocale(req)
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  const method = params.get("method");

  console.log("method:", method);
  
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
}
