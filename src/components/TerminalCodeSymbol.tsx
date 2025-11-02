import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TechIcon {
  name: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'emoji' | 'text';
  rotation: number;
}

const initialTechStack: TechIcon[] = [
  { name: 'React', icon: '⚛️', color: 'text-blue-400', x: 50, y: 50, vx: 1, vy: 0.8, size: 45, type: 'emoji', rotation: 0 },
  { name: 'TypeScript', icon: 'TS', color: 'text-blue-500 bg-blue-500/20 px-2 py-1 rounded font-bold border border-blue-500/30', x: 200, y: 100, vx: -0.9, vy: 1, size: 45, type: 'text', rotation: 0 },
  { name: 'JavaScript', icon: 'JS', color: 'text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded font-bold border border-yellow-400/30', x: 150, y: 150, vx: 0.8, vy: -0.9, size: 45, type: 'text', rotation: 0 },
  { name: 'Python', icon: '🐍', color: 'text-yellow-300', x: 100, y: 80, vx: -1, vy: -0.8, size: 45, type: 'emoji', rotation: 0 },
  { name: 'Java', icon: '☕', color: 'text-orange-500', x: 250, y: 120, vx: 0.9, vy: 0.9, size: 45, type: 'emoji', rotation: 0 },
  { name: 'Node.js', icon: '📗', color: 'text-green-500', x: 80, y: 180, vx: 1.1, vy: -0.9, size: 45, type: 'emoji', rotation: 0 },
  { name: 'VS Code', icon: '💻', color: 'text-blue-600', x: 180, y: 60, vx: -0.8, vy: 1, size: 45, type: 'emoji', rotation: 0 },
  { name: 'Git', icon: '🔀', color: 'text-orange-600', x: 130, y: 140, vx: 1, vy: -1, size: 45, type: 'emoji', rotation: 0 },
];

