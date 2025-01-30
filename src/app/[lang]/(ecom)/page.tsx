import React from "react";
import Layout from "@front-ecom/layout/Layout";
import SliderPortfolio from "@front-ecom/components/slider-portfolio/SliderPortfolio";
import HeroSection from "@front-ecom/components/hero-section/HeroSection";
import TitleSection from "@front-ecom/components/heading/TitleSection";
import ServiceOne from "@front-ecom/components/services/grid/ServiceOne";
import ParallaxImage from "@front-ecom/components/Image/ParallaxImage";
import MoveBox from "@front-ecom/components/move-box/MoveBox";
import Button from "@front-ecom/components/button/Button";
import CarsSwiper from "@/front-ecom/components/portfolio/CarsSwiper";
import SwiperPagination from "@front-ecom/components/swiper-pagination/SwiperPagination";
import Testimonial from "@front-ecom/components/testimonial/Testimonial";
import Accordion, {AccordionItem} from "@front-ecom/components/accordion/Accordion";
import DsnGrid from "@front-ecom/layout/DsnGrid";
import TitleCover from "@front-ecom/components/heading/TitleCover";
import BlogSwiper from "@front-ecom/components/bolg/BlogSwiper";
import Team from "@front-ecom/components/Team/Team";
import BrandClient from "@front-ecom/components/brand-client/BrandClient";

import NextPage from "@front-ecom/components/next/NextPage";
import Footer from "@front-ecom/components/footer/Footer";
import ModalContact from "@front-ecom/components/model-right/ModalContact";
import Head from "next/head";
import LineBackground from "../../../front-ecom/layout/LineBackground";
import ServiceSwiperOne from "@/front-ecom/components/services/swiper/ServiceSwiperOne";
import { makeApiCall } from "@/utils/fetch";
import { getServerLocale } from "@/localization/getServerLocale";
import { ICar } from "types/Car";
import BgDot from "@/front-ecom/components/header/BgDot";
import Facts from "@/front-ecom/components/facts/Facts";
import { getPortfolioData } from "@/configs/(ecom)/portfolio";
import { Methods_Get_Cars } from "@/app/api/cars/methods.enum";


export default async function About() {
    const locale = getServerLocale()
    const featuredCars = await makeApiCall<Array<ICar>>(locale!, `/api/cars?method=${Methods_Get_Cars.FEATURED}`)
    const sliderData = getPortfolioData()
    console.log("featuredCars", featuredCars?.length);
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
                    We are delivering beautiful <br/> digital products for you.
                </TitleSection>
                <ServiceSwiperOne/>
            </div>
            {/*End Service*/}


            {/*Start Portfolio*/}
            {featuredCars.length !== 0 && <div className="section-margin" data-dsn-title="Our Portfolio">
                <TitleSection
                    className="container align-items-center text-center"
                    description={"Our Works"}
                >
                    Creative Portfolio <br/>
                    Designs
                </TitleSection>
                <CarsSwiper
                    cars={featuredCars}
                    grabCursor
                    desktop={{spaceBetween: 50, slidesPerView: 1.5}}
                    tablet={{spaceBetween: 0, slidesPerView: 1.3}}
                    mobile={{slidesPerView: 1}}
                    stylePortfolio="work-section"
                    className="text-left v-dark-head title-inherit h4"
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

            {/*========== Next Page ==========*/}
            <NextPage className="section-padding border-top background-section"/>
            {/*========== End Next Page ==========*/}

            {/*========== Footer ==========*/}
            <Footer className="background-section"/>
            {/*========== End Footer ==========*/}
        {/* // </Layout> */}
        </>
    );
}
