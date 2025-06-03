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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="dsn-accordion">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`accordion__item ${activeIndex === index ? 'active' : ''}`}
        >
          <div 
            className={`accordion__question ${poppins.className}`}
            onClick={() => toggleItem(index)}
          >
            {item.question}
            <span className="accordion__arrow"></span>
          </div>
          
          {activeIndex === index && (
            <div className="accordion__answer">
              <div className={roboto.className}>
                <p>{item.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 