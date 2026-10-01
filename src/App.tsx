import React, { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar }               from './components/layout/Navbar';
import { Footer }               from './components/layout/Footer';
import { HeroSection }          from './components/sections/HeroSection';
import { AboutSection }         from './components/sections/AboutSection';
import { WorkSection }          from './components/sections/WorkSection';
import { ExperienceSection }    from './components/sections/ExperienceSection';
import { SkillsSection }        from './components/sections/SkillsSection';
import { AchievementsSection }  from './components/sections/AchievementsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { AiExperienceSection }  from './components/sections/AiExperienceSection';
import { ContactSection }       from './components/sections/ContactSection';
import { WorldScene }           from './components/3d/WorldScene';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const App: React.FC = () => {
  // Shared refs for 3D scene reactivity
  const scrollProgress = useRef<number>(0);
  const mouseRef       = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lenisRef       = useRef<Lenis | null>(null);

  // ── Lenis Smooth Scroll + GSAP ScrollTrigger Master Synchronization ────────
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's central RAF ticker for rock-solid frame sync
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  // ── Track Scroll Progress for Unified 3D Living World ─────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      scrollProgress.current = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Track Mouse Coordinates (Normalized -0.5 to 0.5) ─────────────────────
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
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
      {/* ── Accessibility Skip Link ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF9812] focus:text-black focus:rounded-lg focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {/* ── Fixed 3D Living World Canvas (Roots, Spore Particles, Camera) ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <WorldScene
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
        />
      </div>

      {/* ── Sticky Living World Navigation ── */}
      <Navbar />

      {/* ── Continuous Living World Editorial Flow ── */}
      <main id="main-content" className="relative z-10">

        {/* 01 HERO — Large foreground portrait & Living World narrative */}
        <HeroSection />

        {/* Continuous living container with obsidian & warm charcoal depth */}
        <div className="relative">

          {/* Seamless organic gradient transition */}
          <div
            className="h-24 w-full pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #0d0d0d 0%, rgba(13,13,13,0.7) 50%, #0d0d0d 100%)',
            }}
          />

          {/* 02 ABOUT — Cinematic scroll typography & verified identity */}
          <AboutSection />

          {/* 03 WORK — Production systems, metrics, & refined AI showcase */}
          <WorkSection />

          {/* 04 SKILLS — Technical capabilities & spatial typography */}
          <SkillsSection />

          {/* 05 EXPERIENCE — Lysa Solutions industry internship */}
          <ExperienceSection />

          {/* 06 ACHIEVEMENTS — SIH 2025, Idea Matrix, & Project Expos */}
          <AchievementsSection />

          {/* 07 CERTIFICATIONS — Accredited industry credentials */}
          <CertificationsSection />

          {/* 08 AI EXPERIENCE — Interactive Glass AI orb cinematic showcase */}
          <AiExperienceSection />

          {/* 09 CONTACT — Serene closing living clearing & direct channels */}
          <ContactSection />
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default App;
