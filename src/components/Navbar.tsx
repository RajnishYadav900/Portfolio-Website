import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import defaultProfilePhoto from '../assets/images/profile.jpg';

interface NavbarProps {
  activeSection: string;
}

type Theme = 'dark' | 'light';

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem('rajnish_portfolio_theme') === 'dark'
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  const [navPhoto, setNavPhoto] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('rajnish_custom_photo');
      if (
        stored &&
        (stored.startsWith('data:image/') ||
          stored.startsWith('http') ||
          stored.startsWith('/'))
      ) {
        return stored;
      }
    } catch {
      // Ignore storage errors.
    }
    return defaultProfilePhoto;
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    const syncTheme = () => {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    };

    window.addEventListener('rajnish_theme_updated', syncTheme);
    return () => window.removeEventListener('rajnish_theme_updated', syncTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem('rajnish_portfolio_theme', nextTheme);
    } catch {
      // Ignore storage errors.
    }

    window.dispatchEvent(new Event('rajnish_theme_updated'));
  };

  useEffect(() => {
    const handlePhotoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) setNavPhoto(customEvent.detail);
    };

    window.addEventListener('rajnish_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('rajnish_photo_updated', handlePhotoUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills'},
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navBackground = isDark
    ? isScrolled
      ? 'bg-[#151922]/95 border-zinc-700/80 shadow-black/20'
      : 'bg-[#151922]/85 border-zinc-700/60'
    : isScrolled
      ? 'bg-white/95 border-zinc-200/80 shadow-black/5'
      : 'bg-white/80 border-zinc-200/60';

  const textColor = isDark ? 'text-white' : 'text-zinc-950';

  const inactiveLink = isDark
    ? 'text-zinc-300 hover:text-white hover:bg-white/10'
    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100';

  const activeLink = isDark
    ? 'text-white font-semibold bg-white/10'
    : 'text-zinc-950 font-semibold bg-zinc-100';

  const mobileDrawer = isDark
    ? 'bg-[#151922]/98 border-zinc-700'
    : 'bg-white/98 border-zinc-200';

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className={`w-full px-3 sm:px-6 lg:px-8 py-3 sm:py-4 backdrop-blur-md border-b flex items-center justify-between gap-2 transition-all duration-300 ${navBackground} ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
        aria-label="Main Navigation"
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2 sm:gap-2.5 min-w-0 rounded-lg focus-visible:ring-2 focus-visible:ring-[#FF4B1F]"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-400/50 ring-2 ring-orange-500/20 group-hover:ring-[#FF4B1F] transition-all shrink-0">
            <img
              src={navPhoto}
              alt="Rajnish Kumar Yadav"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== defaultProfilePhoto) {
                  e.currentTarget.src = defaultProfilePhoto;
                }
              }}
            />
          </div>
          <span className={`text-base sm:text-xl font-black tracking-tight font-['Plus_Jakarta_Sans'] ${textColor}`}>
            Rajnish<span className="text-[#FF4B1F]">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 text-xs lg:text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-2.5 lg:px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                  isActive ? activeLink : inactiveLink
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
              isDark
                ? 'border-zinc-600 bg-zinc-800 text-amber-300 hover:bg-zinc-700'
                : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full bg-[#FF4B1F] text-white text-xs sm:text-sm font-semibold hover:bg-[#e64219] transition-all shadow-sm group"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-1.5 md:hidden">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex sm:hidden items-center gap-1 px-2.5 py-2 rounded-full bg-[#FF4B1F] text-white text-xs font-semibold"
            >
              Talk <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`p-2 rounded-xl transition-colors ${
                isDark
                  ? 'text-zinc-200 hover:bg-white/10'
                  : 'text-zinc-800 hover:bg-zinc-100'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={`md:hidden mx-3 sm:mx-4 mt-2 p-4 backdrop-blur-xl border rounded-2xl shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 ${mobileDrawer}`}>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                    isActive ? activeLink : inactiveLink
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FF4B1F]" />}
                </a>
              );
            })}
          </div>

          <div className={`pt-3 border-t ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF4B1F] text-white text-sm font-semibold shadow-md hover:bg-[#e64219] transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Let's Talk & Collaborate</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};