import {v4 as uuidv4} from "uuid";
import { removeImage, saveImage } from "@/back/utils/saveImage";

export async function saveCarImages(formData: FormData, namePrefix: string) {
    const fileUrls: string[] = []
    const filesStreams = formData.getAll('images') as Array<any>;

    for (const fileStream of filesStreams) {
        if (typeof fileStream === "string") {
            console.log("FILE URL", fileStream);
            fileUrls.push(fileStream)
        } else {
            console.log("FILE STREAM", fileStream);
            // Example filename logic: Use a timestamp or a unique identifier
            const splitName = fileStream.name.split(".")
            console.log("splitName",splitName);
            const extension = splitName[splitName.length-1]
            const fileName = `${namePrefix}-${uuidv4()}.${extension}`;
            const uploadDir = '/img/cars';

            const fileUrl = await saveImage(fileStream, fileName, uploadDir);
            fileUrls.push(fileUrl)
        }
    }

    return fileUrls;
}

export async function removeCarImages(filePaths: string[]) {
    for(const filePath of filePaths) {
        await removeImage(filePath);
    }
}