import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// ── Lazy-import SylvaHero so it doesn't block the rest of the bundle ─────────
// The iframe source is served by the Vite threeui-assets middleware.
const SylvaHero = lazy(() =>
  import('@designcodeio/threeui').then((m) => ({ default: m.SylvaHero }))
);

// ── CSS import in main.tsx already covers style.css via global import ─────────
// import '@designcodeio/threeui/style.css';

export const SylvaHeroSection: React.FC = () => {
  return (
    <section
      id="sylva"
      aria-label="Living World — Creative Interlude"
      className="relative w-full"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* ── Full-screen SylvaHero iframe ── */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: '#0a1a0a' }}
            >
              <div className="text-center space-y-3">
                <div
                  className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto"
                  style={{ borderColor: 'rgba(60,180,80,0.5)', borderTopColor: 'transparent' }}
                />
                <p className="text-[11px] font-display tracking-[0.25em] opacity-50" style={{ color: '#6ecf7f' }}>
                  LOADING LIVING WORLD
                </p>
              </div>
            </div>
          }
        >
          <SylvaHero
            variant="living-green"
            headingFont="lexend"
            bodyFont="lexend"
            headingWeight="300"
            bodyWeight="300"
            primaryColor="#ffffff"
            headingSize={63}
            bodySize={16.5}
            headingLetterSpacing={-0.006}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>

      {/* ── Editorial label — top-left overlay ── */}
      <motion.div
        className="absolute top-6 left-6 z-20 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-display tracking-[0.25em]"
          style={{
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(80,200,100,0.20)',
            color: 'rgba(150,220,140,0.80)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6ecf7f' }} />
          11 — LIVING WORLD
        </div>
      </motion.div>

      {/* ── Editorial label — bottom-left overlay ── */}
      <motion.div
        className="absolute bottom-6 left-6 z-20 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <p
          className="text-[10px] font-mono-code tracking-[0.2em]"
          style={{ color: 'rgba(120,200,130,0.50)' }}
        >
          SYLVA — INTO THE LIVING WORLD
        </p>
      </motion.div>
    </section>
  );
};
