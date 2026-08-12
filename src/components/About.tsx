import React from 'react';
import { aboutData } from '../data';

const About = () => {
  return (
    <section id="about" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">About</span>
      </h2>

      <div className="grid gap-6 lg:grid-cols-[0.88fr,1.12fr]">
        <div
          className="scroll-fade rounded-[32px] border border-red-500/12 bg-[rgba(18,10,10,0.72)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm"
          style={{ transitionDelay: '100ms' }}
        >
          <p className="font-mono text-xs text-red-200/70">Education</p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-stone-50">
            Computer science at Ohio State.
          </h3>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-red-500/40 to-transparent" />

          <div className="mt-6 space-y-3">
            <p className="text-base font-semibold text-stone-100">{aboutData.education.degree}</p>
            <p className="text-sm text-stone-400">{aboutData.education.school}</p>
            <p className="font-mono text-xs text-red-200/70">{aboutData.education.expected}</p>
          </div>

          <p className="mt-8 text-sm leading-7 text-stone-400">
            My interests sit between solid engineering and practical product thinking. I like
            building things that are technically sound, easy to use, and worth maintaining.
          </p>
        </div>

        <div
          className="scroll-fade rounded-[32px] border border-white/6 bg-black/35 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm"
          style={{ transitionDelay: '220ms' }}
        >
          <div className="flex flex-col gap-5">
            <img
              src="/images/aboutme2.0.jpg"
              alt="Mohamed speaking at a panel"
              className="h-72 w-full rounded-[24px] object-cover ring-1 ring-red-500/10"
            />

            <div>
              <p className="font-mono text-xs text-stone-500">About me</p>
              <p className="mt-4 text-[15px] leading-8 text-stone-300">{aboutData.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
