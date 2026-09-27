import React, { useRef, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { Navbar }               from './components/layout/Navbar';
import { Footer }               from './components/layout/Footer';
import { HeroSection }          from './components/sections/HeroSection';
import { AboutSection }         from './components/sections/AboutSection';
import { WorkSection }          from './components/sections/WorkSection';
import { ExperienceSection }    from './components/sections/ExperienceSection';
import { SkillsSection }        from './components/sections/SkillsSection';
import { AchievementsSection }  from './components/sections/AchievementsSection';
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
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // ── Track scroll progress for 3D scene ───────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const total  = document.documentElement.scrollHeight - window.innerHeight;
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
      className="relative min-h-screen overflow-x-hidden selection:bg-[rgba(255,152,18,0.30)] selection:text-white"
      style={{ background: '#0D0D0D' }}
    >
      {/* ── Skip link ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF9812] focus:text-black focus:rounded-lg focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {/* ── Fixed 3D background canvas ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <WorldScene
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
        />
      </div>

      {/* ── Sticky navigation ── */}
      <Navbar />

      {/* ── Main content (on top of 3D canvas) ── */}
      <main id="main-content" className="relative z-10">

        {/* 01 HERO — orange editorial full-screen */}
        <HeroSection />

        {/* Dark content sections layer below on scroll */}
        <div className="relative" style={{ background: '#0D0D0D' }}>

          {/* Transition gradient from orange → dark */}
          <div
            className="h-32 w-full pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #FF9812 0%, #0D0D0D 100%)',
            }}
          />

          {/* 02 ABOUT */}
          <AboutSection />

          {/* 03 WORK */}
          <WorkSection />

          {/* 04 EXPERIENCE */}
          <ExperienceSection />

          {/* 05 SKILLS */}
          <SkillsSection />

          {/* 06 ACHIEVEMENTS */}
          <AchievementsSection />

          {/* 07 CERTIFICATIONS */}
          <CertificationsSection />

          {/* 08 CONTACT */}
          <ContactSection />
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default App;
