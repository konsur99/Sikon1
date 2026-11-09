'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
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
      activity: 'Pemusatan Latihan',
      cabor: 'PBSI',
      amount: 'Rp 32.000.000',
      date: '08 Nov 2026',
      status: 'Verifikasi',
    },
    {
      number: 'RAB-024/VI/26',
      activity: 'Pengadaan Perlengkapan',
      cabor: 'PSSI',
      amount: 'Rp 18.750.000',
      date: '07 Nov 2026',
      status: 'Disetujui',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">
            SIKONI <span className="text-slate-300">/</span> Dashboard
          </div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Dashboard</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Ringkasan kinerja, anggaran, dan aktivitas KONI Surakarta.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Ekspor ringkasan eksekutif anggaran dan kegiatan berhasil diunduh.')}
            className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Export
          </button>
          <Link
            href="/admin/rab"
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Buat RAB
          </Link>
        </div>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Pagu Anggaran"
          value="Rp 2,45 M"
          foot="Tahun anggaran 2026"
          icon={<FileSpreadsheet size={18} />}
        />
        <KpiCard
          label="RAB Disetujui"
          value="Rp 1,82 M"
          foot="74,3% dari pagu"
          icon={<CheckCircle2 size={18} />}
        />
        <KpiCard
          label="Realisasi Terverifikasi"
          value="Rp 1,21 M"
          foot="66,5% dari RAB disetujui"
          icon={<ArrowUpRight size={18} />}
        />
        <KpiCard
          label="Menunggu Persetujuan"
          value="06 Pengajuan"
          foot="Perlu tindak lanjut verifikasi"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Main Content Grid: Chart & Summary Lines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Chart */}
        <div className="card-sikoni lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy">Ringkasan Anggaran & Realisasi</h3>
                <p className="text-[11px] text-sikoni-muted">Tren bulanan tahun anggaran 2026</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="flex items-center gap-1 text-sikoni-navy">
                  <span className="w-2.5 h-2.5 bg-sikoni-navy rounded-sm" /> Anggaran
                </span>
                <span className="flex items-center gap-1 text-sikoni-gold">
                  <span className="w-2.5 h-2.5 bg-sikoni-gold rounded-sm" /> Realisasi
                </span>
              </div>
            </div>

            {/* Visual Bar representation */}
            <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-sikoni-line">
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
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1 h-[80%]">
                    <div
                      className="w-2 sm:w-3 bg-sikoni-navy rounded-t-sm"
                      style={{ height: `${bar.a}%` }}
                    />
                    <div
                      className="w-2 sm:w-3 bg-sikoni-gold rounded-t-sm"
                      style={{ height: `${bar.r}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-sikoni-muted">{bar.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-sikoni-muted pt-3">
            Grafik pembandingan pagu alokasi bulanan dan realisasi nota terverifikasi.
          </div>
        </div>

        {/* Budget Breakdown Lines */}
        <div className="card-sikoni flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Posisi Anggaran</h3>
            <p className="text-[11px] text-sikoni-muted">Berdasarkan data berjalan</p>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between py-1.5 border-b border-sikoni-line">
                <span className="text-sikoni-muted">Pagu tersedia</span>
                <b className="text-sikoni-navy">Rp 2.450.000.000</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sikoni-line">
                <span className="text-sikoni-muted">RAB disetujui</span>
                <b className="text-sikoni-navy">Rp 1.820.000.000</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sikoni-line">
                <span className="text-sikoni-muted">Realisasi terverifikasi</span>
                <b className="text-sikoni-navy">Rp 1.210.000.000</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sikoni-line">
                <span className="text-sikoni-muted">Komitmen belum terealisasi</span>
                <b className="text-sikoni-navy">Rp 310.000.000</b>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-sikoni-muted">Sisa pagu belum dialokasi*</span>
                <b className="text-sikoni-green">Rp 630.000.000</b>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-sikoni-muted italic pt-3 border-t border-sikoni-line">
            *Definisi sisa pagu dan komitmen mengikuti kebijakan keuangan yang disahkan.
          </div>
        </div>
      </div>

      {/* Second Row: Submissions Table & Activity Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable
            title="Pengajuan Terbaru"
            subtitle="Status pengajuan dari seluruh cabang olahraga"
            actionButton={
              <Link href="/admin/pengajuan" className="text-xs font-bold text-sikoni-teal hover:underline">
                Lihat semua →
              </Link>
            }
            columns={[
              { header: 'Nomor', accessor: 'number' },
              { header: 'Kegiatan', accessor: 'activity' },
              { header: 'Cabor', accessor: 'cabor' },
              { header: 'Nilai', accessor: 'amount' },
              { header: 'Tanggal', accessor: 'date' },
              { header: 'Status', accessor: 'status', isStatus: true },
            ]}
            data={recentSubmissions}
          />
        </div>

        {/* Activity Stream */}
        <div className="card-sikoni space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Aktivitas Terbaru</h3>
            <p className="text-[11px] text-sikoni-muted">Jejak aktivitas transaksi pengguna</p>
          </div>

          <div className="space-y-3 text-xs">
            <Link
              href="/admin/pengajuan"
              className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-sikoni-line hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-sikoni-green text-white grid place-items-center flex-shrink-0">
                <Check size={14} />
              </div>
              <div>
                <b className="text-sikoni-navy block">RAB-024 disetujui</b>
                <p className="text-[11px] text-sikoni-muted">Pengadaan perlengkapan • PSSI</p>
                <small className="text-[10px] text-sikoni-muted">Hari ini, 10:34</small>
              </div>
            </Link>

            <Link
              href="/admin/persetujuan"
              className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-sikoni-line hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-sikoni-teal text-white grid place-items-center flex-shrink-0">
                <Send size={14} />
              </div>
              <div>
                <b className="text-sikoni-navy block">Pengajuan RAB baru</b>
                <p className="text-[11px] text-sikoni-muted">Kejuaraan Atletik Kota • PASI</p>
                <small className="text-[10px] text-sikoni-muted">Hari ini, 09:12</small>
              </div>
            </Link>

            <Link
              href="/admin/lpj"
              className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-sikoni-line hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-sikoni-gold text-white grid place-items-center flex-shrink-0">
                <FileCheck2 size={14} />
              </div>
              <div>
                <b className="text-sikoni-navy block">LPJ dikirim untuk verifikasi</b>
                <p className="text-[11px] text-sikoni-muted">Pemusatan Latihan • PBSI</p>
                <small className="text-[10px] text-sikoni-muted">Kemarin, 16:40</small>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Strip */}
      <div className="p-3 bg-[#e8f5f4] text-sikoni-teal rounded-xl text-xs font-medium border border-teal-200">
        SIKONI v1.0: Seluruh hak akses dibatasi secara ketat berdasarkan role dan isolasi cabor.
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
