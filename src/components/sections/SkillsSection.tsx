import React, { useState } from 'react';
import { Cpu, Terminal, Code2, Database, Wrench, Binary, Sparkles } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { ScrollHeading } from '../animations/ScrollTypography';

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-ml':       <Cpu    className="w-4 h-4 text-[#FF9812]" />,
  'programming': <Terminal className="w-4 h-4 text-[#FF9812]" />,
  'web-backend': <Code2   className="w-4 h-4 text-[#FF9812]" />,
  'databases':   <Database className="w-4 h-4 text-[#FF9812]" />,
  'devops-infra':<Wrench  className="w-4 h-4 text-[#FF9812]" />,
  'core-cs':     <Binary  className="w-4 h-4 text-[#FF9812]" />,
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-labelledby="skills-heading"
    >
      {/* ── Section Eyebrow Header ── */}
      <div className="flex items-center gap-4 mb-14">
        <span className="section-badge">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF9812' }} />
          04 — TECHNICAL COMPETENCIES
        </span>
        <div className="divider-orange flex-1" />
        <span className="hidden sm:inline text-[10px] font-mono-code tracking-[0.25em]" style={{ color: 'rgba(255,152,18,0.45)' }}>
          [ CAPABILITIES MATRIX ]
        </span>
      </div>

      {/* ── Headline with Masked Reveal ── */}
      <div className="mb-12">
        <ScrollHeading
          as="h2"
          id="skills-heading"
          className="font-display leading-[0.90] text-[#FAFAF7]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.2rem)' }}
        >
          SKILLS &amp;
          <span className="text-[#FF9812] block">TECHNOLOGIES.</span>
        </ScrollHeading>
      </div>

      {/* ── Continuous Tech Marquee Strip ── */}
      <div className="mb-14 overflow-hidden relative">
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0D0D0D, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0D0D0D, transparent)' }}
        />

        <div className="flex animate-marquee gap-4 whitespace-nowrap w-max">
          {[
            ...skillCategories.flatMap((c) => c.skills.map((s) => s.name)),
            ...skillCategories.flatMap((c) => c.skills.map((s) => s.name)),
          ].map((name, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-xs font-mono-code tracking-wider shrink-0 transition-colors"
              style={{
                background: i % 3 === 0 ? 'rgba(255,152,18,0.12)' : 'rgba(24,28,22,0.60)',
                border: i % 3 === 0 ? '1px solid rgba(255,152,18,0.25)' : '1px solid rgba(255,255,255,0.08)',
                color: i % 3 === 0 ? '#FFB347' : 'rgba(250,250,247,0.55)',
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Category Filter Pills (Sylva Living World Dock Style) ── */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className="px-4 py-2 rounded-full text-xs font-mono-code tracking-widest transition-all duration-300"
          style={
            activeCategory === 'all'
              ? {
                  background: 'linear-gradient(135deg, #FFB347, #FF9812)',
                  color: '#0D0E0C',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(255,152,18,0.35)',
                }
              : {
                  background: 'rgba(24,28,22,0.65)',
                  border: '1px solid rgba(255,152,18,0.18)',
                  color: 'rgba(250,250,247,0.55)',
                }
          }
        >
          ALL COMPETENCIES
        </button>

        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-code tracking-widest transition-all duration-300"
            style={
              activeCategory === cat.id
                ? {
                    background: 'linear-gradient(135deg, #FFB347, #FF9812)',
                    color: '#0D0E0C',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(255,152,18,0.35)',
                  }
                : {
                    background: 'rgba(24,28,22,0.65)',
                    border: '1px solid rgba(255,152,18,0.18)',
                    color: 'rgba(250,250,247,0.55)',
                  }
            }
          >
            {categoryIcons[cat.id]}
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* ── Skills Grid with Frosted Glass Panels ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg, rgba(24,28,22,0.75) 0%, rgba(16,18,14,0.85) 100%)',
              border: '1px solid rgba(255,152,18,0.15)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(16px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.38)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.15)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-[#FF9812]/15 border border-[#FF9812]/25">
                  {categoryIcons[cat.id]}
                </div>
                <h3 className="font-display text-lg text-white tracking-wider">
                  {cat.title}
                </h3>
              </div>
              <p className="text-xs text-white/50 mb-5 font-sans leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code transition-all"
                  style={
                    skill.highlight
                      ? {
                          background: 'rgba(255,152,18,0.16)',
                          border: '1px solid rgba(255,152,18,0.35)',
                          color: '#FFB347',
                          fontWeight: 600,
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(250,250,247,0.65)',
                        }
                  }
                >
                  {skill.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#FF9812]" />}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
