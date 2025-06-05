'use client'
import { getServerLocale } from "@/localization/getServerLocale";
import LineBackground from "@/front-ecom/layout/LineBackground";
import TitleSection from "@/front-ecom/components/heading/TitleSection";
import Accordion from "@/front-ecom/components/accordion/Accordion";
import { getFaqData } from "@/configs/(ecom)/faq";
import ParallaxImage from "@/front-ecom/components/Image/ParallaxImage";
import NextPage from "@/front-ecom/components/next/NextPage";
import Footer from "@/front-ecom/components/footer/Footer";
import TitleCover from "@/front-ecom/components/heading/TitleCover";
import React from "react";
import MoveTrigger from "@/front-ecom/animation/MoveTrigger";
import { poppins, roboto } from "@/front/fonts";
import FaqAccordion from "./FaqAccordion";

// export const metadata = {
//   title: "FAQ - Frequently Asked Questions",
//   description:
//     "Find answers to commonly asked questions about our car rental services",
// };

export default function FaqPage() {
  const faqData = getFaqData();

  return (
    <>
      <LineBackground />

      <div
        className="car-header-wrapper"
        style={{ paddingTop: "120px", paddingBottom: "60px" }}
      >
        <h6 className={`title-small ${poppins.className}`}>questions?</h6>

        <div>
          <h1 className={`title-big ${poppins.className}`}>FAQ</h1>

          <p className={roboto.className}>
            Find answers to the most common questions about our car rental
            services, booking process, and policies.
          </p>
        </div>
      </div>

      {/* Main FAQ Content */}
      <div className="container section-margin">
        <div className="row">
          <div className="col-lg-12">
            {faqData.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category mb-50">
                <h3 className={`faq-category-title mb-30 ${poppins.className}`}>
                  {category.title}
                </h3>
                
                <FaqAccordion items={category.items} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}

      {/* Next Page */}
      <NextPage className="section-padding border-top background-section" />

      {/* Footer */}
      <Footer className="background-section" />
    </>
  );
}
