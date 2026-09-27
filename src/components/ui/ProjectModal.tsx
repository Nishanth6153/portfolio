import React, { useEffect } from 'react';
import { X, ExternalLink, Layers, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '../../types/portfolio';
import { Badge } from './Badge';
import { ProjectScene } from '../3d/ProjectScene';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 md:p-8 text-zinc-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Project Index and Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-500 font-bold px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
              PROJECT {project.number}
            </span>
            <Badge variant="mono">{project.category}</Badge>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-8">
          <div>
            <h3 id="modal-title" className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-mono text-zinc-400">{project.subtitle}</p>
          </div>

          {/* Interactive Visual / 3D Blueprint */}
          <div className="w-full">
            <ProjectScene sceneId={project.sceneId} />
          </div>

          {/* Core Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              EXECUTIVE OVERVIEW
            </h4>
            <p className="text-zinc-300 leading-relaxed text-base">
              {project.longDescription}
            </p>
          </div>

          {/* Engineering Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                The Challenge
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                Engineered Solution
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Architectural Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-zinc-400" />
              SYSTEM ARCHITECTURE & METHODOLOGY
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.caseStudy.architecture.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-300 leading-relaxed"
                >
                  <Cpu className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables & Outcomes */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              VERIFIED DELIVERABLES & IMPACT
            </h4>
            <ul className="space-y-2">
              {project.caseStudy.outcomes.map((outcome, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              TECHNOLOGY STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="default" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors text-xs font-medium"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub Repository
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors text-xs font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Showcase
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              [Close Window]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
