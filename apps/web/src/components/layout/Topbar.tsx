'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, X, ArrowRight } from 'lucide-react';

interface SearchResult {
  label: string;
  category: string;
  href: string;
}

const searchableItems: SearchResult[] = [
  { label: 'Dashboard Eksekutif', category: 'Menu', href: '/admin/dashboard' },
  { label: 'Dana Masuk & Hibah', category: 'Keuangan', href: '/admin/dana-masuk' },
  { label: 'Kontrol Anggaran & Pagu', category: 'Keuangan', href: '/admin/anggaran' },
  { label: 'Realisasi Pengeluaran', category: 'Keuangan', href: '/admin/realisasi' },
  { label: 'Insentif Atlet & Pelatih', category: 'Keuangan', href: '/admin/insentif' },
  { label: 'Pajak Transaksi PPh/PPN', category: 'Keuangan', href: '/admin/pajak' },
  { label: 'Buat RAB Baru', category: 'Pengajuan', href: '/admin/rab' },
  { label: 'Inbox Persetujuan (Approval)', category: 'Operasional', href: '/admin/persetujuan' },
  { label: 'Pemeriksaan LPJ Kegiatan', category: 'Operasional', href: '/admin/lpj' },
  { label: 'Data Master Cabang Olahraga', category: 'Master', href: '/admin/cabor' },
  { label: 'Arsip Dokumen & Surat', category: 'Dokumen', href: '/admin/dokumen' },
  { label: 'Laporan Keuangan Resmi', category: 'Laporan', href: '/admin/laporan' },
  { label: 'Transparansi Anggaran Publik', category: 'Publik', href: '/transparansi' },
  { label: 'Direktori Cabor Publik', category: 'Publik', href: '/cabor' },
];

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isPublic =
    pathname === '/' ||
    pathname.startsWith('/transparansi') ||
    pathname.startsWith('/cabor') ||
    pathname.startsWith('/berita') ||
    pathname.startsWith('/profil');
  const isAdmin = pathname.startsWith('/admin');
  const isMobile = pathname.startsWith('/android-preview');

  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(
        (it) =>
          it.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <header className="h-[72px] bg-white border-b border-sikoni-line flex items-center justify-between px-7 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-[240px]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="brand-mark group-hover:scale-105 transition-transform">SK</div>
          <div>
            <div className="text-[15px] font-extrabold tracking-wide text-sikoni-navy">SIKONI</div>
            <div className="text-[10px] text-sikoni-muted tracking-wider">SISTEM INFORMASI KONI SURAKARTA</div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Interactive Global Searchbox with Instant Dropdown */}
        <div className="relative">
          <div className="h-[38px] w-[260px] md:w-[300px] bg-[#f7f9fb] border border-sikoni-line rounded-[10px] px-3 flex items-center gap-2 text-sikoni-muted focus-within:border-sikoni-teal focus-within:bg-white transition-all">
            <Search size={16} />
            <input
              type="text"
              placeholder="Cari menu, dokumen, atau kegiatan..."
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              className="border-none outline-none bg-transparent w-full text-xs text-sikoni-ink"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-slate-400 hover:text-sikoni-navy"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-11 bg-white rounded-xl shadow-2xl border border-sikoni-line p-2 z-50 text-xs">
              <div className="text-[10px] font-bold text-sikoni-muted px-2 py-1 uppercase">
                Hasil Pencarian:
              </div>
              {filteredResults.length === 0 ? (
                <div className="px-3 py-2 text-sikoni-muted">Tidak ada menu atau dokumen ditemukan.</div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredResults.map((res, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        router.push(res.href);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <b className="text-sikoni-navy block">{res.label}</b>
                        <span className="text-[10px] text-sikoni-teal font-semibold">{res.category}</span>
                      </div>
                      <ArrowRight size={13} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3-Channel Mode Switcher matching Mockup */}
        <div className="flex items-center gap-1 bg-[#edf2f7] p-1 rounded-full">
          <button
            onClick={() => router.push('/')}
            className={`mode-pill ${isPublic ? 'active' : 'inactive'}`}
          >
            Publik
          </button>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className={`mode-pill ${isAdmin ? 'active' : 'inactive'}`}
          >
            Admin
          </button>
          <button
            onClick={() => router.push('/android-preview')}
            className={`mode-pill ${isMobile ? 'active' : 'inactive'}`}
          >
            Android
          </button>
        </div>

        {/* Notification Bell */}
        <Link
          href="/admin/persetujuan"
          title="6 usulan menunggu verifikasi Anda"
          className="h-[38px] w-[38px] border border-sikoni-line bg-white rounded-[11px] grid place-items-center text-sikoni-muted relative hover:bg-slate-50"
        >
          <Bell size={18} />
          <span className="absolute top-[7px] right-[8px] w-[7px] h-[7px] bg-sikoni-red rounded-full border border-white" />
        </Link>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-1 border-l border-sikoni-line">
          <div className="w-[34px] h-[34px] rounded-full bg-[#e7eff5] text-sikoni-navy grid place-items-center font-bold text-xs">
            AD
          </div>
          <div>
            <b className="text-xs text-sikoni-navy block leading-tight">Admin KONI</b>
            <small className="text-[10px] text-sikoni-muted">Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
};
