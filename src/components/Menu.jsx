import { motion } from 'framer-motion';
import { Flame, Leaf, Users, Drumstick } from 'lucide-react';
import FoodCard from './FoodCard';

const IMG = (name) => `/images/${name}`;

export const MENU_ITEMS = [
  {
    id: 'royal-chicken-dum',
    name: 'Royal Chicken Dum Biryani',
    shortName: 'Royal Chicken Dum',
    description: 'Signature handi biryani — tender chicken marinated overnight, sealed with saffron milk and slow dum-cooked.',
    price: 349,
    rating: 4.9,
    veg: false,
    image: IMG('menu-chicken-dum.jpg'),
    tag: 'Bestseller',
    tagIcon: 'flame',
  },
  {
    id: 'hyderabadi-mutton',
    name: 'Hyderabadi Mutton Biryani',
    shortName: 'Mutton Biryani',
    description: 'Kacchi-style biryani with slow-cooked mutton shanks, korma spices and ghee-roasted cashews.',
    price: 429,
    rating: 4.8,
    veg: false,
    image: IMG('menu-mutton.jpg'),
    tag: 'Chef’s Pick',
    tagIcon: 'drumstick',
  },
  {
    id: 'chicken-65',
    name: 'Spicy Chicken 65 Biryani',
    shortName: 'Chicken 65 Biryani',
    description: 'Fiery Chicken 65 tossed in curry-leaf chilli masala, layered over fragrant dum rice with raita.',
    price: 369,
    rating: 4.7,
    veg: false,
    image: IMG('menu-chicken65.jpg'),
    tag: 'Spicy',
    tagIcon: 'flame',
  },
  {
    id: 'egg-biryani',
    name: 'Egg Biryani',
    shortName: 'Egg Biryani',
    description: 'Masala-roasted eggs folded through saffron rice with fried onions, mint and whole spices.',
    price: 259,
    rating: 4.6,
    veg: false,
    image: IMG('menu-egg.jpg'),
    tag: 'Comfort Classic',
    tagIcon: 'leaf',
  },
  {
    id: 'veg-dum',
    name: 'Veg Dum Biryani',
    shortName: 'Veg Dum Biryani',
    description: 'Garden vegetables and paneer dum-cooked with rose water, kewra and toasted spices.',
    price: 279,
    rating: 4.7,
    veg: true,
    image: IMG('menu-veg.jpg'),
    tag: 'Vegetarian',
    tagIcon: 'leaf',
  },
  {
    id: 'family-pack',
    name: 'Family Pack Biryani',
    shortName: 'Family Pack',
    description: 'A full brass handi of our chicken dum biryani — serves four, with raita, salan and dessert.',
    price: 999,
    rating: 4.9,
    veg: false,
    image: IMG('hero-biryani.jpg'),
    tag: 'Serves 4',
    tagIcon: 'users',
  },
];

const tagIcons = { flame: Flame, leaf: Leaf, users: Users, drumstick: Drumstick };

export default function Menu({ onAdd }) {
  return (
    <section id="menu" className="relative py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold-600/8 blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-ember-600/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-gold-400">From Our Handis</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
            Signature <span className="text-gold-shimmer">Biryani Menu</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-400 leading-relaxed">
            Every biryani is sealed, slow-cooked and served the royal way — never rushed,
            never reheated.
          </p>
        </motion.div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {MENU_ITEMS.map((item, i) => {
            const Icon = tagIcons[item.tagIcon] ?? Flame;
            return (
              <div key={item.id} className="relative">
                <div className="absolute -top-3 left-5 z-20 flex items-center gap-1.5 rounded-full bg-ember-gradient px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-white shadow-card">
                  <Icon size={11} strokeWidth={2.6} /> {item.tag}
                </div>
                <FoodCard item={item} onAdd={onAdd} index={i} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
