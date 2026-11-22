'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type DisplayMode = 'auto' | 'android' | 'desktop';

interface DisplayModeContextType {
  mode: DisplayMode;
  isAndroid: boolean;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
}

const DisplayModeContext = createContext<DisplayModeContextType>({
  mode: 'auto',
  isAndroid: false,
  setMode: () => {},
  toggleMode: () => {},
});

export const DisplayModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<DisplayMode>('auto');
  const [isScreenMobile, setIsScreenMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // 1. Read persistent preference from localStorage if available
    const saved = localStorage.getItem('sikoni_display_mode') as DisplayMode | null;
    if (saved === 'android' || saved === 'desktop' || saved === 'auto') {
      setModeState(saved);
    }

    // 2. Detect screen width and mobile user-agent
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isMobileUA = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsScreenMobile(isMobileWidth || isMobileUA);
    };

    checkMobile();
    setMounted(true);

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sikoni_display_mode', newMode);
    }
  };

  const toggleMode = () => {
    const next = isAndroid ? 'desktop' : 'android';
    setMode(next);
  };

  // Determine effective display:
  // If mode === 'android' -> always android
  // If mode === 'desktop' -> always desktop
  // If mode === 'auto' -> depends on isScreenMobile
  const isAndroid = mounted
    ? mode === 'android' || (mode === 'auto' && isScreenMobile)
    : false;

  return (
    <DisplayModeContext.Provider value={{ mode, isAndroid, setMode, toggleMode }}>
      {children}
    </DisplayModeContext.Provider>
  );
};

export const useDisplayMode = () => useContext(DisplayModeContext);
