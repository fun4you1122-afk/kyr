'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const properties = [
  {
    id: 1,
    title: 'The Palm Penthouse',
    location: 'Palm Jumeirah, Dubai',
    type: 'Penthouse',
    status: 'Ready',
    price: 'AED 28,500,000',
    beds: 5,
    baths: 6,
    area: '12,400',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tag: 'Exclusive',
  },
  {
    id: 2,
    title: 'Downtown Signature',
    location: 'Downtown Dubai, Burj Khalifa District',
    type: 'Penthouse',
    status: 'Ready',
    price: 'AED 12,500,000',
    beds: 4,
    baths: 5,
    area: '6,800',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'Featured',
  },
  {
    id: 3,
    title: 'Emaar Beachfront Residence',
    location: 'Emaar Beachfront, Dubai Marina',
    type: 'Apartment',
    status: 'Off-Plan',
    price: 'AED 8,500,000',
    beds: 3,
    baths: 4,
    area: '3,200',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    tag: 'Off-Plan',
  },
  {
    id: 4,
    title: 'Business Bay Sky Suite',
    location: 'Business Bay, Dubai',
    type: 'Apartment',
    status: 'Ready',
    price: 'AED 3,200,000',
    beds: 2,
    baths: 3,
    area: '1,850',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    tag: 'Prime',
  },
  {
    id: 5,
    title: 'Jumeirah Golf Estates Villa',
    location: 'Jumeirah Golf Estates, Dubai',
    type: 'Villa',
    status: 'Ready',
    price: 'AED 18,000,000',
    beds: 6,
    baths: 7,
    area: '8,900',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    tag: 'Golf Front',
  },
  {
    id: 6,
    title: 'DIFC Luxury Loft',
    location: 'DIFC, Financial District',
    type: 'Loft',
    status: 'Ready',
    price: 'AED 4,800,000',
    beds: 2,
    baths: 2,
    area: '2,100',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    tag: 'City View',
  },
];

const filters = ['All', 'Ready', 'Off-Plan', 'Villa', 'Penthouse', 'Apartment'];

function PropertyCard({ p, index, isInView }: { p: typeof properties[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="luxury-card rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div className="property-image-wrap relative h-60">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,16,0.8)] via-[rgba(8,8,16,0.2)] to-transparent" />

        {/* Tag */}
        <div className="absolute top-4 left-4 premium-badge text-[10px]">{p.tag}</div>

        {/* Status */}
        <div className={`absolute top-4 right-4 text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium ${
          p.status === 'Ready' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#c4a55a]/20 text-[#c4a55a] border border-[#c4a55a]/30'
        }`}>
          {p.status}
        </div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-[rgba(8,8,16,0.4)]"
        >
          <div className="px-6 py-2.5 border border-[#c4a55a]/60 text-[#c4a55a] text-xs tracking-[0.15em] uppercase rounded-full glass">
            View Details
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Type */}
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#c4a55a] mb-1">{p.type}</div>

        {/* Title */}
        <h3 className="font-serif text-lg text-white font-light mb-1">{p.title}</h3>
        <p className="text-xs text-white/30 mb-4">{p.location}</p>

        {/* Specs */}
        <div className="flex gap-4 mb-5">
          <span className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-[#c4a55a]">⊟</span> {p.beds} Beds
          </span>
          <span className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-[#c4a55a]">◎</span> {p.baths} Bath
          </span>
          <span className="text-xs text-white/40 flex items-center gap-1">
            <span className="text-[#c4a55a]">▭</span> {p.area} sqft
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <div className="text-[9px] tracking-wider uppercase text-white/20">Starting from</div>
            <div className="font-serif text-xl text-gold-gradient font-light">{p.price}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full border border-[#c4a55a]/40 flex items-center justify-center text-[#c4a55a] hover:bg-[#c4a55a] hover:text-black transition-all duration-300 text-sm"
          >
            →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Properties() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = properties.filter(p =>
    activeFilter === 'All' ||
    p.status === activeFilter ||
    p.type === activeFilter
  );

  return (
    <section id="properties" className="relative section-padding overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[#0a0a14]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(196,165,90,0.15)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="premium-badge mb-4">Curated Portfolio</div>
            <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              Featured<br /><span className="text-gold-gradient">Properties</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs font-light leading-relaxed">
            Handpicked properties across Dubai&apos;s most prestigious locations — each one a masterpiece of architecture and luxury living.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-[#c4a55a] text-black font-semibold'
                  : 'border border-white/10 text-white/40 hover:border-[#c4a55a]/40 hover:text-[#c4a55a]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} p={p} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 text-xs tracking-[0.2em] uppercase border border-[#c4a55a]/30 text-[#c4a55a] rounded-full hover:bg-[#c4a55a]/10 transition-all duration-300"
          >
            View Full Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
}
