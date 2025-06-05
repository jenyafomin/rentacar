import React from 'react';

interface FormErrorMessageProps {
  error?: string;
  visible?: boolean;
  className?: string;
}

export default function FormErrorMessage({ 
  error, 
  visible = true, 
  className = '' 
}: FormErrorMessageProps) {
  if (!error || !visible) return null;

  return (
    <div 
      className={`form-error-message ${className}`}
      style={{
        color: '#ef4444',
        fontSize: '12px',
        marginTop: '4px',
        marginLeft: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        animation: 'fadeInError 0.3s ease-in-out',
        fontWeight: '500'
      }}
    >
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        style={{ flexShrink: 0 }}
      >
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>{error}</span>
      
      <style jsx>{`
        @keyframes fadeInError {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 