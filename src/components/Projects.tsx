import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website built with React and TypeScript. Features a modern design with smooth animations and mobile-first approach.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      image: "project1.jpg" // placeholder
    },
    {
      title: "Task Management App",
      description: "A full-stack task management application with user authentication, real-time updates, and drag-and-drop functionality.",
      technologies: ["React", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      image: "project2.jpg" // placeholder
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current conditions and forecasts using external APIs. Clean interface with location search.",
      technologies: ["JavaScript", "API Integration", "CSS"],
      liveUrl: "#",
      githubUrl: "#",
      image: "project3.jpg" // placeholder
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-400/30 hover:border-teal-400 transition-colors shadow-lg hover:shadow-xl">
              {/* Project image placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                <span className="text-gray-400 font-medium">Project Screenshot</span>
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
                    GitHub
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