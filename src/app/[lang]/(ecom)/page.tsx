import React from "react";
import SliderPortfolio from "@front-ecom/components/slider-portfolio/SliderPortfolio";
import TitleSection from "@front-ecom/components/heading/TitleSection";
import CarsSwiper from "@/front-ecom/components/portfolio/CarsSwiper";
import SwiperPagination from "@front-ecom/components/swiper-pagination/SwiperPagination";
import Testimonial from "@front-ecom/components/testimonial/Testimonial";
import { getVideoTestimonialsData } from "@/configs/(ecom)/videoTestimonials";

import NextPage from "@front-ecom/components/next/NextPage";
import Footer from "@front-ecom/components/footer/Footer";
import LineBackground from "../../../front-ecom/layout/LineBackground";
import ServiceSwiperOne from "@/front-ecom/components/services/swiper/ServiceSwiperOne";
import { makeApiCall } from "@/utils/fetch";
import { getServerLocale } from "@/localization/getServerLocale";
import { ICar } from "types/Car";
import { getPortfolioData } from "@/configs/(ecom)/portfolio";
import { Methods_Get_Cars } from "@/app/api/cars/methods.enum";
import CarsGrid from "@/front-ecom/components/cars-grid/CarsGrid";


export default async function About() {
    const locale = getServerLocale()
    const featuredCars = await makeApiCall<Array<ICar>>(locale!, `/api/cars?method=${Methods_Get_Cars.FEATURED}`)
    const allCars = await makeApiCall<Array<ICar>>(locale!, `/api/cars?available=true`)
    const sliderData = getPortfolioData()
    const videoTestimonials = getVideoTestimonialsData();
    
    return (
        <>
            <LineBackground classNameWrapper="large" />
            <SliderPortfolio
                webgel
                data={sliderData}
                fullWidth
                className={"align-items-end pb-80"}
                webgelOptions={{
                    displacement: "/img/displacement/8.jpg",
                    speedIn: 3.5,
                }}
                metaData={{hasSeparator: true}}
            />

            {/*Start Service*/}
            <div className="container section-margin" data-dsn-title="our Services">
                <TitleSection description={"WHY CHOOSE US?"} className="align-items-center text-center">
                Your hassle-free <br/> car rental journey starts here.
                </TitleSection>
                <ServiceSwiperOne/>
            </div>
            {/*End Service*/}

            {/*Start Cars Grid*/}
            {/*End Cars Grid*/}

            {/*Start Portfolio*/}
            {featuredCars.length !== 0 && <div className="section-margin" data-dsn-title="Our Portfolio">
                <TitleSection
                    className="container align-items-center text-center"
                    description={"Cars"}
                >
                    Featured
                </TitleSection>
                <CarsSwiper
                    cars={featuredCars}
                    grabCursor
                    desktop={{spaceBetween: 50, slidesPerView: 1.5}}
                    tablet={{spaceBetween: 0, slidesPerView: 1.3}}
                    mobile={{slidesPerView: 1}}
                    stylePortfolio="work-section"
                    className="text-left v-dark-head title-inherit h4 full-width"
                    centeredSlides
                    loop
                    blur
                    parallax
                    speed={1200}
                    watchSlidesProgress
                    loopedSlides={2}
                    parallaxImage={{"data-swiper-parallax-scale": "0.85"}}
                    parallaxContent={{"data-swiper-parallax-opacity": "0"}}
                >
                    <SwiperPagination
                        className={`justify-content-between dsn-container mt-30`}
                    />
                </CarsSwiper>
            </div>}

            {/* <TitleSection
                    className="container align-items-center text-center"
                    description={"Cars"}
                >
                    Available Now
                </TitleSection> */}
            <CarsGrid 
                cars={allCars.slice(0, 10)} 
                className="section-margin"
                title="Available Now"
                description="Cars"
            />
            {/*End Portfolio*/}

            {/*Start testimonial Section*/}
            <div className="section-margin" data-dsn-title="Testimonials">
                <Testimonial className="container section-margin" title="Feedback from our clients."
                             skin={["testimonials-half"]}
                             backgroundColor={"background-section"}
                             desktop={{slidesPerView: 2}}
                             mobile={{slidesPerView: 1}}
                             speed={1000} grabCursor loop loopedSlides={2}
                             parallax parallaxImage={{"data-swiper-parallax-scale": 0.7}}
                             parallaxContent={{"data-swiper-parallax-opacity": 0, "data-swiper-parallax": "30%"}}
                >
                    <SwiperPagination className={`justify-content-between dsn-container mt-30`}/>
                </Testimonial>
            </div>
            
            {/*Start Video Testimonials Section*/}
            {/* <VideoTestimonials 
                videos={videoTestimonials}
                className="section-margin"
                title="Feedback from our clients in video format"
            /> */}
            {/*End Video Testimonials Section*/}

            {/*========== Next Page ==========*/}
            <NextPage className="section-padding border-top background-section"/>
            {/*========== End Next Page ==========*/}

            {/*========== Footer ==========*/}
            <Footer className="background-section"/>
            {/*========== End Footer ==========*/}
        </>
    );
}
