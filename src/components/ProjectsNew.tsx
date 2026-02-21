import React from 'react';
import { projectsData } from '../data';

const Projects = () => {
  return (
    <section id="projects" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-xl font-medium tracking-tight text-white scroll-fade">
        <span className="section-heading">Projects</span>
      </h2>

      <div className="flex flex-col gap-6">
        {projectsData.map((project, index) => (
          <a
            key={index}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="scroll-fade glow-card group block rounded-lg p-4 -mx-4 transition-all border border-transparent hover:border-zinc-800/60 hover:bg-zinc-800/30"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-24 h-16 shrink-0 rounded-md overflow-hidden bg-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-white group-hover:text-zinc-200 flex items-center gap-1.5">
                  {project.title}
                  <svg
                    className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {project.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center rounded-full bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700/40"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
