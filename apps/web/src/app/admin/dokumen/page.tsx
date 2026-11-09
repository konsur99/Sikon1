'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { FolderArchive, Inbox, Send, Clock, Plus, UploadCloud, X } from 'lucide-react';

export default function AdminDocumentsPage() {
  const [showModal, setShowModal] = useState(false);
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

        <button
          onClick={() => setShowModal(true)}
          className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Upload Dokumen
        </button>
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
        ]}
        data={documentsList}
      />

      {/* Upload Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Upload Dokumen Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Jenis Dokumen *</label>
                <select
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
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
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Perihal / Judul Berkas *</label>
                <input
                  type="text"
                  required
                  placeholder="Permohonan surat rekomendasi event"
                  value={newDoc.subject}
                  onChange={(e) => setNewDoc({ ...newDoc, subject: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Unit Pengirim / Pemilik</label>
                <input
                  type="text"
                  value={newDoc.owner}
                  onChange={(e) => setNewDoc({ ...newDoc, owner: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Unggah Berkas PDF / Lampiran</label>
                <div className="border border-dashed border-sikoni-line rounded-xl p-4 text-center bg-slate-50">
                  <UploadCloud size={24} className="mx-auto text-sikoni-teal mb-1" />
                  <span className="text-[11px] text-sikoni-muted">Klik untuk memilih file PDF atau seret ke sini</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sikoni-line">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold hover:bg-teal-700 shadow-sm"
                >
                  Simpan & Unggah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
