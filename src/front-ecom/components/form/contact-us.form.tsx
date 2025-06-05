"use client"
import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
import ButtonGradient from "../button/ButtonGradeint";
import ButtonTemplate from "../button/ButtonTemplate";
import CustomInput from "./CustomInput";
import ConnectionIcons from "./contuct-us/ConnectionIcons";
import { EConType, EConTypeId } from "types/enum/ERequest";
import ConnectionInput from "./contuct-us/ConnectionInputs";
import { CustomCheckBox5 } from "./CustomCheckBox";
import CustomTextArea from "./CustomTextArea";
import { handleSubmitRequest } from "@/front-ecom/providers/handleSubmitRequest";
import { SuccessContactUsForm } from "./success-contact-us.form";
import FormErrorMessage from "./FormErrorMessage";
import { useFormValidation, validateConnectionValue } from "@/front-ecom/hooks/useFormValidation";

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

  // Получаем имя текущего поля соединения
  const currentConnectionField = EConTypeId[state.connectionType as keyof typeof EConTypeId] || '';

  // Валидация формы
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZÀ-ÿ\u0400-\u04FF\s]+$/,
      custom: (value: string) => {
        if (value && value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return null;
      }
    },
    // Динамическое поле для соединения
    [currentConnectionField]: {
      required: true,
      custom: (value: string) => {
        return validateConnectionValue(value, state.connectionType);
      }
    },
    description: {
      maxLength: 500,
      custom: (value: string) => {
        if (value && value.trim().length > 500) {
          return 'Message is too long (max 500 characters)';
        }
        return null;
      }
    }
  };

  const { errors, validateForm, validateSingleField, clearFieldError } = useFormValidation(validationRules);

  function handleChange(name: string) {
    return function (value: any) {
      setState((oldValue: any) => ({ ...oldValue, [name]: value }));
      
      // Валидируем поле при изменении если есть ошибка
      if (errors[name]) {
        setTimeout(() => {
          validateSingleField(name, value);
        }, 300); // Небольшая задержка для лучшего UX
      }
    };
  }

  // Специальная обработка для изменения типа соединения
  function handleConnectionTypeChange(connectionType: EConType) {
    const oldConnectionField = EConTypeId[state.connectionType as keyof typeof EConTypeId] || '';
    const newConnectionField = EConTypeId[connectionType as keyof typeof EConTypeId] || '';
    
    setState((oldValue: any) => ({ 
      ...oldValue, 
      connectionType,
      [newConnectionField]: '', // Очищаем новое поле
      [oldConnectionField]: undefined // Убираем старое поле
    }));
    
    // Очищаем ошибки для полей соединения
    clearFieldError(oldConnectionField);
    clearFieldError(newConnectionField);
  }

  async function handleSubmit() {
    console.log('🚀 handleSubmit called');
    
    // Валидируем форму перед отправкой
    const isValid = validateForm(state);
    
    if (!isValid) {
      console.log('❌ Form validation failed', errors);
      // Можно добавить тряску формы или другую анимацию ошибки
      if (formRef.current) {
        formRef.current.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.style.animation = '';
          }
        }, 500);
      }
      return;
    }

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
          setConnectionType={handleConnectionTypeChange}
        />

        <ConnectionInput
          connectionType={state.connectionType}
          state={state}
          handleChange={handleChange}
          style={{
            borderColor: errors[currentConnectionField] ? '#ef4444' : undefined,
            boxShadow: errors[currentConnectionField] ? '0 0 0 1px #ef4444' : undefined
          }}
        />
        <FormErrorMessage error={errors[currentConnectionField]} />

        {/* INPUTS */}
        <CustomInput
          label="Your Name"
          placeholder="Alexander"
          value={state["name"]}
          onChange={handleChange("name")}
          style={{
            borderColor: errors.name ? '#ef4444' : undefined,
            boxShadow: errors.name ? '0 0 0 1px #ef4444' : undefined
          }}
        />
        <FormErrorMessage error={errors.name} />

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
          <>
            <CustomTextArea
              // type="textarea"
              label="Message"
              placeholder="Luxury car like Mercedes, BMW and Genesis..."
              value={state["description"]}
              onChange={handleChange("description")}
              style={{
                borderColor: errors.description ? '#ef4444' : undefined,
                boxShadow: errors.description ? '0 0 0 1px #ef4444' : undefined
              }}
            />
            <FormErrorMessage error={errors.description} />
            {state.description && (
              <div style={{ 
                fontSize: '11px', 
                color: state.description.length > 400 ? '#ef4444' : '#999',
                textAlign: 'right',
                marginTop: '4px'
              }}>
                {state.description.length}/500
              </div>
            )}
          </>
        )}

        <div
          className="form-row"
          style={{ justifyContent: "space-between", marginTop: "12px" }}
        >
          {onClose && <ButtonTemplate onClick={() => onClose(state)}>Cancel</ButtonTemplate>}

          <ButtonGradient 
            className={`submit-button ${isSubmitting ? "animate-120" : ""}`}
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </>
  );
}
