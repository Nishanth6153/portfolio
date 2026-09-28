import React, { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar }               from './components/layout/Navbar';
import { Footer }               from './components/layout/Footer';
import { HeroSection }          from './components/sections/HeroSection';
import { AboutSection }         from './components/sections/AboutSection';
import { WorkSection }          from './components/sections/WorkSection';
import { SkillsSection }        from './components/sections/SkillsSection';
import { ExperienceSection }    from './components/sections/ExperienceSection';
import { AchievementsSection }  from './components/sections/AchievementsSection';
import { AiExperienceSection }  from './components/sections/AiExperienceSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection }       from './components/sections/ContactSection';
import { WorldScene }           from './components/3d/WorldScene';

export const App: React.FC = () => {
  // Shared refs for 3D scene reactivity
  const scrollProgress = useRef<number>(0);
  const mouseRef       = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lenisRef       = useRef<Lenis | null>(null);

  // ── Lenis smooth scroll setup ─────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  // ── Track scroll progress for 3D scene ───────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      scrollProgress.current = total > 0 ? Math.min(current / total, 1) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Track mouse position (normalized -0.5 to 0.5) ────────────────────────
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden selection:bg-[#FF9812]/30 selection:text-white"
      style={{ background: '#080908' }}
    >
      {/* ── Skip link ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF9812] focus:text-black focus:rounded-lg focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {/* ── Fixed 3D background canvas (Bioluminescent Spores, Ribbons & Neural Lattice) ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <WorldScene
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
        />
      </div>

      {/* ── Sticky Sylva Dock Navigation ── */}
      <Navbar />

      {/* ── Main content (on top of 3D canvas) ── */}
      <main id="main-content" className="relative z-10">

        {/* 01 HERO — Dominant Foreground Portrait + Registered Sylva 3D Scene */}
        <HeroSection />

        {/* Continuous Living World Content Flow */}
        <div
          className="relative"
          style={{
            background: 'linear-gradient(180deg, #0A0B09 0%, #0D0E0C 50%, #090A08 100%)',
          }}
        >
          {/* Subtle biophilic seam transition */}
          <div
            className="h-24 w-full pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(13,14,12,0.8) 0%, transparent 100%)',
            }}
          />

          {/* 02 ABOUT */}
          <AboutSection />

          {/* 03 WORK (Projects) */}
          <WorkSection />

          {/* 04 SKILLS */}
          <SkillsSection />

          {/* 05 EXPERIENCE */}
          <ExperienceSection />

          {/* 06 ACHIEVEMENTS */}
          <AchievementsSection />

          {/* 07 AI EXPERIMENTAL LAB — Photonics dispersion showcase at proper proportions */}
          <AiExperienceSection />

          {/* 08 CERTIFICATIONS */}
          <CertificationsSection />

          {/* 09 CONTACT */}
          <ContactSection />
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default App;
