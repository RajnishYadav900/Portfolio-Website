import React, { useState } from 'react';
import {
  ArrowRight,
  Send,
  MapPin,
  Sparkles,
  Github,
  Linkedin,
  Facebook,
  Mail,
  MessageSquare,
  FileText,
  Terminal,
  Cpu,
  Layers,
  Code2,
  Database,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import defaultProfilePhoto from '../assets/images/profile.jpg';

export const Hero: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasCustomPhoto, setHasCustomPhoto] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('rajnish_custom_photo'));
    } catch {
      return false;
    }
  });

  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('rajnish_custom_photo');
      if (saved && (saved.startsWith('data:image/') || saved.startsWith('http') || saved.startsWith('/'))) return saved;
    } catch {
      // ignore
    }
    return defaultProfilePhoto || PERSONAL_INFO.profileImage;
  });

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setPhotoSrc(dataUrl);
        setHasCustomPhoto(true);
        try {
          localStorage.setItem('rajnish_custom_photo', dataUrl);
          window.dispatchEvent(new CustomEvent('rajnish_photo_updated', { detail: dataUrl }));
        } catch {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="home" className="relative pt-6 sm:pt-10 pb-16 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full">
            {/* Small Label with Status Indicator */}
            <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs sm:text-sm font-semibold mb-5 sm:mb-6 shadow-2xs max-w-full">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B1F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4B1F]"></span>
              </span>
              <span className="tracking-wide whitespace-nowrap">Hello There!</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500 flex items-center gap-1 font-normal truncate">
                <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl min-[360px]:text-[1.85rem] min-[420px]:text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.16] sm:leading-[1.08] mb-4 sm:mb-5 text-center lg:text-left w-full mx-auto">
              I'm{' '}
              <span className="relative inline-block whitespace-normal sm:whitespace-nowrap">
                <span className="text-[#FF4B1F]">Rajnish Kumar Yadav</span>
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full text-[#FF4B1F]/30 -z-10"
                  height="10"
                  viewBox="0 0 300 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7C60 2 180 2 297 7"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <div className="inline-flex items-center justify-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-orange-50 border border-orange-200/60 text-[#FF4B1F] font-bold text-xs sm:text-base md:text-lg mb-4 text-center max-w-full">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4B1F] shrink-0" />
              <span className="leading-snug">{PERSONAL_INFO.title}</span>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl lg:max-w-2xl leading-relaxed mb-7 sm:mb-9 text-center lg:text-left mx-auto lg:mx-0">
              {PERSONAL_INFO.shortPositioning}
            </p>

            {/* Two Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 sm:py-4.5 rounded-full bg-zinc-950 text-white font-bold text-base sm:text-lg hover:bg-[#FF4B1F] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 group text-center"
              >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 sm:py-4.5 rounded-full bg-white text-zinc-900 border-2 border-zinc-300 font-bold text-base sm:text-lg hover:border-zinc-950 hover:bg-zinc-50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm text-center"
              >
                <Send className="w-5 h-5 text-[#FF4B1F]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Contact Strip */}
            <div className="pt-6 border-t border-zinc-200/70 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-3 sm:gap-4 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Connect With Me
              </span>
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-200 border border-zinc-200 hover:scale-105"
                  title="GitHub Profile (@RajnishYadav900)"
                  aria-label="GitHub (@RajnishYadav900)"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#0077b5] hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-200 border border-zinc-200 hover:scale-105"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#25D366] hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-200 border border-zinc-200 hover:scale-105"
                  title={`WhatsApp (${PERSONAL_INFO.whatsappNumber})`}
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#1877F2] hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-200 border border-zinc-200 hover:scale-105"
                  title="Facebook Profile"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#0088cc] hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-200 border border-zinc-200 hover:scale-105"
                  title={`Telegram (${PERSONAL_INFO.viberTelegramNumber})`}
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#FF4B1F] hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-200 border border-zinc-200 hover:scale-105"
                  title={`Email ${PERSONAL_INFO.email}`}
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image Area with Orange Shape & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full mt-6 lg:mt-0 pt-6 pb-6 lg:pt-8 lg:pb-8">

            {/* Background Orange Graphic Elements */}
            <div className="absolute w-64 xs:w-72 sm:w-88 h-64 xs:h-72 sm:h-88 bg-gradient-to-tr from-[#FF4B1F] to-[#FF7A00] rounded-full filter blur-2xl opacity-20 -z-10 animate-pulse pointer-events-none"></div>

            {/* Profile Frame Container */}
            <div className="relative w-full max-w-[280px] min-[380px]:max-w-[320px] sm:max-w-sm mx-auto">

              {/* Outer Framed Card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-3 sm:p-3.5 shadow-2xl border border-zinc-800">

                {/* Main Profile Canvas / Image Holder */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative rounded-2xl overflow-hidden aspect-[4/4.6] bg-gradient-to-b from-zinc-800 to-zinc-900 flex flex-col justify-end items-center border transition-all duration-200 ${
                    isDragging ? 'border-[#FF4B1F] ring-4 ring-[#FF4B1F]/40' : 'border-zinc-700/50'
                  }`}
                >

                  {/* Decorative Geometric Orange Arch behind profile */}
                  <div className="absolute inset-x-6 sm:inset-x-8 top-10 sm:top-12 bottom-0 bg-gradient-to-b from-[#FF4B1F] via-[#FF6036] to-transparent opacity-90 rounded-t-full -z-0"></div>

                  {/* Profile Portrait — background subtly darkened/blurred so the face pops */}
                  <img
                    src={photoSrc}
                    alt="Rajnish Kumar Yadav"
                    className="w-full h-full object-cover object-top relative z-10 transition-transform duration-500 hover:scale-105"
                    style={{ filter: 'contrast(1.05) saturate(1.05)' }}
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (photoSrc !== defaultProfilePhoto) {
                        setPhotoSrc(defaultProfilePhoto);
                        try {
                          localStorage.removeItem('rajnish_custom_photo');
                        } catch {
                          // ignore
                        }
                      }
                    }}
                  />

                  {/* Subtle vignette to pull focus toward the face and mute the room background */}
                  <div
                    className="absolute inset-0 z-[11] pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 35%, transparent 35%, rgba(0,0,0,0.35) 100%)',
                    }}
                  ></div>

                  {/* Drag-and-drop active overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 z-40 bg-[#FF4B1F]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
                      <Upload className="w-12 h-12 mb-3 animate-bounce text-white" />
                      <p className="font-black text-base">Drop your WhatsApp Photo Here</p>
                      <p className="text-xs text-white/90 mt-1">100% original quality • No edits</p>
                    </div>
                  )}

                  {/* Bottom Gradient Overlay on Image */}
                  <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black via-black/70 to-transparent z-20 pointer-events-none"></div>

                  {/* Bottom Status Card inside frame */}
                  <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 z-30 bg-black/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <div>
                        <p className="text-white text-xs font-bold leading-none">Rajnish Kumar Yadav</p>
                        <p className="text-zinc-400 text-[10px] mt-0.5">Kathmandu, Nepal</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 text-[#FF4B1F] text-[10px] font-bold">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* FLOATING BADGE 1: React (Top Left) — pulled inward so it never clips off-frame */}
              <div className="absolute -top-3 left-2 sm:-top-4 sm:left-1 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-lg sm:shadow-xl border border-zinc-200/80 flex items-center gap-1.5 sm:gap-2 transform hover:-translate-y-1 transition-transform duration-200 z-30">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
                  <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="pr-1">
                  <p className="text-[10px] sm:text-[11px] font-bold text-zinc-900 leading-tight">React.js</p>
                  <p className="text-[8px] sm:text-[9px] text-zinc-500 font-medium">Frontend Core</p>
                </div>
              </div>

              {/* FLOATING BADGE 2: Node.js (Top Right) — pulled inward */}
              <div className="absolute top-8 right-2 sm:top-10 sm:right-1 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-lg sm:shadow-xl border border-zinc-200/80 flex items-center gap-1.5 sm:gap-2 transform hover:-translate-y-1 transition-transform duration-200 z-30">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="pr-1">
                  <p className="text-[10px] sm:text-[11px] font-bold text-zinc-900 leading-tight">Node.js</p>
                  <p className="text-[8px] sm:text-[9px] text-zinc-500 font-medium">Backend & APIs</p>
                </div>
              </div>

              {/* FLOATING BADGE 3: Python (Bottom Left) — pulled inward */}
              <div className="absolute bottom-24 left-2 sm:bottom-28 sm:left-1 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-lg sm:shadow-xl border border-zinc-200/80 flex items-center gap-1.5 sm:gap-2 transform hover:-translate-y-1 transition-transform duration-200 z-30">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="pr-1">
                  <p className="text-[10px] sm:text-[11px] font-bold text-zinc-900 leading-tight">Python</p>
                  <p className="text-[8px] sm:text-[9px] text-zinc-500 font-medium">Algorithms</p>
                </div>
              </div>

              {/* FLOATING BADGE 4: AI & Data (Bottom Right) — pulled inward */}
              <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:right-1 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-lg sm:shadow-xl border border-zinc-200/80 flex items-center gap-1.5 sm:gap-2 transform hover:-translate-y-1 transition-transform duration-200 z-30">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF4B1F] shrink-0">
                  <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="pr-1">
                  <p className="text-[10px] sm:text-[11px] font-bold text-zinc-900 leading-tight">AI & Data</p>
                  <p className="text-[8px] sm:text-[9px] text-zinc-500 font-medium">Engineering</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};