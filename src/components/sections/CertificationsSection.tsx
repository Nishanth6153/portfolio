import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { RevealOnScroll } from '../animations/RevealOnScroll';

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="certifications-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">07 — PROFESSIONAL VALIDATION</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <h2
          id="certifications-heading"
          className="font-display mb-16"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7', lineHeight: 0.9 }}
        >
          CERTIFICATIONS.
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => (
          <RevealOnScroll key={cert.id} delay={0.05 + idx * 0.04}>
            <div
              className="h-full p-6 rounded-2xl flex flex-col justify-between transition-all duration-400"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,152,18,0.10)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.30)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255,152,18,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.10)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Issuer + year */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: 'rgba(255,152,18,0.10)',
                        border: '1px solid rgba(255,152,18,0.20)',
                      }}
                    >
                      <ShieldCheck className="w-4 h-4" style={{ color: '#FF9812' }} />
                    </div>
                    <span className="text-[10px] font-mono-code font-bold tracking-widest" style={{ color: '#FF9812' }}>
                      {cert.issuer}
                    </span>
                  </div>
                  {cert.year && (
                    <span className="text-[10px] font-mono-code" style={{ color: 'rgba(250,250,247,0.30)' }}>
                      {cert.year}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold tracking-tight mb-4" style={{ color: '#FAFAF7' }}>
                  {cert.title}
                </h3>
              </div>

              {/* Skills */}
              <div
                className="pt-4"
                style={{ borderTop: '1px solid rgba(255,152,18,0.08)' }}
              >
                <p className="text-[9px] font-mono-code tracking-widest mb-3" style={{ color: 'rgba(255,152,18,0.50)' }}>
                  VALIDATED COMPETENCIES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono-code px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(255,152,18,0.08)',
                        border: '1px solid rgba(255,152,18,0.15)',
                        color: 'rgba(250,250,247,0.55)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};
