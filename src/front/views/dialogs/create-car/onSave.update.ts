import { clientApiFetch } from "@/utils/fetchClient";
import { IExtraState, IOnSaveProps } from "./CarWizzard";
import { toast } from "react-toastify";
import { ICar } from "types/Car";
import { createFormDataForImages } from "./createImageFormData";
import { getDifference } from "@/back/utils/getDifference";
import { getImageDifference } from "@/back/utils/getImageDifference";

export async function onSaveUpdateCar({ initialValues, state, extraState }: IOnSaveProps): Promise<boolean> {
    try {
        const difference = getDifference<ICar>(initialValues, state, ["images", "uploadedImages"]);
        const imageDifference = getImageDifference(initialValues.images!, extraState.images);

        if (difference === undefined && imageDifference === undefined) {
            toast("Nothing to change")
            return true;
        }

        console.log("DIFFERENCE:\n", { difference, imageDifference });

        if (difference !== undefined) {
            // * UPDATE A CAR
            const body = JSON.stringify({ id: state.id, car: difference });
            const promiseCar = clientApiFetch("en", "api/admin/cars", { method: "PUT", body }); // prettier-ignore

            const updatedCar = await toast.promise<ICar>(promiseCar, {
                pending: "Updating Car",
                success: "Car is updated",
                error: "Failed to update a CAR",
            });
            console.log("UPDATED CAR", updatedCar);
        }

        if (imageDifference !== undefined) {
            const formData = createFormDataForImages(state.id, imageDifference.newImages);
            const promise = clientApiFetch("en", "api/admin/cars/image", { method: "POST", body: formData }); // prettier-ignore
            await toast.promise(promise, {
                pending: "Update Images for your car",
                success: "Images is Updated",
                error: "Failed to update images",
            });
        }

        if(imageDifference?.needToDelete.length) {
            const body = JSON.stringify(imageDifference.needToDelete)
            const promise = clientApiFetch("en", "api/admin/cars/image", { method: "PUT", body }); // prettier-ignore
            await toast.promise(promise, {
                pending: "REMOVING Images",
                success: "Images was removed",
                error: "Failed to remove images",
            });
        }

        return true

    } catch (e) {
        console.error("ERROR onSave", e);
        return false
    }
}