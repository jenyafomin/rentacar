import { getActiveCars, getCarById,  } from "@/back/models/car.model";
import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getLocale";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const locale = getApiLocale(req)
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  
  if(id) {
    const car = await getCarById(id);
    if(!car) {
      return NextResponse.json({error: "Car Not Found"}, {status: 404})
    } else {
      return NextResponse.json(car)
    }
  } else {

    const cars = await getActiveCars();
    return NextResponse.json(cars)
  }
}
