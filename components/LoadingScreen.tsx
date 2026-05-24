'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 8 + 2;
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 900);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 80);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen noise"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Aurora blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="aurora-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c4a55a] opacity-5 blur-[120px]" />
            <div className="aurora-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#e8d5a3] opacity-4 blur-[100px]" />
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(rgba(196,165,90,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(196,165,90,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

          <div className="relative flex flex-col items-center gap-10 px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <img
                src="https://i.ibb.co/F4J4BkrX/Untitled-design-3.png"
                alt="KYR Real Estate"
                className="h-24 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 30px rgba(196,165,90,0.4))' }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#c4a55a] font-light"
            >
              Dubai&apos;s Premier Luxury Property Agency
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '280px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative h-[1px] bg-white/10 overflow-hidden"
              style={{ width: '280px' }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #c4a55a, #e8d5a3)',
                  boxShadow: '0 0 10px rgba(196,165,90,0.8)',
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Progress number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-white/30 font-mono tracking-widest -mt-6"
            >
              {Math.floor(progress).toString().padStart(3, '0')}
            </motion.span>
          </div>

          {/* Bottom ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c4a55a]" />
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#c4a55a]">Est. Dubai</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c4a55a]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
