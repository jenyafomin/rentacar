"use client";
import { Fragment, useEffect, useRef } from "react";
import { useArrayRef } from "../hooks/dsnHooks";
import { gsap, Back } from "gsap";

export default function FadeUpTrigger({
  duration = 0.8,
  ease = Back.easeOut.config(1.7),
  delay = 0,
  start = "75%",
  end = "100%",
  scrub = false,
  markers = false,
  stagger = 0.2,
  children,
  tag: Tag = "div",
  ...restProps
}: any) {
  const [ref, setRef] = useArrayRef();
  const animateChild = useRef(null);

  useEffect(() => {
    if (animateChild.current) ref.current = animateChild.current.children;

    if (!ref.current) return;
    const animation = gsap.effects.fade(ref.current, {
      from: { y: 20, opacity: 0 },
      to: {
        stagger: stagger,
        y: 0,
        opacity: 1,
        delay: delay,
        onComplete: () => {
          if (!scrub) {
            animation.scrollTrigger.kill();
            animation.kill();
          }
        },
      },
      ease: ease,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers,
      duration: duration,
    });

    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fragment>
      {typeof children === "function" ? (
        children(setRef)
      ) : (
        // @ts-ignore
        <Tag {...restProps} ref={animateChild}>
          {children}
        </Tag>
      )}
    </Fragment>
  );
}
