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
import GitHubActivity from './components/GitHubActivity';

function App() {
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
    <div className="forge-shell text-stone-300 antialiased selection:bg-red-500/20 selection:text-red-50">
      <div className="forge-surface" aria-hidden="true">
        <div className="forge-orb forge-orb-one" />
        <div className="forge-orb forge-orb-two" />
        <div className="forge-orb forge-orb-three" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-16">
          <Sidebar />
          <main id="content" className="pt-16 lg:w-[56%] lg:py-24">
            <About />
            <Experience />
            <ProjectsNew />
            <GitHubActivity />
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
