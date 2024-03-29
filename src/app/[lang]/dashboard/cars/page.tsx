import { getServerLocale } from "@/localization/getLocale";
// import { Button } from "../htmlStyle";
import CardCar from "@/front/components/cards/CardCar";
import { ICar } from "types/Car";
import OpenDialogOnElementClick from "@/front/components/dialogs/OpenDialogOnElementClick";
import CreateCarModal from "@/front/views/dialogs/create-car/CarWizzard";
import PrimaryButton from "@/front/components/buttons/primaryButton";
import { toast } from "react-toastify";
import { ButtonToast } from "../htmlStyle";
import { serverApiFetch } from "@/utils/fetchServer";

export default async function AllCars() {
  const cars = await serverApiFetch("api/admin/cars", {
    next: { tags: ["cars"] },
  });
  // console.log("CARS:", cars);

  return (
    <>
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
            dialog={CreateCarModal}
          />
        </div>
      </div>
      {/* <br/> */}
      <div className="flex gap-4 flex-col">
        {cars.map((car: ICar, i: number) => {
          return <CardCar key={i} car={car} />;
        })}
      </div>
    </>
  );
}
