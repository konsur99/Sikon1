'use client';

import React, { useState } from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { DataTable } from '../../../components/common/DataTable';
import {
  FileCheck2,
  Clock,
  RotateCcw,
  CheckCircle2,
  Plus,
  X,
  Eye,
  Check,
  Download,
  AlertCircle,
  FileText,
  Trash2,
  Sparkles,
  Calendar,
  Building,
  Award,
  Layers,
  Coins,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { exportToCsv } from '../../../lib/exportCsv';
import {
  generateLpjWordDocument,
  LpjDocumentData,
  LpjBudgetItem,
  formatRupiah,
} from '../../../lib/generateLpjWord';

export default function LpjPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [selectedLpj, setSelectedLpj] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // State Daftar LPJ di Sistem
  const [lpjList, setLpjList] = useState<any[]>([
    {
      number: 'LPJ-014/X/26',
      activity: 'Pemusatan Latihan Kejurda Bulutangkis',
      cabor: 'PBSI',
      totalRealization: 'Rp 31.800.000',
      budgetGrant: 32000000,
      submittedDate: '08 Nov 2026',
      status: 'Verifikasi',
    },
    {
      number: 'LPJ-013/X/26',
      activity: 'Kejuaraan Daerah Atletik Pelajar',
      cabor: 'PASI',
      totalRealization: 'Rp 42.100.000',
      budgetGrant: 45000000,
      submittedDate: '04 Nov 2026',
      status: 'Disetujui',
    },
    {
      number: 'LPJ-012/IX/26',
      activity: 'Liga Internal Sepak Bola Usia Dini',
      cabor: 'PSSI',
      totalRealization: 'Rp 27.500.000',
      budgetGrant: 28000000,
      submittedDate: '02 Nov 2026',
      status: 'Ditolak',
    },
  ]);

  // State Formulir Kolom-Kolom Isian LPJ
  const [formData, setFormData] = useState<LpjDocumentData>({
    number: 'LPJ-015/XI/KONI/2026',
    activity: 'Kejuaraan Daerah Atletik Pelajar Surakarta 2026',
    cabor: 'Persatuan Atletik Seluruh Indonesia (PASI)',
    caborCode: 'PASI',
    skNumber: 'SK-042/KONI-SKA/VIII/2026',
    budgetGrant: 45000000,
    period: '12 – 15 November 2026',
    location: 'Stadion Sriwedari, Surakarta',
    targetParticipants: '180 Atlet, 24 Pelatih/Ofisial, dan 16 Wasit Berlisensi',
    achievements:
      'Meraih Juara Umum II dengan perolehan 8 Medali Emas, 5 Medali Perak, dan 6 Medali Perunggu serta memecahkan 2 Rekor Daerah lari 100m dan estafet 4x100m.',
    background:
      'Puji dan syukur kami panjatkan ke hadirat Tuhan Yang Maha Esa atas terlaksananya kegiatan Kejuaraan Daerah Atletik Pelajar Surakarta 2026. Laporan Pertanggungjawaban (LPJ) ini kami susun sebagai bentuk transparansi, akuntabilitas, dan kepatuhan administrasi atas pemanfaatan dana bantuan hibah olahraga dari Pemerintah Kota Surakarta melalui KONI Kota Surakarta.',
    closingNotes:
      'Demikian Laporan Pertanggungjawaban ini dibuat dengan sebenarnya dan penuh rasa tanggung jawab. Seluruh bukti asli kuitansi pengeluaran, faktur pajak, daftar presensi, dan foto dokumentasi kegiatan terlampir lengkap sebagai kesatuan utuh dokumen LPJ.',
    leaderName: 'Dr. Bambang Setiawan, M.Pd.',
    secretaryName: 'Wahyu Hidayat, S.Or.',
    treasurerName: 'Siti Aminah, S.E.',
    koniLeaderName: 'Drs. H. Sri Nugroho, M.Si.',
    cityDate: 'Surakarta, 10 November 2026',
    items: [
      {
        id: 1,
        item: 'Sewa lintasan sintetis & venue Stadion Sriwedari',
        proofNumber: 'KWT-01/SRI/XI/26',
        volume: 3,
        unit: 'Hari',
        unitPrice: 3500000,
      },
      {
        id: 2,
        item: 'Konsumsi atlet, pelatih, & ofisial pertandingan',
        proofNumber: 'NOTA-112/KTR/26',
        volume: 180,
        unit: 'Paket',
        unitPrice: 45000,
      },
      {
        id: 3,
        item: 'Honorarium wasit & juri berlisensi nasional',
        proofNumber: 'KWT-WST/PASI/26',
        volume: 16,
        unit: 'Orang/Hari',
        unitPrice: 400000,
      },
      {
        id: 4,
        item: 'Medali kejuaraan (Emas, Perak, Perunggu) & Trofi',
        proofNumber: 'INV-441/MDL/26',
        volume: 1,
        unit: 'Paket',
        unitPrice: 6500000,
      },
      {
        id: 5,
        item: 'Nomor dada tanding & perlengkapan teknis lomba',
        proofNumber: 'NOTA-89/ALAT/26',
        volume: 1,
        unit: 'Paket',
        unitPrice: 4200000,
      },
      {
        id: 6,
        item: 'Layanan medis, P3K, & ambulans siaga lapangan',
        proofNumber: 'KWT-MED/PMI/26',
        volume: 3,
        unit: 'Hari',
        unitPrice: 1500000,
      },
      {
        id: 7,
        item: 'Dokumentasi, publikasi, & spanduk kejuaraan',
        proofNumber: 'NOTA-31/PRT/26',
        volume: 1,
        unit: 'Paket',
        unitPrice: 2200000,
      },
    ],
  });

  // Kalkulasi Otomatis Saldo Belanja
  const totalRealization = formData.items.reduce((sum, it) => sum + it.volume * it.unitPrice, 0);
  const remainingBudget = formData.budgetGrant - totalRealization;

  // Tambah Baris Belanja
  const handleAddBudgetItem = () => {
    const nextId = formData.items.length ? Math.max(...formData.items.map((i) => i.id)) + 1 : 1;
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: nextId,
          item: 'Uraian belanja baru',
          proofNumber: `KWT-${nextId}/XI/26`,
          volume: 1,
          unit: 'Paket',
          unitPrice: 1000000,
        },
      ],
    });
  };

  // Hapus Baris Belanja
  const handleRemoveBudgetItem = (id: number) => {
    if (formData.items.length <= 1) {
      showToast('Minimal harus ada 1 baris rincian belanja dalam LPJ.');
      return;
    }
    setFormData({
      ...formData,
      items: formData.items.filter((it) => it.id !== id),
    });
  };

  // Muat Preset Template Contoh
  const handleLoadSample = (type: 'kejurda' | 'tc') => {
    if (type === 'kejurda') {
      setFormData({
        ...formData,
        activity: 'Kejuaraan Kota Bulutangkis Piala KONI 2026',
        cabor: 'Persatuan Bulutangkis Seluruh Indonesia (PBSI)',
        caborCode: 'PBSI',
        budgetGrant: 35000000,
        location: 'GOR Manahan, Surakarta',
        targetParticipants: '96 Atlet Usia Dini & Remaja',
        achievements: 'Meloloskan 12 atlet ke pemusatan latihan daerah (Puslatda) tingkat provinsi.',
        items: [
          { id: 1, item: 'Sewa lapangan karpet GOR Manahan (4 court)', proofNumber: 'KWT-GOR/PBSI/01', volume: 3, unit: 'Hari', unitPrice: 3000000 },
          { id: 2, item: 'Shuttlecock standar turnamen PBSI (Slazenger)', proofNumber: 'NOTA-SC/881', volume: 40, unit: 'Slop', unitPrice: 325000 },
          { id: 3, item: 'Honorarium referee & wasit terakreditasi', proofNumber: 'KWT-REF/PBSI/03', volume: 8, unit: 'Orang', unitPrice: 600000 },
          { id: 4, item: 'Konsumsi panitia, atlet, & tim medis', proofNumber: 'NOTA-KTR/PBSI/04', volume: 150, unit: 'Box', unitPrice: 35000 },
          { id: 5, item: 'Trofi juara & piagam penghargaan resmi', proofNumber: 'INV-TRF/PBSI/05', volume: 1, unit: 'Paket', unitPrice: 4200000 },
        ],
      });
      showToast('Contoh template Kejuaraan Bulutangkis berhasil dimuat.');
    } else {
      setFormData({
        ...formData,
        activity: 'Pemusatan Latihan Terpadu Atlet Panahan Porprov 2026',
        cabor: 'Persatuan Panahan Indonesia (PERPANI)',
        caborCode: 'PERPANI',
        budgetGrant: 28000000,
        location: 'Lapangan Panahan Manahan, Surakarta',
        targetParticipants: '14 Atlet Unggulan & 3 Pelatih Kepala',
        achievements: 'Peningkatan rata-rata skor akurasi jarak 50m dan 70m sebesar 14.8%.',
        items: [
          { id: 1, item: 'Bantalan target tanding & kertas target FITA', proofNumber: 'INV-TGT/01', volume: 12, unit: 'Set', unitPrice: 850000 },
          { id: 2, item: 'Anak panah karbon kompetisi (Easton X10)', proofNumber: 'NOTA-ARR/02', volume: 3, unit: 'Lusin', unitPrice: 2800000 },
          { id: 3, item: 'Uang saku latihan & nutrisi tambahan atlet TC', proofNumber: 'KWT-NS/03', volume: 14, unit: 'Atlet', unitPrice: 500000 },
          { id: 4, item: 'Honorarium pelatih kepala & asisten pelatih', proofNumber: 'KWT-PLT/04', volume: 3, unit: 'Orang', unitPrice: 1800000 },
        ],
      });
      showToast('Contoh template Pemusatan Latihan Panahan berhasil dimuat.');
    }
  };

  // Tombol Selesai: Generate Word & Tambah ke Riwayat
  const handleFinishAndGenerateWord = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.activity.trim()) {
      showToast('Harap isi Nama Kegiatan terlebih dahulu.');
      return;
    }

    // 1. Generate & Unduh File Word (.doc / .docx)
    generateLpjWordDocument(formData);

    // 2. Simpan ke Daftar Dokumen LPJ di Sistem
    const existingIndex = lpjList.findIndex((l) => l.number === formData.number);
    const newEntry = {
      number: formData.number,
      activity: formData.activity,
      cabor: formData.caborCode,
      totalRealization: formatRupiah(totalRealization),
      budgetGrant: formData.budgetGrant,
      submittedDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Verifikasi',
    };

    if (existingIndex >= 0) {
      const updated = [...lpjList];
      updated[existingIndex] = newEntry;
      setLpjList(updated);
    } else {
      setLpjList([newEntry, ...lpjList]);
    }

    showToast(`Dokumen LPJ "${formData.activity}" berhasil di-generate menjadi Word (.doc) dan diunduh!`);
  };

  // Unduh Word dari Baris Tabel Riwayat
  const handleDownloadWordFromRow = (row: any) => {
    const docData: LpjDocumentData = {
      number: row.number,
      activity: row.activity,
      cabor: row.cabor === 'PASI' ? 'Persatuan Atletik Seluruh Indonesia' : row.cabor === 'PBSI' ? 'Persatuan Bulutangkis Seluruh Indonesia' : 'Pengurus Cabang Olahraga',
      caborCode: row.cabor,
      skNumber: 'SK-028/KONI-SKA/X/2026',
      budgetGrant: row.budgetGrant || 40000000,
      period: 'Semester II 2026',
      location: 'Kompleks Stadion Manahan, Surakarta',
      targetParticipants: 'Atlet & Pelatih Kontingen Surakarta',
      achievements: 'Pelaksanaan kegiatan sesuai dengan target pembinaan prestasi tahun 2026.',
      background: 'Laporan Pertanggungjawaban ini disusun sesuai dengan ketentuan pemanfaatan dana hibah olahraga Pemerintah Kota Surakarta.',
      closingNotes: 'Demikian laporan ini dibuat untuk dipergunakan sebagaimana mestinya.',
      leaderName: 'Ketua Pengkot ' + row.cabor,
      secretaryName: 'Sekretaris Pengkot',
      treasurerName: 'Bendahara Pengkot',
      koniLeaderName: 'Drs. H. Sri Nugroho, M.Si.',
      cityDate: 'Surakarta, ' + row.submittedDate,
      items: [
        { id: 1, item: 'Belanja operasional dan penyelenggaraan kegiatan', proofNumber: 'KWT-001/LPJ', volume: 1, unit: 'Paket', unitPrice: parseInt(row.totalRealization.replace(/[^0-9]/g, '')) || 30000000 },
      ],
    };
    generateLpjWordDocument(docData);
    showToast(`Mengunduh file Word untuk ${row.number}...`);
  };

  const handleUpdateLpjStatus = (number: string, newStatus: string) => {
    setLpjList(lpjList.map((l) => (l.number === number ? { ...l, status: newStatus } : l)));
    setSelectedLpj(null);
    showToast(`Status ${number} berhasil diperbarui menjadi ${newStatus}.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-sikoni-muted mb-1 flex items-center gap-1.5">
            <span>SIKONI</span>
            <span className="text-slate-300">/</span>
            <span>Operasional</span>
            <span className="text-slate-300">/</span>
            <span className="text-sikoni-teal font-bold">LPJ & Word Generator</span>
          </div>
          <h1 className="text-2xl font-black text-sikoni-navy tracking-tight flex items-center gap-2">
            Laporan Pertanggungjawaban (LPJ)
          </h1>
          <p className="text-xs text-sikoni-muted mt-0.5">
            Isi kolom-kolom data kegiatan & rincian belanja, lalu klik selesai untuk menghasilkan file Microsoft Word (.doc) yang rapi dan terstandarisasi.
          </p>
        </div>

        {/* Tab Switcher & Export */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/90 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-white text-sikoni-navy shadow-sm'
                  : 'text-slate-500 hover:text-sikoni-navy'
              }`}
            >
              <FileText size={14} className={activeTab === 'form' ? 'text-sikoni-teal' : ''} />
              Formulir Isian & Word
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-white text-sikoni-navy shadow-sm'
                  : 'text-slate-500 hover:text-sikoni-navy'
              }`}
            >
              <FileCheck2 size={14} className={activeTab === 'list' ? 'text-sikoni-teal' : ''} />
              Daftar Riwayat LPJ ({lpjList.length})
            </button>
          </div>

          <button
            onClick={() => {
              exportToCsv(
                'Rekap_LPJ_Kegiatan_2026',
                ['Nomor LPJ', 'Nama Kegiatan', 'Cabor', 'Total Realisasi', 'Tanggal Kirim', 'Status Pemeriksaan'],
                lpjList.map((l) => [l.number, l.activity, l.cabor, l.totalRealization, l.submittedDate, l.status]),
              );
              showToast('Rekapitulasi LPJ format CSV / Excel berhasil diunduh.');
            }}
            className="bg-white border border-slate-200 text-sikoni-ink px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      {/* 4 Ringkasan KPI Global */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="LPJ Keseluruhan" value="32 Dokumen" foot="Tahun anggaran 2026" icon={<FileCheck2 size={18} />} accentColor="navy" badge="Arsip" />
        <KpiCard label="Menunggu Verifikasi" value="05 Berkas" foot="Dalam antrean audit" icon={<Clock size={18} />} accentColor="amber" badge="Telaah" />
        <KpiCard label="Perlu Revisi" value="02 Berkas" foot="Catatan nota/kuitansi" icon={<RotateCcw size={18} />} accentColor="amber" badge="Revisi" />
        <KpiCard label="Disetujui Final" value="25 Dokumen" foot="78,1% telah disahkan" icon={<CheckCircle2 size={18} />} accentColor="green" badge="Tuntas" />
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FORMULIR KOLOM-KOLOM ISIAN LPJ DENGAN AUTO GENERATE FILE WORD       */}
      {/* ========================================================================= */}
      {activeTab === 'form' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Banner Informasi & Pilihan Muat Contoh */}
          <div className="card-sikoni relative overflow-hidden p-4 bg-gradient-to-r from-teal-50/70 via-white to-amber-50/50 border border-teal-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sikoni-teal text-white grid place-items-center shadow-md flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <b className="text-xs text-sikoni-navy block font-extrabold uppercase tracking-wider">
                  Generator Resmi Laporan Pertanggungjawaban (LPJ) SIKONI
                </b>
                <p className="text-[11.5px] text-slate-600 mt-0.5">
                  Isikan seluruh kolom di bawah ini. Saat Anda menekan tombol <b>"Selesai & Generate File Word LPJ"</b>, sistem otomatis menyusun dan mengunduh berkas Word (.doc) berformat formal A4 lengkap dengan kop surat dan tanda tangan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-bold text-slate-500">Muat Contoh:</span>
              <button
                type="button"
                onClick={() => handleLoadSample('kejurda')}
                className="bg-white border border-slate-200/90 text-sikoni-navy hover:border-sikoni-teal px-2.5 py-1.5 rounded-lg text-[11px] font-bold shadow-xs hover:bg-slate-50 transition-all"
              >
                🏸 Kejuaraan
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('tc')}
                className="bg-white border border-slate-200/90 text-sikoni-navy hover:border-sikoni-teal px-2.5 py-1.5 rounded-lg text-[11px] font-bold shadow-xs hover:bg-slate-50 transition-all"
              >
                🎯 Latihan (TC)
              </button>
            </div>
          </div>

          <form onSubmit={handleFinishAndGenerateWord} className="space-y-6">
            {/* BLOK 1: IDENTITAS KEGIATAN & DANA HIBAH */}
            <div className="card-sikoni relative overflow-hidden space-y-4 p-5">
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-sikoni-teal grid place-items-center font-bold text-xs shadow-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-sikoni-navy">
                      Bagian I: Data Pokok Kegiatan & Dana Hibah
                    </h3>
                    <p className="text-[11px] text-sikoni-muted">Identitas resmi kegiatan cabang olahraga yang dipertanggungjawabkan</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                  Kop & Pembuka
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nomor Berkas LPJ *</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 font-semibold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-bold text-sikoni-navy block mb-1">Nama Resmi Kegiatan / Kejuaraan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kejuaraan Daerah Atletik Pelajar Surakarta 2026"
                    value={formData.activity}
                    onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 font-bold text-sikoni-navy"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Cabang Olahraga (Pengkot) *</label>
                  <select
                    value={formData.caborCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      const caborMap: Record<string, string> = {
                        PASI: 'Persatuan Atletik Seluruh Indonesia (PASI)',
                        PBSI: 'Persatuan Bulutangkis Seluruh Indonesia (PBSI)',
                        PSSI: 'Persatuan Sepakbola Seluruh Indonesia (PSSI)',
                        PRSI: 'Persatuan Renang Seluruh Indonesia (PRSI)',
                        PERPANI: 'Persatuan Panahan Indonesia (PERPANI)',
                        IPSI: 'Ikatan Pencak Silat Indonesia (IPSI)',
                        PBVSI: 'Persatuan Bola Voli Seluruh Indonesia (PBVSI)',
                      };
                      setFormData({
                        ...formData,
                        caborCode: code,
                        cabor: caborMap[code] || `Pengurus Kota ${code}`,
                      });
                    }}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 font-semibold"
                  >
                    <option value="PASI">PASI — Atletik</option>
                    <option value="PBSI">PBSI — Bulutangkis</option>
                    <option value="PSSI">PSSI — Sepak Bola</option>
                    <option value="PRSI">PRSI — Renang</option>
                    <option value="PERPANI">PERPANI — Panahan</option>
                    <option value="IPSI">IPSI — Pencak Silat</option>
                    <option value="PBVSI">PBVSI — Bola Voli</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nomor SK / Dasar Pelaksanaan *</label>
                  <input
                    type="text"
                    value={formData.skNumber}
                    onChange={(e) => setFormData({ ...formData, skNumber: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nilai Dana Hibah Diterima (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={formData.budgetGrant}
                    onChange={(e) => setFormData({ ...formData, budgetGrant: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 font-bold text-sikoni-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Waktu / Periode Pelaksanaan *</label>
                  <input
                    type="text"
                    placeholder="Contoh: 12 – 15 November 2026"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Tempat / Lokasi Venue *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Stadion Sriwedari, Surakarta"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Jumlah Partisipan (Atlet & Ofisial) *</label>
                  <input
                    type="text"
                    placeholder="Contoh: 180 Atlet & 24 Ofisial"
                    value={formData.targetParticipants}
                    onChange={(e) => setFormData({ ...formData, targetParticipants: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10"
                  />
                </div>
              </div>
            </div>

            {/* BLOK 2: LAPORAN NARASI & CAPAIAN PRESTASI */}
            <div className="card-sikoni relative overflow-hidden space-y-4 p-5">
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-sikoni-teal" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-sikoni-teal grid place-items-center font-bold text-xs shadow-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-sikoni-navy">
                      Bagian II: Narasi Pendahuluan, Prestasi & Evaluasi
                    </h3>
                    <p className="text-[11px] text-sikoni-muted">Teks bab laporan narasi pelaksanaan yang akan masuk ke Bab I, II, dan IV Word</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-sikoni-teal uppercase tracking-wider">
                  Narasi Teknis
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">
                    Narasi Bab I: Pendahuluan & Latar Belakang Kegiatan
                  </label>
                  <textarea
                    rows={2}
                    value={formData.background}
                    onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">
                    Narasi Bab II: Hasil Pelaksanaan & Capaian Prestasi yang Diraih *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="Sebutkan medali yang diperoleh, rekor yang dicapai, atau hasil seleksi atlet binaan..."
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 leading-relaxed font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">
                    Narasi Bab IV: Kesimpulan, Rekomendasi & Penutup Laporan
                  </label>
                  <textarea
                    rows={2}
                    value={formData.closingNotes}
                    onChange={(e) => setFormData({ ...formData, closingNotes: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* BLOK 3: TABEL KOLOM RINCIAN BELANJA & ANGGARAN REALISASI */}
            <div className="card-sikoni relative overflow-hidden space-y-4 p-5">
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-sikoni-gold" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-sikoni-gold grid place-items-center font-bold text-xs shadow-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-sikoni-navy">
                      Bagian III: Kolom Rincian Realisasi Anggaran (Bab III)
                    </h3>
                    <p className="text-[11px] text-sikoni-muted">Daftar item belanja riil berdasar bukti kuitansi dan nota bayar fisik</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBudgetItem}
                  className="bg-white border border-slate-200/90 hover:border-sikoni-teal text-sikoni-navy hover:bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all self-start sm:self-auto"
                >
                  <Plus size={14} className="text-sikoni-teal" /> Tambah Baris Belanja
                </button>
              </div>

              {/* Tabel Input Dinamis */}
              <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 via-[#f5f8fb] to-slate-50 border-b border-slate-200 text-sikoni-navy font-black text-[10.5px] uppercase tracking-wider">
                      <th className="py-3 px-3 w-10 text-center">No</th>
                      <th className="py-3 px-3 min-w-[220px]">Uraian Pengeluaran / Belanja</th>
                      <th className="py-3 px-3 min-w-[150px]">No. Bukti / Kuitansi</th>
                      <th className="py-3 px-3 w-20 text-center">Vol</th>
                      <th className="py-3 px-3 w-24">Satuan</th>
                      <th className="py-3 px-3 min-w-[130px] text-right">Harga Satuan (Rp)</th>
                      <th className="py-3 px-3 min-w-[140px] text-right">Jumlah Total (Rp)</th>
                      <th className="py-3 px-3 w-12 text-center">Hapus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {formData.items.map((it, idx) => (
                      <tr key={it.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            required
                            value={it.item}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({
                                ...formData,
                                items: formData.items.map((item) =>
                                  item.id === it.id ? { ...item, item: val } : item,
                                ),
                              });
                            }}
                            className="w-full bg-slate-50/40 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            placeholder="KWT-01/XI/26"
                            value={it.proofNumber}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({
                                ...formData,
                                items: formData.items.map((item) =>
                                  item.id === it.id ? { ...item, proofNumber: val } : item,
                                ),
                              });
                            }}
                            className="w-full bg-slate-50/40 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal font-mono text-[11px]"
                          />
                        </td>
                        <td className="py-2 px-3 text-center">
                          <input
                            type="number"
                            min="1"
                            value={it.volume}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setFormData({
                                ...formData,
                                items: formData.items.map((item) =>
                                  item.id === it.id ? { ...item, volume: val } : item,
                                ),
                              });
                            }}
                            className="w-16 bg-slate-50/40 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-center focus:bg-white focus:outline-none focus:border-sikoni-teal font-bold"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            placeholder="Hari/Pkt"
                            value={it.unit}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({
                                ...formData,
                                items: formData.items.map((item) =>
                                  item.id === it.id ? { ...item, unit: val } : item,
                                ),
                              });
                            }}
                            className="w-full bg-slate-50/40 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal"
                          />
                        </td>
                        <td className="py-2 px-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={it.unitPrice}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setFormData({
                                ...formData,
                                items: formData.items.map((item) =>
                                  item.id === it.id ? { ...item, unitPrice: val } : item,
                                ),
                              });
                            }}
                            className="w-full bg-slate-50/40 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-right focus:bg-white focus:outline-none focus:border-sikoni-teal font-semibold"
                          />
                        </td>
                        <td className="py-2 px-3 text-right font-black text-sikoni-navy text-xs">
                          {formatRupiah(it.volume * it.unitPrice)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveBudgetItem(it.id)}
                            className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                            title="Hapus baris ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Rekapitulasi Kasda Sub-Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/90 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">1. Total Penerimaan Hibah</span>
                  <b className="text-base font-black text-sikoni-navy mt-1 block">{formatRupiah(formData.budgetGrant)}</b>
                  <span className="text-[10px] text-slate-400">Pagu anggaran disetujui</span>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-br from-teal-50/50 via-white to-slate-50 border border-teal-200/80 shadow-xs">
                  <span className="text-[10px] font-bold text-sikoni-teal uppercase block">2. Total Realisasi Belanja</span>
                  <b className="text-base font-black text-sikoni-teal mt-1 block">{formatRupiah(totalRealization)}</b>
                  <span className="text-[10px] text-slate-500">{formData.items.length} item pengeluaran terdata</span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border shadow-xs ${
                    remainingBudget >= 0
                      ? 'bg-gradient-to-br from-emerald-50/60 to-white border-emerald-200/80'
                      : 'bg-gradient-to-br from-rose-50/60 to-white border-rose-200/80'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase block ${
                      remainingBudget >= 0 ? 'text-emerald-800' : 'text-rose-800'
                    }`}
                  >
                    3. Sisa Saldo Dana Kasda
                  </span>
                  <b
                    className={`text-base font-black mt-1 block ${
                      remainingBudget >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {formatRupiah(Math.abs(remainingBudget))}
                  </b>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {remainingBudget > 0
                      ? 'Sisa lebih wajib disetor ke kas KONI'
                      : remainingBudget === 0
                      ? 'Saldo Nihil / Terserap 100% sempurna'
                      : 'Defisit ditanggung mandiri cabor'}
                  </span>
                </div>
              </div>
            </div>

            {/* BLOK 4: LEMBAR PENGESAHAN & PENANDATANGAN */}
            <div className="card-sikoni relative overflow-hidden space-y-4 p-5">
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-sikoni-navy" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-sikoni-navy grid place-items-center font-bold text-xs shadow-xs">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-sikoni-navy">
                      Bagian IV: Pengesahan & Tanda Tangan Empat Pihak
                    </h3>
                    <p className="text-[11px] text-sikoni-muted">Nama-nama pejabat pengurus yang tercantum pada lembar pengesahan resmi</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-sikoni-navy uppercase tracking-wider">
                  Pengesahan
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Kota & Tanggal Pengesahan</label>
                  <input
                    type="text"
                    value={formData.cityDate}
                    onChange={(e) => setFormData({ ...formData, cityDate: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nama Ketua Pengkot Cabor *</label>
                  <input
                    type="text"
                    required
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nama Sekretaris Pengkot Cabor *</label>
                  <input
                    type="text"
                    required
                    value={formData.secretaryName}
                    onChange={(e) => setFormData({ ...formData, secretaryName: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-sikoni-navy block mb-1">Nama Bendahara Pengkot Cabor *</label>
                  <input
                    type="text"
                    required
                    value={formData.treasurerName}
                    onChange={(e) => setFormData({ ...formData, treasurerName: e.target.value })}
                    className="w-full bg-slate-50/60 border border-slate-200/90 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-sikoni-teal font-semibold"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Mengetahui & Mengesahkan:</span>
                    <b className="text-xs text-sikoni-navy font-bold">{formData.koniLeaderName}</b>
                    <span className="text-[10.5px] text-slate-500 block">Ketua Umum Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta</span>
                  </div>
                  <span className="text-[10px] font-bold text-sikoni-teal bg-teal-50 px-3 py-1 rounded-full border border-teal-200/70 self-start sm:self-auto">
                    KONI Surakarta Approved
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER BAR: SELESAI & GENERATE FILE WORD */}
            <div className="card-sikoni p-5 bg-gradient-to-r from-[#142a43] via-[#1a385c] to-[#142a43] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10.5px] font-black uppercase tracking-widest text-sikoni-gold block">
                  KONFIRMASI PENYUSUNAN LPJ
                </span>
                <p className="text-xs text-slate-200 max-w-xl">
                  Klik tombol <b>"Selesai & Generate File Word LPJ"</b> untuk mengunduh dokumen Word (.doc) resmi yang rapi, tertata, dan siap dicetak/ditandatangani.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Eye size={15} /> Pratinjau
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sikoni-gold via-amber-300 to-sikoni-gold hover:from-amber-400 hover:to-amber-500 text-sikoni-navy font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:scale-[1.02]"
                >
                  <FileText size={16} /> Selesai & Generate File Word LPJ
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DAFTAR RIWAYAT & MONITORING DOKUMEN LPJ                           */}
      {/* ========================================================================= */}
      {activeTab === 'list' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DataTable
            title="Daftar Dokumen LPJ Terdaftar"
            subtitle="Status verifikasi laporan pertanggungjawaban kegiatan cabang olahraga kota Surakarta"
            columns={[
              { header: 'Nomor LPJ', accessor: 'number' },
              { header: 'Nama Kegiatan', accessor: 'activity' },
              { header: 'Cabor', accessor: 'cabor' },
              { header: 'Total Realisasi', accessor: 'totalRealization' },
              { header: 'Tanggal Kirim', accessor: 'submittedDate' },
              { header: 'Status Pemeriksaan', accessor: 'status', isStatus: true },
              {
                header: 'Aksi Unduh & Periksa',
                accessor: (row) => (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownloadWordFromRow(row)}
                      className="bg-emerald-50 hover:bg-emerald-100 text-sikoni-teal border border-emerald-200/90 px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                      title="Generate dan unduh berkas Microsoft Word LPJ ini"
                    >
                      <Download size={12} /> Unduh Word
                    </button>
                    <button
                      onClick={() => setSelectedLpj(row)}
                      className="bg-white border border-slate-200 text-sikoni-navy px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1 shadow-xs transition-all"
                    >
                      <Eye size={12} /> Checklist
                    </button>
                  </div>
                ),
              },
            ]}
            data={lpjList}
          />

          {/* Checklist 5 Instrumen Audit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-sikoni relative overflow-hidden space-y-4">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-teal via-sikoni-green to-sikoni-gold" />
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy">Struktur Kelengkapan LPJ</h3>
                <p className="text-[11px] text-sikoni-muted">5 instrumen wajib yang harus divalidasi</p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-emerald-50/80 via-white to-slate-50/60 border border-emerald-200/80 shadow-xs">
                  <span className="font-medium text-sikoni-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">1</span>
                    Identitas dan ringkasan kegiatan
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">✓ Lengkap</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-emerald-50/80 via-white to-slate-50/60 border border-emerald-200/80 shadow-xs">
                  <span className="font-medium text-sikoni-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">2</span>
                    Realisasi pengeluaran terhadap RAB
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">✓ Terhubung</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-amber-50/80 via-white to-slate-50/60 border border-amber-200/80 shadow-xs">
                  <span className="font-medium text-sikoni-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">3</span>
                    Bukti fisik pengeluaran / nota
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200">◷ 2 Belum valid</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-amber-50/80 via-white to-slate-50/60 border border-amber-200/80 shadow-xs">
                  <span className="font-medium text-sikoni-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">4</span>
                    Bukti kuitansi & transfer pembayaran
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200">◷ 1 Belum ada</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-emerald-50/80 via-white to-slate-50/60 border border-emerald-200/80 shadow-xs">
                  <span className="font-medium text-sikoni-navy flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">5</span>
                    Dokumentasi foto kegiatan
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">✓ Lengkap</span>
                </div>
              </div>
            </div>

            <div className="card-sikoni relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-teal via-sikoni-gold to-sikoni-navy" />
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-sikoni-navy">Kontrol Pemeriksaan & Validasi</h3>
                <p className="text-[11px] text-sikoni-muted">Ketentuan audit sebelum penetapan persetujuan final</p>
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 border border-amber-200/70 text-xs text-sikoni-ink space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertCircle size={14} className="text-amber-600" />
                    <span>Ketentuan Mutlak Verifikasi</span>
                  </div>
                  <p className="leading-relaxed text-slate-600">
                    LPJ tidak boleh dinyatakan final apabila terdapat item pengeluaran yang belum diverifikasi, bukti transaksi wajib belum lengkap, atau terdapat selisih lebih penggunaan dana panjar yang belum dikembalikan ke rekening kas KONI Surakarta.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-xl text-xs text-sikoni-muted flex items-center gap-2">
                <CheckCircle2 size={15} className="text-sikoni-teal shrink-0" />
                <span>Format laporan mengikuti pedoman pertanggungjawaban bantuan hibah olahraga Pemkot Surakarta.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL PRATINJAU DOKUMEN CETAK SEBELUM DOWNLOAD                              */}
      {/* ========================================================================= */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-sikoni-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-3xl max-h-[88vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-sikoni-teal grid place-items-center shadow-xs">
                  <Printer size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-sikoni-navy">
                    Pratinjau Tata Letak Dokumen Word LPJ
                  </h3>
                  <p className="text-[11px] text-sikoni-muted">Format standar cetak A4 KONI Surakarta</p>
                </div>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-sikoni-navy p-1">
                <X size={18} />
              </button>
            </div>

            {/* Simulated Word Sheet Preview */}
            <div className="p-8 bg-white border border-slate-300 rounded-xl shadow-inner font-serif text-[11px] leading-relaxed text-black space-y-4">
              {/* Kop Surat */}
              <div className="text-center border-b-2 border-black pb-2 mb-4">
                <div className="font-bold text-xs uppercase">KOMITE OLAHRAGA NASIONAL INDONESIA (KONI) KOTA SURAKARTA</div>
                <div className="font-black text-sm uppercase text-sikoni-navy tracking-wide">
                  PENGURUS KOTA {formData.cabor.toUpperCase()}
                </div>
                <div className="text-[9.5px] italic text-slate-600">
                  Sekretariat: Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1 Surakarta | Email: {formData.caborCode.toLowerCase()}@koni-surakarta.id
                </div>
              </div>

              {/* Judul Dokumen */}
              <div className="text-center">
                <b className="text-xs uppercase underline">LAPORAN PERTANGGUNGJAWABAN (LPJ) PELAKSANAAN KEGIATAN</b>
                <div className="text-[10px] font-bold mt-0.5">Nomor: {formData.number}</div>
              </div>

              {/* Data Kegiatan */}
              <div className="space-y-1 pt-2">
                <b>BAB I. PENDAHULUAN</b>
                <p className="text-justify indent-6">{formData.background}</p>
                <div className="grid grid-cols-3 gap-1 pt-1 text-[10.5px]">
                  <span>Nama Kegiatan:</span>
                  <span className="col-span-2 font-bold">{formData.activity}</span>
                  <span>Waktu & Lokasi:</span>
                  <span className="col-span-2">{formData.period} • {formData.location}</span>
                  <span>Dana Hibah APBD:</span>
                  <span className="col-span-2 font-bold">{formatRupiah(formData.budgetGrant)}</span>
                </div>
              </div>

              {/* Rincian Belanja */}
              <div className="space-y-1 pt-2">
                <b>BAB III. REALISASI KEUANGAN & BUKTI BELANJA</b>
                <table className="w-full border-collapse border border-black text-[10px] mt-1">
                  <thead>
                    <tr className="bg-slate-100 border-b border-black">
                      <th className="border border-black p-1 text-center w-6">No</th>
                      <th className="border border-black p-1 text-left">Uraian Belanja</th>
                      <th className="border border-black p-1 text-center">No. Bukti</th>
                      <th className="border border-black p-1 text-center">Vol</th>
                      <th className="border border-black p-1 text-right">Harga</th>
                      <th className="border border-black p-1 text-right">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((it, idx) => (
                      <tr key={idx} className="border-b border-black">
                        <td className="border border-black p-1 text-center">{idx + 1}</td>
                        <td className="border border-black p-1">{it.item}</td>
                        <td className="border border-black p-1 text-center font-mono">{it.proofNumber}</td>
                        <td className="border border-black p-1 text-center">{it.volume} {it.unit}</td>
                        <td className="border border-black p-1 text-right">{formatRupiah(it.unitPrice)}</td>
                        <td className="border border-black p-1 text-right font-bold">{formatRupiah(it.volume * it.unitPrice)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold">
                      <td colSpan={5} className="border border-black p-1 text-right">TOTAL REALISASI BELANJA :</td>
                      <td className="border border-black p-1 text-right">{formatRupiah(totalRealization)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 4 Kolom Tanda Tangan */}
              <div className="pt-4 grid grid-cols-3 text-center gap-2 text-[10px]">
                <div>
                  Mengetahui / Mengajukan,<br/>
                  <b>Ketua Pengkot</b>
                  <div className="h-10"></div>
                  <b className="underline block">{formData.leaderName}</b>
                </div>
                <div>
                  Menyetujui,<br/>
                  <b>Sekretaris Pengkot</b>
                  <div className="h-10"></div>
                  <b className="underline block">{formData.secretaryName}</b>
                </div>
                <div>
                  Memeriksa,<br/>
                  <b>Bendahara Pengkot</b>
                  <div className="h-10"></div>
                  <b className="underline block">{formData.treasurerName}</b>
                </div>
                <div className="col-span-3 pt-4">
                  Mengesahkan & Menelaah,<br/>
                  <b>KETUA UMUM KONI KOTA SURAKARTA</b>
                  <div className="h-10"></div>
                  <b className="underline block">{formData.koniLeaderName}</b>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Tutup Pratinjau
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPreviewModal(false);
                  handleFinishAndGenerateWord();
                }}
                className="px-5 py-2 rounded-xl bg-sikoni-teal text-white text-xs font-bold hover:bg-teal-700 shadow-md flex items-center gap-1.5"
              >
                <Download size={14} /> Download File Word Ini (.doc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL AUDIT CHECKLIST PEMERIKSAAN                                         */}
      {/* ========================================================================= */}
      {selectedLpj && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="card-sikoni w-full max-w-xl p-6 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  {selectedLpj.number}
                </span>
                <h3 className="text-base font-extrabold text-sikoni-navy mt-1">{selectedLpj.activity}</h3>
                <p className="text-xs text-sikoni-muted">{selectedLpj.cabor} • Realisasi: {selectedLpj.totalRealization}</p>
              </div>
              <button onClick={() => setSelectedLpj(null)} className="text-slate-400 hover:text-sikoni-navy p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <b className="text-sikoni-navy block text-[11px] uppercase tracking-wider">5 Checklist Instrumen Pemeriksaan:</b>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-medium text-slate-700">1. Identitas & Laporan Narasi Hasil Kegiatan</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Lengkap</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-medium text-slate-700">2. Rekonsiliasi Realisasi Belanja terhadap RAB</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Sesuai Pagu</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-medium text-slate-700">3. Keabsahan Bukti Pengeluaran & Nota Pembelian</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Terverifikasi</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-medium text-slate-700">4. Bukti Kuitansi & Rekening Koran Penerima</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Sah</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-medium text-slate-700">5. Dokumentasi Foto Lapangan & Presensi Atlet</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Terlampir</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedLpj(null)}
                className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-sikoni-navy"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadWordFromRow(selectedLpj)}
                  className="px-3.5 py-2 bg-emerald-50 text-sikoni-teal border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 shadow-xs"
                >
                  <Download size={13} /> Unduh File Word
                </button>
                <button
                  onClick={() => handleUpdateLpjStatus(selectedLpj.number, 'Ditolak')}
                  className="px-3 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold hover:bg-rose-100 flex items-center gap-1"
                >
                  <AlertCircle size={14} /> Revisi
                </button>
                <button
                  onClick={() => handleUpdateLpjStatus(selectedLpj.number, 'Disetujui')}
                  className="px-4 py-2 bg-sikoni-teal text-white rounded-xl text-xs font-bold hover:bg-teal-700 shadow-md flex items-center gap-1"
                >
                  <Check size={14} /> Sahkan LPJ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-sikoni-navy text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs font-bold">
          <Check size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
