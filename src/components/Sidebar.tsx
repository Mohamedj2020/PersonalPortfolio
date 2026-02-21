import React, { useState, useEffect, useMemo } from 'react';
import { personalData } from '../data';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('');

  // Typing animation state
  const roles = useMemo(() => ['Developer', 'Student', 'Designer', 'Creator', 'Problem Solver'], []);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Typing effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1);
        } else {
          return currentRole.substring(0, prev.length + 1);
        }
      });
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const resumeUrl = personalData.resumeUrl;

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Profile Section */}
        <div className="flex items-start gap-5 mb-8">
          <img
            src={personalData.profileImage}
            alt={personalData.name}
            className="h-16 w-16 shrink-0 rounded-full object-cover bg-white ring-1 ring-zinc-700/50"
          />
          <div className="mt-1">
            <h1 className="text-lg font-medium tracking-tight text-white">
              Hi, I'm {personalData.name}
            </h1>
          </div>
        </div>

        {/* Typing Animation */}
        <div className="mb-10">
          <p className="text-base text-zinc-400">
            I am a{' '}
            <span className="text-white font-medium">
              {currentText}
              <span className="animate-pulse text-zinc-500">|</span>
            </span>
          </p>
        </div>

        {/* Experience Summaries */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="flex items-center gap-1.5 text-sm font-medium text-white">
              Currently <span className="text-zinc-600">-</span>
            </h2>
            <p className="mt-2 text-base text-zinc-400">{personalData.currentRole}</p>
          </div>

          <div>
            <h2 className="flex items-center gap-1.5 text-sm font-medium text-white">
              Previously <span className="text-zinc-600">-</span>
            </h2>
            <ul className="mt-2 flex flex-col gap-1 text-base text-zinc-400">
              {personalData.previousRoles.map((role, i) => (
                <li key={i}>{role}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex gap-4">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Get in touch
          </a>
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            Download CV
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="mt-14 hidden lg:block">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-active-indicator group flex w-fit items-center text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href
                      ? 'active text-white translate-x-1'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span
                    className={`mr-3 inline-block h-px transition-all duration-300 ${
                      activeSection === item.href
                        ? 'w-8 bg-gradient-to-r from-emerald-500 to-blue-500'
                        : 'w-4 bg-zinc-600 group-hover:w-6 group-hover:bg-zinc-400'
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="mt-10 flex gap-5">
          <a
            href={personalData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 transition-colors hover:text-white"
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
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={`mailto:${personalData.email}`}
            aria-label="Email"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
