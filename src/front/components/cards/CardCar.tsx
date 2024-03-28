"use client";
import { ICar } from "types/Car";
import ActionButton from "../buttons/actionBtn";
import Image from "next/image";
import { Card } from "@mui/material";

export default function CardCar({car}: {car: ICar}) {
  return (
    <Card className="flex align-center rounded shadow-xl overflow-hidden gap-8 transition-all hover:opacity-80">
      
      {/* IMAGE */}
      <div
        className="flex image relative"
        style={{ width: "100px", minHeight: "80px", overflow: "hidden" }}
      >
        <Image src={"/img/agency-1.jpg"} alt={car.make} fill={true} />
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
            },
            {
              text: "Delete",
              icon: "trash",
            },
          ]}
        />
      </div>
    </Card>
  );
}
