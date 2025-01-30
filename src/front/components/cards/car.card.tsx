"use client";

// import * as React from "react"
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import BoltIcon from "@mui/icons-material/Bolt";
import { Car } from "@prisma/client";
import CarWizzard from "@/front/views/dialogs/create-car/CarWizzard";
import ConfirmationDialog from "@/front/views/dialogs/confirmationDialog";
import { EColorsStyle } from "types/enum/EGeneral";
import { onSaveUpdateCar } from "@/front/views/dialogs/create-car/onSave.update";
import { toast } from "react-toastify";
import { clientApiFetch } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";

interface CarCardProps {
  car: Car;
  onEdit?: (carId: string) => void;
  onDelete?: (carId: string) => void;
}

export default function CarCard({ car }: CarCardProps) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();
  return (
    <>
      <Card
        sx={{
          // minWidth: "100px",
          flexShrink: 1,
          flexGrow: 1,
          flexBasis: "calc(32%)",
          minWidth: "300px",
          maxWidth: "540px",
          // maxWidth: "49%",

          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Если хотите пропорцию 16:9, используем CardMedia c sx={{ aspectRatio }} или padding-top trюк */}
        <Box sx={{ position: "relative", width: "100%", pt: "56.25%" }}>
          <CardMedia
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            component="img"
            image={car.images?.[0] || "/img/no-car.png"}
            alt={`${car.make} ${car.model}`}
          />
          {/* Если машина Featured, выводим иконку */}
          {car.isFeatured && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "50%",
                p: 0.5,
              }}
            >
              <StarIcon color="warning" />
            </Box>
          )}
          {/* Кнопки Edit/Delete в правом верхнем */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 0.5,
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: 2,
              p: 0.2,
            }}
          >
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => setOpenUpdate(true)}>
                <EditIcon fontSize="small" color="warning" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => setOpenDelete(true)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {/* Заголовок */}
          <Typography variant="h6" fontWeight="bold">
            {car.make} {car.model}
            {car.option && ` ${car.option}`} {car.year}
          </Typography>

          {/* Мелкие поля: VIN, Plate */}
          {car.plateNumber ? (
            <Stack direction="row" spacing={2}>
              {/* <Typography variant="body2" color="text.secondary">
            VIN: {car.vin || "—"}
          </Typography> */}
              <Typography variant="body2" color="text.secondary">
                Plate: {car.plateNumber || "—"}
              </Typography>
            </Stack>
          ) : (
            <></>
          )}

          {/* Цвет, тип, лейблы */}
          <Stack direction="row" spacing={1}>
            {/* Цвет (Chip) */}
            <Chip label={car.color || "No color"} variant="outlined" />
            {/* Тип (Chip) */}
            <Chip label={car.type || "No type"} variant="outlined" />
            {/* Доп. категории (если есть) */}
            {car.categories?.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                variant="outlined"
                color="primary"
                size="small"
                style={{ padding: "15px 8px" }}
              />
            ))}
          </Stack>

          {/* Цены (пр. $49/day и $1299/month) */}
          <Stack direction="row" spacing={2}>
            {car.priceDaily && (
              <Typography variant="body1" fontWeight={500}>
                ${car.priceDaily}/day
              </Typography>
            )}
            {car.priceMonthly && (
              <Typography variant="body1" fontWeight={500}>
                ${car.priceMonthly}/month
              </Typography>
            )}
          </Stack>

          {/* Характеристики: Transm, Engine, HP, Fuel */}
          <Stack direction="row" spacing={2} alignItems="center">
            {car.transmission && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <DirectionsCarIcon fontSize="small" />
                <Typography variant="caption">{car.transmission}</Typography>
              </Stack>
            )}
            {car.engine && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <BoltIcon fontSize="small" />
                <Typography variant="caption">{car.engine}</Typography>
              </Stack>
            )}
            {car.horsePower && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <CalendarMonthIcon fontSize="small" />
                <Typography variant="caption">{car.horsePower} hp</Typography>
              </Stack>
            )}
            {car.fuelType && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LocalGasStationIcon fontSize="small" />
                <Typography variant="caption">{car.fuelType}</Typography>
              </Stack>
            )}
          </Stack>

          {/* Количество дверей/сидений/багажа */}
          <Typography variant="caption" color="text.secondary">
            {car.amountOfDoors ?? 4} Doors · {car.amountOfSeats ?? 5} Seats ·{" "}
            {car.amountOfLaguage ?? 2} Luggage
          </Typography>
        </CardContent>
      </Card>
      {openUpdate && (
        <CarWizzard
          open={openUpdate}
          setOpen={setOpenUpdate}
          initialValues={car}
          onSave={onSaveUpdateCar}
        />
      )}
      {openDelete && (
        <ConfirmationDialog
          open={openDelete}
          setOpen={setOpenDelete}
          color={EColorsStyle.ERROR}
          title={"Are you sure, that you want to delete"}
          description={
            <div>
              <p className="font-bold text-[24px] ">
                {car.make} {car.model} {car.year} {car.color}
              </p>
            </div>
          }
          onConfirm={() => {
            toast.promise(
              clientApiFetch("en", `api/admin/cars?id=${car.id}`, {
                method: "DELETE",
              }),
              {
                pending: "Deleting Car",
                success: `${car.make} ${car.model} ${car.year} is deleted`,
                error: "Failed to delete a car",
              }
            );
            router.refresh();
          }}
        />
      )}
    </>
  );
}
