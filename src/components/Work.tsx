import React, { useState } from 'react';
import { experiencesData } from '../data';

const OrgLogo = ({ exp }: { exp: typeof experiencesData[number] }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-zinc-700/50">
      {exp.logo && !imgError ? (
        <img
          src={exp.logo}
          alt={exp.organization}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-[11px] font-semibold text-zinc-400 select-none">
          {exp.logoInitial}
        </span>
      )}
    </div>
  );
};

/* ── Single-role experience card (existing style) ── */
const SingleRoleCard = ({ exp, index }: { exp: typeof experiencesData[number]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="scroll-fade rounded-lg border border-zinc-800/60 bg-zinc-900/30 transition-colors duration-200 hover:border-zinc-700/60"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-start gap-4 p-4 text-left cursor-pointer"
      >
        <OrgLogo exp={exp} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className="text-base font-medium text-white">{exp.title}</h3>
            <span className="text-sm text-zinc-500 shrink-0">{exp.period}</span>
          </div>
          <p className="text-sm text-zinc-400 mt-0.5">{exp.organization}</p>
        </div>
        <svg
          className={`h-5 w-5 text-zinc-500 shrink-0 mt-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-5 pt-0">
          <div className="h-px w-full bg-zinc-800/60 mb-4" />
          <p className="text-sm leading-relaxed text-zinc-400">{exp.description}</p>

          {exp.highlights.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-emerald-400/90 mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Key Highlights
              </h4>
              <div className="flex flex-col gap-2">
                {exp.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md bg-zinc-800/40 px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70 shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exp.skills.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-emerald-400/90 mb-3 flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Technologies Used
              </h4>
              <ul className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <li key={skill} className="inline-flex items-center rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
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

/* ── Multi-role card (LinkedIn-style grouped roles under one org) ── */
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
      className="scroll-fade rounded-lg border border-zinc-800/60 bg-zinc-900/30 transition-colors duration-200 hover:border-zinc-700/60"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Org header — clickable to expand/collapse roles */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 p-4 text-left cursor-pointer"
      >
        <OrgLogo exp={exp} />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-white">{exp.organization}</h3>
          <p className="text-sm text-zinc-500">{exp.period}</p>
        </div>
        <svg
          className={`h-5 w-5 text-zinc-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Collapsible role list */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-0">
          <div className="h-px w-full bg-zinc-800/60 mb-4" />
          {roles.map((role, i) => (
            <div key={i} className="relative pl-6 pb-4 last:pb-0">
              {/* Timeline connector */}
              {i < roles.length - 1 && (
                <div className="absolute left-[7px] top-[10px] bottom-0 w-[2px] bg-zinc-800/80" />
              )}
              <div className="absolute left-0 top-[6px] h-[14px] w-[14px] rounded-full border-2 border-zinc-700 bg-zinc-900" />

              <button
                onClick={() => toggleRole(i)}
                className="w-full text-left cursor-pointer flex items-start justify-between gap-2"
              >
                <div>
                  <p className="text-sm font-medium text-white">{role.title}</p>
                  <p className="text-xs text-zinc-500">{role.type}</p>
                  <p className="text-xs text-zinc-500">{role.period}</p>
                  {role.location && <p className="text-xs text-zinc-600">{role.location}</p>}
                </div>
                <svg
                  className={`h-4 w-4 text-zinc-500 shrink-0 mt-1 transition-transform duration-200 ${openRoles[i] ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openRoles[i] ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                {role.description && (
                  <p className="text-sm leading-relaxed text-zinc-400 mb-3">{role.description}</p>
                )}

                {role.highlights.length > 0 && (
                  <div className="flex flex-col gap-1.5 mb-3">
                    {role.highlights.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70 shrink-0 mt-1.5" />
                        <span className="text-sm text-zinc-300">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {role.skills.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <li key={skill} className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
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
      <h2 className="mb-10 text-xl font-medium tracking-tight text-white scroll-fade">
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
