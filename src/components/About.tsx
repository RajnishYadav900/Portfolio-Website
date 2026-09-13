import React, { useState, useEffect } from 'react';
import {
  Code,
  Sparkles,
  MapPin,
  CheckCircle2,
  Brain,
  Rocket,
  ShieldCheck,
  Terminal,
  Award,
  ArrowRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import defaultProfilePhoto from '../assets/images/profile.jpg';

export const About: React.FC = () => {
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
    const handlePhotoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setAboutPhoto(customEvent.detail);
      }
    };
    window.addEventListener('rajnish_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('rajnish_photo_updated', handlePhotoUpdate);
  }, []);
  const highlights = [
    {
      label: 'Projects Built',
      value: PERSONAL_INFO.projectsCompleted,
      detail: 'Practical web & hardware applications',
      icon: <Code className="w-5 h-5 text-[#FF4B1F]" />,
    },
    {
      label: 'Technologies',
      value: PERSONAL_INFO.techMastered,
      detail: 'React, Node, Python, Tailwind & more',
      icon: <Terminal className="w-5 h-5 text-[#FF4B1F]" />,
    },
    {
      label: 'Certificates',
      value: PERSONAL_INFO.certificationsCount,
      detail: 'Academic honors & technical milestones',
      icon: <Award className="w-5 h-5 text-[#FF4B1F]" />,
    },
    {
      label: 'Learning Mindset',
      value: 'Continuous',
      detail: 'Dedicated to daily skill mastery',
      icon: <Brain className="w-5 h-5 text-[#FF4B1F]" />,
    },
  ];

  const focusPillars = [
    {
      title: 'Full-Stack Web Engineering',
      desc: 'Building responsive React applications connected with robust Node.js backends and clean REST APIs.',
    },
    {
      title: 'AI & Data Foundations',
      desc: 'Harnessing Python and analytical algorithms to uncover insights and build smart automated systems.',
    },
    {
      title: 'Real-World Problem Solving',
      desc: 'Designing sustainable projects like solar-tracking streetlights and utility web software.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Bar */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs sm:text-sm font-semibold text-zinc-800 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF4B1F]"></span>
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950">
            Building Technology <span className="text-[#FF4B1F]">With Purpose.</span>
          </h2>
        </div>

        {/* Two-Column Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Decorative Visual / Tech Blueprint Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              
              {/* Abstract orange background shape */}
              <div className="absolute -top-4 sm:-top-6 -left-2 sm:-left-6 w-full h-full bg-[#FF4B1F]/10 rounded-3xl -z-10 transform -rotate-2" />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 w-3/4 h-3/4 bg-orange-100/50 rounded-3xl -z-10 transform rotate-3" />

              {/* Main Visual Container */}
              <div className="rounded-3xl bg-zinc-950 text-white p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
                
                {/* Header code bar */}
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

                {/* Simulated Developer Identity Payload */}
                <div className="font-mono text-xs sm:text-sm text-zinc-300 space-y-3">
                  <p className="text-zinc-500 font-mono">// Engineer Snapshot</p>
                  <p>
                    <span className="text-[#FF4B1F]">const</span> developer = &#123;
                  </p>
                  <div className="pl-4 space-y-1.5 border-l border-zinc-800 ml-1">
                    <p>
                      name: <span className="text-emerald-400">"Rajnish Kumar Yadav"</span>,
                    </p>
                    <p>
                      role: <span className="text-emerald-400">"Web & Data Engineer"</span>,
                    </p>
                    <p>
                      location: <span className="text-emerald-400">"Kathmandu, Nepal"</span>,
                    </p>
                    <p>
                      education: <span className="text-amber-300">"BIT (Hons) @ Lincoln | +2 CS @ Dhanusha Science Campus"</span>,
                    </p>
                    <p>
                      focus: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"Python"</span>],
                    </p>
                    <p>
                      corePhilosophy: <span className="text-emerald-400">"Solve real problems"</span>,
                    </p>
                    <p>
                      learningEveryDay: <span className="text-cyan-400">true</span>
                    </p>
                  </div>
                  <p>&#125;;</p>
                </div>

                {/* Kathmandu Base Badge */}
                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 flex items-center justify-center text-[#FF4B1F]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Kathmandu, Nepal</p>
                      <p className="text-[11px] text-zinc-400">Available for remote & hybrid roles</p>
                    </div>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

              </div>

              {/* Overlapping Floating Badge */}
              <div className="absolute -bottom-5 right-1 sm:-right-6 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-zinc-200 flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF4B1F]">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-950">Fast Execution</p>
                  <p className="text-[11px] text-zinc-500">Quality-Driven Mindset</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative and Highlights */}
          <div className="lg:col-span-7 flex flex-col">
            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-6 font-normal">
              {PERSONAL_INFO.detailedBio}
            </p>

            {/* Core Pillars */}
            <div className="space-y-3 mb-8">
              {focusPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FF4B1F]/15 flex items-center justify-center text-[#FF4B1F] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">{pillar.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Realistic Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs hover:border-[#FF4B1F]/50 transition-colors"
                >
                  <div className="mb-2">{item.icon}</div>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold text-zinc-800 mt-0.5">{item.label}</div>
                  <div className="text-[11px] text-zinc-500 mt-1 leading-tight">{item.detail}</div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#skills"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF4B1F] hover:text-[#e03a10] group"
              >
                <span>Explore My Technical Skills</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <span className="text-zinc-300 hidden sm:inline">|</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-zinc-950 group"
              >
                <span>Get In Touch Directly</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
