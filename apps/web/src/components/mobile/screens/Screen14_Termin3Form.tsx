'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Screen14Termin3FormProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen14_Termin3Form: React.FC<Screen14Termin3FormProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast?.('Pengajuan Pencairan Termin III Rp 50.000.000 Berhasil Dikirim!');
      onNavigate?.('submissions');
    }, 1000);
  };

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
                Formulir Pencairan Termin III
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

      <form onSubmit={handleSubmit} className="px-4 pt-4 space-y-4">
        {/* BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                Pencairan Dana Hibah
              </span>
              <h2 className="font-display text-sm font-black text-[#0f172a] mt-0.5">
                Pengajuan Dana Termin III (Tahap Akhir)
              </h2>
              <p className="text-[11px] text-[#475569] mt-0.5">
                Alokasi persiapan akhir & pelaksanaan kompetisi Porprov XVII Jawa Tengah.
              </p>
            </div>
          </div>
        </div>

        {/* PREREQUISITES SYNCHRONIZATION CHECKLIST */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
              Prasyarat Tersinkronisasi
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black">
              3/3 Terpenuhi
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                <span className="text-[#0f172a] font-medium">SPJ Termin II Disahkan (SKB No. 426/089)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Lolos</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                <span className="text-[#0f172a] font-medium">Laporan Kemajuan Prestasi Atlet Terverifikasi</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Lolos</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                <span className="text-[#0f172a] font-medium">Faktur Pajak PPh 21 / PPN Belanja Lunas</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Lolos</span>
            </div>
          </div>
        </div>

        {/* RINCIAN PLAFON PENCAIRAN */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b] block">
            Rincian Plafon Pencairan
          </span>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-[#64748b] block font-bold uppercase">Nominal Termin III:</span>
            <div className="font-display text-xl font-black text-[#d32f2f] mt-0.5">
              Rp 50.000.000
            </div>
            <span className="text-[11px] text-slate-500 italic mt-0.5 block">
              Lima Puluh Juta Rupiah
            </span>
          </div>

          <div className="space-y-1.5 text-xs pt-1">
            <label className="text-[11px] font-bold text-[#0f172a] block">
              Rekening Penerima (Bank Jateng Terdaftar)
            </label>
            <div className="p-3 rounded-xl bg-white border border-slate-300 font-mono text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0f172a] block">1-002-83948-2</span>
                <span className="text-[10px] font-sans text-slate-500 block">Bank Jateng Cabang Solo • a.n. Pengkot PASI</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
            </div>
          </div>
        </div>

        {/* RINCIAN RENCANA BELANJA (RAB) */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
              Rincian Pos Rencana Belanja (RAB)
            </span>
            <span className="text-[10.5px] font-bold text-[#d32f2f]">Total: 100%</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0f172a] block">Akomodasi & Transportasi Atlet Porprov</span>
                <span className="text-[10px] text-slate-500">18 Atlet + 4 Pelatih & Official</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 25.000.000</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0f172a] block">Uang Saku Bertanding & Nutrisi</span>
                <span className="text-[10px] text-slate-500">Periode Hari-H Laga Porprov</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 15.000.000</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#0f172a] block">Medis, Suplemen & Fisioterapi Recovery</span>
                <span className="text-[10px] text-slate-500">Perlengkapan P3K & Nutrisi Laga</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a]">Rp 10.000.000</span>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white text-xs font-black shadow-lg shadow-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSubmitting ? 'sync' : 'send'}
            </span>
            <span>
              {isSubmitting ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan Pencairan Termin III'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
