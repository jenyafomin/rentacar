"use client"
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

export function useAdvancedTransition() {
  const router = useRouter();
  const preloadedPages = useRef(new Set<string>());
  
  // Предзагрузка страницы
  const preloadPage = useCallback((href: string) => {
    if (!preloadedPages.current.has(href)) {
      router.prefetch(href);
      preloadedPages.current.add(href);
      console.log('📦 Preloaded:', href);
    }
  }, [router]);
  
  // Быстрый переход с минимальной анимацией
  const quickNavigate = useCallback((href: string) => {
    // Предзагружаем если еще не делали
    preloadPage(href);
    
    console.log('⚡ Quick transition to:', href);
    
    // Отключаем автоматическое восстановление скролла
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Сбрасываем скролл с плавной анимацией
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Короткая задержка для анимации скролла
    setTimeout(() => {
      router.push(href);
      
      // Быстрый сброс скролла после перехода
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }, 200);
    
  }, [router, preloadPage]);
  
  // Переход с кастомной задержкой
  const navigateWithDelay = useCallback((href: string, delay: number = 300) => {
    preloadPage(href);
    
    console.log(`🎯 Delayed transition (${delay}ms) to:`, href);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 50);
    }, delay);
    
  }, [router, preloadPage]);
  
  return { 
    preloadPage, 
    quickNavigate, 
    navigateWithDelay 
  };
} 