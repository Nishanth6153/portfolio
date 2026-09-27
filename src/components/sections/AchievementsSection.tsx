import React from 'react';
import { Trophy, Flag, Award } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { RevealOnScroll } from '../animations/RevealOnScroll';

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="achievements-heading"
    >
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">06 — HONORS &amp; MILESTONES</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <h2
          id="achievements-heading"
          className="font-display mb-16"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7', lineHeight: 0.9 }}
        >
          ACHIEVEMENTS.
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((item, idx) => {
          const isHighlight = item.highlight;
          return (
            <RevealOnScroll key={item.id} delay={0.05 + idx * 0.04}>
              <div
                className="h-full p-6 rounded-2xl flex flex-col justify-between transition-all duration-400 group"
                style={{
                  background: isHighlight ? 'rgba(255,152,18,0.07)' : '#111111',
                  border: isHighlight
                    ? '1px solid rgba(255,152,18,0.30)'
                    : '1px solid rgba(255,152,18,0.10)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.40)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255,152,18,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isHighlight ? 'rgba(255,152,18,0.30)' : 'rgba(255,152,18,0.10)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div>
                  {/* Icon + year + badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{
                        background: isHighlight ? 'rgba(255,152,18,0.15)' : 'rgba(255,152,18,0.07)',
                        border: '1px solid rgba(255,152,18,0.20)',
                      }}
                    >
                      {item.badge === '1ST PLACE' ? (
                        <Trophy className="w-5 h-5" style={{ color: '#FFD700' }} />
                      ) : item.badge === 'NATIONAL LEVEL' ? (
                        <Flag className="w-5 h-5" style={{ color: '#FF9812' }} />
                      ) : (
                        <Award className="w-5 h-5" style={{ color: '#FF9812' }} />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code" style={{ color: 'rgba(250,250,247,0.35)' }}>
                        {item.year}
                      </span>
                      {item.badge && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold"
                          style={{
                            background: isHighlight ? 'rgba(255,152,18,0.20)' : 'rgba(255,152,18,0.10)',
                            border: '1px solid rgba(255,152,18,0.30)',
                            color: '#FF9812',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[9px] font-mono-code tracking-widest block" style={{ color: 'rgba(255,152,18,0.55)' }}>
                      {item.position}
                    </span>
                    <h3 className="text-base font-bold tracking-tight" style={{ color: '#FAFAF7' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium" style={{ color: 'rgba(250,250,247,0.45)' }}>
                      {item.organization}
                    </p>
                  </div>

                  <div className="divider-orange mb-4" />

                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(250,250,247,0.40)' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
};
