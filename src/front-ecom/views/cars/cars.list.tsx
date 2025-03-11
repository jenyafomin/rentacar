"use client";
import {
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ICar } from "types/Car";
import CarsHeaderList from "./cars.header-list";
import CarCard from "./car.card";
import gsap from "gsap";

export default function CarsList({
  cars: allCars,
  gap = "6%",
  rowGap = "40px",
  style = {},
}: {
  cars: ICar[];
  gap?: string;
  rowGap?: string;
  style?: CSSProperties;
}) {
  const [cars, setCars] = useState(allCars);
  
  useEffect(() => {
    const animation = gsap.to(".car-card-container", {
      // scrollTrigger: {
      //   trigger: ".car-card-container",
      //   scrub: true,
      //   markers: true,
      //   start: "top 90%",
      //   end: "top 100%",
      //   toggleActions: "play none none none none"
      // },
      y: 0,
      opacity: 1,
      stagger: 0.14,
      // from: "top 90%",
      // end: "top 100%",
      ease: "power1.in",
      duration: 0.4,
      // marker: true
    });
    
    return () => {animation.revert()}
  }, []);

  return (
    <div
      className="cars-list-wrapper"
      style={{ display: "flex", flexDirection: "column", marginTop: "70px" }}
    >
      <CarsHeaderList cars={cars} />

      <div
        className="cars-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap,
          rowGap,
          justifyContent: "center",
          marginTop: "20px",
          ...style,
        }}
      >
        {cars.map((car, index) => {
          return <CarCard car={car} key={index} isVissible={false} />;
        })}
      </div>
    </div>
  );
}
