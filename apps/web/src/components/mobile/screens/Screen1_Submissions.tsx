'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Screen1SubmissionsProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen1_Submissions: React.FC<Screen1SubmissionsProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rab' | 'lpj' | 'archive'>('all');

  const items = [
    {
      id: 'rab-tc-2026',
      title: 'RAB TC Sentralisasi Porprov 2026',
      type: 'RAB Proposal',
      cabor: 'PENGKOT PASI SURAKARTA',
      amount: 'Rp 120.000.000',
      date: '15 Mei 2025',
      status: 'Disetujui KONI',
      statusColor: 'emerald',
      step: 3,
      desc: 'Pemusatan latihan 18 atletik sprint & lompat menuju Porprov Jateng.',
      action: 'Lihat Detail SP2D',
      target: 'sp2d',
    },
    {
      id: 'lpj-kejurda-2025',
      title: 'LPJ Kejurda Atletik Solo Open 2025',
      type: 'LPJ & SPJ',
      cabor: 'PENGKOT PASI SURAKARTA',
      amount: 'Rp 45.000.000',
      date: '10 Mei 2025',
      status: 'Revisi Tim Keuangan',
      statusColor: 'amber',
      step: 2,
      desc: 'Koreksi kwitansi akomodasi & tanda tangan stempel basah hotel.',
      action: 'Perbaiki Berkas',
      target: 'notifications',
    },
    {
      id: 'rab-pra-porprov-2025',
      title: 'RAB Pra-Porprov Atletik 2025',
      type: 'RAB Proposal',
      cabor: 'PENGKOT PASI SURAKARTA',
      amount: 'Rp 85.000.000',
      date: '02 Mei 2025',
      status: 'Proses Verifikasi',
      statusColor: 'blue',
      step: 1,
      desc: 'Sedang diperiksa oleh Verifikator Bidang Anggaran KONI.',
      action: 'Lacak Verifikasi',
      target: 'verification-flow',
    },
    {
      id: 'spj-termin1-2025',
      title: 'SPJ Termin I: Pembinaan Atlet 2025',
      type: 'LPJ & SPJ',
      cabor: 'PENGKOT PASI SURAKARTA',
      amount: 'Rp 35.000.000',
      date: '20 Mar 2025',
      status: 'Selesai BPKAD',
      statusColor: 'emerald',
      step: 4,
      desc: 'SKB Resmi telah terbit dan tersinkronisasi ke Kasda BPKAD.',
      action: 'Lihat SKB-SPJ',
      target: 'skb-doc',
    },
  ];

  const filteredItems = items.filter((it) => {
    if (activeFilter === 'rab') return it.type === 'RAB Proposal';
    if (activeFilter === 'lpj') return it.type === 'LPJ & SPJ';
    if (activeFilter === 'archive') return it.step === 4;
    return true;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F9FD] text-[#0f172a] pb-28 font-body">
      {/* 1. TOP HEADER & BRANDING */}
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
                alt="Logo Resmi KONI Kota Surakarta"
                width={40}
                height={40}
                className="h-full w-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-[15px] font-black tracking-tight uppercase text-[#0f172a] leading-none">
                  KONI SURAKARTA
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
              </div>
              <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#64748b] font-bold leading-tight mt-1 truncate">
                PORTAL PENGAJUAN RAB & LPJ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate?.('notifications')}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] hover:text-[#d32f2f] transition-all active:scale-95 shadow-sm"
              aria-label="Notifikasi"
            >
              <span className="material-symbols-outlined text-[21px]">notifications</span>
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#d32f2f] ring-2 ring-white animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* HERO TITLE & SUBTITLE */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-black text-[#0f172a] tracking-tight">
              Manajemen Hibah & LPJ
            </h1>
            <p className="text-xs text-[#64748b]">Pengajuan usulan RAB dan pertanggungjawaban SPJ cabor</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('termin3')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white text-xs font-black shadow-md shadow-red-500/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            Termin III
          </button>
        </div>

        {/* ATTENTION / REVISION BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/25 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Perlu Tindakan
                </span>
                <span className="text-[11px] text-[#64748b]">Batas 3 Hari Lagi</span>
              </div>
              <h2 className="font-display text-xs font-black text-[#0f172a] mt-1">
                RAB Pra-Porprov Atletik 2025 (Koreksi Uang Saku)
              </h2>
              <p className="text-[11px] text-[#475569] mt-0.5 line-clamp-2">
                Catatan Verifikator: Harap lampirkan SK penetapan atlet Pelatda dan sesuaikan plafon uang saku.
              </p>
              <button
                type="button"
                onClick={() => onNavigate?.('notifications')}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-black hover:bg-amber-600 transition-colors shadow-sm"
              >
                <span>Perbaiki Sekarang</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 BENTO SUMMARY CARDS */}
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-[#64748b] mb-2">
            Ringkasan Berkas T.A. 2025
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#64748b]">Total Usulan</span>
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-[#0f172a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">payments</span>
                </span>
              </div>
              <div className="font-display text-base font-black text-[#0f172a] mt-1">
                Rp 175.000.000
              </div>
              <div className="text-[10px] text-[#64748b] mt-0.5 font-medium">7 berkas terdaftar</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700">Disetujui</span>
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                </span>
              </div>
              <div className="font-display text-base font-black text-emerald-700 mt-1">
                2 Berkas
              </div>
              <div className="text-[10px] text-emerald-600/80 mt-0.5 font-medium">Siap pencairan SP2D</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-blue-700">Proses Review</span>
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                </span>
              </div>
              <div className="font-display text-base font-black text-blue-700 mt-1">
                1 Berkas
              </div>
              <div className="text-[10px] text-blue-600/80 mt-0.5 font-medium">Verifikasi verifikator</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-700">Perlu Revisi</span>
                <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">edit_note</span>
                </span>
              </div>
              <div className="font-display text-base font-black text-amber-700 mt-1">
                1 Berkas
              </div>
              <div className="text-[10px] text-amber-600/80 mt-0.5 font-medium">Catatan tim keuangan</div>
            </div>
          </div>
        </div>

        {/* CAPSULE FILTER TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeFilter === 'all'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-100'
            }`}
          >
            Semua Berkas (7)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('rab')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeFilter === 'rab'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-100'
            }`}
          >
            RAB Proposal (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('lpj')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeFilter === 'lpj'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-100'
            }`}
          >
            LPJ & SPJ (3)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('archive');
              onNavigate?.('archive');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeFilter === 'archive'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0] hover:bg-slate-100'
            }`}
          >
            Riwayat Arsip
          </button>
        </div>

        {/* LIST OF PROPOSAL CARDS WITH STEP TRACKER */}
        <div className="space-y-3">
          <div className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Daftar Berkas Pengajuan ({filteredItems.length})
          </div>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-[#475569]">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-[#94a3b8]">•</span>
                    <span className="text-[10px] text-[#94a3b8] font-medium">{item.date}</span>
                  </div>
                  <h3 className="font-display text-sm font-black text-[#0f172a] leading-snug">
                    {item.title}
                  </h3>
                  <div className="font-display text-sm font-black text-[#d32f2f] mt-1">
                    {item.amount}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                    item.statusColor === 'emerald'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : item.statusColor === 'amber'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-[11px] text-[#64748b] mt-2 line-clamp-2">{item.desc}</p>

              {/* 4-STEP TRACKER */}
              <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
                <div className="flex items-center justify-between text-[9.5px] font-bold text-[#94a3b8] mb-1.5">
                  <span className={item.step >= 1 ? 'text-[#0f172a]' : ''}>1. Usulan</span>
                  <span className={item.step >= 2 ? 'text-[#0f172a]' : ''}>2. Verifikasi</span>
                  <span className={item.step >= 3 ? 'text-[#0f172a]' : ''}>3. SKB KONI</span>
                  <span className={item.step >= 4 ? 'text-[#0f172a]' : ''}>4. SP2D</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div
                      key={stepNum}
                      className={`h-full flex-1 rounded-full transition-all ${
                        item.step >= stepNum
                          ? item.statusColor === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-[#d32f2f]'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* CARD ACTION BUTTONS */}
              <div className="mt-3 pt-2.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onShowToast?.(`Mengunduh dokumen ${item.title}`);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#64748b] hover:text-[#0f172a]"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Unduh Dokumen</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate?.(item.target)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#121316] hover:text-white text-[11px] font-black text-[#0f172a] transition-all"
                >
                  <span>{item.action}</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
