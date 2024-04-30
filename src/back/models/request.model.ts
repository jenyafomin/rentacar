import { IRequest } from "types/Request";
import { prisma } from "../prismaConnect";
import { Request } from "@prisma/client";


export async function getAllRequests(): Promise<Request[]> {
    return await prisma.request.findMany({orderBy: {createdAt: "desc"}});
}

export async function createNewRequest(request: IRequest) {
    try {
        const transformedRequest = {
            ...request,
            client: {
                ...request.client,
                connectionType: request.client.connectionType.toString(),  // Transform enum to string if necessary
            }
        };
        await prisma.request.create({data: {
            ...transformedRequest,
        }})
        return true
    } catch (e) {
        console.error("[ERROR-createNewRequest]: ", e)
        return false
    }
    
}