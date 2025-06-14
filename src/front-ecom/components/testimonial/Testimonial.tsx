"use client"
import  {ReactNode, useEffect, useRef} from 'react'

import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import MoveTrigger from "../../animation/MoveTrigger";
import {Controller, Pagination, Parallax, SwiperOptions, Thumbs} from "swiper";
import {dsnCN} from "../../hooks/helper";
import Image from "next/legacy/image";
import {ParallaxOption} from "../../../../types/DsnSwiper";
import {getTestimonialData} from '../../../configs/(ecom)/testimonial';
import {backgroundColor, styleBox} from "../../hooks/EremiaType";


interface TestimonialProps extends SwiperProps {
    className?: string,
    title?: string,
    desktop?: {} | SwiperOptions,
    mobile?: {} | SwiperOptions,
    tablet?: {} | SwiperOptions,
    parallaxImage?: object | ParallaxOption,
    parallaxContent?: object | ParallaxOption,
    styleBox?: styleBox,
    backgroundColor?: backgroundColor,
    skin?: [] | ["testimonials-half" | "testimonials-personal" | "box-line" | "box-half"],
    speed?: any,
    loopedSlides?: any,
    loop?: any,
    children?: ReactNode,
}

export default function Testimonial({
                         className,
                         title,
                         desktop = {
                            slidesPerView: 3,
                         },
                         mobile = {
                            slidesPerView: 2,
                         },
                         tablet = {
                            slidesPerView: 2,
                         },
                         parallaxImage,
                         parallaxContent,
                         speed,
                         skin = [],
                         loopedSlides,
                         backgroundColor,
                         styleBox,
                         loop,
                         // @ts-ignore
                         children,

                         ...restProps
                     }: TestimonialProps) {


    const TestimonialDetails = getTestimonialData();
    const testimonials = useRef<any>(null);
    const isLine = styleBox === "line";
    const isCorner = styleBox === "corner";

    useEffect(() => {
        const nav = testimonials.current.querySelector(".testimonial-nav .swiper")?.swiper;
        const content = testimonials.current.querySelector(".testimonial-content .swiper")?.swiper;
        if (!nav || !content)
            return;
        // nav.thumbs.swiper = content;
        nav.controller.control = content;
        content.controller.control = nav;


    }, []);

    return (
        <section className={dsnCN("testimonials", skin?.join(' ').trim(), className, title && 'testimonials-with-title')}
                 ref={testimonials}>

            <div className={dsnCN("testimonials-box  box-padding p-relative w-100", backgroundColor)}>


                {title && <div className="text-left">
                    <MoveTrigger from={{y: 0, opacity: 0}} to={{y: -60, opacity: 1}} tablet={false} mobile={false} >
                        {(ref: any) => <h2 className='p-relative section-title' ref={ref} dangerouslySetInnerHTML={{__html: title}}/>}
                    </MoveTrigger>
                </div>
                }


                {
                    isLine && (<>
                            <div className="line line-top"/>
                            <div className="line line-bottom"/>
                            <div className="line line-left"/>
                            <div className="line line-right"/>
                        </>
                    )
                }
                {isCorner && (<>
                    <div className="corner corner-left-top"/>
                    <div className="corner corner-left-bottom"/>
                    <div className="corner corner-right-top"/>
                    <div className="corner corner-right-bottom"/>
                </>)}


                <div className="testimonials-inner p-relative">


                    <div className="testimonial-nav">
                        <div className="testimonial-nav-inner">
                            <Swiper modules={[Parallax, Controller]} spaceBetween={30}
                                    slidesPerView={1}
                                    breakpoints={{
                                        992: desktop,
                                        768: tablet,
                                        576: mobile
                                    }}

                                    {...restProps}
                                    speed={speed}
                                    loop={loop}
                                    loopedSlides={loopedSlides}
                            >
                                {TestimonialDetails.map(($item, $index) =>
                                    <SwiperSlide key={$index} className="d-flex align-items-center">
                                        { $item?.src ?
                                        <div className="box-img" {...parallaxImage} style={{width: "70px"}}>
                                            <Image src={$item.src} width={80} height={80} alt={$item.name} sizes="(max-width: 768px) 70px,(max-width: 1200px) 70px,33vw"/>
                                        </div>
                                        : null}
                                        <div className="box-text" {...parallaxContent}>
                                            <h4 className="title-block testimonial-name">{$item.name}</h4>
                                            <h5 className="sm-title-block testimonial-description gradient-text">{$item.label}</h5>
                                        </div>
                                    </SwiperSlide>)}
                            </Swiper>
                        </div>
                    </div>

                    <div className="testimonial-content ">
                        <Swiper modules={[Pagination, Controller, Parallax]}
                                parallax
                                pagination={{clickable: true, el: '.swiper-pagination'}}
                                loop={loop}
                                loopedSlides={loopedSlides}
                                allowTouchMove={false} speed={speed}>
                            {TestimonialDetails.map(($item, $index) => <SwiperSlide key={$index}>
                                <p data-swiper-parallax="90%" data-swiper-parallax-opacity="0">{$item.description}</p>
                            </SwiperSlide>)}
                            {children}

                        </Swiper>

                    </div>


                </div>


            </div>
        </section>
    )
}