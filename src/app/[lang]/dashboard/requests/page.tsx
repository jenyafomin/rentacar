import { getServerLocale } from "@/localization/getServerLocale";
import { serverApiFetch } from "@/utils/fetchServer";
import { Box, Card, CardContent, CardHeader, Chip, Divider, Stack, Typography } from "@mui/material";
import { IClientRequest, IRequest } from "types/Request";
import { EConTypeId } from "types/enum/ERequest";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { format } from "date-fns";
import { RequestCard } from "@/front/components/cards/req.card";

export default async function RequestPage() {
  const requests = await serverApiFetch<IRequest[]>(
    "/api/admin/request",
    { next: { tags: ["requests"] } }
  );

  console.log("requests", requests.length);

  return (
    <div style={{ display: "flex", flexDirection: "wrap", gap: "12px" }}>
      {requests.map((req, i) => {
        return <RequestCard key={i} request={req} />;
      })}
    </div>
  );
}

const getStatusChip = (status: string) => {
  switch (status) {
    case "new":
      return (
        <Chip
          label="New"
          color="primary"
          variant="outlined"
          size="small"
          icon={<InfoIcon fontSize="small" />}
        />
      )
    case "approved":
      return (
        <Chip
          label="Approved"
          color="success"
          variant="outlined"
          size="small"
          icon={<CheckCircleIcon fontSize="small" />}
        />
      )
    case "pending":
      return (
        <Chip
          label="Pending"
          color="warning"
          variant="outlined"
          size="small"
          icon={<PendingIcon fontSize="small" />}
        />
      )
    default:
      return (
        <Chip
          label={status}
          color="default"
          variant="outlined"
          size="small"
        />
      )
  }
}