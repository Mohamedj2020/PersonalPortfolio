import React from 'react';
import { projectsData } from '../data';

const Projects = () => {
  return (
    <section id="projects" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">Projects</span>
      </h2>

      <div className="flex flex-col gap-6">
        {projectsData.map((project, index) => (
          <a
            key={index}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="scroll-fade glow-card group block rounded-[30px] border border-red-500/10 bg-[rgba(16,10,10,0.68)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all hover:border-red-400/22"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="h-24 w-full shrink-0 overflow-hidden rounded-[22px] bg-black ring-1 ring-red-500/10 sm:h-20 sm:w-32">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold leading-7 text-stone-50 transition-colors group-hover:text-red-50">
                    {project.title}
                  </h3>

                  <svg
                    className="mt-1 h-4 w-4 shrink-0 text-red-200/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                </div>

                <p className="mt-3 text-sm leading-7 text-stone-400">{project.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-100/90"
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
