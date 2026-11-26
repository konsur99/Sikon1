'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { MobilePreview } from '../../components/mobile/MobilePreview';

export default function AndroidPreviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1c2d] sm:bg-[#e9edf1]">
      {/* Sleek Navigation Bar for Desktop Users */}
      <header className="hidden sm:flex h-14 bg-[#142a43] text-white px-6 items-center justify-between shadow-md border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/10"
          >
            <ArrowLeft size={14} /> Web Publik
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-xs font-bold text-sikoni-gold hover:text-amber-200 flex items-center gap-1.5 transition-colors bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/10"
          >
            Portal Admin →
          </Link>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-extrabold text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SIKONI • Versi Aplikasi Android (Pengurus, Cabor & Publik)</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <MobilePreview defaultDeviceView="mobile" />
      </main>
    </div>
  );
}

