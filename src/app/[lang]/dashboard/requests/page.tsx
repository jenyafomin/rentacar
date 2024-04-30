import { getAllRequests } from "@/back/models/request.model"
import { Card } from "@mui/material";
import { IClientRequest } from "types/Request";
import { EConTypeId } from "types/enum/ERequest";

export default async function RequestPage() {
    const requests = await getAllRequests();
    console.log("requests",requests.length);

    return <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
        {requests.map((req, i) => {
            // @ts-ignore
            const client = req.client as IClientRequest
            const conType = client.connectionType;
            const conId = EConTypeId[conType];

            return <Card className="flex gap-4 px-4 py-2" key={i}>
                    <span>{req.status}</span>
                    <span>{client.name}</span>
                    <span>{client.connectionType}</span>
                    <span>{conId}</span>
                </Card>
        })}
    </div>
    // return {requests.map(())}
}