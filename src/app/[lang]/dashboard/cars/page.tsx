import { getServerLocale } from "@/localization/getLocale";
import { useLocale } from "@/localization/useLocale"

export default async function AllCars(params) {
    const locale = getServerLocale()
    // const locale = useLocale()
    const cars = await fetch(`http://localhost:3000/api/cars`, {headers: {'x-locale': locale}})
    const json = await cars.json()
    console.log(json);
    return "All Cars"
}