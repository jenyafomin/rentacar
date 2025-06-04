"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function usePageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Сбрасываем прокрутку при монтировании новой страницы
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Указываем что страница загружена
    setIsLoading(false);
  }, []);

  // Функция для программного перехода с анимацией
  const navigateWithTransition = async (href: string) => {
    setIsLoading(true);
    
    // Прокручиваем в начало
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Ждем завершения прокрутки
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Выполняем переход
    await router.push(href);
    
    setIsLoading(false);
  };

  return {
    isLoading,
    navigateWithTransition
  };
} 