"use client";
import { useEffect, useState } from "react";
import ButtonGradient from "../button/ButtonGradeint";
import ButtonGradientIcon from "../button/ButtonGradientIcon";
import { faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { poppins } from "@/front/fonts";
import DialogWrapper from "../dialog/Dialog";
import ContactUsForm from "../form/contact-us.form";
import { handleSubmitRequest } from "@/front-ecom/providers/handleSubmitRequest";

export default function HeaderActions() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Эффект для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <div
        className={`header-actions ${scrolled ? "header-actions--scrolled" : ""}`}
      >
        <a
          href="tel:+71234567890"
          className={`gradient-text header-actions__phone ${poppins.className}`}
          style={{ paddingLeft: "10px" }}
        >
          {/* +971553344969 */}
          {/* +7 (123) 456-78-90 */}
          +971 55 334 44 969
        </a>

        <div className="header-actions__social">
          <ButtonGradientIcon
            icon={faTelegram}
            rounded
            onClick={() =>
              window.open("https://t.me/YourTelegramUsername", "_blank")
            }
            className="opacity-3"
            size="36px"
            iconSize="lg"
          />
          <ButtonGradientIcon
            icon={faWhatsapp}
            rounded
            className="opacity-3"
            onClick={() => window.open("https://wa.me/71234567890", "_blank")}
            size="36px"
            iconSize="lg"
          />
        </div>
        <div className="header-actions__separator"></div>

        <ButtonGradient
          onClick={() => {
            setOpen(true);
          }}
          className="header-actions__booking-btn opacity-3 animate-60  blur-12"
        >
          Quick Booking
        </ButtonGradient>

      </div>
      {open && (
        <DialogWrapper open={open} setOpen={setOpen}>
          <ContactUsForm
            onClose={() => setOpen(false)}
            onSubmit={handleSubmitRequest}
          />
        </DialogWrapper>
      )}
    </>
  );
}
