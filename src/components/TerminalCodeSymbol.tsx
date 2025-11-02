import React, { useState, useEffect, useRef } from 'react';

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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
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

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_click', title: 'First Click', description: 'Click your first icon', icon: '🎯', unlocked: false },
  { id: 'speed_demon', title: 'Speed Demon', description: 'Reach maximum speed', icon: '⚡', unlocked: false },
  { id: 'combo_master', title: 'Combo Master', description: 'Get a 5x combo', icon: '🔥', unlocked: false },
  { id: 'combo_god', title: 'Combo God', description: 'Get a 10x combo', icon: '👑', unlocked: false },
  { id: 'corner_hunter', title: 'Corner Hunter', description: 'Hit 10 corners', icon: '🎪', unlocked: false },
  { id: 'century', title: 'Century Club', description: 'Score 100 XP', icon: '💯', unlocked: false },
  { id: 'high_roller', title: 'High Roller', description: 'Score 500 XP', icon: '💎', unlocked: false },
  { id: 'ultimate', title: 'Ultimate Master', description: 'Score 1000 XP', icon: '🏆', unlocked: false },
];

const TerminalCodeSymbol = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickedTech, setClickedTech] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [cornerHits, setCornerHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(1);
  const [showRedHint, setShowRedHint] = useState(false);
  const [showYellowHint, setShowYellowHint] = useState(false);
  const [showGreenHint, setShowGreenHint] = useState(false);
  const [showBlueHint, setShowBlueHint] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [showAchievementPanel, setShowAchievementPanel] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const maxSpeedLevel = 5;
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [techStack, setTechStack] = useState<TechIcon[]>(initialTechStack);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check for achievements
  useEffect(() => {
    checkAchievements();
  }, [score, speedLevel, combo, cornerHits, maxCombo]);

  // Track high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const checkAchievements = () => {
    const newAchievements = [...achievements];
    let changed = false;

    // First click achievement
    if (score >= 10 && !newAchievements.find(a => a.id === 'first_click')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'first_click');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('🎯 First Click!');
        changed = true;
      }
    }

    // Speed demon
    if (speedLevel === 5 && !newAchievements.find(a => a.id === 'speed_demon')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'speed_demon');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('⚡ Speed Demon!');
        changed = true;
      }
    }

    // Combo master
    if (combo >= 5 && !newAchievements.find(a => a.id === 'combo_master')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'combo_master');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('🔥 Combo Master!');
        changed = true;
      }
    }

    // Corner hunter
    if (cornerHits >= 10 && !newAchievements.find(a => a.id === 'corner_hunter')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'corner_hunter');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('🎪 Corner Hunter!');
        changed = true;
      }
    }

    // Century
    if (score >= 100 && !newAchievements.find(a => a.id === 'century')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'century');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('💯 Century Club!');
        changed = true;
      }
    }

    // Combo God
    if (maxCombo >= 10 && !newAchievements.find(a => a.id === 'combo_god')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'combo_god');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('👑 Combo God!');
        changed = true;
      }
    }

    // High roller
    if (score >= 500 && !newAchievements.find(a => a.id === 'high_roller')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'high_roller');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('💎 High Roller!');
        changed = true;
      }
    }

    // Ultimate
    if (score >= 1000 && !newAchievements.find(a => a.id === 'ultimate')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'ultimate');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        unlockAchievement('🏆 Ultimate Master!');
        changed = true;
      }
    }

    if (changed) {
      setAchievements(newAchievements);
    }
  };

  const unlockAchievement = (message: string) => {
    setShowAchievement(message);
    setTimeout(() => setShowAchievement(null), 3000);
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Keyboard shortcuts
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
        if (showAchievementPanel) {
          setShowAchievementPanel(false);
        } else {
          setIsPaused(true);
          setInput('> Paused (ESC)');
          setTimeout(() => setInput(''), 1000);
        }
      } else if (e.key === 'a' || e.key === 'A') {
        toggleAchievementPanel();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [speedLevel, isPaused, showAchievementPanel]);

  const resetTerminal = () => {
    setTechStack(initialTechStack);
    setScore(0);
    setCornerHits(0);
    setCombo(0);
    setMaxCombo(0);
    setShowCombo(false);
    setClickedTech(null);
    setIsPaused(false);
    setSpeedLevel(1);
    setHighScore(0);
    // Reset achievements to initial state
    setAchievements(INITIAL_ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })));
    setInput('> System reset... ✓');
    setTimeout(() => setInput(''), 1500);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    setInput(!isPaused ? '> Paused ⏸' : '> Resumed ▶');
    setTimeout(() => setInput(''), 1000);
  };

  const toggleAchievementPanel = () => {
    setShowAchievementPanel(!showAchievementPanel);
    // Pause game when panel opens
    if (!showAchievementPanel) {
      setIsPaused(true);
    }
  };

  const speedUp = () => {
    if (speedLevel >= maxSpeedLevel) {
      setInput('> Max speed reached! 🔥');
      setTimeout(() => setInput(''), 1500);
      return;
    }

    setSpeedLevel(prev => prev + 1);
    setTechStack(prev => prev.map(tech => ({
      ...tech,
      vx: tech.vx * 1.25,
      vy: tech.vy * 1.25,
    })));
    setInput(`> Speed boost! Level ${speedLevel + 1}/${maxSpeedLevel} ⚡`);
    setTimeout(() => setInput(''), 1500);
  };

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
        let hitCorner = false;
        let newRotation = tech.rotation + (Math.abs(tech.vx) + Math.abs(tech.vy)) * 0.5;

        // Bounce off left and right edges
        if (newX <= padding || newX >= contentWidth - tech.size - padding) {
          newVx = -tech.vx;
          newX = newX <= padding ? padding : contentWidth - tech.size - padding;
          
          // Check if hit corner
          if ((newY <= padding + 30 || newY >= contentHeight - tech.size - padding - 30)) {
            hitCorner = true;
          }
        }
        
        // Bounce off top and bottom edges
        if (newY <= padding || newY >= contentHeight - tech.size - padding) {
          newVy = -tech.vy;
          newY = newY <= padding ? padding : contentHeight - tech.size - padding;
          
          // Check if hit corner
          if ((newX <= padding + 30 || newX >= contentWidth - tech.size - padding - 30)) {
            hitCorner = true;
          }
        }

        // Corner hit with particle effect
        if (hitCorner) {
          setCornerHits(prev => prev + 1);
          setScore(prev => prev + 5);
          setParticlePosition({ x: newX + tech.size / 2, y: newY + tech.size / 2 });
          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 500);
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

    const intervalId = setInterval(animate, 1000 / 60);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleTechClick = (techName: string, event: React.MouseEvent) => {
    // Combo system
    const newCombo = combo + 1;
    setCombo(newCombo);
    setShowCombo(true);
    
    // Track max combo
    if (newCombo > maxCombo) {
      setMaxCombo(newCombo);
    }
    
    // Clear existing timer
    if (comboTimerRef.current) {
      clearTimeout(comboTimerRef.current);
    }
    
    // Reset combo after 2 seconds of no clicks
    comboTimerRef.current = setTimeout(() => {
      setCombo(0);
      setShowCombo(false);
    }, 2000);

    setClickedTech(techName);
    setInput(`> skills --show ${techName}`);
    
    // Combo multiplier scoring
    const points = 10 * (newCombo > 1 ? newCombo : 1);
    setScore(prev => prev + points);
    
    // Show particle effect
    const rect = event.currentTarget.getBoundingClientRect();
    const parentRect = terminalContentRef.current?.getBoundingClientRect();
    if (parentRect) {
      setParticlePosition({ 
        x: rect.left - parentRect.left + rect.width / 2, 
        y: rect.top - parentRect.top + rect.height / 2 
      });
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 500);
    }
    
    // Add speed boost and rotation to clicked icon
    setTechStack(prev => prev.map(tech => 
      tech.name === techName 
        ? { ...tech, vx: tech.vx * 1.5, vy: tech.vy * 1.5 }
        : tech
    ));
    setTimeout(() => {
      setClickedTech(null);
      setInput('');
      // Normalize speed back
      setTechStack(prev => prev.map(tech => 
        tech.name === techName 
          ? { ...tech, vx: tech.vx / 1.5, vy: tech.vy / 1.5 }
          : tech
      ));
    }, 1500);
  };

  // Screen shake effect on high combo
  const getShakeClass = () => {
    if (combo >= 10) return 'animate-shake';
    return '';
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: '450px' }}
    >
      {/* Achievement Notification */}
      {showAchievement && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full font-bold shadow-2xl border-2 border-white text-sm md:text-base">
            {showAchievement}
          </div>
        </div>
      )}

      {/* Achievement Panel - Terminal Sized */}
      {showAchievementPanel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2">
          <div className="bg-gray-800 p-2.5 sm:p-3 md:p-4 rounded-lg border-2 border-teal-400 shadow-2xl w-72 md:w-96 lg:w-[450px] max-h-[400px] md:max-h-[450px] overflow-y-auto">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-teal-400">🏆 Achievements</h2>
              <div className="text-gray-400 text-xs">{unlockedCount}/{achievements.length}</div>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-1.5 sm:p-2 md:p-2.5 rounded border transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50'
                      : 'bg-gray-700/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`text-lg sm:text-xl md:text-2xl flex-shrink-0 ${achievement.unlocked ? 'grayscale-0' : 'grayscale opacity-30'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-xs sm:text-sm ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'} leading-tight`}>
                        {achievement.title}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-400 leading-tight">{achievement.description}</div>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-400 text-sm sm:text-base md:text-lg flex-shrink-0">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={toggleAchievementPanel}
              className="w-full mt-2 md:mt-3 bg-teal-600 hover:bg-teal-500 text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg font-bold transition-all text-xs sm:text-sm"
            >
              Close (A or ESC)
            </button>
          </div>
        </div>
      )}

      {/* Combo Display */}
      {showCombo && combo > 1 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold shadow-lg text-sm md:text-base ${
            combo >= 10 ? 'md:text-xl border-2 border-yellow-400' : ''
          }`}>
            🔥 {combo >= 10 ? 'MEGA ' : ''}COMBO x{combo}!
          </div>
        </div>
      )}

      {/* Button Hints */}
      {showRedHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-red-500/90 text-white px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🔴 Reset (Press R)
          </div>
        </div>
      )}
      {showYellowHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-yellow-500/90 text-gray-900 px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🟡 Pause (Press Space)
          </div>
        </div>
      )}
      {showGreenHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-green-500/90 text-white px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🟢 Speed: {speedLevel}/{maxSpeedLevel} (Press ↑)
          </div>
        </div>
      )}
      {showBlueHint && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-blue-500/90 text-white px-2.5 py-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-semibold shadow-lg whitespace-nowrap">
            🔵 Achievements (Press A)
          </div>
        </div>
      )}

      {/* Terminal Window */}
      <div 
        className={`relative w-72 md:w-96 lg:w-[450px] bg-gray-900 rounded-lg shadow-2xl border transition-all duration-500 ${
          isHovered ? 'scale-105 shadow-teal-500/50 border-teal-400/50' : 'border-gray-700'
        } ${getShakeClass()}`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between h-9 md:h-10 px-3 md:px-4 bg-gray-800 rounded-t-lg border-b border-gray-700">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div 
              className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500 hover:bg-red-400 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg shadow-red-500/50"
              onClick={resetTerminal}
              onMouseEnter={() => setShowRedHint(true)}
              onMouseLeave={() => setShowRedHint(false)}
            ></div>
            <div 
              className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg shadow-yellow-500/50"
              onClick={togglePause}
              onMouseEnter={() => setShowYellowHint(true)}
              onMouseLeave={() => setShowYellowHint(false)}
            ></div>
            <div 
              className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg ${
                speedLevel >= maxSpeedLevel 
                  ? 'bg-green-800 cursor-not-allowed shadow-green-800/50' 
                  : 'bg-green-500 hover:bg-green-400 shadow-green-500/50'
              }`}
              onClick={speedUp}
              onMouseEnter={() => setShowGreenHint(true)}
              onMouseLeave={() => setShowGreenHint(false)}
            ></div>
            <div 
              className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-blue-500 hover:bg-blue-400 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg shadow-blue-500/50"
              onClick={toggleAchievementPanel}
              onMouseEnter={() => setShowBlueHint(true)}
              onMouseLeave={() => setShowBlueHint(false)}
            ></div>
            <span className="ml-1.5 md:ml-2 text-[10px] md:text-xs text-gray-400">~/mohamed</span>
          </div>
          {/* Stats Display */}
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono">
            <div className="text-purple-400 transition-all hover:scale-105" title="Total Experience Points">
              XP: <span className="font-bold">{score}</span>
            </div>
            <div className="hidden sm:block text-yellow-400 transition-all hover:scale-105" title="Corner hits = +5 XP each!">
              🎯 {cornerHits}
            </div>
            <div 
              className="text-orange-400 transition-all hover:scale-105 cursor-pointer" 
              title={`${unlockedCount} achievements unlocked! Click to view.`}
              onClick={toggleAchievementPanel}
            >
              🏆 <span className="hidden sm:inline">{unlockedCount}/</span>{achievements.length}
            </div>
            {isPaused && (
              <div className="text-orange-400 animate-pulse">⏸</div>
            )}
          </div>
        </div>

        {/* Terminal Content - Bouncing Area */}
        <div 
          ref={terminalContentRef}
          className="relative p-3 md:p-4 h-64 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-900/80"
        >
          {/* Particle Effect */}
          {showParticles && (
            <div 
              className="absolute z-30 pointer-events-none"
              style={{ left: particlePosition.x, top: particlePosition.y }}
            >
              <div className="animate-ping absolute h-6 w-6 md:h-8 md:w-8 rounded-full bg-yellow-400 opacity-75 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="animate-ping absolute h-9 w-9 md:h-12 md:w-12 rounded-full bg-purple-400 opacity-50 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '0.1s' }}></div>
              <div className="animate-pulse absolute h-3 w-3 md:h-4 md:w-4 rounded-full bg-orange-400 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute text-base md:text-xl -translate-x-1/2 -translate-y-1/2 animate-bounce">✨</div>
            </div>
          )}

          {/* Bouncing Tech Stack Icons */}
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="absolute cursor-pointer transition-transform duration-100 hover:scale-125 z-20 active:scale-95"
              style={{
                left: `${tech.x}px`,
                top: `${tech.y}px`,
                maxWidth: `${tech.size}px`,
                minWidth: `${tech.size}px`,
                transform: `rotate(${tech.rotation}deg)`,
              }}
              onClick={(e) => handleTechClick(tech.name, e)}
            >
              <div className="relative group">
                <div 
                  className={`${tech.type === 'text' ? 'text-xs md:text-sm lg:text-base' : 'text-xl md:text-2xl lg:text-3xl'} ${tech.color} drop-shadow-2xl filter hover:brightness-125 transition-all select-none flex items-center justify-center ${
                    clickedTech === tech.name ? 'scale-150 animate-pulse' : ''
                  }`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {tech.icon}
                </div>
                {/* Enhanced Tooltip */}
                <div className="hidden md:block absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-30 pointer-events-none border border-teal-400/50 shadow-lg">
                  <div className="font-semibold">{tech.name}</div>
                  <div className="text-teal-400 text-[10px]">
                    {combo > 0 ? `+${10 * (combo + 1)} XP (x${combo + 1} Combo!)` : '+10 XP'}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800/95"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Terminal Output Layer */}
          <div className="relative z-10 pointer-events-none px-1 md:px-2">
            {/* Command Input */}
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

            {/* Output */}
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
                  <div>🎯 Corner hits = +5 bonus</div>
                  <div>🔥 Chain for combos</div>
                  {maxCombo > 0 && (
                    <div className="text-purple-400 font-semibold">
                      Best: x{maxCombo} combo
                    </div>
                  )}
                  {highScore > 0 && (
                    <div className="text-yellow-400 font-semibold">
                      High Score: {highScore} XP
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tech Click Output */}
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

      {/* Glow effect */}
      <div className={`absolute inset-0 bg-teal-500/5 blur-3xl rounded-full transition-all duration-500 -z-10 ${
        isHovered ? 'scale-110 bg-teal-400/10' : 'scale-90'
      } ${combo >= 10 ? 'bg-purple-500/20' : ''}`}></div>
    </div>
  );
};

export default TerminalCodeSymbol;
