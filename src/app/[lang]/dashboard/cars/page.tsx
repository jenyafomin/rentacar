// "use client";
import CardCar from "@/front/components/cards/car.card";
import CardCar1 from "@/front/components/cards/car1.card";
import { serverApiFetch } from "@/utils/fetchServer";
import { HeaderCars } from "./header";
// types
import type { ICar } from "types/Car";

export default async function AllCars() {
  const cars = await serverApiFetch("api/admin/cars", {
    next: { tags: ["cars"] },
  });

  console.log(`[AllCars] ${cars?.length} cars`, cars);

  // Check if cars is an array, if not, it might be an error object
  const carsArray = Array.isArray(cars) ? cars : [];
  const hasError = !Array.isArray(cars) && cars?.error;

  return (
    <>
      <HeaderCars cars={carsArray} />
      {/* <br/> */}
      {hasError ? (
        <div className="text-red-500 text-center p-4">
          Error loading cars: {cars.error}
        </div>
      ) : (
        <div className="flex flex-wrap justify-between" style={{columnGap: "1%", rowGap: "20px"}}>
          {carsArray.map((car: ICar, i: number) => {
            return <CardCar key={i} car={car} />;
          })}
        </div>
      )}
      {/* <div className="flex gap-4 flex-col-reverse">
        {cars.map((car: ICar, i: number) => {
          return <CardCar1 key={i} car={car} />;
        })}
      </div> */}
    </>
  );
}
