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

      <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 rounded-2xl text-xs border border-amber-200/80 shadow-sm flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
        <span>
          <b>Pedoman Alokasi Anggaran:</b> Kontrol anggaran wajib memakai nilai alokasi yang sah. Usulan RAB berstatus draft atau menunggu persetujuan tidak boleh dihitung sebagai realisasi kas.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Pagu"
          value="Rp 2,45 M"
          foot="Disahkan APBD Surakarta"
          accentColor="navy"
          badge="DPA Murni"
          icon={<FileSpreadsheet size={19} />}
        />
        <KpiCard
          label="Alokasi Program"
          value="Rp 1,82 M"
          foot="74,3% dari total pagu"
          accentColor="teal"
          badge="42 Cabor"
          icon={<Layers size={19} />}
        />
        <KpiCard
          label="Komitmen Aktif"
          value="Rp 310 jt"
          foot="RAB disetujui, berjalan"
          accentColor="amber"
          badge="Berjalan"
          icon={<Clock size={19} />}
        />
        <KpiCard
          label="Belum Dialokasikan"
          value="Rp 630 jt"
          foot="Pagu cadangan tersedia"
          accentColor="green"
          badge="Tersedia"
          icon={<Plus size={19} />}
        />
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
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-sikoni-teal grid place-items-center shadow-xs">
                  <FileSpreadsheet size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sikoni-navy">Tambah Alokasi Anggaran Cabor</h3>
                  <p className="text-[11px] text-sikoni-muted">Penetapan pagu tahun anggaran 2026 berdasarkan SK Ketua Umum</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAllocation} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Tahun Anggaran *</label>
                  <input
                    type="text"
                    value={newAllocation.year}
                    onChange={(e) => setNewAllocation({ ...newAllocation, year: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Sumber Pendanaan *</label>
                  <select
                    value={newAllocation.fundSource}
                    onChange={(e) => setNewAllocation({ ...newAllocation, fundSource: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                  >
                    <option>Hibah Pemerintah Daerah (APBD)</option>
                    <option>Bantuan Pembinaan Khusus</option>
                    <option>Sponsorship & Pendanaan Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Program Olahraga *</label>
                <select
                  value={newAllocation.program}
                  onChange={(e) => setNewAllocation({ ...newAllocation, program: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
                >
                  <option>Pembinaan Atlet & Pelatih</option>
                  <option>Kompetisi & Kejuaraan Daerah</option>
                  <option>Operasional & Sekretariat Cabor</option>
                  <option>Pendidikan & Penataran Wasit/Pelatih</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga / Unit Penerima *</label>
                <select
                  value={newAllocation.cabor}
                  onChange={(e) => setNewAllocation({ ...newAllocation, cabor: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
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
                <label className="font-bold text-sikoni-navy block mb-1">Nilai Alokasi Pagu (Rp) *</label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 150000000"
                  value={newAllocation.amount}
                  onChange={(e) => setNewAllocation({ ...newAllocation, amount: e.target.value })}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                />
              </div>

              {/* Themed Live Preview Sub-Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-50/60 via-white to-slate-50 border border-teal-200/70 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-sikoni-teal uppercase tracking-wider block">Pagu yang Dialokasikan</span>
                  <span className="text-[11px] text-slate-500 font-medium">{newAllocation.cabor}</span>
                </div>
                <div className="text-right">
                  <b className="text-base font-black text-sikoni-teal">
                    Rp {Number(newAllocation.amount || 0).toLocaleString('id-ID')}
                  </b>
                  <span className="text-[9.5px] font-bold text-slate-500 block">Status: Pagu Murni 2026</span>
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
