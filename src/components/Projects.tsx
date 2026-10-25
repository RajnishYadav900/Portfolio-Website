import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Code2,
  Database,
  Sun,
  ShoppingCart,
  Info,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import solarPanelImg from '../assets/images/solar-panel-tracking.jpeg';
import portfolioImg from '../assets/images/portfolio.jpeg';
import ecommerceVideo from '../assets/images/E-commerce.mp4';

const MOBILE_TECH_LIMIT = 3;

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'Frontend', 'Full-Stack', 'IoT & Hardware', 'AI & Data'];

  const filteredProjects =
    selectedFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  const renderProjectVisual = (project: Project) => {
    switch (project.id) {
      case 'portfolio-website':
        return (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img
              src={portfolioImg}
              alt="Personal Portfolio Website screenshot"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute top-0 right-0 p-2.5 sm:p-4">
              <span className="hidden sm:inline text-[10px] font-mono text-zinc-200 bg-black/60 px-2 py-0.5 rounded border border-white/20">
                rajnish-portfolio.dev
              </span>
            </div>
            <div className="hidden sm:flex absolute bottom-0 left-0 right-0 items-center justify-between text-[11px] text-zinc-200 p-4">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#FF4B1F]" /> Interactive UI
              </span>
              <span className="text-emerald-400">● 100% Performance</span>
            </div>
          </div>
        );

      case 'react-ecommerce':
        return (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <video
              src={ecommerceVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-2.5 sm:p-4 pointer-events-none">
              <span className="text-[10px] text-white bg-black/60 px-2 py-0.5 rounded border border-white/20">
                Live Demo Clip
              </span>
            </div>
            <div className="hidden sm:flex absolute bottom-0 left-0 right-0 items-center justify-between text-[11px] text-zinc-200 p-4 pointer-events-none">
              <span className="flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5 text-[#FF4B1F]" /> NovaStore
              </span>
              <span className="text-[#FF4B1F]">Instant Checkout</span>
            </div>
          </div>
        );

      case 'solar-panel-tracking':
        return (
          <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img
              src={solarPanelImg}
              alt="Solar Panel Tracking with Smart Street Light prototype"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-0 right-0 p-2.5 sm:p-4">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                Prototype Built
              </span>
            </div>
            <div className="hidden sm:flex absolute bottom-0 left-0 right-0 items-center justify-between text-[11px] text-zinc-200 p-4">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> IoT Solar Dual-Axis
              </span>
              <span className="text-amber-300">Sustainable Tech</span>
            </div>
          </div>
        );

      case 'ai-data-explorer':
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-3 sm:p-4 flex flex-col justify-between text-white relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#FF4B1F]" />
                <span className="text-xs font-bold">AI Data Explorer</span>
              </div>
              <span className="text-[10px] font-mono text-[#FF4B1F] bg-orange-950/50 px-2 py-0.5 rounded border border-orange-900">
                Python
              </span>
            </div>
            <div className="my-auto px-1">
              <div className="flex items-end gap-2 h-12 sm:h-16 w-full">
                <div className="flex-1 bg-[#FF4B1F]/30 rounded-t h-[40%]" />
                <div className="flex-1 bg-[#FF4B1F]/50 rounded-t h-[65%]" />
                <div className="flex-1 bg-[#FF4B1F]/80 rounded-t h-[90%]" />
                <div className="flex-1 bg-[#FF4B1F] rounded-t h-[75%]" />
                <div className="flex-1 bg-[#FF4B1F]/60 rounded-t h-[50%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-2">
                <span>Predictive Trend Score</span>
                <span className="text-emerald-400 font-mono">r = 0.89</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Data Pipelines</span>
              <span className="text-cyan-400">Pandas & ML</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-10 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
              <span>Featured Work</span>
            </div>
            <h2 className="text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
              Selected <span className="text-[#FF4B1F]">Projects.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
              Web platforms, engineering prototypes and data systems I've built.
            </p>
          </div>

          {/* Filters: mobile pe ek line me swipe */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible sm:bg-zinc-100 sm:p-1.5 sm:rounded-2xl sm:border sm:border-zinc-200/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFilter(cat)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border sm:border-0 ${
                    selectedFilter === cat
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white sm:bg-transparent text-zinc-600 border-zinc-200 hover:text-zinc-950 sm:hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {filteredProjects.map((project) => {
            const extraTech = project.technologies.length - MOBILE_TECH_LIMIT;

            return (
              <div
                key={project.id}
                className="group rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-2xl hover:border-zinc-300 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Visual */}
                <div
                  className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden border-b border-zinc-100 bg-zinc-900 cursor-pointer"
                  onClick={() => setActiveProjectModal(project)}
                >
                  {renderProjectVisual(project)}

                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      {project.category}
                    </span>
                  </div>

                  <div className="hidden sm:flex absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none z-20">
                    <span className="px-4 py-2 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#FF4B1F]" />
                      Click to View Full Specs
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveProjectModal(project)}
                      className="text-lg sm:text-2xl font-black text-zinc-950 tracking-tight group-hover:text-[#FF4B1F] transition-colors cursor-pointer mb-1.5 sm:mb-2"
                    >
                      {project.title}
                    </h3>

                    <p className="text-[13px] sm:text-sm text-zinc-600 leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={tech}
                          className={`${
                            i >= MOBILE_TECH_LIMIT ? 'hidden sm:inline-flex' : 'inline-flex'
                          } px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-[11px] sm:text-xs font-medium border border-zinc-200/60`}
                        >
                          {tech}
                        </span>
                      ))}
                      {extraTech > 0 && (
                        <span className="sm:hidden inline-flex px-2.5 py-1 rounded-lg bg-zinc-50 text-zinc-500 text-[11px] font-semibold border border-zinc-200/60">
                          +{extraTech}
                        </span>
                      )}
                    </div>
                  </div>

                
                  <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-zinc-100">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 text-zinc-800 hover:text-white text-xs sm:text-sm font-semibold transition-colors duration-200 border border-zinc-200 hover:border-zinc-950"
                    >
                      <Github className="w-4 h-4 shrink-0" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold transition-colors duration-200 group/btn"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4 shrink-0 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(project)}
                      className="p-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-400 transition-colors shrink-0"
                      aria-label="View project details"
                      title="Project details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};