"use client";
import { Fragment, useEffect } from "react";
import { gsap } from "gsap";
import { useArrayRef } from "../hooks/dsnHooks";

export interface MoveTriggerProps {
  from?: object | { y: 0 };
  to?: object | { y: 100 };
  ease?: string | "none";
  start?: string | number | "100%";
  end?: string | number | "0%";
  scrub?: boolean | true | false;
  markers?: boolean | true | false;
  mobile?: boolean | true | false;
  tablet?: boolean | true | false;
  stagger?: object | number | null;
  children?: any;
}

export default function MoveTrigger({
  children,
  from = { y: 0 },
  to = { y: -100 },
  ease = "none",
  start = "100%",
  end = "0%",
  scrub = true,
  markers = false,
  stagger=null,
  mobile=true,
  tablet=true,
}: MoveTriggerProps) {
  const [ref, setRef] = useArrayRef();

  useEffect(() => {
    if (
      !ref.current ||
      (!mobile && window.innerWidth <= 767) ||
      (!tablet && window.innerWidth <= 991 && window.innerWidth > 767)
    )
      return;
    const animation = gsap.effects.moveSection(ref.current, {
      from: from,
      to: { stagger: stagger, ...to },
      ease: ease,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers,
    });

    return () => {
      animation.kill();
    };
  }, [
    ref,
    from,
    to,
    ease,
    start,
    end,
    scrub,
    markers,
    stagger,
    mobile,
    tablet,
  ]);
  return (
    <Fragment>
      {typeof children === "function" ? children(setRef) : children}
    </Fragment>
  );
}
