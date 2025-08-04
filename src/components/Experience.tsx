import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer",
      company: "Your Company",
      period: "2023 - Present",
      description: "Working on exciting projects with modern technologies. Building scalable web applications and learning new things every day.",
      technologies: ["React", "TypeScript", "Node.js"]
    },
    {
      title: "Junior Developer", 
      company: "Previous Company",
      period: "2022 - 2023",
      description: "Started my journey in web development. Gained experience in frontend development and teamwork.",
      technologies: ["JavaScript", "HTML", "CSS"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Experience
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-teal-400/30 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-teal-400 text-lg font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-400 mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;