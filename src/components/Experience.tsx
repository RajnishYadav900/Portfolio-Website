import React, { useState } from 'react';
import {
  GraduationCap,
  Code,
  BookOpen,
  Award,
  Briefcase,
  MapPin,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { TIMELINE_DATA } from '../data/portfolioData';

const typeStyles: Record<
  string,
  { icon: React.ReactNode; badgeClass: string; dotClass: string }
> = {
  Education: {
    icon: <GraduationCap className="w-3 h-3 text-cyan-600" />,
    badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
    dotClass: 'bg-cyan-500',
  },
  Projects: {
    icon: <Code className="w-3 h-3 text-[#FF4B1F]" />,
    badgeClass: 'bg-orange-50 text-[#FF4B1F] border-orange-200/80',
    dotClass: 'bg-[#FF4B1F]',
  },
  Learning: {
    icon: <BookOpen className="w-3 h-3 text-emerald-600" />,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    dotClass: 'bg-emerald-500',
  },
  Achievement: {
    icon: <Award className="w-3 h-3 text-amber-600" />,
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    dotClass: 'bg-amber-500',
  },
  Experience: {
    icon: <Briefcase className="w-3 h-3 text-purple-600" />,
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
    dotClass: 'bg-purple-500',
  },
};

const FALLBACK_STYLE = {
  icon: <Briefcase className="w-3 h-3 text-zinc-600" />,
  badgeClass: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  dotClass: 'bg-zinc-400',
};

const VISIBLE_BULLETS = 2;
const VISIBLE_TECH = 4;

const HIDDEN_TITLE_KEYWORDS = ['scholarship', 'specialization'];

const TIMELINE_ITEMS = TIMELINE_DATA.filter((item) => {
  const title = String(item.title || '').toLowerCase();
  return !HIDDEN_TITLE_KEYWORDS.some((keyword) => title.includes(keyword));
});

export const Experience: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section
      id="experience"
      className="py-10 sm:py-20 bg-zinc-50/70 border-y border-zinc-200/60 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>Milestones</span>
          </div>
          <h2 className="text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            Journey & <span className="text-[#FF4B1F]">Experience.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl">
            Education, projects and growth at a glance.
          </p>
        </div>

        {/* Compact vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-zinc-200"
            aria-hidden="true"
          />

          <ul className="space-y-3 sm:space-y-4">
            {TIMELINE_ITEMS.map((item) => {
              const style = typeStyles[item.type] || FALLBACK_STYLE;
              const id = String(item.id);
              const isOpen = !!openIds[id];

              const bullets: string[] = item.description || [];
              const techs: string[] = item.technologies || [];

              const hasMoreBullets = bullets.length > VISIBLE_BULLETS;
              const hasMoreTech = techs.length > VISIBLE_TECH;
              const canExpand = hasMoreBullets || hasMoreTech;

              const shownBullets = isOpen ? bullets : bullets.slice(0, VISIBLE_BULLETS);
              const shownTech = isOpen ? techs : techs.slice(0, VISIBLE_TECH);

              return (
                <li key={id} className="relative pl-6 sm:pl-8">
                  {/* Timeline dot */}
                  <span
                    className={`absolute left-0 top-4 sm:top-5 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-[3px] border-zinc-50 ring-1 ring-zinc-200 ${style.dotClass}`}
                    aria-hidden="true"
                  />

                  <div className="group p-3.5 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-md transition-all duration-200">
                    {/* Top row: type + period */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border ${style.badgeClass}`}
                      >
                        {style.icon}
                        <span>{item.type}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-zinc-500 shrink-0">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[15px] sm:text-lg font-bold text-zinc-950 tracking-tight leading-snug group-hover:text-[#FF4B1F] transition-colors break-words">
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="text-[11px] sm:text-sm font-medium text-zinc-500 mt-0.5 break-words">
                        {item.subtitle}
                      </p>
                    )}

                    {/* Organization + location */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-sm text-zinc-600 mt-1.5">
                      <span className="font-semibold text-zinc-800">{item.organization}</span>
                      {item.location && (
                        <>
                          <span className="text-zinc-300">•</span>
                          <span className="inline-flex items-center gap-1 text-zinc-500">
                            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span>{item.location}</span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Short bullets */}
                    {shownBullets.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5">
                        {shownBullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 leading-relaxed"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#FF4B1F] shrink-0 mt-[7px]" />
                            <span className={isOpen ? '' : 'line-clamp-2'}>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech pills */}
                    {shownTech.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-wrap gap-1.5">
                        {shownTech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-700 text-[10px] sm:text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {!isOpen && hasMoreTech && (
                          <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 text-[10px] sm:text-xs font-semibold">
                            +{techs.length - VISIBLE_TECH}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expand toggle */}
                    {canExpand && (
                      <button
                        type="button"
                        onClick={() => toggle(id)}
                        aria-expanded={isOpen}
                        className="mt-2.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#FF4B1F] hover:text-[#e03a10]"
                      >
                        <span>{isOpen ? 'Show less' : 'Show more'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};