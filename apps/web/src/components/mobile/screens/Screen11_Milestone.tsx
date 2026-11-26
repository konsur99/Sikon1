'use client';

import React from 'react';
import Image from 'next/image';

interface Screen11MilestoneProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen11_Milestone: React.FC<Screen11MilestoneProps> = ({
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
                Milestone Persetujuan
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
        {/* HERO BADGE: SPJ DISAHKAN PENUH */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
              Status Akhir: Disahkan Penuh
            </span>
          </div>

          <h2 className="font-display text-lg font-black text-white">
            SPJ Termin II Disahkan Penuh!
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Laporan pertanggungjawaban dana hibah Rp 85.000.000 dinyatakan lolos verifikasi administrasi dan uji petik fisik Kasda.
          </p>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-emerald-200 uppercase block">Nomor SKB Bersama:</span>
              <span className="font-mono font-bold text-white">426/089/SKB-KONI/V/2025</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate?.('skb-doc')}
              className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 font-black text-xs shadow-md hover:bg-emerald-50 transition-colors"
            >
              Buka SKB
            </button>
          </div>
        </div>

        {/* UJI PETIK FISIK SCORECARD */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xs font-black text-[#0f172a]">
                Rekapitulasi Fisik & Kasda
              </h3>
              <p className="text-[11px] text-[#64748b]">Hasil uji sampling dokumen oleh BPKAD</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black">
              5/5 Lolos (100%)
            </span>
          </div>

          <div className="space-y-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700">1. Keabsahan Materai Rp 10.000</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Valid
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700">2. Stempel Basah Pengurus Cabor</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Valid
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700">3. Faktur Pajak PPh 21 / PPN Belanja</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Lunas
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-slate-700">4. Kesesuaian Rekening Koran Cabor</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Cocok
              </span>
            </div>
          </div>
        </div>

        {/* TERMIN III UNLOCK GOLDEN BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border-2 border-amber-500/30 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">lock_open</span>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                Pencairan Berikutnya
              </span>
              <h3 className="font-display text-sm font-black text-[#0f172a] mt-0.5">
                Dana Hibah Termin III Rp 50.000.000 Telah Terbuka!
              </h3>
              <p className="text-[11px] text-[#475569] mt-1">
                Karena SPJ Termin II telah disahkan 100%, hak pencairan Termin III untuk persiapan kompetisi utama Porprov telah aktif.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate?.('termin3')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs shadow-md shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Ajukan Pencairan Termin III Sekarang</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* BOTTOM LINKS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate?.('skb-doc')}
            className="py-3 px-4 rounded-2xl bg-white border border-[#e2e8f0] text-xs font-black text-[#0f172a] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">description</span>
            <span>Dokumen SKB</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('archive')}
            className="py-3 px-4 rounded-2xl bg-[#121316] text-xs font-black text-white shadow-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">folder_open</span>
            <span>Arsip Dokumen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
