import { FileProp } from "@/front/types/file";

export function createFormDataFromImages(id: string, images: FileProp[]): FormData {
    const formData = new FormData();

    formData.append("id", id);

    for (const image of images) {
        if (image.file) {
            formData.append("images", image.file!);
        } else {
            formData.append("images", image.url);
        }
    }

    return formData
}
