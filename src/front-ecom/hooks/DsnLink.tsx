"use client"
import Link from "next/link";
import {LinkProps} from "next/link";
import {CSSProperties, ReactNode, useEffect, useRef} from "react";
import {transitionPage} from "./EremiaType";
import {useRouter, usePathname} from "next/navigation";
import { useLocale } from "@/localization/useLocale";
import { convertToLocaleUrl } from "@/localization/getSetUrlLocale";
import { handleTransitionToUrl } from "./transition/handleTransition";


export interface LinkDsnProps extends LinkProps {
    children?: ReactNode,
    transitionPage?: transitionPage,
    className?: string,
    dangerouslySetInnerHTML?: {
        __html: string;
    } | undefined;
    linkref?: any;
    style?: Partial<CSSProperties>

}


function DsnLink({children, className, href, linkref, transitionPage = true, style, ...restProps}: LinkDsnProps) {

    if(!linkref)
    linkref = useRef<HTMLAnchorElement>(null);
    const locale = useLocale();
    const router = useRouter();
    const path = usePathname;


    useEffect(() => {
        if (!transitionPage || !href || path === href)
            return;

        const localeHref = convertToLocaleUrl(locale, href as string);
        
        const handleClick = handleTransitionToUrl({href: localeHref, router, transitionPage})
        
        const currentLink = linkref.current;
        currentLink.addEventListener("click", handleClick);
        return () => {
            currentLink.removeEventListener("click", handleClick);
        }
    }, [transitionPage, router, href]);

    if(!href) {
        // console.log("DSN LINK HREF EMPTY:", href);
        // console.log("DSN LINK HREF EMPTY:", transitionPage, className);
        // console.log("DSN LINK HREF EMPTY:", children);
        // return <>Children:{children}</>
        return <></>
    }
    return <Link href={href} style={style} className={className} {...restProps} ref={linkref} >{children}</Link>;

}


export default DsnLink;