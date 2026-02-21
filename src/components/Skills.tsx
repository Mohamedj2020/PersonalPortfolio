import React, { useState } from 'react';
import { skillsData, courseworkData, certificationsData, leadershipData } from '../data';

const colorMap = {
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    ring: 'ring-blue-500/20',
    hover: 'hover:bg-blue-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    ring: 'ring-emerald-500/20',
    hover: 'hover:bg-emerald-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    ring: 'ring-purple-500/20',
    hover: 'hover:bg-purple-500/20',
  },
  rose: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    ring: 'ring-rose-500/20',
    hover: 'hover:bg-rose-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    ring: 'ring-amber-500/20',
    hover: 'hover:bg-amber-500/20',
  },
};

type CredentialTab = 'coursework' | 'certs' | 'leadership';

const credentialTabs: { key: CredentialTab; label: string }[] = [
  { key: 'coursework', label: 'Coursework' },
  { key: 'certs', label: 'Certs' },
  { key: 'leadership', label: 'Leadership' },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState<CredentialTab>('coursework');

  return (
    <section id="skills" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-xl font-medium tracking-tight text-white scroll-fade">
        <span className="section-heading">Skills & Credentials</span>
      </h2>

      {/* ── Technical Skills ── */}
      {Object.values(skillsData).map((category, idx) => {
        const colors = colorMap[category.color];
        return (
          <div key={category.label} className="mb-8 scroll-fade" style={{ transitionDelay: `${idx * 100}ms` }}>
            <h3 className="mb-3 text-base text-zinc-200">{category.label}</h3>
            <div className="h-px w-full bg-zinc-800/80 mb-5"></div>
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

      {/* ── Credentials Tabs ── */}
      <div className="mt-12 scroll-fade" style={{ transitionDelay: '500ms' }}>
        <div className="flex gap-0 border-b border-zinc-800/80 mb-6">
          {credentialTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          ))}
        </div>

        <div key={activeTab} className="animate-tab-fade">
          {activeTab === 'coursework' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {courseworkData.map((course) => (
                <div
                  key={course}
                  className="rounded-md border border-zinc-800/60 bg-zinc-900/30 px-3 py-2.5 text-center text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300"
                >
                  {course}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="space-y-4">
              {certificationsData.map((cert, i) => (
                <div
                  key={i}
                  className="rounded-md border border-zinc-800/60 bg-zinc-900/30 p-4"
                >
                  <h4 className="text-sm font-medium text-white">{cert.title}</h4>
                  <p className="mt-1 text-xs text-zinc-400">{cert.issuer}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{cert.date}</p>

                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Show Credential
                    </a>
                  )}

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-zinc-800/60 px-2.5 py-0.5 text-[11px] text-zinc-400"
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
                <div
                  key={i}
                  className="rounded-md border border-zinc-800/60 bg-zinc-900/30 p-4"
                >
                  <h4 className="text-sm font-medium text-white">{item.role}</h4>
                  <p className="mt-1 text-xs text-zinc-400">{item.organization}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.period}</p>
                  <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
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
