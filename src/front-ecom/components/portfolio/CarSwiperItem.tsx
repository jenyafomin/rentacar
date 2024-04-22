"use client";
import React, { useEffect, useRef } from "react";

import { getPortfolioLink } from "../../../configs/(ecom)/portfolio";
import { dsnCN } from "../../hooks/helper";
import BgImage from "../Image/BgImage";
import MetaPost from "../meta/MetaPost";
import DsnLink from "../../hooks/DsnLink";
import { ICar } from "types/Car";

interface ICarsSwiperItemProps {
  car: ICar;
  styleBox: any;
  height?: string;
  imageOnly: boolean;
  className?: string;
  parallaxContent: any;
  parallaxImage: any;
}

function CarsSwiperItem({
    car,
  styleBox,
  height = "100%",
  imageOnly,
  className = "",
  parallaxContent,
  parallaxImage,
}: ICarsSwiperItemProps) {
  const ref = useRef<any>(null);

  const isLine = styleBox === "line";
  const isCorner = styleBox === "corner";

  useEffect(() => {
    const video = ref.current.querySelector("video");
    if (!video) return;

    video.pause();
    const portItem = ref.current,
      mouseEnter = () => video.play(),
      mouseLeve = () => video.pause();

    portItem.addEventListener("mouseenter", mouseEnter);
    portItem.addEventListener("mouseleave", mouseLeve);

    return () => {
      if (!video) return;
      portItem.removeEventListener("mouseenter", mouseEnter);
      portItem.removeEventListener("mouseleave", mouseLeve);
    };
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const carUrl = `/cars/${car.id}`;
  
  return (
    <div className={dsnCN("portfolio-item work-item", className)} ref={ref}>
      <div className="inner-img box-img" {...parallaxImage}>
        <DsnLink
          href={carUrl}
          className="w-100 h-100 link-item"
          transitionPage={{ title: `${car.make} ${car.model}` }}
        >
          {isLine && (
            <>
              <div className="line line-top" />
              <div className="line line-bottom" />
              <div className="line line-left" />
              <div className="line line-right" />
            </>
          )}
          {isCorner && (
            <>
              <div className="corner corner-left-top" />
              <div className="corner corner-right-bottom" />
            </>
          )}
          <BgImage
            className={"dsn-swiper-parallax-transform "}
            src={car.images[0]}
            // video={portoDetails.video}
            alt={car.make}
            overlay={3}
            height={height}
            imageOnly={imageOnly}
          />
        </DsnLink>
      </div>
      <div className="info-text box-content" {...parallaxContent}>
        {car.categories && <MetaPost category={car.categories} />}

        {car.make && (
          <h4 className="title-block sec-title">
            <DsnLink
              href={carUrl}
              transitionPage={{ title: `${car.make} ${car.model}` }}
            >
              {car.make} {car.model} {car.option} {car.year}
            </DsnLink>
          </h4>
        )}
      </div>
    </div>
  );
}

export default React.memo(CarsSwiperItem);
