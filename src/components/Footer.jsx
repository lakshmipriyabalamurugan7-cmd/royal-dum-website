import { Crown, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-gold-500/15 bg-night-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-night-950">
                <Crown size={17} />
              </span>
              <span className="font-display text-xl font-semibold tracking-[0.18em] text-gold-shimmer">
                ROYAL DUM
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-neutral-400">
              Authentic dum biryani, slow-cooked in sealed handis. Where every grain
              tells a story.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-gold-300">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                ['Home', '#home'],
                ['About', '#about'],
                ['Menu', '#menu'],
                ['Gallery', '#gallery'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-[13px] text-neutral-400 hover:text-gold-300 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-gold-300">Follow the Aroma</h3>
            <div className="mt-4 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#home"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 hover:border-gold-400 hover:text-gold-300 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-neutral-400">Mon – Sun · 12:00 – 23:00</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/8 pt-6">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Royal Dum. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">Cooked with patience, sealed with love.</p>
        </div>
      </div>
    </footer>
  );
}
