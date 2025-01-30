import { dsnCN } from "../../hooks/helper";
import DsnGrid from "../../layout/DsnGrid";
import ContactForm from "../contact/ContactForm";
import InfoBox from "../contact/InfoBox";
import React from "react";
import ContactUsForm from "../form/contact-us.form";

function ModalContact({ className = "", ...restProps }) {
  return (
    <div className={dsnCN("section-padding", className)} {...restProps}>
      <DsnGrid col={2} colTablet={1}>
        <div className={"form-box"}>
          <div className="line line-top" />
          <div className="line line-bottom" />
          <div className="line line-left" />
          <div className="line line-right" />
          <ContactUsForm />
        </div>
        <InfoBox className="align-self-center" />
      </DsnGrid>
    </div>
  );
}

export default ModalContact;
