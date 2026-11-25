import { motion } from 'framer-motion';

const FALLBACK_IMG = '/images/hero-biryani.jpg';

const ITEMS = [
  {
    title: 'Chicken Dum Biryani',
    alt: 'Chicken dum biryani garnished with fried onions and herbs',
    src: '/images/gallery-biryani-2.jpg',
    span: 'md:col-span-2 md:row-span-2',
    h: 'h-72 md:h-full',
  },
  {
    title: 'Hand-Pounded Spices',
    alt: 'Assorted whole Indian spices used in dum biryani',
    src: '/images/gallery-spices-2.jpg',
    span: '',
    h: 'h-56',
  },
  {
    title: 'The Clay Handi',
    alt: 'Traditional clay handi pot used for slow dum cooking',
    src: '/images/gallery-handi.jpg',
    span: '',
    h: 'h-56',
  },
  {
    title: 'Mutton Biryani',
    alt: 'Mutton biryani served with whole spiced potatoes',
    src: '/images/gallery-mutton-2.jpg',
    span: '',
    h: 'h-56',
  },
  {
    title: 'Biryani & Raita',
    alt: 'Restaurant style chicken biryani served with raita',
    src: '/images/menu-chicken-dum.jpg',
    span: '',
    h: 'h-56',
  },
  {
    title: 'Chicken 65',
    alt: 'Spicy Chicken 65 close-up with curry leaves',
    src: '/images/gallery-chicken65-2.jpg',
    span: '',
    h: 'h-56',
  },
  {
    title: 'Egg Biryani',
    alt: 'Kerala style egg biryani with masala roasted eggs',
    src: '/images/gallery-egg-2.jpg',
    span: 'md:col-span-2',
    h: 'h-56',
  },
  {
    title: 'Spice Market Finds',
    alt: 'Colourful ground spices from the local market',
    src: '/images/gallery-spices.jpg',
    span: '',
    h: 'h-56',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-gold-400">A Feast for the Eyes</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
            The <span className="text-gold-shimmer">Gallery</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 md:auto-rows-[240px]">
          {ITEMS.map((item, i) => (
            <motion.figure
              key={item.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 shadow-card ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={`w-full ${item.h} md:h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110`}
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src !== FALLBACK_IMG) {
                    el.src = FALLBACK_IMG;
                  } else {
                    el.style.visibility = 'hidden';
                  }
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                <span className="font-display text-xl font-semibold text-white translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 block">
                  {item.title}
                </span>
                <span className="mt-1 block h-px w-8 bg-gold-400 group-hover:w-16 transition-all duration-500" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
