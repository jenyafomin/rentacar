import { ICar } from "types/Car";
import CarContentCreater from "../utils/carContentCreator";
import { poppins } from "@/front/fonts";

export default function CarInfoContent({ car }: { car: ICar }) {
  return (
    <>
      <h3 className={poppins.className} style={{}}>
        INFO
      </h3>
      <CarContentCreater
        items={[
          ["Make", car.make],
          ["Model", car.model],
          ["Option", car.option],
          ["Color", car.color],
        ]}
      />
      <CarContentCreater
        items={[
          ["Doors", car.amountOfDoors],
          ["Seats", car.amountOfSeats],
          ["Laguage", car.amountOfLaguage],
        ]}
      />
      <CarContentCreater
        items={[
          ["Transmission", car.transmission],
          ["Engine", car.engine],
          ["Horse Power", car.horsePower],
          ["Fuel Type", car.fuelType],
          ["Fuel Consumption", car.fuelConsumption],
        ]}
      />
    </>
  );
}
