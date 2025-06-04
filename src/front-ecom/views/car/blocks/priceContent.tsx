"use client";
import { useMemo, useState } from "react";
import { poppins } from "@/front/fonts";
import { ICar } from "types/Car";
import CarContentCreater from "../utils/carContentCreator";

function PriceItem({
  priceType,
  amount,
  isActive,
  discount = "0",
  onClick,
}: {
  priceType: string;
  amount?: string;
  isActive: boolean;
  discount?: string;
  onClick: () => any;
}) {
  return (
    <div className="price-item-wrapper" onClick={onClick}>
      <div className={`price-item container-bg ${isActive && "active"}`}>
        <div className="circle-check" />
        <div className={`price-type ${poppins.className}`}>{priceType}</div>
        <div className={`price ${poppins.className}`}>
          <span className="price-amount">{amount}</span>
          <span className="currency">AED</span>
        </div>
      </div>
      <div className={`discount container-bg ${discount !== "0" && "active"} `}>
        -{discount}%
      </div>
    </div>
  );
}

export default function CarPriceContent({
  car,
  priceType,
  setPriceType,
}: {
  car: ICar;
  priceType: "daily" | "monthly";
  setPriceType: (newValue: "daily" | "monthly") => any;
}) {
  const priceMonthly = useMemo(() => {
    if (car.priceMonthly) {
      return car.priceMonthly / 30;
    } else return 0;
  }, [car.priceMonthly]);

  const discount = useMemo(() => {
    if (car.priceDaily && priceMonthly) {
      return (1 - priceMonthly / car.priceDaily) * 100;
    } else return 0;
  }, [car.priceDaily, priceMonthly]);

  const onClickPrice = (_priceType: "daily" | "monthly") => () =>
    setPriceType(_priceType);
  return (
    <div className="price-content">
      <h3 className={poppins.className}>PRICE</h3>

      <PriceItem
        priceType="DAILY"
        amount={car.priceDaily?.toFixed(0)}
        isActive={priceType === "daily"}
        onClick={onClickPrice("daily")}
      />
      <PriceItem
        priceType="MONTHLY"
        amount={priceMonthly.toFixed(0)}
        isActive={priceType === "monthly"}
        discount={discount.toFixed(0)}
        onClick={onClickPrice("monthly")}
      />

      {/* <div className="dates-wrapper">
            <div className="date-item container-bg">{date.toLocaleDateString()}</div>
            <div className="date-item container-bg">{date.toLocaleDateString()}</div>
        </div> */}

      <CarContentCreater
        items={[
          ["Extra Miles", car.extraMiles],
          ["Extra Miles Price", `${car.extraMilesPrice} AED`],
        ]}
      />
      {priceType === "daily" && (
        <CarContentCreater
          items={[
            ["Days", "3+"],
            ["Total", `${(car.priceDaily || 0) * 3} AED`],
          ]}
        />
      )}
      {priceType === "monthly" && (
        <CarContentCreater
          items={[
            ["Days", "30+"],
            ["Total", `${priceMonthly * 30} AED`],
          ]}
        />
      )}
    </div>
  );
}
