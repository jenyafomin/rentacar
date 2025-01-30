import {dsnCN} from "../../hooks/helper";
import BgDot from "./BgDot";
import {backgroundColor} from "../../hooks/EremiaType";


interface HeaderNormalProps {
    className?: string,
    tag?: string,
    children?: any,
    container?: "container" | "dsn-container",
    backgroundColor?: backgroundColor,
    padding?: string,
}

function HeaderNormal({className, tag: Tag = "header",container="dsn-container", backgroundColor, children, padding="160px 0", ...restProps }: HeaderNormalProps) {


    return (
        // @ts-ignore
        <Tag className={dsnCN("header-normal", backgroundColor)} style={{padding}} {...restProps}>
            <BgDot/>
            <div className={dsnCN(container ,"h-100")}>
                <div className={dsnCN("content-hero p-relative d-flex flex-column", className)}>
                    {children}
                </div>
            </div>
        </Tag>
    );
}

export default HeaderNormal;