"use client";

import { Chip } from "@mui/material";
import { Card, CardContent, CardHeader, Typography, Stack, IconButton, Divider, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IRequest } from "types/Request";

export function RequestCard({ request }: { request: IRequest; onDelete?: (id: string) => void }) {
    // Example color-coded status handling
    return (
      <Card
        sx={{
          width: "32%",
          maxWidth: 480,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              {getStatusChip(request.status)}
              <Typography variant="subtitle1" fontWeight="bold">
                {request.client?.connectionType.toUpperCase()}
              </Typography>
            </Stack>
          }
          action={
            <IconButton
              onClick={() => alert("Delete request")}
              aria-label="delete request"
              sx={{
                color: "grey.500",
                "&:hover": { color: "error.main" },
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          }
          sx={{ pb: 0.5 }}
        />
  
        <CardContent sx={{ pt: 0 }}>
          {/* Description / Next Action */}
          {request.descriptionStatus && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              Description: {request.descriptionStatus}
            </Typography>
          )}
          {request.nextAction && (
            <Box mb={1}>
              <Typography variant="body2" fontWeight="bold">
                Next Action:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {request.nextAction}
              </Typography>
            </Box>
          )}
  
          {/* Divider */}
          <Divider sx={{ my: 1 }} />
  
          {/* Client & Car Info (Just examples; adapt as needed) */}
          {/* <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Client Info:
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {/* <pre>{JSON.stringify(request.client, null, 2)}</pre> */}
            <Typography variant="caption" color="text.secondary">
                  Name: <strong>{request.client.name}</strong>
                  {request.client.phone && (
                    <>
                      <br />
                      Phone: <strong>{request.client.phone}</strong>
                    </>
                  )}
                  {request.client.email && (
                    <>
                      <br />
                      Email: <strong>{request.client.email}</strong>
                    </>
                  )}
                  {request.client.telegramId && (
                    <>
                    <br />
                    Telegram: <strong>{request.client.telegramId}</strong>
                    </>)}
                  {request.client.whatsappId && (
                    <>
                    <br />
                    WhatsApp: <strong>{request.client.whatsappId}</strong>
                    </>
                    )}
                    {request.client.description && (
                        <>
                        <br />
                        Description: <strong>{request.client.description}</strong>
                        </>
                    )}
                </Typography>
          </Typography>
  
          {request.car && (
            <>
              <Divider sx={{ my: 1 }} />
              {/* <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Car Info:
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                <strong>{request.car.make} {request.car.model} {request.car.year}</strong>
                
                
              </Typography>
            </>
          )}
  
          {/* Timestamps */}
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Created: {new Date(request.createdAt as any).toLocaleString()}
            </Typography>
            {/* <Typography variant="caption" color="text.secondary">
              Updated: {format(new Date(request.updatedAt), "Pp")}
            </Typography> */}
          </Stack>
        </CardContent>
      </Card>
    )
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