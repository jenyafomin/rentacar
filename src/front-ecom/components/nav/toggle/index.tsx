import React, {useEffect, useRef} from "react";
import dsnSplitting from "../../../hooks/spltting";
import {dsnCN} from "../../../hooks/helper";
import SvgAnimate from "../../../animation/SvgAnimate";

interface IProps {
    textOpen: string;
    textMenu: string;
    textClose: string;
    targetNav: any;
    reserved: boolean;
    setReserved: (newValue: boolean) => any;
    removeOpenMenu: () => any;
    className?: string;
}
function Toggle({
                    textOpen,
                    textMenu,
                    textClose,
                    targetNav,
                    reserved,
                    setReserved,
                    removeOpenMenu,
                    className,
                    ...restProps
                }: IProps) {
    
    // @ts-ignore
    const $this = this;
    const splitMenu = useRef<any>();
    const splitOpen = useRef<any>();
    const splitClose = useRef<any>();
    const navbarToggle = useRef<any>();
    const svg = useRef<any>();
    const backgroundMain = useRef<any>();

    const TransEnd = () => {
        !reserved && targetNav.current.querySelector('.primary-nav')?.classList.add('open');
    }
    const onCompleteAnimate = (e: any) => {
        targetNav.current?.classList.toggle('dsn-open');
        navbarToggle.current?.classList.toggle('open');
        document.body.classList.toggle('over-hidden')
    }


    const toggleClick = (e: any) => {

        setReserved(!reserved)

        if (reserved)
            removeOpenMenu();



        if (!reserved) {
            // @ts-ignore
            SvgAnimate.up(svg.current, TransEnd)
                .to("#dsn-scrollbar", {y: -200, duration: 1, ease: 'power4.in',}, "top")
                .set(backgroundMain.current, {autoAlpha: 1}, "center");
            onCompleteAnimate($this); 
        } else
        // @ts-ignore
            SvgAnimate.down(svg.current
                , () => onCompleteAnimate($this)
            )
                .to("#dsn-scrollbar", {y: 0, clearProps: "y", duration: 1, ease: 'power4',}, "-=1")
                .set(backgroundMain.current, {autoAlpha: 0}, "center");
    }


    useEffect(() => {
        dsnSplitting.Char(splitMenu.current);
        dsnSplitting.Char(splitOpen.current);
        dsnSplitting.Char(splitClose.current);
    }, []);

    return (
        <>
            <div id="navbar_toggle" className={dsnCN('navbar-toggle', className || "")} {...restProps} onClick={toggleClick} ref={navbarToggle}>
                <div className="toggle-icon">
                    <div className="toggle-line"/>
                    <div className="toggle-line"/>
                    <div className="toggle-line"/>
                </div>
                <div className="toggle-text">
                    <div className="text-menu" ref={splitMenu}>{textMenu}</div>
                    <div className="text-open" ref={splitOpen}>{textOpen}</div>
                    <div className="text-close" ref={splitClose}>{textClose}</div>
                </div>

            </div>
            <div className="bg-load background-main" ref={backgroundMain}/>

            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"
                 className="bg-load dsn-svg-transition">
                <path vectorEffect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" ref={svg}/>
            </svg>
        </>

    );
}


export default React.memo(Toggle);
