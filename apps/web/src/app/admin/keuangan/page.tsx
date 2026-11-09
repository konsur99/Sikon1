'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import { Coins, FileSpreadsheet, ArrowUpRight, CheckCircle2, ArrowRight, Download, Check } from 'lucide-react';

export default function FinanceOverviewPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const financeModules = [
    { title: '＋ Dana Masuk', desc: 'Pencatatan penerimaan dana dan sumber pendanaan APBD/Sponsor.', href: '/admin/dana-masuk' },
    { title: '▤ Anggaran', desc: 'Pagu, alokasi program, RAB disetujui, dan komitmen berjalan.', href: '/admin/anggaran' },
    { title: '⇧ Realisasi', desc: 'Pengeluaran terverifikasi dan status kewajiban kas.', href: '/admin/realisasi' },
    { title: '☆ Insentif', desc: 'Data penerima honorium atlet, pelatih, dan ofisial.', href: '/admin/insentif' },
    { title: '％ Pajak', desc: 'Rekap potongan PPh/PPN dan bukti setor pajak.', href: '/admin/pajak' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Keuangan</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Keuangan</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Pemantauan dana masuk, alokasi anggaran, realisasi terverifikasi, insentif, dan perpajakan.
          </p>
        </div>

        <button
          onClick={() => showToast('Ekspor seluruh pembukuan keuangan (Excel) berhasil diunduh.')}
          className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <Download size={14} /> Ekspor Data Keuangan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Dana Diterima" value="Rp 2,45 M" foot="Akumulasi tahun 2026" icon={<Coins size={18} />} />
        <KpiCard label="Dialokasikan" value="Rp 1,82 M" foot="74,3% dari dana diterima" icon={<FileSpreadsheet size={18} />} />
        <KpiCard label="Realisasi Valid" value="Rp 1,21 M" foot="Sudah diverifikasi nota" icon={<ArrowUpRight size={18} />} />
        <KpiCard label="Pembayaran Kas" value="Rp 985 jt" foot="Sudah dicairkan kasir" icon={<CheckCircle2 size={18} />} />
      </div>

      {/* Visual Trends: Monthly Usage Trend Chart & Donut Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-sikoni lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy">Tren Penggunaan Dana</h3>
                <p className="text-[11px] text-sikoni-muted">Alokasi anggaran vs realisasi kas bulanan tahun 2026</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="flex items-center gap-1 text-sikoni-teal">
                  <span className="w-2.5 h-2.5 bg-sikoni-teal rounded-sm" /> Anggaran
                </span>
                <span className="flex items-center gap-1 text-sikoni-gold">
                  <span className="w-2.5 h-2.5 bg-sikoni-gold rounded-sm" /> Realisasi
                </span>
              </div>
            </div>

            <div className="h-44 flex items-end justify-between gap-2 pt-4 pb-2 border-b border-sikoni-line">
              {[
                { m: 'Jan', a: 48, r: 24 },
                { m: 'Feb', a: 61, r: 32 },
                { m: 'Mar', a: 43, r: 21 },
                { m: 'Apr', a: 71, r: 45 },
                { m: 'Mei', a: 58, r: 36 },
                { m: 'Jun', a: 83, r: 54 },
                { m: 'Jul', a: 69, r: 44 },
                { m: 'Agu', a: 76, r: 50 },
                { m: 'Sep', a: 55, r: 35 },
                { m: 'Okt', a: 88, r: 62 },
                { m: 'Nov', a: 74, r: 48 },
                { m: 'Des', a: 91, r: 60 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1 h-[80%]">
                    <div
                      className="w-2 sm:w-2.5 bg-sikoni-teal rounded-t-sm"
                      style={{ height: `${bar.a}%` }}
                    />
                    <div
                      className="w-2 sm:w-2.5 bg-sikoni-gold rounded-t-sm"
                      style={{ height: `${bar.r}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-sikoni-muted">{bar.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-sikoni-muted pt-3">
            Data pemantauan penyerapan anggaran per bulan dari seluruh cabang olahraga.
          </div>
        </div>

        {/* Donut Chart: Budget Composition */}
        <div className="card-sikoni flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Distribusi Anggaran</h3>
            <p className="text-[11px] text-sikoni-muted">Komposisi penggunaan anggaran 2026</p>
          </div>

          <div className="flex items-center gap-5 my-3">
            <div className="relative w-28 h-28 rounded-full border-[12px] border-sikoni-teal flex items-center justify-center flex-shrink-0">
              <div className="text-center">
                <span className="text-lg font-black text-sikoni-navy block leading-none">68%</span>
                <span className="text-[8px] text-sikoni-muted font-bold">Realisasi</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] flex-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sikoni-teal" />
                  Program olahraga
                </span>
                <b>44%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sikoni-gold" />
                  Pembinaan atlet
                </span>
                <b>25%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9cb8ca]" />
                  Operasional
                </span>
                <b>18%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#e9edf1]" />
                  Belum dialokasi
                </span>
                <b>13%</b>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-sikoni-muted pt-2 border-t border-sikoni-line">
            *Berdasarkan alokasi pagu APBD Surakarta 2026.
          </div>
        </div>
      </div>

      {/* Module Navigation Cards */}
      <div className="card-sikoni">
        <h3 className="text-sm font-extrabold text-sikoni-navy mb-1">Akses Modul Keuangan</h3>
        <p className="text-[11px] text-sikoni-muted mb-4">Pilih modul untuk melihat dan mencatat data transaksi terinci</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {financeModules.map((mod, idx) => (
            <div key={idx} className="bg-slate-50 border border-sikoni-line p-4 rounded-xl flex flex-col justify-between">
              <div>
                <b className="text-xs text-sikoni-navy block">{mod.title}</b>
                <p className="text-[11px] text-sikoni-muted mt-1 leading-relaxed">{mod.desc}</p>
              </div>
              <Link
                href={mod.href}
                className="mt-4 text-[11px] font-bold text-sikoni-teal hover:underline flex items-center gap-1"
              >
                Buka modul <ArrowRight size={13} />
              </Link>
            </div>
          ))}
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
