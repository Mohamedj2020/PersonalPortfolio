import React, { useEffect, useRef } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Sidebar';
import Experience from './components/Work';
import ProjectsNew from './components/ProjectsNew';
import About from './components/About';
import Skills from './components/Skills';
import ContactNew from './components/ContactNew';
import Footer from './components/Footer';
import GitHubActivity from './components/GitHubActivity';

function App() {
  const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-fade');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = sceneCanvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const palette = {
      bg: [13, 17, 23],
      deepRed: [122, 12, 24],
      red: [193, 18, 31],
      glow: [236, 96, 108],
    };

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    const lerpRgb = (from: number[], to: number[], t: number) => [
      lerp(from[0], to[0], t),
      lerp(from[1], to[1], t),
      lerp(from[2], to[2], t),
    ];

    const bayer4 = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ].map((row) => row.map((value) => (value + 0.5) / 16));

    const cloudSeeds = [
      { fx: 0.0032, fy: 0.0075, phaseX: 0.6, phaseY: 2.2, amp: 1 },
      { fx: 0.007, fy: 0.004, phaseX: 3.1, phaseY: 0.9, amp: 0.5 },
      { fx: 0.014, fy: 0.016, phaseX: 5.2, phaseY: 4, amp: 0.28 },
      { fx: 0.03, fy: 0.026, phaseX: 1.8, phaseY: 3.6, amp: 0.13 },
    ];

    const noise = (x: number, y: number) => {
      let value = 0;
      cloudSeeds.forEach((seed) => {
        value += Math.sin(x * seed.fx + seed.phaseX) * Math.cos(y * seed.fy + seed.phaseY) * seed.amp;
      });
      return value;
    };

    const warpedNoise = (x: number, y: number) => {
      const warpX = Math.sin(x * 0.006 + y * 0.004) * 60;
      const warpY = Math.cos(x * 0.004 - y * 0.007) * 60;
      return noise(x + warpX, y + warpY);
    };

    let animationFrame = 0;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      context.fillStyle = 'rgb(13, 17, 23)';
      context.fillRect(0, 0, width, height);

      const bandCenterY = height * 0.34;
      const bandHeight = height * 0.34;
      const bandAngle = -0.12;
      const hotspots = [
        { xr: 0.2, yr: 0.4, r: Math.min(width, height) * 0.16 },
        { xr: 0.55, yr: 0.27, r: Math.min(width, height) * 0.13 },
        { xr: 0.9, yr: 0.43, r: Math.min(width, height) * 0.14 },
      ];

      const cell = 5;

      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const relativeX = x - width * 0.5;
          const wave = Math.sin(x * 0.0022 + 1.4) * 40 + Math.sin(x * 0.006 + 3.1) * 16;
          const bandY = bandCenterY + relativeX * Math.tan(bandAngle) + wave;
          const distFromBand = Math.abs(y - bandY);
          const bandFalloff = Math.max(0, 1 - distFromBand / bandHeight);
          const bandEnvelope = Math.pow(bandFalloff, 1.4);

          let density = warpedNoise(x, y);
          density = (density + 1.8) / 3.6;
          density = Math.max(0, Math.min(1, density));
          density *= bandEnvelope;

          let hot = 0;
          hotspots.forEach((hotspot) => {
            const centerX = hotspot.xr * width;
            const centerY = hotspot.yr * height;
            const distance = Math.hypot(x - centerX, y - centerY);
            const falloff = Math.max(0, 1 - distance / hotspot.r);
            const core = Math.max(0, 1 - distance / (hotspot.r * 0.35));
            hot = Math.max(hot, falloff * falloff * 0.6 + core * core * core * 0.4);
          });

          density = Math.max(density, hot);
          density = Math.min(1, density * 1.6);

          const threshold = bayer4[(y / cell) % 4][(x / cell) % 4];
          if (density < threshold * 0.55) {
            continue;
          }

          let color = palette.bg;
          if (hot > 0.35) {
            color = lerpRgb(palette.deepRed, palette.glow, Math.min(1, (hot - 0.35) * 1.25));
          } else if (density > 0.4) {
            color = lerpRgb(palette.deepRed, palette.red, ((density - 0.4) / 0.6) * 0.65);
          } else {
            color = lerpRgb(palette.bg, palette.red, density / 0.4);
          }

          const jitter = 0.6;
          const jitterX = x + (Math.random() - 0.5) * cell * jitter;
          const jitterY = y + (Math.random() - 0.5) * cell * jitter;
          const size = 0.7 + density * 1.7;
          const alpha = Math.min(0.95, 0.42 + density * 0.42);

          context.fillStyle = `rgba(${color[0] | 0}, ${color[1] | 0}, ${color[2] | 0}, ${alpha.toFixed(2)})`;
          context.fillRect(jitterX, jitterY, size, size);
        }
      }

      const starCount = Math.floor((width * height) / 5500);
      for (let index = 0; index < starCount; index += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 0.9 + 0.2;
        const alpha = Math.random() * 0.4 + 0.1;
        const isRed = Math.random() < 0.06;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = isRed
          ? `rgba(193, 18, 31, ${alpha + 0.3})`
          : `rgba(125, 133, 144, ${alpha})`;
        context.fill();
      }
    };

    const handleResize = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(render);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="nebula-shell text-stone-300 antialiased selection:bg-red-500/20 selection:text-red-50">
      <div className="nebula-surface" aria-hidden="true">
        <canvas ref={sceneCanvasRef} className="nebula-scene-canvas" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-[1580px] px-6 py-12 md:px-10 md:py-20 xl:px-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-20 xl:gap-24">
          <Sidebar />
          <main id="content" className="pt-16 lg:w-[63%] lg:py-24 xl:w-[65%]">
            <About />
            <GitHubActivity />
            <Experience />
            <ProjectsNew />
            <Skills />
            <ContactNew />
            <Footer />
          </main>
        </div>
      </div>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
