'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, ChevronRight, X, Sparkles } from 'lucide-react';
import { useDisplayMode } from '../../context/DisplayModeContext';

export const FloatingModeSwitcher: React.FC = () => {
  const { isAndroid, mode, setMode } = useDisplayMode();
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        aria-label="Buka Mode Switcher"
        className="fixed bottom-24 sm:bottom-4 right-3 sm:right-4 z-50 bg-[#142a43] text-sikoni-gold p-2.5 rounded-full shadow-2xl border border-white/20 hover:scale-105 transition-all flex items-center justify-center backdrop-blur-md"
        title="Buka Pengalih Mode Tampilan (Android / Desktop)"
      >
        {isAndroid ? <Smartphone size={18} /> : <Monitor size={18} />}
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 sm:bottom-4 right-3 sm:right-4 z-50 flex items-center gap-1.5 bg-[#142a43]/95 backdrop-blur-md text-white p-1.5 rounded-full shadow-[0_8px_30px_rgba(20,42,67,0.4)] border border-white/20 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-center gap-1 pl-2 pr-1 text-[10.5px] font-bold text-slate-300">
        <Sparkles size={13} className="text-sikoni-gold" />
        <span className="hidden sm:inline">Mode:</span>
      </div>

      <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full">
        {/* Android Mode Button */}
        <button
          onClick={() => setMode('android')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-[11px] transition-all ${
            isAndroid
              ? 'bg-sikoni-teal text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Tampilan Aplikasi Android SIKONI"
        >
          <Smartphone size={13} />
          <span>Android</span>
        </button>

        {/* Desktop Mode Button */}
        <button
          onClick={() => setMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-[11px] transition-all ${
            !isAndroid
              ? 'bg-sikoni-gold text-sikoni-navy shadow-md font-black'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Tampilan Website Desktop / Laptop"
        >
          <Monitor size={13} />
          <span>Desktop</span>
        </button>
      </div>

      <button
        onClick={() => setIsMinimized(true)}
        aria-label="Kecilkan Pengalih Mode"
        className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        title="Kecilkan"
      >
        <X size={14} />
      </button>
    </div>
  );
};
