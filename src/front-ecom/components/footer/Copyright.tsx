import {dsnCN} from "../../hooks/helper";

function Copyright({className, ...restProps}) {
    return (
        <h5 className={dsnCN(className)} {...restProps}>
            {new Date().getFullYear()} © Made with <span className="love">♥</span>by
            <a className="link-hover" data-hover-text="J FOM" target="_blank"
               rel="nofollow"
               style={{marginLeft: "4px"}}
               href="https://t.me/ff_future">J FOM</a>
        </h5>
    );
}


export default Copyright;