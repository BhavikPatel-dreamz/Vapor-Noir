"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  start?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function GsapReveal({
  children,
  className = "",
  y = 20,
  x = 0,
  opacity = 0,
  scale,
  rotation,
  duration = 0.5,
  delay = 0,
  ease = "power2.out",
  stagger = 0,
  start = "top 85%",
  as: Tag = "div",
}: GsapRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { y, x, opacity };
    if (scale !== undefined) from.scale = scale;
    if (rotation !== undefined) from.rotation = rotation;

    const targets = stagger > 0 ? Array.from(el.children) : el;
    gsap.set(targets, from);

    const tween = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration,
      delay,
      ease,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [y, x, opacity, scale, rotation, duration, delay, ease, stagger, start]);

  return (
    // @ts-expect-error Tag is a valid JSX element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
