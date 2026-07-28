"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapReveal(
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    start?: string;
  } = {},
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children.length > 1 ? Array.from(el.children) : [el];
    const from = {
      y: options.y ?? 40,
      x: options.x ?? 0,
      opacity: options.opacity ?? 0,
    };

    gsap.set(children, from);

    const tween = gsap.to(children, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: options.duration ?? 0.8,
      delay: options.delay ?? 0,
      ease: options.ease ?? "power3.out",
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: el,
        start: options.start ?? "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options.y, options.x, options.opacity, options.duration, options.delay, options.ease, options.stagger, options.start]);

  return ref;
}

export function useGsapStagger(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
  } = {},
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children);
    if (children.length === 0) return;

    gsap.set(children, {
      y: options.y ?? 50,
      opacity: options.opacity ?? 0,
    });

    const tween = gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.7,
      ease: options.ease ?? "power3.out",
      stagger: options.stagger ?? 0.08,
      scrollTrigger: {
        trigger: el,
        start: options.start ?? "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options.y, options.opacity, options.duration, options.stagger, options.ease, options.start]);

  return ref;
}

export function useGsapTextReveal(
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    y?: number;
  } = {},
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent ?? "";
    el.innerHTML = "";
    const words = text.split(/\s+/);

    words.forEach((word) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      const inner = document.createElement("span");
      inner.textContent = word;
      inner.style.display = "inline-block";
      inner.classList.add("gsap-word");
      wrapper.appendChild(inner);
      el.appendChild(wrapper);
      el.appendChild(document.createTextNode(" "));
    });

    const wordEls = el.querySelectorAll(".gsap-word");

    gsap.set(wordEls, {
      y: options.y ?? 60,
      opacity: 0,
    });

    const tween = gsap.to(wordEls, {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.9,
      delay: options.delay ?? 0.1,
      ease: options.ease ?? "power4.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options.duration, options.delay, options.ease, options.y]);

  return ref;
}

export function useGsapParallax(
  options: { speed?: number; start?: string; end?: string } = {},
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: options.speed ?? -80,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: options.start ?? "top bottom",
        end: options.end ?? "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options.speed, options.start, options.end]);

  return ref;
}

export function useGsapScaleReveal(
  options: {
    scale?: number;
    duration?: number;
    ease?: string;
    start?: string;
  } = {},
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scale: options.scale ?? 0.9, opacity: 0 });

    const tween = gsap.to(el, {
      scale: 1,
      opacity: 1,
      duration: options.duration ?? 1,
      ease: options.ease ?? "power3.out",
      scrollTrigger: {
        trigger: el,
        start: options.start ?? "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options.scale, options.duration, options.ease, options.start]);

  return ref;
}

export function useGsapCounter(
  target: number,
  options: { duration?: number; prefix?: string; suffix?: string } = {},
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: options.duration ?? 2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${options.prefix ?? ""}${Math.round(obj.val)}${options.suffix ?? ""}`;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [target, options.duration, options.prefix, options.suffix]);

  return ref;
}
