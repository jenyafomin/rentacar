// "use client";
import CardCar from "@/front/components/cards/CardCar";
import { serverApiFetch } from "@/utils/fetchServer";
import { HeaderCars } from "./header";
// types
import type { ICar } from "types/Car";

export default async function AllCars() {
  const cars = await serverApiFetch("api/admin/cars", {
    next: { tags: ["cars"] },
  });

  return (
    <>
      <HeaderCars cars={cars} />
      {/* <br/> */}
      <div className="flex gap-4 flex-col-reverse">
        {cars.map((car: ICar, i: number) => {
          return <CardCar key={i} car={car} />;
        })}
      </div>
    </>
  );
}
