'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Clock, CheckCircle2, RotateCcw, Timer, Check, X, Edit3 } from 'lucide-react';

export default function ApprovalsPage() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [approvalInbox, setApprovalInbox] = useState([
    {
      id: '1',
      number: 'RAB-026/VI/26',
      activity: 'Kejuaraan Atletik Kota',
      applicant: 'PASI',
      myStage: 'Verifikasi Bendahara',
      amount: 'Rp 48,5 jt',
      date: '09 Nov 2026',
    },
    {
      id: '2',
      number: 'LPJ-014/X/26',
      activity: 'Pemusatan Latihan Kejurda',
      applicant: 'PBSI',
      myStage: 'Pemeriksaan LPJ',
      amount: 'Rp 31,8 jt',
      date: '08 Nov 2026',
    },
    {
      id: '3',
      number: 'EXP-1126',
      activity: 'Transportasi atlet & ofisial',
      applicant: 'PASI',
      myStage: 'Verifikasi Bukti Nota',
      amount: 'Rp 4,5 jt',
      date: '08 Nov 2026',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDecision = (decision: 'APPROVE' | 'REVISION') => {
    if (!selectedItem) return;

    setApprovalInbox(approvalInbox.filter((it) => it.id !== selectedItem.id));

    if (decision === 'APPROVE') {
      showToast(`Berkas ${selectedItem.number} berhasil disetujui!`);
    } else {
      showToast(`Berkas ${selectedItem.number} telah dikembalikan ke pemohon untuk revisi.`);
    }

    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Operasional / Persetujuan</div>
        <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Persetujuan</h1>
        <p className="text-xs text-sikoni-muted mt-0.5">
          Daftar tugas verifikasi dan persetujuan bertingkat sesuai kewenangan akun yang sedang aktif.
        </p>
      </div>

      <div className="p-3 bg-[#e8f5f4] text-sikoni-teal rounded-xl text-xs border border-teal-200">
        Integritas Approval: Persetujuan hanya dapat dilakukan oleh pejabat yang berwenang pada tahapan aktif. Pembuat transaksi tidak dapat menjadi approver untuk pengajuannya sendiri.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Menunggu Aksi Saya"
          value={approvalInbox.length.toString().padStart(2, '0')}
          foot="Tugas approval aktif"
          icon={<Clock size={18} />}
        />
        <KpiCard label="Disetujui Bulan Ini" value="24" foot="Seluruh tahapan selesai" icon={<CheckCircle2 size={18} />} />
        <KpiCard label="Dikembalikan" value="03" foot="Perlu perbaikan cabor" icon={<RotateCcw size={18} />} />
        <KpiCard label="Rata-rata Waktu Proses" value="2,4 Hari" foot="Kecepatan verifikasi" icon={<Timer size={18} />} />
      </div>

      <DataTable
        title="Inbox Persetujuan Menunggu Tindakan"
        subtitle="Pilih pengajuan untuk menelaah dokumen, rincian biaya, dan riwayat revisi"
        columns={[
          { header: 'Nomor Berkas', accessor: 'number' },
          { header: 'Kegiatan', accessor: 'activity' },
          { header: 'Pemohon / Cabor', accessor: 'applicant' },
          { header: 'Tahapan Saat Ini', accessor: 'myStage' },
          { header: 'Nilai Pengajuan', accessor: 'amount' },
          { header: 'Tanggal Masuk', accessor: 'date' },
          {
            header: 'Aksi',
            accessor: (row) => (
              <button
                onClick={() => setSelectedItem(row)}
                className="bg-sikoni-navy text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Review Berkas
              </button>
            ),
          },
        ]}
        data={approvalInbox}
      />

      {/* Decision Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal bg-teal-50 px-2 py-0.5 rounded">
                  {selectedItem.myStage}
                </span>
                <h3 className="text-base font-extrabold text-sikoni-navy mt-1">{selectedItem.number}</h3>
                <p className="text-xs text-sikoni-muted">{selectedItem.activity} • {selectedItem.applicant}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-sikoni-muted block">Nilai Diajukan</span>
                <b className="text-lg text-sikoni-navy">{selectedItem.amount}</b>
              </div>
            </div>

            <div className="border border-sikoni-line rounded-xl p-3 bg-slate-50 text-xs space-y-2">
              <div className="font-bold text-sikoni-navy">Catatan Pemeriksaan Verifikator:</div>
              <p className="text-sikoni-muted leading-relaxed">
                Berkas usulan telah memenuhi kelengkapan administrasi awal. Sisa alokasi pagu {selectedItem.applicant} mencukupi untuk pembiayaan kegiatan ini.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-sikoni-navy block mb-1">Catatan Keputusan</label>
              <textarea
                placeholder="Tuliskan catatan persetujuan atau poin kekurangan jika mengembalikan revisi..."
                rows={3}
                className="w-full text-xs border border-sikoni-line rounded-xl p-2.5 focus:outline-none focus:border-sikoni-teal"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-sikoni-line">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-3.5 py-2 text-xs font-bold text-sikoni-muted hover:text-sikoni-navy"
              >
                Tutup
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDecision('REVISION')}
                  className="px-3 py-2 bg-amber-50 text-sikoni-amber rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Edit3 size={14} /> Minta Revisi
                </button>
                <button
                  onClick={() => handleDecision('APPROVE')}
                  className="px-4 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <Check size={14} /> Setujui Berkas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check size={18} className="text-sikoni-green" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
