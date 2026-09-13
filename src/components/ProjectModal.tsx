import React from 'react';
import { X, Github, ExternalLink, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-md bg-orange-50 border border-orange-200 text-[#FF4B1F] text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          {project.badge && (
            <span className="px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold">
              {project.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-zinc-500 mb-6">
          Role: <span className="text-zinc-800">{project.role}</span>
        </p>

        {/* Long Description */}
        <div className="space-y-4 text-zinc-700 text-sm sm:text-base leading-relaxed mb-6">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Key Features */}
        <div className="mb-6 bg-zinc-50 p-5 rounded-2xl border border-zinc-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Key Architecture & Features
          </h4>
          <div className="space-y-2.5">
            {project.features.map((feat) => (
              <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Badges */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-100">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 hover:bg-black text-white text-sm font-semibold transition-colors shadow-xs"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF4B1F] hover:bg-[#e03a10] text-white text-sm font-semibold transition-colors shadow-md shadow-orange-500/20"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Live Preview</span>
          </a>
        </div>
      </div>
    </div>
  );
};
