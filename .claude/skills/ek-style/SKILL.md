---
description: >
  Apply Emil Kowalski / Awwwards-level motion design to this project.
  Use when the user asks to improve animations, add cinematic scroll effects,
  refine transitions, or make the site feel more premium/luxury.
---

# Emil Kowalski Style Upgrades for KYR

You are implementing Emil Kowalski's signature motion design aesthetic on a luxury real estate website.
His style is: cinematic, unhurried, editorial. Every element earns its place on screen.

## Core principles

1. **Nothing pops in — everything arrives.** Use clip-path reveals, not opacity fades alone.
2. **Typography is the hero.** Characters split and cascade in; headlines take their time.
3. **Smooth scroll is non-negotiable.** Re-add Lenis with weighted easing.
4. **Images breathe.** Scale from 1.15 → 1.0 as they reveal. Parallax at 15–20% depth.
5. **Cursor tells the story.** The custom cursor morphs, labels, and leads the eye.
6. **Stagger has personality.** Never uniform. Use `power4.out` and long durations (1.2–1.6s).

## Techniques to implement (in priority order)

### 1. Lenis smooth scroll
```ts
// In a client component useEffect:
const Lenis = (await import('lenis')).default;
const lenis = new Lenis({ duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
ScrollTrigger.update on lenis scroll event
```

### 2. Char-level headline reveal
Split `.hero__title` text into individual `<span>` chars, then:
```js
gsap.fromTo(chars, 
  { y: '110%', rotateX: -80, opacity: 0 },
  { y: 0, rotateX: 0, opacity: 1, duration: 1.4, stagger: 0.032, ease: 'power4.out', delay: 0.2 }
)
```
Wrap each char's parent in `overflow:hidden; display:inline-block`.

### 3. Clip-path image reveals (all section images)
```js
gsap.fromTo(img,
  { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.18 },
  { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0, duration: 1.5, ease: 'power3.inOut',
    scrollTrigger: { trigger: img, start: 'top 85%' } }
)
```

### 4. Scroll velocity tilt
```js
let velocity = 0;
lenis.on('scroll', ({ velocity: v }) => { velocity = v; });
gsap.ticker.add(() => {
  document.querySelectorAll('.tilt-on-scroll').forEach(el => {
    gsap.to(el, { skewY: velocity * 0.012, duration: 0.6, ease: 'power3.out' });
  });
});
```
Apply `.tilt-on-scroll` to section headings and marquee tracks.

### 5. Magnetic cursor label morphing
When hovering `.gpanel--img`, cursor label should show the panel title, not just "Drag".

## File locations in this project
- Animations: `components/GSAPAnimations.tsx`
- Smooth scroll: add to `app/page.tsx` via a `<LenisProvider>` component
- Hero: `components/Hero.tsx`
- Gallery: `components/GallerySection.tsx`
- CSS: `app/globals.css`

## Quality bar
Before finishing, ask: "Would this pass Awwwards jury review?" 
If any animation feels abrupt, cheap, or fast — slow it down and add a stagger.
