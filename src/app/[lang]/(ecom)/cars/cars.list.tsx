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
  // console.log("ALL CARS", allCars);
  // console.log("CARS", cars);

  useEffect(() => {
    // gsap.from(".car-card-container", { y: 40, opacity: 0 });
    gsap.to(".car-card-container", {
      y: 0,
      opacity: 1,
      stagger: 0.14,
      from: "center",
      ease: "power1.in",
      duration: 0.4
    });
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
          return <CarCard car={car} key={index} />;
        })}
      </div>
    </div>
  );
}
