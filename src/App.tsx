import React, { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Sidebar';
import Experience from './components/Work';
import ProjectsNew from './components/ProjectsNew';
import About from './components/About';
import Skills from './components/Skills';
import ContactNew from './components/ContactNew';
import Footer from './components/Footer';

function App() {
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    // Small delay to ensure DOM is fully painted
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-fade');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="dot-grid-bg text-zinc-400 antialiased selection:bg-emerald-500/20 selection:text-emerald-100">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-12">
          <Sidebar />
          <main id="content" className="pt-16 lg:w-[55%] lg:py-24">
            <About />
            <Experience />
            <ProjectsNew />
            <Skills />
            <ContactNew />
            <Footer />
          </main>
        </div>
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;



