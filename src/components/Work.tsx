import React, { useState } from 'react';
import { experiencesData } from '../data';

const OrgLogo = ({ exp }: { exp: typeof experiencesData[number] }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black ring-1 ring-red-500/12">
      {exp.logo && !imgError ? (
        <img
          src={exp.logo}
          alt={exp.organization}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="select-none text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-300">
          {exp.logoInitial}
        </span>
      )}
    </div>
  );
};

const SingleRoleCard = ({ exp, index }: { exp: typeof experiencesData[number]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="scroll-fade rounded-[30px] border border-red-500/10 bg-[rgba(16,10,10,0.66)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-colors duration-200 hover:border-red-400/20"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button onClick={() => setOpen((prev) => !prev)} className="flex w-full items-start gap-4 p-5 text-left">
        <OrgLogo exp={exp} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-xl font-semibold leading-7 text-stone-50">{exp.title}</h3>
            <span className="shrink-0 font-mono text-xs text-red-200/70">{exp.period}</span>
          </div>
          <p className="mt-2 text-sm text-stone-400">{exp.organization}</p>
        </div>

        <svg
          className={`mt-1 h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-6 pt-0">
          <div className="mb-5 h-px w-full bg-gradient-to-r from-red-500/35 to-transparent" />
          <p className="text-sm leading-7 text-stone-400">{exp.description}</p>

          {exp.highlights.length > 0 && (
            <div className="mt-5">
              <h4 className="mb-3 text-sm font-medium text-red-100/90">Highlights</h4>
              <div className="flex flex-col gap-2">
                {exp.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/30 px-4 py-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exp.skills.length > 0 && (
            <div className="mt-5">
              <h4 className="mb-3 text-sm font-medium text-stone-400">Technologies</h4>
              <ul className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <li
                    key={skill}
                    className="inline-flex items-center rounded-full border border-red-500/12 bg-red-500/10 px-3.5 py-1.5 text-xs font-medium text-red-100/90"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MultiRoleCard = ({ exp, index }: { exp: typeof experiencesData[number]; index: number }) => {
  const roles = (exp as any).roles as {
    title: string;
    type: string;
    period: string;
    location?: string;
    description: string;
    highlights: string[];
    skills: string[];
  }[];

  const [open, setOpen] = useState(false);
  const [openRoles, setOpenRoles] = useState<Record<number, boolean>>({});

  const toggleRole = (i: number) => {
    setOpenRoles((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div
      className="scroll-fade rounded-[30px] border border-red-500/10 bg-[rgba(16,10,10,0.66)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-colors duration-200 hover:border-red-400/20"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button onClick={() => setOpen((prev) => !prev)} className="flex w-full items-center gap-4 p-5 text-left">
        <OrgLogo exp={exp} />

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold leading-7 text-stone-50">{exp.organization}</h3>
          <p className="mt-2 font-mono text-xs text-red-200/70">{exp.period}</p>
        </div>

        <svg
          className={`h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[2200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 pt-0">
          <div className="mb-5 h-px w-full bg-gradient-to-r from-red-500/35 to-transparent" />
          {roles.map((role, i) => (
            <div key={i} className="relative pb-5 pl-6 last:pb-0">
              {i < roles.length - 1 && (
                <div className="absolute bottom-0 left-[7px] top-[10px] w-[2px] bg-gradient-to-b from-red-400/40 to-transparent" />
              )}
              <div className="absolute left-0 top-[7px] h-[14px] w-[14px] rounded-full border border-red-300/30 bg-black" />

              <button onClick={() => toggleRole(i)} className="flex w-full items-start justify-between gap-2 text-left">
                <div>
                  <p className="text-base font-semibold text-stone-100">{role.title}</p>
                  <p className="mt-1 font-mono text-xs text-red-200/70">{role.type}</p>
                  <p className="mt-1 text-xs text-stone-500">{role.period}</p>
                  {role.location && <p className="mt-1 text-xs text-stone-600">{role.location}</p>}
                </div>

                <svg
                  className={`mt-1 h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 ${openRoles[i] ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openRoles[i] ? 'mt-4 max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {role.description && <p className="mb-3 text-sm leading-7 text-stone-400">{role.description}</p>}

                {role.highlights.length > 0 && (
                  <div className="mb-3 flex flex-col gap-2">
                    {role.highlights.map((item, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                        <span className="text-sm text-stone-300">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {role.skills.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-100/90"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">Experience</span>
      </h2>

      <div className="flex flex-col gap-4">
        {experiencesData.map((exp, index) =>
          (exp as any).roles ? (
            <MultiRoleCard key={exp.id} exp={exp} index={index} />
          ) : (
            <SingleRoleCard key={exp.id} exp={exp} index={index} />
          )
        )}
      </div>
    </section>
  );
};

export default Experience;
