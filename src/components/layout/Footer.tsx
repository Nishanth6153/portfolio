import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,152,18,0.12)',
      }}
    >
      {/* Orange glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-24 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,152,18,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-black text-base"
              style={{ background: 'linear-gradient(135deg, #FFB347, #FF9812)' }}
            >
              N
            </div>
            <div>
              <p className="text-sm font-display tracking-widest" style={{ color: '#FAFAF7' }}>NISHANTH G</p>
              <p className="text-[10px] font-mono-code" style={{ color: 'rgba(255,152,18,0.55)' }}>
                ARTIFICIAL INTELLIGENCE &amp; DATA SCIENCE
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5 text-[11px] font-mono-code tracking-widest">
            {[
              { icon: <GithubIcon className="w-3.5 h-3.5" />, label: 'GITHUB',   href: 'https://github.com/Nishanth6153' },
              { icon: <LinkedinIcon className="w-3.5 h-3.5" />, label: 'LINKEDIN', href: 'https://linkedin.com/in/nishanth-gopalsamy' },
              { icon: <Mail className="w-3.5 h-3.5" />, label: 'EMAIL',    href: 'mailto:nishant40y6153@gmail.com' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-all duration-200 underline-orange"
                style={{ color: 'rgba(250,250,247,0.40)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FF9812'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,250,247,0.40)'; }}
              >
                <span style={{ color: '#FF9812' }}>{icon}</span>
                {label}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono-code" style={{ color: 'rgba(250,250,247,0.30)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
              SYSTEM ACTIVE
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-mono-code tracking-widest transition-all duration-300"
              style={{
                background: 'rgba(255,152,18,0.10)',
                border: '1px solid rgba(255,152,18,0.25)',
                color: '#FF9812',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.20)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,152,18,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.10)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono-code"
          style={{
            borderTop: '1px solid rgba(255,152,18,0.08)',
            color: 'rgba(250,250,247,0.25)',
          }}
        >
          <p>© {new Date().getFullYear()} NISHANTH G. ALL RIGHTS RESERVED.</p>
          <p>
            BUILT WITH{' '}
            <span style={{ color: '#FF9812' }}>REACT</span> +{' '}
            <span style={{ color: '#FF9812' }}>THREE.JS</span> +{' '}
            <span style={{ color: '#FF9812' }}>TYPESCRIPT</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
