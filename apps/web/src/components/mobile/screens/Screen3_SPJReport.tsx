'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Screen3SPJReportProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
  onOpenOcrModal?: () => void;
}

export const Screen3_SPJReport: React.FC<Screen3SPJReportProps> = ({
  onBack,
  onNavigate,
  onShowToast,
  onOpenOcrModal,
}) => {
  const [items, setItems] = useState([
    {
      id: 'pos-1',
      code: 'Pos 01',
      name: 'Uang Saku & Transport Pelatda',
      budget: 'Rp 25.000.000',
      realized: 'Rp 25.000.000',
      proof: 'Kwitansi Bermaterai + Presensi 18 Atlet (PDF)',
      status: 'Valid (100%)',
      statusColor: 'emerald',
      icon: 'directions_run',
    },
    {
      id: 'pos-2',
      code: 'Pos 02',
      name: 'Ekstra Fooding, Susu & Vitamin Atletik',
      budget: 'Rp 15.000.000',
      realized: 'Rp 15.000.000',
      proof: 'Nota Toko Sumber Rejeki & Faktur Pajak (JPG)',
      status: 'Valid (100%)',
      statusColor: 'emerald',
      icon: 'restaurant',
    },
    {
      id: 'pos-3',
      code: 'Pos 03',
      name: 'Honor 4 Pelatih Lisensi IAAF/PASI',
      budget: 'Rp 30.000.000',
      realized: 'Rp 30.000.000',
      proof: 'Bukti Transfer Payroll Bank Jateng & Bukti Potong PPh 21 (PDF)',
      status: 'Valid (100%)',
      statusColor: 'emerald',
      icon: 'sports',
    },
    {
      id: 'pos-4',
      code: 'Pos 04',
      name: 'Sewa Lintasan Lari Stadion Manahan',
      budget: 'Rp 15.000.000',
      realized: 'Rp 15.000.000',
      proof: 'Kwitansi Resmi UPT Dispora Kota Surakarta (PDF)',
      status: 'Valid (100%)',
      statusColor: 'emerald',
      icon: 'stadium',
    },
  ]);

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
                Pelaporan SPJ Termin II
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
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d32f2f]" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* SUMMARY HERO CARD */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#121316] to-[#27272a] text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              TC Porprov XVII 2025
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">#SP2D-900-0412</span>
          </div>

          <h2 className="font-display text-base font-black text-white">
            Pelaporan SPJ Termin II: TC Porprov XVII
          </h2>
          <p className="text-xs text-zinc-300 mt-1">
            Realisasi pertanggungjawaban dana hibah termin ke-2 cabor atletik PASI Surakarta.
          </p>

          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-300 font-medium">Realisasi Nota vs Plafon SP2D:</span>
              <span className="font-display font-black text-emerald-400">100% Lengkap</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-full" />
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Plafon SP2D:</span>
                <span className="font-mono font-bold text-white">Rp 85.000.000</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Nota:</span>
                <span className="font-mono font-bold text-emerald-400">Rp 85.000.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTION: UPLOAD / SMART OCR */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#d32f2f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">document_scanner</span>
            </div>
            <div>
              <div className="font-display text-xs font-black text-[#0f172a]">
                Smart Receipt OCR Assistant
              </div>
              <div className="text-[11px] text-[#64748b]">
                Pindai nota otomatis & validasi angka kwitansi AI
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenOcrModal ? onOpenOcrModal() : onNavigate?.('ocr-modal')}
            className="px-3 py-2 rounded-xl bg-[#d32f2f] text-white text-xs font-black shadow-md shadow-red-500/20 active:scale-95 transition-all shrink-0 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            <span>Scan Nota</span>
          </button>
        </div>

        {/* LIST OF POS BELANJA & BUKTI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
              Daftar Pos Belanja & Bukti (4 Pos)
            </span>
            <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              4/4 Berkas Terkumpul
            </span>
          </div>

          {items.map((pos) => (
            <div
              key={pos.id}
              className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f172a] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">{pos.icon}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#d32f2f] uppercase">
                      {pos.code}
                    </span>
                    <h3 className="font-display text-xs font-black text-[#0f172a] leading-tight">
                      {pos.name}
                    </h3>
                    <div className="font-mono text-xs font-black text-[#0f172a] mt-1">
                      {pos.realized}
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black">
                  {pos.status}
                </span>
              </div>

              {/* LAMPIRAN DETAIL */}
              <div className="p-3 rounded-xl bg-[#F8F9FD] border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-[#64748b]">attachment</span>
                  <span className="text-[11px] font-medium text-[#475569] truncate">
                    {pos.proof}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => onShowToast?.(`Melihat lampiran ${pos.name}`)}
                    className="p-1 rounded text-slate-500 hover:text-[#0f172a]"
                    title="Lihat"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenOcrModal ? onOpenOcrModal() : onNavigate?.('ocr-modal')}
                    className="p-1 rounded text-slate-500 hover:text-[#d32f2f]"
                    title="Ganti Nota"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM SUBMISSION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button
            type="button"
            onClick={() => onShowToast?.('Draf SPJ Termin II berhasil disimpan')}
            className="py-3 px-4 rounded-2xl bg-white border border-[#e2e8f0] text-xs font-black text-[#0f172a] shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">save</span>
            <span>Simpan Draf</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('submit-success')}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-xs font-black text-white shadow-lg shadow-red-500/25 hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">send</span>
            <span>KIRIM SPJ (100%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
