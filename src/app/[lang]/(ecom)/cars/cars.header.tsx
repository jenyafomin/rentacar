import { poppins, roboto } from "@/front/fonts";

export default function CarsHeader() {
//   const padding = "27%";
  return (
    <div className="car-header-wrapper">
      <h6 className={`title-small ${poppins.className}`}>
        CARS
      </h6>
      
      <div>
        <h1 className={`title-big ${poppins.className}`}>
          FOR RENT
        </h1>

        <p className={roboto.className}>
          Lorem 11 ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu
          ligula non orci semper rhoncus.
        </p>
      </div>
    </div>
  );
}
