import React, { useState } from 'react';
import { skillsData, courseworkData, certificationsData, leadershipData } from '../data';

const colorMap = {
  blue: {
    bg: 'bg-red-500/10',
    text: 'text-red-100/90',
    ring: 'ring-red-500/12',
    hover: 'hover:bg-red-500/12',
  },
  emerald: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-100/90',
    ring: 'ring-rose-500/12',
    hover: 'hover:bg-rose-500/12',
  },
  purple: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-100/90',
    ring: 'ring-orange-500/12',
    hover: 'hover:bg-orange-500/12',
  },
  rose: {
    bg: 'bg-red-950/80',
    text: 'text-red-50',
    ring: 'ring-red-400/12',
    hover: 'hover:bg-red-900/70',
  },
  amber: {
    bg: 'bg-stone-800/75',
    text: 'text-stone-200',
    ring: 'ring-stone-700/70',
    hover: 'hover:bg-stone-700/80',
  },
};

type CredentialTab = 'coursework' | 'certs' | 'leadership';

const credentialTabs: { key: CredentialTab; label: string }[] = [
  { key: 'coursework', label: 'Coursework' },
  { key: 'certs', label: 'Certifications' },
  { key: 'leadership', label: 'Leadership' },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState<CredentialTab>('coursework');

  return (
    <section id="skills" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">Stack & Credentials</span>
      </h2>

      {Object.values(skillsData).map((category, idx) => {
        const colors = colorMap[category.color];

        return (
          <div key={category.label} className="mb-8 scroll-fade" style={{ transitionDelay: `${idx * 100}ms` }}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-serif text-3xl text-stone-50">{category.label}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-red-500/25 to-transparent" />
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {category.items.map((skill) => (
                <li
                  key={skill}
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${colors.bg} ${colors.text} ${colors.ring} ${colors.hover}`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <div className="mt-12 scroll-fade rounded-[32px] border border-white/6 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm" style={{ transitionDelay: '500ms' }}>
        <div className="mb-6 flex flex-wrap gap-2 border-b border-red-500/10 pb-4">
          {credentialTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'bg-red-500/12 text-stone-50 ring-1 ring-inset ring-red-500/18'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div key={activeTab} className="animate-tab-fade">
          {activeTab === 'coursework' && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {courseworkData.map((course) => (
                <div
                  key={course}
                  className="rounded-2xl border border-white/6 bg-[rgba(18,10,10,0.68)] px-3 py-3 text-center text-sm text-stone-300 transition-colors hover:border-red-400/14 hover:text-stone-100"
                >
                  {course}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="space-y-4">
              {certificationsData.map((cert, i) => (
                <div key={i} className="rounded-[24px] border border-white/6 bg-[rgba(18,10,10,0.68)] p-5">
                  <h4 className="font-serif text-2xl text-stone-50">{cert.title}</h4>
                  <p className="mt-2 text-sm text-stone-400">{cert.issuer}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-red-200/65">{cert.date}</p>

                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-100/90 transition-colors hover:text-stone-50"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Show credential
                    </a>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-red-500/12 bg-red-500/10 px-2.5 py-1 text-[11px] text-red-50/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="space-y-4">
              {leadershipData.map((item, i) => (
                <div key={i} className="rounded-[24px] border border-white/6 bg-[rgba(18,10,10,0.68)] p-5">
                  <h4 className="font-serif text-2xl text-stone-50">{item.role}</h4>
                  <p className="mt-2 text-sm text-stone-400">{item.organization}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-red-200/65">{item.period}</p>
                  <p className="mt-4 text-sm leading-7 text-stone-400">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
