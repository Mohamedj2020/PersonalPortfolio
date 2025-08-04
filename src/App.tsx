import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;

