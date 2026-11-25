import { motion } from 'framer-motion';
import { Gift, CalendarDays, Crown, ArrowRight } from 'lucide-react';

const OFFERS = [
  {
    icon: Gift,
    title: 'Family Biryani Combo',
    text: 'Full family handi + 4 raitas + salan + 2 desserts. Everything your table needs.',
    save: 'Save ₹250',
    accent: 'from-ember-600/25 to-transparent',
  },
  {
    icon: CalendarDays,
    title: 'Weekend Special',
    text: 'Sat & Sun only — 20% off all individual biryanis, dine-in and takeaway.',
    save: '20% OFF',
    accent: 'from-gold-600/25 to-transparent',
  },
  {
    icon: Crown,
    title: 'Royal Feast Combo',
    text: 'Chicken dum + mutton biryani + Chicken 65 + kebabs & drinks for the full court.',
    save: 'Save ₹400',
    accent: 'from-gold-500/25 to-transparent',
  },
];

export default function Offers() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-gold-400">Royal Privileges</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
            Special <span className="text-gold-shimmer">Offers</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-gold-500/20 bg-night-850 p-7 shadow-card transition-colors duration-300 hover:border-gold-400/50"
            >
              <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${o.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-gradient p-3.5 text-night-950 shadow-glow">
                    <o.icon size={22} />
                  </span>
                  <span className="rounded-full bg-ember-gradient px-3.5 py-1.5 text-xs font-bold tracking-wide text-white shadow-card">
                    {o.save}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{o.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-neutral-400">{o.text}</p>
                <a
                  href="#menu"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-300 hover:text-gold-200 transition-colors"
                >
                  Claim Offer <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
