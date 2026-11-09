'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { exportToCsv } from '../../../lib/exportCsv';
import {
  Send,
  Clock,
  Search,
  CheckCircle2,
  Plus,
  Download,
  Check,
  X,
  FileText,
  Calendar,
  Building,
  Tag,
} from 'lucide-react';
import { StatusBadge } from '../../../components/common/StatusBadge';

export default function SubmissionsPage() {
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const submissionsData = [
    {
      number: 'RAB-026/VI/26',
      activity: 'Kejuaraan Atletik Kota 2026',
      cabor: 'PASI (Atletik)',
      amount: 'Rp 48.500.000',
      date: '09 Nov 2026',
      status: 'Menunggu',
      desc: 'Proposal penyelenggaraan Kejuaraan Daerah Atletik antar pelajar di Stadion Sriwedari.',
      category: 'Kejuaraan & Kompetisi',
      signer: 'Dr. H. Sugiyanto, M.Pd',
      attachment: 'Proposal_Kejurda_PASI_2026.pdf',
    },
    {
      number: 'RAB-025/VI/26',
      activity: 'Pemusatan Latihan Porprov Solo',
      cabor: 'PBSI (Bulu Tangkis)',
      amount: 'Rp 32.000.000',
      date: '08 Nov 2026',
      status: 'Verifikasi',
      desc: 'Training camp intensif 14 atlet bulu tangkis persiapan seleksi Porprov Jateng.',
      category: 'Pemusatan Latihan',
      signer: 'Ir. FX Rudiatmoko',
      attachment: 'Rencana_TC_PBSI_2026.pdf',
    },
    {
      number: 'RAB-024/VI/26',
      activity: 'Pengadaan Matras & Perlengkapan Tanding',
      cabor: 'PSSI (Sepak Bola)',
      amount: 'Rp 18.750.000',
      date: '07 Nov 2026',
      status: 'Disetujui',
      desc: 'Pengadaan bola tanding berstandar FIFA dan rompi latihan kontingen kota.',
      category: 'Sarana & Prasarana',
      signer: 'Agus Wibowo, S.E.',
      attachment: 'Spek_Alat_PSSI_2026.pdf',
    },
    {
      number: 'RAB-023/VI/26',
      activity: 'Sewa Venue & Wasit Nasional',
      cabor: 'PBVSI (Bola Voli)',
      amount: 'Rp 14.200.000',
      date: '06 Nov 2026',
      status: 'Disetujui',
      desc: 'Sewa GOR Manahan dan honorarium 6 wasit berlisensi nasional.',
      category: 'Operasional Event',
      signer: 'Kombes Pol (Purn) Suryadi',
      attachment: 'Sewa_GOR_PBVSI_2026.pdf',
    },
    {
      number: 'RAB-022/VI/26',
      activity: 'Kejuaraan Renang Tingkat Kota',
      cabor: 'PRSI (Renang)',
      amount: 'Rp 26.400.000',
      date: '05 Nov 2026',
      status: 'Ditolak',
      desc: 'Usulan ditolak karena melebihi plafon pagu tahunan cabor yang dialokasikan.',
      category: 'Kejuaraan Kota',
      signer: 'dr. H. Wahyu Hidayat',
      attachment: 'Proposal_Renang_2026.pdf',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">
            SIKONI <span className="text-slate-300">/</span> Operasional <span className="text-slate-300">/</span> Pengajuan
          </div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">
            Sentral Pengajuan Anggaran (RAB)
          </h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Monitoring berkas usulan RAB, proposal kegiatan, dan status persetujuan dari 64 cabang olahraga.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Arsip_Pengajuan_RAB_SIKONI_2026',
                ['Nomor Berkas', 'Nama Kegiatan', 'Cabang Olahraga', 'Kategori', 'Nilai Pengajuan', 'Tanggal', 'Status'],
                submissionsData.map((s) => [s.number, s.activity, s.cabor, s.category, s.amount, s.date, s.status]),
              );
              showToast('Data pengajuan RAB format CSV / Excel berhasil diunduh.');
            }}
            className="bg-white border border-slate-200 text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download size={14} /> Export CSV
          </button>
          <Link
            href="/admin/rab"
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus size={15} /> Buat Usulan RAB
          </Link>
        </div>
      </div>

      {/* 4 KPIs with distinct accent borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Pengajuan"
          value="48 Berkas"
          foot="Tahun anggaran 2026"
          accentColor="navy"
          badge="Akumulasi"
          icon={<Send size={19} />}
        />
        <KpiCard
          label="Menunggu Tindakan"
          value="06 Berkas"
          foot="Perlu verifikasi pengurus"
          accentColor="amber"
          badge="Antrean"
          icon={<Clock size={19} />}
        />
        <KpiCard
          label="Dalam Verifikasi"
          value="08 Berkas"
          foot="Pemeriksaan bukti lampiran"
          accentColor="teal"
          badge="Telaah"
          icon={<Search size={19} />}
        />
        <KpiCard
          label="Disetujui"
          value="34 Berkas"
          foot="70,8% usulan disetujui"
          accentColor="green"
          badge="Sah"
          icon={<CheckCircle2 size={19} />}
        />
      </div>

      {/* DataTable */}
      <DataTable
        title="Daftar Pengajuan Anggaran (RAB)"
        subtitle="Riwayat usulan dari seluruh cabang olahraga se-Kota Surakarta"
        columns={[
          { header: 'Nomor Berkas', accessor: 'number' },
          { header: 'Nama Kegiatan', accessor: 'activity' },
          { header: 'Cabor', accessor: 'cabor' },
          { header: 'Nilai Diajukan', accessor: 'amount' },
          { header: 'Tanggal', accessor: 'date' },
          { header: 'Status Usulan', accessor: 'status', isStatus: true },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedSubmission(row)}
                className="bg-white border border-slate-200 text-sikoni-teal hover:bg-emerald-50 px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Detail
              </button>
            ),
          },
        ]}
        data={submissionsData}
      />

      {/* Detail Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal uppercase tracking-wider block">
                  {selectedSubmission.category}
                </span>
                <h3 className="text-base font-extrabold text-sikoni-navy">
                  {selectedSubmission.activity}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedSubmission.number} • {selectedSubmission.cabor}
                </span>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nilai Usulan:</span>
                  <b className="text-sikoni-navy text-sm font-black">{selectedSubmission.amount}</b>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status Persetujuan:</span>
                  <StatusBadge status={selectedSubmission.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Penanggung Jawab:</span>
                  <b className="text-slate-700">{selectedSubmission.signer}</b>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-sikoni-navy block">Deskripsi Kegiatan:</span>
                <p className="text-slate-600 text-[11.5px] leading-relaxed">
                  {selectedSubmission.desc}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-sikoni-teal" />
                  <div>
                    <b className="text-sikoni-navy text-[11px] block">{selectedSubmission.attachment}</b>
                    <span className="text-[9.5px] text-slate-500">Format PDF Resmi • Terverifikasi</span>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Mengunduh berkas ${selectedSubmission.attachment}...`)}
                  className="bg-white border border-teal-200 text-sikoni-teal text-[10.5px] font-bold px-3 py-1 rounded-lg hover:bg-teal-50"
                >
                  Unduh
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
              >
                Tutup
              </button>
              <Link
                href="/admin/persetujuan"
                className="px-4 py-2 bg-sikoni-teal text-white rounded-xl text-xs font-bold hover:bg-teal-700 shadow-sm"
              >
                Buka di Inbox Approval →
              </Link>
            </div>
          </div>
        </div>
      )}

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
