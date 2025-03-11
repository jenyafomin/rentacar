'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { dsnCN } from "../../hooks/helper";
import MoveTrigger from "../../animation/MoveTrigger";
import Image from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

interface VideoTestimonialProps {
  className?: string;
  title?: string;
  videos: {
    id: number;
    src: string;
    name: string;
    position: string;
  }[];
}

export default function VideoTestimonials({
  className,
  title = "Video testimonials",
  videos,
}: VideoTestimonialProps) {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});
  
  useEffect(() => {
    // Проверяем и логируем доступность видео при монтировании
    videos.forEach(video => {
      const videoPath = video.src.startsWith('/') ? video.src : `/${video.src}`;
      console.log('Checking video path:', videoPath);
      
      fetch(videoPath, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            console.error(`Video not found: ${videoPath}`);
          } else {
            console.log(`Video found: ${videoPath}`);
          }
        })
        .catch(error => {
          console.error(`Error checking video ${videoPath}:`, error);
        });
    });
  }, [videos]);

  const togglePlay = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (activeVideoId !== null && activeVideoId !== id) {
      const prevVideo = videoRefs.current[activeVideoId];
      if (prevVideo) {
        prevVideo.pause();
      }
    }
    
    const video = videoRefs.current[id];
    if (!video) return;
    
    if (video.paused) {
      video.play()
        .then(() => {
          setActiveVideoId(id);
          setIsPlaying(true);
          console.log(`Playing video: ${id}`);
        })
        .catch(error => {
          console.error(`Error playing video ${id}:`, error);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setActiveVideoId(null);
    setIsPlaying(false);
  };

  return (
    <section className={dsnCN("video-testimonials section-margin", className)}>
      <div className="container">
        <div className="section-title text-center mb-70">
          <MoveTrigger from={{ y: 0 }} to={{ y: -30 }} mobile={false}>
            <h2 className="title-section">{title}</h2>
          </MoveTrigger>
        </div>

        <div className="video-testimonials-container">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            navigation
            className="video-testimonials-swiper"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="video-testimonial-item">
                  <div className="video-wrapper">
                    <div className="video-container">
                      <video
                        ref={(el) => { videoRefs.current[video.id] = el; }}
                        // src={video.src.startsWith('/') ? video.src : `/${video.src}`}
                        preload="metadata"
                        playsInline
                        onEnded={handleVideoEnd}
                        muted={false}
                        className="video-player"
                      />
                      <source src={video.src} type="video/mp4" />
                      
                      <button 
                        className="play-button" 
                        onClick={(e) => togglePlay(video.id, e)}
                      >
                        <FontAwesomeIcon 
                          icon={activeVideoId === video.id && isPlaying ? faPause : faPlay} 
                        />
                      </button>
                    </div>
                    
                    <div className="video-info">
                      <h4>{video.name}</h4>
                      <p className="gradient-text">{video.position}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
