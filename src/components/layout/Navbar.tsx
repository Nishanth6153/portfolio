import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const navItems = [
  { id: 'about',       label: 'ABOUT' },
  { id: 'work',        label: 'WORK' },
  { id: 'experience',  label: 'EXPERIENCE' },
  { id: 'skills',      label: 'SKILLS' },
  { id: 'contact',     label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy([
    'hero', 'about', 'work', 'experience', 'skills',
    'achievements', 'certifications', 'contact',
  ]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 glass-dark border-b border-orange/20 shadow-lg shadow-black/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand — NG monogram + wordmark */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Nishanth Portfolio Home"
        >
          {/* Orange square logo mark */}
          <div className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #FF9812, #E8820A)' }}>
            <span className="font-display text-black text-base font-bold leading-none">N</span>
            {/* subtle shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-warm-white text-lg tracking-widest leading-none">
              NISHANTH
            </span>
            <span className="text-[9px] font-mono-code text-[#FF9812]/70 tracking-[0.2em] hidden sm:inline">
              AI &amp; DATA SCIENCE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
          style={{
            background: 'rgba(13,13,13,0.75)',
            border: '1px solid rgba(255,152,18,0.18)',
            backdropFilter: 'blur(16px)',
          }}
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 text-[11px] font-display tracking-widest rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-black font-bold'
                    : 'text-[#B0A090] hover:text-[#FF9812]'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #FFB347, #FF9812)',
                  boxShadow: '0 2px 12px rgba(255,152,18,0.40)',
                } : {}}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Resume CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/assets/Nishanth-G-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-display tracking-widest transition-all duration-300 group"
            style={{
              background: 'rgba(255,152,18,0.10)',
              border: '1px solid rgba(255,152,18,0.30)',
              color: '#FF9812',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.20)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.10)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.30)';
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RÉSUMÉ</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl transition-all duration-200"
          style={{
            background: 'rgba(255,152,18,0.12)',
            border: '1px solid rgba(255,152,18,0.30)',
            color: '#FF9812',
          }}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[60px] border-b px-6 py-6 space-y-3"
          style={{
            background: 'rgba(13,13,13,0.96)',
            backdropFilter: 'blur(24px)',
            borderColor: 'rgba(255,152,18,0.20)',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-display tracking-widest transition-all"
              style={{
                color: activeSection === item.id ? '#FF9812' : '#B0A090',
                background: activeSection === item.id ? 'rgba(255,152,18,0.10)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,152,18,0.15)' }}>
            <a
              href="/assets/Nishanth-G-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-display tracking-widest text-sm"
              style={{
                background: 'rgba(255,152,18,0.10)',
                border: '1px solid rgba(255,152,18,0.25)',
                color: '#FF9812',
              }}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                DOWNLOAD RÉSUMÉ
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
