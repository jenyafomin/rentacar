import { roboto } from "@/front/fonts";
import { ICar } from "types/Car";

export default function PriceContainer({ car, className }: {car: ICar, className?: string}) {
    return <div className={`car-card-price-container ${className}`}>
      {/* PRICE WRAPPER */}
      <div className={`price-wrapper ${roboto.className}`}>
        <span className="transparent-border-white text-small" style={{}}>
          FROM
        </span>
        <span className="price">{car.priceDaily}</span>
        <span className="transparent-border-white">AED</span>
      </div>
      {/* PRICE WRAPPER END */}

      {/* NEON UNDERLINE */}
      <div className={`neon-wrapper ${car.isFeatured && "featured"}`}>
      </div>
      {/* NEON UNDERLINE END */}
    </div>
}