import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    // Check initial theme on mount
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;