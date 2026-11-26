'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { FolderArchive, Inbox, Send, Clock, Plus, UploadCloud, X, Download, Eye, FileText, Check } from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';

export default function AdminDocumentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [documentsList, setDocumentsList] = useState([
    {
      number: 'SK-028/KONI/XI/26',
      subject: 'Penetapan Kontingen & Tim Kejuaraan Atletik',
      category: 'Surat Keputusan (SK)',
      date: '09 Nov 2026',
      owner: 'Sekretariat Umum',
      status: 'Disetujui',
    },
    {
      number: 'SM-115/XI/26',
      subject: 'Permohonan Penggunaan Venue Stadion Sriwedari',
      category: 'Surat Masuk',
      date: '08 Nov 2026',
      owner: 'PASI Surakarta',
      status: 'Menunggu',
    },
    {
      number: 'LPJ-013/X/26',
      subject: 'Berkas Laporan Pertanggungjawaban Kejurda',
      category: 'Laporan Pertanggungjawaban',
      date: '04 Nov 2026',
      owner: 'PASI Surakarta',
      status: 'Disetujui',
    },
    {
      number: 'SK-024/KONI/X/26',
      subject: 'Penetapan Standar Biaya Masukan Pembinaan Atlet',
      category: 'Surat Keputusan (SK)',
      date: '28 Okt 2026',
      owner: 'Bidang Keuangan',
      status: 'Disetujui',
    },
  ]);

  const [newDoc, setNewDoc] = useState({
    number: '',
    subject: '',
    category: 'Surat Masuk',
    owner: 'PASI Surakarta',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.number || !newDoc.subject) return;

    setDocumentsList([
      {
        number: newDoc.number,
        subject: newDoc.subject,
        category: newDoc.category,
        date: '09 Nov 2026',
        owner: newDoc.owner,
        status: 'Menunggu',
      },
      ...documentsList,
    ]);

    setShowModal(false);
    showToast(`Dokumen ${newDoc.number} berhasil diunggah ke arsip digital.`);
    setNewDoc({ number: '', subject: '', category: 'Surat Masuk', owner: 'PASI Surakarta' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Arsip / Dokumen</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Arsip Dokumen</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Manajemen arsip digital surat masuk, surat keluar, surat keputusan, dan dokumen pertanggungjawaban.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Arsip_Dokumen_KONI_2026',
                ['Nomor Dokumen', 'Perihal Surat', 'Kategori', 'Tanggal Dokumen', 'Unit Pemilik', 'Status Berkas'],
                documentsList.map((d) => [d.number, d.subject, d.category, d.date, d.owner, d.status]),
              );
              showToast('Daftar arsip dokumen format CSV / Excel berhasil diunduh.');
            }}
            className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Upload Dokumen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Dokumen" value="1.248" foot="Arsip terdaftar" icon={<FolderArchive size={18} />} />
        <KpiCard label="Surat Masuk" value="346" foot="Tahun berjalan" icon={<Inbox size={18} />} />
        <KpiCard label="Surat Keluar" value="281" foot="Tahun berjalan" icon={<Send size={18} />} />
        <KpiCard label="Menunggu Disposisi" value="08" foot="Perlu arahan pimpinan" icon={<Clock size={18} />} />
      </div>

      <DataTable
        title="Arsip Dokumen & Surat"
        subtitle="Dokumen resmi organisasi dan administrasi cabang olahraga"
        columns={[
          { header: 'Nomor Dokumen', accessor: 'number' },
          { header: 'Perihal Surat / Berkas', accessor: 'subject' },
          { header: 'Kategori', accessor: 'category' },
          { header: 'Tanggal Dokumen', accessor: 'date' },
          { header: 'Unit / Pengirim', accessor: 'owner' },
          { header: 'Status Berkas', accessor: 'status', isStatus: true },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedDoc(row)}
                className="bg-white border border-sikoni-line text-sikoni-navy px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1 shadow-sm"
              >
                <Eye size={13} /> Pratinjau
              </button>
            ),
          },
        ]}
        data={documentsList}
      />

      {/* Upload Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-sikoni-teal grid place-items-center shadow-xs">
                  <FolderArchive size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sikoni-navy">Upload Dokumen Digital Baru</h3>
                  <p className="text-[11px] text-sikoni-muted">Pengarsipan surat masuk, surat keluar, SK, dan berkas LPJ</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Jenis Dokumen *</label>
                  <select
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                  >
                    <option>Surat Masuk</option>
                    <option>Surat Keluar</option>
                    <option>Surat Keputusan (SK)</option>
                    <option>Laporan Pertanggungjawaban</option>
                    <option>Template Dokumen</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nomor Dokumen *</label>
                  <input
                    type="text"
                    required
                    placeholder="SM-116/XI/26"
                    value={newDoc.number}
                    onChange={(e) => setNewDoc({ ...newDoc, number: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Perihal / Judul Berkas *</label>
                <input
                  type="text"
                  required
                  placeholder="Permohonan surat rekomendasi event"
                  value={newDoc.subject}
                  onChange={(e) => setNewDoc({ ...newDoc, subject: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Unit Pengirim / Pemilik Berkas</label>
                <input
                  type="text"
                  value={newDoc.owner}
                  onChange={(e) => setNewDoc({ ...newDoc, owner: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Unggah Berkas Digital (PDF / Scan) *</label>
                <div className="border-2 border-dashed border-teal-200 hover:border-sikoni-teal rounded-xl p-4 text-center bg-gradient-to-b from-teal-50/30 to-slate-50/60 text-sikoni-muted cursor-pointer transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-teal-100 text-sikoni-teal grid place-items-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                    <UploadCloud size={20} />
                  </div>
                  <span className="font-bold text-sikoni-navy block text-xs">Pilih berkas digital untuk diunggah</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Maksimal 15 MB • PDF, DOCX, atau scan gambar terarsip</span>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sikoni-teal to-teal-700 hover:from-teal-700 hover:to-sikoni-navy text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal with Official SKB Letterhead (Screen 12 sync) */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 space-y-4 shadow-2xl border border-slate-200 relative overflow-hidden">
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  BSrE BSSN Sah
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold">{selectedDoc.number}</span>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Official Government Kop Surat */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="font-display text-xs font-black uppercase tracking-wider text-[#0f172a]">
                PEMERINTAH KOTA SURAKARTA
              </div>
              <div className="text-[10.5px] font-bold uppercase text-[#475569]">
                BADAN PENGELOLAAN KEUANGAN & ASET DAERAH (BPKAD)
              </div>
              <div className="text-[11px] font-black uppercase text-[#d32f2f]">
                KOMITE OLAHRAGA NASIONAL INDONESIA (KONI)
              </div>
              <div className="text-[9px] text-[#64748b]">
                Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1 Solo • Telp (0271) 714920
              </div>
            </div>

            <div className="text-center pt-1">
              <span className="font-display text-xs font-black uppercase underline tracking-wide text-[#0f172a]">
                SURAT KEPUTUSAN BERSAMA (SKB-SPJ)
              </span>
              <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                Nomor: 426/089/SKB-KONI/V/2025 • SP2D: 900/0412/SP2D/2025
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Perihal Berkas:</span>
                <span className="font-bold text-[#0f172a] text-right">{selectedDoc.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Unit Pengusul:</span>
                <span className="font-bold text-[#0f172a]">{selectedDoc.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Status Kepatuhan:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Check size={14} /> Memenuhi Standar Pemeriksaan BPKAD
                </span>
              </div>
            </div>

            {/* Signature & Seal info */}
            <div className="grid grid-cols-2 gap-3 text-center text-[10px] pt-1">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Tanda Tangan Elektronik:</span>
                <span className="font-bold text-[#0f172a] block mt-0.5">Verifikator BPKAD Surakarta</span>
                <span className="text-[8.5px] font-mono text-emerald-600 block mt-0.5">SHA256: 8a9f...3e1b</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Pengesahan Akhir:</span>
                <span className="font-bold text-[#0f172a] block mt-0.5">Ketua Umum KONI Surakarta</span>
                <span className="text-[8.5px] font-mono text-red-600 block mt-0.5">KTA: KONI-SKT-001</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Tutup Pratinjau
              </button>
              <button
                onClick={() => {
                  showToast(`Mengunduh dokumen resmi ${selectedDoc.number} (PDF 1.8 MB)...`);
                  setSelectedDoc(null);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <Download size={14} /> Unduh PDF Resmi (1.8 MB)
              </button>
            </div>
          </div>
        </div>
      )}

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
