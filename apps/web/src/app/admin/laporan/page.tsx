'use client';

import React, { useState } from 'react';
import { BarChart3, ArrowUpRight, Shield, Download, Calendar, Check, Clock } from 'lucide-react';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('Rekap realisasi anggaran');
  const [year, setYear] = useState('2026');
  const [cabor, setCabor] = useState('Seluruh cabor');
  const [format, setFormat] = useState('PDF');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerate = () => {
    showToast(`Dokumen ${reportType} (${year} - ${cabor}) format ${format} berhasil dibuat dan diunduh.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Laporan</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Laporan Eksekutif</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Kompilasi laporan keuangan, monitoring serapan hibah, performa cabor, dan audit pertanggungjawaban.
          </p>
        </div>

        <button
          onClick={() => showToast('Jadwal laporan mingguan/bulanan otomatis aktif via email sekretariat.')}
          className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <Calendar size={14} /> Jadwalkan Otomatis
        </button>
      </div>

      {/* 3 Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-sikoni flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sikoni-teal2 text-sikoni-teal grid place-items-center">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Laporan Anggaran & Pagu</h3>
            <p className="text-xs text-sikoni-muted leading-relaxed">
              Pagu disahkan, alokasi program per cabor, komitmen aktif, realisasi valid, dan sisa alokasi.
            </p>
          </div>
          <button
            onClick={() => {
              setReportType('Rekap realisasi anggaran');
              showToast('Template Laporan Anggaran & Pagu dipilih');
            }}
            className="text-xs font-bold text-sikoni-teal hover:underline text-left mt-4 pt-3 border-t border-sikoni-line"
          >
            Pilih laporan ini →
          </button>
        </div>

        <div className="card-sikoni flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sikoni-gold2 text-sikoni-gold grid place-items-center">
              <ArrowUpRight size={20} />
            </div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Laporan Realisasi & Kas</h3>
            <p className="text-xs text-sikoni-muted leading-relaxed">
              Rincian seluruh pengeluaran nota terverifikasi, kuitansi bayar, dan rekonsiliasi kas.
            </p>
          </div>
          <button
            onClick={() => {
              setReportType('Rekap pengeluaran');
              showToast('Template Laporan Realisasi & Kas dipilih');
            }}
            className="text-xs font-bold text-sikoni-gold hover:underline text-left mt-4 pt-3 border-t border-sikoni-line"
          >
            Pilih laporan ini →
          </button>
        </div>

        <div className="card-sikoni flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-sikoni-navy grid place-items-center">
              <Shield size={20} />
            </div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Laporan Evaluasi Cabor</h3>
            <p className="text-xs text-sikoni-muted leading-relaxed">
              Profil organisasi, keaktifan pembinaan atlet, kepatuhan LPJ, dan rekapitulasi usulan.
            </p>
          </div>
          <button
            onClick={() => {
              setReportType('Rekap evaluasi cabor');
              showToast('Template Laporan Evaluasi Cabor dipilih');
            }}
            className="text-xs font-bold text-sikoni-navy hover:underline text-left mt-4 pt-3 border-t border-sikoni-line"
          >
            Pilih laporan ini →
          </button>
        </div>
      </div>

      {/* Parameter Filter Card */}
      <div className="card-sikoni space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-sikoni-navy">Parameter Pembuatan Laporan</h3>
          <p className="text-[11px] text-sikoni-muted">Sesuaikan filter dan format dokumen yang diinginkan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-bold text-sikoni-navy block mb-1">Jenis Laporan</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
            >
              <option>Rekap realisasi anggaran</option>
              <option>Rekap pengeluaran</option>
              <option>Rekap evaluasi cabor</option>
              <option>Rekap LPJ & kepatuhan</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-sikoni-navy block mb-1">Tahun Anggaran</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
            >
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga</label>
            <select
              value={cabor}
              onChange={(e) => setCabor(e.target.value)}
              className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
            >
              <option>Seluruh cabor</option>
              <option>PASI (Atletik)</option>
              <option>PBSI (Bulutangkis)</option>
              <option>PSSI (Sepak Bola)</option>
              <option>PRSI (Renang)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-sikoni-navy block mb-1">Format Berkas</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
            >
              <option>PDF (Siap Cetak)</option>
              <option>Excel (Spreadsheet Data)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            className="px-6 py-2.5 rounded-xl bg-sikoni-teal text-white text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-md"
          >
            <Download size={15} /> Generate Laporan Resmi
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-fade-in text-xs font-bold">
          <Check size={16} className="text-sikoni-green" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
