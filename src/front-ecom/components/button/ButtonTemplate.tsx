import { poppins } from "@/front/fonts";
import { CSSProperties, ReactNode } from "react";

interface IProps {
    className?: string;
    type?: "gradient" | "text-shadow" | "bordered";
    inActive?: boolean;
    style?: Partial<CSSProperties>;
    onClick: () => any;
    children?: ReactNode;
  }

export default function ButtonTemplate({children, className, type, inActive=false, style, onClick }: IProps) {
    let typeClassName;
    switch(type) {
        
        case "text-shadow":
            break;
        case "bordered":
            break;
        
        default:
        case "gradient":
            typeClassName = "ff-btn btn-gradient"
            break;
    }

    return <button onClick={onClick} className={`ff-btn  ${className} ${inActive && "inActive"} text-shadow ${poppins.className}`}>{children}</button>
}