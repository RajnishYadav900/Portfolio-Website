import React, { useState, useEffect } from 'react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import {Skills} from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

type Theme = 'dark' | 'light';

const THEME_KEY = 'rajnish_portfolio_theme';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');


  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Continue even if browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const next = document.documentElement.dataset.theme;
      if (next === 'dark' || next === 'light') {
        setTheme(next);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = [
      'home',
      'about',
      'skills',
      'services',
      'projects',
      'experience',
      'achievements',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);

        if (sectionEl && scrollPosition >= sectionEl.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`portfolio-app min-h-screen w-full flex flex-col antialiased ${
        isDark ? 'bg-[#151922] text-white' : 'bg-white text-zinc-900'
      }`}
    >
      {/* Full-width page */}
      <div className="portfolio-frame relative flex w-full flex-1 flex-col">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-grid-pattern opacity-50" />

        <Navbar activeSection={activeSection} />

        <main className="relative z-10 w-full flex-1">
          <Hero />
          <TrustStrip />
          <About />
          <Skills />
          <Services />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}