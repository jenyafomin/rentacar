import { getAllRequests } from "@/back/models/request.model";
import { NextRequest, NextResponse } from "next/server";

// CRATE REAUEST. This is the only thing user can do...
// view and edit is available only for admin
export async function GET(_: NextRequest, __: NextResponse) {
    const requests = await getAllRequests();
    return NextResponse.json(requests, {status: 200});
}
export async function PUT(req: NextRequest, res: NextResponse) {
    
}
