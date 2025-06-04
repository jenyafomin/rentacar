"use client"
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';

import {Pagination, Parallax, SwiperOptions} from "swiper";


import CarSwiperItem from './CarSwiperItem';
import {dsnCN} from "../../hooks/helper";
import {ParallaxOption} from "../../../../types/DsnSwiper";
import {styleBox, stylePortfolio} from "../../hooks/EremiaType";
import { ICar } from 'types/Car';
import { ReactNode } from 'react';





export interface CarsSwiperProps extends SwiperProps {
    cars: Array<ICar>,
    desktop?: {} | SwiperOptions,
    mobile?: {} | SwiperOptions,
    tablet?: {} | SwiperOptions,
    className?: string,
    parallaxImage?: object | ParallaxOption,
    parallaxContent?: object | ParallaxOption,
    stylePortfolio?: stylePortfolio,
    blur?: boolean,
    styleBox?: styleBox,
    children?: ReactNode

}

export default function CarsSwiper(
    {   
        cars,
        desktop={
            slidesPerView: 3
        },
        mobile={
            slidesPerView: 2
        },
        stylePortfolio,
        tablet={
            slidesPerView: 2
    
        },
        className = "",
        parallaxImage,
        styleBox ,
        parallaxContent,
        blur ,
        // @ts-ignore
        children,
        ...restProps
    }: CarsSwiperProps
) {

    console.log("CAR_SWIPER CARS:", cars.length);
    return (
        <Swiper
            modules={[Pagination, Parallax]}
            pagination={{clickable: true, el: '.swiper-pagination' , dynamicBullets:true}}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
                992: desktop,
                768: tablet,
                576: mobile
            }}

            className={dsnCN("work", className, stylePortfolio || "" , blur && "has-blur" || "")}
            {...restProps}


        >
            {
                cars.map((car, index) =>
                <SwiperSlide key={index}>
                        {/* {<CarCard car={car} />} */}
                        {/* {car.make} */}
                        <CarSwiperItem car={car} parallaxImage={parallaxImage}
                                       parallaxContent={parallaxContent} styleBox={styleBox}/>
                        {/* <CarCard car={car} width='100%' isVissible={true} /> */}
                    </SwiperSlide>)
            }

            {children}

        </Swiper>

    );
}