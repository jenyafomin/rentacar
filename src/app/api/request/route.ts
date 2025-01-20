import { getActiveCars, getCarById, getFeaturedCars,  } from "@/back/models/car.model";
import { createNewRequest } from "@/back/models/request.model";
import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getServerLocale";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { IRequest } from "types/Request";

// CRATE REAUEST. This is the only thing user can do...
// view and edit is available only for admin
export async function POST(req: NextRequest, res: NextResponse) {
    console.log("CREATE CLIENT REQUEST");
    const body = await req.json() as IRequest;
    const success = await createNewRequest(body);
    revalidateTag("requests")
    return NextResponse.json({success});
}