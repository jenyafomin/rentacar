import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Parallax } from "swiper";

import Image from "next/image";
import { ICar } from "types/Car";
import { useEffect, useRef } from "react";

export default function ImagesSlider({
  car,
  setOpen,
}: {
  car: ICar;
  setOpen: (newValue: boolean) => any;
}) {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (swiperRef.current && !swiperRef.current?.contains(event.target)) {
        setOpen(false); // Call the onClose function passed from parent to close the slider
        console.log("CLICK OUTSIDE");
      } else {
        console.log("CLICK INSIDE"); // Never happened 🤷‍♂️
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div className="image-slider-wrapper">
      <Swiper
        modules={[Pagination, Parallax]}
        // style={{ width: "100%", height: "100%" }}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
        // }}
        ref={swiperRef}
        loop={true}
        parallax={true}
        spaceBetween={0}
        slidesPerView={1}
        speed={600}
        className=""
        // style={{background: "#000"}}
      >
        {car.images.map((image: string, index: number) => (
          <SwiperSlide
            key={index}
            style={{ justifyContent: "center", margin: "0 auto" }}
            className="image-slide"
          >
            <div
              style={{
                width: "80vw",
                aspectRatio: "16/9",
                position: "relative",
                margin: "0 auto",
              }}
            >
              <div className="close-btn" onClick={() => setOpen(false)} />
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                alt={car.make + " " + index}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
