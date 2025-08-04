import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-teal-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-teal-400/30">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Mohamed Jirac
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#hero" className="hover:text-teal-400 transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="hover:text-teal-400 transition-colors font-medium">
              About
            </a>
            <a href="#experience" className="hover:text-teal-400 transition-colors font-medium">
              Experience
            </a>
            <a href="#projects" className="hover:text-teal-400 transition-colors font-medium">
              Projects
            </a>
            <a href="#contact" className="hover:text-teal-400 transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-teal-400/30">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#hero" 
                className="hover:text-teal-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="hover:text-teal-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#experience" 
                className="hover:text-teal-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="hover:text-teal-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="hover:text-teal-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;