'use client';

import React from 'react';
import Image from 'next/image';

interface Screen2SP2DProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen2_SP2D: React.FC<Screen2SP2DProps> = ({
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
              <h1 className="font-display text-[15px] font-black tracking-tight uppercase text-[#0f172a] leading-tight truncate">
                SP2D & Bukti Pencairan
              </h1>
              <span className="text-[9.5px] uppercase tracking-[0.14em] text-[#d32f2f] font-bold leading-tight truncate">
                KONI KOTA SURAKARTA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onShowToast?.('Membagikan berkas SP2D...')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] hover:text-[#d32f2f] transition-all"
              aria-label="Bagikan Bukti"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast?.('Mengunduh dokumen SP2D Resmi Bank Jateng (PDF)...')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] hover:text-[#d32f2f] transition-all"
              aria-label="Unduh SP2D"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* SP2D OFFICIAL CERTIFICATE CARD */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#121316] to-[#27272a] text-white shadow-xl relative overflow-hidden">
          {/* Subtle gold accent watermark */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  KAS DAERAH BPKAD SURAKARTA
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">Bank Jateng Cabang Utama Solo</span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              RTGS Cleared
            </span>
          </div>

          <div className="border-t border-white/10 pt-3">
            <span className="text-[11px] text-zinc-400 font-medium">Nomor SP2D Resmi:</span>
            <div className="font-mono text-sm font-black text-white mt-0.5 tracking-wide">
              900/0412/SP2D/2025
            </div>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-[10.5px] uppercase tracking-wider text-zinc-400 font-bold block">
              Total Dana Dicairkan (Termin II)
            </span>
            <div className="font-display text-2xl font-black text-amber-400 mt-1">
              Rp 85.000.000
            </div>
            <div className="text-[11px] text-zinc-300 mt-1">
              Terbilang: <span className="italic font-medium">Delapan Puluh Lima Juta Rupiah</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] pt-1">
            <div>
              <span className="text-zinc-400 block">Penerima Hibah:</span>
              <span className="font-bold text-white block mt-0.5">Pengkot PASI Surakarta</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Rekening Bank Jateng:</span>
              <span className="font-mono font-bold text-white block mt-0.5">1-002-83948-2</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Tanggal Efektif:</span>
              <span className="font-bold text-white block mt-0.5">14 Mei 2025</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Status Rekonsiliasi:</span>
              <span className="font-bold text-emerald-400 block mt-0.5">100% Sesuai Kasda</span>
            </div>
          </div>
        </div>

        {/* ALOKASI PENGGUNAAN DANA (BAR CHART & ITEMS) */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-sm font-black text-[#0f172a]">
                Alokasi Penggunaan Dana
              </h2>
              <p className="text-[11px] text-[#64748b]">Distribusi pos belanja sesuai RAB yang disahkan</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#0f172a] text-[10px] font-black">
              4 Pos
            </span>
          </div>

          {/* DISTRIBUTION BAR */}
          <div className="h-2.5 w-full rounded-full bg-slate-100 flex overflow-hidden gap-0.5">
            <div className="bg-[#d32f2f] h-full" style={{ width: '35.3%' }} />
            <div className="bg-amber-500 h-full" style={{ width: '29.4%' }} />
            <div className="bg-blue-600 h-full" style={{ width: '17.6%' }} />
            <div className="bg-emerald-600 h-full" style={{ width: '17.6%' }} />
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d32f2f] shrink-0" />
                <span className="font-medium text-[#0f172a]">Honor Pelatih & Asisten (35.3%)</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 30.000.000</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="font-medium text-[#0f172a]">Uang Saku Atlet Pelatda (29.4%)</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 25.000.000</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span className="font-medium text-[#0f172a]">Ekstra Fooding & Gizi (17.6%)</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 15.000.000</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-medium text-[#0f172a]">Sewa Lintasan Lari Manahan (17.6%)</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 15.000.000</span>
            </div>
          </div>
        </div>

        {/* KEWAJIBAN PELAPORAN SPJ TERMIN II */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d32f2f] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">assignment_late</span>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#d32f2f]">
                Tenggat Waktu SPJ
              </span>
              <h3 className="font-display text-xs font-black text-[#0f172a] mt-0.5">
                Kewajiban Pelaporan SPJ Termin II
              </h3>
              <p className="text-[11px] text-[#475569] mt-0.5">
                Batas penyerahan bukti kuitansi & tanda terima fisik: <span className="font-bold text-[#0f172a]">30 Juni 2025</span> (H-12 tersisa).
              </p>
              <button
                type="button"
                onClick={() => onNavigate?.('lpj')}
                className="mt-3 px-3 py-1.5 rounded-xl bg-[#d32f2f] text-white text-xs font-black hover:bg-red-700 transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <span>Mulai Susun SPJ Termin II</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* LAMPIRAN DOKUMEN RESMI */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Lampiran Dokumen Resmi
          </span>

          <div
            onClick={() => onShowToast?.('Membuka Bukti Transfer RTGS Bank Jateng')}
            className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              </div>
              <div>
                <div className="text-xs font-black text-[#0f172a]">Bukti Transfer RTGS Bank Jateng</div>
                <div className="text-[10px] text-[#64748b]">Ukuran: 1.2 MB • Divalidasi BPKAD</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">download</span>
          </div>

          <div
            onClick={() => onNavigate?.('skb-doc')}
            className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <div className="text-xs font-black text-[#0f172a]">Lembar Verifikasi BPKAD Surakarta</div>
                <div className="text-[10px] text-[#64748b]">SKB-SPJ No: 426/089/2025 • Tanda Tangan Basah</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">chevron_right</span>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onShowToast?.('Mengunduh berkas lengkap SP2D (PDF)...')}
            className="py-3 px-4 rounded-2xl bg-white border border-[#e2e8f0] text-xs font-black text-[#0f172a] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Unduh SP2D (PDF)</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('lpj')}
            className="py-3 px-4 rounded-2xl bg-[#d32f2f] text-xs font-black text-white shadow-md shadow-red-500/20 hover:bg-red-700 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">edit_document</span>
            <span>Input Nota SPJ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
