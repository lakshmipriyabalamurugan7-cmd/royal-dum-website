import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 4500);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold-600/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-gold-400">Find the Royal Table</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white">
            Visit <span className="text-gold-shimmer">Us</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass-card p-6 space-y-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-500/25 text-gold-400">
                  <MapPin size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Address</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">
                    123 Royal Lane, Your City —
                    <br />
                    add your full address here
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-500/25 text-gold-400">
                  <Phone size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Phone</h3>
                  <p className="mt-1 text-[13px] text-neutral-400">+91 XXXXX XXXXX</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-500/25 text-gold-400">
                  <Clock size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">Opening Hours</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">
                    Mon – Thu: 12:00 – 23:00
                    <br />
                    Fri – Sun: 12:00 – 23:30
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps embed placeholder — replace src with your real embed URL */}
            <div className="overflow-hidden rounded-2xl border border-gold-500/20 shadow-card">
              <iframe
                title="Royal Dum location"
                src="https://www.google.com/maps?q=hyderabad&output=embed"
                className="h-64 w-full grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            onSubmit={submit}
            className="lg:col-span-3 glass-card p-7 sm:p-9"
          >
            <h3 className="font-display text-2xl font-semibold text-white">Send a Message</h3>
            <p className="mt-1.5 text-[13px] text-neutral-400">
              Questions, bookings or feedback — we'd love to hear from you.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs tracking-[0.14em] uppercase text-neutral-300">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-night-800/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-gold-500/60 focus:bg-night-800"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs tracking-[0.14em] uppercase text-neutral-300">Phone</span>
                <input
                  required
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+91"
                  className="w-full rounded-xl border border-white/10 bg-night-800/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-gold-500/60 focus:bg-night-800"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-xs tracking-[0.14em] uppercase text-neutral-300">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set('message')}
                placeholder="How can we serve you?"
                className="w-full resize-none rounded-xl border border-white/10 bg-night-800/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-gold-500/60 focus:bg-night-800"
              />
            </label>

            <div className="mt-7 flex items-center gap-4">
              <button type="submit" className="btn-gold">
                Send Message <Send size={15} />
              </button>
              {sent && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-sm text-green-400"
                >
                  <CheckCircle2 size={16} /> Message received — we'll be in touch!
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
