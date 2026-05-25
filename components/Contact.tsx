'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SocialIcons from '@/components/SocialIcons';

const interests = ['Buy Property', 'Rent Property', 'Sell Property', 'Investment Advice', 'Golden Visa', 'Off-Plan Projects'];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#0b0b15]" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.2)] to-transparent" />

      {/* Aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,165,90,0.04), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="premium-badge mb-6">Get In Touch</div>
            <h2 className="font-serif font-light text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              Your Dubai Journey<br />
              <span className="text-gold-gradient">Starts Here</span>
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-white/40 text-sm font-light leading-relaxed mb-12">
              Whether you&apos;re buying your first Dubai property, expanding your investment portfolio, or looking to secure your Golden Visa — our expert team is ready to guide you every step of the way.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-6">
              {[
                { label: 'Phone', value: '+971 58 582 0297', href: 'tel:+971585820297', icon: '📞' },
                { label: 'Email', value: 'info@kyr.ae', href: 'mailto:info@kyr.ae', icon: '✉️' },
                { label: 'Sales', value: 'sales@kyr.ae', href: 'mailto:sales@kyr.ae', icon: '🏷️' },
                { label: 'Location', value: 'Dubai, United Arab Emirates', href: 'https://maps.google.com/?q=Dubai,UAE', icon: '📍' },
              ].map(item => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-base flex-shrink-0 group-hover:border-[rgba(196,165,90,0.3)] transition-colors duration-300"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-white/20">{item.label}</div>
                    <div className="text-sm text-white/60 group-hover:text-[#c4a55a] transition-colors duration-300">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10">
              <SocialIcons />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-3xl p-12 text-center"
                style={{ boxShadow: '0 0 60px rgba(196,165,90,0.08)' }}
              >
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-serif text-2xl text-white mb-2">Message Received</h3>
                <p className="text-white/40 text-sm">Our team will contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="glass-strong rounded-3xl p-8 flex flex-col gap-5"
                style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(196,165,90,0.03)' }}>

                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email'].map(k => (
                    <div key={k} className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-white/30 capitalize">{k}</label>
                      <input
                        type={k === 'email' ? 'email' : 'text'}
                        required
                        value={form[k as keyof typeof form]}
                        onChange={e => update(k, e.target.value)}
                        placeholder={k === 'name' ? 'Your Name' : 'your@email.com'}
                        className="bg-transparent border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[rgba(196,165,90,0.4)] transition-colors duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/30">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder="+971 XX XXX XXXX"
                    className="bg-transparent border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[rgba(196,165,90,0.4)] transition-colors duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/30">I&apos;m Interested In</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('interest', opt)}
                        className={`px-4 py-2 text-xs rounded-full border transition-all duration-200 ${
                          form.interest === opt
                            ? 'border-[#c4a55a] bg-[rgba(196,165,90,0.12)] text-[#c4a55a]'
                            : 'border-white/8 text-white/30 hover:border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-white/30">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us about your property goals..."
                    className="bg-transparent border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[rgba(196,165,90,0.4)] transition-colors duration-300 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(196,165,90,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase font-semibold text-black rounded-full"
                  style={{ background: 'linear-gradient(135deg, #c4a55a, #e8d5a3, #c4a55a)', backgroundSize: '200%' }}
                >
                  Send Message
                </motion.button>

                <p className="text-[10px] text-white/20 text-center">
                  By submitting, you agree to be contacted by KYR Real Estate. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
