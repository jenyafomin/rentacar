"use client";
import { poppins } from "@/front/fonts";
import { ICar } from "types/Car";
import CarPriceContent from "./blocks/priceContent";
import ButtonGradient from "@/front-ecom/components/button/ButtonGradeint";
import { CarIcon } from "@/front-ecom/components/svg/icon/car";
import { MoneyIcon } from "@/front-ecom/components/svg/icon/money";
import { PhotoIcon } from "@/front-ecom/components/svg/icon/photo";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import CarInfoContent from "./blocks/infoContent";
import ContactUsForm from "@/front-ecom/components/form/contact-us.form";
import { handleSubmitCarRequest, handleSubmitRequest } from "@/front-ecom/providers/handleSubmitRequest";
import DialogWrapper from "@/front-ecom/components/dialog/Dialog";
import { firstCharUpperCase } from "@/utils/firstCharUpperCase";
import ImagesSlider from "./blocks/imagesSlider";

export default function CarContent({ car }: { car: ICar }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [selectedBlocks, setSelectedBlocks] = useState(["info", "price"]);
  const [priceType, setPriceType] = useState<"daily" | "monthly">("daily");
  const breakPointReached = useMedia("(max-width: 768px)", false);

  useEffect(() => {
    if (breakPointReached) {
      if (selectedBlocks.length > 1) {
        setSelectedBlocks([selectedBlocks[0]]);
      }
    }
  }, [breakPointReached]);

  console.log("breakPointReached", breakPointReached);

  function handleActionClick(actionName: string) {
    if (selectedBlocks.includes(actionName)) {
      setSelectedBlocks((oldValue) => oldValue.filter((v) => v !== actionName));
    } else {
      if (breakPointReached) {
        setSelectedBlocks([actionName]);
        // Allow open only one item at a time
      } else {
        setSelectedBlocks((oldValue) => [...oldValue, actionName]);
      }
    }
  }

  const showInfo = selectedBlocks.includes("info");
  const showPrice = selectedBlocks.includes("price");

  return (
    <>
      <div className="car-content-wrapper">
        <div className="car-content">

          {/* COLUMN LEFT */}
          <div className="column column-left">
            <h1 className={poppins.className}>
              {car.make} {car.model} {car.option} {firstCharUpperCase(car.color)}
            </h1>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {showInfo && <CarInfoContent car={car} />}
              {showPrice && !showInfo && (
                <CarPriceContent
                  car={car}
                  priceType={priceType}
                  setPriceType={setPriceType}
                />
              )}
            </div>
          </div>
          {/* COLUMN LEFT END*/}

          {/* COLUMN RIGHT */}
          <div className="column column-right">
            {showInfo && showPrice && (
              <CarPriceContent
                car={car}
                priceType={priceType}
                setPriceType={setPriceType}
              />
            )}
          </div>
        </div>

        <div className="car-content-btns">
          <div className="btns-wrapper">
            <ButtonGradient
              className={`action-btn ${!showInfo && "inActive"}`}
              onClick={() => {
                handleActionClick("info");
              }}
              style={{ padding: "8px 12px" }}
            >
              <CarIcon color={showInfo ? "#000" : "#fff"} size="24" />
            </ButtonGradient>

            <ButtonGradient
              className={`action-btn ${!showPrice && "inActive"}`}
              onClick={() => {
                handleActionClick("price");
              }}
              style={{ padding: "8px 12px" }}
            >
              <MoneyIcon color={showPrice ? "#000" : "#fff"} size="24" />
            </ButtonGradient>

            <ButtonGradient
              className="action-btn inActive"
              onClick={() => {setOpenImage(true)}}
              style={{ padding: "8px 12px" }}
            >
              <PhotoIcon color="#fff" size="24" />
            </ButtonGradient>
          </div>

          <ButtonGradient
            className="btn-book lg"
            style={{ width: "100%" }}
            onClick={() => setOpen(true)}
          >
            Book A Car
          </ButtonGradient>
        </div>
      </div>

      {openImage && <ImagesSlider car={car} setOpen={setOpenImage} />}

      {open && (
        <DialogWrapper open={open} setOpen={setOpen}>
          <ContactUsForm
            onClose={() => setOpen(false)}
            onSubmit={(client) => handleSubmitCarRequest(client, car, {priceType})}
          />
        </DialogWrapper>
      )}
    </>
  );
}
