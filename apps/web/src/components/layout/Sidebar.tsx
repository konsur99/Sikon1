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
      { href: '/admin/lpj', label: 'LPJ', icon: <FileCheck2 size={17} /> },
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

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[248px] bg-gradient-to-b from-[#142a43] via-[#183454] to-[#112338] text-[#dce5ed] py-6 px-3.5 flex-shrink-0 flex flex-col min-h-[calc(100vh-72px)] border-r border-slate-800/70 shadow-lg">
      <div className="flex-1 space-y-4">
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
        <div className="text-[9.5px] text-slate-300 mt-0.5">SIKONI v1.0 • Enterprise Monorepo</div>
        <div className="flex items-center gap-1.5 mt-1.5 text-sikoni-gold font-bold text-[9.5px]">
          <span>★</span>
          <span>Sistem Informasi Terpadu</span>
        </div>
      </div>
    </aside>
  );
};

