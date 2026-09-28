import React from 'react';
import { Trophy, Flag, Award, Sparkles } from 'lucide-react';
import { achievements } from '../../data/achievements';
import { ScrollHeading } from '../animations/ScrollTypography';

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="achievements-heading"
    >
      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-14">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          06 — HONORS &amp; MILESTONES
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
          [ RECOGNITION ]
        </span>
      </div>

      {/* ── Headline with Masked Reveal ── */}
      <div className="mb-16">
        <ScrollHeading
          as="h2"
          id="achievements-heading"
          className="font-display leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)' }}
        >
          HONORS &amp;
          <span className="text-[#FF9812] block">ACHIEVEMENTS.</span>
        </ScrollHeading>
      </div>

      {/* ── Achievements Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item) => {
          const isHighlight = item.highlight;
          return (
            <div
              key={item.id}
              className="p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 group"
              style={{
                background: isHighlight
                  ? 'linear-gradient(135deg, rgba(35,38,28,0.85) 0%, rgba(20,22,16,0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(24,28,22,0.80) 0%, rgba(16,18,14,0.90) 100%)',
                border: isHighlight
                  ? '1px solid rgba(255,152,18,0.35)'
                  : '1px solid rgba(255,152,18,0.15)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.50)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 20px 45px rgba(0,0,0,0.5), 0 0 35px rgba(255,152,18,0.12)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = isHighlight
                  ? 'rgba(255,152,18,0.35)'
                  : 'rgba(255,152,18,0.15)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div>
                {/* Header Icon + Year + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      background: isHighlight ? 'rgba(255,152,18,0.20)' : 'rgba(255,152,18,0.10)',
                      border: '1px solid rgba(255,152,18,0.25)',
                    }}
                  >
                    {item.badge === '1ST PLACE' ? (
                      <Trophy className="w-5 h-5 text-[#FFD700]" />
                    ) : item.badge === 'NATIONAL LEVEL' ? (
                      <Flag className="w-5 h-5 text-[#FF9812]" />
                    ) : (
                      <Award className="w-5 h-5 text-[#FF9812]" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-code text-white/40">{item.year}</span>
                    {item.badge && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-mono-code font-bold"
                        style={{
                          background: isHighlight ? 'rgba(255,152,18,0.25)' : 'rgba(255,152,18,0.12)',
                          border: '1px solid rgba(255,152,18,0.35)',
                          color: '#FFB347',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-mono-code tracking-widest text-[#FF9812]/80 block">
                    {item.position}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-white/50">{item.organization}</p>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs leading-relaxed text-white/60 font-sans">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
