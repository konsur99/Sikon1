'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Shield, CheckCircle2, Users, Clock, Plus, X } from 'lucide-react';

export default function AdminCaborPage() {
  const [selectedCabor, setSelectedCabor] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [caborData, setCaborData] = useState([
    {
      code: 'PASI',
      name: 'Persatuan Atletik Seluruh Indonesia',
      category: 'Terukur',
      athletes: 42,
      leader: 'Dr. Bambang Setiawan',
      email: 'pasi@koni-surakarta.id',
      phone: '08112233441',
      status: 'Aktif',
    },
    {
      code: 'PBSI',
      name: 'Persatuan Bulutangkis Seluruh Indonesia',
      category: 'Permainan',
      athletes: 36,
      leader: 'H. Suryanto',
      email: 'pbsi@koni-surakarta.id',
      phone: '08112233442',
      status: 'Aktif',
    },
    {
      code: 'PSSI',
      name: 'Persatuan Sepakbola Seluruh Indonesia',
      category: 'Permainan',
      athletes: 58,
      leader: 'Agus Wibowo, S.E.',
      email: 'pssi@koni-surakarta.id',
      phone: '08112233443',
      status: 'Aktif',
    },
    {
      code: 'PRSI',
      name: 'Persatuan Renang Seluruh Indonesia',
      category: 'Terukur',
      athletes: 24,
      leader: 'Dra. Endang Purwanti',
      email: 'prsi@koni-surakarta.id',
      phone: '08112233444',
      status: 'Aktif',
    },
    {
      code: 'PERPANI',
      name: 'Persatuan Panahan Indonesia',
      category: 'Akurasi',
      athletes: 18,
      leader: 'Joko Susilo',
      email: 'perpani@koni-surakarta.id',
      phone: '08112233445',
      status: 'Aktif',
    },
  ]);

  const [newCabor, setNewCabor] = useState({
    code: '',
    name: '',
    category: 'Permainan',
    leader: '',
    email: '',
    phone: '',
    athletes: 20,
  });

  const handleAddCabor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCabor.code || !newCabor.name) return;

    setCaborData([
      ...caborData,
      {
        ...newCabor,
        status: 'Aktif',
      },
    ]);

    setShowAddModal(false);
    setNewCabor({
      code: '',
      name: '',
      category: 'Permainan',
      leader: '',
      email: '',
      phone: '',
      athletes: 20,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Master / Data Cabor</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Data Cabang Olahraga</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Master data cabang olahraga, susunan pengurus, kontak sekretariat, dan status keaktifan keanggotaan.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Tambah Cabor
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Cabor Terdaftar" value="42" foot="Master database" icon={<Shield size={18} />} />
        <KpiCard label="Cabor Aktif" value="39" foot="92,8% aktif membina" icon={<CheckCircle2 size={18} />} />
        <KpiCard label="Akun Operator Cabor" value="76" foot="Terdaftar di sistem" icon={<Users size={18} />} />
        <KpiCard label="Perlu Pembaruan SK" value="03" foot="Masa bakti pengurus" icon={<Clock size={18} />} />
      </div>

      <DataTable
        title="Daftar Cabang Olahraga"
        subtitle="Pilih cabor untuk melihat profil detail, daftar pengurus, dan aktivitas usulan"
        columns={[
          { header: 'Kode', accessor: 'code' },
          { header: 'Cabang Olahraga', accessor: 'name' },
          { header: 'Kategori', accessor: 'category' },
          { header: 'Jumlah Atlet', accessor: (row) => `${row.athletes} Atlet` },
          { header: 'Ketua Umum', accessor: 'leader' },
          { header: 'Status', accessor: 'status', isStatus: true },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedCabor(row)}
                className="bg-white border border-sikoni-line text-sikoni-navy px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-50"
              >
                Detail
              </button>
            ),
          },
        ]}
        data={caborData}
      />

      {/* Add Cabor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Tambah Master Cabang Olahraga</h3>
              <button onClick={() => setShowAddModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCabor} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kode Cabor *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PERSILAT"
                    value={newCabor.code}
                    onChange={(e) => setNewCabor({ ...newCabor, code: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kategori Olahraga</label>
                  <select
                    value={newCabor.category}
                    onChange={(e) => setNewCabor({ ...newCabor, category: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                  >
                    <option>Permainan</option>
                    <option>Terukur</option>
                    <option>Bela Diri</option>
                    <option>Akurasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nama Resmi Cabang Olahraga *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ikatan Pencak Silat Indonesia"
                  value={newCabor.name}
                  onChange={(e) => setNewCabor({ ...newCabor, name: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nama Ketua Umum Pengkot</label>
                <input
                  type="text"
                  placeholder="Nama lengkap ketua"
                  value={newCabor.leader}
                  onChange={(e) => setNewCabor({ ...newCabor, leader: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Email Resmi</label>
                  <input
                    type="email"
                    placeholder="cabor@koni-surakarta.id"
                    value={newCabor.email}
                    onChange={(e) => setNewCabor({ ...newCabor, email: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nomor Kontak</label>
                  <input
                    type="text"
                    placeholder="0812..."
                    value={newCabor.phone}
                    onChange={(e) => setNewCabor({ ...newCabor, phone: e.target.value })}
                    className="w-full border border-sikoni-line rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sikoni-line">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold hover:bg-teal-700 shadow-sm"
                >
                  Simpan Cabor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cabor Profile Modal */}
      {selectedCabor && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <b className="text-xl font-black text-sikoni-navy">{selectedCabor.code}</b>
                <div className="text-xs text-sikoni-muted">{selectedCabor.name}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#e8f6f0] text-[#23846d]">
                {selectedCabor.status}
              </span>
            </div>

            <div className="divide-y divide-sikoni-line text-xs bg-slate-50 p-4 rounded-xl border border-sikoni-line space-y-2">
              <div className="flex justify-between py-1">
                <span className="text-sikoni-muted">Kategori Olahraga</span>
                <b>{selectedCabor.category}</b>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sikoni-muted">Ketua Umum Pengkot</span>
                <b>{selectedCabor.leader}</b>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sikoni-muted">Email Resmi</span>
                <b>{selectedCabor.email}</b>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sikoni-muted">Nomor Kontak</span>
                <b>{selectedCabor.phone}</b>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sikoni-muted">Atlet Terdata</span>
                <b>{selectedCabor.athletes} Orang</b>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCabor(null)}
                className="px-4 py-2 bg-sikoni-navy text-white text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
