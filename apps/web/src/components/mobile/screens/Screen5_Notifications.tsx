'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Screen5NotificationsProps {
  onBack?: () => void;
  onNavigate?: (screenKey: string) => void;
  onShowToast?: (msg: string) => void;
  onOpenOcrModal?: () => void;
}

export const Screen5_Notifications: React.FC<Screen5NotificationsProps> = ({
  onBack,
  onNavigate,
  onShowToast,
  onOpenOcrModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'spj' | 'bimpres' | 'announcement'>('all');

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
                Pusat Notifikasi
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onShowToast?.('Semua notifikasi ditandai telah dibaca')}
            className="text-[11px] font-bold text-[#d32f2f] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            <span>Tandai Baca</span>
          </button>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeTab === 'all'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            Semua (12)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('spj')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeTab === 'spj'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            Anggaran & SPJ (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bimpres')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeTab === 'bimpres'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            Verifikasi Bimpres (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('announcement')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
              activeTab === 'announcement'
                ? 'bg-[#121316] text-white shadow-sm'
                : 'bg-white text-[#64748b] border border-[#e2e8f0]'
            }`}
          >
            Pengumuman (5)
          </button>
        </div>

        {/* SECTION: HARI INI */}
        <div className="space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Hari Ini
          </span>

          {/* CRITICAL ACTIONABLE NOTIFICATION (FROM SCREEN 6) */}
          <div className="p-4 rounded-2xl bg-white border-2 border-red-500/30 shadow-md space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#d32f2f]" />

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#d32f2f] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">notification_important</span>
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-red-100 text-[#d32f2f]">
                    PENTING & MENDESAK
                  </span>
                  <span className="text-[10px] text-[#94a3b8]">09:15 WIB</span>
                </div>
                <h3 className="font-display text-xs font-black text-[#0f172a] mt-1">
                  Tenggat Pelaporan SPJ Termin II Menipis!
                </h3>
                <p className="text-[11px] text-[#475569] mt-0.5">
                  Laporan SPJ Anda masih memiliki 3 dokumen fisik yang perlu dilengkapi sebelum validasi BPKAD.
                </p>
              </div>
            </div>

            {/* CHECKLIST KELENGKAPAN BERKAS (SCREEN 6) */}
            <div className="p-3 rounded-xl bg-[#F8F9FD] border border-slate-200/80 space-y-2 text-xs">
              <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wide block">
                Dokumen yang Belum Lengkap:
              </span>
              <div className="flex items-center gap-2 text-[11px] text-[#0f172a]">
                <span className="material-symbols-outlined text-[16px] text-amber-500">check_box_outline_blank</span>
                <span>Foto Nota ATK & Kwitansi Asli Bermaterai</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#0f172a]">
                <span className="material-symbols-outlined text-[16px] text-amber-500">check_box_outline_blank</span>
                <span>Stempel Basah Ketua Pengkot PASI Surakarta</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#0f172a]">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">check_box</span>
                <span className="line-through text-[#94a3b8]">Rekap Presensi Atletik & Tanda Tangan Uang Saku</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenOcrModal ? onOpenOcrModal() : onNavigate?.('ocr-modal')}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white text-xs font-black shadow-md shadow-red-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">add_a_photo</span>
                <span>Lengkapi Berkas Sekarang</span>
              </button>
            </div>
          </div>

          {/* NOTIFICATION ITEM 2 */}
          <div
            onClick={() => onNavigate?.('ette')}
            className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-start gap-3 cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  e-TTE BSrE Diterbitkan
                </span>
                <span className="text-[10px] text-[#94a3b8]">08:00 WIB</span>
              </div>
              <h4 className="font-display text-xs font-bold text-[#0f172a] mt-1">
                Tanda Terima Digital SPJ Diterbitkan
              </h4>
              <p className="text-[11px] text-[#64748b] mt-0.5">
                Dokumen #TTE-KONI-2025-0891 telah ditandatangani secara digital oleh Sekretariat KONI.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: KEMARIN */}
        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
            Kemarin
          </span>

          <div
            onClick={() => onNavigate?.('sp2d')}
            className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-start gap-3 cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">paid</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Pencairan SP2D Berhasil
                </span>
                <span className="text-[10px] text-[#94a3b8]">Kemarin</span>
              </div>
              <h4 className="font-display text-xs font-bold text-[#0f172a] mt-1">
                Dana Hibah Rp 85.000.000 Masuk Rekening Cabor
              </h4>
              <p className="text-[11px] text-[#64748b] mt-0.5">
                Bank Jateng Cabang Solo telah menyelesaikan transfer SP2D Termin II ke Pengkot PASI Surakarta.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate?.('verification-flow')}
            className="p-3.5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex items-start gap-3 cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Jadwal Uji Petik
                </span>
                <span className="text-[10px] text-[#94a3b8]">2 hari lalu</span>
              </div>
              <h4 className="font-display text-xs font-bold text-[#0f172a] mt-1">
                Jadwal Verifikasi Fisik Bimpres KONI
              </h4>
              <p className="text-[11px] text-[#64748b] mt-0.5">
                Tim Verifikator menjadwalkan pemeriksaan berkas asli pada hari Selasa di Kantor Sekretariat Manahan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
