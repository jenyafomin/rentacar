"use client"
import {CSSProperties, useEffect, useRef, useState} from 'react';
import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
// import { ImageProps } from "next/dist/client/image";
import Image from "next/legacy/image";

import {dsnCN} from "../../hooks/helper";

// @ts-ignore
export interface ParallaxImageProps {
    speed?: number ,
    parallax?: object,
    overlay?: number,
    height?: string,
    heightTable?: string,
    heightMobile?: string,
    triggerHook?: string | 'top' | "center" | "bottom",
    animationActive?: boolean,
    caption?: string,
    asBackground?: boolean,
    parallaxFrom?: object,
    className?: string,
    src: string
}

export default function ParallaxImage(
    {
        speed=30,
        parallax={},
        overlay=0,
        height="100vh",
        heightTable="80vh",
        heightMobile="50vh",
        triggerHook="bottom",
        animationActive=true,
        caption,
        className,
        asBackground,
        parallaxFrom,
        src,
        ...restProps
    }: ParallaxImageProps) {

    const target = useRef<any>(null);
    const activeAnimateTrigger = useRef<any>(null);
    const [active, setActive] = useState('');


    useEffect(() => {

        if (!src || !target.current)
            return;


        const img = { current : target.current.querySelector('.cover-bg-img')};


        if (triggerHook === 'bottom')
            gsap.set(img.current, {height: `+=${speed}%`, yPercent: `-=${speed}`});
        if (triggerHook === 'center')
            gsap.set(img.current, {height: `+=${speed / 2}%`, yPercent: `-=${speed / 2}`});

        if (parallaxFrom)
            gsap.set(img.current, parallaxFrom);


        if (animationActive)
            activeAnimateTrigger.current = ScrollTrigger.create({
                trigger: target.current,
                start: `top bottom`,
                onEnter: self => setActive('dsn-active')
            });

        const image = gsap.to(img.current, {
            ...parallax,
            yPercent: triggerHook === 'top' ? speed : 0,
            force3D: true,
            ease: "none",
            scrollTrigger: {
                trigger: target.current,
                start: `top ${triggerHook}`,
                scrub: true,
            }
        });


        return () => {
            gsap.set(img.current, {clearProps : "height,yPercent"});
            image?.scrollTrigger?.kill();
            image.kill();
            activeAnimateTrigger.current?.kill();
        }

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        src &&
        <div className={dsnCN('dsn-parallax-img', animationActive && 'dsn-animate', active , asBackground  && "dsn-bg-parallax", className)}
             data-overlay={overlay}
             ref={target}
             style={{'--height': height, '--height-table': heightTable, '--height-mobile': heightMobile} as CSSProperties}
        >
            <Image src={src} className="cover-bg-img p-absolute" layout={"fill"} alt={""} {...restProps} />
            {caption && <div className="cap"><span>{caption}</span></div>}
        </div>
    );
}