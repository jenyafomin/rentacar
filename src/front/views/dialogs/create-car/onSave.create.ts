import { clientApiFetch } from "@/utils/fetchClient";
import { IExtraState, IOnSaveProps } from "./CarWizzard";
import { toast } from "react-toastify";
import { ICar } from "types/Car";
import { createFormDataForImages } from "./createImageFormData";


export async function onSaveCreateCar({ state, extraState }: IOnSaveProps): Promise<boolean> {
    try {
        // * CREATE CAR
        const body = JSON.stringify(state);
        const promiseCar = clientApiFetch("en", "api/admin/cars", { method: "POST", body }); // prettier-ignore

        const newCar = await toast.promise<ICar>(promiseCar, {
            pending: "Creating Car",
            success: "Car is created",
            error: "Failed to create a CAR",
        });
        console.log("NEW CAR", newCar);


        // * SAVE IMAGES
        if (!extraState.images.length) {
            return true;
        }
        const formData = createFormDataForImages(newCar.id, extraState.images);
        const promise = clientApiFetch("en", "api/admin/cars/image", { method: "POST", body: formData }); // prettier-ignore

        const result = await toast.promise(promise, {
            pending: "Creating Images for your car",
            success: "Images is Created",
            error: "Failed to save images",
        });
        console.log("result", result);


        return true;

    } catch (e) {
        console.error("ERROR onSave",e);
        return false
    }
}