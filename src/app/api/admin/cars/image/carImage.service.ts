import { saveImage } from "@/back/utils/saveImage";

export async function saveCarImages(formData: FormData) {
    const fileUrls:string[] = []
    const filesStreams = formData.getAll('images') as File[];

    for (const fileStream of filesStreams) {
        // Example filename logic: Use a timestamp or a unique identifier
        const fileName = Date.now() + '-' + fileStream.name;
        const uploadDir = '/img/cars';

        const fileUrl = await saveImage(fileStream, fileName, uploadDir);
        fileUrls.push(fileUrl)
    }

    return fileUrls;
}