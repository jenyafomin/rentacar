import { poppins } from "@/front/fonts";
import { ICar } from "types/Car";
import CarContentCreater from "../utils/carContentCreator";

function PriceItem({priceType, amount, isActive, discount="0"}: {priceType: string, amount: string, isActive: boolean, discount?: string}) {
    return <div className="price-item-wrapper">
    <div className={`price-item container-bg ${isActive && "active"}`}>
        <div className="circle-check" />
        <div className={`price-type ${poppins.className}`}>{priceType}</div>
        <div className={`price ${poppins.className}`}>
        <span className="price-amount">{amount}</span>
        <span className="currency">AED</span>
        </div>
    </div>
    <div className={`discount container-bg ${discount !== "0" && "active"} `}>{discount}%</div>
</div>
}

export default function CarPriceContent({ car }: { car: ICar }) {
    const date = new Date();
    const date2 = date.setDate(date.getTime()+7);
  return (
    <div className="price-content">
      <h3 className={poppins.className}>
        PRICE
      </h3>

        <PriceItem priceType="DAILY" amount="28" isActive={true} />
        <PriceItem priceType="MONTHLY" amount="22" isActive={false} discount="-25" />
        
        {/* <div className="dates-wrapper">
            <div className="date-item container-bg">{date.toLocaleDateString()}</div>
            <div className="date-item container-bg">{date.toLocaleDateString()}</div>
        </div> */}

        <CarContentCreater items={[["Extra Miles", car.extraMiles], ["Extra Miles Price", `${car.extraMilesPrice} AED`]]}/>
        <CarContentCreater items={[["Days", "7"], ["Total", "2800"]]}/>

    </div>
  );
}