const TerminalCodeSymbol = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickedTech, setClickedTech] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(1);
  const [showRedHint, setShowRedHint] = useState(false);
  const [showYellowHint, setShowYellowHint] = useState(false);
  const [showGreenHint, setShowGreenHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const maxSpeedLevel = 5;
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [techStack, setTechStack] = useState<TechIcon[]>(initialTechStack);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resetTerminal = useCallback(() => {
    setTechStack(initialTechStack);
    setScore(0);
    setCombo(0);
    setShowCombo(false);
    setClickedTech(null);
    setIsPaused(false);
    setSpeedLevel(1);
    setInput('> System reset... ✓');
    setTimeout(() => setInput(''), 1500);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
    setInput(prev => prev ? '> Resumed ▶' : '> Paused ⏸');
    setTimeout(() => setInput(''), 1000);
  }, []);

  const speedUp = useCallback(() => {
    setSpeedLevel(prev => {
      if (prev >= maxSpeedLevel) {
        setInput('> Max speed reached! 🔥');
        setTimeout(() => setInput(''), 1500);
        return prev;
      }

      setTechStack(current => current.map(tech => ({
        ...tech,
        vx: tech.vx * 1.25,
        vy: tech.vy * 1.25,
      })));
      
      const newLevel = prev + 1;
      setInput(`> Speed boost! Level ${newLevel}/${maxSpeedLevel} ⚡`);
      setTimeout(() => setInput(''), 1500);
      return newLevel;
    });
  }, [maxSpeedLevel]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        resetTerminal();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePause();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        speedUp();
      } else if (e.key === 'Escape') {
        setIsPaused(true);
        setInput('> Paused (ESC)');
        setTimeout(() => setInput(''), 1000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [resetTerminal, togglePause, speedUp]);

  // Simplified animation for mobile
  useEffect(() => {
    const animate = () => {
      if (!terminalContentRef.current || isPaused) return;
      
      const rect = terminalContentRef.current.getBoundingClientRect();
      const contentWidth = rect.width;
      const contentHeight = rect.height;
      const padding = 12;

      setTechStack(prev => prev.map(tech => {
        let newX = tech.x + tech.vx;
        let newY = tech.y + tech.vy;
        let newVx = tech.vx;
        let newVy = tech.vy;
        // Minimal rotation on mobile
        let newRotation = isMobile 
          ? tech.rotation + 1
          : tech.rotation + (Math.abs(tech.vx) + Math.abs(tech.vy)) * 0.5;

        if (newX <= padding || newX >= contentWidth - tech.size - padding) {
          newVx = -tech.vx;
          newX = newX <= padding ? padding : contentWidth - tech.size - padding;
        }
        
        if (newY <= padding || newY >= contentHeight - tech.size - padding) {
          newVy = -tech.vy;
          newY = newY <= padding ? padding : contentHeight - tech.size - padding;
        }

        return {
          ...tech,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          rotation: newRotation % 360,
        };
      }));
    };

    // Lower FPS on mobile for better performance
    const fps = isMobile ? 24 : 60;
    const intervalId = setInterval(animate, 1000 / fps);
    return () => clearInterval(intervalId);
  }, [isPaused, isMobile]);

  const handleTechClick = (techName: string) => {
    const newCombo = combo + 1;
    setCombo(newCombo);
    setShowCombo(true);
    
    if (comboTimerRef.current) {
      clearTimeout(comboTimerRef.current);
    }
    
    comboTimerRef.current = setTimeout(() => {
      setCombo(0);
      setShowCombo(false);
    }, 2000);

    setClickedTech(techName);
    setInput(`> skills --show ${techName}`);
    
    const points = 10 * (newCombo > 1 ? newCombo : 1);
    setScore(prev => prev + points);
    
    setTechStack(prev => prev.map(tech => 
      tech.name === techName 
        ? { ...tech, vx: tech.vx * 1.5, vy: tech.vy * 1.5 }
        : tech
    ));
    setTimeout(() => {
      setClickedTech(null);
      setInput('');
      setTechStack(prev => prev.map(tech => 
        tech.name === techName 
          ? { ...tech, vx: tech.vx / 1.5, vy: tech.vy / 1.5 }
          : tech
      ));
    }, 1500);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: '450px' }}
    >
      {/* Simplified Combo Display - No bounce animation on mobile */}
      {showCombo && combo > 1 && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 ${!isMobile && 'animate-bounce'}`}>
          <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold shadow-lg text-sm md:text-base ${
            combo >= 10 ? 'md:text-xl border-2 border-yellow-400' : ''
          }`}>
            🔥 {combo >= 10 ? 'MEGA ' : ''}COMBO x{combo}!
          </div>
        </div>
      )}

      {/* Button Hints - Desktop only */}
      {!isMobile && showRedHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-red-500/90 text-white px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🔴 Reset (Press R)
          </div>
        </div>
      )}
      {!isMobile && showYellowHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-yellow-500/90 text-gray-900 px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🟡 Pause (Press Space)
          </div>
        </div>
      )}
      {!isMobile && showGreenHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-green-500/90 text-white px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🟢 Speed: {speedLevel}/{maxSpeedLevel} (Press ↑)
          </div>
        </div>
      )}

      <div 
        className={`relative w-72 md:w-96 lg:w-[450px] bg-gray-900 rounded-lg shadow-2xl border transition-all duration-500 ${
          isHovered ? 'scale-105 shadow-teal-500/50 border-teal-400/50' : 'border-gray-700'
        }`}
      >
        <div className="flex items-center justify-between h-9 md:h-10 px-3 md:px-4 bg-gray-800 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div 
              className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500 hover:bg-red-400 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg shadow-red-500/50"
              onClick={resetTerminal}
              onMouseEnter={() => !isMobile && setShowRedHint(true)}
              onMouseLeave={() => setShowRedHint(false)}
            ></div>
            <div 
              className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg shadow-yellow-500/50"
              onClick={togglePause}
              onMouseEnter={() => !isMobile && setShowYellowHint(true)}
              onMouseLeave={() => setShowYellowHint(false)}
            ></div>
            <div 
              className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg ${
                speedLevel >= maxSpeedLevel 
                  ? 'bg-green-800 cursor-not-allowed shadow-green-800/50' 
                  : 'bg-green-500 hover:bg-green-400 shadow-green-500/50'
              }`}
              onClick={speedUp}
              onMouseEnter={() => !isMobile && setShowGreenHint(true)}
              onMouseLeave={() => setShowGreenHint(false)}
            ></div>
            <span className="ml-1.5 md:ml-2 text-[10px] md:text-xs text-gray-400">~/mohamed</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono">
            <div className="text-purple-400 transition-all hover:scale-105" title="Total Experience Points">
              XP: <span className="font-bold">{score}</span>
            </div>
            {isPaused && (
              <div className="text-orange-400 animate-pulse">⏸</div>
            )}
          </div>
        </div>

        <div 
          ref={terminalContentRef}
          className="relative p-3 md:p-4 h-64 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-900/80"
        >
          {/* Tech Stack Icons - Simplified for mobile */}
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={`absolute cursor-pointer z-20 active:scale-95 ${!isMobile && 'transition-transform duration-100 hover:scale-125'}`}
              style={{
                left: `${tech.x}px`,
                top: `${tech.y}px`,
                maxWidth: `${tech.size}px`,
                minWidth: `${tech.size}px`,
                transform: isMobile ? 'none' : `rotate(${tech.rotation}deg)`,
                willChange: 'transform',
              }}
              onClick={() => handleTechClick(tech.name)}
            >
              <div className="relative group">
                <div 
                  className={`${tech.type === 'text' ? 'text-xs md:text-sm lg:text-base' : 'text-xl md:text-2xl lg:text-3xl'} ${tech.color} ${!isMobile && 'drop-shadow-2xl filter hover:brightness-125 transition-all'} select-none flex items-center justify-center ${
                    clickedTech === tech.name ? 'scale-150 animate-pulse' : ''
                  }`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {tech.icon}
                </div>
                {/* Tooltip - Desktop only */}
                {!isMobile && (
                  <div className="hidden md:block absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30 pointer-events-none border border-teal-400/50 shadow-lg">
                    <div className="font-semibold">{tech.name}</div>
                    <div className="text-teal-400 text-[10px]">
                      {combo > 0 ? `+${10 * (combo + 1)} XP (x${combo + 1} Combo!)` : '+10 XP'}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800/95"></div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="relative z-10 pointer-events-none px-1 md:px-2">
            <div className="flex items-center mb-2 md:mb-3">
              <span className="text-teal-400 mr-1.5 md:mr-2 text-xs md:text-sm">&gt;</span>
              <div className="flex-1 text-[10px] md:text-xs lg:text-sm">
                {input || (
                  <span className="text-gray-500">
                    whoami
                  </span>
                )}
                <span className="inline-block w-1 h-2.5 md:w-1.5 md:h-3 lg:w-2 lg:h-4 ml-1 bg-teal-400 animate-blink"></span>
              </div>
            </div>

            {!clickedTech && !input && (
              <div className="space-y-1.5 md:space-y-2 text-[10px] md:text-xs lg:text-sm">
                <div className="text-gray-400">
                  <span className="text-green-400">&gt;</span> Mohamed Jirac
                </div>
                <div className="text-gray-400">
                  <span className="text-green-400">&gt;</span> Software Engineer
                </div>
                <div className="text-gray-400">
                  <span className="text-green-400">&gt;</span> Full Stack Developer
                </div>
                <div className="text-gray-500 text-[9px] md:text-[10px] lg:text-xs mt-3 md:mt-4 space-y-0.5 md:space-y-1 italic">
                  <div>💡 Click bouncing icons</div>
                  <div>🔥 Chain for combos</div>
                </div>
              </div>
            )}

            {clickedTech && (
              <div className="space-y-1.5 md:space-y-2 text-[10px] md:text-xs lg:text-sm">
                <div className="text-teal-400 animate-slideDown">
                  <span className="text-green-400">&gt;</span> Loading {clickedTech}...
                </div>
                <div className="text-teal-300 animate-slideDown" style={{ animationDelay: '0.1s' }}>
                  <span className="text-green-400">&gt;</span> ✓ {clickedTech} initialized
                </div>
                <div className="text-purple-400 animate-slideDown font-bold" style={{ animationDelay: '0.2s' }}>
                  <span className="text-green-400">&gt;</span> +{10 * (combo > 1 ? combo : 1)} XP {combo > 1 ? `(x${combo} COMBO!)` : ''} 🚀
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simplified glow - No blur on mobile */}
      <div className={`absolute inset-0 ${isMobile ? 'bg-teal-500/5' : 'bg-teal-500/5 blur-3xl'} rounded-full transition-all duration-500 -z-10 ${
        isHovered ? 'scale-110 bg-teal-400/10' : 'scale-90'
      }`}></div>
    </div>
  );
};

export default TerminalCodeSymbol;
