import React, { useState } from 'react';
import { Cpu, Terminal, Code2, Database, Wrench, Binary } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { RevealOnScroll } from '../animations/RevealOnScroll';

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-ml':       <Cpu    className="w-4 h-4" />,
  'programming': <Terminal className="w-4 h-4" />,
  'web-backend': <Code2   className="w-4 h-4" />,
  'databases':   <Database className="w-4 h-4" />,
  'devops-infra':<Wrench  className="w-4 h-4" />,
  'core-cs':     <Binary  className="w-4 h-4" />,
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
      {/* Section label */}
      <RevealOnScroll delay={0}>
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge">05 — TECHNICAL COMPETENCIES</span>
          <div className="divider-orange flex-1" />
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <h2
          id="skills-heading"
          className="font-display mb-12"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: '#FAFAF7', lineHeight: 0.9 }}
        >
          SKILLS &amp;<br />
          <span style={{ color: '#FF9812' }}>TECHNOLOGIES.</span>
        </h2>
      </RevealOnScroll>

      {/* Scrolling tech marquee */}
      <RevealOnScroll delay={0.1}>
        <div className="mb-14 overflow-hidden relative">
          {/* fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to right, #0D0D0D, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to left, #0D0D0D, transparent)' }} />

          <div className="flex animate-marquee gap-6 whitespace-nowrap w-max">
            {[...skillCategories.flatMap(c => c.skills.map(s => s.name)), ...skillCategories.flatMap(c => c.skills.map(s => s.name))].map((name, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-mono-code shrink-0"
                style={{
                  background: i % 3 === 0 ? 'rgba(255,152,18,0.12)' : 'rgba(255,255,255,0.04)',
                  border: i % 3 === 0 ? '1px solid rgba(255,152,18,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  color:  i % 3 === 0 ? '#FF9812' : 'rgba(250,250,247,0.45)',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Category filter pills */}
      <RevealOnScroll delay={0.12}>
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-mono-code tracking-widest transition-all duration-300 ${
              activeCategory === 'all' ? 'text-black font-bold' : ''
            }`}
            style={activeCategory === 'all' ? {
              background: 'linear-gradient(135deg, #FFB347, #FF9812)',
              boxShadow: '0 4px 16px rgba(255,152,18,0.35)',
            } : {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,152,18,0.15)',
              color: 'rgba(250,250,247,0.50)',
            }}
          >
            ALL
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono-code tracking-widest transition-all duration-300 ${
                activeCategory === cat.id ? 'text-black font-bold' : ''
              }`}
              style={activeCategory === cat.id ? {
                background: 'linear-gradient(135deg, #FFB347, #FF9812)',
                boxShadow: '0 4px 16px rgba(255,152,18,0.35)',
              } : {
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,152,18,0.15)',
                color: 'rgba(250,250,247,0.50)',
              }}
            >
              <span style={{ color: activeCategory === cat.id ? '#111' : '#FF9812' }}>
                {categoryIcons[cat.id]}
              </span>
              {cat.title.split(' ')[0].toUpperCase()}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((category, idx) => (
          <RevealOnScroll key={category.id} delay={0.05 + idx * 0.04}>
            <div
              className="h-full p-6 rounded-2xl flex flex-col transition-all duration-400 group"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,152,18,0.10)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.30)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(255,152,18,0.07)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,152,18,0.10)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2 rounded-xl"
                  style={{ background: 'rgba(255,152,18,0.12)', color: '#FF9812' }}
                >
                  {categoryIcons[category.id]}
                </div>
                <h3 className="text-sm font-bold tracking-tight" style={{ color: '#FAFAF7' }}>
                  {category.title}
                </h3>
              </div>

              <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(250,250,247,0.35)' }}>
                {category.description}
              </p>

              {/* Divider */}
              <div className="divider-orange mb-5" />

              {/* Skill items */}
              <div className="space-y-2 flex-1">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(255,152,18,0.04)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.09)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,152,18,0.04)';
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1 h-3 rounded-full"
                        style={{ background: skill.highlight ? '#FF9812' : 'rgba(255,152,18,0.30)' }}
                      />
                      <span className="text-xs font-medium" style={{ color: skill.highlight ? '#FAFAF7' : 'rgba(250,250,247,0.55)' }}>
                        {skill.name}
                      </span>
                    </div>
                    {skill.tag && (
                      <span
                        className="text-[9px] font-mono-code px-2 py-0.5 rounded"
                        style={{ background: 'rgba(255,152,18,0.10)', color: '#FF9812' }}
                      >
                        {skill.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};
