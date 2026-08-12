import React, { useEffect, useState } from 'react';
import { aboutData } from '../data';

const About = () => {
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    if (!photoOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPhotoOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photoOpen]);

  return (
    <>
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
              <button
                type="button"
                onClick={() => setPhotoOpen(true)}
                className="group overflow-hidden rounded-[24px] text-left ring-1 ring-red-500/10"
              >
                <img
                  src="/images/aboutme2.0.jpg"
                  alt="Mohamed speaking at a panel"
                  className="aspect-[16/10] w-full object-cover object-[28%_34%] transition-transform duration-300 group-hover:scale-[1.01] md:aspect-[16/9] xl:aspect-[5/4]"
                />
              </button>

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

      {photoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,6,6,0.92)] px-4 py-6 backdrop-blur-md"
          onClick={() => setPhotoOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(16,10,10,0.84)] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPhotoOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-xl text-stone-200 transition-colors hover:border-red-400/30 hover:text-white"
              aria-label="Close photo"
            >
              ×
            </button>

            <img
              src="/images/aboutme2.0.jpg"
              alt="Mohamed speaking at a panel"
              className="max-h-[82vh] w-full object-contain bg-[#090909]"
            />

            <div className="flex items-center justify-between gap-3 border-t border-white/6 bg-[rgba(12,8,8,0.96)] px-5 py-4 text-sm text-stone-300">
              <span className="font-mono uppercase tracking-[0.18em] text-stone-500">Photo</span>
              <a
                href="https://www.linkedin.com/in/sajjaad-khader/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BPBSVY7L7TzKGST1JjLry%2FA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-right text-red-100/90 underline decoration-red-400/40 underline-offset-4 transition-colors hover:text-red-50"
              >
                @ Sajjaad Khader
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
