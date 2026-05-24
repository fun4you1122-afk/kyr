'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function KineticText({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  once = true,
  tag: Tag = 'span',
}: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-60px' });

  const words = text.split(' ');

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`${className} overflow-hidden`}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotateX: -40 }}
            animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: delay + wi * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: 'bottom center', display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Character-level split for hero headlines
export function KineticChars({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref   = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });

  return (
    <div ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ y: 80, opacity: 0, rotateY: -30 }}
          animate={isInView ? { y: 0, opacity: 1, rotateY: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.025,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
