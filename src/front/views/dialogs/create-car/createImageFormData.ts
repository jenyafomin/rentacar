import { FileProp } from "@/front/types/file";

export function createFormDataForImages(id: string, images: Array<string | File | FileProp>): FormData {
    const formData = new FormData();

    formData.append("id", id);

    for (const image of images) {
        if(image instanceof File || "string" === typeof image) {
            formData.append("images", image);
        } else if (image.file) {
            formData.append("images", image.file);
        } else {
            formData.append("images", image.url);
        }
    }

    return formData
}
