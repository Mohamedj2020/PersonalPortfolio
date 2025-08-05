import React, { useState, useEffect, useMemo } from 'react';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = useMemo(() => ['Developer', 'Student', 'Designer', 'Creator', 'Problem Solver'], []);
  
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentText === currentRole) {
      // Pause before deleting
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setCurrentText(prev => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1);
        } else {
          return currentRole.substring(0, prev.length + 1);
        }
      });
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 animate-on-scroll">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Text content */}
          <div className="text-center">
            {/* Small intro */}
            <div className="inline-block bg-teal-600/20 backdrop-blur-sm border border-teal-400/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
              <span className="text-teal-300 text-xs sm:text-sm font-medium">👋 Welcome to my portfolio</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Mohamed
              </span>
            </h1>

            {/* Typing animation */}
            <div className="text-2xl lg:text-3xl text-gray-300 mb-8">
              <p>
                I am a{' '}
                <span className="text-teal-400 font-semibold">
                  {currentText}
                  <span className="animate-pulse">|</span>
                </span>
              </p>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
              Passionate about creating beautiful, functional, and user-centered digital experiences. 
              Currently learning and building amazing things with code.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <a
                href="#contact"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Get in touch
              </a>
              <a
                href="/images/mlt_july_resume.pdf"
                download
                className="border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 text-center"
              >
                Download CV
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-6 mt-12 justify-center">
              <a
                href="https://github.com/Mohamedj2020"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-400 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-jirac"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-400 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="mailto:jirac.1@buckeyemail.osu.edu"
                aria-label="Send me an email"
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-400 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Profile image on right side */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
              <img 
                src="/images/2P2A3560.png" 
                alt="Mohamed Jirac" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;