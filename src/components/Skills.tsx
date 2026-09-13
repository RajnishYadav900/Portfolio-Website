import React, { useState } from 'react';
import {
  Code,
  Layers,
  Terminal,
  Database,
  Wrench,
  Sparkles,
  CheckCircle,
  Cpu,
  Boxes,
  Zap,
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types';

type CategoryFilter = 'All' | 'Frontend' | 'Backend' | 'Programming' | 'AI & Data' | 'Tools';

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code className="w-4 h-4 text-cyan-500" />,
  Backend: <Layers className="w-4 h-4 text-emerald-500" />,
  Programming: <Terminal className="w-4 h-4 text-blue-500" />,
  'AI & Data': <Database className="w-4 h-4 text-[#FF4B1F]" />,
  Tools: <Wrench className="w-4 h-4 text-purple-500" />,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = ['All', 'Frontend', 'Backend', 'Programming', 'AI & Data', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 bg-zinc-50/70 border-y border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
              <span>Capabilities & Toolkit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
              Technical <span className="text-[#FF4B1F]">Proficiency.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
              A curated overview of modern frameworks, programming languages, backend systems, and data engineering concepts I leverage daily.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap bg-white p-1.5 rounded-2xl border border-zinc-200 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className={`group relative p-5 rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                skill.highlight
                  ? 'border-zinc-300 shadow-xs hover:border-[#FF4B1F]/60 hover:shadow-orange-500/10'
                  : 'border-zinc-200/80 shadow-2xs hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white text-zinc-800 flex items-center justify-center transition-colors duration-300 border border-zinc-200/80 group-hover:border-zinc-950">
                  {categoryIcons[skill.category] || <Boxes className="w-4 h-4 text-[#FF4B1F]" />}
                </div>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    skill.level === 'Advanced'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : skill.level === 'Proficient'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  }`}
                >
                  {skill.level}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-950 group-hover:text-[#FF4B1F] transition-colors">
                {skill.name}
              </h3>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
                <span>{skill.category}</span>
                {skill.highlight && (
                  <span className="flex items-center gap-1 text-[#FF4B1F] font-semibold">
                    <Zap className="w-3 h-3 fill-current" />
                    Key Skill
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF4B1F] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-zinc-950">
                Always Expanding My Technical Horizon
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                Currently diving deeper into scalable data pipelines, predictive models, and cloud architectures.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold transition-colors duration-200"
          >
            See Skills In Action
          </a>
        </div>

      </div>
    </section>
  );
};
