import React from 'react';
import { projectsData } from '../data';

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-on-scroll">
          {projectsData.map((project, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-400/30 hover:border-teal-400 transition-colors shadow-lg hover:shadow-xl animate-on-scroll">
              {/* Replace placeholder with actual image */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="border border-teal-400 hover:bg-teal-400 hover:text-white text-teal-400 px-4 py-2 rounded text-sm transition-colors"
                  >
                    GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;