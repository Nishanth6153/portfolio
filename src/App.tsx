import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Camera } from 'three';
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
import { SakuraLoader }         from './components/SakuraLoader';
import { CustomCursor }         from './components/ui/CustomCursor';

import { MagneticInteractions } from './components/ui/MagneticInteractions';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [cameraFov, setCameraFov] = useState(() => window.innerWidth < 768 ? 54 : 46);
  // Shared refs for 3D scene reactivity
  const scrollProgress = useRef<number>(0);
  const cameraRef = useRef<Camera | null>(null);
  const mouseRef       = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lenisRef       = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('entry-locked', !hasEntered);
    return () => document.documentElement.classList.remove('entry-locked');
  }, [hasEntered]);

  // ── Lenis Smooth Scroll + GSAP ScrollTrigger Master Synchronization ────────
  useEffect(() => {
    if (!hasEntered) return;
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
  }, [hasEntered]);

  // ── GSAP drives the shared scene ref; the canvas consumes it without React renders ──
  useEffect(() => {
    if (!hasEntered) return;
    const cameraTravel = { value: 0 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      scrollProgress.current = 0;
      cameraRef.current?.position.set(0, 0, 5.5);
      cameraRef.current?.lookAt(0, 0, 0);
      return;
    }
    const travelTween = gsap.to(cameraTravel, {
      value: 1,
      ease: 'none',
      onUpdate: () => {
        const progress = cameraTravel.value;
        scrollProgress.current = progress;
        const camera = cameraRef.current;
        if (!camera) return;
        camera.position.set(Math.sin(progress * Math.PI) * 0.42, -progress * 6.4, 5.5 - progress * 10.5);
        camera.lookAt(0, -progress * 5.8, 0);
        camera.rotation.x = progress * 0.025;
      },
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: () => ScrollTrigger.maxScroll(window),
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
    ScrollTrigger.refresh();
    return () => {
      travelTween.scrollTrigger?.kill();
      travelTween.kill();
      scrollProgress.current = 0;
    };
  }, [hasEntered]);

  useLayoutEffect(() => {
    if (!hasEntered) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline.fromTo('[data-entry-title]',
        { yPercent: reducedMotion ? 0 : 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: reducedMotion ? 0.35 : 1.05, clearProps: 'transform', immediateRender: true },
      );
      timeline.fromTo('[data-entry-portrait]',
        { opacity: 0, scale: reducedMotion ? 1 : 0.96 },
        { opacity: 1, scale: 1, duration: reducedMotion ? 0.4 : 1.25, stagger: 0.12, clearProps: 'transform', immediateRender: true },
        '-=0.68',
      );
      timeline.fromTo('[data-entry-copy]',
        { opacity: 0, y: reducedMotion ? 0 : 16 },
        { opacity: 1, y: 0, duration: reducedMotion ? 0.35 : 0.75, clearProps: 'transform' },
        '-=0.78',
      );
    }, hero);
    return () => context.revert();
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((element) => {
        const speed = Number(element.dataset.speed);
        gsap.fromTo(element, { y: 0 }, {
          y: () => (1 - speed) * Math.min(window.innerHeight * 0.045, 32),
          ease: 'none',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, document.documentElement);
    ScrollTrigger.refresh();
    return () => context.revert();
  }, [hasEntered]);
  useEffect(() => {
    let resizeTimer: number | undefined;
    const updateFov = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const next = window.innerWidth < 768 ? 54 : 46;
        setCameraFov((current) => current === next ? current : next);
      }, 160);
    };
    window.addEventListener('resize', updateFov, { passive: true });
    window.visualViewport?.addEventListener('resize', updateFov, { passive: true });
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', updateFov);
      window.visualViewport?.removeEventListener('resize', updateFov);
    };
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
    <>
      {hasEntered && <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <WorldScene
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
          cameraRef={cameraRef}
          cameraFov={cameraFov}
        />
      </div>}
      {!hasEntered && <SakuraLoader setHasEntered={setHasEntered} />}
      {hasEntered && <div
        className="relative min-h-screen overflow-x-hidden selection:bg-[rgba(255,152,18,0.30)] selection:text-white"
        style={{ background: '#0D0D0D' }}
      >
      <CustomCursor />
      <MagneticInteractions />
      {/* ── Accessibility Skip Link ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF9812] focus:text-black focus:rounded-lg focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      {/* ── Sticky Living World Navigation ── */}
      <Navbar />

      {/* ── Continuous Living World Editorial Flow ── */}
      <main id="main-content" className="relative z-10 pointer-events-auto">

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
      </div>}
    </>
  );
};

export default App;
