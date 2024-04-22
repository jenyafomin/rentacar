import DsnLink from "@/front-ecom/hooks/DsnLink";
import { poppins, roboto } from "@/front/fonts";
import { useLocale } from "@/localization/useLocale";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ICar } from "types/Car";

export default function CarCard({
  car,
  isVissible = false, // for animation
  aspectRatio = "16 / 9",
  width = "28%",
}: {
  car: ICar;
  isVissible?: boolean;
  aspectRatio?: string;
  width?: string;
}) {
  const locale = useLocale();
  const carRef = useRef(null);
  const maxValue = 12;
  const [blur, setBlur] = useState(12);
  useEffect(() => {
    // const tl = gsap.timeline({})
    // ScrollTrigger.create({
    //     trigger: carRef.current,
    //     start: "top 101%",
    //     end: () => {
    //         console.log("carRef.current",carRef.current);
    //         return "+=" + carRef.current.height +"px"
    //     },
    //     onUpdate: (e) => {
    //         const newValue = maxValue * (1-e.progress)
    //         console.log(`${car.make}-${car.model}`, newValue, e.progress.toFixed(3))
    //         setBlur(newValue)
    //     },
    //     scrub: 2,
    //     markers: true,
    //     toggleActions: "restart none reverse none"
    // })
    // tl.to(carRef.current, {
    //     scrollTrigger: {
    //         trigger: carRef.current,
    //         start: "top 100%",
    //         end: "+=500px",
    //         scrub: 1,
    //         markers: true,
    //         toggleActions: "restart pause reverse pause"
    //         // pin: carRef.current,
    //     },
    //     scale: 1
    // })
    // }
  }, []);

  console.log("CAR_CARD", car);
  return (
    <DsnLink
      className={`car-card-container ${!isVissible && "animate-on-mount"}`}
      href={`/${locale}/cars/${car.id}`}
      linkref={carRef}
      transitionPage={{title: `${car.make} ${car.model}`}}
    >
      {/* <a className={`car-card-container`} ref={carRef}> */}
      {/* IMAGE CONTAINER */}
      <div className="car-card-image-container">
        <Image
          src={car.images[0]}
          fill
          alt={`${car.make}-${car.model}-${car.year}-${car.color}`}
        />

        <div className="car-card-image-over" />

        {/* PRICE CONTAINER */}
        <div className="car-card-price-container">
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
            {/* <div className="neon-1"/>
            <div className="neon-2"/>
            <div/> */}
          </div>
          {/* NEON UNDERLINE END */}
        </div>
        {/* PRICE CONTAINER END */}
      </div>
      {/* IMAGE CONTAINER = END */}
      {/* FOOTER */}
      <div
        className="car-card-footer"
        style={{
          position: "absolute",
          bottom: "-18px",
          left: "12px",
          width: "calc(100% - 24px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p
          className={`${poppins.className}`}
          style={{
            fontWeight: 700,
            color: "#fff",
            fontSize: "22px",
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            textShadow: "4px 4px 4px #0006, 4px 4px 12px #0006",
            zIndex: 3,
          }}
        >
          {car.make} {car.model} {car.option} {car.year} {car.color}
        </p>
        {/* <button style={{color: "white", margin: "0 8px", padding: "0px 20px", borderRadius: "4px", border: "1px solid #fff"}}>Hello</button> */}
      </div>
      {/* FOOTER END */}
      {/* </a> */}
    </DsnLink>
  );
}
