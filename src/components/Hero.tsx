import React, { useState } from 'react';
import heroBgImage from '../assets/images/hero-bg.jpeg';
import {
  ArrowRight,
  Send,
  MapPin,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Upload,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import defaultProfilePhoto from '../assets/images/profile.jpg';

const HERO_BACKGROUND = heroBgImage;

const PLACEHOLDER_PROFILE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

const HELLO_LETTERS = 'Hello'.split('');


const HERO_ANIMATIONS = `
@keyframes hero-letter-in {
  0%   { opacity: 0; transform: translateY(0.9em) rotate(8deg) scale(0.8); filter: blur(6px); }
  60%  { opacity: 1; transform: translateY(-0.12em) rotate(-2deg) scale(1.04); filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) rotate(0) scale(1); filter: blur(0); }
}
@keyframes hero-wave {
  0%, 60%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(16deg); }
  20% { transform: rotate(-10deg); }
  30% { transform: rotate(16deg); }
  40% { transform: rotate(-6deg); }
  50% { transform: rotate(10deg); }
}
@keyframes hero-pop-in {
  0%   { opacity: 0; transform: scale(0) rotate(-30deg); }
  70%  { opacity: 1; transform: scale(1.2) rotate(8deg); }
  100% { opacity: 1; transform: scale(1) rotate(0); }
}
@keyframes hero-fade-up {
  0%   { opacity: 0; transform: translateY(22px); filter: blur(6px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes hero-name-in {
  0%   { opacity: 0; transform: translateX(-24px); filter: blur(8px); }
  100% { opacity: 1; transform: translateX(0); filter: blur(0); }
}
@keyframes hero-shimmer {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes hero-draw {
  0%   { stroke-dashoffset: 1; }
  100% { stroke-dashoffset: 0; }
}
@keyframes hero-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
@keyframes hero-photo-in {
  0%   { opacity: 0; transform: scale(0.85); filter: blur(10px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
}

.hero-letter {
  display: inline-block;
  opacity: 0;
  animation: hero-letter-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero-wave-wrap {
  display: inline-block;
  opacity: 0;
  animation: hero-pop-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both;
}
.hero-wave {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: hero-wave 2.4s ease-in-out 1.3s infinite;
}
.hero-name {
  opacity: 0;
  animation: hero-name-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
}
.hero-name-gradient {
  background-image: linear-gradient(90deg, #FF4B1F 0%, #FF9A5C 25%, #FFD2A8 50%, #FF9A5C 75%, #FF4B1F 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: hero-shimmer 4s linear 1.6s infinite;
}
.hero-underline path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: hero-draw 0.9s ease-out 1.5s forwards;
}
.hero-fade {
  opacity: 0;
  animation: hero-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero-photo-in {
  opacity: 0;
  animation: hero-photo-in 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}
.hero-float {
  animation: hero-float 6s ease-in-out 1.2s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-letter, .hero-wave-wrap, .hero-wave, .hero-name, .hero-name-gradient,
  .hero-fade, .hero-photo-in, .hero-float {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
  .hero-underline path { animation: none !important; stroke-dashoffset: 0 !important; }
}
`;

export const Hero: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('rajnish_custom_photo');
      if (saved && (saved.startsWith('data:image/') || saved.startsWith('http') || saved.startsWith('/'))) return saved;
    } catch {
      // ignore
    }
    return defaultProfilePhoto || PERSONAL_INFO.profileImage || PLACEHOLDER_PROFILE;
  });

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setPhotoSrc(dataUrl);
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
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleImageError = () => {
    if (photoSrc !== defaultProfilePhoto && defaultProfilePhoto) {
      setPhotoSrc(defaultProfilePhoto);
      try {
        localStorage.removeItem('rajnish_custom_photo');
      } catch {
        // ignore
      }
    } else if (photoSrc !== PLACEHOLDER_PROFILE) {
      setPhotoSrc(PLACEHOLDER_PROFILE);
    }
  };

  const socialBtn =
    'w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-110';

  return (
    <section id="home" className="relative isolate overflow-hidden pt-8 sm:pt-12 pb-14 sm:pb-24">
      <style>{HERO_ANIMATIONS}</style>

      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_BACKGROUND}')` }}
        aria-hidden="true"
      ></div>

      {/* Dark overlay + glow */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950/85 via-zinc-950/80 to-zinc-950/95"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 18%, rgba(255,75,31,0.22) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">

          {/* PHOTO: mobile pe upar, desktop pe right */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center w-full hero-photo-in">
            {/* Hello There + Location */}
            <div className="mb-6 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold max-w-full">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="whitespace-nowrap">Hello There!</span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1 font-normal text-zinc-300 truncate">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FF7A4D]" />
                <span className="truncate">{PERSONAL_INFO.location}</span>
              </span>
            </div>

            {/* Round portrait (little floating animation) */}
            <div className="relative hero-float">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FF4B1F] to-[#FF7A00] blur-2xl opacity-40 pointer-events-none"></div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-full p-1 sm:p-1.5 bg-gradient-to-tr from-[#FF4B1F] via-[#FF7A00] to-[#FFB067] shadow-2xl transition-all duration-200 ${
                  isDragging ? 'ring-4 ring-white/70' : ''
                }`}
              >
                <div className="relative rounded-full overflow-hidden bg-zinc-900 border-4 border-zinc-950 w-44 h-44 min-[380px]:w-52 min-[380px]:h-52 sm:w-60 sm:h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                  <img
                    src={photoSrc}
                    alt="Rajnish Kumar Yadav"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />

                  {isDragging && (
                    <div className="absolute inset-0 z-10 bg-[#FF4B1F]/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center text-white">
                      <Upload className="w-10 h-10 mb-2 animate-bounce" />
                      <p className="font-black text-sm">Drop your Photo Here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full">

            {/* Heading: Hello + I'm Rajnish Kumar Yadav */}
            <h1
              aria-label="Hello, I'm Rajnish Kumar Yadav"
              className="w-full font-extrabold tracking-tight text-white leading-[1.1] mb-4 sm:mb-5"
            >
              {/* Line 1: Hello 👋 (letter by letter + waving hand) */}
              <span
                aria-hidden="true"
                className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-1 sm:mb-2 text-[clamp(1.7rem,7.5vw,2.4rem)] sm:text-4xl md:text-5xl xl:text-6xl"
              >
                <span>
                  {HELLO_LETTERS.map((ch, i) => (
                    <span
                      key={i}
                      className="hero-letter"
                      style={{ animationDelay: `${0.15 + i * 0.09}s` }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                <span className="hero-wave-wrap">
                  <span className="hero-wave" role="img">👋</span>
                </span>
              </span>

              {/* Line 2: I'm Rajnish Kumar Yadav*/}
              <span
                aria-hidden="true"
                className="hero-name block whitespace-nowrap lg:whitespace-normal text-[clamp(1.45rem,6.6vw,2.6rem)] sm:text-[2.6rem] md:text-5xl xl:text-6xl"
              >
                I'm{' '}
                <span className="relative inline-block">
                  <span className="hero-name-gradient">Rajnish Kumar Yadav</span>
                  <svg
                    className="hero-underline absolute -bottom-1.5 left-0 w-full text-[#FF4B1F]/60 -z-10"
                    height="8"
                    viewBox="0 0 300 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 7C60 2 180 2 297 7"
                      pathLength={1}
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Title */}
            <div
              className="hero-fade inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B1F]/15 border border-[#FF4B1F]/40 text-[#FF8A5C] font-bold text-sm sm:text-base md:text-lg mb-4 text-center max-w-full"
              style={{ animationDelay: '1.1s' }}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="leading-snug">{PERSONAL_INFO.title}</span>
            </div>

            {/* Description */}
            <p
              className="hero-fade text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl lg:max-w-2xl leading-relaxed mb-7 sm:mb-8 mx-auto lg:mx-0"
              style={{ animationDelay: '1.25s' }}
            >
              {PERSONAL_INFO.shortPositioning}
            </p>

            {/* Buttons */}
            <div
              className="hero-fade flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0"
              style={{ animationDelay: '1.4s' }}
            >
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#FF4B1F] text-white font-bold text-base sm:text-lg hover:bg-[#e64219] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 font-bold text-base sm:text-lg hover:border-white hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Send className="w-5 h-5 text-[#FF4B1F]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social links */}
            <div
              className="hero-fade pt-6 border-t border-white/15 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-4 text-center lg:text-left"
              style={{ animationDelay: '1.55s' }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Connect With Me
              </span>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialBtn} hover:bg-black`}
                  title="GitHub Profile (@RajnishYadav900)"
                  aria-label="GitHub (@RajnishYadav900)"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialBtn} hover:bg-[#0077b5]`}
                  title="LinkedIn Profile"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialBtn} hover:bg-[#0088cc]`}
                  title={`Telegram (${PERSONAL_INFO.viberTelegramNumber})`}
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className={`${socialBtn} hover:bg-[#FF4B1F]`}
                  title={`Email ${PERSONAL_INFO.email}`}
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};