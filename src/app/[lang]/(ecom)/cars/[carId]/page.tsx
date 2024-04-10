import SliderCar from "@/front-ecom/components/slider-portfolio/SliderCar";
import { getServerLocale } from "@/localization/getLocale";
import { makeApiCall } from "@/utils/fetch";
import { useSearchParams } from "next/navigation";
import { ICar } from "types/Car";

export default async function CarPage({params: {carId}, ...restProps}: {params: {carId: string}}) {
    // const params = useSearchParams()
    const lang = getServerLocale();
    const car = await makeApiCall<ICar>(lang, `/api/cars?id=${carId}`);

    // @ts-ignore
    if(car.error)  return <div>{car.error}</div>
    
    // console.log("car", car);

    return <div>
        <SliderCar
                car={car}
                webgel
                fullWidth
                className={"align-items-end pb-80"}
                webgelOptions={{
                    displacement: "/img/displacement/8.jpg",
                    speedIn: 3.5,
                }}
                metaData={{hasSeparator: true}}
            />
    </div>
}