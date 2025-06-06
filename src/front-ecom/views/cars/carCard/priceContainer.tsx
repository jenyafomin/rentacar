import { useMemo } from "react";
import { roboto } from "@/front/fonts";
import { ICar } from "types/Car";

export default function PriceContainer({ car, className }: {car: ICar, className?: string}) {
  const priceDayilyMonth = useMemo(() => {
    if (!car.priceMonthly) return 0;
    return car.priceMonthly / 30;
  }, [car.priceMonthly]);
    return <div className={`car-card-price-container ${className}`}>
      {/* PRICE WRAPPER */}
      <div className={`price-wrapper ${roboto.className}`}>
        <span className="transparent-border-white text-small" style={{}}>
          FROM
        </span>
        <span className="price">{priceDayilyMonth.toFixed(0)}</span>
        <span className="transparent-border-white">AED</span>
      </div>
      {/* PRICE WRAPPER END */}

      {/* NEON UNDERLINE */}
      <div className={`neon-wrapper ${car.isFeatured && "featured"}`}>
      </div>
      {/* NEON UNDERLINE END */}
    </div>
}