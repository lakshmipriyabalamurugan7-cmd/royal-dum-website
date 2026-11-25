import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Flame } from 'lucide-react';

/* Cinematic biryani footage — royalty-free source with graceful fallback */
const VIDEO_SRC = 'https://cdn.coverr.co/videos/coverr-cooking-indian-food-5482/1080p.mp4';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-gold-500/20 shadow-card"
        >
          <div className="relative h-[420px] sm:h-[540px] lg:h-[620px] bg-night-900">
            {!failed ? (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setFailed(true)}
              />
            ) : (
              /* Graceful fallback when video can't load */
              <div className="absolute inset-0 bg-gradient-to-br from-night-800 via-night-900 to-night-950">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="text-ember-500/40" size={120} />
                </div>
                <div className="absolute top-1/4 left-1/5 h-72 w-72 rounded-full bg-ember-600/20 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/5 h-72 w-72 rounded-full bg-gold-600/20 blur-[100px]" />
              </div>
            )}

            {/* Cinematic overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/35 to-night-950/55" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,3,2,0.55)_100%)]" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[11px] tracking-[0.35em] uppercase text-gold-300 mb-4"
              >
                The Royal Craft
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight"
              >
                Steam, Saffron &amp; <span className="text-gold-shimmer">Sealed Traditions</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-5 max-w-xl text-sm sm:text-base text-neutral-300 leading-relaxed"
              >
                Watch the dough seal break, the steam escape and layers of hand-pounded
                spice meet aged basmati — every handi tells the same six-hour story.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.75, duration: 0.5 }}
                onClick={toggle}
                aria-label={playing ? 'Pause video' : 'Play video'}
                className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-night-950 shadow-glow hover:scale-110 active:scale-95 transition-transform duration-300"
              >
                {playing ? (
                  <span className="flex gap-1">
                    <span className="block h-4 w-1 rounded bg-night-950" />
                    <span className="block h-4 w-1 rounded bg-night-950" />
                  </span>
                ) : (
                  <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
