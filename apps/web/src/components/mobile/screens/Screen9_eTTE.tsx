'use client';

import React from 'react';
import Image from 'next/image';

interface Screen9eTTEProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen9_eTTE: React.FC<Screen9eTTEProps> = ({
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
                Tanda Terima Elektronik (e-TTE)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onShowToast?.('Membagikan salinan sertifikat e-TTE...')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] hover:text-[#d32f2f] transition-all"
              aria-label="Bagikan"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* OFFICIAL DIGITAL CERTIFICATE (E-TTE) CARD */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#121316] via-[#1c1d22] to-[#0a0a0c] text-white shadow-xl relative overflow-hidden border border-amber-500/20">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <div>
                <span className="text-[9.5px] font-black uppercase tracking-wider text-amber-400 block">
                  TERVERIFIKASI BSrE BSSN
                </span>
                <span className="text-[10px] text-zinc-400">Sertifikasi Elektronik Resmi</span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9.5px] font-black uppercase">
              Sah Hukum
            </span>
          </div>

          <div className="mt-4 text-center space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
              BUKTI PENERIMAAN DIGITAL
            </span>
            <h2 className="font-display text-sm font-black text-white">
              Tanda Terima SPJ Termin II: TC Porprov XVII
            </h2>
            <div className="font-mono text-xs text-amber-400 font-bold">
              #TTE-KONI-2025-0891
            </div>
          </div>

          {/* QR CODE & HASH VERIFICATION BLOCK */}
          <div className="my-5 p-4 rounded-2xl bg-white text-[#0f172a] flex flex-col items-center justify-center shadow-inner space-y-2">
            <div className="w-32 h-32 rounded-xl bg-slate-900 flex flex-col items-center justify-center p-2 text-white relative">
              <span className="material-symbols-outlined text-[64px] text-amber-400">qr_code_2</span>
              <span className="text-[8px] font-mono tracking-tighter text-zinc-400 mt-1">
                SHA256: 8a9f...3e1b
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10.5px] font-black text-[#0f172a] block">
                Pindai untuk Validasi Dokumen Asli
              </span>
              <span className="text-[9.5px] text-slate-500 block">
                Tersambung ke Database BPKAD Kota Surakarta
              </span>
            </div>
          </div>

          {/* METADATA */}
          <div className="space-y-2 text-xs border-t border-white/10 pt-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Pemberi Kuasa:</span>
              <span className="font-bold text-white">Bendahara KONI Surakarta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Penerima TTE:</span>
              <span className="font-bold text-white">Pengkot PASI Surakarta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Nominal Disahkan:</span>
              <span className="font-display font-black text-amber-400">Rp 85.000.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Waktu Penandatanganan:</span>
              <span className="font-medium text-white">18 Mei 2025, 14:35 WIB</span>
            </div>
          </div>
        </div>

        {/* VERIFICATION FLOW SHORTCUT CARD */}
        <div
          onClick={() => onNavigate?.('verification-flow')}
          className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div>
              <div className="font-display text-xs font-black text-[#0f172a]">
                Alur Verifikasi Bertingkat
              </div>
              <div className="text-[11px] text-[#64748b]">
                Lacak tanda tangan Verifikator, Bendahara & Ketua Umum
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">chevron_right</span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onShowToast?.('Mengunduh Sertifikat e-TTE Resmi (PDF)...')}
            className="py-3 px-4 rounded-2xl bg-white border border-[#e2e8f0] text-xs font-black text-[#0f172a] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Unduh PDF</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('milestone')}
            className="py-3 px-4 rounded-2xl bg-[#d32f2f] text-xs font-black text-white shadow-md shadow-red-500/20 hover:bg-red-700 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">flag</span>
            <span>Milestone Kasda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
