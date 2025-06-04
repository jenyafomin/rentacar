"use client"
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useSimpleTransition() {
  const router = useRouter();
  
  const navigate = useCallback((href: string, options?: { smooth?: boolean }) => {
    // Отключаем автоматическое восстановление скролла
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Сбрасываем скролл
    const scrollBehavior = options?.smooth ? 'smooth' : 'instant';
    window.scrollTo({ top: 0, behavior: scrollBehavior });
    
    // Небольшая задержка для плавности
    setTimeout(() => {
      router.push(href);
      
      // Дополнительный сброс скролла после перехода
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
    }, options?.smooth ? 300 : 0);
    
  }, [router]);
  
  return { navigate };
} 