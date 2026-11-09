'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Percent, CheckCircle2, Clock, FileCheck, Plus, X } from 'lucide-react';

export default function TaxPage() {
  const [showModal, setShowModal] = useState(false);
  const [taxTransactions, setTaxTransactions] = useState([
    {
      reference: 'EXP-1108',
      type: 'PPh 23 (Sewa Sarana & Venue)',
      taxableBase: 'Rp 12.000.000',
      taxAmount: 'Rp 600.000',
      date: '06 Nov 2026',
      status: 'Dibayar',
    },
    {
      reference: 'EXP-1097',
      type: 'PPN 11% (Pengadaan Peralatan Pertandingan)',
      taxableBase: 'Rp 25.000.000',
      taxAmount: 'Rp 2.750.000',
      date: '03 Nov 2026',
      status: 'Menunggu',
    },
  ]);

  const [newTax, setNewTax] = useState({
    reference: '',
    type: 'PPh 21 (Honorium)',
    taxableBase: 'Rp 10.000.000',
    taxAmount: 'Rp 500.000',
    date: '09 Nov 2026',
  });

  const handleSaveTax = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTax.reference) return;

    setTaxTransactions([
      {
        ...newTax,
        status: 'Menunggu',
      },
      ...taxTransactions,
    ]);

    setShowModal(false);
    setNewTax({
      reference: '',
      type: 'PPh 21 (Honorium)',
      taxableBase: 'Rp 10.000.000',
      taxAmount: 'Rp 500.000',
      date: '09 Nov 2026',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Keuangan / Pajak</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Pajak</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Rekap kewajiban, bukti pemotongan, dan nomor transaksi penerimaan negara (NTPN) penyetoran pajak.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Catat Transaksi Pajak
        </button>
      </div>

      <div className="p-3 bg-amber-50 text-sikoni-amber rounded-xl text-xs border border-amber-200">
        Ketentuan Perpajakan: Tarif pemotongan pajak mengikuti peraturan perundang-undangan perpajakan yang sah, status NPWP penerima, dan klasifikasi kode objek pajak (KOP).
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Pajak Terhitung" value="Rp 48,5 jt" foot="Akumulasi pemotongan" icon={<Percent size={18} />} />
        <KpiCard label="Sudah Disetor (NTPN)" value="Rp 42,1 jt" foot="86,8% ke kas negara" icon={<CheckCircle2 size={18} />} />
        <KpiCard label="Belum Disetor" value="Rp 6,4 jt" foot="Menunggu batas jatuh tempo" icon={<Clock size={18} />} />
        <KpiCard label="Bukti Setor Terarsip" value="18 Dokumen" foot="E-Billing & BPN tervalidasi" icon={<FileCheck size={18} />} />
      </div>

      <DataTable
        title="Daftar Transaksi Pajak Terhubung"
        subtitle="Potongan pajak yang dikaitkan langsung dengan nomor pengeluaran / SPJ"
        columns={[
          { header: 'Referensi Transaksi', accessor: 'reference' },
          { header: 'Jenis Pajak', accessor: 'type' },
          { header: 'Dasar Pengenaan Pajak', accessor: 'taxableBase' },
          { header: 'Nilai Potongan Pajak', accessor: 'taxAmount' },
          { header: 'Tanggal Setor', accessor: 'date' },
          { header: 'Status Setor', accessor: 'status', isStatus: true },
        ]}
        data={taxTransactions}
      />

      {/* Record Tax Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Catat Transaksi Pemotongan Pajak</h3>
              <button onClick={() => setShowModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTax} className="space-y-3">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nomor Pengeluaran / SPJ *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: EXP-1126"
                  value={newTax.reference}
                  onChange={(e) => setNewTax({ ...newTax, reference: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Jenis Potongan Pajak</label>
                <select
                  value={newTax.type}
                  onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>PPh 21 (Honorium / Upah / Uang Saku)</option>
                  <option>PPh 22 (Belanja Pengadaan Barang)</option>
                  <option>PPh 23 (Sewa Venue & Jasa)</option>
                  <option>PPN 11% (Faktur Pajak)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Dasar Pengenaan (DPP)</label>
                  <input
                    type="text"
                    value={newTax.taxableBase}
                    onChange={(e) => setNewTax({ ...newTax, taxableBase: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nilai Pajak Terhitung</label>
                  <input
                    type="text"
                    value={newTax.taxAmount}
                    onChange={(e) => setNewTax({ ...newTax, taxAmount: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sikoni-line">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 font-bold text-sikoni-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sikoni-teal text-white rounded-lg font-bold hover:bg-teal-700 shadow-sm"
                >
                  Simpan Transaksi Pajak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
