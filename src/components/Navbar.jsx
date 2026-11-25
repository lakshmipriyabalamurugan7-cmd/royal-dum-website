import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu as MenuIcon, X, Crown } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onCartOpen, cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-night-950/85 backdrop-blur-xl border-b border-gold-500/15 shadow-card'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-night-950 shadow-glow group-hover:rotate-12 transition-transform duration-300">
            <Crown size={20} strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl sm:text-2xl font-semibold tracking-[0.18em] text-gold-shimmer animate-shimmer">
            ROYAL DUM
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[13px] font-medium tracking-[0.16em] uppercase text-neutral-300 hover:text-gold-300 transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 hover:bg-gold-400/10 hover:border-gold-400 transition-all duration-300"
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember-gradient px-1 text-[11px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a href="#menu" className="btn-gold hidden sm:inline-flex !py-2.5 !px-6">
            Order Now
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-300"
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-night-950/95 backdrop-blur-xl border-b border-gold-500/15"
          >
            <ul className="px-8 py-5 space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm tracking-[0.16em] uppercase text-neutral-200 hover:text-gold-300 border-b border-white/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a href="#menu" onClick={() => setMobileOpen(false)} className="btn-gold w-full">
                  Order Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
