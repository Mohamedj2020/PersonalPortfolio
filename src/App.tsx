import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollAnimationProvider from './components/ScrollAnimationProvider';
import Footer from './components/Footer';
function App() {
  return (
    <ScrollAnimationProvider>
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ScrollToTopButton />
        <SpeedInsights />
        <Analytics />
      </div>
    </ScrollAnimationProvider>
  );
}

export default App;



