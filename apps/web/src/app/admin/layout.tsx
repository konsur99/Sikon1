'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Topbar } from '../../components/layout/Topbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertTriangle, LogOut, Lock, User, RefreshCw } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, user, pathname, router]);

  // Loading skeleton while session is verified
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sikoni-teal to-teal-700 grid place-items-center animate-pulse shadow-xl">
          <ShieldCheck size={28} className="text-white" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-black text-sm tracking-wide text-white">Memverifikasi Sesi Akses SIKONI</h3>
          <p className="text-[11px] text-slate-400">Memeriksa hak akses dan otorisasi role pengguna...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-sikoni-bg">
      {/* P0 Security & Staging Alert Banner */}
      <div className="bg-[#0f1f31] text-white text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 select-none z-40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold text-sikoni-gold uppercase tracking-wider text-[10px]">
            Mode Staging & Simulasi Audit Terverifikasi
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-300">
            <User size={12} className="text-sikoni-teal" />
            <span>Login sebagai: <b>{user.name}</b> ({user.roleLabel})</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user.caborName && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              <Lock size={10} /> Scope: {user.caborId}
            </span>
          )}
          <button
            onClick={logout}
            className="text-slate-300 hover:text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors flex items-center gap-1 text-[10.5px] font-semibold"
            title="Keluar dari sesi portal admin"
          >
            <LogOut size={12} />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      <Topbar
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        isSidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full overflow-x-hidden">
          {/* Cabor Data Isolation Notice if logged in as Cabor Operator */}
          {user.role === 'operator_cabor' && (
            <div className="mb-4 bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
                <span>
                  <b>Akses Terisolasi:</b> Anda login sebagai Operator <b>{user.caborName}</b>. Akses data anggaran dan persetujuan dibatasi hanya untuk cabor Anda.
                </span>
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
