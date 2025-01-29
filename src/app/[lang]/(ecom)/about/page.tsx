import React from "react";
import Layout from "@front-ecom/layout/Layout";
import SliderPortfolio from "@front-ecom/components/slider-portfolio/SliderPortfolio";
import HeroSection from "@front-ecom/components/hero-section/HeroSection";
import TitleSection from "@front-ecom/components/heading/TitleSection";
import ServiceOne from "@front-ecom/components/services/grid/ServiceOne";
import ParallaxImage from "@front-ecom/components/Image/ParallaxImage";
import MoveBox from "@front-ecom/components/move-box/MoveBox";
import Button from "@front-ecom/components/button/Button";
import PortfolioSwiper from "@/front-ecom/components/portfolio/CarsSwiper";
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


export default function About() {

    return (
        <>
        {/* // <Layout modelRight={{children: <ModalContact/>, propsModal: {textBtn: "Contact"}}}> */}
            {/* <Head>
                <title>Home | Eremia Creative Portfolio Multi-Purpose</title>
            </Head> */}

            <SliderPortfolio
                webgel
                fullWidth
                className={"align-items-end pb-80"}
                webgelOptions={{
                    displacement: "/img/displacement/8.jpg",
                    speedIn: 3.5,
                }}
                metaData={{hasSeparator: true}}
            />

            <HeroSection className="container section-margin container fill-right-container"
                         data-dsn-title="How We Are"/>

            {/*Start Service*/}
            <div className="container section-margin" data-dsn-title="Our Services">
                <TitleSection
                    className="align-items-center text-center"
                    description={"Our Services"}
                >
                    We are delivering beautiful <br/> digital products for you.
                </TitleSection>
                <ServiceOne/>
            </div>
            {/*End Service*/}

            {/*Start Box Info Move Content*/}
            <div className="p-relative section-margin">
                <ParallaxImage src="/img/project/project3/2.jpg" overlay={2}/>
                <MoveBox tablet={false}>
                    <TitleSection
                        className={`align-items-start mb-30`}
                        description={"Build perfect websites"}
                        defaultSpace={false}
                    >
                        Unlimited power
                    </TitleSection>

                    <p className="mb-10">
                        Most of our writings have centered on implementing strategies for
                        business units, with their unique
                    </p>
                    <p className="mb-30">
                        geeza arse it’s your round grub sloshed burke, my good sir chancer
                        he legged it he lost his bottle pear shaped bugger all mate
                    </p>

                    <Button href={"work-classic-2-col"} className={"image-zoom"} data-dsn="parallax" transitionPage={{title:"Our Portfolio"}}>
                        More Projects <span>⟶</span>
                    </Button>

                    <p className={`sm-p mt-15 theme-color`}>
                        NOTE : Some details are very important.
                    </p>
                </MoveBox>
            </div>
            {/*End Box Info Move Content*/}


            {/*Start Portfolio*/}
            <div className="section-margin" data-dsn-title="Our Portfolio">
                <TitleSection
                    className={`container align-items-center text-center`}
                    description={"Our Works"}
                >
                    Creative Portfolio <br/>
                    Designs
                </TitleSection>
                <PortfolioSwiper
                    grabCursor
                    cars={[]}
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
                </PortfolioSwiper>
            </div>
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


            {/*End testimonial Section*/}

            {/*Start box vertical Section*/}
            <section className="box-gallery-vertical container section-margin" data-dsn-title="Our Services">
                <DsnGrid col={2} colTablet={1} colGap={0} rowGap={0} rowGapTablet={0} rowGapMobile={0}>
                    <div className="p-relative mb-lg-section">
                        <div className="box-im w-100 h-100 p-absolute">
                            <ParallaxImage
                                // alt={""}
                                src={"/img/plan-project.jpg"}
                                overlay={3}
                                height="100%"
                                heightTable={"70vh"}
                                heightMobile={"70vh"}
                                // sizes="(max-width: 768px) 100vw,(max-width: 1200px) 70vw,33vw"
                            />
                        </div>
                    </div>
                    <div className="p-relative pt-lg-section">
                        <div className="box-info h-100 box-padding background-section ">
                            <DsnGrid className="box-info-inner" col={1} colGap={0}>
                                {/* <TitleCover>BRO RENT</TitleCover> */}
                                <TitleSection
                                    className={"text-uppercase"}
                                    description={"OUR PURPOSE"}
                                    defaultSpace={false}
                                >
                                    We Plan Your Project
                                </TitleSection>
                                {/* <Accordion>
                                    <AccordionItem title="Extensive Employment" active number={1}>
                                        <p>
                                            Quisque placerat vitae lacus ut sceleris queusce luctus
                                            odio ac nibh luctus, in porttitor.
                                        </p>
                                    </AccordionItem>
                                    <AccordionItem title="Dedicated Staff" number={2}>
                                        <p>
                                            Quisque placerat vitae lacus ut sceleris queusce luctus
                                            odio ac nibh luctus, in porttitor.
                                        </p>
                                    </AccordionItem>
                                    <AccordionItem title="User Experience" number={3}>
                                        <p>
                                            Cepteur sint occaecat cupidatat proident, taken possession
                                            of my entire soul, like these sweet mornings of spring
                                            which I enjoy with my whole.
                                        </p>
                                    </AccordionItem>
                                </Accordion> */}
                            </DsnGrid>
                        </div>
                    </div>
                </DsnGrid>
            </section>
            {/*End box vertical Section*/}

            {/*Start Blog*/}
            {/* <div className="section-margin" data-dsn-title="Lasts post">
                <TitleSection
                    className={`container  align-items-center text-center`}
                    description={"Lasts post"}
                >
                    Latest And Greatest <br/>
                    Post
                </TitleSection>
                <BlogSwiper
                    className="dsn-container"
                    grabCursor
                    desktop={{spaceBetween: 50, slidesPerView: 1.5}}
                    tablet={{spaceBetween: 30, slidesPerView: 1.3}}
                    mobile={{spaceBetween: 0, slidesPerView: 1}}
                    centeredSlides
                    loop
                    blur
                    parallax
                    speed={1200}
                    watchSlidesProgress
                    loopedSlides={2}
                    parallaxImage={{"data-swiper-parallax-scale": "0.85"}}
                    parallaxContent={{"data-swiper-parallax-opacity": "0.5"}}
                >
                    <SwiperPagination
                        className={`justify-content-between dsn-container mt-30`}
                    />
                </BlogSwiper>
            </div> */}
            {/*End Blog*/}

            {/*========== team Section ========== */}
            {/* <section className="container section-margin " data-dsn-title="Our Team">
                <TitleSection
                    className={` align-items-center text-center`}
                    description={"Our Team"}
                >
                    The Best Team Ever!
                </TitleSection>

                <Team col={3} colTablet={2}/>
            </section> */}
            {/*========== End team Section ========== */}

            {/*========== End brand-client Section ==========*/}
            {/* <section className="container section-margin" data-dsn-title="our clients">
                <TitleSection
                    className={`align-items-center text-center`}
                    description={"Our clients"}
                >
                    Your successful, our <br/>
                    reputation
                </TitleSection>

                <BrandClient col={4} colTablet={3} colMobile={2} colGap={0} rowGap={0}/>
            </section> */}
            {/*========== End brand-client Section ==========*/}

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
