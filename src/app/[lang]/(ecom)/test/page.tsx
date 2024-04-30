"use client";

import Button from "@/front-ecom/components/button/Button";
import ButtonGradient from "@/front-ecom/components/button/ButtonGradeint";
import ContactForm from "@/front-ecom/components/contact/ContactForm";
import DialogWrapper from "@/front-ecom/components/dialog/Dialog";
import { useState } from "react";
import SVG_IMage from "../../../../../public/img/mail.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import ButtonGradientIcon from "@/front-ecom/components/button/ButtonGradientIcon";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import ContactUsForm from "@/front-ecom/components/form/contact-us.form";
import { handleSubmitRequest } from "@/front-ecom/providers/handleSubmitRequest";

export default function TestPage() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div className="container" style={{ marginTop: "48px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "#fff0",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <ButtonGradient
            onClick={() => {
              setOpen((oldValue) => !oldValue);
            }}
          >
            POP UP
          </ButtonGradient>
          {open && <p>CLICKED</p>}
          <ButtonGradient
            onClick={() => {
              setOpen((oldValue) => !oldValue);
            }}
          >
            POP UP
          </ButtonGradient>
        </div>
      </div>

      {open && (
        <DialogWrapper open={open} setOpen={setOpen}>
            <ContactUsForm onClose={() => setOpen(false)} onSubmit={handleSubmitRequest} />
        </DialogWrapper>
      )}
    </>
  );
}
