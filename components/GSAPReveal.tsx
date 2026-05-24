'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: string;
}

export default function GSAPReveal({
  children,
  className = '',
  y = 70,
  delay = 0,
  duration = 1,
  stagger,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap }  = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;
      const els = stagger ? ref.current.querySelectorAll(stagger) : [ref.current];

      ctx = gsap.context(() => {
        gsap.fromTo(
          els,
          { y, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration,
            delay,
            ease: 'power4.out',
            stagger: stagger ? 0.13 : 0,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    };

    init();
    return () => ctx?.revert();
  }, [y, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
