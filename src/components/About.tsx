import React, { useState, useEffect } from 'react';
import {
  Code,
  MapPin,
  CheckCircle2,
  Brain,
  Terminal,
  Award,
  ChevronDown,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import defaultProfilePhoto from '../assets/images/profile.jpg';

const readIsDark = (): boolean => {
  try {
    const attr = document.documentElement.dataset.theme;
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return localStorage.getItem('rajnish_portfolio_theme') === 'dark';
  } catch {
    return false;
  }
};

export const About: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(readIsDark);

  const [aboutPhoto, setAboutPhoto] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('rajnish_custom_photo');
      if (stored && (stored.startsWith('data:image/') || stored.startsWith('http') || stored.startsWith('/'))) {
        return stored;
      }
    } catch {
      // ignore
    }
    return defaultProfilePhoto;
  });

  useEffect(() => {
    const sync = () => setIsDark(readIsDark());

    sync();
    window.addEventListener('rajnish_theme_updated', sync);

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      window.removeEventListener('rajnish_theme_updated', sync);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handlePhotoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) setAboutPhoto(customEvent.detail);
    };
    window.addEventListener('rajnish_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('rajnish_photo_updated', handlePhotoUpdate);
  }, []);

  // Theme-based classes
  const t = {
    pill: isDark
      ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
      : 'bg-zinc-100 border-zinc-200 text-zinc-800',
    heading: isDark ? 'text-white' : 'text-zinc-950',
    bio: isDark ? 'text-zinc-300' : 'text-zinc-700',
    pillar: isDark
      ? 'bg-white/5 border-zinc-700/80'
      : 'bg-zinc-50 border-zinc-200/80',
    pillarTitle: isDark ? 'text-white' : 'text-zinc-900',
    pillarDesc: isDark ? 'text-zinc-400' : 'text-zinc-600',
    statCard: isDark
      ? 'bg-zinc-900/60 border-zinc-700'
      : 'bg-white border-zinc-200',
    statValue: isDark ? 'text-white' : 'text-zinc-950',
    statLabel: isDark ? 'text-zinc-200' : 'text-zinc-700',
    statDetail: isDark ? 'text-zinc-400' : 'text-zinc-500',
    stripBorder: isDark ? 'border-zinc-700' : 'border-zinc-800',
  };

  const highlights = [
    {
      label: 'Projects',
      value: PERSONAL_INFO.projectsCompleted,
      detail: 'Web & hardware applications',
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4B1F]" />,
    },
    {
      label: 'Tech',
      value: PERSONAL_INFO.techMastered,
      detail: 'React, Node, Python & more',
      icon: <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4B1F]" />,
    },
    {
      label: 'Certificates',
      value: PERSONAL_INFO.certificationsCount,
      detail: 'Academic & technical milestones',
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4B1F]" />,
    },
    {
      label: 'Learning',
      value: 'Daily',
      detail: 'Continuous skill mastery',
      icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4B1F]" />,
    },
  ];

  const focusPillars = [
    {
      title: 'Full-Stack Web Engineering',
      desc: 'Responsive React apps with Node.js backends and clean REST APIs.',
    },
    {
      title: 'AI & Data Foundations',
      desc: 'Python and analytical algorithms for insights and smart automation.',
    },
    {
      title: 'Real-World Problem Solving',
      desc: 'Sustainable projects like solar-tracking streetlights.',
    },
  ];

  return (
    <section id="about" className="py-10 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-start mb-6 sm:mb-10 lg:mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${t.pill}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>About Me</span>
          </div>
          <h2
            className={`text-2xl min-[380px]:text-[1.65rem] leading-tight sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${t.heading}`}
          >
            Building Technology <span className="text-[#FF4B1F]">With Purpose.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center">

          {/* Left: code card (desktop only) */}
          <div className="hidden lg:block lg:col-span-5 min-w-0">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#FF4B1F]/10 rounded-3xl -z-10 transform -rotate-2" />

              <div className="rounded-3xl bg-zinc-950 text-white p-6 xl:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-5 border-b border-zinc-800/80 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={aboutPhoto}
                      alt="Rajnish"
                      className="w-5 h-5 rounded-full object-cover object-top ring-1 ring-white/20"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (e.currentTarget.src !== defaultProfilePhoto) {
                          e.currentTarget.src = defaultProfilePhoto;
                        }
                      }}
                    />
                    <span className="text-[11px] font-mono text-zinc-400">rajnish_profile.json</span>
                  </div>
                </div>

                <div className="font-mono text-xs xl:text-sm text-zinc-300 space-y-3 break-words">
                  <p className="text-zinc-500">// Engineer Snapshot</p>
                  <p>
                    <span className="text-[#FF4B1F]">const</span> developer = &#123;
                  </p>
                  <div className="pl-4 space-y-1.5 border-l border-zinc-800 ml-1">
                    <p>name: <span className="text-emerald-400">"Rajnish Kumar Yadav"</span>,</p>
                    <p>role: <span className="text-emerald-400">"Web & Data Engineer"</span>,</p>
                    <p>location: <span className="text-emerald-400">"Kathmandu, Nepal"</span>,</p>
                    <p>
                      education: <span className="text-amber-300">"BIT (Hons) @ Lincoln | +2 CS @ Dhanusha Science Campus"</span>,
                    </p>
                    <p>
                      focus: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"Python"</span>],
                    </p>
                    <p>corePhilosophy: <span className="text-emerald-400">"Solve real problems"</span>,</p>
                    <p>learningEveryDay: <span className="text-cyan-400">true</span></p>
                  </div>
                  <p>&#125;;</p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 flex items-center justify-center text-[#FF4B1F]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white">Kathmandu, Nepal</p>
                      <p className="text-[11px] text-zinc-400">Available for remote & hybrid roles</p>
                    </div>
                  </div>
                  <span className="flex shrink-0 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="lg:col-span-7 flex flex-col min-w-0">

            {/* Mobile / tablet profile strip */}
            <div className={`lg:hidden flex items-center gap-3 mb-5 p-3 rounded-2xl bg-zinc-950 text-white border ${t.stripBorder}`}>
              <img
                src={aboutPhoto}
                alt="Rajnish"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-top ring-2 ring-[#FF4B1F]/60 shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== defaultProfilePhoto) {
                    e.currentTarget.src = defaultProfilePhoto;
                  }
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base font-bold truncate">Rajnish Kumar Yadav</p>
                <p className="text-[11px] sm:text-xs text-zinc-400 truncate">Web & Data Engineer</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-zinc-400">
                  <MapPin className="w-3 h-3 text-[#FF4B1F] shrink-0" />
                  <span className="truncate">Kathmandu, Nepal</span>
                </p>
              </div>
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-label="Available">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
            </div>

            {/* Bio + Read more (mobile) */}
            <div className="mb-5 sm:mb-6">
              <p
                className={`text-[15px] sm:text-base lg:text-lg leading-relaxed break-words ${t.bio} ${
                  expanded ? '' : 'line-clamp-4'
                } sm:line-clamp-none`}
              >
                {PERSONAL_INFO.detailedBio}
              </p>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="sm:hidden mt-2 inline-flex items-center gap-1 py-1 text-xs font-bold text-[#FF4B1F]"
              >
                <span>{expanded ? 'Show less' : 'Read more'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Pillars */}
            <div className="space-y-2 mb-5 sm:mb-8">
              {focusPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className={`flex items-start gap-3 px-3 py-2.5 sm:p-3.5 rounded-xl border border-l-4 border-l-[#FF4B1F] ${t.pillar}`}
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#FF4B1F] shrink-0" />
                  <div className="min-w-0">
                    <h4 className={`text-[13px] sm:text-sm font-bold leading-snug ${t.pillarTitle}`}>
                      {pillar.title}
                    </h4>
                    <p className={`hidden sm:block text-sm mt-0.5 ${t.pillarDesc}`}>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 mb-5 sm:mb-8">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className={`p-3 sm:p-4 rounded-2xl border hover:border-[#FF4B1F]/50 transition-colors min-w-0 ${t.statCard}`}
                >
                  <div className="mb-1.5 sm:mb-2">{item.icon}</div>
                  <div className={`text-xl sm:text-2xl xl:text-3xl font-black tracking-tight leading-none ${t.statValue}`}>
                    {item.value}
                  </div>
                  <div className={`text-xs font-bold mt-1.5 truncate ${t.statLabel}`}>{item.label}</div>
                  <div className={`text-[11px] mt-1 leading-tight ${t.statDetail}`}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#FF4B1F] text-white text-sm font-bold shadow-md hover:bg-[#e64219] active:scale-[0.98] transition"
              >
                Get In Touch
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};