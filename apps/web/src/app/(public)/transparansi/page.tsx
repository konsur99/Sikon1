'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import {
  Coins,
  FileSpreadsheet,
  CheckCircle2,
  Eye,
  X,
  Download,
  FileText,
  Trophy,
  Award,
  Building2,
  Layers,
  BarChart3,
  PieChart,
  ShieldCheck,
} from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      <div>
        <div className="text-[11px] sm:text-xs font-extrabold text-sikoni-teal tracking-wider uppercase">
          INFORMASI PUBLIK
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-sikoni-navy tracking-tight mt-1">Transparansi Anggaran</h1>
        <p className="text-xs text-sikoni-muted mt-1 max-w-2xl leading-relaxed">
          Ringkasan anggaran publikasi tahun 2026. Informasi yang ditampilkan telah melalui rekonsiliasi dan persetujuan pengurus KONI Surakarta.
        </p>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <KpiCard
          label="Pencairan Kas Termin I"
          value="Rp 2,45 M"
          foot="Pagu Induk APBD: Rp 12,8 M (19,1%)"
          accentColor="teal"
          badge="Kasda BPKAD"
          icon={<Coins size={19} />}
        />
        <KpiCard
          label="Alokasi Program Cabor"
          value="Rp 1,82 M"
          foot="74,3% dari total kas diterima"
          accentColor="navy"
          badge="42 Cabor"
          icon={<FileSpreadsheet size={19} />}
        />
        <KpiCard
          label="Realisasi Kas Sah"
          value="Rp 1,21 M"
          foot="66,5% dari alokasi • 49,4% total kas"
          accentColor="green"
          badge="Audit SP2D"
          icon={<CheckCircle2 size={19} />}
        />
      </div>

      {/* Distribution Breakdown & Visual Chart in Elegant Themed Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ringkasan Penggunaan Anggaran Card */}
        <div className="card-sikoni space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />

          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
                <BarChart3 size={16} className="text-sikoni-teal" /> Ringkasan Penggunaan Anggaran
              </h3>
              <p className="text-[11px] text-sikoni-muted mt-0.5">Informasi agregat alokasi resmi tahun berjalan</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-sikoni-teal px-2.5 py-0.5 rounded-full border border-emerald-200">
              Disahkan
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Box 1: Pembinaan */}
            <div className="p-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:shadow-md hover:border-sikoni-teal/40 transition-all border-l-4 border-l-sikoni-teal group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-sikoni-teal grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Trophy size={16} />
                </div>
                <div>
                  <b className="text-sikoni-navy block text-xs">Pembinaan atlet dan pelatih</b>
                  <span className="text-[10.5px] text-slate-500 font-medium">Honorarium, nutrisi, uang saku TC</span>
                </div>
              </div>
              <div className="text-left sm:text-right bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm self-start sm:self-auto">
                <b className="text-sikoni-navy font-black text-xs block">Rp 540.000.000</b>
                <span className="text-[9.5px] font-bold text-sikoni-teal">29,7% Alokasi</span>
              </div>
            </div>

            {/* Box 2: Kompetisi */}
            <div className="p-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:shadow-md hover:border-sikoni-gold/40 transition-all border-l-4 border-l-sikoni-gold group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-sikoni-gold grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Award size={16} />
                </div>
                <div>
                  <b className="text-sikoni-navy block text-xs">Kompetisi dan kejuaraan daerah</b>
                  <span className="text-[10.5px] text-slate-500 font-medium">Piala Walikota, Porprov, Kejurkot</span>
                </div>
              </div>
              <div className="text-left sm:text-right bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm self-start sm:self-auto">
                <b className="text-sikoni-navy font-black text-xs block">Rp 420.000.000</b>
                <span className="text-[9.5px] font-bold text-amber-600">23,1% Alokasi</span>
              </div>
            </div>

            {/* Box 3: Operasional */}
            <div className="p-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:shadow-md hover:border-sikoni-navy/40 transition-all border-l-4 border-l-sikoni-navy group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-sikoni-navy grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Building2 size={16} />
                </div>
                <div>
                  <b className="text-sikoni-navy block text-xs">Operasional organisasi & sekretariat</b>
                  <span className="text-[10.5px] text-slate-500 font-medium">Administrasi, ATK, rapat koordinasi</span>
                </div>
              </div>
              <div className="text-left sm:text-right bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm self-start sm:self-auto">
                <b className="text-sikoni-navy font-black text-xs block">Rp 250.000.000</b>
                <span className="text-[9.5px] font-bold text-slate-600">13,7% Alokasi</span>
              </div>
            </div>

            {/* Box 4: Program pendukung */}
            <div className="p-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:shadow-md hover:border-emerald-500/40 transition-all border-l-4 border-l-emerald-600 group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Layers size={16} />
                </div>
                <div>
                  <b className="text-sikoni-navy block text-xs">Program pendukung lainnya</b>
                  <span className="text-[10.5px] text-slate-500 font-medium">Peralatan tanding, tes medis & gizi</span>
                </div>
              </div>
              <div className="text-left sm:text-right bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-sm self-start sm:self-auto">
                <b className="text-sikoni-navy font-black text-xs block">Rp 610.000.000</b>
                <span className="text-[9.5px] font-bold text-emerald-600">33,5% Alokasi</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/70 text-[10.5px] text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>Nominal final telah disahkan melalui NPHD dan rekonsiliasi bersama BPKAD Kota Surakarta.</span>
          </div>
        </div>

        {/* Visual Chart Card */}
        <div className="card-sikoni flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-gold" />

          <div>
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy flex items-center gap-2">
                  <PieChart size={16} className="text-sikoni-gold" /> Komposisi Penggunaan Anggaran
                </h3>
                <p className="text-[11px] text-sikoni-muted mt-0.5">Persentase alokasi program olahraga TA 2026</p>
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
                Pagu APBD
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
              <div className="relative w-32 h-32 rounded-full border-[14px] border-sikoni-teal flex items-center justify-center flex-shrink-0 shadow-inner">
                <div className="text-center">
                  <span className="text-2xl font-black text-sikoni-navy block leading-none">66,5%</span>
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase mt-0.5 block">Serapan Cabor</span>
                </div>
              </div>

              {/* Sub-boxes for Composition Items */}
              <div className="space-y-2 text-xs flex-1 w-full">
                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal">
                  <div>
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-sikoni-teal" />
                      Realisasi Kas Cair (SP2D)
                    </span>
                    <span className="text-[10px] text-slate-400 pl-4 block">Rp 1,21 Miliar</span>
                  </div>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">49,4%</b>
                </div>

                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold">
                  <div>
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-sikoni-gold" />
                      Komitmen Berjalan
                    </span>
                    <span className="text-[10px] text-slate-400 pl-4 block">Rp 310 Juta</span>
                  </div>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">12,7%</b>
                </div>

                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-slate-400">
                  <div>
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      Sisa Alokasi Cabor
                    </span>
                    <span className="text-[10px] text-slate-400 pl-4 block">Rp 300 Juta</span>
                  </div>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">12,2%</b>
                </div>

                <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-slate-300">
                  <div>
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      Cadangan Kas Kasda
                    </span>
                    <span className="text-[10px] text-slate-400 pl-4 block">Rp 630 Juta</span>
                  </div>
                  <b className="text-sikoni-navy bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">25,7%</b>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/70 text-[10.5px] text-slate-500 flex items-center gap-2">
            <ShieldCheck size={14} className="text-sikoni-teal flex-shrink-0" />
            <span>Transparansi dikelola secara berkala sesuai ketentuan tata kelola dana hibah Pemerintah Kota Surakarta.</span>
          </div>
        </div>
      </div>

      {/* Dokumen Publik Container in Themed Cardlet Boxes */}
      <div className="card-sikoni space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-sikoni-navy tracking-tight flex items-center gap-2">
              <FileSpreadsheet size={18} className="text-sikoni-teal" /> Dokumen Publik yang Tersedia
            </h3>
            <p className="text-xs text-sikoni-muted mt-0.5">
              Hanya berkas resmi yang telah disahkan dan ditetapkan untuk diakses oleh masyarakat umum
            </p>
          </div>
          <span className="text-[10px] font-bold bg-emerald-50 text-sikoni-teal px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Terbuka & Akuntabel
          </span>
        </div>

        {/* Distinct Document Cardlet Boxes */}
        <div className="space-y-3">
          {publicDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sikoni-teal/50 transition-all border-l-4 border-l-sikoni-teal flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sikoni-navy to-slate-800 text-sikoni-gold grid place-items-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9.5px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full uppercase">
                      {doc.id}
                    </span>
                    <span className="text-[10px] font-semibold text-sikoni-teal bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {doc.period}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Publikasi: {doc.publishedDate}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-sikoni-navy mt-1 group-hover:text-sikoni-teal transition-colors">
                    {doc.document}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {doc.summary}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="bg-white hover:bg-sikoni-teal hover:text-white text-sikoni-teal border border-teal-200 hover:border-sikoni-teal px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm flex-shrink-0 self-end sm:self-center"
              >
                <Eye size={14} /> Pratinjau Dokumen
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 font-medium border-t border-slate-100">
          <span>Menampilkan {publicDocuments.length} dari {publicDocuments.length} berkas resmi</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
            Portal Keterbukaan SIKONI
          </span>
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="card-sikoni relative overflow-hidden w-[94vw] sm:w-full max-w-lg p-4 sm:p-6 space-y-4 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start gap-2">
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
