"use client"
import {ReactNode, useEffect, useRef} from 'react'
import {dsnCN} from "../../hooks/helper";
import ServiceItem, {dataServiceProps} from "./ServiceItem";
import DsnGrid, {DsnGridProps} from "../../layout/DsnGrid";
import {backgroundColor, styleBox} from "../../hooks/EremiaType";
import {SwiperSlide} from "swiper/react";
// import Isotope from "isotope-layout";
import {ParallaxOption} from "../../../../types/DsnSwiper";


export interface ServiceProps {
    styleBox?: styleBox,
    backgroundColor?: backgroundColor,
    className?: string,
    tag?: string | ReactNode,
    data?: [dataServiceProps],
    children?: any,
    isSwiper?: boolean,
    targetRef?: any,
    iconOption?: any,
    parallaxContent?: object | ParallaxOption

}


export default function Service({
                     className,
                     tag: Tag = 'div',
                     isSwiper,
                     data,
                     parallaxContent,
                     styleBox,
                     iconOption,
                     children,
                     backgroundColor,
                     ...restProps
                 }: ServiceProps) {
    const isLine = styleBox === "line";
    const isCorner = styleBox === "corner";
    const isList = styleBox === "list";


    return (
        // @ts-ignore
        <Tag
            className={dsnCN("services  p-relative ",
                isLine ? "with-line with-number" : "",
                isList ? "service-list" : "",
                isCorner ? "with-line" : "", className || "")}
            {...restProps} >
            {
                (!isSwiper && data) && data.map((item, index) => <ServiceItem key={index} data={item}
                                                                              backgroundColor={backgroundColor}
                                                                              iconOption={iconOption}
                                                                              isLine={isLine} isCorner={isCorner}/>)
            }
            {
                (isSwiper && data) && data.map((item, index) =>
                    <SwiperSlide key={index}>
                        <ServiceItem data={item} backgroundColor={backgroundColor} iconOption={iconOption}
                                     isLine={isLine} isCorner={isCorner} {...parallaxContent}/>
                    </SwiperSlide>
                )
            }
            {children}

        </Tag>
    );
}


interface serviceGridProps extends ServiceProps {
    masonry?: boolean,
}

export const ServiceGrid = ({masonry, iconOption, className, ...props}: serviceGridProps & DsnGridProps) => {

    const iso = useRef<HTMLDivElement>(null);


    useEffect(() => {

        if (!iso.current)
            return;

        // @ts-ignore
        const isotope = new Isotope(iso.current.querySelector('.dsn-grid-layout'), {itemSelector: '.grid-item'});

        return () => {
            isotope.destroy();
        }
    }, []);


    if (masonry)
        return <div className={dsnCN("dsn-isotope ", className)} ref={iso}>
            <Service className={"dsn-grid-masonry"} iconOption={iconOption} {...props} tag={DsnGrid}/>
        </div>


    return <Service className={className} iconOption={iconOption}  {...props} tag={DsnGrid}/>
}

Service.grid = ServiceGrid;


