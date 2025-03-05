import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/s3Client";
import path from "path";
import { createWriteStream, mkdirSync, unlink } from "fs";
const ROOT_FOLDER = "./public"

export async function uploadToS3(file: File, fileName: string, uploadDir: string) {
  const fileBuffer = await file.arrayBuffer();
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `${uploadDir}/${fileName}`,
    Body: Buffer.from(fileBuffer),
    ContentType: file.type,
  });

  await s3Client.send(command);
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadDir}/${fileName}`;
}

export async function deleteFromS3(filePath: string) {
  const url = new URL(filePath);
  const key = url.pathname.substring(1); // Remove the leading '/'

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  });

  await s3Client.send(command);
}

export async function saveImageByPath(file: File, fileName: string, pathName: string) {
    const fullPath = ROOT_FOLDER + pathName
    const filePath = path.join(fullPath, fileName);
    console.log("object");

    // Ensure the upload directory exists
    mkdirSync(fullPath, { recursive: true });

    // Create a writable stream for the file
    const writableStream = createWriteStream(filePath);
    for await (const chunk of file.stream() as any) {
        writableStream.write(chunk);
    }
    writableStream.end();

    return `${pathName}/${fileName}`;
}

export async function removeImageByPath(filePath: string) {
    const fullPath = ROOT_FOLDER + filePath;
    
    return new Promise<boolean>((resolve, reject) => {
        unlink(fullPath, (err) => {
            if(err) {
                console.error(err)
                reject(`Failed to remove file ${filePath}`)
            }
            resolve(true)
        })

    })
}