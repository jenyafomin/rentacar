import React from 'react';
import {dsnCN} from "../../hooks/helper";

function InfoBox({className}) {
    return (

        <div className={dsnCN('box-info-contact', className)}>
            <ul>
                <li>
                    <h5 className="title-block mb-15">Contact</h5>
                    <p className="text-p ">+971 (58) 911 3388</p>
                    <div className="over-hidden mt-5">
                        <a className="link-hover" data-hover-text="rentgreenage@gmail.com"
                           href="mailto:rentgreenage@gmail.com">rentgreenage@gmail.com</a>
                    </div>

                </li>
                <li>
                    <h5 className="title-block mb-15">Social Contacts</h5>
                    <div className="over-hidden mt-5">
                        <a className="link-hover" data-hover-text="whatsapp"
                        target="_blank"
                           href="https://wa.me/971589113388">whatsapp</a>
                    </div>
                    <div className="over-hidden mt-5">
                        <a className="link-hover" data-hover-text="telegram"
                        target="_blank"
                           href="https://t.me/GreenAgeDubai">telegram</a>
                    </div>
                </li>
                <li>
                    <h5 className="title-block mb-15">Address</h5>
                    {/* <p className="text-p">United Arab Emirates <br />  44 Street, Near Century Mall Al Mamzar, Dubai</p> */}
                    <p className="text-p">United Arab Emirates <br />  AG Auto Al Mamzar Branch, Dubai</p>
                </li>
                <li>
                    <h5 className="title-block mb-15">Follow Us</h5>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="TikTok." href="https://www.tiktok.com/@greenage.rentcar"
                           target="_blank" rel="nofollow">TikTok.</a>
                    </div>
                    <div className="social-item over-hidden">
                        <a className="link-hover" data-hover-text="Instagram." href="https://www.instagram.com/greenage.rentcar"
                           target="_blank" rel="nofollow">Instagram.</a>
                    </div>
                </li>
            </ul>
        </div>

    );
}

export default InfoBox;