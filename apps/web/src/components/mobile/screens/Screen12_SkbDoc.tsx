'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Screen12SkbDocProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen12_SkbDoc: React.FC<Screen12SkbDocProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1c1d22] text-[#f1f5f9] pb-28 font-body">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Kembali"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
            )}
            <div className="relative h-11 w-11 shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white shadow-sm">
              <Image
                src="/images/logo_koni.png"
                alt="Logo KONI Surakarta"
                width={40}
                height={40}
                className="h-full w-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#f59e0b] font-bold leading-none mb-1">
                KONI KOTA SURAKARTA
              </span>
              <h1 className="font-display text-[14px] font-black tracking-tight text-white leading-tight truncate">
                Dokumen SKB-SPJ (PDF Resmi)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onShowToast?.('Membagikan berkas SKB-SPJ...')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Bagikan"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast?.('Mengunduh PDF SKB Resmi (1.8 MB)...')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Unduh"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>
      </header>

      {/* VIEWER TOOLBAR */}
      <div className="px-4 py-2.5 bg-[#121316] border-b border-white/10 flex items-center justify-between text-xs text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono">Halaman 1 dari 2</span>
          <span className="text-zinc-500">•</span>
          <span className="text-[11px] text-emerald-400 font-bold">Terverifikasi BSrE</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
            className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-[15px]">remove</span>
          </button>
          <span className="font-mono text-[11px] px-1">{zoomLevel}%</span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
            className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER (LOOKS LIKE AN OFFICIAL GOVERNMENT A4 SHEET) */}
      <div className="p-4 flex flex-col items-center">
        <div
          className="w-full max-w-sm bg-white text-[#0f172a] rounded-xl shadow-2xl p-6 transition-transform origin-top border border-slate-300 space-y-4"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* OFFICIAL GOVERNMENT KOP SURAT */}
          <div className="text-center pb-3 border-b-2 border-[#0f172a] space-y-0.5">
            <h3 className="font-display text-[11px] font-black uppercase tracking-wider text-[#0f172a]">
              PEMERINTAH KOTA SURAKARTA
            </h3>
            <h4 className="font-display text-[10.5px] font-bold uppercase text-[#0f172a]">
              BADAN PENGELOLAAN KEUANGAN & ASET DAERAH (BPKAD)
            </h4>
            <h5 className="font-display text-[10.5px] font-extrabold uppercase text-[#d32f2f]">
              KOMITE OLAHRAGA NASIONAL INDONESIA (KONI)
            </h5>
            <p className="text-[8px] text-[#64748b]">
              Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1 Surakarta Telp (0271) 714920
            </p>
          </div>

          {/* SURAT TITLE */}
          <div className="text-center pt-1">
            <span className="font-display text-xs font-black uppercase underline tracking-wide">
              SURAT KEPUTUSAN BERSAMA (SKB-SPJ)
            </span>
            <div className="font-mono text-[9px] text-[#475569] mt-0.5">
              Nomor: 426/089/SKB-KONI/V/2025
            </div>
            <div className="font-mono text-[8.5px] text-[#475569]">
              Lampiran SP2D: 900/0412/SP2D/2025
            </div>
          </div>

          {/* BODY PROSE */}
          <div className="text-[10px] leading-relaxed text-[#334155] space-y-2 text-justify">
            <p>
              Menyatakan bahwa Laporan Pertanggungjawaban (SPJ) Penggunaan Dana Hibah Pemerintah Kota Surakarta Tahun Anggaran 2025 Termin II dari:
            </p>
            <div className="pl-3 py-1.5 bg-slate-50 border-l-2 border-[#d32f2f] text-[9.5px] space-y-0.5 font-medium">
              <div>Nama Cabor: <strong>PENGKOT PASI SURAKARTA</strong></div>
              <div>Kegiatan: <strong>TC Sentralisasi Porprov XVII Jawa Tengah</strong></div>
              <div>Nominal SP2D: <strong>Rp 85.000.000 (Delapan Puluh Lima Juta Rupiah)</strong></div>
              <div>Realisasi SPJ: <strong>Rp 85.000.000 (100% Sesuai Plafon)</strong></div>
            </div>
            <p>
              Telah diperiksa fisik, diuji petik kuitansi dan disahkan memenuhi ketentuan peraturan perundang-undangan dan pedoman teknis hibah KONI Surakarta.
            </p>
          </div>

          {/* SIGNATURE / STEMPEL SECTION */}
          <div className="grid grid-cols-2 gap-2 pt-4 text-center text-[9px] border-t border-slate-200">
            <div>
              <span className="text-[#64748b] block">Verifikator BPKAD Solo</span>
              <div className="h-10 flex items-center justify-center font-script text-slate-400 italic text-[11px]">
                [TTE Sah BPKAD]
              </div>
              <span className="font-bold block text-[#0f172a]">Drs. Hendro W., M.Si</span>
              <span className="text-[8px] text-[#64748b]">NIP. 19740812 199903 1 004</span>
            </div>

            <div>
              <span className="text-[#64748b] block">Ketua Umum KONI Solo</span>
              <div className="h-10 flex items-center justify-center font-script text-red-600 font-bold text-[10px]">
                [e-TTE BSrE Valid]
              </div>
              <span className="font-bold block text-[#0f172a]">Drs. Sugeng Nugroho, M.Or</span>
              <span className="text-[8px] text-[#64748b]">KTA. KONI-SKT-001</span>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM FLOATING BAR */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-[#121316]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => onShowToast?.('Mencetak dokumen resmi ke printer network...')}
          className="py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-white/20 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Cetak</span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast?.('Mengunduh berkas SKB-SPJ PDF Resmi (1.8 MB)...')}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white font-black text-xs shadow-lg shadow-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>UNDUH PDF RESMI (1.8 MB)</span>
        </button>
      </div>
    </div>
  );
};
