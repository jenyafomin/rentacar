import { serverApiFetch } from "@/utils/fetchServer";
import { Chip } from "@mui/material";
import { IRequest } from "types/Request";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { RequestCard } from "@/front/components/cards/req.card";

export default async function RequestPage() {
  const requests = await serverApiFetch<IRequest[]>(
    "/api/admin/request",
    { next: { tags: ["requests"] } }
  );

  console.log("requests", requests.length);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
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