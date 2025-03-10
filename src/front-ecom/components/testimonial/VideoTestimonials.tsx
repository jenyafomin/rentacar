"use client";
import { useRef, useState } from "react";
import { dsnCN } from "../../hooks/helper";
import FadeUpTrigger from "../../animation/FadeUpTrigger";
import Button from "../button/Button";

interface VideoTestimonialProps {
  className?: string;
  title?: string;
  videos: {
    id: number;
    src: string;
    poster: string;
    name: string;
    position: string;
  }[];
}

export default function VideoTestimonials({
  className,
  title = "Видео отзывы наших клиентов",
  videos,
}: VideoTestimonialProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Горизонтальный скролл при нажатии на кнопки
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainer.current) return;
    
    const container = scrollContainer.current;
    const scrollAmount = direction === "left" 
      ? -container.offsetWidth / 2
      : container.offsetWidth / 2;
      
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={dsnCN("video-testimonials", className)}>
      <div className="container section-margin">
        <FadeUpTrigger>
          <h2 className="section-title text-center mb-70">{title}</h2>
        </FadeUpTrigger>
        
        <div className="video-testimonials-navigation">
          <button 
            className="video-nav video-nav-prev" 
            onClick={() => scroll("left")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="video-nav video-nav-next" 
            onClick={() => scroll("right")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div 
          className="video-testimonials-container" 
          ref={scrollContainer}
          onMouseDown={() => setIsScrolling(true)}
          onMouseUp={() => setIsScrolling(false)}
          onMouseLeave={() => setIsScrolling(false)}
          onMouseMove={(e) => {
            if (!isScrolling || !scrollContainer.current) return;
            scrollContainer.current.scrollLeft -= e.movementX;
          }}
        >
          {videos.map((video) => (
            <div key={video.id} className="video-testimonial-item">
              <div className="video-wrapper">
                <video 
                  src={video.src} 
                  poster={video.poster}
                  controls
                  playsInline
                  preload="none"
                />
              </div>
              <div className="video-author">
                <h5 className="author-name">{video.name}</h5>
                <p className="author-position">{video.position}</p>
              </div>
            </div>
          ))}
          
          <div className="video-testimonial-item video-cta">
            <div className="video-cta-content">
              <h4>Оставьте свой отзыв</h4>
              <p>Поделитесь вашими впечатлениями от аренды автомобиля</p>
              <Button className="mt-20" href="/contact">
                Оставить отзыв
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 