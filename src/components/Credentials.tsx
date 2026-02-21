import React, { useState, useRef, useEffect } from 'react';
import { courseworkData, certificationsData, leadershipData } from '../data';

type Tab = 'coursework' | 'certs' | 'leadership';

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'coursework', label: 'Coursework', icon: '📚' },
  { key: 'certs', label: 'Certifications', icon: '🏆' },
  { key: 'leadership', label: 'Leadership', icon: '🤝' },
];

/* ─── Coursework Grid ─────────────────────────────────── */
const CourseworkPanel = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {courseworkData.map((course, i) => (
      <div
        key={course}
        className="group relative overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-4 py-3 text-center text-sm text-zinc-300 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-800/50 hover:text-white cursor-default"
        style={{ animationDelay: `${i * 40}ms` }}
      >
        {/* subtle top accent on hover */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/60 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {course}
      </div>
    ))}
  </div>
);

/* ─── Certifications Cards ────────────────────────────── */
const CertificationsPanel = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {certificationsData.map((cert, i) => (
      <div
        key={i}
        className="group relative rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-zinc-800/40"
      >
        {/* left accent bar */}
        <div className="absolute left-0 inset-y-0 w-[3px] rounded-l-lg bg-gradient-to-b from-emerald-500/60 to-blue-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <h4 className="text-sm font-semibold text-white leading-snug">
          {cert.title}
        </h4>
        <p className="mt-1 text-xs text-emerald-400/80">{cert.issuer}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{cert.date}</p>

        {cert.credentialUrl && cert.credentialUrl !== '#' && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Show Credential
          </a>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 text-[11px] text-emerald-400/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ─── Leadership Cards ────────────────────────────────── */
const LeadershipPanel = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {leadershipData.map((item, i) => (
      <div
        key={i}
        className="group relative rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-emerald-500/20 hover:bg-zinc-800/40"
      >
        {/* top accent bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-lg bg-gradient-to-r from-emerald-500/50 via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <h4 className="text-sm font-semibold text-white">{item.role}</h4>
        <p className="mt-1 text-xs text-emerald-400/80">{item.organization}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{item.period}</p>
        <p className="mt-3 text-xs leading-relaxed text-zinc-400">
          {item.description}
        </p>
      </div>
    ))}
  </div>
);

/* ─── Main Credentials Component ──────────────────────── */
const Credentials = () => {
  const [activeTab, setActiveTab] = useState<Tab>('coursework');
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    coursework: null,
    certs: null,
    leadership: null,
  });
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Animated sliding indicator
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        setIndicatorStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    }
  }, [activeTab]);

  return (
    <section id="credentials" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-xl font-medium tracking-tight text-white scroll-fade">
        <span className="section-heading">Credentials</span>
      </h2>

      {/* Tab bar */}
      <div className="scroll-fade mb-8" style={{ transitionDelay: '100ms' }}>
        <div className="relative inline-flex gap-1 rounded-lg border border-zinc-800/60 bg-zinc-900/50 p-1">
          {/* Sliding background indicator */}
          <div
            className="absolute top-1 h-[calc(100%-8px)] rounded-md bg-zinc-800/80 transition-all duration-300 ease-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.key}
              ref={(el) => { tabRefs.current[tab.key] = el; }}
              onClick={() => setActiveTab(tab.key)}
              className={`relative z-10 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content with fade transition */}
      <div className="scroll-fade" style={{ transitionDelay: '200ms' }}>
        <div
          key={activeTab}
          className="animate-tab-fade"
        >
          {activeTab === 'coursework' && <CourseworkPanel />}
          {activeTab === 'certs' && <CertificationsPanel />}
          {activeTab === 'leadership' && <LeadershipPanel />}
        </div>
      </div>
    </section>
  );
};

export default Credentials;
