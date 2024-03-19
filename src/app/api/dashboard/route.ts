import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextResponse) {
    const session = await getServerSession()
    console.log(session)
    const response = {sucess: true}
    return NextResponse.json({session}, {status: 200})
    // Response.json({success: true})
}