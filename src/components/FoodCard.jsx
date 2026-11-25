import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';

/* Real biryani photo shown if a dish photo ever fails to load */
const FALLBACK_IMG = '/images/gallery-biryani-2.jpg';

export default function FoodCard({ item, onAdd, index = 0 }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imgRef = useRef(null);
  const priceRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 12}deg) translateY(-6px)`;
    if (glowRef.current) glowRef.current.style.opacity = '1';
    if (imgRef.current) imgRef.current.style.transform = `scale(1.12) translate(${px * 10}px, ${py * 10}px)`;
    if (priceRef.current) priceRef.current.style.transform = `translateZ(40px)`;
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (imgRef.current) imgRef.current.style.transform = 'scale(1.02)';
    if (priceRef.current) priceRef.current.style.transform = 'translateZ(0)';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group [perspective:900px]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-2xl bg-night-850 border border-white/8 shadow-card transition-[transform,border-color,box-shadow] duration-200 ease-out will-change-transform hover:border-gold-500/50"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Golden border glow on hover */}
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{ boxShadow: '0 0 0 1px rgba(233,178,63,.55), 0 0 45px rgba(217,154,38,.35), inset 0 0 30px rgba(217,154,38,.08)' }}
        />

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            ref={imgRef}
            src={item.image}
            alt={`${item.name} — ${item.description}`}
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_IMG) {
                e.currentTarget.src = FALLBACK_IMG;
              } else {
                e.currentTarget.style.display = 'none';
              }
            }}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: 'scale(1.02)' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-night-850 via-transparent to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-4 right-4 glass-card flex items-center gap-1.5 px-2.5 py-1.5">
            <Star size={13} className="text-gold-400" fill="currentColor" strokeWidth={0} />
            <span className="text-xs font-semibold text-gold-200">{item.rating.toFixed(1)}</span>
          </div>

          {/* Veg / Non-veg mark */}
          <div
            className={`absolute top-4 left-4 flex h-6 w-6 items-center justify-center rounded border-2 bg-night-950/60 ${
              item.veg ? 'border-green-500' : 'border-red-500'
            }`}
            title={item.veg ? 'Vegetarian' : 'Non-vegetarian'}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        </div>

        {/* Body */}
        <div className="relative p-5" style={{ transform: 'translateZ(24px)' }}>
          <h3 className="font-display text-xl font-semibold text-white group-hover:text-gold-200 transition-colors duration-300">
            {item.name}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-400 min-h-[40px]">
            {item.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span
              ref={priceRef}
              className="font-display text-2xl font-bold text-gold-400 transition-transform duration-300"
            >
              ₹{item.price.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => onAdd(item)}
              className="flex items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-2 text-[13px] font-semibold text-night-950 transition-all duration-300 hover:shadow-glow hover:scale-105 active:scale-95"
            >
              <Plus size={15} strokeWidth={2.6} /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
