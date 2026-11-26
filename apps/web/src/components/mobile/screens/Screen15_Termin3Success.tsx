'use client';

import React from 'react';
import Image from 'next/image';

interface Screen15Termin3SuccessProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen15_Termin3Success: React.FC<Screen15Termin3SuccessProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
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
                Pencairan Termin III Terkirim
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

      <div className="px-4 pt-5 space-y-4">
        {/* CELEBRATION & SUCCESS CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm flex flex-col items-center text-center border border-[#e2e8f0]">
          {/* Flame Glory Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-red-500/15 blur-2xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d32f2f] via-amber-500 to-[#d32f2f]" />

          {/* Radiant Celebration Check Badge */}
          <div className="relative mt-2 mb-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857] flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white relative">
              <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
            </div>
            {/* Flame mini badge */}
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-900 p-1.5 rounded-full shadow-md flex items-center justify-center border-2 border-white">
              <span className="material-symbols-outlined text-[15px] font-black">local_fire_department</span>
            </div>
          </div>

          {/* Status Live Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 mb-3 shadow-xs border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[10px] font-black tracking-wider uppercase">
              STATUS: MENUNGGU VERIFIKASI AWAL
            </span>
          </div>

          <h2 className="font-display text-lg font-black text-[#0f172a] tracking-tight">
            Pengajuan Pencairan Termin III Berhasil Dikirim!
          </h2>
          <p className="text-xs text-[#64748b] mt-1 max-w-sm">
            Berkas digital usulan Termin III sebesar <span className="font-black text-[#d32f2f]">Rp 50.000.000</span> telah masuk ke antrean verifikasi Tim Verifikator Keuangan KONI Surakarta.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-xs text-amber-700 font-bold">
            <span className="material-symbols-outlined text-[16px]">sports_score</span>
            <span className="text-[10.5px] uppercase tracking-wider">KONI Surakarta • Solo Tangguh Berprestasi</span>
          </div>
        </div>

        {/* TICKET / PROOF METADATA CARD */}
        <div className="rounded-3xl bg-white shadow-sm border border-[#e2e8f0] overflow-hidden">
          <div className="bg-gradient-to-r from-[#121316] via-[#1c1d22] to-[#121316] px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">receipt_long</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                BUKTI PENGAJUAN DIGITAL RESMI
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">PASI-SKA</span>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                  Kode Registrasi Pencairan
                </span>
                <span className="font-mono text-sm font-black text-[#0f172a]">
                  #TRM3-PASI-2025-0520
                </span>
              </div>
              <button
                type="button"
                onClick={() => onShowToast?.('Kode pencairan berhasil disalin!')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Salin</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10.5px] text-slate-500 block">Plafon Diajukan:</span>
                <span className="font-display font-black text-[#d32f2f] text-base block mt-0.5">
                  Rp 50.000.000
                </span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-500 block">Waktu Submit:</span>
                <span className="font-medium text-[#0f172a] block mt-0.5">
                  20 Mei 2025, 10:14 WIB
                </span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-500 block">Rekening Bank Jateng:</span>
                <span className="font-mono font-bold text-[#0f172a] block mt-0.5">1-002-83948-2</span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-500 block">Tahap Termin:</span>
                <span className="font-bold text-amber-700 block mt-0.5">Termin III (Tahap Akhir)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 TAHAPAN VERIFIKASI & PENCAIRAN */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Tahapan Verifikasi & Pencairan
          </span>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                1
              </div>
              <div>
                <span className="font-black text-[#0f172a] block">
                  Verifikasi Berkas Fisik & Sinkronisasi SPJ II
                </span>
                <span className="text-[11px] text-[#64748b] mt-0.5 block">
                  Pemeriksaan keabsahan SKB-SPJ Termin II dan rincian alokasi kebutuhan atlet Porprov.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                2
              </div>
              <div>
                <span className="font-black text-[#0f172a] block">
                  Penerbitan Nota Dinas Persetujuan Bendahara
                </span>
                <span className="text-[11px] text-[#64748b] mt-0.5 block">
                  Penetapan jadwal pemindahbukuan ke rekening giro cabor.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                3
              </div>
              <div>
                <span className="font-black text-[#0f172a] block">
                  Penerbitan SP2D Kasda & Transfer Bank Jateng
                </span>
                <span className="text-[11px] text-[#64748b] mt-0.5 block">
                  Dana Rp 50.000.000 cair ke rekening Pengkot PASI Surakarta.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => onShowToast?.('Mengunduh Tanda Terima Pengajuan Termin III (PDF)...')}
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#e2e8f0] text-xs font-black text-[#0f172a] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh Bukti Tanda Terima (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white text-xs font-black shadow-lg shadow-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Kembali ke Beranda Utama</span>
          </button>
        </div>
      </div>
    </div>
  );
};
