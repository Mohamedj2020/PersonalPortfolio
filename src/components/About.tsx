import React from 'react';
import { aboutData } from '../data';

const About = () => {
  return (
    <section id="about" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-xl font-medium tracking-tight text-white scroll-fade">
        <span className="section-heading">About</span>
      </h2>

      <div className="mb-8 scroll-fade" style={{ transitionDelay: '100ms' }}>
        <h3 className="mb-3 text-base text-zinc-200">Education</h3>
        <div className="h-px w-full bg-zinc-800/80 mb-5"></div>
        <div>
          <p className="text-base font-medium text-white">{aboutData.education.degree}</p>
          <p className="mt-1 text-sm text-zinc-400">{aboutData.education.school}</p>
          <p className="mt-0.5 text-sm text-zinc-500">{aboutData.education.expected}</p>
        </div>
      </div>

      <div className="scroll-fade" style={{ transitionDelay: '200ms' }}>
        <h3 className="mb-3 text-base text-zinc-200">About Me</h3>
        <div className="h-px w-full bg-zinc-800/80 mb-5"></div>
        <div className="flex flex-col gap-5">
          <img
            src="/images/aboutme2.0.jpg"
            alt="Mohamed speaking at a panel"
            className="w-full rounded-md object-cover ring-1 ring-zinc-800/60"
          />
          <p className="text-base leading-relaxed text-zinc-400">
            {aboutData.summary}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;