import {dsnCN} from "../../hooks/helper";

import {LinkProps} from "next/dist/client/link";
import DsnLink from "../../hooks/DsnLink";
import {transitionPage} from "../../hooks/EremiaType";
import React, { CSSProperties } from "react";


interface ButtonProps {
    className?: string,
    href: string,
    borderRadius?: boolean,
    linkProps?: object | LinkProps,
    transitionPage?: transitionPage,
    borderStyle?: false | "border-color-default" | "border-color-theme-color" | "border-color-heading-color" | "border-color-body-color" | "border-color-main" | "border-color-assistant" | "border-color-gradient",
    style?: Partial<CSSProperties>,
    styleBorder?: Partial<CSSProperties>,
    children?: React.ReactNode,
}


function Button({
                    // @ts-ignore
                    className, borderRadius, children, href, LinkProps, style, styleBorder,
                    transitionPage = false,
                    borderStyle = "border-color-heading-color",
                    ...restProps
                }: ButtonProps) {

    return (
        <DsnLink transitionPage={transitionPage} href={href} {...LinkProps} style={style} className={dsnCN("dsn-button", className , borderRadius && "border-rdu")} {...restProps}>
                {borderStyle && <span style={styleBorder} className={dsnCN("dsn-border", borderStyle, borderRadius && "dsn-border-rdu")}/>}
                {children}
        </DsnLink>
    );
}

export default Button;