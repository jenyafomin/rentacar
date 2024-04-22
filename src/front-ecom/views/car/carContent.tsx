"use client";
import { poppins } from "@/front/fonts";
import { ICar } from "types/Car";
import CarContentContainer from "./utils/carContentCreator";
import CarPriceContent from "./blocks/priceContent";
import ButtonGradient from "@/front-ecom/components/button/ButtonGradeint";
import { CarIcon } from "@/front-ecom/components/svg/icon/car";
import { MoneyIcon } from "@/front-ecom/components/svg/icon/money";
import { PhotoIcon } from "@/front-ecom/components/svg/icon/photo";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import CarInfoContent from "./blocks/infoContent";

export default function CarContent({ car }: { car: ICar }) {
  const [selectedBlocks, setSelectedBlocks] = useState(["info", "price"])
  const breakPointReached = useMedia("(max-width: 768px)", false);

  useEffect(() => {
    if(breakPointReached) {
      if(selectedBlocks.length > 1) {
        setSelectedBlocks([selectedBlocks[0]])
      }
    }
  }, [breakPointReached])

  console.log("breakPointReached", breakPointReached);

  function handleActionClick(actionName: string) {
    if(selectedBlocks.includes(actionName)) {
      setSelectedBlocks(oldValue => oldValue.filter(v => v !== actionName))
    } else {
      if(breakPointReached) {
        setSelectedBlocks([actionName])
        // Allow open only one item at a time
      } else {
        setSelectedBlocks((oldValue) => [...oldValue, actionName])
      }
    }
  }

  const showInfo = selectedBlocks.includes("info");
  const showPrice = selectedBlocks.includes("price");

  return (
    <div className="car-content-wrapper">
      <div className="car-content">
        <div className="column column-left">
          <h1
            className={poppins.className}
          >
            {car.make} {car.model} {car.option} {car.color}
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            
            {showInfo && <CarInfoContent car={car} />}
            {showPrice && !showInfo && <CarPriceContent car={car}/>}
          </div>
        </div>

        {/* COLUMN RIGHT */}
        <div className="column column-right">
          {showInfo && showPrice && <CarPriceContent car={car} />}
        </div>
      </div>

      <div className="car-content-btns">
        <div className="btns-wrapper">
          <ButtonGradient
            className={`action-btn ${!showInfo && "inActive"}`}
            onClick={() => {handleActionClick("info")}}
            style={{ padding: "8px 12px" }}
          >
            <CarIcon color={showInfo ? "#000" : "#fff"} size="24" />
          </ButtonGradient>
          
          <ButtonGradient
            className={`action-btn ${!showPrice && "inActive"}`}
            onClick={() => {handleActionClick("price")}}
            style={{ padding: "8px 12px" }}
          >
            <MoneyIcon color={showPrice ? "#000" : "#fff"} size="24" />
          </ButtonGradient>

          <ButtonGradient
            className="action-btn inActive"
            onClick={() => {}}
            style={{ padding: "8px 12px" }}
          >
            <PhotoIcon color="#fff" size="24" />
          </ButtonGradient>
        </div>

        <ButtonGradient
          className="btn-book lg"
          style={{ width: "100%" }}
          onClick={() => {}}
        >
          Book A Car
        </ButtonGradient>
      </div>
    </div>
  );
}
