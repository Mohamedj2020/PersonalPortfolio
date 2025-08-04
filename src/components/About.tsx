import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="text-gray-300">
              <p className="text-lg mb-6">
                Hi! I'm Mohamed, a passionate developer who loves creating things that make a difference. 
                I enjoy turning complex problems into simple, beautiful solutions.
              </p>
              
              <p className="text-lg mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open source, 
                or working on side projects that spark my curiosity.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm">
                  React
                </span>
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm">
                  JavaScript
                </span>
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm">
                  Tailwind CSS
                </span>
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm">
                  Node.js
                </span>
              </div>
            </div>

            {/* Placeholder for image */}
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full p-2">
                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xl font-medium">Your Photo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;