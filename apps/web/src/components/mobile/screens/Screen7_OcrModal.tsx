'use client';

import React from 'react';

interface Screen7OcrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onShowToast?: (msg: string) => void;
}

export const Screen7_OcrModal: React.FC<Screen7OcrModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onShowToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* MODAL HEADER */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">document_scanner</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                Smart OCR SIKONI AI
              </span>
              <h3 className="font-display text-sm font-black text-white">
                Nota Belanja Berhasil Diunggah!
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Tutup"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto space-y-4 text-[#0f172a] text-xs">
          {/* CAMERA RECEIPT PREVIEW SQUIRCLE */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden shrink-0 border border-slate-300">
              <span className="material-symbols-outlined text-[30px]">receipt_long</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  OCR 99.4% Akurat
                </span>
                <span className="text-[10px] text-slate-400">16 Mei 2025</span>
              </div>
              <h4 className="font-display text-xs font-black text-[#0f172a] mt-1 truncate">
                Toko Buku & ATK Surya Solo
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Jl. Slamet Riyadi No. 182, Surakarta
              </p>
            </div>
          </div>

          {/* EXTRACTED METADATA */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
              Hasil Ekstraksi Data Kwitansi
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#F8F9FD] border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Nomor Nota:</span>
                <span className="font-mono font-bold text-[#0f172a]">88219/NOTA/2025</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FD] border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Pos Belanja:</span>
                <span className="font-bold text-[#0f172a]">Pos 04: ATK & Lapangan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FD] border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Metode Pembayaran:</span>
                <span className="font-bold text-[#0f172a]">Transfer QRIS / Tunai</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FD] border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Total Transaksi:</span>
                <span className="font-display font-black text-[#d32f2f] text-sm">Rp 450.000</span>
              </div>
            </div>
          </div>

          {/* ITEMIZED BREAKDOWN */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#64748b]">
              Rincian Barang yang Terdeteksi
            </span>
            <div className="space-y-1.5">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Kertas HVS F4 80gr PaperOne (3 Rim)</span>
                <span className="font-mono font-bold">Rp 195.000</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Tinta Printer Epson 003 Black (2 Botol)</span>
                <span className="font-mono font-bold">Rp 170.000</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Map Ordner Folio & Plastik Klip (5 Pcs)</span>
                <span className="font-mono font-bold">Rp 85.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL ACTIONS */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onShowToast?.('Nota ATK Surya Solo berhasil disimpan ke Pos 04!');
              onConfirm?.();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[17px]">check_circle</span>
            <span>Simpan & Konfirmasi Nota</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onShowToast?.('Membuka kamera untuk foto nota baru...');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
            <span>Unggah Nota Lainnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};
