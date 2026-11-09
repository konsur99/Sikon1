'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Send, Save, Check, UploadCloud, FileText } from 'lucide-react';
import { MoneyMath } from '@sikoni/shared';

interface RabItemRow {
  id: number;
  description: string;
  volume: number;
  unit: string;
  unitPrice: number;
}

export default function RabBuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(2);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Proposal_Kejuaraan_Atletik_Kota_2026.pdf (2.4 MB)',
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Step 1 Form Data
  const [formData, setFormData] = useState({
    name: 'Kejuaraan Atletik Kota Surakarta',
    cabor: 'PASI — Atletik',
    program: 'Pembinaan dan Kompetisi Prestasi',
    period: '20–22 November 2026',
    location: 'Stadion Sriwedari, Surakarta',
    fundSource: 'Hibah Pemerintah Daerah (APBD Surakarta)',
  });

  // Step 2 Items
  const [items, setItems] = useState<RabItemRow[]>([
    { id: 1, description: 'Sewa venue & lintasan atletik', volume: 3, unit: 'Hari', unitPrice: 5000000 },
    { id: 2, description: 'Konsumsi atlet dan ofisial', volume: 120, unit: 'Paket', unitPrice: 75000 },
    { id: 3, description: 'Transportasi kontingen & bus', volume: 1, unit: 'Paket', unitPrice: 12500000 },
    { id: 4, description: 'Perlengkapan dan nomor dada tanding', volume: 1, unit: 'Paket', unitPrice: 12000000 },
  ]);

  const totalAmount = items.reduce((acc, it) => acc + it.volume * it.unitPrice, 0);

  const addItem = () => {
    const nextId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([
      ...items,
      { id: nextId, description: 'Item biaya baru', volume: 1, unit: 'Paket', unitPrice: 1000000 },
    ]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSubmit = () => {
    setShowConfirmModal(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      router.push('/admin/pengajuan');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Pengajuan / RAB</div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Detail / Buat RAB</h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Formulir penyusunan Rencana Anggaran Biaya kegiatan cabang olahraga.
          </p>
        </div>

        <Link
          href="/admin/pengajuan"
          className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft size={14} /> Kembali ke Daftar
        </Link>
      </div>

      <div className="card-sikoni space-y-6">
        {/* Interactive Stepper Header */}
        <div className="flex items-center justify-between border-b border-sikoni-line pb-4 max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 ${
              currentStep === 1
                ? 'text-sikoni-teal font-extrabold'
                : currentStep > 1
                ? 'text-sikoni-green font-bold'
                : 'text-sikoni-muted'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
                currentStep > 1
                  ? 'bg-sikoni-green text-white'
                  : currentStep === 1
                  ? 'bg-sikoni-teal text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className="text-xs">1. Informasi Kegiatan</span>
          </button>

          <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-sikoni-teal' : 'bg-slate-200'}`} />

          <button
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2 ${
              currentStep === 2
                ? 'text-sikoni-teal font-extrabold'
                : currentStep > 2
                ? 'text-sikoni-green font-bold'
                : 'text-sikoni-muted'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
                currentStep > 2
                  ? 'bg-sikoni-green text-white'
                  : currentStep === 2
                  ? 'bg-sikoni-teal text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className="text-xs">2. Rincian Biaya</span>
          </button>

          <div className={`w-12 h-0.5 ${currentStep === 3 ? 'bg-sikoni-teal' : 'bg-slate-200'}`} />

          <button
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-2 ${
              currentStep === 3 ? 'text-sikoni-teal font-extrabold' : 'text-sikoni-muted'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
                currentStep === 3 ? 'bg-sikoni-teal text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </span>
            <span className="text-xs">3. Dokumen & Kirim</span>
          </button>
        </div>

        {/* STEP 1: INFORMASI KEGIATAN */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-sikoni-navy">Data Pokok Usulan Kegiatan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Nama Kegiatan *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 focus:outline-sikoni-teal"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga *</label>
                <select
                  value={formData.cabor}
                  onChange={(e) => setFormData({ ...formData, cabor: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white focus:outline-sikoni-teal"
                >
                  <option>PASI — Atletik</option>
                  <option>PBSI — Bulutangkis</option>
                  <option>PSSI — Sepak Bola</option>
                  <option>PRSI — Renang</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Program Pembinaan</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>Pembinaan dan Kompetisi Prestasi</option>
                  <option>Pemusatan Latihan Daerah</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Periode Pelaksanaan</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Lokasi Kegiatan</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Sumber Pendanaan</label>
                <select
                  value={formData.fundSource}
                  onChange={(e) => setFormData({ ...formData, fundSource: e.target.value })}
                  className="w-full border border-sikoni-line rounded-lg p-2.5 bg-white"
                >
                  <option>Hibah Pemerintah Daerah (APBD Surakarta)</option>
                  <option>Bantuan Pembinaan Provinsi</option>
                  <option>Sponsor Mitra</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-sikoni-line">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-sikoni-teal text-white rounded-xl text-xs font-bold hover:bg-teal-700 shadow-md"
              >
                Lanjut ke Rincian Biaya →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: RINCIAN BIAYA */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy">Rincian Item Anggaran Biaya</h3>
                <p className="text-[11px] text-sikoni-muted">Pisahkan rincian volume, satuan, dan harga satuan riil</p>
              </div>
              <button
                onClick={addItem}
                className="bg-white border border-sikoni-line text-sikoni-navy px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1 shadow-sm"
              >
                <Plus size={14} /> Tambah Item
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-sikoni-line">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f7f9fb] border-b border-sikoni-line text-sikoni-muted font-bold">
                    <th className="py-2.5 px-3 w-12">No</th>
                    <th className="py-2.5 px-3">Uraian Biaya</th>
                    <th className="py-2.5 px-3 w-24">Volume</th>
                    <th className="py-2.5 px-3 w-28">Satuan</th>
                    <th className="py-2.5 px-3 w-36">Harga Satuan</th>
                    <th className="py-2.5 px-3 w-36">Jumlah</th>
                    <th className="py-2.5 px-3 w-12 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sikoni-line bg-white">
                  {items.map((it, idx) => (
                    <tr key={it.id}>
                      <td className="py-2.5 px-3 text-sikoni-muted">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={it.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItems(items.map((i) => (i.id === it.id ? { ...i, description: val } : i)));
                          }}
                          className="w-full border border-slate-200 focus:border-sikoni-teal rounded px-2 py-1"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="number"
                          value={it.volume}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setItems(items.map((i) => (i.id === it.id ? { ...i, volume: val } : i)));
                          }}
                          className="w-full border border-slate-200 focus:border-sikoni-teal rounded px-2 py-1 text-center"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={it.unit}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItems(items.map((i) => (i.id === it.id ? { ...i, unit: val } : i)));
                          }}
                          className="w-full border border-slate-200 focus:border-sikoni-teal rounded px-2 py-1"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="number"
                          value={it.unitPrice}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setItems(items.map((i) => (i.id === it.id ? { ...i, unitPrice: val } : i)));
                          }}
                          className="w-full border border-slate-200 focus:border-sikoni-teal rounded px-2 py-1"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold text-sikoni-navy">
                        {MoneyMath.formatRupiah(it.volume * it.unitPrice)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => removeItem(it.id)}
                          className="text-slate-400 hover:text-sikoni-red transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Subtotal Banner */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gradient-to-r from-[#142a43] via-[#1b3a5c] to-[#142a43] p-5 rounded-2xl border border-sikoni-navy/20 shadow-md text-white">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sikoni-gold block">TOTAL RENCANA ANGGARAN BIAYA</span>
                <span className="text-[11px] text-slate-300">Dihitung otomatis berdasarkan volume × harga satuan</span>
              </div>
              <b className="text-2xl font-black tracking-tight text-white">{MoneyMath.formatRupiah(totalAmount)}</b>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-sikoni-line">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl border border-sikoni-line text-xs font-bold text-sikoni-navy hover:bg-slate-50"
              >
                ← Kembali ke Informasi
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-sikoni-teal text-white rounded-xl text-xs font-bold hover:bg-teal-700 shadow-md"
              >
                Lanjut ke Dokumen & Kirim →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DOKUMEN & KIRIM */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-sikoni-navy">Dokumen Pendukung & Finalisasi</h3>

            <div className="border-2 border-dashed border-sikoni-line rounded-2xl p-6 text-center bg-slate-50 space-y-2">
              <UploadCloud size={32} className="mx-auto text-sikoni-teal" />
              <div className="font-bold text-sikoni-navy">Unggah Proposal Kegiatan & Surat Rekomendasi</div>
              <p className="text-[11px] text-sikoni-muted max-w-sm mx-auto">
                Format file didukung: PDF (Maksimal 10 MB). Berkas akan disimpan pada private S3 storage dengan enkripsi.
              </p>
              <button
                type="button"
                onClick={() => {
                  setUploadedFiles([...uploadedFiles, `Lampiran_Pendukung_${uploadedFiles.length + 1}.pdf (1.5 MB)`]);
                  showToast('Lampiran dokumen berhasil diunggah.');
                }}
                className="px-4 py-2 bg-white border border-sikoni-line rounded-lg font-bold text-sikoni-navy hover:bg-slate-100 shadow-sm"
              >
                ＋ Tambah Dokumen Lampiran
              </button>

              {/* Uploaded File List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200 text-left max-w-md mx-auto space-y-1.5">
                  <span className="text-[10px] font-bold text-sikoni-muted uppercase">Berkas Terunggah:</span>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg border border-sikoni-line text-xs">
                      <div className="flex items-center gap-2 text-sikoni-navy">
                        <FileText size={14} className="text-sikoni-teal" />
                        <span>{file}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-sikoni-red"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Review Sub-boxes */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sikoni-navy block">Ringkasan Rencana Pengajuan:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-white to-slate-50/80 border-l-4 border-l-sikoni-teal border-t border-r border-b border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Kegiatan</span>
                  <b className="text-xs text-sikoni-navy font-bold line-clamp-1">{formData.name}</b>
                </div>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-white to-slate-50/80 border-l-4 border-l-sikoni-navy border-t border-r border-b border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Cabor Pemohon</span>
                  <b className="text-xs text-sikoni-navy font-bold">{formData.cabor}</b>
                </div>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-white to-slate-50/80 border-l-4 border-l-sikoni-gold border-t border-r border-b border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Jadwal Pelaksanaan</span>
                  <b className="text-xs text-sikoni-navy font-bold">{formData.period}</b>
                </div>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-white to-teal-50/40 border-l-4 border-l-[#23846d] border-t border-r border-b border-slate-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase block">Total Nilai Usulan</span>
                  <b className="text-sm text-sikoni-teal font-black">{MoneyMath.formatRupiah(totalAmount)}</b>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-sikoni-line">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-xl border border-sikoni-line text-xs font-bold text-sikoni-navy hover:bg-slate-50"
              >
                ← Kembali ke Biaya
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 rounded-xl border border-sikoni-line text-xs font-bold text-sikoni-navy hover:bg-slate-50"
                >
                  Cetak Lembar RAB
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Draf formulir RAB berhasil disimpan secara lokal.')}
                  className="px-4 py-2.5 rounded-xl border border-sikoni-line text-xs font-bold text-sikoni-navy hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Save size={15} /> Simpan Draft
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="px-6 py-2.5 bg-sikoni-teal text-white rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-md"
                >
                  <Send size={15} /> Kirim untuk Verifikasi →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-extrabold text-sikoni-navy">Kirim Usulan RAB?</h3>
            <p className="text-xs text-sikoni-muted leading-relaxed">
              Pengajuan senilai <b>{MoneyMath.formatRupiah(totalAmount)}</b> akan masuk ke antrean verifikasi Bendahara & Pimpinan. Anda tidak dapat mengubah data secara sepihak setelah proses berjalan.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-sikoni-line">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-sikoni-teal text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Konfirmasi & Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-bounce">
          <Check size={18} className="text-sikoni-green" />
          <span className="text-xs font-bold">RAB berhasil diajukan! Mengalihkan ke daftar...</span>
        </div>
      )}

      {/* General Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-fade-in text-xs font-bold">
          <Check size={16} className="text-sikoni-green" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
