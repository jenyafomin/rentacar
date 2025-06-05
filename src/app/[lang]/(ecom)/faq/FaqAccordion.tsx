'use client'
import React, { useState } from 'react';
import { poppins, roboto } from '@/front/fonts';

interface FaqAccordionProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Первый элемент открыт по умолчанию

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`faq-accordion__item ${activeIndex === index ? 'active' : ''}`}
        >
          <div 
            className={`faq-accordion__question ${poppins.className}`}
            onClick={() => toggleItem(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem(index);
              }
            }}
          >
            <span className="question-text">{item.question}</span>
            <span className="faq-accordion__arrow">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                className={`arrow-icon ${activeIndex === index ? 'rotated' : ''}`}
              >
                <path 
                  d="M4 6L8 10L12 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          
          <div className={`faq-accordion__answer ${activeIndex === index ? 'expanded' : ''}`}>
            <div className={`answer-content ${roboto.className}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        .faq-accordion {
          --faq-border-color: rgba(255, 255, 255, 0.1);
          --faq-hover-bg: rgba(255, 255, 255, 0.05);
          --faq-active-bg: rgba(255, 255, 255, 0.08);
          --faq-text-color: #ffffff;
          --faq-text-secondary: rgba(255, 255, 255, 0.8);
        }

        .faq-accordion__item {
          border: 1px solid var(--faq-border-color);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-accordion__item:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .faq-accordion__item.active {
          border-color: rgba(255, 255, 255, 0.25);
          background: var(--faq-active-bg);
        }

        .faq-accordion__question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          user-select: none;
        }

        .faq-accordion__question:hover {
          background: var(--faq-hover-bg);
        }

        .question-text {
          color: var(--faq-text-color);
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
          flex: 1;
          margin-right: 16px;
        }

        .faq-accordion__arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .arrow-icon {
          transition: transform 0.3s ease;
          color: var(--faq-text-color);
        }

        .arrow-icon.rotated {
          transform: rotate(180deg);
        }

        .faq-accordion__question:hover .faq-accordion__arrow {
          background: rgba(255, 255, 255, 0.15);
        }

        .faq-accordion__answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
          opacity: 0;
        }

        .faq-accordion__answer.expanded {
          max-height: 500px;
          opacity: 1;
        }

        .answer-content {
          padding: 0 24px 24px 24px;
        }

        .answer-content p {
          color: var(--faq-text-secondary);
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .faq-accordion__question {
            padding: 16px 20px;
          }

          .question-text {
            font-size: 16px;
          }

          .answer-content {
            padding: 0 20px 20px 20px;
          }

          .answer-content p {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
} 