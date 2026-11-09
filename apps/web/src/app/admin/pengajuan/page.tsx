import React from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Send, Clock, Search, CheckCircle2, Plus } from 'lucide-react';

export default function SubmissionsPage() {
  const submissionsData = [
    {
      number: 'RAB-026/VI/26',
      activity: 'Kejuaraan Atletik Kota',
      cabor: 'PASI',
      amount: 'Rp 48.500.000',
      date: '9 Nov 2026',
      status: 'Menunggu',
    },
    {
      number: 'RAB-025/VI/26',
      activity: 'Pemusatan Latihan',
      cabor: 'PBSI',
      amount: 'Rp 32.000.000',
      date: '8 Nov 2026',
      status: 'Verifikasi',
    },
    {
      number: 'RAB-024/VI/26',
      activity: 'Pengadaan Perlengkapan',
      cabor: 'PSSI',
      amount: 'Rp 18.750.000',
      date: '7 Nov 2026',
      status: 'Disetujui',
    },
    {
      number: 'RAB-023/VI/26',
      activity: 'Kejuaraan Renang Tingkat Kota',
      cabor: 'PRSI',
      amount: 'Rp 26.400.000',
      date: '5 Nov 2026',
      status: 'Ditolak',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Operasional / Pengajuan</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Pengajuan</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Kelola berkas usulan RAB dan permohonan anggaran yang diajukan oleh seluruh cabang olahraga.
          </p>
        </div>

        <Link
          href="/admin/rab"
          className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Buat Pengajuan
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Pengajuan" value="48" foot="Tahun anggaran 2026" icon={<Send size={18} />} />
        <KpiCard label="Menunggu Tindakan" value="06" foot="Perlu ditindaklanjuti" icon={<Clock size={18} />} />
        <KpiCard label="Dalam Verifikasi" value="08" foot="Pemeriksaan berkas" icon={<Search size={18} />} />
        <KpiCard label="Disetujui" value="29" foot="60,4% dari usulan" icon={<CheckCircle2 size={18} />} />
      </div>

      <DataTable
        title="Daftar Pengajuan Anggaran (RAB)"
        subtitle="Riwayat usulan dari seluruh cabang olahraga"
        columns={[
          { header: 'Nomor Usulan', accessor: 'number' },
          { header: 'Nama Kegiatan', accessor: 'activity' },
          { header: 'Cabor', accessor: 'cabor' },
          { header: 'Nilai Diajukan', accessor: 'amount' },
          { header: 'Tanggal', accessor: 'date' },
          { header: 'Status Usulan', accessor: 'status', isStatus: true },
        ]}
        data={submissionsData}
      />
    </div>
  );
}

