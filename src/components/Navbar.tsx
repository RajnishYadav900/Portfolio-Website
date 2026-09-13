import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code, Sparkles } from 'lucide-react';
import defaultProfilePhoto from '../assets/images/profile.jpg';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navPhoto, setNavPhoto] = useState<string>(() => {
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
        setNavPhoto(customEvent.detail);
      }
    };
    window.addEventListener('rajnish_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('rajnish_photo_updated', handlePhotoUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
      <nav
        className={`w-full rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2.5 sm:py-3.5 transition-all duration-300 border flex items-center justify-between ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-zinc-200/80'
            : 'bg-white/80 backdrop-blur-sm border-zinc-200/60 shadow-sm'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo with Avatar */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2 sm:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4B1F] rounded-lg min-w-0"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-zinc-300 ring-2 ring-orange-500/20 group-hover:ring-[#FF4B1F] transition-all shrink-0">
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
          <span className="text-lg sm:text-xl font-black tracking-tight text-zinc-950 font-['Plus_Jakarta_Sans']">
            Rajnish<span className="text-[#FF4B1F]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1.5 text-xs lg:text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-2.5 lg:px-3.5 py-1.5 rounded-full transition-all duration-200 relative whitespace-nowrap ${
                  isActive
                    ? 'text-zinc-950 font-semibold bg-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#FF4B1F] transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-orange-500/20 group"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden gap-1.5 sm:gap-2">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FF4B1F] text-white text-xs font-semibold shrink-0"
          >
            <span>Talk</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-xl text-zinc-800 hover:text-black hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#FF4B1F] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FF4B1F]" />}
                </a>
              );
            })}
          </div>
          <div className="pt-2 border-t border-zinc-100">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF4B1F] text-white text-sm font-semibold shadow-md shadow-orange-500/20"
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
