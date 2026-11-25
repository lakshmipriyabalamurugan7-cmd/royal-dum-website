import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles, Star } from 'lucide-react';
import Scene3DBoundary from './Scene3DBoundary';

const Food3D = lazy(() => import('./Food3D'));

const isLowPower = () =>
  typeof navigator !== 'undefined' &&
  (navigator.hardwareConcurrency ?? 8) <= 2 ||
  (navigator.connection?.saveData ?? false);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fallbackVisual = (
  /* Lightweight fallback for low-powered devices or 3D failures */
  <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <div className="absolute -inset-16 rounded-full bg-ember-600/20 blur-3xl" />
      <div className="relative h-56 w-56 rounded-full bg-gold-gradient shadow-glow-lg flex items-center justify-center">
        <div className="h-44 w-44 rounded-full bg-gradient-to-b from-gold-200 to-ember-500 border-4 border-gold-700/60 flex items-center justify-center">
          <span className="font-display text-4xl text-night-900/80">DUM</span>
        </div>
      </div>
    </motion.div>
  </div>
);

export default function Hero({ cartCount = 0 }) {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    setLowPower(isLowPower());
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-night-950">
      {/* Photographic backdrop — real Chicken Dum Biryani, softened behind the 3D scene */}
      <div aria-hidden className="absolute inset-0">
        <img
          src="/images/hero-biryani.jpg"
          alt=""
          className="h-full w-full object-cover opacity-40"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/80 to-night-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950/60" />
      </div>

      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-ember-600/15 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-gold-600/12 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050302_78%)]" />
      </div>

      {/* 3D canvas — errors are contained and show the branded fallback */}
      <div className="absolute inset-0">
        <Scene3DBoundary fallback={fallbackVisual}>
          <Suspense fallback={null}>
            {!lowPower ? <Food3D /> : fallbackVisual}
          </Suspense>
        </Scene3DBoundary>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full pt-28 pb-16">
        <div className="max-w-xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="mb-6 inline-flex items-center gap-2 glass-card px-4 py-2">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-[11px] tracking-[0.28em] uppercase text-gold-200">
              Authentic Dum Cooking Since Day One
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-wide text-gold-shimmer animate-shimmer"
          >
            ROYAL DUM
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-4 font-accent italic text-2xl sm:text-3xl text-gold-200"
          >
            “Where Every Grain Tells a Story”
          </motion.p>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-400"
          >
            Authentic Dum Biryani. Extraordinary Taste. Slow-cooked in sealed brass
            handis, layered with aged basmati, hand-pounded spices and patience.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#menu" className="btn-gold text-base">
              Explore Our Menu <ArrowRight size={17} />
            </a>
            <a href="#menu" className="btn-outline-gold text-base">
              <ShoppingBag size={16} /> Order Now
              {cartCount > 0 && (
                <span className="ml-1 rounded-full bg-gold-400/20 px-2 text-xs">{cartCount}</span>
              )}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}
            className="mt-12 flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="flex text-gold-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs text-neutral-400">4.9 rated by guests</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <span className="text-xs text-neutral-400">
              Sealed &amp; slow-cooked <span className="text-gold-300 font-medium">6 hrs</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-gold-500/40 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
