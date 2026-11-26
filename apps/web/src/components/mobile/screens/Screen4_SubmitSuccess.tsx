'use client';

import React from 'react';
import Image from 'next/image';

interface Screen4SubmitSuccessProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
}

export const Screen4_SubmitSuccess: React.FC<Screen4SubmitSuccessProps> = ({
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
                Status Pengiriman e-SPJ
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

      <div className="px-4 pt-6 space-y-5 flex-1 flex flex-col items-center">
        {/* SUCCESS ICON ANIMATION */}
        <div className="relative w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-500/10">
          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[32px]">check</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="font-display text-lg font-black text-[#0f172a]">
            Laporan SPJ Berhasil Terkirim!
          </h2>
          <p className="text-xs text-[#64748b] max-w-xs mx-auto">
            Dokumen pertanggungjawaban telah masuk ke antrean verifikasi Bendahara & Tim Bimpres KONI Surakarta.
          </p>
        </div>

        {/* REGISTRATION METADATA CARD */}
        <div className="w-full p-4 rounded-3xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-bold">
                Kode Registrasi e-SPJ
              </span>
              <span className="font-mono text-sm font-black text-[#0f172a]">
                #SPJ-PASI-2025-0518
              </span>
            </div>
            <button
              type="button"
              onClick={() => onShowToast?.('Kode registrasi berhasil disalin!')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              <span>Salin</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <span className="text-[10.5px] text-[#64748b] block">Nilai Pertanggungjawaban:</span>
              <span className="font-display font-black text-[#d32f2f] text-sm block mt-0.5">
                Rp 85.000.000
              </span>
            </div>
            <div>
              <span className="text-[10.5px] text-[#64748b] block">Waktu Submit:</span>
              <span className="font-medium text-[#0f172a] block mt-0.5">
                18 Mei 2025, 14:22 WIB
              </span>
            </div>
            <div>
              <span className="text-[10.5px] text-[#64748b] block">Cabor Pengusul:</span>
              <span className="font-bold text-[#0f172a] block mt-0.5">Pengkot PASI Surakarta</span>
            </div>
            <div>
              <span className="text-[10.5px] text-[#64748b] block">Status Verifikasi:</span>
              <span className="font-bold text-blue-600 block mt-0.5">Menunggu Pemeriksaan</span>
            </div>
          </div>
        </div>

        {/* NEXT STEPS LIST */}
        <div className="w-full p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Tahapan Pemeriksaan Selanjutnya
          </span>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                1
              </div>
              <div className="text-xs">
                <span className="font-black text-[#0f172a] block">
                  Validasi Kelengkapan Berkas Fisik & Kwitansi
                </span>
                <span className="text-[11px] text-[#64748b] mt-0.5 block">
                  Petugas Sekretariat memeriksa keaslian nota, kuitansi bermaterai dan stempel basah cabor.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                2
              </div>
              <div className="text-xs">
                <span className="font-black text-[#0f172a] block">
                  Uji Petik Kasda & Kesesuaian BPKAD
                </span>
                <span className="text-[11px] text-[#64748b] mt-0.5 block">
                  Rekonsiliasi mutasi rekening pengeluaran dengan SP2D APBD Kota Surakarta.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                3
              </div>
              <div className="text-xs">
                <span className="font-black text-[#0f172a] block">
                  Penerbitan SKB Pengesahan Laporan & Termin III
                </span>
                <span className="text-[11px] text-[#64748b] mt-0.5 block">
                  Pemberian Tanda Terima Elektronik (e-TTE) BSrE dan pembukaan hak pencairan Termin III.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="w-full space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => onNavigate?.('ette')}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white text-xs font-black shadow-lg shadow-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Buka Tanda Terima Digital (e-TTE)</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('verification-flow')}
            className="w-full py-3 px-4 rounded-2xl bg-white border border-[#e2e8f0] text-[#0f172a] text-xs font-black shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">timeline</span>
            <span>Lihat Alur Verifikasi Bertingkat</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="w-full py-2.5 text-center text-xs font-bold text-[#64748b] hover:text-[#0f172a]"
          >
            Kembali ke Beranda Utama
          </button>
        </div>
      </div>
    </div>
  );
};
