"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollReset() {
  const pathname = usePathname();

  // Отключаем автоматическое восстановление скролла браузером
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Сразу сбрасываем скролл
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Сбрасываем скролл при изменении маршрута
  useEffect(() => {
    console.log('🔄 Route changed, resetting scroll:', pathname);
    
    // Множественные попытки сброса скролла для надежности
    const resetScroll = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    
    // Сразу
    resetScroll();
    
    // Через requestAnimationFrame
    requestAnimationFrame(resetScroll);
    
    // Через таймеры
    const timers = [10, 50, 100, 200, 500].map(delay => 
      setTimeout(resetScroll, delay)
    );
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [pathname]);

  // Дополнительный сброс при всех возможных событиях
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Сброс при различных событиях
    const events = ['load', 'DOMContentLoaded', 'readystatechange'];
    events.forEach(event => {
      window.addEventListener(event, resetScroll);
    });
    
    // Сброс при изменении документа
    const observer = new MutationObserver(() => {
      resetScroll();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetScroll);
      });
      observer.disconnect();
    };
  }, [pathname]);
} 