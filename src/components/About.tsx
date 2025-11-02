import React from 'react';
import TerminalCodeSymbol from './TerminalCodeSymbol';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="max-w-6xl mx-auto animate-on-scroll">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            
            {/* Terminal Code Symbol */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md h-96">
                <TerminalCodeSymbol />
              </div>
            </div>

            <div className="grid gap-6">
              {/* Experience Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-teal-400/30 animate-on-scroll">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💼</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Experience</h3>
                  <p className="text-teal-400 font-semibold mb-2">4+ years</p>
                  <p className="text-gray-300 mb-1">Software Development</p>
                  <p className="text-gray-400 text-sm">Internships & Projects</p>
                </div>
              </div>

              {/* Education Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-teal-400/30 animate-on-scroll">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                  <p className="text-teal-400 font-semibold mb-2">B.S. Computer Science</p>
                  <p className="text-gray-300 mb-1">The Ohio State University</p>
                  <p className="text-gray-400 text-sm">Expected Dec 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* About text */}
          <div className="text-center max-w-4X1 mx auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              Heading into my senior year at The Ohio State University, I'm eager to take the next step 
              in my journey as a Software Engineer. With a strong foundation in Computer Science, I'm 
              actively seeking a Software Engineering internship where I can apply my skills, solve real-world 
              problems, and continue to grow. Whether I'm refining my work in familiar languages or exploring 
              new technologies, I'm driven by curiosity and a passion for building impactful, efficient solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;