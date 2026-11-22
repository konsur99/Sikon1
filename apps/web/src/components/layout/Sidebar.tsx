'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Coins,
  PlusCircle,
  FileSpreadsheet,
  ArrowUpRight,
  Award,
  Percent,
  Send,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  FolderArchive,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroup {
  caption: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navGroups: NavGroup[] = [
  {
    caption: 'RINGKASAN',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
    ],
  },
  {
    caption: 'KEUANGAN',
    items: [
      { href: '/admin/keuangan', label: 'Keuangan', icon: <Coins size={17} /> },
      { href: '/admin/dana-masuk', label: 'Dana Masuk', icon: <PlusCircle size={17} /> },
      { href: '/admin/anggaran', label: 'Anggaran', icon: <FileSpreadsheet size={17} /> },
      { href: '/admin/realisasi', label: 'Realisasi', icon: <ArrowUpRight size={17} /> },
      { href: '/admin/insentif', label: 'Insentif', icon: <Award size={17} /> },
      { href: '/admin/pajak', label: 'Pajak', icon: <Percent size={17} /> },
    ],
  },
  {
    caption: 'OPERASIONAL',
    items: [
      { href: '/admin/pengajuan', label: 'Pengajuan', icon: <Send size={17} /> },
      { href: '/admin/persetujuan', label: 'Persetujuan', icon: <CheckCircle2 size={17} />, badge: 6 },
      { href: '/admin/lpj', label: 'LPJ & Word', icon: <FileCheck2 size={17} /> },
      { href: '/admin/cabor', label: 'Data Cabor', icon: <ShieldCheck size={17} /> },
    ],
  },
  {
    caption: 'DOKUMEN & LAPORAN',
    items: [
      { href: '/admin/dokumen', label: 'Dokumen', icon: <FolderArchive size={17} /> },
      { href: '/admin/laporan', label: 'Laporan', icon: <BarChart3 size={17} /> },
    ],
  },
  {
    caption: 'SISTEM',
    items: [
      { href: '/admin/pengaturan', label: 'Pengaturan', icon: <Settings size={17} /> },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      {/* Mobile Header Bar inside drawer */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/15 text-white font-black grid place-items-center text-xs">SK</div>
          <span className="font-extrabold text-white text-xs">Menu Admin SIKONI</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          aria-label="Tutup Menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.caption}>
            <div className="text-[9px] font-black tracking-[1.8px] text-[#8fa7be] px-3 py-1 uppercase">
              {group.caption}
            </div>
            <div className="space-y-1 mt-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onClose?.()}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-white/15 via-white/10 to-transparent text-white font-bold border-l-4 border-sikoni-gold shadow-sm'
                        : 'text-[#cbd7e1] hover:bg-white/8 hover:text-white hover:translate-x-0.5'
                    }`}
                  >
                    <span className="opacity-95">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-sikoni-gold text-sikoni-navy text-[10px] px-2 py-0.5 rounded-full font-black shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 mt-6 border-t border-white/10 text-[#9fb0c0] text-[10px] leading-relaxed p-3 rounded-2xl bg-white/5 border border-white/5">
        <div className="font-extrabold text-white tracking-wider flex items-center justify-between">
          <span>KONI SURAKARTA</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="text-[9.5px] text-slate-300 mt-0.5">SIKONI • Responsif Android & Desktop</div>
        <div className="flex items-center gap-1.5 mt-1.5 text-sikoni-gold font-bold text-[9.5px]">
          <span>★</span>
          <span>Sistem Informasi Terpadu</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop / Laptop Sidebar (Pinned on large screens) */}
      <aside className="hidden lg:flex w-[248px] bg-gradient-to-b from-[#142a43] via-[#183454] to-[#112338] text-[#dce5ed] py-6 px-3.5 flex-shrink-0 flex-col min-h-[calc(100vh-72px)] border-r border-slate-800/70 shadow-lg">
        {sidebarContent}
      </aside>

      {/* Mobile / Android Slide-in Drawer (Off-canvas) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-sikoni-navy/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside className="fixed top-0 bottom-0 left-0 w-[270px] bg-gradient-to-b from-[#142a43] via-[#183454] to-[#112338] text-[#dce5ed] py-5 px-3.5 z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

