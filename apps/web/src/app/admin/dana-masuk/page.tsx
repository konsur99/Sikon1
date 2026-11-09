'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { PlusCircle, Layers, CheckCircle2, Clock, Plus, X, Check } from 'lucide-react';

export default function FundReceiptsPage() {
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [fundData, setFundData] = useState([
    {
      date: '02 Jan 2026',
      source: 'Hibah Pemerintah Daerah',
      reference: 'HIB/001/2026',
      amount: 'Rp 1.500.000.000',
      docs: '2 lampiran',
      status: 'Disetujui',
    },
    {
      date: '15 Mar 2026',
      source: 'Bantuan Pembinaan',
      reference: 'BPM/015/2026',
      amount: 'Rp 650.000.000',
      docs: '3 lampiran',
      status: 'Disetujui',
    },
    {
      date: '04 Jul 2026',
      source: 'Sponsor Kegiatan',
      reference: 'SPN/004/2026',
      amount: 'Rp 250.000.000',
      docs: '1 lampiran',
      status: 'Disetujui',
    },
    {
      date: '08 Nov 2026',
      source: 'Penerimaan lainnya',
      reference: 'OTH/008/2026',
      amount: 'Rp 50.000.000',
      docs: '1 lampiran',
      status: 'Menunggu',
    },
  ]);

  const [newReceipt, setNewReceipt] = useState({
    date: '09 Nov 2026',
    source: 'Hibah Pemerintah Daerah',
    reference: '',
    amount: '100000000',
    docs: '1 lampiran',
  });

  const handleSaveReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReceipt.reference) return;

    const formattedAmount = `Rp ${Number(newReceipt.amount).toLocaleString('id-ID')}`;

    setFundData([
      {
        date: newReceipt.date,
        source: newReceipt.source,
        reference: newReceipt.reference,
        amount: formattedAmount,
        docs: newReceipt.docs,
        status: 'Menunggu',
      },
      ...fundData,
    ]);

    setShowModal(false);
    showToast(`Penerimaan dana ${newReceipt.reference} (${formattedAmount}) berhasil dicatat.`);
    setNewReceipt({
      date: '09 Nov 2026',
      source: 'Hibah Pemerintah Daerah',
      reference: '',
      amount: '100000000',
      docs: '1 lampiran',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Keuangan / Dana Masuk</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Dana Masuk</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Catat penerimaan dana berdasarkan sumber, tanggal, dan dokumen pendukung resmi.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Catat Dana Masuk
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Penerimaan" value="Rp 2,45 M" foot="Tahun anggaran berjalan" icon={<PlusCircle size={18} />} />
        <KpiCard label="Sumber Dana" value="04 Sumber" foot="Aktif terdata" icon={<Layers size={18} />} />
        <KpiCard label="Transaksi" value="12 Transaksi" foot="Tercatat di pembukuan" icon={<CheckCircle2 size={18} />} />
        <KpiCard label="Perlu Verifikasi" value="01 Transaksi" foot="Periksa dokumen fisik" icon={<Clock size={18} />} />
      </div>

      <DataTable
        title="Riwayat Dana Masuk"
        subtitle="Seluruh penerimaan kas dan transfer hibah resmi"
        columns={[
          { header: 'Tanggal', accessor: 'date' },
          { header: 'Sumber Dana', accessor: 'source' },
          { header: 'Nomor Referensi', accessor: 'reference' },
          { header: 'Nilai Penerimaan', accessor: 'amount' },
          { header: 'Dokumen', accessor: 'docs' },
          { header: 'Status', accessor: 'status', isStatus: true },
        ]}
        data={fundData}
      />

      {/* Modal Dialog for Recording Fund Receipt */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Catat Penerimaan Dana Masuk Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveReceipt} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Tanggal Penerimaan *</label>
                <input
                  type="text"
                  value={newReceipt.date}
                  onChange={(e) => setNewReceipt({ ...newReceipt, date: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Sumber Dana *</label>
                <select
                  value={newReceipt.source}
                  onChange={(e) => setNewReceipt({ ...newReceipt, source: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2 bg-white"
                >
                  <option>Hibah Pemerintah Daerah</option>
                  <option>Bantuan Pembinaan</option>
                  <option>Sponsor Kegiatan</option>
                  <option>Penerimaan Lainnya</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nomor Referensi / SP2D *</label>
                <input
                  type="text"
                  required
                  placeholder="HIB/002/2026"
                  value={newReceipt.reference}
                  onChange={(e) => setNewReceipt({ ...newReceipt, reference: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nilai Penerimaan (Rp) *</label>
                <input
                  type="number"
                  required
                  placeholder="50000000"
                  value={newReceipt.amount}
                  onChange={(e) => setNewReceipt({ ...newReceipt, amount: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sikoni-line">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 rounded-lg border border-sikoni-line text-xs font-bold text-sikoni-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sikoni-teal text-white text-xs font-bold hover:bg-teal-700"
                >
                  Simpan Penerimaan
                </button>
              </div>
            </form>
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
