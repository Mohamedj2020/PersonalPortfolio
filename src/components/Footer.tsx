import React from 'react';
import { personalData } from '../data';

const Footer = () => (
  <footer className="scroll-fade mt-20 pb-12 lg:mt-32">
    <div className="mb-6 h-px w-full bg-gradient-to-r from-red-500/35 via-red-500/10 to-transparent" />

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-stone-500">Designed and developed by {personalData.name}.</p>
      <span className="text-sm uppercase tracking-[0.2em] text-red-200/60">Forge edition</span>
    </div>
  </footer>
);

export default Footer;
