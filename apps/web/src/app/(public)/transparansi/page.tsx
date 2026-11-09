'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Coins, FileSpreadsheet, CheckCircle2, Eye, X, Download, FileText } from 'lucide-react';

interface PublicDocItem {
  id: string;
  document: string;
  period: string;
  publishedDate: string;
  summary: string;
}

export default function TransparencyPage() {
  const [selectedDoc, setSelectedDoc] = useState<PublicDocItem | null>(null);

  const publicDocuments: PublicDocItem[] = [
    {
      id: 'PUB-DOC-001',
      document: 'Ringkasan Anggaran KONI Surakarta',
      period: 'Tahun 2026',
      publishedDate: '05 Nov 2026',
      summary:
        'Laporan ringkas alokasi dana hibah olahraga Kota Surakarta tahun 2026 sebesar Rp 2.450.000.000, dengan alokasi pembinaan cabang olahraga Rp 1.820.000.000 dan serapan terealisasi valid sebesar Rp 1.210.000.000. Seluruh realisasi didukung nota dan verifikasi berjenjang.',
    },
    {
      id: 'PUB-DOC-002',
      document: 'Ringkasan Program Pembinaan Atlet & Pelatih',
      period: 'Semester II 2026',
      publishedDate: '01 Nov 2026',
      summary:
        'Kompilasi pemantauan program pemusatan latihan atlet unggulan daerah, bantuan perlengkapan tanding untuk 42 cabang olahraga terdaftar, dan rincian penyaluran insentif atlet bulanan periode Juli–Desember 2026.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div>
        <div className="text-xs font-extrabold text-sikoni-teal tracking-wider uppercase">
          INFORMASI PUBLIK
        </div>
        <h1 className="text-3xl font-black text-sikoni-navy tracking-tight mt-1">Transparansi Anggaran</h1>
        <p className="text-xs text-sikoni-muted mt-1 max-w-2xl leading-relaxed">
          Ringkasan anggaran publikasi tahun 2026. Informasi yang ditampilkan telah melalui rekonsiliasi dan persetujuan pengurus KONI Surakarta.
        </p>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <KpiCard
          label="Dana Hibah APBD Masuk"
          value="Rp 2,45 M"
          foot="Ringkasan penyaluran 2026"
          accentColor="teal"
          badge="Kas Daerah"
          icon={<Coins size={19} />}
        />
        <KpiCard
          label="Anggaran Dialokasikan"
          value="Rp 1,82 M"
          foot="74,3% dari total pagu"
          accentColor="navy"
          badge="42 Program"
          icon={<FileSpreadsheet size={19} />}
        />
        <KpiCard
          label="Realisasi Terverifikasi"
          value="Rp 1,21 M"
          foot="66,5% dari alokasi disetujui"
          accentColor="green"
          badge="Audit Sah"
          icon={<CheckCircle2 size={19} />}
        />
      </div>

      {/* Distribution Breakdown & Visual Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-sikoni space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Ringkasan Penggunaan Anggaran</h3>
            <p className="text-[11px] text-sikoni-muted">Informasi agregat — bukan buku kas atau laporan akuntansi riil</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-sikoni-line">
              <span className="text-sikoni-ink font-medium">Pembinaan atlet dan pelatih</span>
              <b className="text-sikoni-navy font-bold">Rp 540.000.000</b>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sikoni-line">
              <span className="text-sikoni-ink font-medium">Kompetisi dan kejuaraan daerah</span>
              <b className="text-sikoni-navy font-bold">Rp 420.000.000</b>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sikoni-line">
              <span className="text-sikoni-ink font-medium">Operasional organisasi & sekretariat</span>
              <b className="text-sikoni-navy font-bold">Rp 250.000.000</b>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sikoni-line">
              <span className="text-sikoni-ink font-medium">Program pendukung lainnya</span>
              <b className="text-sikoni-navy font-bold">Rp 610.000.000</b>
            </div>
          </div>

          <div className="text-[10px] text-sikoni-muted italic pt-2">
            *Catatan: Nominal final wajib berasal dari data yang telah disahkan dan dipublikasikan secara resmi.
          </div>
        </div>

        {/* Visual Chart Card */}
        <div className="card-sikoni flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Komposisi Penggunaan Anggaran</h3>
            <p className="text-[11px] text-sikoni-muted">Persentase alokasi program olahraga</p>
          </div>

          <div className="flex items-center gap-6 my-4">
            <div className="relative w-32 h-32 rounded-full border-[14px] border-sikoni-teal flex items-center justify-center flex-shrink-0">
              <div className="text-center">
                <span className="text-xl font-black text-sikoni-navy block leading-none">68%</span>
                <span className="text-[9px] text-sikoni-muted font-bold">Realisasi</span>
              </div>
            </div>

            <div className="space-y-2 text-xs flex-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sikoni-teal" />
                  Program olahraga
                </span>
                <b>44%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sikoni-gold" />
                  Pembinaan atlet
                </span>
                <b>25%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9cb8ca]" />
                  Operasional
                </span>
                <b>18%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e9edf1]" />
                  Belum dialokasi
                </span>
                <b>13%</b>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-sikoni-muted">
            Transparansi dikelola secara berkala sesuai ketentuan tata kelola dana hibah.
          </div>
        </div>
      </div>

      {/* Dokumen Publik Table */}
      <DataTable
        title="Dokumen Publik yang Tersedia"
        subtitle="Hanya berkas resmi yang ditetapkan untuk diakses publik"
        showFilterbar={false}
        columns={[
          { header: 'Nama Dokumen', accessor: 'document' },
          { header: 'Periode', accessor: 'period' },
          { header: 'Tanggal Publikasi', accessor: 'publishedDate' },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedDoc(row as PublicDocItem)}
                className="text-xs font-bold text-sikoni-teal hover:underline flex items-center gap-1"
              >
                <Eye size={13} /> Pratinjau
              </button>
            ),
          },
        ]}
        data={publicDocuments}
      />

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sikoni-teal2 text-sikoni-teal grid place-items-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sikoni-navy">{selectedDoc.document}</h3>
                  <p className="text-xs text-sikoni-muted">{selectedDoc.period} • Publikasi {selectedDoc.publishedDate}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl text-xs space-y-2">
              <div className="font-bold text-sikoni-navy">Ringkasan Dokumen:</div>
              <p className="text-sikoni-ink leading-relaxed">{selectedDoc.summary}</p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-sikoni-line">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  alert(`Mengunduh dokumen publik: ${selectedDoc.document}.pdf`);
                  setSelectedDoc(null);
                }}
                className="px-4 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5"
              >
                <Download size={14} /> Unduh PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
