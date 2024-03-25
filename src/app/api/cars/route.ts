import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const locale = req.headers.get('x-locale');
  return NextResponse.json({Hello: req.nextUrl, locale})
}
