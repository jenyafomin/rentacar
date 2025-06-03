import { poppins, roboto } from "@/front/fonts";
import { getServerLocale } from "@/localization/getServerLocale";
import { makeApiCall } from "@/utils/fetch";
import { ICar } from "types/Car";
import CarsHeader from "../../../../front-ecom/views/cars/cars.header";
import LineBackground from "../../../../front-ecom/layout/LineBackground";
import CarsList from "../../../../front-ecom/views/cars/cars.list";
import CarCard from "../../../../front-ecom/views/cars/car.card";
import NextPage2 from "@/front-ecom/components/next/NextPage2";
import Footer from "@/front-ecom/components/footer/Footer";
import NextPage from "@/front-ecom/components/next/NextPage";

export default async function Cars() {
  const locale = getServerLocale();
  const cars = await makeApiCall<ICar[]>(locale, "/api/cars", {
    next: { tags: ["cars"] },
  });
  console.log("TOTAL CARS:", cars.length, cars);

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
      <NextPage className="section-padding border-top background-section" />
      {/*========== End Next Page ==========*/}

      {/*========== Footer ==========*/}
      <Footer className="background-section" />
      {/*========== End Footer ==========*/}
    </>
  );
}
