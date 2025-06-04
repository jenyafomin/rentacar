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

    // if(!linkref)
    linkref = useRef<HTMLAnchorElement>(null);
    const locale = useLocale();
    const router = useRouter();
    const currentPath = usePathname();

    useEffect(() => {
        if (!transitionPage || !href || currentPath === href)
            return;

        const localeHref = convertToLocaleUrl(locale, href as string);
        
        const handleClick = handleTransitionToUrl({href: localeHref, router, transitionPage})
        
        const currentLink = linkref.current;
        if (currentLink) {
            // Предзагружаем страницу при наведении для ускорения
            const handleMouseEnter = () => {
                console.log('🖱️ Preloading on hover:', localeHref);
                router.prefetch(localeHref);
            };
            
            currentLink.addEventListener("click", handleClick);
            currentLink.addEventListener("mouseenter", handleMouseEnter, { once: true });
            
            return () => {
                currentLink.removeEventListener("click", handleClick);
                currentLink.removeEventListener("mouseenter", handleMouseEnter);
            }
        }
    }, [transitionPage, router, href, currentPath, locale]);

    if(!href) {
        // console.log("DSN LINK HREF EMPTY:", href);
        // console.log("DSN LINK HREF EMPTY:", transitionPage, className);
        // console.log("DSN LINK HREF EMPTY:", children);
        // return <>Children:{children}</>
        return <></>
    }

    const localeHref = convertToLocaleUrl(locale, href as string);
    
    return <Link href={localeHref} style={style} className={className} {...restProps} ref={linkref} >{children}</Link>;

}


export default DsnLink;