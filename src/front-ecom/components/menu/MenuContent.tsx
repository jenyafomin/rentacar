import React from 'react';
import {dsnCN} from "../../hooks/helper";

function MenuContent({className}) {
    const socialData = [
        {link: "https://www.instagram.com/greenage.rentcar", name: "Instagram."},
        {link: "https://www.tiktok.com/@greenage.rentcar", name: "TikTok."},
        {link: "https://t.me/GreenAgeDubai", name: "Telegram."},
        {link: "https://wa.me/971589113388", name: "WhatsApp."}
    ];
    return (
        <div className={dsnCN('container-content  d-flex flex-column justify-content-center', className)}>
            <div className="nav__info">
                <div className="nav-content">
                    <h5 className="sm-title-block mb-10">Studio</h5>
                    <p>
                        AG Auto Al Mamzar Branch, Dubai
                    </p>

                </div>
                <div className="nav-content mt-30">
                    <h5 className="sm-title-block mb-10">Contact</h5>
                    <p className="links over-hidden mb-1">
                        <a className="link-hover" href="tel:+971589113388" data-hover-text="+971 (58) 911 3388">
                            +971 (58) 911 3388
                        </a>
                    </p>
                    <p className="links over-hidden">
                        <a className="link-hover" href="mailto:rentgreenage@gmail.com"
                           data-hover-text="rentgreenage@gmail.com">rentgreenage@gmail.com</a>
                    </p>
                </div>
            </div>
            <div className="nav-social nav-content mt-30">
                <div className="nav-social-inner p-relative">
                    <h5 className="sm-title-block mb-10">Follow us</h5>
                    <ul>
                        {socialData.map((item, index) =>
                            <li key={index}>
                                <a href={item.link} target="_blank" rel="nofollow noopener noreferrer">{item.name}</a>
                            </li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuContent;