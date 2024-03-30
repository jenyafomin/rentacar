"use client";
import { ICar } from "types/Car";
import ActionButton from "../buttons/actionBtn";
import Image from "next/image";
import { Card } from "@mui/material";
import { useState } from "react";
import CarWizzard from "@/front/views/dialogs/create-car/CarWizzard";
import { onSaveUpdateCar } from "@/front/views/dialogs/create-car/onSave.update";
import { clientApiFetch } from "@/utils/fetchClient";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/front/views/dialogs/confirmationDialog";
import { EColorsStyle } from "types/enum/EGeneral";

export default function CardCar({ car }: { car: ICar }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();
  return (
    <>
      <Card
        // onClick={()=> setOpenUpdate(true)}
        className="flex align-center rounded shadow-xl overflow-hidden gap-8 transition-all hover:opacity-80 hover-up"
      >
        {/* IMAGE */}
        <div
          className="flex image relative"
          style={{ width: "120px", minHeight: "80px", overflow: "hidden" }}
        >
          <Image
            src={car.images?.[0] || "/img/agency-1.jpg"}
            alt={car.make}
            objectFit="cover"
            fill={true}
          />
        </div>

        {/* BASE CONTENT */}
        <div className="flex gap-4">
          <div className="py-2 flex flex-col gap-2">
            <div className="flex">
              <strong style={{ fontSize: "18px" }}>
                {car.make} {car.model} {car.option} {car.year}
              </strong>
            </div>
            <div className="flex gap-1 wrap">
              <div className="rounded border px-2 py-0.5">{car.color}</div>
              <div className="rounded border px-2 py-0.5">{car.type}</div>
              <div className="rounded border px-2 py-0.5">{car.type}</div>
            </div>
          </div>
          <div
            className="py-2 pl-4 flex flex-col gap-2"
            style={{ borderLeft: "1px solid #0001" }}
          >
            <div className="flex">{car.make}</div>
            <div className="flex">{car.model}</div>
          </div>
        </div>

        {/* ADDITIONAL INFO */}
        <div className="flex flex-end ml-auto py-4 px-2 items-center">
          <ActionButton
            actions={[
              {
                text: "Edit",
                icon: "edit",
                onCLick: () => {
                  setOpenUpdate(true);
                },
              },
              {
                text: "Delete",
                icon: "trash",
                onCLick: () => {
                  setOpenDelete(true);
                },
              },
            ]}
          />
        </div>
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
          title={"Delete a Car"}
          description={<div>Are you sure, that you want to delte:<p className="font-bold text-[24px] ">{car.make} {car.model} {car.year} {car.color}</p></div>}

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
