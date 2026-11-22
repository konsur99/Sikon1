'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import { Percent, CheckCircle2, Clock, FileCheck, Plus, X, Download, Check, Calculator } from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';
import { MoneyMath } from '@sikoni/shared';

export default function TaxPage() {
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [taxTransactions, setTaxTransactions] = useState([
    {
      reference: 'EXP-1108',
      type: 'PPh 23 (Sewa Venue - NPWP 2%)',
      taxableBase: 'Rp 12.000.000',
      taxAmount: 'Rp 240.000',
      ntpn: 'NTPN: 994821A8829C',
      date: '06 Nov 2026',
      status: 'Dibayar',
    },
    {
      reference: 'EXP-1097',
      type: 'PPN 11% (Faktur Pajak Peralatan Tanding)',
      taxableBase: 'Rp 25.000.000',
      taxAmount: 'Rp 2.750.000',
      ntpn: 'Billing: 821940182749',
      date: '03 Nov 2026',
      status: 'Menunggu',
    },
    {
      reference: 'EXP-1085',
      type: 'PPh 21 (Honor Wasit Ber-NPWP - 5%)',
      taxableBase: 'Rp 15.000.000',
      taxAmount: 'Rp 750.000',
      ntpn: 'NTPN: 772183B1093A',
      date: '01 Nov 2026',
      status: 'Dibayar',
    },
    {
      reference: 'EXP-1072',
      type: 'PPh 21 (Honor Narasumber PNS Gol IV - 15%)',
      taxableBase: 'Rp 6.000.000',
      taxAmount: 'Rp 900.000',
      ntpn: 'NTPN: 618293C4491D',
      date: '28 Okt 2026',
      status: 'Dibayar',
    },
    {
      reference: 'EXP-1065',
      type: 'PPh 21 (Honor Pelatih Non-NPWP - 6%)',
      taxableBase: 'Rp 8.000.000',
      taxAmount: 'Rp 480.000',
      ntpn: 'Billing: 739102839401',
      date: '25 Okt 2026',
      status: 'Menunggu',
    },
  ]);

  const [dppValue, setDppValue] = useState<number>(10000000);
  const [taxType, setTaxType] = useState('PPH21_NPWP');
  const [refNumber, setRefNumber] = useState('');
  const [billingCode, setBillingCode] = useState('');

  // Auto calculate tax rate according to official Indonesian DJP tax regulations
  const getTaxRate = (type: string) => {
    switch (type) {
      case 'PPH21_NPWP':
        return 0.05; // 5%
      case 'PPH21_NON_NPWP':
        return 0.06; // 6% (Tarif 20% lebih tinggi UU HPP)
      case 'PPH21_PNS4':
        return 0.15; // 15% Final PNS Golongan IV
      case 'PPH21_PNS3':
        return 0.05; // 5% Final PNS Golongan III
      case 'PPH23_NPWP':
        return 0.02; // 2% Jasa/Sewa dengan NPWP
      case 'PPH23_NON_NPWP':
        return 0.04; // 4% Jasa/Sewa non NPWP (Tarif 100% lebih tinggi)
      case 'PPN11':
        return 0.11; // 11% Faktur Pajak Standar
      case 'PPN12':
        return 0.12; // 12% Tarif DPP Baru
      default:
        return 0.05;
    }
  };

  const calculatedTaxAmount = Math.round(dppValue * getTaxRate(taxType));

  const handleSaveTax = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNumber) return;

    const typeLabels: Record<string, string> = {
      PPH21_NPWP: 'PPh 21 (Honor Wasit Ber-NPWP - 5%)',
      PPH21_NON_NPWP: 'PPh 21 (Honor Non-NPWP - 6%)',
      PPH21_PNS4: 'PPh 21 (Honor PNS Gol IV - 15%)',
      PPH21_PNS3: 'PPh 21 (Honor PNS Gol III - 5%)',
      PPH23_NPWP: 'PPh 23 (Sewa & Jasa NPWP - 2%)',
      PPH23_NON_NPWP: 'PPh 23 (Sewa & Jasa Non-NPWP - 4%)',
      PPN11: 'PPN 11% (Faktur Pajak)',
      PPN12: 'PPN 12% (Faktur Baru)',
    };

    const newRecord = {
      reference: refNumber,
      type: typeLabels[taxType] || 'PPh 21 (Honor - 5%)',
      taxableBase: MoneyMath.formatRupiah(dppValue),
      taxAmount: MoneyMath.formatRupiah(calculatedTaxAmount),
      ntpn: billingCode ? `Billing: ${billingCode}` : 'Billing Dalam Proses',
      date: '09 Nov 2026',
      status: 'Menunggu',
    };

    setTaxTransactions([newRecord, ...taxTransactions]);
    setShowModal(false);
    showToast(`Pemotongan pajak ${refNumber} sebesar ${newRecord.taxAmount} berhasil dicatat.`);
    setRefNumber('');
    setBillingCode('');
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

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              exportToCsv(
                'Rekap_Pajak_KONI_2026',
                ['Referensi Transaksi', 'Jenis Pajak', 'Dasar Pengenaan Pajak (DPP)', 'Nilai Pajak Terhitung', 'Tanggal', 'Status Setor'],
                taxTransactions.map((t) => [t.reference, t.type, t.taxableBase, t.taxAmount, t.date, t.status]),
              );
              showToast('Rekapitulasi transaksi perpajakan (CSV / Excel) berhasil diunduh.');
            }}
            className="bg-white border border-sikoni-line text-sikoni-ink px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-sikoni-teal text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> Catat Transaksi Pajak
          </button>
        </div>
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
        subtitle="Potongan pajak yang dikaitkan langsung dengan nomor pengeluaran / SPJ dan NTPN Kementerian Keuangan"
        columns={[
          { header: 'Referensi Transaksi', accessor: 'reference' },
          { header: 'Jenis Objek Pajak', accessor: 'type' },
          { header: 'Dasar Pengenaan Pajak', accessor: 'taxableBase' },
          { header: 'Nilai Pajak', accessor: 'taxAmount' },
          { header: 'NTPN / E-Billing', accessor: 'ntpn' },
          { header: 'Tanggal', accessor: 'date' },
          { header: 'Status Setor', accessor: 'status', isStatus: true },
        ]}
        data={taxTransactions}
      />

      {/* Record Tax Modal with Automatic Calculation */}
      {showModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl text-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-sikoni-teal grid place-items-center shadow-xs">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sikoni-navy">Kalkulator & Pencatatan Pajak Transaksi</h3>
                  <p className="text-[11px] text-sikoni-muted">Perhitungan otomatis standar DJP (PPh 21, PPh 23, PPN)</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTax} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nomor Pengeluaran / SPJ *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: EXP-1130"
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kode E-Billing / NTPN</label>
                  <input
                    type="text"
                    placeholder="Contoh: 821940182749"
                    value={billingCode}
                    onChange={(e) => setBillingCode(e.target.value)}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Jenis Objek Pajak (Peraturan DJP) *</label>
                <select
                  value={taxType}
                  onChange={(e) => setTaxType(e.target.value)}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                >
                  <option value="PPH21_NPWP">PPh 21 — Honor Wasit/Pelatih/Atlet (Ber-NPWP: 5%)</option>
                  <option value="PPH21_NON_NPWP">PPh 21 — Honor Non-NPWP (+20% UU HPP: 6%)</option>
                  <option value="PPH21_PNS4">PPh 21 Final — Honor Pejabat/PNS Gol IV (15%)</option>
                  <option value="PPH21_PNS3">PPh 21 Final — Honor ASN/PNS Gol III (5%)</option>
                  <option value="PPH23_NPWP">PPh 23 — Sewa Venue & Jasa EO (Ber-NPWP: 2%)</option>
                  <option value="PPH23_NON_NPWP">PPh 23 — Sewa Venue & Jasa Non-NPWP (4%)</option>
                  <option value="PPN11">PPN 11% — Faktur Pajak Standar UU Harmonisasi Perpajakan</option>
                  <option value="PPN12">PPN 12% — Tarif Baru DPP</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-sikoni-navy block mb-1">Dasar Pengenaan Pajak (DPP) Rp *</label>
                <input
                  type="number"
                  required
                  value={dppValue}
                  onChange={(e) => setDppValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all font-semibold"
                />
              </div>

              {/* Live Calculation Preview Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-50/60 via-white to-slate-50 border border-teal-200/70 shadow-xs space-y-1.5">
                <div className="flex justify-between items-center text-sikoni-muted text-[11px]">
                  <span className="font-medium">Tarif Pajak Berlaku:</span>
                  <b className="text-sikoni-navy font-bold">{(getTaxRate(taxType) * 100).toFixed(1)}%</b>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-teal-100">
                  <span className="font-bold text-sikoni-navy">Nilai Potongan Pajak Otomatis:</span>
                  <b className="text-base font-black text-sikoni-teal">{MoneyMath.formatRupiah(calculatedTaxAmount)}</b>
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
                  Simpan Transaksi Pajak
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
