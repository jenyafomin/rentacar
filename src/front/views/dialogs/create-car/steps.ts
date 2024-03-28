import { ICar } from "types/Car";
import CarInfo from "./steps/CarInfo";
import Features from "./steps/Features";
import { ECarStatus } from "types/enum/ECar";
import Prices from "./steps/Prices";
import ImageUploader from "./steps/Images";
import Status from "./steps/Status";
import Submit from "./steps/Submit";

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
    make: "Mercedes",
    amountOfDoors: 4,
    amountOfSeats: 5,
    amountOfLaguage: 2,
    status: ECarStatus.ACTIVE
  }