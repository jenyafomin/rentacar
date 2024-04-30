import { clientApiFetch } from "@/utils/fetchClient";
import { ICar } from "types/Car";
import { IClientRequest } from "types/Request";

export async function handleSubmitRequest(client: IClientRequest): Promise<boolean> {
    const body = {client}
    // client.
    const res = await clientApiFetch<{success: boolean}>("en", "/api/request", {method: "POST", body: JSON.stringify(body)})

    return res.success;
}

export async function handleSubmitCarRequest(client: IClientRequest, car: ICar, rent: {priceType: string}): Promise<boolean> {
    const body = {client, car, other: {rent}}
    // client.
    const res = await clientApiFetch<{success: boolean}>("en", "/api/request", {method: "POST", body: JSON.stringify(body)})

    return res.success;
}
