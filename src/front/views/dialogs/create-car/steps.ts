import { ICar } from "types/Car";
import CarInfo from "./steps/CarInfo.form";
import Features from "./steps/Features.form";
import { ECarCategories, ECarFeatures, ECarFuelType, ECarStatus, ECarTransmission, ECarType } from "types/enum/ECar";
import Prices from "./steps/Prices.form";
import ImageUploader from "./steps/Images.form";
import Status from "./steps/Status.form";
import Submit from "./steps/SubmitWizzard";
import { EColors } from "types/enum/EGeneral";

type stepperProps = {
    icon: string;
    title: string;
    subtitle: string;
    active?: boolean;
  };
  
  export const forms = [Status, CarInfo, Features, Prices, ImageUploader, Submit]

  export const steps: stepperProps[] = [
    {
      icon: "tabler-battery-charging",
      title: "Status",
      subtitle: "Status, connections, ...",
    },
    {
      icon: "tabler-car",
      title: "Car Info",
      subtitle: "Main information",
    },
    {
      icon: "tabler-brand-my-oppo",
      title: "Features",
      subtitle: "Select Database",
    },
    {
      icon: "tabler-brand-cashapp",
      title: "Price",
      subtitle: "Select Price",
      active: true,
    },
    {
      icon: "tabler-photo-plus",
      title: "Images",
      subtitle: "Add Images",
    },
    {
      icon: "tabler-check",
      title: "Submit",
      subtitle: "Submit",
    },
  ];

  export const defaultValues: Partial<ICar> = {
    status: ECarStatus.IN_ACTIVE,

    make: "Mercedes",
    model: "C300",
    option: "AMG",
    year: 2022,
    color: EColors.BLUE,
    type: ECarType.SEDAN,
    categories: [ECarCategories.BUSINESS, ECarCategories.PREMIUM],

    amountOfDoors: 4,
    amountOfSeats: 5,
    amountOfLaguage: 2,
    engine: "2.0T",
    horsePower: 235,
    transmission: ECarTransmission.REAR,
    fuelType: ECarFuelType.PETROL,
    fuelConsumption: 10.3,
    features: [ECarFeatures.CARPLAY, ECarFeatures.PANORAMA, ECarFeatures.SUNROOF],

    priceDaily: 175,
    priceMonthly: 4500,
    extraMiles: 500,
    extraMilesPrice: 15,
  }