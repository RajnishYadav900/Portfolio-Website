import React from 'react';
import {
  GraduationCap,
  Code,
  BookOpen,
  Award,
  Briefcase,
  MapPin,
  Calendar,
} from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

const typeStyles: Record<string, { icon: React.ReactNode; badgeClass: string }> = {
  Education: {
    icon: <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />,
    badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
  },
  Projects: {
    icon: <Code className="w-3.5 h-3.5 text-[#FF4B1F]" />,
    badgeClass: 'bg-orange-50 text-[#FF4B1F] border-orange-200/80',
  },
  Learning: {
    icon: <BookOpen className="w-3.5 h-3.5 text-emerald-600" />,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  },
  Achievement: {
    icon: <Award className="w-3.5 h-3.5 text-amber-600" />,
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
  },
  Experience: {
    icon: <Briefcase className="w-3.5 h-3.5 text-purple-600" />,
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
  },
};

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-zinc-50/70 border-y border-zinc-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>Milestones & Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            Journey & <span className="text-[#FF4B1F]">Experience.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl leading-relaxed">
            Key milestones capturing my academic grounding, hands-on project builds, and self-driven engineering mastery.
          </p>
        </div>

        {/* Clean Stacked Cards Layout */}
        <div className="max-w-3xl mx-auto w-full space-y-6 sm:space-y-7">
          {TIMELINE_DATA.map((item) => {
            const style = typeStyles[item.type] || {
              icon: <Briefcase className="w-3.5 h-3.5 text-zinc-600" />,
              badgeClass: 'bg-zinc-100 text-zinc-800 border-zinc-200',
            };

            return (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/90 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 group"
              >
                {/* Top Bar: Category and Date/Year label */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style.badgeClass}`}>
                    {style.icon}
                    <span>{item.type}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight group-hover:text-[#FF4B1F] transition-colors">
                  {item.title}
                </h3>
                
                {item.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-zinc-500 mt-1">
                    {item.subtitle}
                  </p>
                )}

                {/* Organization & Location */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-zinc-600 mt-2 mb-4">
                  <span className="font-semibold text-zinc-800">{item.organization}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="inline-flex items-center gap-1 text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{item.location}</span>
                  </span>
                </div>

                {/* Bullet Description */}
                <ul className="space-y-2 mb-5">
                  {item.description.map((bullet, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-600 leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B1F] shrink-0 mt-2" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology / Skill Pills */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-1.5 sm:gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-200/80 text-zinc-700 text-[11px] sm:text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
