import {dsnCN} from "../../hooks/helper";

export interface dataServiceProps {
    icon?: any,
    title?: string,
    description?: string
}

export interface ServiceItemProps {
    data?: dataServiceProps,
    isLine?: boolean,
    isCorner?: boolean,
    isList?: boolean,
    backgroundColor?: string,
    iconOption?: any,
    key?: any

}


function ServiceItem({data, isLine, isCorner, backgroundColor, iconOption, ...restProps}: ServiceItemProps) {

    const {className: classNameIcon} = iconOption || {};

    const Icon = data?.icon;

    return (<div className="services-item p-relative grid-item" {...restProps}>
        <div className="services-item-inner">
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
                <div className="corner corner-right-bottom"/>
            </>)}


            <div className={dsnCN('services-content', backgroundColor || "")}>
                {/* <svg className="gradient" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <linearGradient id="gradient">
                        <stop offset="0%" stop-color="var(--theme-color)" />
                        <stop offset="100%" stop-color="var(--theme-color2)" />
                    </linearGradient>
                </svg> */}

                <div  {...iconOption} className={dsnCN("icon",  classNameIcon)}>
                    {data?.icon}
                </div>
                <div className="service-description">
                    <h4 className="title-block service-title">{data?.title}</h4>
                    <p>{data?.description}</p>
                </div>

            </div>
        </div>
    </div>)
}


export default ServiceItem;
