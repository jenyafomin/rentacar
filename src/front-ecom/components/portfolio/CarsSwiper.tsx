"use client"
import {Swiper, SwiperSlide} from 'swiper/react';

import {Pagination, Parallax, SwiperOptions} from "swiper";


import CarSwiperItem from './CarSwiperItem';
import {getPortfolioData} from "../../../configs/(ecom)/portfolio";
import {dsnCN} from "../../hooks/helper";
import {ParallaxOption} from "../../../../types/DsnSwiper";
import {styleBox, stylePortfolio} from "../../hooks/EremiaType";
import { ICar } from 'types/Car';
import CarCard from '@/front-ecom/views/cars/car.card';





export interface CarsSwiperProps extends SwiperOptions {
    cars: Array<ICar>,
    desktop?: {} | SwiperOptions,
    mobile?: {} | SwiperOptions,
    tablet?: {} | SwiperOptions,
    className?: string,
    parallaxImage?: Object | ParallaxOption,
    parallaxContent?: Object | ParallaxOption,
    stylePortfolio?: stylePortfolio,
    blur?: boolean,
    styleBox?: styleBox

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
                        <CarSwiperItem portoDetails={car} car={car} textButton="View Case" parallaxImage={parallaxImage}
                                       parallaxContent={parallaxContent} styleBox={styleBox}/>
                        {/* <CarCard car={car} width='100%' isVissible={true} /> */}
                    </SwiperSlide>)
            }

            {children}

        </Swiper>

    );
}