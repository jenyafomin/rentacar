// import { Router } from "next/router";
import { transitionPage } from "../EremiaType";
import { tdEnd, tdStart } from "./transitionDefalut";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function handleTransitionToUrl({transitionPage ,href, router}: {transitionPage?: transitionPage,href: string, router: AppRouterInstance}) {
  const domTransition: {
    current: HTMLDivElement | null;
    tl: gsap.core.Timeline | null;
  } = {
    current: null,
    tl: null,
  };

  return (e: any, dinamicHref?: string) => {
    if(e?.preventDefault) e.preventDefault();
    if(dinamicHref) href = dinamicHref;

    if (domTransition.current === null && domTransition.tl === null) {
      // Сразу сбрасываем скролл перед началом анимации
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Отключаем автоматическое восстановление скролла
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      // Запускаем анимацию входа
      [domTransition.current, domTransition.tl] = tdStart(transitionPage);
      
      // Начинаем переход через минимальное время (чтобы анимация успела запуститься)
      domTransition.tl.to({}, { duration: 0.8 }); // Базовая анимация 0.8 сек
      
      // Добавляем callback после минимальной анимации
      domTransition.tl.add(() => {
        console.log('🚀 Starting page transition to:', href);
        const startTime = Date.now();
        
        // Выполняем переход страницы
        router.push(href);
        
        // Умное ожидание загрузки
        const waitForPageLoad = () => {
          let attempts = 0;
          const maxAttempts = 60; // 3 секунды максимум (50мс * 60)
          const minAttempts = 4; // Минимум 200мс ожидания
          
          const checkLoad = () => {
            attempts++;
            const elapsed = Date.now() - startTime;
            
            // Условия для завершения:
            // 1. Страница готова И прошло минимальное время
            // 2. Прошло максимальное время (fallback)
            const isPageReady = document.readyState === 'complete';
            const minTimeElapsed = attempts >= minAttempts;
            const maxTimeElapsed = attempts >= maxAttempts;
            
            if ((isPageReady && minTimeElapsed) || maxTimeElapsed) {
              const loadTime = elapsed;
              console.log(`✅ Page loaded in ${loadTime}ms, starting exit animation`);
              
              // Убеждаемся что скролл сброшен
              window.scrollTo({ top: 0, behavior: 'instant' });
              
              // Очищаем текущую анимацию
              if (domTransition.tl) {
                domTransition.tl.kill();
                domTransition.tl = null;
              }
              domTransition.current = null;
              
              // Запускаем анимацию выхода
              tdEnd();
              
            } else {
              // Продолжаем ждать
              setTimeout(checkLoad, 50);
            }
          };
          
          // Начинаем проверку сразу
          checkLoad();
        };
        
        waitForPageLoad();
      });
      
      // Добавляем очень длинную паузу как fallback
      domTransition.tl.to({}, { duration: 10 }); // Если что-то пошло не так
    }
  };
}
