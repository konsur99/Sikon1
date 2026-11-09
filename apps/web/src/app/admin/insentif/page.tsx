'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Award, Users, CheckCircle2, Clock, Plus, X, Download, Check, CreditCard } from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';

export default function IncentivePage() {
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [incentiveData, setIncentiveData] = useState([
    {
      name: 'Andi Pratama',
      cabor: 'Atletik (PASI)',
      category: 'Atlet Berprestasi',
      period: 'Okt 2026',
      amount: 'Rp 5.000.000',
      status: 'Dibayar',
    },
    {
      name: 'Siti Rahma',
      cabor: 'Bulutangkis (PBSI)',
      category: 'Atlet Berprestasi',
      period: 'Okt 2026',
      amount: 'Rp 5.000.000',
      status: 'Menunggu',
    },
    {
      name: 'Budi Santoso',
      cabor: 'Renang (PRSI)',
      category: 'Pelatih Kepala',
      period: 'Okt 2026',
      amount: 'Rp 7.500.000',
      status: 'Verifikasi',
    },
    {
      name: 'Dewi Lestari',
      cabor: 'Panahan (PERPANI)',
      category: 'Atlet Berprestasi',
      period: 'Okt 2026',
      amount: 'Rp 5.000.000',
      status: 'Menunggu',
    },
  ]);

  const [newRecipient, setNewRecipient] = useState({
    name: '',
    cabor: 'Atletik (PASI)',
    category: 'Atlet Berprestasi',
    period: 'Nov 2026',
    amount: 'Rp 5.000.000',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.name) return;

    setIncentiveData([
      {
        ...newRecipient,
        status: 'Menunggu',
      },
      ...incentiveData,
    ]);

    setShowModal(false);
    showToast(`Penerima insentif baru atas nama ${newRecipient.name} berhasil ditambahkan.`);
    setNewRecipient({
      name: '',
      cabor: 'Atletik (PASI)',
      category: 'Atlet Berprestasi',
      period: 'Nov 2026',
      amount: 'Rp 5.000.000',
    });
  };

  const handleTogglePayment = (name: string) => {
    setIncentiveData(
      incentiveData.map((it) => (it.name === name ? { ...it, status: it.status === 'Dibayar' ? 'Verifikasi' : 'Dibayar' } : it)),
    );
    showToast(`Status transfer insentif ${name} berhasil diubah.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Keuangan / Insentif</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Insentif</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Pengelolaan insentif pembinaan bulanan atlet berprestasi, pelatih, dan ofisial cabang olahraga.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Rekap_Insentif_Atlet_Pelatih_2026',
                ['Nama Penerima', 'Cabang Olahraga', 'Kategori', 'Periode', 'Nilai Insentif', 'Status Transfer'],
                incentiveData.map((it) => [it.name, it.cabor, it.category, it.period, it.amount, it.status]),
              );
              showToast('Rekapitulasi penerima insentif (CSV / Excel) berhasil diunduh.');
            }}
            className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Tambah Insentif
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Alokasi Insentif" value="Rp 420 jt" foot="Tahun anggaran 2026" icon={<Award size={18} />} />
        <KpiCard label="Total Penerima" value="86 Orang" foot="Atlet, pelatih, ofisial" icon={<Users size={18} />} />
        <KpiCard label="Sudah Dibayarkan" value="Rp 305 jt" foot="72,6% terserap" icon={<CheckCircle2 size={18} />} />
        <KpiCard label="Menunggu Proses" value="Rp 115 jt" foot="Verifikasi presensi & SK" icon={<Clock size={18} />} />
      </div>

      <DataTable
        title="Daftar Penerima Insentif"
        subtitle="Data penerima, SK penetapan, dan status transfer bank"
        columns={[
          { header: 'Nama Penerima', accessor: 'name' },
          { header: 'Cabang Olahraga', accessor: 'cabor' },
          { header: 'Kategori', accessor: 'category' },
          { header: 'Periode', accessor: 'period' },
          { header: 'Nilai Insentif', accessor: 'amount' },
          { header: 'Status Transfer', accessor: 'status', isStatus: true },
          {
            header: 'Aksi Bayar',
            accessor: (row) => (
              <button
                onClick={() => handleTogglePayment(row.name)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-colors ${
                  row.status === 'Dibayar'
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-sikoni-teal text-white hover:bg-teal-700'
                }`}
              >
                <CreditCard size={12} />
                {row.status === 'Dibayar' ? 'Batal Bayar' : 'Proses Transfer'}
              </button>
            ),
          },
        ]}
        data={incentiveData}
      />

      {/* Add Incentive Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-sikoni-gold grid place-items-center shadow-xs">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sikoni-navy">Tambah Penerima Insentif Bulanan</h3>
                  <p className="text-[11px] text-sikoni-muted">Berdasarkan SK Penetapan Atlet & Pelatih Berprestasi Kota Surakarta</p>
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
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nama Lengkap Penerima *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Reza Fauzi"
                  value={newRecipient.name}
                  onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga *</label>
                  <select
                    value={newRecipient.cabor}
                    onChange={(e) => setNewRecipient({ ...newRecipient, cabor: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                  >
                    <option>Atletik (PASI)</option>
                    <option>Bulutangkis (PBSI)</option>
                    <option>Sepak Bola (PSSI)</option>
                    <option>Renang (PRSI)</option>
                    <option>Panahan (PERPANI)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kategori Penerima *</label>
                  <select
                    value={newRecipient.category}
                    onChange={(e) => setNewRecipient({ ...newRecipient, category: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                  >
                    <option>Atlet Berprestasi</option>
                    <option>Pelatih Kepala</option>
                    <option>Asisten Pelatih</option>
                    <option>Ofisial Medis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Periode Bulan *</label>
                  <select
                    value={newRecipient.period}
                    onChange={(e) => setNewRecipient({ ...newRecipient, period: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                  >
                    <option>Nov 2026</option>
                    <option>Des 2026</option>
                    <option>Okt 2026</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nominal Insentif *</label>
                  <select
                    value={newRecipient.amount}
                    onChange={(e) => setNewRecipient({ ...newRecipient, amount: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                  >
                    <option value="Rp 5.000.000">Rp 5.000.000 (Atlet)</option>
                    <option value="Rp 7.500.000">Rp 7.500.000 (Pelatih)</option>
                    <option value="Rp 3.500.000">Rp 3.500.000 (Ofisial)</option>
                  </select>
                </div>
              </div>

              {/* Themed Live Preview Sub-Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50/60 via-white to-slate-50 border border-amber-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Ringkasan Insentif</span>
                  <span className="text-[11px] text-slate-600 font-medium">{newRecipient.name || 'Nama Penerima'} • {newRecipient.category}</span>
                </div>
                <div className="text-right">
                  <b className="text-base font-black text-amber-900">{newRecipient.amount}</b>
                  <span className="text-[9.5px] font-bold text-slate-500 block">Periode: {newRecipient.period}</span>
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
                  Simpan Penerima
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
