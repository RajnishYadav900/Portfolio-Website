import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

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
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E1015] text-zinc-900 p-0 sm:p-3 md:p-6 lg:p-8 flex flex-col items-center justify-start antialiased selection:bg-[#FF4B1F] selection:text-white">

      {/* Outer Grand Framed Container */}
      <div className="w-full max-w-7xl mx-auto rounded-none sm:rounded-[2.5rem] bg-white border-0 sm:border border-zinc-200/90 shadow-2xl shadow-black/30 flex flex-col relative">

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50 -z-0" />

        {/* Top Floating Navigation */}
        <Navbar activeSection={activeSection} />

        {/* Main Content Sections */}
        <main className="flex-1 w-full relative z-10">
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