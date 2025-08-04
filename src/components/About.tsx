import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Main content with photo on left and cards on right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Profile image */}
            <div className="flex justify-center items-center min-h-screen bg-gray-">
  <div className="w-200 h-90 rounded-full overflow-hidden shadow-2xl">
    <img 
      src="/images/IMG_6403-2-2.png" 
      alt="Mohamed Jirac Profile" 
      className="w-full h-full object-cover object-center" 
    />
  </div>
</div>


            {/* Experience and Education Cards */}
            <div className="grid gap-6">
            {/* Experience Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-teal-400/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Experience</h3>
                <p className="text-teal-400 font-semibold mb-2">3+ years</p>
                <p className="text-gray-300 text-sm mb-2">Computer Science</p>
                <p className="text-gray-400 text-sm">Student (Dec 2025)</p>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-teal-400/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                <p className="text-teal-400 font-semibold mb-2">Pursuing B.Sc. Bachelors</p>
                <p className="text-gray-300 text-sm mb-2">Degree</p>
                <p className="text-gray-400 text-sm">Computer Science and Engineering</p>
              </div>
            </div>
          </div>
          </div>

          {/* Description text */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              I am heading into my junior year at The Ohio State University. 
              Passionate about Software Engineering, I'm actively seeking an 
              internship to put my skills into action. My journey in Computer Science is 
              a constant quest for growth, whether it's perfecting the codes in 
              languages I'm familiar with or diving into new ones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;