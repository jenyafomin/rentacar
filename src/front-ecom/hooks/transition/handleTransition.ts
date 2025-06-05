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
    console.log("HANDLE TRANSITION TO URL:", href);

    if (domTransition.current === null && domTransition.tl === null) {
      [domTransition.current, domTransition.tl] = tdStart(transitionPage);
      
      domTransition.tl.call(() => {
        router.push(href, { scroll: false });
        // @ts-ignore
        domTransition.tl.kill();
        domTransition.tl = null;
        domTransition.current = null;

        setTimeout(() => {
          tdEnd();
        }, 1000);
      });
    }
  };
}
