'use client';
import { useEffect } from 'react';

export default function GSAPAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

    async function boot() {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      /* ── 1. Lenis smooth scroll ── */
      let lenis: any = null;
      let lenisVelocity = 0;

      if (!reduce) {
        const LenisClass = (await import('lenis')).default;
        lenis = new LenisClass({
          duration: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        lenis.on('scroll', () => ScrollTrigger.update());
        lenis.on('scroll', ({ velocity: v }: { velocity: number }) => { lenisVelocity = v; });
      }

      /* ── Custom cursor ── */
      const label = document.getElementById('cursorLabel');
      (function initCursor() {
        const dot  = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        if (!dot || !ring || matchMedia('(pointer:coarse)').matches) return;
        let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
        window.addEventListener('pointermove', (e) => {
          mx = e.clientX; my = e.clientY;
          dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
        });
        (function loop() {
          rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
          ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
          requestAnimationFrame(loop);
        })();
        document.querySelectorAll('a,button,[data-cursor]').forEach((el) => {
          el.addEventListener('pointerenter', () => {
            document.body.classList.add('cursor-grow');
            if (label) label.textContent = el.getAttribute('data-cursor-label') || '';
          });
          el.addEventListener('pointerleave', () => {
            document.body.classList.remove('cursor-grow');
            if (label) label.textContent = '';
          });
        });
      })();

      /* ── Magnetic buttons ── */
      (function initMagnetic() {
        if (matchMedia('(pointer:coarse)').matches) return;
        document.querySelectorAll('.magnetic').forEach((el) => {
          const inner = (el.querySelector('.magnetic__inner') || el) as HTMLElement;
          const strength = 0.32;
          el.addEventListener('pointermove', (e: Event) => {
            const pe = e as PointerEvent;
            const r = el.getBoundingClientRect();
            const x = (pe.clientX - r.left - r.width  / 2) * strength;
            const y = (pe.clientY - r.top  - r.height / 2) * strength;
            gsap.to(el,    { x, y, duration: 0.6, ease: 'power3.out' });
            gsap.to(inner, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power3.out' });
          });
          el.addEventListener('pointerleave', () => {
            gsap.to(el,    { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
            gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
          });
        });
      })();

      /* ── Nav shrink + mobile menu + smooth anchors ── */
      (function initNav() {
        const nav    = document.getElementById('nav');
        const burger = document.getElementById('burger');
        const mm     = document.getElementById('mobileMenu');

        function onScroll() {
          const sy = lenis ? lenis.scroll : scrollY;
          if (nav) nav.classList.toggle('shrink', sy > 60);
        }
        if (lenis) lenis.on('scroll', onScroll);
        else window.addEventListener('scroll', onScroll, { passive: true });

        if (burger && mm) {
          burger.addEventListener('click', () => { mm.classList.toggle('open'); burger.classList.toggle('on'); });
        }
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            mm?.classList.remove('open');
            if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.6 });
            else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      })();

      /* ── Progress bar + 3D camera ── */
      (function initProgress() {
        const bar = document.getElementById('progressBar');
        function onScroll() {
          const sy  = lenis ? lenis.scroll : scrollY;
          const max = document.documentElement.scrollHeight - innerHeight;
          const p   = max > 0 ? sy / max : 0;
          if (bar) bar.style.width = (p * 100) + '%';
          if ((window as any).KYRScene) (window as any).KYRScene.setProgress(p);
        }
        if (lenis) lenis.on('scroll', onScroll);
        else window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      })();

      /* ── 2. Char-level headline split ── */
      function splitToChars(container: HTMLElement): HTMLElement[] {
        if (container.querySelector('.char-i')) return Array.from(container.querySelectorAll('.char-i'));
        const lines = container.querySelectorAll<HTMLElement>('.title-line');
        const allChars: HTMLElement[] = [];
        lines.forEach((line) => {
          const childNodes = Array.from(line.childNodes);
          line.innerHTML = '';
          childNodes.forEach((node) => {
            if (node.nodeType === 3) {
              (node.textContent || '').split('').forEach((ch) => {
                const wrap = document.createElement('span'); wrap.className = 'char';
                const inner = document.createElement('span'); inner.className = 'char-i';
                inner.textContent = ch === ' ' ? ' ' : ch;
                wrap.appendChild(inner); line.appendChild(wrap); allChars.push(inner);
              });
            } else if ((node as Element).tagName === 'EM') {
              (node.textContent || '').split('').forEach((ch) => {
                const wrap = document.createElement('span'); wrap.className = 'char';
                const em   = document.createElement('em');
                const inner = document.createElement('span'); inner.className = 'char-i';
                inner.textContent = ch === ' ' ? ' ' : ch;
                em.appendChild(inner); wrap.appendChild(em); line.appendChild(wrap); allChars.push(inner);
              });
            }
          });
        });
        return allChars;
      }

      /* ── Word splitter for .split headlines ── */
      function splitWords(el: HTMLElement) {
        function walk(node: Node): Node[] {
          const out: Node[] = [];
          node.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
              (child.textContent || '').split(/(\s+)/).forEach((part) => {
                if (part === '') return;
                if (/^\s+$/.test(part)) { out.push(document.createTextNode(part)); return; }
                const w = document.createElement('span'); w.className = 'word';
                const inner = document.createElement('span'); inner.className = 'word-i'; inner.textContent = part;
                w.appendChild(inner); out.push(w);
              });
            } else if (child.nodeType === 1) {
              const clone = (child as Element).cloneNode(false) as Element;
              walk(child).forEach((n) => clone.appendChild(n));
              out.push(clone);
            }
          });
          return out;
        }
        const nodes = walk(el);
        el.innerHTML = '';
        nodes.forEach((n) => el.appendChild(n));
        return el.querySelectorAll('.word-i');
      }

      /* ── Hero logo shatter ── */
      function shatterLogo() {
        const logo = document.getElementById('heroLogo') as HTMLImageElement | null;
        const tag  = logo?.parentElement?.querySelector<HTMLElement>('p');
        if (!logo) return;

        const rect = logo.getBoundingClientRect();
        if (rect.width === 0) return;

        const cols = 5, rows = 3;
        const pW   = rect.width  / cols;
        const pH   = rect.height / rows;

        const container = document.createElement('div');
        container.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;pointer-events:none;z-index:210;overflow:visible;`;
        document.body.appendChild(container);

        logo.style.opacity = '0';
        if (tag) tag.style.opacity = '0';

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const tile = document.createElement('div');
            tile.style.cssText = `
              position:absolute;
              left:${c * pW}px;top:${r * pH}px;
              width:${pW}px;height:${pH}px;
              background:url(${logo.src}) no-repeat;
              background-size:${rect.width}px ${rect.height}px;
              background-position:${-(c * pW)}px ${-(r * pH)}px;
              transform-origin:center center;
            `;
            container.appendChild(tile);
            const angle = Math.random() * Math.PI * 2;
            const dist  = 120 + Math.random() * 280;
            gsap.to(tile, {
              x:        Math.cos(angle) * dist,
              y:        Math.sin(angle) * dist - 60,
              rotation: (Math.random() - 0.5) * 480,
              scale:    0.1 + Math.random() * 0.3,
              opacity:  0,
              duration: 0.55 + Math.random() * 0.45,
              ease:     'power3.in',
              delay:    Math.random() * 0.18,
            });
          }
        }
        setTimeout(() => container.remove(), 2000);
      }

      /* ── Loader sequence ── */
      function revealHero() {
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) {
          const chars = splitToChars(heroTitle);
          if (chars.length) {
            gsap.fromTo(chars,
              { y: '110%', rotateX: -80, opacity: 0, transformPerspective: 800 },
              { y: 0, rotateX: 0, opacity: 1, duration: 1.4, stagger: 0.032, ease: 'power4.out', delay: 0.2 }
            );
          }
        }
        gsap.to('.hero .up',      { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.55 });
        gsap.to('.hero__eyebrow', { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.35 });
      }

      (function initLoader() {
        const el   = document.getElementById('loader');
        const num  = document.getElementById('loaderNum');
        const lbar = document.getElementById('loaderBar');
        if (!el) return;
        const done = () => { el.style.display = 'none'; };
        if (reduce) {
          el.style.opacity = '0'; el.style.visibility = 'hidden';
          setTimeout(done, 650);
          document.querySelectorAll('.hero .up,.hero__eyebrow').forEach((n) => {
            (n as HTMLElement).style.opacity = '1';
            (n as HTMLElement).style.transform = 'none';
          });
          return;
        }
        gsap.set('.hero .up',      { opacity: 0, y: 40 });
        gsap.set('.hero__eyebrow', { opacity: 0, y: 30 });
        const counter = { v: 0 };
        const tl = gsap.timeline();
        tl.to(counter, {
          v: 100, duration: 2.0, ease: 'power2.inOut',
          onUpdate: () => {
            const n = Math.round(counter.v);
            if (num) num.textContent = String(n);
            if (lbar) lbar.style.width = n + '%';
          },
        });
        tl.to('#loader', { yPercent: -100, duration: 1.15, ease: 'expo.inOut', onComplete: () => { done(); setTimeout(shatterLogo, 2000); } }, '+=0.15');
        tl.add(revealHero, '<0.35');
        setTimeout(() => { if (el.style.display !== 'none') { done(); revealHero(); } }, 5500);
      })();

      /* ── Scroll animations ── */
      if (reduce) { root.classList.add('no-gsap'); return; }

      // Generic fade-up
      ScrollTrigger.batch('.up:not(.hero .up)', {
        start: 'top 88%',
        onEnter: (b: Element[]) => gsap.to(b, { y: 0, opacity: 1, duration: 1.05, stagger: 0.1, ease: 'power3.out', overwrite: true }),
      });

      // Hero video fades as you scroll → reveals 3D city
      gsap.to('#heroMedia', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero-video-section', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Masked headline reveals (.split)
      document.querySelectorAll<HTMLElement>('.split').forEach((el) => {
        const inners = splitWords(el);
        gsap.set(inners, { y: '105%' });
        gsap.to(inners, {
          y: '0%', duration: 1.0, stagger: 0.045, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Non-hero masked lines (.line-i outside hero)
      document.querySelectorAll<HTMLElement>('.line-i').forEach((el) => {
        if (el.closest('.hero')) return;
        gsap.set(el, { y: '115%' });
        const section = el.closest('section');
        gsap.to(el, {
          y: '0%', duration: 1.15, ease: 'power4.out',
          scrollTrigger: { trigger: section || el, start: 'top 78%' },
        });
      });

      // Manifesto words dim → bright (scrubbed)
      const mw = gsap.utils.toArray<HTMLElement>('#manifestoBig .w');
      if (mw.length) {
        const tl2 = gsap.timeline({ scrollTrigger: { trigger: '#about', start: 'top 72%', end: 'bottom 62%', scrub: 0.6 } });
        mw.forEach((w) => tl2.to(w, { opacity: 1, duration: 1, ease: 'none' }, '<0.4'));
      }

      // Counters
      gsap.utils.toArray<HTMLElement>('.count').forEach((el) => {
        const to  = parseFloat(el.dataset.to || '0');
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: to, duration: 1.9, ease: 'power2.out',
              onUpdate: () => { el.textContent = to % 1 === 0 ? String(Math.round(obj.v)) : obj.v.toFixed(1); },
            });
          },
        });
      });

      /* ── 3. Clip-path image reveals ── */
      // Founder photos
      gsap.utils.toArray<HTMLElement>('.member__ph').forEach((ph, i) => {
        gsap.fromTo(ph,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut',
            scrollTrigger: { trigger: ph, start: 'top 86%' }, delay: i * 0.1 },
        );
      });
      gsap.utils.toArray<HTMLElement>('.member__ph img').forEach((img) => {
        gsap.fromTo(img,
          { scale: 1.18 },
          { scale: 1, duration: 1.6, ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 86%' } },
        );
      });

      // Visa image clip-path reveal + parallax
      gsap.utils.toArray<HTMLElement>('.visa__pic').forEach((pic) => {
        gsap.fromTo(pic,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut',
            scrollTrigger: { trigger: pic, start: 'top 85%' } },
        );
      });
      gsap.utils.toArray<HTMLElement>('.visa__pic img').forEach((img) => {
        const sec = img.closest('section');
        gsap.fromTo(img,
          { yPercent: -8, scale: 1.18 },
          { yPercent: 8, scale: 1.0, ease: 'none',
            scrollTrigger: { trigger: sec || img, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });

      /* ── 4. Scroll velocity tilt (Lenis) ── */
      if (lenis) {
        gsap.ticker.add(() => {
          document.querySelectorAll<HTMLElement>('.tilt-on-scroll').forEach((el) => {
            gsap.to(el, { skewY: lenisVelocity * 0.012, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
          });
        });
      }

      // Pinned horizontal portfolio
      const track          = document.getElementById('galleryTrack');
      const gallerySection = document.getElementById('standard');
      if (track && gallerySection) {
        const distance = () => track.scrollWidth - innerWidth;
        gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: gallerySection, start: 'top top',
            end: () => '+=' + distance(),
            pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>('.gpanel--img .gpanel__media img').forEach((img) => {
          gsap.fromTo(img,
            { xPercent: -6 },
            { xPercent: 6, ease: 'none',
              scrollTrigger: { trigger: gallerySection, start: 'top top', end: () => '+=' + distance(), scrub: true } },
          );
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.addEventListener('load', () => ScrollTrigger.refresh());
    }

    boot().catch(console.warn);
  }, []);

  return null;
}
