'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Screen13ArchiveProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen13_Archive: React.FC<Screen13ArchiveProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [yearFilter, setYearFilter] = useState<'all' | '2025' | '2024'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const archiveList = [
    {
      id: 'arc-1',
      title: 'SPJ Termin II: TC Sentralisasi Atlet Pelatda Porprov XVII 2025',
      year: '2025',
      docNo: 'SKB No: 426/089/SKB-KONI/V/2025',
      amount: 'Rp 85.000.000',
      date: '18 Mei 2025',
      status: 'Selesai BPKAD',
      statusColor: 'emerald',
      filesCount: 6,
    },
    {
      id: 'arc-2',
      title: 'SPJ Termin I: Pembinaan Fisik Awal & Try-Out Kejurda Atletik',
      year: '2025',
      docNo: 'SKB No: 426/012/SKB-KONI/III/2025',
      amount: 'Rp 35.000.000',
      date: '20 Mar 2025',
      status: 'Selesai BPKAD',
      statusColor: 'emerald',
      filesCount: 4,
    },
    {
      id: 'arc-3',
      title: 'Laporan Pertanggungjawaban Akhir Dana Hibah Tahunan 2024',
      year: '2024',
      docNo: 'SKB No: 426/711/SKB-KONI/XII/2024',
      amount: 'Rp 150.000.000',
      date: '28 Des 2024',
      status: 'Diarsipkan Dispora',
      statusColor: 'blue',
      filesCount: 12,
    },
  ];

  const filtered = archiveList.filter((item) => {
    if (yearFilter !== 'all' && item.year !== yearFilter) return false;
    if (searchQuery.trim()) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.docNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F9FD] text-[#0f172a] pb-28 font-body">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#F8F9FD]/95 backdrop-blur-xl border-b border-[#e2e8f0]/80">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-9 h-9 rounded-full bg-white shadow-sm border border-[#e2e8f0] flex items-center justify-center text-[#0f172a] hover:bg-slate-100 transition-colors"
                aria-label="Kembali"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
            )}
            <div className="relative h-11 w-11 shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white shadow-sm border border-[#e2e8f0]">
              <Image
                src="/images/logo_koni.png"
                alt="Logo KONI Surakarta"
                width={40}
                height={40}
                className="h-full w-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#d32f2f] font-bold leading-none mb-1">
                KONI SURAKARTA
              </span>
              <h1 className="font-display text-[15px] font-black tracking-tight text-[#0f172a] leading-tight truncate">
                Arsip Dokumen SPJ
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate?.('notifications')}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] hover:text-[#d32f2f] transition-all"
              aria-label="Notifikasi"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* TITLE & SEARCH */}
        <div>
          <h2 className="font-display text-lg font-black text-[#0f172a]">
            Arsip Dokumen & SPJ Keuangan
          </h2>
          <p className="text-xs text-[#64748b]">
            Repositori resmi berkas pertanggungjawaban hibah cabor atletik
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari nomor SKB, kegiatan, atau tahun..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#e2e8f0] text-xs text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#d32f2f] shadow-sm transition-all"
          />
        </div>

        {/* YEAR / STATUS FILTER PILLS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setYearFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              yearFilter === 'all'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            Semua Tahun
          </button>
          <button
            type="button"
            onClick={() => setYearFilter('2025')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              yearFilter === '2025'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            T.A. 2025 (Terbaru)
          </button>
          <button
            type="button"
            onClick={() => setYearFilter('2024')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              yearFilter === '2024'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            T.A. 2024
          </button>
        </div>

        {/* ARCHIVE ITEMS LIST */}
        <div className="space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Daftar Berkas Terarsip ({filtered.length})
          </span>

          {filtered.map((arc) => (
            <div
              key={arc.id}
              className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9.5px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-[#0f172a]">
                      T.A. {arc.year}
                    </span>
                    <span className="text-[10px] text-[#94a3b8]">•</span>
                    <span className="text-[10px] text-[#94a3b8] font-medium">{arc.date}</span>
                  </div>

                  <h3 className="font-display text-xs font-black text-[#0f172a] leading-tight">
                    {arc.title}
                  </h3>

                  <div className="font-mono text-[10px] text-[#64748b] mt-1 truncate">
                    {arc.docNo}
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black shrink-0">
                  {arc.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-[#64748b] block">Nilai Disahkan:</span>
                  <span className="font-display font-black text-[#d32f2f] text-sm">
                    {arc.amount}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748b] block">Jumlah Lampiran:</span>
                  <span className="font-bold text-[#0f172a]">{arc.filesCount} Dokumen</span>
                </div>
              </div>

              {/* CARD ACTIONS */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate?.('skb-doc')}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#0f172a] flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">visibility</span>
                  <span>Lihat SKB-SPJ</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast?.(`Mengunduh Paket Arsip ZIP ${arc.title}`)}
                  className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">folder_zip</span>
                  <span>Unduh ZIP</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
