import { FileProp } from "@/front/types/file";

export function getImageDifference(
    initialImages: string[],
    images: FileProp[]
): {
    newImages: Array<string | File>,
    needToDelete: string[]
} | undefined {
    let findDifference = false;
    const newImages = []

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const initialImage = initialImages[i];

        if (image.file) {
            findDifference = true;
            newImages.push(image.file)
        } else {
            newImages.push(image.url);

            if (image.url !== initialImage) {
                findDifference = true;
            }
        }
    }

    if (initialImages.length !== images.length) {
        findDifference = true;
    }

    if (!findDifference) {
        return
    }

    const onlyUrls = newImages.filter(img => !(img instanceof File)) as string[];
    const needToDelete = initialImages.filter(url => !onlyUrls.includes(url));


    return { newImages, needToDelete }
}