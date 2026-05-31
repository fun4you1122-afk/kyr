'use client';
import { useEffect } from 'react';

export default function CatalogueAnimations() {
  useEffect(() => {
    let animationEnabled = false;
    let scrollHandler: (() => void) | null = null;
    let resizeHandler: (() => void) | null = null;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    function initAnimationScript() {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.image-section'));
      const total = sections.length;
      if (!total) return;

      const container = document.getElementById('pcatScrollContainer');
      if (!container) return;

      let winH = window.innerHeight;
      let cachedTop = 0;
      let lastY = window.scrollY;
      let ticking = false;
      let active = false;
      const MUL = 1.4;

      function cacheTop() {
        cachedTop = container!.getBoundingClientRect().top + window.scrollY;
      }

      const totalH = winH * total * MUL;
      container.style.height = `${totalH}px`;
      cacheTop();

      function ease(t: number) {
        return 1 - Math.pow(1 - t, 3);
      }

      function reset() {
        sections.forEach((s, i) => {
          const ov = s.querySelector<HTMLElement>('.overlay');
          if (ov) ov.style.transform = 'translate3d(0,0,0) rotateY(0deg)';
          s.style.position = 'absolute';
          s.style.top = `${i * winH * MUL}px`;
          s.style.left = '0';
          s.style.transform = 'translate3d(0,0,0)';
          s.style.opacity = '0.3';
          s.style.zIndex = '1';
          s.style.width = '100%';
          s.style.height = '100vh';
          s.style.display = 'flex';
          s.style.alignItems = 'center';
          s.style.justifyContent = 'center';
        });
      }

      function update(scrollY: number) {
        const should = scrollY >= cachedTop;
        if (!should && active) {
          reset();
          active = false;
          return;
        }
        if (!should) return;
        if (!active) active = true;

        const adj = scrollY - cachedTop;
        sections.forEach((s, idx) => {
          const ov = s.querySelector<HTMLElement>('.overlay');
          const start = idx * winH * MUL,
            end = start + winH * MUL;
          const isLeft = ov?.classList.contains('overlay-left');
          const maxRot = isLeft ? -180 : 180,
            trans = isLeft ? -10 : 10;

          if (adj >= start && adj < end) {
            const prog = (adj - start) / (winH * MUL);
            if (prog <= 0.5) {
              const open = Math.min(1, prog * 2),
                rot = maxRot * open,
                tx = trans * open;
              if (ov) ov.style.transform = `translate3d(${tx}px,0,0) rotateY(${rot}deg)`;
              s.style.position = 'sticky';
              s.style.top = '0';
              s.style.transform = 'translate3d(0,0,0)';
              s.style.opacity = '1';
              s.style.zIndex = String(total - idx);
            } else {
              const scrollP = Math.min(1, (prog - 0.5) * 2);
              if (ov) ov.style.transform = `translate3d(${trans}px,0,0) rotateY(${maxRot}deg)`;
              const eased = ease(scrollP),
                ty = -eased * winH,
                op = 1 - eased * 0.8;
              s.style.position = 'sticky';
              s.style.top = '0';
              s.style.transform = `translate3d(0,${ty}px,0)`;
              s.style.opacity = op.toString();
              s.style.zIndex = String(total - idx);
            }
          } else if (adj < start) {
            if (ov) ov.style.transform = 'translate3d(0,0,0) rotateY(0deg)';
            s.style.position = 'absolute';
            s.style.top = `${start}px`;
            const dist = start - adj,
              p = Math.min(100, (dist / (winH * MUL)) * 200);
            s.style.transform = `translate3d(0,${p}px,0)`;
            s.style.opacity = Math.max(0.3, 1 - (dist / (winH * MUL)) * 1.4).toString();
            s.style.zIndex = '1';
          } else if (adj >= end) {
            const past = (adj - end) / (winH * MUL);
            if (ov)
              ov.style.transform = `translate3d(${trans}px,0,0) rotateY(${maxRot * 0.78}deg)`;
            s.style.position = 'absolute';
            s.style.top = `${start}px`;
            s.style.transform = `translate3d(0,${-winH - past * winH * 0.5}px,0)`;
            s.style.opacity = Math.max(0, 0.3 - past * 0.5).toString();
            s.style.zIndex = '1';
          }
        });
      }

      function onScroll() {
        lastY = window.scrollY;
        if (!ticking) {
          requestAnimationFrame(() => {
            update(lastY);
            ticking = false;
          });
          ticking = true;
        }
      }

      function initPos() {
        winH = window.innerHeight;
        cacheTop();
        container!.style.height = `${winH * total * MUL}px`;
        const shouldActive = window.scrollY >= cachedTop;
        active = shouldActive;
        if (!shouldActive) {
          reset();
        } else {
          sections.forEach((s, i) => {
            s.style.position = 'absolute';
            s.style.top = `${i * winH * MUL}px`;
            s.style.left = '0';
            s.style.transform = 'translate3d(0,0,0)';
            s.style.width = '100%';
            s.style.height = '100vh';
            s.style.display = 'flex';
            s.style.alignItems = 'center';
            s.style.justifyContent = 'center';
          });
          update(window.scrollY);
        }
      }

      scrollHandler = onScroll;
      initPos();
      window.addEventListener('scroll', scrollHandler, { passive: true });

      function handleResize() {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(initPos, 150);
      }
      resizeHandler = handleResize;
      window.addEventListener('resize', resizeHandler);
      animationEnabled = true;
    }

    function disableAnim() {
      if (!animationEnabled) return;
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (timeout) clearTimeout(timeout);
      document.querySelectorAll<HTMLElement>('.image-section').forEach((s) => {
        s.style.position = '';
        s.style.top = '';
        s.style.left = '';
        s.style.transform = '';
        s.style.opacity = '';
        s.style.zIndex = '';
        const ov = s.querySelector<HTMLElement>('.overlay');
        if (ov) ov.style.transform = '';
      });
      const container = document.getElementById('pcatScrollContainer');
      if (container) container.style.height = '';
      animationEnabled = false;
    }

    function checkToggle() {
      if (!animationEnabled) initAnimationScript();
    }

    checkToggle();

    const rCb = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(checkToggle, 150);
    };
    window.addEventListener('resize', rCb);

    return () => {
      disableAnim();
      window.removeEventListener('resize', rCb);
    };
  }, []);

  return null;
}
