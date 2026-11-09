'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { ArrowUpRight, CheckCircle2, Layers, Clock, Download, Check, X, Eye } from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';

export default function RealizationPage() {
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  const [expenses, setExpenses] = useState([
    {
      id: 'EXP-1126',
      description: 'Transportasi atlet & ofisial kejuaraan',
      cabor: 'PASI',
      amount: 'Rp 4.500.000',
      date: '08 Nov 2026',
      status: 'Verifikasi',
      method: 'Reimbursement',
      proof: 'Kuitansi_Bus_Pariwisata.pdf',
    },
    {
      id: 'EXP-1125',
      description: 'Sewa gedung & matras latihan',
      cabor: 'PBSI',
      amount: 'Rp 3.000.000',
      date: '08 Nov 2026',
      status: 'Disetujui',
      method: 'Pembayaran Langsung',
      proof: 'Invoice_GOR_Manahan.pdf',
    },
    {
      id: 'EXP-1124',
      description: 'Konsumsi atlet pemusatan latihan',
      cabor: 'PSSI',
      amount: 'Rp 2.750.000',
      date: '07 Nov 2026',
      status: 'Menunggu',
      method: 'Uang Muka / Panjar',
      proof: 'Nota_Katering_Berkah.jpg',
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
    showToast(`Pengeluaran ${id} berhasil diubah statusnya menjadi ${newStatus}.`);
    setSelectedExpense(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Keuangan / Realisasi</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Realisasi Pengeluaran</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Pengeluaran yang telah diinput cabor, status verifikasi berkas bukti, dan jadwal pembayaran kas.
          </p>
        </div>

        <button
          onClick={() => {
            exportToCsv(
              'Rekap_Realisasi_Pengeluaran_2026',
              ['ID Pengeluaran', 'Uraian Pengeluaran', 'Cabang Olahraga', 'Metode Bayar', 'Nilai Transaksi', 'Tanggal', 'Status Verifikasi', 'Lampiran Bukti'],
              expenses.map((e) => [e.id, e.description, e.cabor, e.method, e.amount, e.date, e.status, e.proof]),
            );
            showToast('Rekapitulasi realisasi pengeluaran format CSV / Excel berhasil diunduh.');
          }}
          className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <Download size={14} /> Unduh Rekap CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Pengeluaran Diajukan" value="Rp 1,36 M" foot="Termasuk menunggu verifikasi" icon={<ArrowUpRight size={18} />} />
        <KpiCard label="Terverifikasi" value="Rp 1,21 M" foot="Layak dipertanggungjawabkan" icon={<CheckCircle2 size={18} />} />
        <KpiCard label="Sudah Dibayar" value="Rp 985 jt" foot="Kuitansi transfer tercatat" icon={<Layers size={18} />} />
        <KpiCard label="Kewajiban Belum Dibayar" value="Rp 225 jt" foot="Menunggu pencairan kas" icon={<Clock size={18} />} />
      </div>

      <DataTable
        title="Daftar Pengeluaran & Verifikasi Bukti"
        subtitle="Pisahkan proses verifikasi berkas dari proses pengeluaran kas"
        columns={[
          { header: 'ID Pengeluaran', accessor: 'id' },
          { header: 'Uraian Pengeluaran', accessor: 'description' },
          { header: 'Cabor', accessor: 'cabor' },
          { header: 'Metode Bayar', accessor: 'method' },
          { header: 'Nilai Pengeluaran', accessor: 'amount' },
          { header: 'Tanggal', accessor: 'date' },
          { header: 'Status Verifikasi', accessor: 'status', isStatus: true },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedExpense(row)}
                className="bg-white border border-sikoni-line text-sikoni-navy px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
              >
                <Eye size={13} /> Periksa
              </button>
            ),
          },
        ]}
        data={expenses}
      />

      <div className="p-3 bg-slate-100 text-sikoni-muted rounded-xl text-xs">
        *Prinsip: Nilai belum dibayar hanya dihitung dari kewajiban yang telah diverifikasi sah dan disetujui untuk dibayar, bukan seluruh pengajuan draft.
      </div>

      {/* Expense Verification Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal bg-teal-50 px-2 py-0.5 rounded">
                  {selectedExpense.id}
                </span>
                <h3 className="text-base font-extrabold text-sikoni-navy mt-1">{selectedExpense.description}</h3>
                <p className="text-xs text-sikoni-muted">{selectedExpense.cabor} • {selectedExpense.method}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-sikoni-muted block">Nilai Transaksi</span>
                <b className="text-base text-sikoni-navy">{selectedExpense.amount}</b>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-sikoni-muted">Berkas Bukti / Nota:</span>
                <b className="text-sikoni-teal font-semibold">{selectedExpense.proof}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-sikoni-muted">Status Saat Ini:</span>
                <b>{selectedExpense.status}</b>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-sikoni-line">
              <button
                onClick={() => setSelectedExpense(null)}
                className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
              >
                Tutup
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedExpense.id, 'Ditolak')}
                  className="px-3 py-2 bg-rose-50 text-sikoni-red rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <X size={14} /> Tolak Nota
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedExpense.id, 'Disetujui')}
                  className="px-4 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <Check size={14} /> Verifikasi Sah
                </button>
              </div>
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
