import MetaPost from "../meta/MetaPost";
import {dsnCN} from "../../hooks/helper";
import { ISliderItemProps } from '../../../configs/(ecom)/portfolio';
import Button from "../button/Button";
import {forwardRef} from "react";
import DsnLink from "../../hooks/DsnLink";
import ButtonGradient from "../button/ButtonGradeint";
import { handleTransitionToUrl } from "@/front-ecom/hooks/transition/handleTransition";
import { useRouter } from "next/navigation";

interface IContentSliderProps {
    data: Array<ISliderItemProps>,
    activeClass: number,
    className?: string,
    hasSeparator?: boolean,
    hasCategory?: boolean,
    hasDescription?: boolean,
    separateCat?: string,
}

function ContentSlider({
                           data,
                           activeClass,
                           className,
                           hasSeparator,
                           hasCategory = true,
                           hasDescription = true,
                           separateCat = ", ",
                           ...restProps
                       }: IContentSliderProps, ref: any) {

    const router = useRouter()
    
    return (
        <div className={dsnCN("dsn-slider-content hero-content dsn-container d-flex", className)} {...restProps}>

            {data.map((item: ISliderItemProps, key) =>{

                console.log("INDEX: ", key, "ITEM", item);
                const btn = item.btn
                const handleButtonClick = handleTransitionToUrl({router, href: btn?.href!, transitionPage: btn?.pageTransition})
                const isBtnDefined = (item.btn && item.btn.title && item.btn.href && true) || false;

                return <div className={`slide-content ${activeClass === key ? 'dsn-active' : ''}`} key={key} data-dsn-id={key}
                     ref={ref}>
                    {(item.subtitle) && <p className="description max-w570 mb-15">{item.subtitle}</p>}
                    {(item.category && hasCategory) && <MetaPost category={item.category} separate={separateCat}/>}

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h1 className="title" >
                        {
                            item.title ? <DsnLink  href={item.href}
                                    transitionPage={{title : item.title}}
                                >{item.title}</DsnLink>
                                : <>Hello</>
                                // <span dangerouslySetInnerHTML={{__html: item.title}}/>
                        }
                    {/* <a className="neon neon-1">{item.title}</a> */}
                        {/* <a className="neon neon-2">{item.title}</a>
                        <a className="neon neon-3">{item.title}</a> */}
                    </h1>
                        {isBtnDefined && <ButtonGradient className={`${btn?.color} animate`} onClick={handleButtonClick as any}>{btn?.title}</ButtonGradient>}
                     
                    </div>

                    {(hasSeparator && hasDescription) && <hr className="mt-20"/>}
                    {(item.description && hasDescription) &&
                    <div className="max-w570 mt-20 description">{item.description}</div>}
                    {/* {<Button className={"link-custom mt-20"} {...item.href} >{item.buttonText}</Button>} */}
                </div>}
            )}
        </div>
    );
}

export default forwardRef(ContentSlider);