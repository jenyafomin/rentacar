import React, { ReactNode } from 'react';
import {dsnCN} from "../../hooks/helper";

type func<T=any|undefined> = (props?: T) => any;
interface IProps {
    className?: string;
    classTitle?: string;
    tag?: string;
    defaultSpace?: boolean;
    children: ReactNode | func;
    description?: string;
    classDesc?: string;
    classDesInner?: string;
    dirDescription?: string;

}
function TitleSection({
                          className,
                          classTitle,
                          tag: Tag = 'h2',
                          defaultSpace = true,
                          children,
                          description,
                          classDesc,
                          classDesInner,
                          dirDescription = "before"
                      }: IProps) {


    const P = () => description &&
        <p className={`sub-heading ${classDesc}`}><span className={`${classDesInner}`}>{description}</span></p>;

    return (
        <>
            <div className={`title-heading d-flex flex-column ${className} ${defaultSpace && "mb-70"}`}>
                <div>
                    {dirDescription === "before" && <P/>}
                    {/* @ts-ignore */}
                    {children && <Tag className={`section-title  title-cap ${classTitle}`}>
                        {typeof  children === "function" ? children() : children}
                    </Tag>}
                    {dirDescription === "after" && <P/>}
                </div>
            </div>

        </>

    );
}

export default TitleSection;