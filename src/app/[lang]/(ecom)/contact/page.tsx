import React from "react";
import Head from "next/head";
import Footer from "@/front-ecom/components/footer/Footer";
import NextPage2 from "@/front-ecom/components/next/NextPage2";
import DsnGrid from "@/front-ecom/layout/DsnGrid";
import ContactForm from "@/front-ecom/components/contact/ContactForm";
import InfoBox from "@/front-ecom/components/contact/InfoBox";
import Map from "@/front-ecom/components/Map/Map";
import HeaderNormal from "@/front-ecom/components/header/HeaderNormal";
import ContactUsForm from "@/front-ecom/components/form/contact-us.form";

export default function About() {
  return (
    <>
      <Head>
        <title>Contact Us | Eremia Creative Portfolio Multi-Purpose</title>
      </Head>
      {/*========== Header Normal ========== */}
      <HeaderNormal className="text-center" padding="120px 0 0 0">
        <p className="subtitle p-relative line-shape  mb-20">
          <span className="pl-10 pr-10 background-section">GREEN AGE : RENT A CAR</span>
        </p>
        <h1 className="title text-uppercase">
          Look around you
          <br /> everything is changing.
        </h1>
        <p className="dsn-heading-title mt-15 max-w570">
          What if the time has come for you to change? Starting a collaboration
          is easy! Order a free consultation or call back. We are always in
          touch and happy to cooperate with you
        </p>
      </HeaderNormal>

      {/*Start Contact Form && Info Box*/}
      <div className="section-margin container">
        <DsnGrid col={2} colTablet={1}>
          {/* <ContactForm /> */}
          <div className={'form-box'}>
                <div className="line line-top" />
                <div className="line line-bottom" />
                <div className="line line-left" />
                <div className="line line-right" />
                <ContactUsForm />
          </div>
          <InfoBox className="align-self-center" />
        </DsnGrid>
      </div>

      {/*========== End Header Normal ==========*/}
      {/*Start Map*/}
      <Map
        mapKey="AIzaSyDMyAS2jdzj-vdgBIFaIStYOWJtSlghndg"
        zoom={13}
        height="80vh"
        defaultCenter={{ lat: 25.2048, lng: 55.2708 }}
      />

      {/*========== Start Next Page Section ==========*/}
      <NextPage2 className={`background-section section-padding`} />
      {/*========== End Next Page Section ==========*/}

      {/*========== Footer ==========*/}
      <Footer className="background-section" />
      {/*========== End Footer ==========*/}
    </>
  );
}
