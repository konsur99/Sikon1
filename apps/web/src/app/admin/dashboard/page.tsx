'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { exportToCsv } from '../../../lib/exportCsv';
import {
  FileSpreadsheet,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Download,
  Plus,
  Check,
  Send,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const recentSubmissions = [
    {
      number: 'RAB-026/VI/26',
      activity: 'Kejuaraan Atletik Kota',
      cabor: 'PASI',
      amount: 'Rp 48.500.000',
      date: '09 Nov 2026',
      status: 'Menunggu',
    },
    {
      number: 'RAB-025/VI/26',
      activity: 'Pemusatan Latihan Porprov',
      cabor: 'PBSI',
      amount: 'Rp 32.000.000',
      date: '08 Nov 2026',
      status: 'Verifikasi',
    },
    {
      number: 'RAB-024/VI/26',
      activity: 'Pengadaan Matras & Perlengkapan',
      cabor: 'PSSI',
      amount: 'Rp 18.750.000',
      date: '07 Nov 2026',
      status: 'Disetujui',
    },
    {
      number: 'RAB-023/VI/26',
      activity: 'Sewa Lapangan & Wasit',
      cabor: 'PBVSI',
      amount: 'Rp 14.200.000',
      date: '06 Nov 2026',
      status: 'Disetujui',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Welcome Hero Box with Theme Accent */}
      <div className="card-hero-navy flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/15 px-2.5 py-0.5 rounded-full text-sikoni-gold border border-white/10">
              KONI SURAKARTA • TAHUN ANGGARAN 2026
            </span>
            <span className="text-[10px] text-slate-300">• Dashboard Eksekutif</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Monitoring & Akuntabilitas Anggaran Olahraga
          </h1>
          <p className="text-xs text-slate-200/90 max-w-2xl leading-relaxed">
            Sistem Informasi Pengelolaan Anggaran Terintegrasi untuk 64 Pengurus Cabang Olahraga se-Kota Surakarta secara transparan, akuntabel, dan bebas gratifikasi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 z-10 w-full sm:w-auto">
          <button
            onClick={() => {
              exportToCsv(
                'Ringkasan_Dashboard_SIKONI_2026',
                ['Nomor Berkas', 'Nama Kegiatan', 'Cabang Olahraga', 'Nilai Pengajuan', 'Tanggal', 'Status'],
                recentSubmissions.map((s) => [s.number, s.activity, s.cabor, s.amount, s.date, s.status]),
              );
              showToast('Berkas ringkasan eksekutif (CSV / Excel) berhasil diunduh.');
            }}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 backdrop-blur-sm shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
          <Link
            href="/admin/rab"
            className="bg-sikoni-gold hover:bg-amber-400 text-sikoni-navy px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Plus size={15} /> Buat Usulan RAB
          </Link>
        </div>
      </div>

      {/* 4 KPIs with distinct accent borders & badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Pagu Kas Diterima (Termin I)"
          value="Rp 2,45 M"
          foot="Pagu Induk APBD 2026: Rp 12,8 M"
          accentColor="navy"
          badge="Kas BPKAD"
          icon={<FileSpreadsheet size={19} />}
        />
        <KpiCard
          label="Alokasi Program Cabor"
          value="Rp 1,82 M"
          foot="74,3% dari pagu termin I"
          accentColor="teal"
          badge="42 Usulan Disetujui"
          icon={<CheckCircle2 size={19} />}
        />
        <KpiCard
          label="Realisasi Terverifikasi"
          value="Rp 1,21 M"
          foot="66,5% dari alokasi (49,4% pagu)"
          accentColor="green"
          badge="SP2D Cair"
          icon={<ArrowUpRight size={19} />}
        />
        <KpiCard
          label="Menunggu Persetujuan"
          value="06 Berkas"
          foot="Memerlukan telaah verifikator"
          accentColor="amber"
          badge="Perlu Tindakan"
          icon={<Clock size={19} />}
        />
      </div>

      {/* Main Content Grid: Trend Chart & Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Chart Box */}
        <div className="card-sikoni lg:col-span-2 flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-teal" />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
                  <TrendingUp size={16} className="text-sikoni-teal" /> Tren Anggaran & Realisasi Bulanan
                </h3>
                <p className="text-[11px] text-sikoni-muted mt-0.5">
                  Pembandingan pagu alokasi bulanan dan realisasi kuitansi kas terverifikasi
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
                <span className="flex items-center gap-1.5 text-sikoni-navy">
                  <span className="w-2.5 h-2.5 bg-sikoni-navy rounded-sm" /> Usulan RAB
                </span>
                <span className="flex items-center gap-1.5 text-sikoni-gold">
                  <span className="w-2.5 h-2.5 bg-sikoni-gold rounded-sm" /> Realisasi Cair
                </span>
              </div>
            </div>

            {/* Visual Bar representation */}
            <div className="h-52 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100">
              {[
                { m: 'Jan', a: 50, r: 25 },
                { m: 'Feb', a: 62, r: 35 },
                { m: 'Mar', a: 45, r: 20 },
                { m: 'Apr', a: 70, r: 42 },
                { m: 'Mei', a: 58, r: 38 },
                { m: 'Jun', a: 82, r: 55 },
                { m: 'Jul', a: 68, r: 45 },
                { m: 'Agu', a: 75, r: 50 },
                { m: 'Sep', a: 54, r: 35 },
                { m: 'Okt', a: 88, r: 64 },
                { m: 'Nov', a: 72, r: 48 },
                { m: 'Des', a: 90, r: 60 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-[82%]">
                    <div
                      className="w-2 sm:w-3 bg-sikoni-navy rounded-t transition-all group-hover:brightness-125"
                      style={{ height: `${bar.a}%` }}
                      title={`Pagu ${bar.m}: ${bar.a}%`}
                    />
                    <div
                      className="w-2 sm:w-3 bg-sikoni-gold rounded-t transition-all group-hover:brightness-125"
                      style={{ height: `${bar.r}%` }}
                      title={`Realisasi ${bar.m}: ${bar.r}%`}
                    />
                  </div>
                  <span className="text-[9.5px] font-bold text-slate-500 group-hover:text-sikoni-navy">{bar.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-sikoni-muted pt-3">
            <span>Rata-rata serapan berjalan: <b className="text-sikoni-navy font-extrabold">68,4%</b></span>
            <span className="text-sikoni-teal font-bold">Target Q4: 92%</span>
          </div>
        </div>

        {/* Budget Breakdown Box */}
        <div className="card-sikoni flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-gold" />
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
                <Layers size={16} className="text-sikoni-gold" /> Posisi Alokasi Anggaran
              </h3>
              <p className="text-[11px] text-sikoni-muted mt-0.5">Ringkasan serapan tahun anggaran 2026</p>
            </div>

            {/* Visual Progress Bar (100% Reconciled Math) */}
            <div className="mt-4 mb-4">
              <div className="flex justify-between text-[10.5px] font-bold text-sikoni-navy mb-1.5">
                <span>Alokasi Cabor: 74,3% (Rp 1,82 M)</span>
                <span className="text-sikoni-green">Cadangan Kas: Rp 630 Jt</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: '49.4%' }} className="bg-sikoni-teal" title="Realisasi Cair: 49,4% (Rp 1,21 M)" />
                <div style={{ width: '12.7%' }} className="bg-sikoni-gold" title="Komitmen Berjalan: 12,7% (Rp 310 Jt)" />
                <div style={{ width: '12.2%' }} className="bg-sky-400" title="Sisa Alokasi Cabor: 12,2% (Rp 300 Jt)" />
                <div style={{ width: '25.7%' }} className="bg-slate-300" title="Cadangan Kas Belum Dialokasikan: 25,7% (Rp 630 Jt)" />
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[9.5px] text-slate-500 mt-2.5 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sikoni-teal flex-shrink-0" /> Cair: 49,4% (Rp 1,21 M)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sikoni-gold flex-shrink-0" /> Komitmen: 12,7% (Rp 310 Jt)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" /> Sisa Cabor: 12,2% (Rp 300 Jt)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300 flex-shrink-0" /> Cadangan Kas: 25,7% (Rp 630 Jt)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-navy">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sikoni-navy" />
                  <span className="text-slate-700 font-semibold">Pagu Kas Termin I</span>
                </div>
                <b className="text-sikoni-navy bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-sm font-black">
                  Rp 2.450.000.000
                </b>
              </div>

              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sikoni-teal" />
                  <span className="text-slate-700 font-semibold">Alokasi Program Cabor (74,3%)</span>
                </div>
                <b className="text-sikoni-navy bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-sm font-black">
                  Rp 1.820.000.000
                </b>
              </div>

              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-emerald-600 pl-6">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">├</span>
                  <span className="text-slate-700 font-medium">Realisasi SP2D Cair (49,4%)</span>
                </div>
                <b className="text-emerald-700 bg-white px-2.5 py-0.5 rounded-md border border-emerald-200 shadow-sm font-bold text-[11.5px]">
                  Rp 1.210.000.000
                </b>
              </div>

              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold pl-6">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">├</span>
                  <span className="text-slate-700 font-medium">Komitmen Berjalan (12,7%)</span>
                </div>
                <b className="text-amber-800 bg-white px-2.5 py-0.5 rounded-md border border-amber-200 shadow-sm font-bold text-[11.5px]">
                  Rp 310.000.000
                </b>
              </div>

              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sky-400 pl-6">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">└</span>
                  <span className="text-slate-700 font-medium">Sisa Alokasi Cabor (12,2%)</span>
                </div>
                <b className="text-sky-700 bg-white px-2.5 py-0.5 rounded-md border border-sky-200 shadow-sm font-bold text-[11.5px]">
                  Rp 300.000.000
                </b>
              </div>

              <div className="p-2.5 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between shadow-sm border-l-4 border-l-emerald-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-900 font-extrabold">Cadangan Kas Belum Dialokasikan (25,7%)</span>
                </div>
                <b className="text-sikoni-green bg-white px-2.5 py-0.5 rounded-md border border-emerald-200 shadow-sm font-black text-sm">
                  Rp 630.000.000
                </b>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 italic pt-3 border-t border-slate-100">
            *Alokasi dana diawasi oleh Inspektorat Kota Surakarta dan BPKAD.
          </div>
        </div>
      </div>

      {/* Second Row: Submissions Table & Activity Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title="Pengajuan Berkas Terbaru"
            subtitle="Status verifikasi proposal RAB dan pertanggungjawaban cabor"
            actionButton={
              <Link
                href="/admin/pengajuan"
                className="text-xs font-bold text-sikoni-teal hover:text-teal-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 transition-colors"
              >
                Lihat semua pengajuan →
              </Link>
            }
            columns={[
              { header: 'Nomor Berkas', accessor: 'number' },
              { header: 'Nama Kegiatan', accessor: 'activity' },
              { header: 'Cabor', accessor: 'cabor' },
              { header: 'Nilai Usulan', accessor: 'amount' },
              { header: 'Tanggal', accessor: 'date' },
              { header: 'Status Verifikasi', accessor: 'status', isStatus: true },
            ]}
            data={recentSubmissions}
          />
        </div>

        {/* Activity Stream Box */}
        <div className="card-sikoni space-y-4">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-navy" />
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
              <Activity size={16} className="text-sikoni-navy" /> Aktivitas Sistem Terbaru
            </h3>
            <p className="text-[11px] text-sikoni-muted mt-0.5">Audit trail aksi pengguna & verifikator</p>
          </div>

          <div className="space-y-3 text-xs">
            <Link
              href="/admin/pengajuan"
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Check size={16} />
              </div>
              <div>
                <b className="text-sikoni-navy block group-hover:text-sikoni-teal">RAB-024 Disetujui</b>
                <p className="text-[11px] text-slate-600 mt-0.5">Pengadaan perlengkapan tanding • PSSI Surakarta</p>
                <small className="text-[10px] text-sikoni-muted font-medium">Hari ini, 10:34 WIB</small>
              </div>
            </Link>

            <Link
              href="/admin/persetujuan"
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Send size={16} />
              </div>
              <div>
                <b className="text-sikoni-navy block group-hover:text-sikoni-teal">Usulan RAB Masuk</b>
                <p className="text-[11px] text-slate-600 mt-0.5">Kejuaraan Atletik Kota • PASI Surakarta</p>
                <small className="text-[10px] text-sikoni-muted font-medium">Hari ini, 09:12 WIB</small>
              </div>
            </Link>

            <Link
              href="/admin/lpj"
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <FileCheck2 size={16} />
              </div>
              <div>
                <b className="text-sikoni-navy block group-hover:text-sikoni-teal">LPJ Diajukan Verifikasi</b>
                <p className="text-[11px] text-slate-600 mt-0.5">Pemusatan Latihan Porprov • PBSI Surakarta</p>
                <small className="text-[10px] text-sikoni-muted font-medium">Kemarin, 16:40 WIB</small>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Security & Isolation Banner */}
      <div className="p-4 bg-gradient-to-r from-[#e8f5f4] via-[#f0f9f8] to-[#edf7f6] text-sikoni-teal rounded-2xl text-xs font-semibold border border-teal-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sikoni-teal text-white grid place-items-center flex-shrink-0 shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-sikoni-navy font-bold block text-sm">Prinsip Tata Kelola Hibah Olahraga SIKONI</span>
            <span className="text-slate-600 text-[11px]">
              Hak akses dibatasi secara ketat berdasarkan isolasi database cabor. Seluruh transaksi wajib mencantumkan bukti kuitansi sah & perpajakan PPh/PPN.
            </span>
          </div>
        </div>
        <Link
          href="/transparansi"
          className="bg-white text-sikoni-teal font-extrabold px-3 py-1.5 rounded-xl border border-teal-300 hover:bg-teal-50 flex-shrink-0 shadow-sm transition-all"
        >
          Lihat Transparansi Publik →
        </Link>
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
