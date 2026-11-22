'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { exportToCsv } from '../../../lib/exportCsv';
import {
  PlusCircle,
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  X,
  Check,
  Download,
  Building,
  ShieldCheck,
} from 'lucide-react';

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
      source: 'Hibah Pemerintah Daerah (APBD)',
      reference: 'HIB/001/2026',
      amount: 'Rp 1.500.000.000',
      docs: '2 lampiran (NPHD & SP2D)',
      status: 'Disetujui',
    },
    {
      date: '15 Mar 2026',
      source: 'Bantuan Pembinaan Khusus',
      reference: 'BPM/015/2026',
      amount: 'Rp 650.000.000',
      docs: '3 lampiran',
      status: 'Disetujui',
    },
    {
      date: '04 Jul 2026',
      source: 'Sponsor Kegiatan Perbankan',
      reference: 'SPN/004/2026',
      amount: 'Rp 250.000.000',
      docs: '1 lampiran',
      status: 'Disetujui',
    },
    {
      date: '08 Nov 2026',
      source: 'Penerimaan lainnya yang sah',
      reference: 'OTH/008/2026',
      amount: 'Rp 50.000.000',
      docs: '1 lampiran',
      status: 'Menunggu',
    },
  ]);

  const [newReceipt, setNewReceipt] = useState({
    date: '09 Nov 2026',
    source: 'Hibah Pemerintah Daerah (APBD)',
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
      source: 'Hibah Pemerintah Daerah (APBD)',
      reference: '',
      amount: '100000000',
      docs: '1 lampiran',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">
            SIKONI <span className="text-slate-300">/</span> Keuangan <span className="text-slate-300">/</span> Dana Masuk
          </div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Dana Masuk & Penerimaan Hibah</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Pencatatan penerimaan dana kas, hibah APBD Pemkot Surakarta, sponsorship, dan bukti transfer resmi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Rekap_Penerimaan_Dana_KONI_2026',
                ['Tanggal', 'Sumber Dana', 'Nomor Referensi', 'Nilai Penerimaan', 'Lampiran Dokumen', 'Status'],
                fundData.map((f) => [f.date, f.source, f.reference, f.amount, f.docs, f.status]),
              );
              showToast('Data penerimaan kas format CSV / Excel berhasil diekspor.');
            }}
            className="bg-white border border-slate-200 text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus size={15} /> Catat Dana Masuk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Penerimaan"
          value="Rp 2,45 M"
          foot="Tahun anggaran berjalan"
          accentColor="teal"
          badge="Kas Daerah"
          icon={<PlusCircle size={19} />}
        />
        <KpiCard
          label="Sumber Pendanaan"
          value="04 Sumber"
          foot="APBD, sponsor & bantuan"
          accentColor="navy"
          badge="Resmi"
          icon={<Layers size={19} />}
        />
        <KpiCard
          label="Transaksi Kasda"
          value="12 Transaksi"
          foot="Tervalidasi di giro bank"
          accentColor="green"
          badge="Rekening Giro"
          icon={<CheckCircle2 size={19} />}
        />
        <KpiCard
          label="Perlu Verifikasi"
          value="01 Transaksi"
          foot="Cek fisik rekening koran"
          accentColor="amber"
          badge="Review"
          icon={<Clock size={19} />}
        />
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
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-sikoni-teal grid place-items-center shadow-xs">
                  <PlusCircle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sikoni-navy">Catat Penerimaan Dana Masuk</h3>
                  <p className="text-[11px] text-sikoni-muted">Validasi kas masuk APBD Pemkot Surakarta atau sponsor resmi</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveReceipt} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Tanggal Penerimaan *</label>
                  <input
                    type="text"
                    value={newReceipt.date}
                    onChange={(e) => setNewReceipt({ ...newReceipt, date: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nomor Referensi / SP2D *</label>
                  <input
                    type="text"
                    required
                    placeholder="HIB/002/2026"
                    value={newReceipt.reference}
                    onChange={(e) => setNewReceipt({ ...newReceipt, reference: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Sumber Pendanaan *</label>
                <select
                  value={newReceipt.source}
                  onChange={(e) => setNewReceipt({ ...newReceipt, source: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                >
                  <option>Hibah Pemerintah Daerah (APBD)</option>
                  <option>Bantuan Pembinaan Khusus Provinsi</option>
                  <option>Sponsor Kegiatan Perbankan</option>
                  <option>Penerimaan lainnya yang sah</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nilai Penerimaan Kas (Rp) *</label>
                <input
                  type="number"
                  required
                  placeholder="100000000"
                  value={newReceipt.amount}
                  onChange={(e) => setNewReceipt({ ...newReceipt, amount: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                />
              </div>

              {/* Themed Live Preview Sub-Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-50/60 via-white to-slate-50 border border-teal-200/70 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-sikoni-teal uppercase tracking-wider block">Konfirmasi Nilai Masuk</span>
                  <span className="text-[11px] text-slate-500">Rekening Giro Operasional KONI</span>
                </div>
                <div className="text-right">
                  <b className="text-base font-black text-sikoni-teal">
                    Rp {Number(newReceipt.amount || 0).toLocaleString('id-ID')}
                  </b>
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
