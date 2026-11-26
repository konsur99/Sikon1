'use client';

import React from 'react';
import Image from 'next/image';

interface Screen10VerificationFlowProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen10_VerificationFlow: React.FC<Screen10VerificationFlowProps> = ({
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
                Alur Verifikasi Bertingkat
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
        {/* CONTEXT BANNER */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
          <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block">
            Dokumen Pertanggungjawaban
          </span>
          <h2 className="font-display text-sm font-black text-[#0f172a] mt-0.5">
            SPJ Termin II: TC Porprov XVII 2025
          </h2>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="font-mono font-bold text-[#d32f2f]">Rp 85.000.000</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#64748b]">Pengkot PASI Surakarta</span>
          </div>
        </div>

        {/* 4 STAGE VERTICAL TIMELINE */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b] block">
            Tahapan Otorisasi & Validasi Dokumen
          </span>

          <div className="relative pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {/* STAGE 1 */}
            <div className="relative">
              <span className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </span>
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-[#0f172a]">
                    1. Pengunggahan & Validasi OCR Sistem Digital
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Selesai</span>
                </div>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  18 Mei 2025, 14:22 WIB • Semua 4 nota dan bukti potong pajak terunggah 100%.
                </p>
              </div>
            </div>

            {/* STAGE 2 */}
            <div className="relative">
              <span className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-white shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[14px]">sync</span>
              </span>
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-[#0f172a]">
                    2. Pemeriksaan Berkas Fisik & Kwitansi Asli
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold">Sedang Berjalan</span>
                </div>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  Petugas Verifikator: Agus Wahyudi, S.Pd (Bidang Anggaran KONI Surakarta).
                </p>
                <div className="mt-2 p-2 rounded-lg bg-blue-50 border border-blue-100 text-[11px] text-blue-800">
                  Status: Uji petik 5 item kwitansi berlangsung di Kantor KONI Manahan.
                </div>
              </div>
            </div>

            {/* STAGE 3 */}
            <div className="relative">
              <span className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center ring-4 ring-white shadow-sm">
                <span className="material-symbols-outlined text-[14px]">account_balance</span>
              </span>
              <div className="text-xs opacity-60">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-[#0f172a]">
                    3. Validasi BPKAD Solo & Rekonsiliasi Kasda
                  </span>
                  <span className="text-[10px] text-slate-500">Menunggu Tahap 2</span>
                </div>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  Pencocokan mutasi kasda dengan rekening koran Bank Jateng pengeluaran.
                </p>
              </div>
            </div>

            {/* STAGE 4 */}
            <div className="relative">
              <span className="absolute -left-7 top-0 w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center ring-4 ring-white shadow-sm">
                <span className="material-symbols-outlined text-[14px]">draw</span>
              </span>
              <div className="text-xs opacity-60">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-[#0f172a]">
                    4. Penerbitan SKB Pengesahan & Pembukaan Termin III
                  </span>
                  <span className="text-[10px] text-slate-500">Tahap Akhir</span>
                </div>
                <p className="text-[11px] text-[#64748b] mt-0.5">
                  Penerbitan Surat Keputusan Bersama (SKB) resmi dan pencairan dana Termin III.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT VERIFICATION OFFICER SECTION */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
              Petugas Verifikasi SIKONI
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Online
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
              AW
            </div>
            <div>
              <div className="font-display text-xs font-black text-[#0f172a]">
                Agus Wahyudi, S.Pd
              </div>
              <div className="text-[11px] text-[#64748b]">
                Verifikator Utama Anggaran & SPJ KONI
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onShowToast?.('Membuka WhatsApp Petugas Verifikator...')}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast?.('Menghubungi Sekretariat KONI (0271) 714920...')}
              className="py-2.5 px-3 rounded-xl bg-slate-50 text-[#0f172a] border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Telp Sekretariat</span>
            </button>
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <button
          type="button"
          onClick={() => onNavigate?.('milestone')}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white text-xs font-black shadow-md shadow-red-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Buka Milestone Persetujuan</span>
        </button>
      </div>
    </div>
  );
};
