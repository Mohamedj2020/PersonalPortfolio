import React, { useEffect, useRef, useState, useCallback } from 'react';
import createGlobe from 'cobe';
import { useSpring } from '@react-spring/web';

/**
 * Globe component
 *
 * Renders an interactive 3D globe visualization using the cobe library.
 * - Displays colored markers for various programming languages at their origin locations.
 * - Allows users to drag to rotate the globe interactively.
 * - Clicking a marker focuses the globe on that language's location.
 *
 * Props: None currently.
 *
 * Key behaviors:
 * - Interactive dragging to rotate the globe.
 * - Animated focusing on selected language locations.
 * - Renders colored markers for each language.
 */
const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<[number, number]>([0, 0]);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const phiRef = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
      precision: 0.001,
    },
  }));

  const locationToAngles = (lat: number, long: number): [number, number] => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
  };

  // Programming languages with their origin locations and colors
  const languages = [
    { name: 'Python', icon: '🐍', location: [52.3676, 4.9041] as [number, number], color: [0.22, 0.46, 0.67] },
    { name: 'JavaScript', icon: '⚡', location: [37.7749, -122.4194] as [number, number], color: [0.97, 0.87, 0.12] },
    { name: 'TypeScript', icon: '🔷', location: [47.6062, -122.3321] as [number, number], color: [0.19, 0.47, 0.78] },
    { name: 'React', icon: '⚛️', location: [37.4849, -122.1483] as [number, number], color: [0.38, 0.85, 0.98] },
    { name: 'Java', icon: '☕', location: [37.3861, -122.0839] as [number, number], color: [0.93, 0.55, 0] },
    { name: 'C++', icon: '⚙️', location: [55.6761, 12.5683] as [number, number], color: [0, 0.35, 0.61] },
    { name: 'Ruby', icon: '💎', location: [35.6762, 139.6503] as [number, number], color: [0.8, 0.2, 0.18] },
    { name: 'Go', icon: '🐹', location: [37.422, -122.084] as [number, number], color: [0, 0.68, 0.85] },
    { name: 'Rust', icon: '🦀', location: [37.3875, -122.0575] as [number, number], color: [0.87, 0.65, 0.52] },
    { name: 'Swift', icon: '🍎', location: [37.3346, -122.0090] as [number, number], color: [0.98, 0.45, 0.26] },
  ];

  // Create multiple globes to show different colored markers
  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0.3;
    const doublePi = Math.PI * 2;
    const globes: ReturnType<typeof createGlobe>[] = [];

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    if (canvasRef.current) {
      // Create base globe
      const baseGlobe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 3,
        mapSamples: 16000,
        mapBrightness: 1.2,
        baseColor: [0.2, 0.6, 0.55],
        markerColor: [0.9, 0.3, 0.5],
        glowColor: [0.2, 0.8, 0.7],
        markers: [
          // Python - Blue
          { location: [52.3676, 4.9041], size: 0.08 },
          // JavaScript - Yellow  
          { location: [37.7749, -122.4194], size: 0.08 },
          // TypeScript - Blue
          { location: [47.6062, -122.3321], size: 0.06 },
          // React - Cyan
          { location: [37.4849, -122.1483], size: 0.07 },
          // Java - Orange
          { location: [37.3861, -122.0839], size: 0.06 },
          // C++ - Dark Blue
          { location: [55.6761, 12.5683], size: 0.08 },
          // Ruby - Red
          { location: [35.6762, 139.6503], size: 0.08 },
          // Go - Cyan
          { location: [37.422, -122.084], size: 0.05 },
          // Rust - Orange
          { location: [37.3875, -122.0575], size: 0.05 },
          // Swift - Orange
          { location: [37.3346, -122.0090], size: 0.05 },
        ],
        onRender: (state) => {
          const [focusPhi, focusTheta] = focusRef.current;
          
          // If dragging, use drag position with speed limit
          if (pointerInteracting.current !== null) {
            const dragValue = r.get();
            // Limit drag speed
            const limitedDrag = Math.max(-0.5, Math.min(0.5, dragValue));
            currentPhi += limitedDrag * 0.02;
            state.phi = currentPhi;
            state.theta = currentTheta;
          }
          // If focusing on a language
          else if (focusPhi !== 0 || focusTheta !== 0) {
            const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
            const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
            
            if (distPositive < distNegative) {
              currentPhi += distPositive * 0.08;
            } else {
              currentPhi -= distNegative * 0.08;
            }
            currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
            state.phi = currentPhi;
            state.theta = currentTheta;
          }
          // Auto-rotate slowly
          else {
            currentPhi += 0.003;
            state.phi = currentPhi;
            state.theta = currentTheta;
          }
          
          phiRef.current = currentPhi;
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      globes.push(baseGlobe);

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = '1';
        }
      }, 100);
    }

    return () => {
      globes.forEach(g => g.destroy());
      window.removeEventListener('resize', onResize);
    };
  }, [r]);

  const handleLanguageClick = useCallback((lang: typeof languages[0]) => {
    focusRef.current = locationToAngles(lang.location[0], lang.location[1]);
    setSelectedLang(lang.name);
    
    // Reset to auto-rotate after 3 seconds
    setTimeout(() => {
      focusRef.current = [0, 0];
      setSelectedLang(null);
    }, 3000);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerInteracting.current = null;
    pointerInteractionMovement.current = 0;
    api.start({ r: 0 });
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  }, [api]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      // Limit the delta value
      const limitedDelta = Math.max(-100, Math.min(100, delta));
      pointerInteractionMovement.current = limitedDelta;
      api.start({ r: limitedDelta / 200 });
    }
  }, [api]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting.current;
      // Limit the delta value
      const limitedDelta = Math.max(-100, Math.min(100, delta));
      pointerInteractionMovement.current = limitedDelta;
      api.start({ r: limitedDelta / 100 });
    }
  }, [api]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        margin: 'auto',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{
          width: '100%',
          aspectRatio: '1',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
          cursor: 'grab',
        }}
      />
      
      {/* Selected Language Label */}
      {selectedLang && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-teal-400 px-4 py-2 rounded-full text-sm font-bold border border-teal-400/50 animate-pulse">
          📍 {selectedLang}
        </div>
      )}
      
      {/* Language Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 mt-2">
        <span className="text-gray-400 text-xs w-full text-center mb-1">Click to explore origins:</span>
        {languages.map((lang) => (
          <button
            key={lang.name}
            onClick={() => handleLanguageClick(lang)}
            className={`flex items-center gap-1 px-2 py-1 bg-gray-800/80 hover:bg-teal-600/50 border rounded-full text-xs text-white transition-all duration-300 hover:scale-105 ${
              selectedLang === lang.name 
                ? 'border-teal-400 bg-teal-600/50 scale-105' 
                : 'border-gray-700 hover:border-teal-400'
            }`}
            style={{
              boxShadow: selectedLang === lang.name 
                ? `0 0 12px rgba(${lang.color[0] * 255}, ${lang.color[1] * 255}, ${lang.color[2] * 255}, 0.8)` 
                : 'none',
              borderColor: selectedLang === lang.name 
                ? `rgb(${lang.color[0] * 255}, ${lang.color[1] * 255}, ${lang.color[2] * 255})` 
                : undefined
            }}
          >
            <span>{lang.icon}</span>
            <span className="hidden sm:inline">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Globe;