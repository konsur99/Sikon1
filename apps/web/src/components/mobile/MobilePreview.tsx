'use client';

import React, { useState } from 'react';
import {
  Home,
  Coins,
  Send,
  Bell,
  User,
  Plus,
  ArrowUpRight,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  UploadCloud,
  ArrowRight,
  LogOut,
  ChevronRight,
  Shield,
  Percent,
  FileText,
  X,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const MobilePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'home' | 'finance' | 'submissions' | 'notifications' | 'account' | 'rab-form' | 'expense-form' | 'lpj'
  >('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMobileItem, setSelectedMobileItem] = useState<any | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 min-h-[calc(100vh-72px)] bg-[#e9edf1]">
      <div className="mb-3 text-xs font-bold text-sikoni-muted tracking-wider uppercase">
        Pratinjau Aplikasi Android (React Native Mobile)
      </div>

      {/* Android Device Mockup Frame */}
      <div className="w-[390px] h-[780px] bg-white rounded-[38px] shadow-2xl border-[10px] border-sikoni-navy flex flex-col overflow-hidden relative">
        {/* Mobile Top Header */}
        <div className="h-14 bg-white border-b border-sikoni-line px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sikoni-navy text-white font-extrabold grid place-items-center text-xs">
              SK
            </div>
            <span className="font-extrabold text-sm text-sikoni-navy tracking-wide">SIKONI</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-sikoni-muted bg-slate-100 px-2 py-0.5 rounded">
              PASI
            </span>
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative text-sikoni-muted hover:text-sikoni-navy"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-sikoni-red rounded-full" />
            </button>
          </div>
        </div>

        {/* Mobile Content Screen */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f4f6f9] space-y-4">
          {/* TAB: BERANDA */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-sikoni-muted">Selamat pagi, Operator Cabor</div>
                <h2 className="text-xl font-extrabold text-sikoni-navy tracking-tight">Ringkasan aktivitas</h2>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-sikoni-navy to-sikoni-navy2 text-white p-4 rounded-2xl shadow-md">
                <div className="text-[10px] tracking-wider text-slate-300 uppercase font-semibold">
                  Ringkasan Pengajuan Tahun 2026
                </div>
                <div className="text-2xl font-black mt-1">Rp 82.500.000</div>
                <div className="text-[11px] text-sikoni-gold mt-1 font-medium">
                  Total RAB disetujui • PASI Atletik
                </div>
              </div>

              {/* 4 Mini KPIs */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <div className="text-[10px] text-sikoni-muted font-medium">Pengajuan diproses</div>
                  <div className="text-lg font-bold text-sikoni-navy mt-1">03</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <div className="text-[10px] text-sikoni-muted font-medium">Perlu tindakan</div>
                  <div className="text-lg font-bold text-sikoni-amber mt-1">02</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <div className="text-[10px] text-sikoni-muted font-medium">Realisasi valid</div>
                  <div className="text-lg font-bold text-sikoni-green mt-1">Rp 48 jt</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <div className="text-[10px] text-sikoni-muted font-medium">LPJ disetujui</div>
                  <div className="text-lg font-bold text-sikoni-teal mt-1">04</div>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveTab('rab-form')}
                  className="bg-white p-2.5 rounded-xl border border-sikoni-line flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-sikoni-teal2 text-sikoni-teal grid place-items-center font-bold">
                    <Plus size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-sikoni-navy">Buat RAB</span>
                </button>

                <button
                  onClick={() => setActiveTab('expense-form')}
                  className="bg-white p-2.5 rounded-xl border border-sikoni-line flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-sikoni-gold2 text-sikoni-gold grid place-items-center font-bold">
                    <ArrowUpRight size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-sikoni-navy">Pengeluaran</span>
                </button>

                <button
                  onClick={() => setActiveTab('lpj')}
                  className="bg-white p-2.5 rounded-xl border border-sikoni-line flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center font-bold">
                    <FileCheck size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-sikoni-navy">LPJ</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className="bg-white p-2.5 rounded-xl border border-sikoni-line flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 grid place-items-center font-bold">
                    <Bell size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-sikoni-navy">Notifikasi</span>
                </button>
              </div>

              {/* Recent Activity List */}
              <div className="bg-white rounded-2xl border border-sikoni-line p-3.5 space-y-3">
                <div className="flex justify-between items-center">
                  <b className="text-xs text-sikoni-navy">Pengajuan terbaru</b>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-[10px] text-sikoni-teal font-bold"
                  >
                    Lihat semua
                  </button>
                </div>

                <div className="divide-y divide-sikoni-line text-xs">
                  <button
                    onClick={() =>
                      setSelectedMobileItem({
                        title: 'RAB Kejuaraan Atletik Kota',
                        sub: 'RAB-026 • 09 Nov 2026',
                        val: 'Rp 48,5 jt',
                        status: 'Menunggu',
                        desc: 'Pengajuan sedang berada pada antrean verifikasi teknis oleh Bendahara KONI.',
                      })
                    }
                    className="w-full text-left py-2 flex justify-between items-center hover:bg-slate-50 rounded px-1"
                  >
                    <div>
                      <b className="text-sikoni-navy block">RAB Kejuaraan Atletik Kota</b>
                      <small className="text-[10px] text-sikoni-muted">RAB-026 • 09 Nov 2026</small>
                    </div>
                    <div className="text-right">
                      <b className="text-sikoni-navy block">Rp 48,5 jt</b>
                      <StatusBadge status="Menunggu" />
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      setSelectedMobileItem({
                        title: 'Transportasi Atlet & Kontingen',
                        sub: 'EXP-1126 • 08 Nov 2026',
                        val: 'Rp 4,5 jt',
                        status: 'Verifikasi',
                        desc: 'Bukti nota bus pariwisata sedang diteliti oleh verifikator.',
                      })
                    }
                    className="w-full text-left py-2 flex justify-between items-center hover:bg-slate-50 rounded px-1"
                  >
                    <div>
                      <b className="text-sikoni-navy block">Transportasi Atlet</b>
                      <small className="text-[10px] text-sikoni-muted">EXP-1126 • 08 Nov 2026</small>
                    </div>
                    <div className="text-right">
                      <b className="text-sikoni-navy block">Rp 4,5 jt</b>
                      <StatusBadge status="Verifikasi" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: KEUANGAN */}
          {activeTab === 'finance' && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-sikoni-muted">Keuangan cabor</div>
                <h2 className="text-xl font-extrabold text-sikoni-navy">Ringkasan Keuangan</h2>
              </div>

              <div className="bg-sikoni-navy text-white p-4 rounded-2xl">
                <div className="text-[10px] text-slate-300">RAB DISETUJUI</div>
                <div className="text-2xl font-black mt-1">Rp 82.500.000</div>
                <div className="text-[11px] text-sikoni-gold mt-0.5">Tahun anggaran 2026 • PASI</div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <small className="text-[10px] text-sikoni-muted">Realisasi valid</small>
                  <b className="block text-base text-sikoni-navy mt-1">Rp 48 jt</b>
                </div>
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <small className="text-[10px] text-sikoni-muted">Sudah dibayar</small>
                  <b className="block text-base text-sikoni-green mt-1">Rp 40 jt</b>
                </div>
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <small className="text-[10px] text-sikoni-muted">Belum dibayar</small>
                  <b className="block text-base text-sikoni-amber mt-1">Rp 8 jt</b>
                </div>
                <div className="bg-white p-3 rounded-xl border border-sikoni-line">
                  <small className="text-[10px] text-sikoni-muted">Sisa alokasi*</small>
                  <b className="block text-base text-sikoni-teal mt-1">Rp 12 jt</b>
                </div>
              </div>

              {/* Modul Keuangan Quick Access matching Mockup mob-finance.png */}
              <div className="bg-white rounded-2xl border border-sikoni-line p-3 divide-y divide-sikoni-line text-xs">
                <b className="text-xs text-sikoni-navy block pb-2">Modul Keuangan Cabor</b>

                <button
                  onClick={() => showToast('Dana Masuk: Penerimaan kas cabor terpusat via transfer KONI')}
                  className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-teal-50 text-sikoni-teal grid place-items-center font-bold">＋</span>
                    <div>
                      <b className="text-sikoni-navy block">Dana Masuk</b>
                      <small className="text-[10px] text-sikoni-muted">Sumber dana & penerimaan</small>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>

                <button
                  onClick={() => setActiveTab('rab-form')}
                  className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 grid place-items-center font-bold">▤</span>
                    <div>
                      <b className="text-sikoni-navy block">Anggaran</b>
                      <small className="text-[10px] text-sikoni-muted">RAB dan alokasi kegiatan</small>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>

                <button
                  onClick={() => setActiveTab('expense-form')}
                  className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-sikoni-gold grid place-items-center font-bold">⇧</span>
                    <div>
                      <b className="text-sikoni-navy block">Realisasi</b>
                      <small className="text-[10px] text-sikoni-muted">Pengeluaran dan bukti transaksi</small>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>

                <button
                  onClick={() => showToast('Pajak: Pemotongan PPh/PPN diadministrasikan di tingkat bendahara KONI')}
                  className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 grid place-items-center font-bold">％</span>
                    <div>
                      <b className="text-sikoni-navy block">Pajak</b>
                      <small className="text-[10px] text-sikoni-muted">Rekap potongan dan bukti setor</small>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              </div>

              <div className="text-[10px] text-sikoni-muted italic">
                *Sisa alokasi pagu bukan merupakan saldo kas aktual.
              </div>
            </div>
          )}

          {/* TAB: PENGAJUAN */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Kelola dokumen kegiatan</div>
                  <h2 className="text-xl font-extrabold text-sikoni-navy">Pengajuan</h2>
                </div>
                <button
                  onClick={() => setActiveTab('rab-form')}
                  className="bg-sikoni-teal text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <Plus size={14} /> Baru
                </button>
              </div>

              {/* Submissions Shortcuts Bar */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab('rab-form')}
                  className="bg-white p-2 rounded-xl border border-sikoni-line text-center text-[10px] font-bold text-sikoni-navy"
                >
                  ＋ Buat RAB
                </button>
                <button
                  onClick={() => setActiveTab('expense-form')}
                  className="bg-white p-2 rounded-xl border border-sikoni-line text-center text-[10px] font-bold text-sikoni-navy"
                >
                  ⇧ Input Biaya
                </button>
                <button
                  onClick={() => setActiveTab('lpj')}
                  className="bg-white p-2 rounded-xl border border-sikoni-line text-center text-[10px] font-bold text-sikoni-navy"
                >
                  ▧ Buat LPJ
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-sikoni-line p-3 divide-y divide-sikoni-line">
                <button
                  onClick={() =>
                    setSelectedMobileItem({
                      title: 'Kejuaraan Atletik Kota',
                      sub: 'RAB-026 • 09 Nov 2026',
                      val: 'Rp 48,5 jt',
                      status: 'Menunggu',
                      desc: 'Usulan anggaran kejuaraan atletik pelajar se-Kota Surakarta.',
                    })
                  }
                  className="w-full text-left py-2.5 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <b className="text-xs text-sikoni-navy block">Kejuaraan Atletik Kota</b>
                    <small className="text-[10px] text-sikoni-muted">RAB-026 • 09 Nov 2026</small>
                  </div>
                  <div className="text-right">
                    <b className="text-xs text-sikoni-navy block">Rp 48,5 jt</b>
                    <StatusBadge status="Menunggu" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    setSelectedMobileItem({
                      title: 'Pemusatan Latihan Kejurda',
                      sub: 'RAB-021 • 28 Okt 2026',
                      val: 'Rp 32 jt',
                      status: 'Disetujui',
                      desc: 'Program latihan intensif atlet nomor lari dan lompat jauh.',
                    })
                  }
                  className="w-full text-left py-2.5 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <b className="text-xs text-sikoni-navy block">Pemusatan Latihan Kejurda</b>
                    <small className="text-[10px] text-sikoni-muted">RAB-021 • 28 Okt 2026</small>
                  </div>
                  <div className="text-right">
                    <b className="text-xs text-sikoni-navy block">Rp 32 jt</b>
                    <StatusBadge status="Disetujui" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    setSelectedMobileItem({
                      title: 'Transportasi Atlet & Ofisial',
                      sub: 'EXP-1126 • 08 Nov 2026',
                      val: 'Rp 4,5 jt',
                      status: 'Verifikasi',
                      desc: 'Kuitansi bus sewa kontingen atlet atletik.',
                    })
                  }
                  className="w-full text-left py-2.5 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <b className="text-xs text-sikoni-navy block">Transportasi Atlet</b>
                    <small className="text-[10px] text-sikoni-muted">EXP-1126 • 08 Nov 2026</small>
                  </div>
                  <div className="text-right">
                    <b className="text-xs text-sikoni-navy block">Rp 4,5 jt</b>
                    <StatusBadge status="Verifikasi" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    setSelectedMobileItem({
                      title: 'LPJ Kejuaraan Daerah Atletik',
                      sub: 'LPJ-013 • 04 Nov 2026',
                      val: 'Rp 42,1 jt',
                      status: 'Disetujui',
                      desc: 'Laporan pertanggungjawaban lengkap telah disahkan oleh tim verifikator.',
                    })
                  }
                  className="w-full text-left py-2.5 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <b className="text-xs text-sikoni-navy block">LPJ Kejuaraan Daerah</b>
                    <small className="text-[10px] text-sikoni-muted">LPJ-013 • 04 Nov 2026</small>
                  </div>
                  <div className="text-right">
                    <b className="text-xs text-sikoni-navy block">Rp 42,1 jt</b>
                    <StatusBadge status="Disetujui" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB: BUAT RAB (STEPPER WIZARD) */}
          {activeTab === 'rab-form' && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-sikoni-muted">Pengajuan anggaran kegiatan</div>
                <h2 className="text-xl font-extrabold text-sikoni-navy">Buat RAB</h2>
              </div>

              {/* Stepper Indicator */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sikoni-line text-xs font-bold text-sikoni-navy">
                <div className="flex items-center gap-1.5 text-sikoni-teal">
                  <span className="w-5 h-5 rounded-full bg-sikoni-teal text-white grid place-items-center text-[10px]">1</span>
                  <span>Info</span>
                </div>
                <div className="w-6 h-0.5 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-sikoni-muted">
                  <span className="w-5 h-5 rounded-full bg-slate-200 grid place-items-center text-[10px]">2</span>
                  <span>Biaya</span>
                </div>
                <div className="w-6 h-0.5 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-sikoni-muted">
                  <span className="w-5 h-5 rounded-full bg-slate-200 grid place-items-center text-[10px]">3</span>
                  <span>Kirim</span>
                </div>
              </div>

              {/* Step 1 Form */}
              <div className="bg-white p-4 rounded-2xl border border-sikoni-line space-y-3 text-xs">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nama Kegiatan *</label>
                  <input
                    type="text"
                    defaultValue="Kejuaraan Atletik Kota Surakarta"
                    className="w-full border border-sikoni-line rounded-lg p-2 focus:outline-sikoni-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Program</label>
                  <select className="w-full border border-sikoni-line rounded-lg p-2 bg-white">
                    <option>Pembinaan dan kompetisi atletik</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Periode Pelaksanaan</label>
                  <input
                    type="text"
                    defaultValue="20–22 November 2026"
                    className="w-full border border-sikoni-line rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Lokasi</label>
                  <input
                    type="text"
                    defaultValue="Stadion Sriwedari, Surakarta"
                    className="w-full border border-sikoni-line rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => showToast('Draft RAB tersimpan secara lokal di perangkat')}
                  className="flex-1 py-2.5 bg-white border border-sikoni-line rounded-xl text-xs font-bold text-sikoni-navy"
                >
                  Simpan Draft
                </button>
                <button
                  onClick={() => showToast('Melanjutkan ke rincian biaya')}
                  className="flex-1 py-2.5 bg-sikoni-teal text-white rounded-xl text-xs font-bold"
                >
                  Lanjut ke Biaya →
                </button>
              </div>
            </div>
          )}

          {/* TAB: INPUT PENGELUARAN */}
          {activeTab === 'expense-form' && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-sikoni-muted">Pencatatan realisasi kegiatan</div>
                <h2 className="text-xl font-extrabold text-sikoni-navy">Input Pengeluaran</h2>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sikoni-line space-y-3 text-xs">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kegiatan / RAB Terkait *</label>
                  <select className="w-full border border-sikoni-line rounded-lg p-2 bg-white">
                    <option>Kejuaraan Atletik Kota — RAB-026</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Tanggal Pengeluaran *</label>
                  <input
                    type="date"
                    defaultValue="2026-11-09"
                    className="w-full border border-sikoni-line rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Uraian Pengeluaran *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Konsumsi atlet dan ofisial"
                    defaultValue="Konsumsi atlet kejuaraan"
                    className="w-full border border-sikoni-line rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nilai Pengeluaran (Rp) *</label>
                  <input
                    type="number"
                    defaultValue="4500000"
                    className="w-full border border-sikoni-line rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Metode Pembayaran</label>
                  <select className="w-full border border-sikoni-line rounded-lg p-2 bg-white">
                    <option>Uang muka / Panjar</option>
                    <option>Reimbursement</option>
                    <option>Pembayaran langsung</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Bukti Transaksi *</label>
                  <button
                    type="button"
                    onClick={() => showToast('Foto nota berhasil dipilih dari galeri perangkat')}
                    className="w-full border border-dashed border-sikoni-line rounded-xl p-4 text-center text-sikoni-muted bg-slate-50 hover:bg-slate-100"
                  >
                    <UploadCloud size={24} className="mx-auto text-sikoni-teal mb-1" />
                    <span className="text-[10px]">Unggah foto nota / kuitansi / PDF</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => showToast('Draft pengeluaran tersimpan')}
                  className="flex-1 py-2.5 bg-white border border-sikoni-line rounded-xl text-xs font-bold text-sikoni-navy"
                >
                  Simpan Draft
                </button>
                <button
                  onClick={() => {
                    showToast('Pengeluaran berhasil dikirim untuk verifikasi');
                    setActiveTab('home');
                  }}
                  className="flex-1 py-2.5 bg-sikoni-teal text-white rounded-xl text-xs font-bold"
                >
                  Kirim Verifikasi
                </button>
              </div>
            </div>
          )}

          {/* TAB: LPJ */}
          {activeTab === 'lpj' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Pertanggungjawaban kegiatan</div>
                  <h2 className="text-xl font-extrabold text-sikoni-navy">LPJ</h2>
                </div>
                <button
                  onClick={() => showToast('Form pembuatan LPJ baru dibuka')}
                  className="bg-sikoni-teal text-white text-xs font-bold px-3 py-1 rounded-lg"
                >
                  ＋ Baru
                </button>
              </div>

              {/* LPJ Items */}
              <div className="bg-white rounded-2xl border border-sikoni-line p-3 divide-y divide-sikoni-line text-xs">
                <button
                  onClick={() =>
                    setSelectedMobileItem({
                      title: 'Pemusatan Latihan Kejurda',
                      sub: 'LPJ-014 • 08 Nov 2026',
                      val: 'Rp 31,8 jt',
                      status: 'Verifikasi',
                      desc: 'Dokumen LPJ dalam proses penelaahan kelengkapan berkas nota fisik.',
                    })
                  }
                  className="w-full text-left py-2 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <b className="text-sikoni-navy block">Pemusatan Latihan Kejurda</b>
                    <small className="text-[10px] text-sikoni-muted">LPJ-014 • 08 Nov 2026</small>
                  </div>
                  <div className="text-right">
                    <b className="text-sikoni-navy block">Rp 31,8 jt</b>
                    <StatusBadge status="Verifikasi" />
                  </div>
                </button>

                <button
                  onClick={() =>
                    setSelectedMobileItem({
                      title: 'Kejuaraan Daerah Atletik',
                      sub: 'LPJ-013 • 04 Nov 2026',
                      val: 'Rp 42,1 jt',
                      status: 'Disetujui',
                      desc: 'LPJ telah diverifikasi dan disetujui tuntas oleh pengurus KONI.',
                    })
                  }
                  className="w-full text-left py-2 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <b className="text-sikoni-navy block">Kejuaraan Daerah Atletik</b>
                    <small className="text-[10px] text-sikoni-muted">LPJ-013 • 04 Nov 2026</small>
                  </div>
                  <div className="text-right">
                    <b className="text-sikoni-navy block">Rp 42,1 jt</b>
                    <StatusBadge status="Disetujui" />
                  </div>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-sikoni-line p-3.5 space-y-3">
                <b className="text-xs text-sikoni-navy block">Checklist Kelengkapan Berkas LPJ</b>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-sikoni-line">
                    <span>1. Ringkasan & data kegiatan</span>
                    <span className="text-sikoni-green font-bold flex items-center gap-1">✓ Lengkap</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-sikoni-line">
                    <span>2. Realisasi vs RAB</span>
                    <span className="text-sikoni-green font-bold flex items-center gap-1">✓ Lengkap</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-sikoni-line">
                    <span>3. Bukti fisik pengeluaran</span>
                    <span className="text-sikoni-amber font-bold flex items-center gap-1">◷ 2 Belum valid</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-sikoni-line">
                    <span>4. Bukti bayar & transfer</span>
                    <span className="text-sikoni-amber font-bold flex items-center gap-1">◷ 1 Belum ada</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span>5. Dokumentasi foto kegiatan</span>
                    <span className="text-sikoni-green font-bold flex items-center gap-1">✓ Lengkap</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: NOTIFIKASI */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-sikoni-muted">Pembaruan sistem</div>
                <h2 className="text-xl font-extrabold text-sikoni-navy">Notifikasi</h2>
              </div>

              <div className="bg-white rounded-2xl border border-sikoni-line p-3 divide-y divide-sikoni-line text-xs">
                <button
                  onClick={() => showToast('Membuka rincian pengajuan RAB-026')}
                  className="w-full text-left py-2.5 hover:bg-slate-50"
                >
                  <b className="text-sikoni-navy block">RAB memerlukan verifikasi</b>
                  <p className="text-[10px] text-sikoni-muted mt-0.5">RAB-026 Kejuaraan Atletik telah diajukan • 09:12</p>
                </button>

                <button
                  onClick={() => showToast('Membuka rincian pengeluaran EXP-1126')}
                  className="w-full text-left py-2.5 hover:bg-slate-50"
                >
                  <b className="text-sikoni-navy block">Dokumen berhasil diunggah</b>
                  <p className="text-[10px] text-sikoni-muted mt-0.5">Lampiran bukti EXP-1126 berhasil tersimpan • 08:45</p>
                </button>

                <button
                  onClick={() => showToast('Membuka catatan koreksi LPJ-011')}
                  className="w-full text-left py-2.5 hover:bg-slate-50"
                >
                  <b className="text-sikoni-red block">LPJ dikembalikan untuk revisi</b>
                  <p className="text-[10px] text-sikoni-muted mt-0.5">Terdapat kuitansi belum bertanda tangan • Kemarin</p>
                </button>
              </div>
            </div>
          )}

          {/* TAB: AKUN */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sikoni-teal text-white font-bold grid place-items-center text-sm">
                  PS
                </div>
                <div>
                  <b className="text-sm text-sikoni-navy block">Operator PASI</b>
                  <small className="text-[11px] text-sikoni-muted">PASI — Cabang Olahraga Atletik</small>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-sikoni-line p-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-sikoni-line">
                  <span className="text-sikoni-muted">Email</span>
                  <b className="text-sikoni-navy">operator@pasi.demo</b>
                </div>
                <div className="flex justify-between py-1 border-b border-sikoni-line">
                  <span className="text-sikoni-muted">Hak Akses</span>
                  <b className="text-sikoni-navy">Operator Cabor</b>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-sikoni-muted">Cabang Olahraga</span>
                  <b className="text-sikoni-navy">PASI Surakarta</b>
                </div>
              </div>

              {/* Account Settings Menu Items matching Mockup mob-account.png */}
              <div className="bg-white rounded-2xl border border-sikoni-line p-2 divide-y divide-sikoni-line text-xs">
                <button
                  onClick={() => showToast('Membuka data profil akun operator')}
                  className="w-full py-2.5 px-2 flex items-center justify-between hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-sikoni-muted" />
                    <span className="font-semibold text-sikoni-navy">Data profil</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>

                <button
                  onClick={() => showToast('Preferensi notifikasi push')}
                  className="w-full py-2.5 px-2 flex items-center justify-between hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <Bell size={15} className="text-sikoni-muted" />
                    <span className="font-semibold text-sikoni-navy">Preferensi notifikasi</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>

                <button
                  onClick={() => showToast('Membuka panduan penggunaan SIKONI')}
                  className="w-full py-2.5 px-2 flex items-center justify-between hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={15} className="text-sikoni-muted" />
                    <span className="font-semibold text-sikoni-navy">Bantuan & panduan</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>

                <button
                  onClick={() => showToast('Pengaturan keamanan kata sandi')}
                  className="w-full py-2.5 px-2 flex items-center justify-between hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <Shield size={15} className="text-sikoni-muted" />
                    <span className="font-semibold text-sikoni-navy">Keamanan akun</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </button>
              </div>

              <button
                onClick={() => showToast('Sesi akun diakhiri')}
                className="w-full py-2.5 bg-rose-50 text-sikoni-red rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <LogOut size={14} /> Keluar dari Akun
              </button>
            </div>
          )}
        </div>

        {/* Selected Item Detail Popup */}
        {selectedMobileItem && (
          <div className="absolute inset-x-4 bottom-20 bg-white rounded-2xl p-4 shadow-2xl border border-sikoni-line z-50 animate-fade-in text-xs space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <b className="text-sikoni-navy text-sm block">{selectedMobileItem.title}</b>
                <small className="text-sikoni-muted">{selectedMobileItem.sub}</small>
              </div>
              <button
                onClick={() => setSelectedMobileItem(null)}
                className="text-slate-400 hover:text-sikoni-navy"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-sikoni-navy">{selectedMobileItem.val}</span>
              <StatusBadge status={selectedMobileItem.status} />
            </div>
            <p className="text-[11px] text-sikoni-muted pt-1 border-t border-sikoni-line">
              {selectedMobileItem.desc}
            </p>
          </div>
        )}

        {/* Mobile Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 bg-sikoni-navy text-white text-xs font-medium py-2 px-3 rounded-xl shadow-lg z-50 text-center">
            {toastMessage}
          </div>
        )}

        {/* Mobile 5-Tab Bottom Navigation */}
        <div className="h-16 bg-white border-t border-sikoni-line flex items-center justify-around flex-shrink-0 px-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'home' ? 'text-sikoni-navy font-bold' : 'text-sikoni-muted'
            }`}
          >
            <Home size={18} />
            <span className="text-[9px]">Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'finance' ? 'text-sikoni-navy font-bold' : 'text-sikoni-muted'
            }`}
          >
            <Coins size={18} />
            <span className="text-[9px]">Keuangan</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'submissions' || activeTab === 'rab-form' || activeTab === 'expense-form' || activeTab === 'lpj'
                ? 'text-sikoni-navy font-bold'
                : 'text-sikoni-muted'
            }`}
          >
            <Send size={18} />
            <span className="text-[9px]">Pengajuan</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'notifications' ? 'text-sikoni-navy font-bold' : 'text-sikoni-muted'
            }`}
          >
            <Bell size={18} />
            <span className="text-[9px]">Notifikasi</span>
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'account' ? 'text-sikoni-navy font-bold' : 'text-sikoni-muted'
            }`}
          >
            <User size={18} />
            <span className="text-[9px]">Akun</span>
          </button>
        </div>
      </div>
    </div>
  );
};
