'use client';
import { useEffect } from 'react';

export default function CatalogueAnimations() {
  useEffect(() => {
    let animEnabled = false;
    let scrollCb: (() => void) | null = null;
    let resizeCb: (() => void) | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function init() {
      const wrap = document.getElementById('pcatScroll');
      if (!wrap) return;

      const sections = Array.from(wrap.querySelectorAll<HTMLElement>('.pcat__section'));
      const total = sections.length;
      if (!total) return;

      let winH = window.innerHeight;
      let cachedTop = 0;
      let ticking = false;

      function cacheTop() {
        cachedTop = wrap!.getBoundingClientRect().top + window.scrollY;
      }

      function setHeight() {
        wrap!.style.height = `${winH * total * 2}px`;
      }

      function ease(t: number) {
        return 1 - Math.pow(1 - t, 3);
      }

      function resetSections() {
        sections.forEach((s, i) => {
          const ov = s.querySelector<HTMLElement>('.pcat__overlay');
          if (ov) ov.style.transform = 'translate3d(0,0,0) rotateY(0deg)';
          Object.assign(s.style, {
            position: 'absolute',
            top: `${i * winH * 2}px`,
            left: '0',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0',
            transform: 'translate3d(0,0,0)',
            zIndex: '1',
          });
        });
      }

      function update(scrollY: number) {
        const adj = scrollY - cachedTop;

        sections.forEach((s, idx) => {
          const ov = s.querySelector<HTMLElement>('.pcat__overlay');
          if (!ov) return;

          const isLeft = ov.classList.contains('pcat__overlay--left');
          const maxRot = isLeft ? -180 : 180;
          const trans  = isLeft ? -12 : 12;

          const start = idx * winH * 2;
          const end   = start + winH * 2;

          s.style.width   = '100%';
          s.style.height  = '100vh';
          s.style.display = 'flex';
          s.style.alignItems = 'center';
          s.style.justifyContent = 'center';

          if (adj >= start && adj < end) {
            /* ── Active: sticky, book opens then slides away ── */
            const prog = (adj - start) / (winH * 2);
            s.style.position = 'sticky';
            s.style.top      = '0';
            s.style.left     = '0';
            s.style.zIndex   = String(total - idx + 10);

            if (prog <= 0.5) {
              const open = Math.min(1, prog * 2);
              ov.style.transform = `translate3d(${trans * open}px,0,0) rotateY(${maxRot * open}deg)`;
              s.style.transform  = 'translate3d(0,0,0)';
              s.style.opacity    = '1';
            } else {
              const p     = Math.min(1, (prog - 0.5) * 2);
              const eased = ease(p);
              ov.style.transform = `translate3d(${trans}px,0,0) rotateY(${maxRot}deg)`;
              s.style.transform  = `translate3d(0,${-eased * winH}px,0)`;
              s.style.opacity    = String(Math.max(0, 1 - eased));
            }
          } else if (adj < start) {
            /* ── Not yet reached ── */
            ov.style.transform = 'translate3d(0,0,0) rotateY(0deg)';

            // When the previous section enters its exit phase, reveal this section
            // underneath it (sticky at top:0, lower z-index) so there is no gap.
            const prevExitThreshold = start - winH; // = (idx-1)*winH*2 + winH
            if (idx > 0 && adj >= prevExitThreshold) {
              s.style.position  = 'sticky';
              s.style.top       = '0';
              s.style.left      = '0';
              s.style.zIndex    = String(total - idx + 9); // one below active (total-idx+10)
              s.style.transform = 'translate3d(0,0,0)';
              s.style.opacity   = '1';
            } else {
              s.style.position  = 'absolute';
              s.style.top       = `${start}px`;
              s.style.left      = '0';
              s.style.zIndex    = '1';
              s.style.transform = 'translate3d(0,0,0)';
              s.style.opacity   = '0';
            }
          } else {
            /* ── Already passed ── */
            ov.style.transform = `translate3d(${trans}px,0,0) rotateY(${maxRot}deg)`;
            s.style.position  = 'absolute';
            s.style.top       = `${start}px`;
            s.style.left      = '0';
            s.style.zIndex    = '1';
            s.style.transform = `translate3d(0,${-winH * 1.1}px,0)`;
            s.style.opacity   = '0';
          }
        });
      }

      function onScroll() {
        const y = window.scrollY;
        if (!ticking) {
          requestAnimationFrame(() => { update(y); ticking = false; });
          ticking = true;
        }
      }

      cacheTop();
      setHeight();
      resetSections();
      update(window.scrollY);

      scrollCb = onScroll;
      window.addEventListener('scroll', scrollCb, { passive: true });

      resizeCb = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          winH = window.innerHeight;
          cacheTop();
          setHeight();
          resetSections();
          update(window.scrollY);
        }, 150);
      };
      window.addEventListener('resize', resizeCb);
      animEnabled = true;
    }

    function destroy() {
      if (!animEnabled) return;
      if (scrollCb)  window.removeEventListener('scroll', scrollCb);
      if (resizeCb)  window.removeEventListener('resize', resizeCb);
      if (timer)     clearTimeout(timer);
      const wrap = document.getElementById('pcatScroll');
      if (wrap) {
        wrap.style.height = '';
        wrap.querySelectorAll<HTMLElement>('.pcat__section').forEach((s) => {
          s.style.cssText = '';
          const ov = s.querySelector<HTMLElement>('.pcat__overlay');
          if (ov) ov.style.transform = '';
        });
      }
      animEnabled = false;
    }

    function check() {
      if (window.innerWidth >= 800 && !animEnabled) init();
      else if (window.innerWidth < 800 && animEnabled) destroy();
    }

    check();

    const rCb = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(check, 150);
    };
    window.addEventListener('resize', rCb);

    return () => {
      destroy();
      window.removeEventListener('resize', rCb);
    };
  }, []);

  return null;
}
