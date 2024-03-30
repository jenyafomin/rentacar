"use client";

import PrimaryButton from "@/front/components/buttons/primaryButton";
import OpenDialogOnElementClick from "@/front/components/dialogs/OpenDialogOnElementClick";
import CarWizzard from "@/front/views/dialogs/create-car/CarWizzard";
import { onSaveCreateCar } from "@/front/views/dialogs/create-car/onSave";
import { ICar } from "types/Car";

export function HeaderCars({cars}: {cars: ICar[]}) {
  return (
    <div className="mb-4 flex justify-between" style={{ fontSize: "18px" }}>
      <div>
        Total cars: <strong className="ml-2">{cars.length}</strong>
      </div>
    <div>
        <OpenDialogOnElementClick
          element={PrimaryButton}
          elementProps={{
            text: "CREATE",
            size: "small",
            color: "primary",
            startIcon: "plus",
            //   startIcon: "new-section"
          }}
          dialog={CarWizzard}
          dialogProps={{ onSave: onSaveCreateCar }}
        />
      </div>
    </div>
  );
}
