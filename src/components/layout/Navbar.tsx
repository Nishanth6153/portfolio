import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const navItems = [
  { id: 'about',       label: 'ABOUT' },
  { id: 'work',        label: 'WORK' },
  { id: 'skills',      label: 'SKILLS' },
  { id: 'experience',  label: 'EXPERIENCE' },
  { id: 'contact',     label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy([
    'hero', 'about', 'work', 'skills', 'experience',
    'ai', 'certifications', 'contact',
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#080908]/85 border-b border-[#FF9812]/15 shadow-xl shadow-black/50 backdrop-blur-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Monogram & Wordmark */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Nishanth Portfolio Home"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-black text-base shadow-md"
            style={{ background: 'linear-gradient(135deg, #FFB347, #FF9812)' }}
          >
            N
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[#FAFAF7] text-lg tracking-widest leading-none">
              NISHANTH
            </span>
            <span className="text-[9px] font-mono-code text-[#FF9812]/75 tracking-[0.2em] hidden sm:inline">
              AI &amp; DATA SCIENCE
            </span>
          </div>
        </a>

        {/* Desktop Sylva Floating Dock Navigation */}
        <nav
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(20,24,18,0.78)',
            border: '1px solid rgba(255,152,18,0.22)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 1px rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
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
                    ? 'text-[#0D0E0C] font-bold shadow-md'
                    : 'text-[#B0A090] hover:text-[#FF9812] hover:bg-white/5'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #FFB347, #FF9812)',
                        boxShadow: '0 2px 14px rgba(255,152,18,0.45)',
                      }
                    : {}
                }
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Résumé CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/assets/Nishanth-G-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display tracking-widest transition-all duration-300 text-[#FF9812] bg-[#FF9812]/10 border border-[#FF9812]/30 hover:bg-[#FF9812]/20 hover:border-[#FF9812]/50 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RÉSUMÉ</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl transition-all duration-200 text-[#FF9812] bg-[#FF9812]/10 border border-[#FF9812]/25"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[64px] border-b px-6 py-6 space-y-3 shadow-2xl"
          style={{
            background: 'rgba(13,14,12,0.96)',
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
                background: activeSection === item.id ? 'rgba(255,152,18,0.12)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10">
            <a
              href="/assets/Nishanth-G-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-display tracking-widest text-sm text-[#FF9812] bg-[#FF9812]/10 border border-[#FF9812]/25"
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
