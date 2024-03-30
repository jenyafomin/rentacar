import fs from 'fs';
import path from 'path';

const rootFolder = "./public"

export async function saveImage(file: File, fileName: string, pathName: string) {
    const fullPath = rootFolder + pathName
    const filePath = path.join(fullPath, fileName);
    console.log("object");

    // Ensure the upload directory exists
    fs.mkdirSync(fullPath, { recursive: true });

    // Create a writable stream for the file
    const writableStream = fs.createWriteStream(filePath);
    for await (const chunk of file.stream() as any) {
        writableStream.write(chunk);
    }
    writableStream.end();

    return `${pathName}/${fileName}`;
}

export async function removeImage(filePath: string) {
    const fullPath = rootFolder + filePath;
    
    return new Promise<boolean>((resolve, reject) => {
        fs.unlink(fullPath, (err) => {
            if(err) {
                console.error(err)
                reject(`Failed to remove file ${filePath}`)
            }
            resolve(true)
        })

    })
}