import { useRef, useState } from "react";

interface IProps {
  success: boolean | null;
  showAnimation: boolean;
}

export const SuccessContactUsForm = ({ success }: IProps) => {
  if (!success) return null;

  const successOverlayRef = useRef<HTMLDivElement>(null);
  const successContentRef = useRef<HTMLDivElement>(null);
  // const [showAnimation, setShowAnimation] = useState(false);

  return (
    <>
      <div
        ref={successOverlayRef}
        className="success-overlay-animated "
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        //   background: "linear-gradient(135deg, #d4f2ae 0%, #00ffb3 100%)",
          background: "linear-gradient(135deg,rgb(154, 190, 106) 0%,rgb(33, 157, 120) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          zIndex: 2,
          animation: success ? "slideInSuccess 0.6s ease forwards" : "",
        }}
      >
        <div
          ref={successContentRef}
          style={{ textAlign: "center", color: "white" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <svg
              className="checkmark"
              viewBox="0 0 52 52"
              width="80"
              height="80"
              style={{
                display: "block",
                margin: "0 auto",
                borderRadius: "50%",
                stroke: "white",
                strokeWidth: 3,
                strokeMiterlimit: 10,
                fill: "none",
                animation: success ? "bounceIn 0.8s ease 0.3s forwards" : "",
              }}
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                style={{
                  strokeDasharray: 166,
                  strokeDashoffset: 166,
                  stroke: "white",
                  strokeWidth: 3,
                  animation: success ? "drawCircle 0.8s ease 0.6s forwards" : "",
                }}
              />
              <path
                className="checkmark-check"
                fill="none"
                d="m14,27 l8,8 16,-16"
                style={{
                  strokeDasharray: 48,
                  strokeDashoffset: 48,
                  stroke: "white",
                  strokeWidth: 3,
                  animation: success ? "drawCheck 0.5s ease 1.2s forwards" : "",
                }}
              />
            </svg>
          </div>
          <h3
            className="success-title"
            style={{
              fontSize: "24px",
              fontWeight: 600,
              margin: "0 0 8px 0",
              opacity: 0,
              transform: "translateY(20px)",
              animation: success ? "fadeInUp 0.5s ease 1.4s forwards" : "",
            }}
          >
            Successfully Sent!
          </h3>
          <p
            className="success-message"
            style={{
              fontSize: "16px",
              opacity: 0,
              margin: 0,
              transform: "translateY(20px)",
              animation: success ? "fadeInUp 0.5s ease 1.6s forwards" : "",
            }}
          >
            Thank you for your request. We'll get back to you soon.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInSuccess {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.2);
            border-radius: 100%;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-radius: 4px;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
