"use client"
import Link from "next/link";
import {LinkProps} from "next/link";
import {ReactNode, useEffect, useRef} from "react";
import {transitionPage} from "./EremiaType";
import {tdEnd, tdStart} from "./transition/transitionDefalut";
import {gsap} from "gsap";
import {useRouter, usePathname} from "next/navigation";
import { useLocale } from "@/localization/useLocale";
import { getLocaleUrl, isUrlMissingLocale } from "@/localization/getSetUrlLocale";


export interface LinkDsnProps extends LinkProps {
    children?: ReactNode,
    transitionPage?: transitionPage,
    className?: string,
    dangerouslySetInnerHTML?: {
        __html: string;
    } | undefined;
    linkref?: any

}


function DsnLink({children, className, href, linkref, transitionPage = true, ...restProps}: LinkDsnProps) {

    if(!linkref)
    linkref = useRef<HTMLAnchorElement>(null);
    const locale = useLocale();
    const router = useRouter();
    const path = usePathname;


    useEffect(() => {
        if (!transitionPage || !href || path === href)
            return;

        const isMissingLocale = isUrlMissingLocale(href as string);
        let localeHref: any;

        if(isMissingLocale) {
            localeHref = getLocaleUrl(locale, href as string);
        } else {
            localeHref = href;
        }


        const currentLink = linkref.current;
        const domTransition: { current: HTMLDivElement | null, tl: gsap.core.Timeline | null } = {
            current: null,
            tl: null
        };

        const handleClick = (e) => {
            e.preventDefault();
            if (domTransition.current !== null)
                return;

            [domTransition.current, domTransition.tl] = tdStart(transitionPage);
            domTransition.tl.call(() => {
                console.log("HREF", localeHref);

                router.push(localeHref);
                domTransition.tl.kill();
                domTransition.tl = null;
                domTransition.current = null;
                
                setTimeout(() => {
                    tdEnd()
                }, 1000)
            });


        }

        currentLink.addEventListener("click", handleClick);
        return () => {
            currentLink.removeEventListener("click", handleClick);
        }
    }, [transitionPage, router, href]);


    return <Link href={href} className={className} {...restProps} ref={linkref} >{children}</Link>;

}


export default DsnLink;