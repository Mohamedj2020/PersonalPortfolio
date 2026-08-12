import React from 'react';
import { aboutData } from '../data';

const About = () => {
  return (
    <section id="about" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">About</span>
      </h2>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr] xl:gap-8">
        <div
          className="scroll-fade rounded-[32px] border border-red-500/12 bg-[rgba(18,10,10,0.72)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-7 xl:p-8"
          style={{ transitionDelay: '100ms' }}
        >
          <p className="font-mono text-xs text-red-200/70">Education</p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-stone-50 md:text-[2rem]">
            Computer science at Ohio State, with most of the real learning happening while I build.
          </h3>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-red-500/40 to-transparent" />

          <div className="mt-6 space-y-3">
            <p className="text-base font-semibold text-stone-100">{aboutData.education.degree}</p>
            <p className="text-sm text-stone-400">{aboutData.education.school}</p>
            <p className="font-mono text-xs text-red-200/70">{aboutData.education.expected}</p>
          </div>

          <p className="mt-8 text-sm leading-7 text-stone-400">
            I tend to like work where the implementation matters as much as the idea. Clean
            systems, good product judgment, and details that make software feel solid are usually
            the parts I care about most.
          </p>
        </div>

        <div
          className="scroll-fade rounded-[32px] border border-white/6 bg-black/35 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-7 xl:p-8"
          style={{ transitionDelay: '220ms' }}
        >
          <div className="flex flex-col gap-6">
            <img
              src="/images/aboutme2.0.jpg"
              alt="Mohamed speaking at a panel"
              className="aspect-[16/10] w-full rounded-[24px] object-cover object-[28%_34%] ring-1 ring-red-500/10 md:aspect-[16/9] xl:aspect-[5/4]"
            />

            <div>
              <p className="font-mono text-xs text-stone-500">About me</p>
              <p className="mt-4 text-[15px] leading-8 text-stone-300">{aboutData.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 text-xs text-red-50/90">
                  Full-stack products
                </span>
                <span className="rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 text-xs text-red-50/90">
                  Backend systems
                </span>
                <span className="rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 text-xs text-red-50/90">
                  Developer tooling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
