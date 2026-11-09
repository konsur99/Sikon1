'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { FileCheck2, Clock, RotateCcw, CheckCircle2, Plus, X, Eye, Check, Download, AlertCircle } from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';

export default function LpjPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLpj, setSelectedLpj] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [lpjList, setLpjList] = useState([
    {
      number: 'LPJ-014/X/26',
      activity: 'Pemusatan Latihan Kejurda',
      cabor: 'PBSI',
      totalRealization: 'Rp 31.800.000',
      submittedDate: '08 Nov 2026',
      status: 'Verifikasi',
    },
    {
      number: 'LPJ-013/X/26',
      activity: 'Kejuaraan Daerah Atletik',
      cabor: 'PASI',
      totalRealization: 'Rp 42.100.000',
      submittedDate: '04 Nov 2026',
      status: 'Disetujui',
    },
    {
      number: 'LPJ-012/IX/26',
      activity: 'Liga Internal Sepak Bola',
      cabor: 'PSSI',
      totalRealization: 'Rp 27.500.000',
      submittedDate: '02 Nov 2026',
      status: 'Ditolak',
    },
  ]);

  const [newLpj, setNewLpj] = useState({
    activity: '',
    cabor: 'PASI',
    amount: 'Rp 0',
  });

  const handleCreateLpj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLpj.activity) return;

    const count = lpjList.length + 15;
    const item = {
      number: `LPJ-${count}/XI/26`,
      activity: newLpj.activity,
      cabor: newLpj.cabor,
      totalRealization: newLpj.amount,
      submittedDate: '09 Nov 2026',
      status: 'Verifikasi',
    };

    setLpjList([item, ...lpjList]);
    setShowCreateModal(false);
    showToast(`Dokumen ${item.number} berhasil disusun dan masuk antrean verifikasi.`);
    setNewLpj({ activity: '', cabor: 'PASI', amount: 'Rp 0' });
  };

  const handleUpdateLpjStatus = (number: string, newStatus: string) => {
    setLpjList(lpjList.map((l) => (l.number === number ? { ...l, status: newStatus } : l)));
    setSelectedLpj(null);
    showToast(`Status ${number} berhasil diperbarui menjadi ${newStatus}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Operasional / LPJ</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Laporan Pertanggungjawaban (LPJ)</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Penyusunan dan pemeriksaan LPJ berdasarkan kesesuaian RAB, pengeluaran terverifikasi, kuitansi bayar, dan dokumentasi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Rekap_LPJ_Kegiatan_2026',
                ['Nomor LPJ', 'Nama Kegiatan', 'Cabor', 'Total Realisasi', 'Tanggal Kirim', 'Status Pemeriksaan'],
                lpjList.map((l) => [l.number, l.activity, l.cabor, l.totalRealization, l.submittedDate, l.status]),
              );
              showToast('Rekapitulasi LPJ format CSV / Excel berhasil diunduh.');
            }}
            className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Buat LPJ Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="LPJ Keseluruhan" value="32" foot="Tahun anggaran 2026" icon={<FileCheck2 size={18} />} />
        <KpiCard label="Menunggu Verifikasi" value="05" foot="Dalam antrean penelaahan" icon={<Clock size={18} />} />
        <KpiCard label="Perlu Revisi" value="02" foot="Dikembalikan ke cabor" icon={<RotateCcw size={18} />} />
        <KpiCard label="Disetujui Final" value="25" foot="78,1% telah tuntas" icon={<CheckCircle2 size={18} />} />
      </div>

      <DataTable
        title="Daftar Dokumen LPJ"
        subtitle="Status pemeriksaan laporan pertanggungjawaban kegiatan cabang olahraga"
        columns={[
          { header: 'Nomor LPJ', accessor: 'number' },
          { header: 'Nama Kegiatan', accessor: 'activity' },
          { header: 'Cabor', accessor: 'cabor' },
          { header: 'Total Realisasi', accessor: 'totalRealization' },
          { header: 'Tanggal Kirim', accessor: 'submittedDate' },
          { header: 'Status Pemeriksaan', accessor: 'status', isStatus: true },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedLpj(row)}
                className="bg-white border border-sikoni-line text-sikoni-navy px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
              >
                <Eye size={13} /> Periksa Checklist
              </button>
            ),
          },
        ]}
        data={lpjList}
      />

      {/* Checklist & Kontrol Pemeriksaan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-sikoni space-y-3">
          <h3 className="text-sm font-extrabold text-sikoni-navy">Struktur Kelengkapan LPJ</h3>
          <p className="text-[11px] text-sikoni-muted">5 instrumen wajib yang harus divalidasi</p>

          <div className="divide-y divide-sikoni-line text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <span>1. Identitas dan ringkasan kegiatan</span>
              <span className="text-sikoni-green font-bold">✓ Lengkap</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span>2. Realisasi pengeluaran terhadap RAB</span>
              <span className="text-sikoni-green font-bold">✓ Terhubung</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span>3. Bukti fisik pengeluaran / nota</span>
              <span className="text-sikoni-amber font-bold">◷ 2 Belum valid</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span>4. Bukti kuitansi dan transfer pembayaran</span>
              <span className="text-sikoni-amber font-bold">◷ 1 Belum ada</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span>5. Dokumentasi foto pelaksanaan kegiatan</span>
              <span className="text-sikoni-green font-bold">✓ Lengkap</span>
            </div>
          </div>
        </div>

        <div className="card-sikoni space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Kontrol Pemeriksaan & Validasi</h3>
            <p className="text-[11px] text-sikoni-muted">Ketentuan audit sebelum penetapan persetujuan final</p>
            <p className="text-xs text-sikoni-ink mt-3 leading-relaxed">
              LPJ tidak boleh dinyatakan final apabila terdapat item pengeluaran yang belum diverifikasi, bukti transaksi wajib belum lengkap, atau terdapat selisih lebih penggunaan dana panjar yang belum dikembalikan ke rekening kas KONI Surakarta.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl text-xs text-sikoni-muted">
            Format laporan mengikuti pedoman pertanggungjawaban bantuan hibah olahraga Pemkot Surakarta.
          </div>
        </div>
      </div>

      {/* Create LPJ Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Buat Dokumen LPJ Baru</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLpj} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Pilih Kegiatan yang Telah Selesai *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kejuaraan Renang Kota 2026"
                  value={newLpj.activity}
                  onChange={(e) => setNewLpj({ ...newLpj, activity: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga</label>
                <select
                  value={newLpj.cabor}
                  onChange={(e) => setNewLpj({ ...newLpj, cabor: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>PASI</option>
                  <option>PBSI</option>
                  <option>PSSI</option>
                  <option>PRSI</option>
                  <option>PERPANI</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Total Realisasi Pertanggungjawaban (Rp)</label>
                <input
                  type="text"
                  placeholder="Rp 25.000.000"
                  value={newLpj.amount}
                  onChange={(e) => setNewLpj({ ...newLpj, amount: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sikoni-line">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold hover:bg-teal-700 shadow-sm"
                >
                  Simpan Draf LPJ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive LPJ Audit Checklist Modal */}
      {selectedLpj && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal bg-teal-50 px-2 py-0.5 rounded">
                  {selectedLpj.number}
                </span>
                <h3 className="text-base font-extrabold text-sikoni-navy mt-1">{selectedLpj.activity}</h3>
                <p className="text-xs text-sikoni-muted">{selectedLpj.cabor} • Realisasi: {selectedLpj.totalRealization}</p>
              </div>
              <button onClick={() => setSelectedLpj(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <div className="border border-sikoni-line rounded-xl p-3.5 bg-slate-50 text-xs space-y-2">
              <b className="text-sikoni-navy block">5 Checklist Instrumen Pemeriksaan:</b>
              <div className="space-y-1.5 text-sikoni-ink">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>1. Identitas & Laporan Narasi Hasil Kegiatan</span>
                  <span className="text-sikoni-green font-bold">✓ Lengkap</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>2. Rekonsiliasi Realisasi Belanja terhadap RAB</span>
                  <span className="text-sikoni-green font-bold">✓ Sesuai Pagu</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>3. Keabsahan Bukti Pengeluaran & Nota Pembelian</span>
                  <span className="text-sikoni-green font-bold">✓ Terverifikasi</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span>4. Bukti Kuitansi & Rekening Koran Penerima</span>
                  <span className="text-sikoni-green font-bold">✓ Sah</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>5. Dokumentasi Foto Lapangan & Presensi Atlet</span>
                  <span className="text-sikoni-green font-bold">✓ Terlampir</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-sikoni-line">
              <button
                onClick={() => setSelectedLpj(null)}
                className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
              >
                Tutup
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateLpjStatus(selectedLpj.number, 'Ditolak')}
                  className="px-3 py-2 bg-rose-50 text-sikoni-red rounded-lg text-xs font-bold hover:bg-rose-100 flex items-center gap-1"
                >
                  <AlertCircle size={14} /> Kembalikan Revisi
                </button>
                <button
                  onClick={() => handleUpdateLpjStatus(selectedLpj.number, 'Disetujui')}
                  className="px-4 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold hover:bg-teal-700 shadow-sm flex items-center gap-1"
                >
                  <Check size={14} /> Sahkan & Setujui LPJ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-fade-in text-xs font-bold">
          <Check size={16} className="text-sikoni-green" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
