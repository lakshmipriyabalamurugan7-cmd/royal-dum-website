import { motion } from 'framer-motion';
import { Clock, Flame, Leaf, Wheat } from 'lucide-react';

const points = [
  {
    icon: Clock,
    title: 'The Dum Technique',
    text: 'The handi is sealed with dough and slow-cooked over embers for hours, so every grain drinks in the aroma of its own steam.',
  },
  {
    icon: Wheat,
    title: 'Aged Basmati Only',
    text: 'We use long-grain basmati aged a full year — grains that stay separate, elongate beautifully, and never turn mushy.',
  },
  {
    icon: Flame,
    title: 'Hand-Pounded Spices',
    text: 'Whole spices ground fresh each morning in stone — no shortcuts, no commercial masala, no compromise on aroma.',
  },
  {
    icon: Leaf,
    title: 'Fresh Every Single Day',
    text: 'Meat from trusted local butchers, produce from morning markets, and biryani made in small batches through the day.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-ember-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 shadow-card">
              <img
                src="/images/gallery-handi.jpg"
                alt="Traditional dum cooking in a sealed clay handi over embers"
                loading="lazy"
                className="h-[420px] sm:h-[520px] w-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src !== '/images/hero-biryani.jpg') {
                    el.src = '/images/hero-biryani.jpg';
                    el.alt = 'Chicken dum biryani served royal style';
                  } else {
                    el.style.display = 'none';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-8 -right-2 sm:right-8 glass-card px-7 py-5 shadow-glow"
            >
              <span className="font-display text-4xl font-bold text-gold-400">6 hrs</span>
              <p className="mt-1 text-xs tracking-[0.18em] uppercase text-neutral-300">
                Slow Dum Per Handi
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold-400">Our Story</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold leading-tight text-white">
              The Art of <span className="text-gold-shimmer">Authentic Dum</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-400">
              Dum cooking is a royal patience — rice and marinated meat layered in a
              brass handi, sealed with dough, and left to cook in its own steam over
              a slow fire. Nothing escapes; every aroma returns to the grain.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-400">
              At Royal Dum we cook the way the nawabs' bawarchis did: aged basmati,
              hand-pounded spices, ghee at the right moment, and the discipline to
              wait. The seal breaks at your table, not before.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {points.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                  className="flex gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-500/25 text-gold-400">
                    <p.icon size={19} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-[15px] text-white">{p.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
