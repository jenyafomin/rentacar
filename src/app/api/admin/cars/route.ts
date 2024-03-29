import { prisma } from "@/back/prismaConnect";
import { getApiLocale } from "@/localization/getLocale";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';

// export const config = {
//     api: {
//         bodyParser: false // Disable Next.js body parser
//     }
// }

export async function GET(req: NextRequest, res: NextResponse) {
    const locale = getApiLocale(req)
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const fileStream = formData.get('file');
        
        // Assuming 'file' is the field name for the upload
        if (!fileStream || typeof fileStream === 'string') {
            throw new Error('File upload not found');
        }

        // Example filename logic: Use a timestamp or a unique identifier
        const filename = Date.now() + '-' + fileStream.name;
        const uploadDir = './public/uploads';
        const filePath = path.join(uploadDir, filename);

        // Ensure the upload directory exists
        fs.mkdirSync(uploadDir, { recursive: true });

        // Create a writable stream for the file
        const writableStream = fs.createWriteStream(filePath);
        for await (const chunk of fileStream.stream()) {
            writableStream.write(chunk);
        }
        writableStream.end();

        // Respond with success
        return new NextResponse(JSON.stringify({ message: 'File uploaded successfully', filename }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Upload error:', error);
        return new NextResponse(JSON.stringify({ error: 'Upload failed', message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}