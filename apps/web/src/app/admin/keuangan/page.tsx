'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import {
  Coins,
  FileSpreadsheet,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  Download,
  Check,
  PieChart,
  TrendingUp,
  Percent,
  Award,
  PlusCircle,
} from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';

export default function FinanceOverviewPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const financeModules = [
    {
      title: 'Dana Masuk & Hibah',
      desc: 'Pencatatan pencairan dana hibah APBD Pemkot Surakarta & sponsorship.',
      href: '/admin/dana-masuk',
      icon: <PlusCircle size={20} className="text-sikoni-teal" />,
      accent: 'border-l-4 border-sikoni-teal',
      badge: 'Giro Aktif',
    },
    {
      title: 'Kontrol Anggaran & Pagu',
      desc: 'Pengawasan pagu 64 cabor, RAB disetujui, dan komitmen berjalan.',
      href: '/admin/anggaran',
      icon: <FileSpreadsheet size={20} className="text-sikoni-navy" />,
      accent: 'border-l-4 border-sikoni-navy',
      badge: '64 Cabor',
    },
    {
      title: 'Realisasi Pengeluaran',
      desc: 'Verifikasi bukti nota kas, kuitansi bermeterai, dan SP2D pencairan.',
      href: '/admin/realisasi',
      icon: <ArrowUpRight size={20} className="text-emerald-600" />,
      accent: 'border-l-4 border-emerald-500',
      badge: 'Audit Kas',
    },
    {
      title: 'Insentif Atlet & Pelatih',
      desc: 'Penyaluran honorarium bulanan, uang saku TC, dan bonus medali.',
      href: '/admin/insentif',
      icon: <Award size={20} className="text-sikoni-gold" />,
      accent: 'border-l-4 border-sikoni-gold',
      badge: 'Transfer Bank',
    },
    {
      title: 'Pajak Transaksi PPh/PPN',
      desc: 'Kalkulasi otomatis & monitoring penyetoran PPh 21, PPh 23, dan PPN.',
      href: '/admin/pajak',
      icon: <Percent size={20} className="text-rose-500" />,
      accent: 'border-l-4 border-rose-500',
      badge: 'e-Billing',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">
            SIKONI <span className="text-slate-300">/</span> Keuangan
          </div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">
            Sentral Manajemen Keuangan
          </h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Monitoring dana masuk hibah, alokasi anggaran, realisasi kas, insentif prestasi, dan kepatuhan pajak.
          </p>
        </div>

        <button
          onClick={() => {
            exportToCsv(
              'Rekap_Keuangan_KONI_2026',
              ['Indikator Keuangan', 'Nilai (Rp)', 'Keterangan'],
              [
                ['Dana Diterima (Hibah APBD)', 'Rp 2.450.000.000', 'Akumulasi TA 2026'],
                ['Dialokasikan ke Program', 'Rp 1.820.000.000', '74.3% dari total dana'],
                ['Realisasi Nota Valid', 'Rp 1.210.000.000', 'Sudah diverifikasi'],
                ['Pembayaran Kasir Kas', 'Rp 985.000.000', 'Sudah dibayarkan'],
                ['Komitmen Belum Terealisasi', 'Rp 310.000.000', 'RAB disetujui, belum SPJ'],
                ['Sisa Pagu Belum Dialokasi', 'Rp 630.000.000', 'Pagu tersedia'],
              ],
            );
            showToast('Ekspor pembukuan keuangan format Excel/CSV berhasil diunduh.');
          }}
          className="bg-white border border-slate-200 text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Download size={14} /> Ekspor Rekapitulasi Keuangan
        </button>
      </div>

      {/* 4 KPIs with colorful accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Dana Masuk Hibah"
          value="Rp 2,45 M"
          foot="Akumulasi Termin I & II"
          accentColor="teal"
          badge="APBD Surakarta"
          icon={<Coins size={19} />}
        />
        <KpiCard
          label="Teralokasi ke Program"
          value="Rp 1,82 M"
          foot="74,3% dari total dana masuk"
          accentColor="navy"
          badge="42 Proposal"
          icon={<FileSpreadsheet size={19} />}
        />
        <KpiCard
          label="Realisasi Terverifikasi"
          value="Rp 1,21 M"
          foot="Bukti nota kas tervalidasi"
          accentColor="green"
          badge="Audit Lolos"
          icon={<ArrowUpRight size={19} />}
        />
        <KpiCard
          label="Pencairan Kasir Kas"
          value="Rp 985 jt"
          foot="Pindahbuku rekening cabor"
          accentColor="amber"
          badge="Bank Jateng"
          icon={<CheckCircle2 size={19} />}
        />
      </div>

      {/* Visual Trends: Monthly Usage Trend Chart & Donut Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-sikoni lg:col-span-2 flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-teal" />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
                  <TrendingUp size={16} className="text-sikoni-teal" /> Tren Penggunaan & Penyerapan Dana
                </h3>
                <p className="text-[11px] text-sikoni-muted mt-0.5">
                  Alokasi usulan anggaran vs realisasi kas bulanan tahun 2026
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
                <span className="flex items-center gap-1.5 text-sikoni-teal">
                  <span className="w-2.5 h-2.5 bg-sikoni-teal rounded-sm" /> Alokasi RAB
                </span>
                <span className="flex items-center gap-1.5 text-sikoni-gold">
                  <span className="w-2.5 h-2.5 bg-sikoni-gold rounded-sm" /> Realisasi Cair
                </span>
              </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-2 pt-4 pb-2 border-b border-slate-100">
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
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-[82%]">
                    <div
                      className="w-2 sm:w-2.5 bg-sikoni-teal rounded-t transition-all group-hover:brightness-125"
                      style={{ height: `${bar.a}%` }}
                      title={`Alokasi: ${bar.a}%`}
                    />
                    <div
                      className="w-2 sm:w-2.5 bg-sikoni-gold rounded-t transition-all group-hover:brightness-125"
                      style={{ height: `${bar.r}%` }}
                      title={`Realisasi: ${bar.r}%`}
                    />
                  </div>
                  <span className="text-[9.5px] font-bold text-slate-500 group-hover:text-sikoni-navy">{bar.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-3 flex items-center justify-between">
            <span>Data serapan gabungan seluruh 64 cabang olahraga</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Serapan Optimal
            </span>
          </div>
        </div>

        {/* Donut Chart: Budget Composition Box */}
        <div className="card-sikoni flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-gold" />
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
                <PieChart size={16} className="text-sikoni-gold" /> Distribusi Bidang Anggaran
              </h3>
              <p className="text-[11px] text-sikoni-muted mt-0.5">Komposisi pengeluaran APBD 2026</p>
            </div>

            <div className="flex items-center gap-5 my-4">
              <div className="relative w-28 h-28 rounded-full border-[12px] border-sikoni-teal flex items-center justify-center flex-shrink-0 shadow-inner">
                <div className="text-center">
                  <span className="text-xl font-black text-sikoni-navy block leading-none">68%</span>
                  <span className="text-[8.5px] text-slate-400 font-extrabold uppercase">Realisasi</span>
                </div>
              </div>

              <div className="space-y-2 text-xs flex-1">
                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-sikoni-teal" />
                    Program Tanding
                  </span>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">44%</b>
                </div>

                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-sikoni-gold" />
                    Pembinaan Atlet
                  </span>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">25%</b>
                </div>

                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-slate-400">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Operasional KONI
                  </span>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">18%</b>
                </div>

                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-slate-300">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    Cadangan Pagu
                  </span>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">13%</b>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10.5px] text-slate-400 italic pt-2.5 border-t border-slate-100">
            *Mengacu pada Naskah Perjanjian Hibah Daerah (NPHD) Kota Surakarta.
          </div>
        </div>
      </div>

      {/* Module Navigation Cards */}
      <div className="card-sikoni">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
        <div className="mb-4 pb-3 border-b border-slate-100">
          <h3 className="text-base font-extrabold text-sikoni-navy">Akses Modul Keuangan Lengkap</h3>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Pilih modul untuk melihat pembukuan dan memproses transaksi secara mendalam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {financeModules.map((mod, idx) => (
            <div
              key={idx}
              className={`bg-white border border-slate-200/90 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${mod.accent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-105 transition-transform">
                    {mod.icon}
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {mod.badge}
                  </span>
                </div>
                <b className="text-xs text-sikoni-navy block group-hover:text-sikoni-teal transition-colors">
                  {mod.title}
                </b>
                <p className="text-[11px] text-sikoni-muted mt-1 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
              <Link
                href={mod.href}
                className="mt-4 text-xs font-bold text-sikoni-teal hover:text-teal-800 flex items-center justify-between pt-2 border-t border-slate-100 group-hover:underline"
              >
                <span>Buka Modul</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs font-bold">
          <Check size={16} className="text-sikoni-green" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
