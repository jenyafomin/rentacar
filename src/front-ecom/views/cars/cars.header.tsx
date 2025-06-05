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
          Scroll to discover why we’re confident you’ll find exactly what you’re looking for. 
          Our vehicles range from economy car hires to luxury car rentals. 
          {/* All cars are model year 2018 or newer, with low mileage and clean interiors. 
          We detail and inspect each car before handover – so as you browse these listings, know that whichever you choose, you’re in for a smooth ride with GreenAge Rent. */}
        </p>
      </div>
    </div>
  );
}
