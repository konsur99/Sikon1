'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { FileSpreadsheet, Layers, Clock, Plus, Download, X, Check } from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';

export default function BudgetControlPage() {
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [budgetAllocations, setBudgetAllocations] = useState([
    {
      cabor: 'Pembinaan Atlet — PASI',
      pagu: 'Rp 320 jt',
      rab: 'Rp 260 jt',
      commitment: 'Rp 45 jt',
      realization: 'Rp 180 jt',
      progress: (
        <div className="w-full max-w-[120px]">
          <div className="flex justify-between text-[10px] text-sikoni-muted mb-1">
            <span>56%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sikoni-teal rounded-full" style={{ width: '56%' }} />
          </div>
        </div>
      ),
    },
    {
      cabor: 'Pembinaan Atlet — PBSI',
      pagu: 'Rp 280 jt',
      rab: 'Rp 220 jt',
      commitment: 'Rp 38 jt',
      realization: 'Rp 170 jt',
      progress: (
        <div className="w-full max-w-[120px]">
          <div className="flex justify-between text-[10px] text-sikoni-muted mb-1">
            <span>61%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sikoni-teal rounded-full" style={{ width: '61%' }} />
          </div>
        </div>
      ),
    },
    {
      cabor: 'Kompetisi — PSSI',
      pagu: 'Rp 450 jt',
      rab: 'Rp 310 jt',
      commitment: 'Rp 95 jt',
      realization: 'Rp 205 jt',
      progress: (
        <div className="w-full max-w-[120px]">
          <div className="flex justify-between text-[10px] text-sikoni-muted mb-1">
            <span>46%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sikoni-teal rounded-full" style={{ width: '46%' }} />
          </div>
        </div>
      ),
    },
    {
      cabor: 'Pembinaan — PRSI',
      pagu: 'Rp 190 jt',
      rab: 'Rp 125 jt',
      commitment: 'Rp 22 jt',
      realization: 'Rp 80 jt',
      progress: (
        <div className="w-full max-w-[120px]">
          <div className="flex justify-between text-[10px] text-sikoni-muted mb-1">
            <span>42%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sikoni-teal rounded-full" style={{ width: '42%' }} />
          </div>
        </div>
      ),
    },
  ]);

  const [newAllocation, setNewAllocation] = useState({
    year: '2026',
    program: 'Pembinaan Atlet & Pelatih',
    cabor: 'PERPANI — Panahan',
    fundSource: 'Hibah Pemerintah Daerah (APBD)',
    amount: '150000000',
  });

  const handleSaveAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAmount = `Rp ${(Number(newAllocation.amount) / 1000000).toFixed(0)} jt`;

    setBudgetAllocations([
      ...budgetAllocations,
      {
        cabor: `${newAllocation.program} — ${newAllocation.cabor.split(' ')[0]}`,
        pagu: formattedAmount,
        rab: 'Rp 0 jt',
        commitment: 'Rp 0 jt',
        realization: 'Rp 0 jt',
        progress: (
          <div className="w-full max-w-[120px]">
            <div className="flex justify-between text-[10px] text-sikoni-muted mb-1">
              <span>0%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-sikoni-teal rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        ),
      },
    ]);

    setShowModal(false);
    showToast(`Alokasi anggaran ${newAllocation.cabor} sebesar ${formattedAmount} berhasil ditambahkan.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Keuangan / Anggaran</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Anggaran</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Kontrol pagu anggaran, alokasi per cabang olahraga, RAB disetujui, dan komitmen aktif.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Alokasi_Anggaran_Cabor_2026',
                ['Program / Cabang Olahraga', 'Pagu Alokasi', 'RAB Disetujui', 'Komitmen Aktif', 'Realisasi Valid'],
                budgetAllocations.map((b) => [b.cabor, b.pagu, b.rab, b.commitment, b.realization]),
              );
              showToast('Ekspor alokasi anggaran cabor (CSV / Excel) berhasil diunduh.');
            }}
            className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Alokasi Anggaran
          </button>
        </div>
      </div>

      <div className="p-3 bg-amber-50 text-sikoni-amber rounded-xl text-xs border border-amber-200">
        Kontrol anggaran wajib memakai nilai alokasi yang sah. Usulan RAB berstatus draft atau menunggu persetujuan tidak boleh dihitung sebagai realisasi kas.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Pagu" value="Rp 2,45 M" foot="Disahkan APBD Surakarta" icon={<FileSpreadsheet size={18} />} />
        <KpiCard label="Alokasi Program" value="Rp 1,82 M" foot="74,3% dari total pagu" icon={<Layers size={18} />} />
        <KpiCard label="Komitmen Aktif" value="Rp 310 jt" foot="RAB disetujui, kegiatan berjalan" icon={<Clock size={18} />} />
        <KpiCard label="Belum Dialokasikan" value="Rp 630 jt" foot="Bukan merupakan saldo kas" icon={<Plus size={18} />} />
      </div>

      <DataTable
        title="Alokasi Anggaran per Cabang Olahraga"
        subtitle="Data pemantauan serapan kegiatan tahun 2026"
        columns={[
          { header: 'Program / Cabang Olahraga', accessor: 'cabor' },
          { header: 'Pagu Alokasi', accessor: 'pagu' },
          { header: 'RAB Disetujui', accessor: 'rab' },
          { header: 'Komitmen Aktif', accessor: 'commitment' },
          { header: 'Realisasi Valid', accessor: 'realization' },
          { header: 'Progress Serapan', accessor: 'progress' },
        ]}
        data={budgetAllocations}
      />

      {/* Add Allocation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Tambah Alokasi Anggaran Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAllocation} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Tahun Anggaran</label>
                <input
                  type="text"
                  value={newAllocation.year}
                  onChange={(e) => setNewAllocation({ ...newAllocation, year: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Program Olahraga</label>
                <select
                  value={newAllocation.program}
                  onChange={(e) => setNewAllocation({ ...newAllocation, program: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>Pembinaan Atlet & Pelatih</option>
                  <option>Kompetisi & Kejuaraan Daerah</option>
                  <option>Operasional & Sekretariat Cabor</option>
                  <option>Pendidikan & Penataran Wasit/Pelatih</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga / Unit</label>
                <select
                  value={newAllocation.cabor}
                  onChange={(e) => setNewAllocation({ ...newAllocation, cabor: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>PASI — Atletik</option>
                  <option>PBSI — Bulutangkis</option>
                  <option>PSSI — Sepak Bola</option>
                  <option>PRSI — Renang</option>
                  <option>PERPANI — Panahan</option>
                  <option>PERSILAT — Pencak Silat</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Sumber Dana</label>
                <select
                  value={newAllocation.fundSource}
                  onChange={(e) => setNewAllocation({ ...newAllocation, fundSource: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>Hibah Pemerintah Daerah (APBD)</option>
                  <option>Bantuan Pembinaan Khusus</option>
                  <option>Sponsorship & Pendanaan Lainnya</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nilai Alokasi Pagu (Rp) *</label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 150000000"
                  value={newAllocation.amount}
                  onChange={(e) => setNewAllocation({ ...newAllocation, amount: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
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
                  Simpan Alokasi
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
