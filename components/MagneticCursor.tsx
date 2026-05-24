'use client';
import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let isHovering = false;
    let rafId: number;

    // ── track mouse ──────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX - 4}px`;
        dotRef.current.style.top  = `${mouseY - 4}px`;
      }
    };

    // ── lerp ring ────────────────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX - 20}px`;
        ringRef.current.style.top  = `${ringY - 20}px`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── magnetic effect on buttons / links ───────────────────────
    const magneticEls: Element[] = [];
    const addMagnetic = () => {
      document.querySelectorAll('button, a, [data-magnetic]').forEach(el => {
        if (magneticEls.includes(el)) return;
        magneticEls.push(el);

        const onEnter = () => {
          isHovering = true;
          ringRef.current?.classList.add('hovering');
        };
        const onLeave = (e: Event) => {
          isHovering = false;
          ringRef.current?.classList.remove('hovering');
          const target = e.currentTarget as HTMLElement;
          target.style.transform = '';
        };
        const onMouseMove = (e: Event) => {
          const me  = e as MouseEvent;
          const target = me.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();
          const cx   = rect.left + rect.width  / 2;
          const cy   = rect.top  + rect.height / 2;
          const dx   = (me.clientX - cx) * 0.35;
          const dy   = (me.clientY - cy) * 0.35;
          target.style.transform    = `translate(${dx}px, ${dy}px)`;
          target.style.transition   = 'transform 0.2s cubic-bezier(0.23,1,0.32,1)';
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        el.addEventListener('mousemove',  onMouseMove);
      });
    };

    // run once + observe DOM additions
    addMagnetic();
    const observer = new MutationObserver(addMagnetic);
    observer.observe(document.body, { childList: true, subtree: true });

    // click pulse
    const onDown = () => {
      ringRef.current?.classList.add('clicking');
      dotRef.current!.style.transform = 'scale(2.5)';
    };
    const onUp = () => {
      ringRef.current?.classList.remove('clicking');
      dotRef.current!.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"  />
      <div ref={ringRef}  className="cursor-ring" />
      <div ref={labelRef} className="cursor-label hidden" />
    </>
  );
}
