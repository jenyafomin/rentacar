import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getLocale";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const locale = getApiLocale(req)
  const cars = await prisma.car.findMany()
  // console.log("CARS:", cars);
  return NextResponse.json(cars)
}
