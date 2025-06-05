"use client"
import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
import ButtonGradient from "../button/ButtonGradeint";
import ButtonTemplate from "../button/ButtonTemplate";
import CustomInput from "./CustomInput";
import ConnectionIcons from "./contuct-us/ConnectionIcons";
import { EConType } from "types/enum/ERequest";
import ConnectionInput from "./contuct-us/ConnectionInputs";
import { CustomCheckBox5 } from "./CustomCheckBox";
import CustomTextArea from "./CustomTextArea";
import { handleSubmitRequest } from "@/front-ecom/providers/handleSubmitRequest";
import { SuccessContactUsForm } from "./success-contact-us.form";

interface IProps {
  onClose?: (values: any) => any;
  onSubmit?: (values: any) => Promise<boolean>;
  initialValues?: any;
}

export default function ContactUsForm({
  onClose,
  onSubmit = handleSubmitRequest,
  initialValues = {},
}: IProps) {
  // const [connectionType, setConnectionType] = useState(EConType.WHATSAPP);
  const [moreInfo, setMoreInfo] = useState(false);
  const [state, setState] = useState<any>({connectionType: EConType.TELEGRAM, ...initialValues});
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const successOverlayRef = useRef<HTMLDivElement>(null);
  const successContentRef = useRef<HTMLDivElement>(null);

  function handleChange(name: string) {
    return function (value: any) {
      setState((oldValue: any) => ({ ...oldValue, [name]: value }));
    };
  }

  async function handleSubmit() {
    console.log('🚀 handleSubmit called');
    setIsSubmitting(true);

    try {
      console.log('📤 Submitting request...');
      const success = await onSubmit(state);
      console.log("✅ REQUEST COMPLETED WITH", success);
      setSuccess(success);
      
      if (success) {
        console.log('🎯 Starting success animation...');
        // Простая CSS анимация
        setShowAnimation(true);
        
        if (onClose) {
          setTimeout(() => {
            onClose(state);
          }, 5000);
        }
      }
    } catch (error) {
      console.error('❌ Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="form-contact-us" ref={formRef} style={{ 
        opacity: showAnimation ? 0 : 1,
        transform: showAnimation ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.3s ease'
      }}>
        {/* TITLE */}
        <div className="form-item">
          <h3>Let&apos;s get in touch</h3>
          {/* <h6 style={{opacity: .4}}>Choose form of connection</h6> */}
        </div>

        {/* CONNECTIONS RADIO */}
        <ConnectionIcons
          connectionType={state.connectionType}
          setConnectionType={handleChange("connectionType")}
          
        />

        <ConnectionInput
          connectionType={state.connectionType}
          state={state}
          handleChange={handleChange}
        />

        {/* INPUTS */}
        <CustomInput
          label="Your Name"
          placeholder="Alexander"
          value={state["name"]}
          onChange={handleChange("name")}
        />

        {/* CHECKBOX */}
        <CustomCheckBox5
          label="Want to add something?"
          classNameDiv="small"
          value={moreInfo}
          onChange={setMoreInfo}
          styleLabel={{ fontSize: "10px", letterSpacing: "2px" }}
        />

        {/* DESCRIPTION */}
        {moreInfo && (
          <CustomTextArea
            // type="textarea"
            label="Message"
            placeholder="Luxury car like Mercedes, BMW and Genesis..."
            value={state["description"]}
            onChange={handleChange("description")}
          />
        )}

        <div
          className="form-row"
          style={{ justifyContent: "space-between", marginTop: "12px" }}
        >
          {onClose && <ButtonTemplate onClick={() => onClose(state)}>Cancel</ButtonTemplate>}

          <ButtonGradient 
            className="submit-button"
            onClick={() => {
              if (!isSubmitting) {
                handleSubmit();
              }
            }}
            style={{ 
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
                Sending...
              </span>
            ) : (
              'Submit'
            )}
          </ButtonGradient>
        </div>

        {success === false && <p style={{ color: '#ff6b6b', marginTop: '12px' }}>Failed to send request. Please try again.</p>}
      </div>

      <SuccessContactUsForm success={success} showAnimation={showAnimation} />

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
