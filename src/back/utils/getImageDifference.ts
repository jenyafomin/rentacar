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
            // Saving all images, so we will update the sequence of images in db
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

    console.log("newImages", newImages);
    const onlyUrls = newImages.filter(img => !(img instanceof File)) as string[];
    console.log("onlyUrls", onlyUrls);
    console.log("initialImages", initialImages);
    const needToDelete = initialImages.filter(url => !onlyUrls.includes(url));

    console.log("needToDelete", needToDelete);
    return { newImages, needToDelete }
}