"use client";
import "@fancyapps/ui/dist/fancybox.css";
import "flickr-justified-gallery/src/fjGallery.css";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/pagination";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import "@front-ecom/styles/style.scss";

import { Back, gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { Provider, useSelector } from "react-redux";

import dsnEffect, {
  moveSection,
  fade,
  textAnimation,
} from "@front-ecom/animation/dsnEffect";
import { RootState, store } from "@front-ecom/features/store";
import EremiaMenu from "@front-ecom/components/header/menu/EremiaMenu";
import OptionTheme from "@front-ecom/components/option-theme/OptionTheme";
import RightScrollTop from "@front-ecom/components/option-theme/RightScrollTop";
import { checkMobile, parallaxIt } from "@front-ecom/hooks/helper";
import LoadingPage from "@front-ecom/layout/LoadingPage";
import { tdEnd } from "@front-ecom/hooks/transition/transitionDefalut";
import CustomCursor from "@front-ecom/layout/CustomCursor";
import Script from "next/script";
import MainScrollBar from "@/front-ecom/layout/MainScrollBar";
import SocialOne from "@/front-ecom/components/social/SocialOne";
import Layout from "@/front-ecom/layout/Layout";
import ModalContact from "@/front-ecom/components/model-right/ModalContact";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

dsnEffect.registerEffect(moveSection, fade, textAnimation);

gsap.config({
  nullTargetWarn: false,
});
gsap.defaults({
  duration: 1,
  overwrite: "auto",
});

export default function RootLayout({ children, session, ...pageProps }: any) {

  const [creativeLine, setCreativeLine] = useState(true);
  //--> v-dark , v-light
  const [colorPage, setColorPage] = useState("v-dark");

  useEffect(() => {
    document.body.classList.add("dsn-line-style");

    if (checkMobile(true)) return;

    const options = Object.assign(
      {},
      {
        speed: 0.5,
        move: 20,
      }
    );

    const parallaxHover = document.body.querySelectorAll(
      '[data-dsn="parallax"]'
    );

    parallaxHover.forEach((item) => {
      /**
       * Append Icon
       */
      const icon = document.createElement("div");
      icon.classList.add("icon-circle");
      icon.style.minWidth = "1px";
      item.appendChild(icon);

      /**
       *
       */
      item.removeAttribute("data-dsn");
      item.classList.add("dsn-parallax-hover");
      const scale = item.classList.contains("image-zoom");
      const moveIcon = item.classList.contains("move-circle");

      const mouseEnter = function (e: any) {
        if (scale) gsap.to([item, icon], 0.3, { scale: 1.03 });
      };

      const mouseLeave = function (e: any) {
        gsap.to([item, icon], 1, {
          x: 0,
          y: 0,
          scale: 1,
          ease: Back.easeOut.config(4),
        });
      };

      const mouseMove = function (e: any) {
        parallaxIt(e, item, options);
        if (moveIcon)
          parallaxIt(e, icon, { ...options, move: options.move * 2 });
      };

      /**
       * Event
       */
      item.addEventListener("mouseenter", mouseEnter);
      item.addEventListener("mouseleave", mouseLeave);
      item.addEventListener("mousemove", mouseMove);
    });
  }, []);

  return (
    <html>
      <Head>
        <title>Green Age Rent a Car</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
      </Head>
      <Provider store={store}>
        <body className="">
          <div id="__dsn_content" className={colorPage}>
            <SessionProvider session={session}>
              {/* <LoadingPage /> */}
              <EremiaMenu hamburger={true} />
              
              <Layout modelRight={{children: <ModalContact/>, propsModal: {textBtn: "Contact"}}}>
                {children}
              </Layout>

              <OptionTheme
                lineTheme={[creativeLine, setCreativeLine]}
                pageColor={[colorPage, setColorPage]}
              />
              <RightScrollTop
                options={{ duration: 1.5, ease: "power4.inOut" }}
              />
              <CustomCursor
                duration={0.5}
                durationChangeSize={0.3}
                size={30}
                scale={75}
                ease="power2.out"
              />
            </SessionProvider>
          </div>
          <Script src="/js/splitting.min.js" strategy="beforeInteractive" />
          <Script src="/js/isotope.min.js" strategy="beforeInteractive" />
          <Script src="/js/fjGallery.min.js" strategy="beforeInteractive" />
        </body>
      </Provider>
    </html>
  );
}
