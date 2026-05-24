'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['Home', 'About', 'Properties', 'Services', 'Invest', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-strong py-4 shadow-2xl' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="https://i.ibb.co/F4J4BkrX/Untitled-design-3.png"
              alt="KYR Real Estate"
              className="h-10 w-auto"
              style={{ filter: 'drop-shadow(0 0 12px rgba(196,165,90,0.3))' }}
            />
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                onClick={() => scrollTo(link)}
                className="relative text-xs tracking-[0.15em] uppercase text-white/60 hover:text-[#c4a55a] transition-colors duration-300 group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c4a55a] group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => scrollTo('Contact')}
            className="hidden lg:flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium border border-[#c4a55a]/40 text-[#c4a55a] hover:bg-[#c4a55a] hover:text-black transition-all duration-300 rounded-full"
            style={{ boxShadow: '0 0 20px rgba(196,165,90,0.1)' }}
          >
            Book Consultation
          </motion.button>

          {/* Mobile burger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#c4a55a] origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-4 h-px bg-[#c4a55a]"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[#c4a55a] origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => scrollTo(link)}
                className="font-serif text-4xl font-light text-white/80 hover:text-[#c4a55a] transition-colors"
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo('Contact')}
              className="mt-4 px-8 py-3 border border-[#c4a55a]/40 text-[#c4a55a] text-sm tracking-widest uppercase rounded-full"
            >
              Book Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
