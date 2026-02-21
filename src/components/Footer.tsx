import React from 'react';
import { personalData } from '../data';

const Footer = () => (
  <footer className="mt-20 lg:mt-32 pb-12 scroll-fade">
    <div className="h-px w-full bg-zinc-800/80 mb-6"></div>

    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">Designed and developed by {personalData.name}.</p>
      <span className="text-sm text-zinc-500">v2.0.0</span>
    </div>
  </footer>
);

export default Footer;