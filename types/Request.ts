import { Request } from "@prisma/client";
import { EConType, EConTypeId, ERequestStatus } from "./enum/ERequest";
import { ICar } from "./Car";
import { JsonValue } from "@prisma/client/runtime/library";

export type EConTypeIdMapping = {
  [key in EConTypeId]?: string;
};

export interface IClientRequest extends EConTypeIdMapping {
    name: string;
  connectionType: EConType;
  description?: string;
}

export interface IRequest {
    id: string;
    status: ERequestStatus;
    descriptionStatus?: string;
    nextAction?: string;

    createdAt?: Date;
    updatedAt?: Date;

    client: IClientRequest;
    car?: ICar;
    other?: Record<string, any>;

}
