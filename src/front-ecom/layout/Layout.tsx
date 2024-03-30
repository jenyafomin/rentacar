"use client";
import React, { ElementType, HTMLProps, useEffect, useRef } from "react";
import Script from "next/script";
import { Roboto, Poppins } from "next/font/google";
import { dsnCN, scrollTop } from "../hooks/helper";
import dataAttr from "../hooks/dataAttr";
import SocialOne from "../components/social/SocialOne";
import MainScrollBar from "./MainScrollBar";
import ModalRight from "../components/model-right/ModalRight";

import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { ScrollbarOptions } from "smooth-scrollbar/interfaces/index";

interface LayoutProps {
  className?: string;
  children?: any;
  tag?: ElementType;
  activeScrollbar?: boolean;
  colorVersion?: "dark" | "light";
  optionsScrollbar?: ScrollbarOptions | {};
  modelRight?: {
    children: any;
    propsModal: HTMLProps<HTMLButtonElement> & { textBtn?: string };
  };
}

// href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Poppins:wght@300;400;500;600;700&display=swap"

// @ts-ignore
export default function Layout({
  className,
  children,
  tag: Tag = "div",
  activeScrollbar = true,
  optionsScrollbar = { damping: 0.085, alwaysShowTracks: true },
  colorVersion = "dark",
  modelRight,
  ...restProps
}: LayoutProps) {
  const paginateRight = useRef(null);
  const scrollbar = useSelector((state: RootState) => state.scrollbar);

  useEffect(() => {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
      "width:100px;height:100px;overflow: scroll;position: absolute;top: -9999px;";
    document.body.appendChild(scrollDiv);
    document.body.style.setProperty(
      "--dsn-width-scroll",
      scrollDiv.offsetWidth - scrollDiv.clientWidth + "px"
    );

    document.body.removeChild(scrollDiv);
  }, []);

  useEffect(() => {
    const paginate = document.body.querySelectorAll("[data-dsn-title]");

    if (paginate && paginateRight.current !== null) {
        paginate.forEach((el: any) => {
          const title = dataAttr(el, "title", false, false);
          const scrollDiv = document.createElement("div");

          scrollDiv.classList.add("dsn-link-paginate");
          scrollDiv.innerText = title.toUpperCase();

          // @ts-ignore
          paginateRight.current.append(scrollDiv); 
          el["paginateTarget"] = scrollDiv;
          
          scrollDiv.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTop({ element: el, scrollbar, duration: -80 });
          });
        });
    }

    return () => {
      if (paginate) paginate.forEach((el: any) => el["paginateTarget"]?.remove());
    };
  }, [scrollbar]);

  return (
    <>
      <Tag
        id="main_layout"
        className={`background-main ${className}`}
        {...restProps}
      >
        <div
          className={`main-content ${activeScrollbar && "dsn-main-scrollbar"}`}
        >
          {activeScrollbar ? (
            <MainScrollBar options={optionsScrollbar}>
              <div id="main-content" className="p-relative">
                {children}
              </div>
            </MainScrollBar>
          ) : (
            <div id="main-content" className="p-relative">
              {children}
            </div>
          )}
        </div>

        <div className="line-border-style w-100 h-100" > 
           <div className="before" /> 
           <div className="after"/> 
        </div>
        <SocialOne />
        <div className="dsn-paginate-right-page" ref={paginateRight} />
        {modelRight && (
          <ModalRight {...modelRight.propsModal}>
            {modelRight.children}
          </ModalRight>
        )}
      </Tag>
    </>
  );
}
