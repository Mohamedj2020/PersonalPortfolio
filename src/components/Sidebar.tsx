import React, { useEffect, useState } from 'react';
import { personalData } from '../data';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#github-activity', label: 'GitHub' },
  { href: '#skills', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const resumeUrl = personalData.resumeUrl;

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <div className="mt-8 flex items-start gap-5">
          <img
            src={personalData.profileImage}
            alt={personalData.name}
            className="profile-glow h-20 w-20 shrink-0 rounded-[28px] object-cover bg-black ring-1 ring-red-500/20"
          />

          <div className="pt-1">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl">
              {personalData.name}
            </h1>
            <p className="mt-2 text-base text-stone-300">{personalData.title}</p>
          </div>
        </div>

        <p className="mt-8 max-w-xl text-[15px] leading-8 text-stone-300">
          I study computer science at Ohio State and like building software that is practical,
          reliable, and easy to maintain. Most of my recent work has been around full-stack apps,
          backend systems, and developer tooling.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[28px] border border-red-500/12 bg-[rgba(17,10,10,0.72)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <p className="font-mono text-xs text-red-200/70">Current</p>
            <h2 className="mt-3 text-xl font-semibold leading-7 text-stone-50">{personalData.currentRole}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              Right now I&apos;m focused on learning how strong engineering teams build reliable
              software and ship clean product work at scale.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/6 bg-black/35 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <p className="font-mono text-xs text-stone-500">Previous</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-stone-300">
              {personalData.previousRoles.map((role, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="btn-gradient inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(122,12,24,0.3)] transition-transform hover:-translate-y-0.5"
          >
            Contact me
          </a>
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center rounded-full border border-red-500/18 bg-black/30 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-stone-50"
          >
            Resume
          </a>
        </div>

        <nav className="mt-14 hidden lg:block">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-active-indicator group flex w-fit items-center text-sm transition-all duration-300 ${
                    activeSection === item.href
                      ? 'active translate-x-1 text-stone-50'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span
                    className={`mr-3 inline-block h-px transition-all duration-300 ${
                      activeSection === item.href
                        ? 'w-10 bg-gradient-to-r from-red-300 to-red-600'
                        : 'w-5 bg-stone-700 group-hover:w-8 group-hover:bg-stone-400'
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex gap-4">
          <a
            href={personalData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-red-500/15 bg-black/35 text-stone-400 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-stone-50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={personalData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-red-500/15 bg-black/35 text-stone-400 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-stone-50"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={`mailto:${personalData.email}`}
            aria-label="Email"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-red-500/15 bg-black/35 text-stone-400 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-stone-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
