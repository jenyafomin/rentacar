import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareAlt} from "@fortawesome/free-solid-svg-icons/faShareAlt";
import {faFacebookF, faTwitter, faInstagram, faDribbble, faTiktok, faWhatsapp, faTelegram} from '@fortawesome/free-brands-svg-icons';
import {dsnCN} from "../../hooks/helper";


const socialData = [
    {link: "https://www.tiktok.com/@greenage.rentcar", icon: faTiktok, name: "Tt"},
    {link: "https://www.instagram.com/greenage.rentcar", icon: faInstagram, name: "In"},
    {link: "https://wa.me/971589113388", icon: faWhatsapp, name: "Wp"},
    {link: "https://t.me/GreenAgeDubai", icon: faTelegram, name: "Tg"},
];


function SocialOne({className="" , ...restProps}) {
    return (
        <div className={dsnCN("social-side social-network d-flex align-items-center" , className)} {...restProps}>
            <div className="icon" data-dsn="parallax">
                <FontAwesomeIcon icon={faShareAlt}/>
            </div>
            <ul className="socials d-flex flex-column p-absolute ">
                {socialData && socialData.map(($item, number) => <li key={number} style={{"--dsn-index-animate":socialData.length - number -1}}>
                    <a href={$item.link} target="_blank">
                        <FontAwesomeIcon icon={$item.icon}/>
                        <span>{$item.name}</span>
                    </a>
                </li>)}
            </ul>
        </div>
    );
}


export default SocialOne;