'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Smartphone,
  Stamp,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
  badgeColor?: string;
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
    caption: 'RINGKASAN & FLAGSHIP',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard Eksekutif', icon: <LayoutDashboard size={17} /> },
      {
        href: '/android-preview',
        label: 'SIKONI Mobile (15 Layar)',
        icon: <Smartphone size={17} />,
        badge: 'Stitch',
        badgeColor: 'bg-[#d32f2f] text-white',
      },
    ],
  },
  {
    caption: 'KEUANGAN & KASDA',
    items: [
      { href: '/admin/keuangan', label: 'Keuangan & Kasda', icon: <Coins size={17} /> },
      { href: '/admin/dana-masuk', label: 'Dana Masuk APBD', icon: <PlusCircle size={17} /> },
      { href: '/admin/anggaran', label: 'Plafon Anggaran', icon: <FileSpreadsheet size={17} /> },
      { href: '/admin/realisasi', label: 'SP2D & Realisasi', icon: <ArrowUpRight size={17} /> },
      { href: '/admin/insentif', label: 'Insentif Atlet & Pelatih', icon: <Award size={17} /> },
      { href: '/admin/pajak', label: 'Pajak PPh 21 / PPN', icon: <Percent size={17} /> },
    ],
  },
  {
    caption: 'OPERASIONAL & VERIFIKASI',
    items: [
      { href: '/admin/pengajuan', label: 'Pengajuan RAB & LPJ', icon: <Send size={17} /> },
      {
        href: '/admin/persetujuan',
        label: 'Persetujuan & e-TTE',
        icon: <CheckCircle2 size={17} />,
        badge: 6,
        badgeColor: 'bg-amber-500 text-slate-900',
      },
      { href: '/admin/lpj', label: 'Generator LPJ Word', icon: <FileCheck2 size={17} /> },
      { href: '/admin/cabor', label: 'Data 64 Cabor', icon: <ShieldCheck size={17} /> },
    ],
  },
  {
    caption: 'DOKUMEN & AUDIT',
    items: [
      { href: '/admin/dokumen', label: 'Arsip Dokumen & SKB', icon: <FolderArchive size={17} /> },
      { href: '/admin/laporan', label: 'Laporan Pertanggungjawaban', icon: <BarChart3 size={17} /> },
    ],
  },
  {
    caption: 'SISTEM',
    items: [
      { href: '/admin/pengaturan', label: 'Pengaturan & RBAC', icon: <Settings size={17} /> },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className="pb-4 mb-3 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white shadow-md border border-white/20 group-hover:scale-105 transition-transform overflow-hidden">
            <Image
              src="/images/logo_koni.png"
              alt="Logo Resmi KONI Kota Surakarta"
              width={36}
              height={36}
              className="h-full w-full object-contain filter drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-black tracking-tight uppercase text-white leading-none">
                SIKONI SOLO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            </div>
            <span className="text-[9.5px] uppercase tracking-[0.14em] text-zinc-400 font-bold leading-tight mt-1 truncate">
              KONI KOTA SURAKARTA
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 lg:hidden transition-colors"
          aria-label="Tutup Menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-0.5">
        {navGroups.map((group) => (
          <div key={group.caption}>
            <div className="text-[9px] font-black tracking-[1.8px] text-zinc-400 px-3 py-1 uppercase">
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
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600/30 via-red-600/15 to-transparent text-white font-black border-l-4 border-[#d32f2f] shadow-sm'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
                    }`}
                  >
                    <span className={`shrink-0 ${isActive ? 'text-[#d32f2f]' : 'opacity-80'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-auto text-[9.5px] px-2 py-0.5 rounded-full font-black shadow-xs shrink-0 ${
                          item.badgeColor || 'bg-amber-400 text-slate-900'
                        }`}
                      >
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

      {/* System Status Pill at Footer */}
      <div className="pt-3 mt-4 border-t border-white/10 text-zinc-400 text-[10.5px] leading-relaxed p-3 rounded-2xl bg-white/5 border border-white/5">
        <div className="font-black text-white tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>KASDA BPKAD AKTIF</span>
          </span>
          <span className="text-[9px] font-mono text-amber-400">T.A. 2025/2026</span>
        </div>
        <div className="text-[9.5px] text-zinc-400 mt-1">
          Garuda Flame Athletic Design System
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop / Laptop Sidebar (Pinned on large screens) */}
      <aside className="hidden lg:flex w-[260px] bg-gradient-to-b from-[#121316] via-[#1a1c22] to-[#121316] text-[#dce5ed] py-5 px-3.5 flex-shrink-0 flex-col min-h-[calc(100vh-72px)] border-r border-white/10 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Slide-in Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <aside className="fixed top-0 bottom-0 left-0 w-[280px] bg-gradient-to-b from-[#121316] via-[#1a1c22] to-[#121316] text-[#dce5ed] py-5 px-3.5 z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200 border-r border-white/10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
