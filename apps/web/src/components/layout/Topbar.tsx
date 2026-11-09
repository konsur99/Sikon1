'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  X,
  ArrowRight,
  CheckCheck,
  FileCheck2,
  Coins,
  Percent,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface SearchResult {
  label: string;
  category: string;
  href: string;
}

interface NotificationItem {
  id: string;
  title: string;
  category: 'persetujuan' | 'keuangan' | 'lpj' | 'pajak';
  message: string;
  time: string;
  unread: boolean;
  href: string;
  actionText: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'RAB Kejurda Atletik PASI Surakarta',
    category: 'persetujuan',
    message: 'PASI mengajukan usulan RAB sebesar Rp 48.500.000. Menunggu approval verifikator.',
    time: '12 menit lalu',
    unread: true,
    href: '/admin/persetujuan',
    actionText: 'Tinjau Berkas',
  },
  {
    id: 'n-2',
    title: 'Revisi Kuitansi LPJ PBVSI Masuk',
    category: 'lpj',
    message: 'PBVSI telah melengkapi berkas nota sewa venue dan kuitansi konsumsi Rp 12.000.000.',
    time: '45 menit lalu',
    unread: true,
    href: '/admin/lpj',
    actionText: 'Periksa LPJ',
  },
  {
    id: 'n-3',
    title: 'Penyaluran Hibah APBD Termin I Diterima',
    category: 'keuangan',
    message: 'BPKAD Surakarta telah menyalurkan Rp 4.250.000.000 ke Rekening Giro Bank Jateng KONI.',
    time: '2 jam lalu',
    unread: true,
    href: '/admin/dana-masuk',
    actionText: 'Cek Kas Giro',
  },
  {
    id: 'n-4',
    title: 'Pengingat Jatuh Tempo Pajak PPh 21/23',
    category: 'pajak',
    message: 'Batas pelaporan dan setoran masa pajak honorarium pelatih jatuh tempo 3 hari lagi.',
    time: '5 jam lalu',
    unread: true,
    href: '/admin/pajak',
    actionText: 'Hitung Pajak',
  },
  {
    id: 'n-5',
    title: 'Pencairan Insentif 34 Atlet PASI',
    category: 'keuangan',
    message: 'Honorarium dan insentif prestasi triwulan IV sukses dipindahbukukan ke rekening atlet.',
    time: 'Kemarin',
    unread: false,
    href: '/admin/insentif',
    actionText: 'Data Insentif',
  },
];

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
  { label: 'Pengaturan Sistem', category: 'Sistem', href: '/admin/pengaturan' },
  { label: 'Transparansi Anggaran Publik', category: 'Publik', href: '/transparansi' },
  { label: 'Direktori Cabor Publik', category: 'Publik', href: '/cabor' },
];

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Notification Popover state
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'persetujuan' | 'keuangan'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const isPublic =
    pathname === '/' ||
    pathname.startsWith('/transparansi') ||
    pathname.startsWith('/cabor') ||
    pathname.startsWith('/berita') ||
    pathname.startsWith('/profil');
  const isAdmin = pathname.startsWith('/admin');
  const isMobile = pathname.startsWith('/android-preview');

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifs = notifications.filter((n) => {
    if (notifFilter === 'persetujuan') return n.category === 'persetujuan' || n.category === 'lpj';
    if (notifFilter === 'keuangan') return n.category === 'keuangan' || n.category === 'pajak';
    return true;
  });

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    // Mark this item as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    );
    setIsNotifOpen(false);
    router.push(item.href);
  };

  // Close popups when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNotifOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(
        (it) =>
          it.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <header className="h-[72px] bg-white border-b border-sikoni-line flex items-center justify-between px-7 sticky top-0 z-30 shadow-[0_2px_10px_rgba(20,42,67,0.03)]">
      <div className="flex items-center gap-3 min-w-[240px]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="brand-mark group-hover:scale-105 transition-transform">SK</div>
          <div>
            <div className="text-[15px] font-extrabold tracking-wide text-sikoni-navy flex items-center gap-1.5">
              SIKONI
              <span className="text-[9px] bg-sikoni-teal2 text-sikoni-teal font-bold px-1.5 py-0.5 rounded">
                v2.1
              </span>
            </div>
            <div className="text-[10px] text-sikoni-muted tracking-wider">
              SISTEM INFORMASI KONI SURAKARTA
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3.5">
        {/* Interactive Global Searchbox with Instant Dropdown */}
        <div className="relative" ref={searchRef}>
          <div className="h-[38px] w-[240px] md:w-[280px] bg-[#f7f9fb] border border-sikoni-line rounded-[10px] px-3 flex items-center gap-2 text-sikoni-muted focus-within:border-sikoni-teal focus-within:bg-white transition-all shadow-inner">
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
              className="border-none outline-none bg-transparent w-full text-xs text-sikoni-ink font-medium"
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
            <div className="absolute left-0 right-0 top-11 bg-white rounded-xl shadow-2xl border border-sikoni-line p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="text-[10px] font-bold text-sikoni-muted px-2 py-1 uppercase tracking-wider">
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
        <div className="flex items-center gap-1 bg-[#edf2f7] p-1 rounded-full border border-slate-200/60">
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

        {/* Notification Bell with Floating Dropdown Menu (Popover) */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="Buka Notifikasi SIKONI"
            className={`h-[38px] w-[38px] border rounded-[11px] grid place-items-center relative transition-all duration-200 ${
              isNotifOpen
                ? 'border-sikoni-teal bg-emerald-50/50 text-sikoni-teal shadow-md ring-2 ring-sikoni-teal/20'
                : 'border-sikoni-line bg-white text-sikoni-muted hover:bg-slate-50 hover:text-sikoni-navy'
            }`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-[6px] right-[6px] flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-white" />
              </span>
            )}
          </button>

          {/* Floating Notification Dropdown Popover */}
          {isNotifOpen && (
            <div className="absolute right-0 top-12 w-[390px] sm:w-[420px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(20,42,67,0.22)] border border-slate-200/90 z-50 overflow-hidden text-xs animate-in fade-in slide-in-from-top-3 duration-200">
              {/* Header Box */}
              <div className="p-4 bg-gradient-to-r from-sikoni-navy via-[#1b3652] to-sikoni-navy text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sikoni-gold">
                    <Bell size={16} />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm tracking-tight flex items-center gap-2">
                      Notifikasi Sistem
                      {unreadCount > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          {unreadCount} Baru
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Pemberitahuan berkas, persetujuan & pencairan
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      title="Tandai semua sudah dibaca"
                      className="text-[11px] font-semibold text-sikoni-gold hover:text-amber-200 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <CheckCheck size={13} /> Baca Semua
                    </button>
                  )}
                  <button
                    onClick={() => setIsNotifOpen(false)}
                    className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-100 text-[11px]">
                <button
                  onClick={() => setNotifFilter('all')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-center transition-all ${
                    notifFilter === 'all'
                      ? 'bg-white text-sikoni-navy shadow-sm border border-slate-200'
                      : 'text-sikoni-muted hover:text-sikoni-navy'
                  }`}
                >
                  Semua ({notifications.length})
                </button>
                <button
                  onClick={() => setNotifFilter('persetujuan')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-center transition-all ${
                    notifFilter === 'persetujuan'
                      ? 'bg-white text-sikoni-navy shadow-sm border border-slate-200'
                      : 'text-sikoni-muted hover:text-sikoni-navy'
                  }`}
                >
                  Persetujuan & LPJ (2)
                </button>
                <button
                  onClick={() => setNotifFilter('keuangan')}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-center transition-all ${
                    notifFilter === 'keuangan'
                      ? 'bg-white text-sikoni-navy shadow-sm border border-slate-200'
                      : 'text-sikoni-muted hover:text-sikoni-navy'
                  }`}
                >
                  Kas & Pajak (2)
                </button>
              </div>

              {/* Notification Items List */}
              <div className="max-h-[380px] overflow-y-auto p-2 space-y-2 bg-slate-50/50">
                {filteredNotifs.length === 0 ? (
                  <div className="p-8 text-center text-sikoni-muted">
                    <p className="font-semibold">Tidak ada notifikasi dalam kategori ini.</p>
                  </div>
                ) : (
                  filteredNotifs.map((item) => {
                    const getIcon = () => {
                      if (item.category === 'persetujuan') {
                        return <FileCheck2 size={16} className="text-amber-600" />;
                      }
                      if (item.category === 'lpj') {
                        return <AlertCircle size={16} className="text-sikoni-teal" />;
                      }
                      if (item.category === 'pajak') {
                        return <Percent size={16} className="text-rose-500" />;
                      }
                      return <Coins size={16} className="text-emerald-600" />;
                    };

                    const getBg = () => {
                      if (item.category === 'persetujuan') return 'bg-amber-50 border-amber-200';
                      if (item.category === 'lpj') return 'bg-teal-50 border-teal-200';
                      if (item.category === 'pajak') return 'bg-rose-50 border-rose-200';
                      return 'bg-emerald-50 border-emerald-200';
                    };

                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-md ${
                          item.unread
                            ? 'bg-gradient-to-r from-teal-50/40 via-white to-sky-50/30 border-teal-200/90'
                            : 'bg-white border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex-shrink-0 grid place-items-center border shadow-xs ${getBg()}`}
                          >
                            {getIcon()}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4
                                className={`text-xs font-bold leading-tight truncate ${
                                  item.unread ? 'text-sikoni-navy font-black' : 'text-slate-700'
                                }`}
                              >
                                {item.title}
                              </h4>
                              {item.unread && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 shadow-xs" />
                              )}
                            </div>

                            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {item.message}
                            </p>

                            <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-100/90">
                              <span className="text-[10px] text-sikoni-muted font-semibold">
                                {item.time}
                              </span>

                              <button
                                onClick={() => handleNotificationClick(item)}
                                className="text-[10.5px] font-bold text-sikoni-teal hover:text-teal-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100/80 px-2 py-0.5 rounded-md transition-colors border border-emerald-200/60"
                              >
                                {item.actionText} <ArrowRight size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Popover Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-sikoni-muted font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Server SIKONI Aktif
                </span>
                <button
                  onClick={() => setIsNotifOpen(false)}
                  className="font-bold text-sikoni-navy hover:text-sikoni-teal px-2 py-1 rounded hover:bg-slate-200/60 transition-colors"
                >
                  Tutup Popover
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-1 border-l border-sikoni-line">
          <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-sikoni-navy to-slate-700 text-white grid place-items-center font-bold text-xs shadow-sm">
            AD
          </div>
          <div className="hidden sm:block">
            <b className="text-xs text-sikoni-navy block leading-tight">Admin KONI</b>
            <small className="text-[10px] text-sikoni-muted">Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
};
