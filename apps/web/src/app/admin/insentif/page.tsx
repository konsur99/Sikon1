'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Award, Users, CheckCircle2, Clock, Plus, X } from 'lucide-react';

export default function IncentivePage() {
  const [showModal, setShowModal] = useState(false);
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
      ...incentiveData,
      {
        ...newRecipient,
        status: 'Menunggu',
      },
    ]);

    setShowModal(false);
    setNewRecipient({
      name: '',
      cabor: 'Atletik (PASI)',
      category: 'Atlet Berprestasi',
      period: 'Nov 2026',
      amount: 'Rp 5.000.000',
    });
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

        <button
          onClick={() => setShowModal(true)}
          className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Tambah Insentif
        </button>
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
        ]}
        data={incentiveData}
      />

      {/* Add Incentive Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Tambah Data Penerima Insentif</h3>
              <button onClick={() => setShowModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nama Lengkap Penerima *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama atlet atau pelatih"
                  value={newRecipient.name}
                  onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga</label>
                  <select
                    value={newRecipient.cabor}
                    onChange={(e) => setNewRecipient({ ...newRecipient, cabor: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                  >
                    <option>Atletik (PASI)</option>
                    <option>Bulutangkis (PBSI)</option>
                    <option>Sepak Bola (PSSI)</option>
                    <option>Renang (PRSI)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kategori Penerima</label>
                  <select
                    value={newRecipient.category}
                    onChange={(e) => setNewRecipient({ ...newRecipient, category: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
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
                  <label className="font-bold text-sikoni-navy block mb-1">Periode Bulan</label>
                  <input
                    type="text"
                    value={newRecipient.period}
                    onChange={(e) => setNewRecipient({ ...newRecipient, period: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nilai Insentif (Rp)</label>
                  <input
                    type="text"
                    value={newRecipient.amount}
                    onChange={(e) => setNewRecipient({ ...newRecipient, amount: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
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
                  Simpan Penerima
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
