import { poppins, roboto } from "@/front/fonts";
import { getServerLocale } from "@/localization/getLocale";
import { makeApiCall } from "@/utils/fetch";
import { ICar } from "types/Car";
import CarsHeader from "./cars.header";
import LineBackground from "./lineBackground";
import CarsList from "./cars.list";
import CarCard from "./car.card";
import NextPage2 from "@/front-ecom/components/next/NextPage2";
import Footer from "@/front-ecom/components/footer/Footer";

export default async function Cars() {
  const locale = getServerLocale();
  const cars = await makeApiCall<ICar[]>(locale, "/api/cars", {
    next: { tags: ["cars"] },
  });
  console.log("TOTAL CARS:", cars.length);

  return (
    <>
      <LineBackground />
      <div style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <CarsHeader />

        <CarsList
          //   gap="6%"
          cars={cars}
          //   style={{paddingTop: "70px"}}
        />
      </div>

      {/*========== Next Page ==========*/}
      <NextPage2 className="section-padding border-top background-section" />
      {/*========== End Next Page ==========*/}

      {/*========== Footer ==========*/}
      <Footer className="background-section" />
      {/*========== End Footer ==========*/}
    </>
  );
}
