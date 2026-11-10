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
  Search,
  Award,
  Calendar,
  MapPin,
  Phone,
  Check,
  RotateCcw,
  Building2,
  TrendingUp,
  Layers,
  Download,
  Info,
  Users,
  CheckCheck,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { generateLpjWordDocument } from '../../lib/generateLpjWord';

export type UserPersona = 'publik' | 'cabor' | 'pengurus';

export const MobilePreview: React.FC = () => {
  // Active Persona: 'publik' | 'cabor' | 'pengurus'
  const [persona, setPersona] = useState<UserPersona>('cabor');

  // Persona-specific tab states
  const [caborTab, setCaborTab] = useState<
    'home' | 'finance' | 'submissions' | 'lpj' | 'account' | 'rab-form' | 'expense-form'
  >('home');

  const [publikTab, setPublikTab] = useState<
    'home' | 'cabor-dir' | 'transparansi' | 'jadwal' | 'info'
  >('home');

  const [pengurusTab, setPengurusTab] = useState<
    'dashboard' | 'approval' | 'monitoring' | 'kas' | 'profil'
  >('dashboard');

  // In-app Notification Dropdown Popover
  const [isMobileNotifOpen, setIsMobileNotifOpen] = useState(false);

  // Common UI State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedMobileItem, setSelectedMobileItem] = useState<any | null>(null);
  const [selectedCaborDetail, setSelectedCaborDetail] = useState<any | null>(null);

  // Search in Cabor Directory
  const [caborSearch, setCaborSearch] = useState('');
  const [caborCategory, setCaborCategory] = useState('Semua');

  // Approval queue state for Pengurus KONI
  const [approvalList, setApprovalList] = useState([
    {
      id: 'APR-01',
      cabor: 'PASI (Atletik)',
      title: 'RAB Kejuaraan Atletik Kota 2026',
      amount: 'Rp 48.500.000',
      date: '09 Nov 2026',
      status: 'Menunggu',
      desc: 'Proposal usulan penyelenggaraan kejuaraan atletik antar pelajar di Stadion Sriwedari.',
    },
    {
      id: 'APR-02',
      cabor: 'PBVSI (Bola Voli)',
      title: 'Sewa Lapangan & Honor Wasit',
      amount: 'Rp 14.200.000',
      date: '08 Nov 2026',
      status: 'Menunggu',
      desc: 'Pengajuan sewa venue GOR Manahan dan honorarium wasit berlisensi nasional.',
    },
    {
      id: 'APR-03',
      cabor: 'PGSI (Gulat)',
      title: 'Insentif & Suplemen Atlet Porprov',
      amount: 'Rp 8.400.000',
      date: '08 Nov 2026',
      status: 'Menunggu',
      desc: 'Pengadaan paket nutrisi tinggi protein dan multivitamin kontingen gulat.',
    },
    {
      id: 'APR-04',
      cabor: 'PBSI (Bulu Tangkis)',
      title: 'Pemusatan Latihan Daerah',
      amount: 'Rp 32.000.000',
      date: '07 Nov 2026',
      status: 'Disetujui',
      desc: 'Training camp intensif 14 atlet bulu tangkis persiapan Kejurprov.',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = (id: string, name: string) => {
    setApprovalList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Disetujui' } : item)),
    );
    showToast(`✓ Usulan ${name} berhasil disetujui!`);
  };

  const handleRevise = (id: string, name: string) => {
    setApprovalList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Verifikasi' } : item)),
    );
    showToast(`↺ Catatan revisi dikirim ke operator ${name}.`);
  };

  const handleReject = (id: string, name: string) => {
    setApprovalList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Ditolak' } : item)),
    );
    showToast(`✗ Usulan ${name} telah ditolak.`);
  };

  // Cabor Directory Data (for Publik & Pengurus)
  const caborDirectory = [
    {
      code: 'PASI',
      name: 'Persatuan Atletik Seluruh Indonesia',
      category: 'Terukur',
      ketua: 'Dr. H. Sugiyanto, M.Pd',
      sekretariat: 'Stadion Sriwedari Pintu 3, Surakarta',
      atlet: 38,
      pelatih: 6,
      phone: '0812-2839-4401',
      prestasi: 'Juara Umum Kejurprov Jateng 2025 (14 Emas)',
    },
    {
      code: 'PBVSI',
      name: 'Persatuan Bola Voli Seluruh Indonesia',
      category: 'Permainan Bola',
      ketua: 'Kombes Pol (Purn) Suryadi',
      sekretariat: 'Komp. Stadion Manahan Blok D-2',
      atlet: 45,
      pelatih: 5,
      phone: '0813-9022-8190',
      prestasi: 'Medali Emas Porprov Solo Raya 2024',
    },
    {
      code: 'PBSI',
      name: 'Persatuan Bulutangkis Seluruh Indonesia',
      category: 'Raket',
      ketua: 'Ir. FX Rudiatmoko',
      sekretariat: 'GOR Manahan Solo Lt. 2',
      atlet: 52,
      pelatih: 8,
      phone: '0811-2640-192',
      prestasi: 'Penyumbang 6 Atlet Pelatnas Cipayung',
    },
    {
      code: 'IPSI',
      name: 'Ikatan Pencak Silat Indonesia',
      category: 'Beladiri',
      ketua: 'H. Bambang Sumantri',
      sekretariat: 'Padepokan Silat Danukusuman, Surakarta',
      atlet: 64,
      pelatih: 9,
      phone: '0857-4100-3320',
      prestasi: 'Juara 1 Sirkuit Beladiri Nasional 2025',
    },
    {
      code: 'PERBASI',
      name: 'Persatuan Bola Basket Seluruh Indonesia',
      category: 'Permainan Bola',
      ketua: 'Drs. Hendro Wibowo',
      sekretariat: 'Sritex Arena, Laweyan, Surakarta',
      atlet: 40,
      pelatih: 4,
      phone: '0821-3450-8811',
      prestasi: 'Runner-up Liga Remaja Nasional 2025',
    },
    {
      code: 'PRSI',
      name: 'Persatuan Renang Seluruh Indonesia',
      category: 'Terukur',
      ketua: 'dr. H. Wahyu Hidayat, Sp.OT',
      sekretariat: 'Kolam Renang Tirtomoyo Manahan',
      atlet: 36,
      pelatih: 5,
      phone: '0815-6712-4409',
      prestasi: '9 Medali Emas Popda Jateng 2025',
    },
  ];

  const filteredCaborList = caborDirectory.filter((c) => {
    const matchText =
      c.name.toLowerCase().includes(caborSearch.toLowerCase()) ||
      c.code.toLowerCase().includes(caborSearch.toLowerCase());
    const matchCat = caborCategory === 'Semua' || c.category === caborCategory;
    return matchText && matchCat;
  });

  return (
    <div className="flex flex-col items-center justify-center py-6 min-h-[calc(100vh-72px)] bg-[#e9edf1]">
      {/* Top Multi-Persona Selector Bar */}
      <div className="mb-4 flex flex-col items-center gap-2">
        <div className="text-[11px] font-extrabold text-sikoni-muted tracking-widest uppercase">
          Pilih Peran Pengguna Aplikasi Android SIKONI
        </div>

        {/* 3-Role Persona Switcher Pill */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-md border border-slate-200">
          <button
            onClick={() => {
              setPersona('publik');
              setIsMobileNotifOpen(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              persona === 'publik'
                ? 'bg-sikoni-navy text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users size={14} /> Publik (Masyarakat)
          </button>

          <button
            onClick={() => {
              setPersona('cabor');
              setIsMobileNotifOpen(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              persona === 'cabor'
                ? 'bg-sikoni-teal text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award size={14} /> Operator Cabor (PASI)
          </button>

          <button
            onClick={() => {
              setPersona('pengurus');
              setIsMobileNotifOpen(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              persona === 'pengurus'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 size={14} /> Pengurus KONI
          </button>
        </div>

        <p className="text-[11px] text-slate-500 font-medium">
          {persona === 'publik' && 'Mode Publik: Jelajahi direktori 64 cabor, transparansi APBD, jadwal event & berita olahraga.'}
          {persona === 'cabor' && 'Mode Cabor: Ajukan RAB kegiatan, input nota kas, susun LPJ, & kelola insentif atlet binaan.'}
          {persona === 'pengurus' && 'Mode Pengurus: Dashboard eksekutif, verifikasi & approval berkas, monitoring 64 cabor, & mutasi giro.'}
        </p>
      </div>

      {/* Android Device Mockup Frame */}
      <div className="w-[395px] h-[800px] bg-white rounded-[40px] shadow-[0_25px_70px_rgba(20,42,67,0.3)] border-[11px] border-[#142a43] flex flex-col overflow-hidden relative">
        {/* Mobile Top Header */}
        <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sikoni-navy to-slate-700 text-white font-extrabold grid place-items-center text-xs shadow-sm">
              SK
            </div>
            <div>
              <span className="font-extrabold text-sm text-sikoni-navy tracking-tight block leading-tight">
                SIKONI Mobile
              </span>
              <span className="text-[9px] text-sikoni-muted block">KONI Kota Surakarta</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Persona Badge */}
            <span
              className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                persona === 'publik'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : persona === 'cabor'
                  ? 'bg-emerald-50 text-sikoni-teal border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {persona === 'publik' && 'Publik'}
              {persona === 'cabor' && 'PASI (Cabor)'}
              {persona === 'pengurus' && 'Pengurus KONI'}
            </span>

            {/* In-App Notification Bell Toggle */}
            <button
              onClick={() => setIsMobileNotifOpen((prev) => !prev)}
              aria-label="Notifikasi Mobile"
              className={`relative p-1.5 rounded-lg transition-colors ${
                isMobileNotifOpen
                  ? 'bg-slate-100 text-sikoni-navy'
                  : 'text-sikoni-muted hover:text-sikoni-navy'
              }`}
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
          </div>
        </div>

        {/* Floating In-App Mobile Notification Dropdown Popover */}
        {isMobileNotifOpen && (
          <div className="absolute top-14 inset-x-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden text-xs animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="p-3 bg-gradient-to-r from-sikoni-navy to-[#1f3f63] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={15} className="text-sikoni-gold" />
                <span className="font-bold text-xs">Pemberitahuan Sistem</span>
              </div>
              <button
                onClick={() => setIsMobileNotifOpen(false)}
                className="text-slate-300 hover:text-white p-0.5"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 p-1">
              <div
                onClick={() => {
                  showToast('Membuka detail verifikasi berkas...');
                  setIsMobileNotifOpen(false);
                }}
                className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <b className="text-sikoni-navy text-[11px]">RAB Kejuaraan Atletik Disetujui</b>
                  <span className="text-[9px] text-sikoni-muted">10 mnt lalu</span>
                </div>
                <p className="text-[10.5px] text-slate-600 mt-0.5">
                  Bendahara KONI telah menyetujui usulan dana termin I senilai Rp 48,5 jt.
                </p>
              </div>

              <div
                onClick={() => {
                  showToast('Membuka catatan verifikator LPJ...');
                  setIsMobileNotifOpen(false);
                }}
                className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <b className="text-sikoni-navy text-[11px]">Bukti Kuitansi Diterima</b>
                  <span className="text-[9px] text-sikoni-muted">1 jam lalu</span>
                </div>
                <p className="text-[10.5px] text-slate-600 mt-0.5">
                  Nota pengeluaran transportasi kontingen telah diverifikasi BPKAD.
                </p>
              </div>
            </div>

            <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={() => setIsMobileNotifOpen(false)}
                className="text-[10.5px] font-bold text-sikoni-teal"
              >
                Tutup Notifikasi
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN CONTENT: PERSONA 1 - PUBLIK
           ======================================================== */}
        {persona === 'publik' && (
          <div className="flex-1 overflow-y-auto p-4 bg-[#f4f6f9] space-y-4">
            {/* PUBLIK: TAB 1 - BERANDA */}
            {publikTab === 'home' && (
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-sikoni-muted">KONI Kota Surakarta</div>
                  <h2 className="text-lg font-black text-sikoni-navy tracking-tight">
                    Portal Olahraga Surakarta
                  </h2>
                </div>

                {/* City Hero Card */}
                <div className="card-hero-navy text-white p-4 rounded-2xl relative overflow-hidden">
                  <div className="text-[10px] tracking-wider text-sikoni-gold uppercase font-bold">
                    KOTA SURAKARTA JUARA
                  </div>
                  <div className="text-xl font-black mt-1">Porprov Jateng XVII</div>
                  <p className="text-[11px] text-slate-200 mt-1">
                    Mendukung 64 cabang olahraga binaan untuk mencetak atlet berprestasi dunia.
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className="bg-white/20 px-2 py-0.5 rounded font-bold text-amber-300">
                      🥇 124 Emas
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 rounded font-bold text-slate-200">
                      🥈 88 Perak
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 rounded font-bold text-amber-500">
                      🥉 95 Perunggu
                    </span>
                  </div>
                </div>

                {/* Transparansi Quick Summary */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <b className="text-xs text-sikoni-navy flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-sikoni-teal" /> Transparansi Hibah Olahraga
                    </b>
                    <span className="text-[10px] text-sikoni-teal font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      APBD 2026
                    </span>
                  </div>
                  <div className="text-lg font-black text-sikoni-navy">Rp 12.800.000.000</div>
                  <p className="text-[10.5px] text-slate-500 leading-relaxed">
                    Telah diserap 68,4% oleh 64 cabor untuk pembinaan atlet, perlengkapan, dan kejuaraan.
                  </p>
                  <button
                    onClick={() => setPublikTab('transparansi')}
                    className="w-full text-center py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10.5px] font-bold text-sikoni-teal border border-slate-200 mt-1"
                  >
                    Lihat Rincian Serapan Publik →
                  </button>
                </div>

                {/* Quick Grid Navigation */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setPublikTab('cabor-dir')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1 shadow-sm hover:bg-slate-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-sikoni-teal grid place-items-center font-bold">
                      <Award size={16} />
                    </div>
                    <span className="text-[9.5px] font-bold text-sikoni-navy">64 Cabor</span>
                  </button>

                  <button
                    onClick={() => setPublikTab('jadwal')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1 shadow-sm hover:bg-slate-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-sikoni-gold grid place-items-center font-bold">
                      <Calendar size={16} />
                    </div>
                    <span className="text-[9.5px] font-bold text-sikoni-navy">Jadwal</span>
                  </button>

                  <button
                    onClick={() => setPublikTab('transparansi')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1 shadow-sm hover:bg-slate-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 grid place-items-center font-bold">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-[9.5px] font-bold text-sikoni-navy">Anggaran</span>
                  </button>

                  <button
                    onClick={() => setPublikTab('info')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1 shadow-sm hover:bg-slate-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center font-bold">
                      <Info size={16} />
                    </div>
                    <span className="text-[9.5px] font-bold text-sikoni-navy">Info KONI</span>
                  </button>
                </div>

                {/* Upcoming Events Feed */}
                <div className="card-sikoni relative overflow-hidden p-3.5 space-y-3">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-teal to-sikoni-gold" />
                  <div className="flex justify-between items-center">
                    <b className="text-xs text-sikoni-navy font-black">Kejuaraan Terdekat di Solo</b>
                    <button
                      onClick={() => setPublikTab('jadwal')}
                      className="text-[10px] text-sikoni-teal font-extrabold bg-teal-50 px-2 py-0.5 rounded-full hover:bg-teal-100 transition-colors"
                    >
                      Semua →
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50/60 to-white border border-emerald-100/90 flex items-start gap-2.5 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-sikoni-teal flex-shrink-0 grid place-items-center font-black text-xs border border-emerald-200/60 shadow-xs">
                        15<br /><span className="text-[8px] font-bold">NOV</span>
                      </div>
                      <div>
                        <b className="text-sikoni-navy block text-[11.5px] font-bold">Kejuaraan Atletik Antar Pelajar</b>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-sikoni-teal" /> Stadion Sriwedari • PASI Solo
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-50/60 to-white border border-amber-100/90 flex items-start gap-2.5 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-800 flex-shrink-0 grid place-items-center font-black text-xs border border-amber-200/60 shadow-xs">
                        22<br /><span className="text-[8px] font-bold">NOV</span>
                      </div>
                      <div>
                        <b className="text-sikoni-navy block text-[11.5px] font-bold">Turnamen Bola Voli Walikota Cup</b>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-sikoni-gold" /> GOR Manahan Solo • PBVSI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest News Feed */}
                <div className="card-sikoni relative overflow-hidden p-3.5 space-y-2.5">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-navy" />
                  <b className="text-xs text-sikoni-navy font-black block">Berita & Informasi Olahraga</b>
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200/80 shadow-xs space-y-1.5 border-l-4 border-l-sikoni-teal">
                    <span className="text-[9px] font-extrabold text-sikoni-teal bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Prestasi Atlet
                    </span>
                    <b className="text-[11px] text-sikoni-navy block leading-snug font-bold">
                      Pemkot dan KONI Surakarta Salurkan Bonus Atlet Berprestasi SEA Games
                    </b>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Total bonus sebesar Rp 1,4 Miliar diserahkan secara simbolis di Balai Kota Surakarta.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PUBLIK: TAB 2 - DIREKTORI CABOR */}
            {publikTab === 'cabor-dir' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Direktori Resmi</div>
                  <h2 className="text-lg font-black text-sikoni-navy tracking-tight">
                    64 Cabang Olahraga
                  </h2>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari cabor (misal: atletik, voli, silat)..."
                    value={caborSearch}
                    onChange={(e) => setCaborSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex gap-1 overflow-x-auto pb-1 text-[10px]">
                  {['Semua', 'Terukur', 'Permainan Bola', 'Beladiri', 'Raket'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCaborCategory(cat)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-all ${
                        caborCategory === cat
                          ? 'bg-sikoni-navy text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Cabor List */}
                <div className="space-y-2">
                  {filteredCaborList.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCaborDetail(c)}
                      className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-sikoni-navy font-black grid place-items-center text-xs border border-slate-200">
                          {c.code}
                        </div>
                        <div>
                          <b className="text-xs text-sikoni-navy block leading-tight">{c.name}</b>
                          <span className="text-[10px] text-sikoni-teal font-semibold">
                            {c.category} • {c.atlet} Atlet Terdaftar
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PUBLIK: TAB 3 - TRANSPARANSI ANGGARAN */}
            {publikTab === 'transparansi' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Keterbukaan Informasi Publik</div>
                  <h2 className="text-lg font-black text-sikoni-navy tracking-tight">
                    Transparansi Anggaran
                  </h2>
                </div>

                <div className="card-hero-navy p-4 rounded-2xl text-white">
                  <div className="text-[10px] text-sikoni-gold font-bold uppercase">
                    Pagu Hibah APBD TA 2026
                  </div>
                  <div className="text-2xl font-black mt-1">Rp 12.800.000.000</div>
                  <div className="mt-2 text-[10.5px] text-slate-200">
                    KONI Surakarta berkomitmen pada prinsip akuntabilitas publik bebas suap & gratifikasi.
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5 text-xs">
                  <b className="text-xs text-sikoni-navy block">Alokasi per Pos Kegiatan</b>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Pembinaan Prestasi Cabor</span>
                        <b className="text-sikoni-navy">Rp 5,63 M (44%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-sikoni-teal h-full" style={{ width: '44%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Sarana & Perlengkapan Tanding</span>
                        <b className="text-sikoni-navy">Rp 3,20 M (25%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-sikoni-gold h-full" style={{ width: '25%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Insentif Atlet & Pelatih</span>
                        <b className="text-sikoni-navy">Rp 2,30 M (18%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full" style={{ width: '18%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Operasional & Kesekretariatan</span>
                        <b className="text-sikoni-navy">Rp 1,67 M (13%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-slate-400 h-full" style={{ width: '13%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Mengunduh Berkas Transparansi Publik 2026 (PDF)...')}
                  className="w-full py-2.5 bg-sikoni-navy text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download size={14} /> Unduh Laporan Keterbukaan Publik (PDF)
                </button>
              </div>
            )}

            {/* PUBLIK: TAB 4 - JADWAL & EVENT */}
            {publikTab === 'jadwal' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Kalender Kompetisi</div>
                  <h2 className="text-lg font-black text-sikoni-navy tracking-tight">
                    Jadwal Kejuaraan Kota
                  </h2>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Mendatang • 15 Nov 2026
                    </span>
                    <b className="text-xs text-sikoni-navy block">
                      Kejuaraan Daerah Atletik Pelajar Solo
                    </b>
                    <p className="text-[10.5px] text-slate-500">
                      Diselenggarakan oleh PASI Surakarta di Stadion Sriwedari. Terbuka untuk umum.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Mendatang • 22 Nov 2026
                    </span>
                    <b className="text-xs text-sikoni-navy block">
                      Piala Walikota Surakarta Bola Voli 2026
                    </b>
                    <p className="text-[10.5px] text-slate-500">
                      GOR Manahan Solo • Perebutan piala bergilir 16 tim antar kecamatan.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                      Desember 2026
                    </span>
                    <b className="text-xs text-sikoni-navy block">
                      Seleksi Atlet Puslatkot Porprov 2027
                    </b>
                    <p className="text-[10.5px] text-slate-500">
                      Seleksi terbuka bagi atlet potensial kelahiran 2004 ke atas di berbagai venue kota.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PUBLIK: TAB 5 - INFO KONI */}
            {publikTab === 'info' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Tentang Kami</div>
                  <h2 className="text-lg font-black text-sikoni-navy tracking-tight">
                    KONI Kota Surakarta
                  </h2>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                  <b className="text-xs text-sikoni-navy block">Dewan Pengurus 2024-2028</b>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    KONI Surakarta bertugas mengoordinasikan, membina, dan mengembangkan cabang olahraga prestasi demi mengharumkan nama Kota Surakarta di kancah nasional maupun internasional.
                  </p>
                  <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ketua Umum:</span>
                      <b className="text-sikoni-navy">Drs. H. Sri Mulyanto</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sekretaris:</span>
                      <b className="text-sikoni-navy">Ir. Joko Prasetyo</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bendahara:</span>
                      <b className="text-sikoni-navy">Dra. Hj. Indrawati</b>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                  <b className="text-xs text-sikoni-navy block">Kontak & Sekretariat</b>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-sikoni-teal flex-shrink-0 mt-0.5" />
                      <span>Jl. Adi Sucipto No. 1, Manahan, Banjarsari, Kota Surakarta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-sikoni-teal flex-shrink-0" />
                      <span>(0271) 714902 / 0812-2800-9990</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            SCREEN CONTENT: PERSONA 2 - OPERATOR CABOR (PASI)
           ======================================================== */}
        {persona === 'cabor' && (
          <div className="flex-1 overflow-y-auto p-4 bg-[#f4f6f9] space-y-4">
            {/* CABOR: TAB 1 - BERANDA */}
            {caborTab === 'home' && (
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Selamat bertugas, Operator Cabor</div>
                  <h2 className="text-xl font-black text-sikoni-navy tracking-tight">
                    PASI Surakarta
                  </h2>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-sikoni-navy via-[#1e3c5d] to-sikoni-teal text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
                  <div className="text-[10px] tracking-wider text-sikoni-gold uppercase font-bold">
                    PAGU ANGGARAN CABOR 2026
                  </div>
                  <div className="text-2xl font-black mt-1">Rp 120.000.000</div>
                  <div className="text-[11px] text-slate-200 mt-1 font-medium">
                    Realisasi Valid: Rp 48.000.000 • Sisa: Rp 72.000.000
                  </div>
                </div>

                {/* 4 Mini KPIs */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">Pengajuan diproses</div>
                    <div className="text-lg font-bold text-sikoni-navy mt-1">03 Berkas</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">Perlu tindakan</div>
                    <div className="text-lg font-bold text-amber-600 mt-1">01 Revisi</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">Dana cair termin</div>
                    <div className="text-lg font-bold text-sikoni-green mt-1">Rp 40 jt</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">LPJ disetujui</div>
                    <div className="text-lg font-bold text-sikoni-teal mt-1">04 Laporan</div>
                  </div>
                </div>

                {/* Quick Action Shortcuts */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setCaborTab('rab-form')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-sikoni-teal grid place-items-center font-bold">
                      <Plus size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-sikoni-navy">Buat RAB</span>
                  </button>

                  <button
                    onClick={() => setCaborTab('expense-form')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-sikoni-gold grid place-items-center font-bold">
                      <ArrowUpRight size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-sikoni-navy">Input Nota</span>
                  </button>

                  <button
                    onClick={() => setCaborTab('lpj')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center font-bold">
                      <FileCheck size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-sikoni-navy">Susun LPJ</span>
                  </button>

                  <button
                    onClick={() => showToast('Membuka pengajuan insentif atlet...')}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 grid place-items-center font-bold">
                      <Award size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-sikoni-navy">Insentif</span>
                  </button>
                </div>

                {/* Submissions List */}
                <div className="card-sikoni relative overflow-hidden p-3.5 space-y-3">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-teal to-sikoni-gold" />
                  <div className="flex justify-between items-center">
                    <b className="text-xs text-sikoni-navy font-black">Usulan Berkas Berjalan</b>
                    <button
                      onClick={() => setCaborTab('submissions')}
                      className="text-[10px] text-sikoni-teal font-extrabold bg-teal-50 px-2 py-0.5 rounded-full hover:bg-teal-100 transition-colors"
                    >
                      Lihat Semua →
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <button
                      onClick={() =>
                        setSelectedMobileItem({
                          title: 'RAB Kejuaraan Atletik Kota 2026',
                          sub: 'RAB-026 • 09 Nov 2026',
                          val: 'Rp 48.500.000',
                          status: 'Menunggu',
                          desc: 'Pengajuan sedang berada pada antrean verifikasi teknis oleh Bendahara KONI Surakarta.',
                        })
                      }
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 flex justify-between items-center hover:bg-white hover:shadow-xs transition-all border-l-4 border-l-sikoni-gold"
                    >
                      <div>
                        <b className="text-sikoni-navy block text-[11.5px] font-bold">RAB Kejuaraan Atletik Kota</b>
                        <small className="text-[10px] text-sikoni-muted">RAB-026 • 09 Nov 2026</small>
                      </div>
                      <div className="text-right">
                        <b className="text-sikoni-navy block text-[11.5px] font-black">Rp 48,5 jt</b>
                        <StatusBadge status="Menunggu" />
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        setSelectedMobileItem({
                          title: 'Transportasi & Bus Kontingen',
                          sub: 'EXP-1126 • 08 Nov 2026',
                          val: 'Rp 4.500.000',
                          status: 'Verifikasi',
                          desc: 'Bukti kuitansi sewa armada bus sedang diteliti kelengkapan stempel dan meterainya.',
                        })
                      }
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 flex justify-between items-center hover:bg-white hover:shadow-xs transition-all border-l-4 border-l-sikoni-teal"
                    >
                      <div>
                        <b className="text-sikoni-navy block text-[11.5px] font-bold">Transportasi Atlet</b>
                        <small className="text-[10px] text-sikoni-muted">EXP-1126 • 08 Nov 2026</small>
                      </div>
                      <div className="text-right">
                        <b className="text-sikoni-navy block text-[11.5px] font-black">Rp 4,5 jt</b>
                        <StatusBadge status="Verifikasi" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CABOR: TAB 2 - KEUANGAN CABOR */}
            {caborTab === 'finance' && (
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Pembukuan Keuangan</div>
                  <h2 className="text-xl font-black text-sikoni-navy">Kas Cabor PASI</h2>
                </div>

                <div className="card-hero-navy p-4 rounded-2xl shadow-md">
                  <div className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wider">SALDO KAS OPERASIONAL CABOR</div>
                  <div className="text-2xl font-black mt-1 text-white">Rp 32.500.000</div>
                  <div className="text-[11px] text-sikoni-gold mt-0.5 font-bold">
                    Rekening Giro Bank Jateng No. 102-992-811
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-gradient-to-br from-slate-50 to-white p-3 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-sikoni-navy">
                    <small className="text-[10px] text-sikoni-muted font-bold block uppercase">Realisasi valid</small>
                    <b className="block text-base text-sikoni-navy mt-1 font-black">Rp 48 jt</b>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50/50 to-white p-3 rounded-xl border border-teal-200/80 shadow-xs border-l-4 border-l-emerald-600">
                    <small className="text-[10px] text-emerald-700 font-bold block uppercase">Sudah ditransfer</small>
                    <b className="block text-base text-sikoni-green mt-1 font-black">Rp 40 jt</b>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50/50 to-white p-3 rounded-xl border border-amber-200/80 shadow-xs border-l-4 border-l-sikoni-gold">
                    <small className="text-[10px] text-amber-800 font-bold block uppercase">Menunggu SP2D</small>
                    <b className="block text-base text-amber-700 mt-1 font-black">Rp 8 jt</b>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50/50 to-white p-3 rounded-xl border border-teal-200/80 shadow-xs border-l-4 border-l-sikoni-teal">
                    <small className="text-[10px] text-sikoni-teal font-bold block uppercase">Sisa pagu cabor</small>
                    <b className="block text-base text-sikoni-teal mt-1 font-black">Rp 72 jt</b>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2 shadow-sm text-xs">
                  <b className="text-xs text-sikoni-navy block">Riwayat Transfer Hibah</b>
                  <div className="divide-y divide-slate-100">
                    <div className="py-2 flex justify-between items-center">
                      <div>
                        <b className="text-sikoni-navy block text-[11px]">Pencairan Termin I TA 2026</b>
                        <span className="text-[10px] text-slate-400">12 Maret 2026 • SP2D-041</span>
                      </div>
                      <span className="font-bold text-sikoni-green">+ Rp 40.000.000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CABOR: TAB 3 - PENGAJUAN */}
            {caborTab === 'submissions' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[11px] text-sikoni-muted">Status Pengajuan</div>
                    <h2 className="text-lg font-black text-sikoni-navy">Arsip Berkas</h2>
                  </div>
                  <button
                    onClick={() => setCaborTab('rab-form')}
                    className="bg-sikoni-teal text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={14} /> Buat Baru
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <div className="flex justify-between items-start">
                      <b className="text-xs text-sikoni-navy">RAB-026 • Kejuaraan Atletik</b>
                      <StatusBadge status="Menunggu" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Nilai usulan:</span>
                      <b className="text-sikoni-navy">Rp 48.500.000</b>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      Diajukan pada 09 Nov 2026 • Antrean verifikasi pengurus
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <div className="flex justify-between items-start">
                      <b className="text-xs text-sikoni-navy">EXP-1126 • Sewa Bus Kontingen</b>
                      <StatusBadge status="Verifikasi" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Nilai nota:</span>
                      <b className="text-sikoni-navy">Rp 4.500.000</b>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <div className="flex justify-between items-start">
                      <b className="text-xs text-sikoni-navy">RAB-014 • Perlengkapan Latihan</b>
                      <StatusBadge status="Disetujui" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Nilai disetujui:</span>
                      <b className="text-sikoni-navy">Rp 12.000.000</b>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CABOR: TAB 4 - LPJ */}
            {caborTab === 'lpj' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[11px] text-sikoni-muted">Pertanggungjawaban</div>
                    <h2 className="text-lg font-black text-sikoni-navy">Penyusunan LPJ</h2>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-sikoni-teal px-2 py-0.5 rounded-full border border-emerald-200">
                    Auto Word
                  </span>
                </div>

                {/* Mobile Auto Word Generator Card */}
                <div className="bg-gradient-to-br from-teal-50 via-white to-slate-50 p-3.5 rounded-2xl border border-teal-200 shadow-sm text-xs space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sikoni-teal text-white grid place-items-center shadow-xs">
                      <FileText size={15} />
                    </div>
                    <div>
                      <b className="text-xs text-sikoni-navy block">Generator File Word LPJ</b>
                      <span className="text-[10px] text-slate-500">Kop resmi, rincian anggaran, & 4 tanda tangan</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kegiatan:</span>
                      <b className="text-sikoni-navy">Kejurda Atletik 2026</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Realisasi Belanja:</span>
                      <b className="text-sikoni-teal">Rp 42.100.000</b>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      generateLpjWordDocument({
                        number: 'LPJ-015/XI/KONI/2026',
                        activity: 'Kejuaraan Atletik Pelajar Surakarta 2026',
                        cabor: 'Persatuan Atletik Seluruh Indonesia (PASI)',
                        caborCode: 'PASI',
                        skNumber: 'SK-042/KONI-SKA/VIII/2026',
                        budgetGrant: 45000000,
                        period: '12 – 15 November 2026',
                        location: 'Stadion Sriwedari, Surakarta',
                        targetParticipants: '180 Atlet & 24 Ofisial',
                        achievements: 'Meraih 8 Medali Emas, 5 Perak, 6 Perunggu',
                        background: 'Laporan pertanggungjawaban pemanfaatan dana hibah olahraga APBD Surakarta 2026.',
                        closingNotes: 'Demikian LPJ ini disusun dengan penuh tanggung jawab.',
                        leaderName: 'Dr. Bambang Setiawan, M.Pd.',
                        secretaryName: 'Wahyu Hidayat, S.Or.',
                        treasurerName: 'Siti Aminah, S.E.',
                        koniLeaderName: 'Drs. H. Sri Nugroho, M.Si.',
                        cityDate: 'Surakarta, 10 November 2026',
                        items: [
                          { id: 1, item: 'Sewa lintasan & venue Stadion Sriwedari', proofNumber: 'KWT-01', volume: 3, unit: 'Hari', unitPrice: 3500000 },
                          { id: 2, item: 'Konsumsi atlet & ofisial pertandingan', proofNumber: 'NOTA-02', volume: 180, unit: 'Paket', unitPrice: 45000 },
                          { id: 3, item: 'Honor wasit & juri berlisensi nasional', proofNumber: 'KWT-03', volume: 16, unit: 'Orang', unitPrice: 400000 },
                          { id: 4, item: 'Medali kejuaraan & trofi', proofNumber: 'INV-04', volume: 1, unit: 'Paket', unitPrice: 6500000 },
                        ],
                      });
                      showToast('File Word LPJ (.doc) berhasil digenerate dan diunduh!');
                    }}
                    className="w-full py-2 bg-gradient-to-r from-sikoni-teal to-teal-700 hover:from-teal-700 hover:to-sikoni-navy text-white rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download size={13} /> Generate & Unduh File Word LPJ
                  </button>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-3">
                  <b className="text-xs text-sikoni-navy block">Upload Berkas Lampiran Tambahan</b>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center space-y-1 hover:border-sikoni-teal cursor-pointer">
                    <UploadCloud size={20} className="mx-auto text-sikoni-teal" />
                    <span className="text-[10.5px] font-bold text-sikoni-navy block">
                      Unggah Bukti Kuitansi & Foto Fisik
                    </span>
                    <span className="text-[9px] text-slate-400">
                      Format PDF / ZIP (Maksimal 25 MB)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      showToast('Dokumen LPJ Kejuaraan berhasil dikirim ke verifikator KONI!');
                      setCaborTab('home');
                    }}
                    className="w-full py-2 bg-white border border-slate-200 text-sikoni-navy hover:bg-slate-50 rounded-xl font-bold text-xs shadow-xs transition-all"
                  >
                    Kirim ke Verifikator KONI
                  </button>
                </div>
              </div>
            )}

            {/* CABOR: SUB-FORM: FORM RAB BARU */}
            {caborTab === 'rab-form' && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <b className="text-sm font-extrabold text-sikoni-navy">Form Usulan RAB Baru</b>
                  <button
                    onClick={() => setCaborTab('home')}
                    className="text-slate-400 hover:text-sikoni-navy"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 block mb-1">
                      Nama Kegiatan Cabor
                    </label>
                    <input
                      type="text"
                      defaultValue="Pemusatan Latihan Porprov Solo"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 block mb-1">
                      Estimasi Anggaran yang Diajukan (Rp)
                    </label>
                    <input
                      type="text"
                      defaultValue="25.000.000"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 block mb-1">
                      Lampiran Dokumen Proposal
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-lg p-2.5 text-center text-[10.5px] text-slate-500">
                      📄 Proposal_PASI_2026.pdf (1.8 MB)
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setCaborTab('home')}
                    className="flex-1 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      showToast('Usulan RAB berhasil dikirim ke antrean verifikasi KONI!');
                      setCaborTab('home');
                    }}
                    className="flex-1 py-2 bg-sikoni-teal text-white rounded-xl font-bold"
                  >
                    Kirim RAB
                  </button>
                </div>
              </div>
            )}

            {/* CABOR: SUB-FORM: INPUT NOTA */}
            {caborTab === 'expense-form' && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <b className="text-sm font-extrabold text-sikoni-navy">Input Bukti Nota Kas</b>
                  <button
                    onClick={() => setCaborTab('home')}
                    className="text-slate-400 hover:text-sikoni-navy"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 block mb-1">
                      Nomor Kuitansi / Nota
                    </label>
                    <input
                      type="text"
                      defaultValue="KWT-2026-089"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 block mb-1">
                      Nominal Kuitansi (Rp)
                    </label>
                    <input
                      type="text"
                      defaultValue="3.450.000"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 block mb-1">
                      Foto Kuitansi Bermeterai
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-lg p-2.5 text-center text-[10.5px] text-slate-500">
                      📷 Struk_Katering_Atlet.jpg (980 KB)
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setCaborTab('home')}
                    className="flex-1 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      showToast('Nota pengeluaran kasir cabor berhasil dicatat!');
                      setCaborTab('home');
                    }}
                    className="flex-1 py-2 bg-sikoni-navy text-white rounded-xl font-bold"
                  >
                    Simpan Nota
                  </button>
                </div>
              </div>
            )}

            {/* CABOR: TAB 5 - AKUN & SK */}
            {caborTab === 'account' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Profil Kepengurusan</div>
                  <h2 className="text-lg font-black text-sikoni-navy">PASI Surakarta</h2>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                  <b className="text-xs text-sikoni-navy block">Data SK KONI Surakarta</b>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nomor SK:</span>
                      <b className="text-sikoni-navy">SK-KONI-SKA/2024/042</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Masa Bakti:</span>
                      <b className="text-sikoni-navy">2024 – 2028</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Atlet Binaan:</span>
                      <b className="text-sikoni-teal">38 Atlet Aktif</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pelatih Berlisensi:</span>
                      <b className="text-sikoni-navy">6 Pelatih</b>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Sesi operator cabor diakhiri.')}
                  className="w-full py-2.5 bg-rose-50 text-sikoni-red rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-rose-100"
                >
                  <LogOut size={14} /> Keluar dari Akun Cabor
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            SCREEN CONTENT: PERSONA 3 - PENGURUS KONI
           ======================================================== */}
        {persona === 'pengurus' && (
          <div className="flex-1 overflow-y-auto p-4 bg-[#f4f6f9] space-y-4">
            {/* PENGURUS: TAB 1 - DASHBOARD EKSEKUTIF */}
            {pengurusTab === 'dashboard' && (
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Pengurus Harian KONI Surakarta</div>
                  <h2 className="text-xl font-black text-sikoni-navy tracking-tight">
                    Dashboard Eksekutif
                  </h2>
                </div>

                {/* Grand Total Box */}
                <div className="card-hero-navy p-4 rounded-2xl text-white shadow-lg relative overflow-hidden">
                  <div className="text-[10px] text-sikoni-gold font-bold uppercase tracking-wider">
                    TOTAL KAS HIBAH APBD 2026
                  </div>
                  <div className="text-2xl font-black mt-1">Rp 12.800.000.000</div>
                  <div className="text-[11px] text-slate-200 mt-1 flex items-center justify-between">
                    <span>Serapan: Rp 8.750.000.000 (68,4%)</span>
                    <span className="text-amber-300 font-bold">Kas: Rp 4,05 M</span>
                  </div>
                </div>

                {/* 4 KPIs Pengurus */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">Antrean approval</div>
                    <div className="text-lg font-bold text-amber-600 mt-1">
                      {approvalList.filter((a) => a.status === 'Menunggu').length} Berkas
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">LPJ verifikasi</div>
                    <div className="text-lg font-bold text-sikoni-teal mt-1">04 Laporan</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">Pajak disetor</div>
                    <div className="text-lg font-bold text-sikoni-green mt-1">Rp 184 jt</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[10px] text-sikoni-muted font-medium">Cabor aktif</div>
                    <div className="text-lg font-bold text-sikoni-navy mt-1">64 Cabor</div>
                  </div>
                </div>

                {/* Approval Quick Action Banner */}
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center justify-between gap-2 shadow-sm">
                  <div>
                    <b className="text-xs text-amber-900 block leading-tight">
                      {approvalList.filter((a) => a.status === 'Menunggu').length} Berkas Menunggu Persetujuan
                    </b>
                    <small className="text-[10px] text-amber-700">
                      Tinjau RAB dan verifikasi bukti nota kasir cabor
                    </small>
                  </div>
                  <button
                    onClick={() => setPengurusTab('approval')}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[10.5px] font-bold px-3 py-1.5 rounded-xl shadow-sm flex-shrink-0"
                  >
                    Buka Inbox →
                  </button>
                </div>

                {/* Top 5 Cabor Serapan */}
                <div className="card-sikoni relative overflow-hidden p-3.5 space-y-3 text-xs">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
                  <div className="flex justify-between items-center">
                    <b className="text-xs text-sikoni-navy font-black">Monitoring Serapan Cabor</b>
                    <button
                      onClick={() => setPengurusTab('monitoring')}
                      className="text-[10px] text-sikoni-teal font-extrabold bg-teal-50 px-2 py-0.5 rounded-full hover:bg-teal-100 transition-colors"
                    >
                      Semua 64 Cabor →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-2.5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="flex justify-between text-[11px] mb-1 font-semibold">
                        <span className="text-sikoni-navy">PASI (Atletik)</span>
                        <b className="text-sikoni-navy">Rp 48 jt / Rp 120 jt (40%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-sikoni-teal h-full rounded-full" style={{ width: '40%' }} />
                      </div>
                    </div>

                    <div className="p-2.5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="flex justify-between text-[11px] mb-1 font-semibold">
                        <span className="text-sikoni-navy">PBVSI (Bola Voli)</span>
                        <b className="text-sikoni-navy">Rp 75 jt / Rp 100 jt (75%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div className="p-2.5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="flex justify-between text-[11px] mb-1 font-semibold">
                        <span className="text-sikoni-navy">PBSI (Bulu Tangkis)</span>
                        <b className="text-sikoni-navy">Rp 92 jt / Rp 110 jt (83%)</b>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-sikoni-gold h-full rounded-full" style={{ width: '83%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PENGURUS: TAB 2 - VERIFIKASI & APPROVAL */}
            {pengurusTab === 'approval' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Disposisi & Tanda Tangan</div>
                  <h2 className="text-lg font-black text-sikoni-navy">Inbox Persetujuan</h2>
                </div>

                <div className="space-y-2.5 text-xs">
                  {approvalList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-sikoni-teal uppercase block">
                            {item.cabor}
                          </span>
                          <b className="text-xs text-sikoni-navy">{item.title}</b>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>

                      <div className="flex justify-between text-[11px] bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-500">Nilai Pengajuan:</span>
                        <b className="text-sikoni-navy font-black">{item.amount}</b>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>

                      {item.status === 'Menunggu' && (
                        <div className="flex gap-1.5 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => handleApprove(item.id, item.title)}
                            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1 shadow-sm"
                          >
                            <Check size={12} /> Setujui
                          </button>
                          <button
                            onClick={() => handleRevise(item.id, item.title)}
                            className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-[10.5px] flex items-center justify-center gap-1 shadow-sm"
                          >
                            <RotateCcw size={12} /> Revisi
                          </button>
                          <button
                            onClick={() => handleReject(item.id, item.title)}
                            className="py-1.5 px-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-[10.5px] border border-rose-200"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PENGURUS: TAB 3 - MONITORING 64 CABOR */}
            {pengurusTab === 'monitoring' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Kontrol Alokasi Pagu</div>
                  <h2 className="text-lg font-black text-sikoni-navy">Monitoring 64 Cabor</h2>
                </div>

                <div className="space-y-2 text-xs">
                  {caborDirectory.map((c, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <b className="text-xs text-sikoni-navy">{c.code} • {c.name}</b>
                        <span className="text-[10px] font-bold text-sikoni-teal bg-emerald-50 px-2 py-0.5 rounded-full">
                          {c.atlet} Atlet
                        </span>
                      </div>
                      <div className="flex justify-between text-[10.5px] text-slate-500">
                        <span>Pagu: Rp 120 Jt</span>
                        <span>Realisasi: Rp 48 Jt (40%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-sikoni-teal h-full" style={{ width: '40%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PENGURUS: TAB 4 - KAS & MUTASI GIRO */}
            {pengurusTab === 'kas' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Kas & Kasir KONI</div>
                  <h2 className="text-lg font-black text-sikoni-navy">Rekening Giro Bank</h2>
                </div>

                <div className="card-hero-navy p-4 rounded-2xl text-white">
                  <div className="text-[10px] text-sikoni-gold font-bold">SALDO BANK JATENG CABANG SURAKARTA</div>
                  <div className="text-2xl font-black mt-1">Rp 4.050.000.000</div>
                  <div className="text-[10.5px] text-slate-200 mt-1">
                    Giro No. 102.001.99281 • Terhubung Host-to-Host
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                  <b className="text-xs text-sikoni-navy block">Histori Penyaluran Termin Cabor</b>
                  <div className="divide-y divide-slate-100 text-[11px]">
                    <div className="py-2 flex justify-between items-center">
                      <div>
                        <b className="text-sikoni-navy block">Transfer Hibah PASI (Atletik)</b>
                        <span className="text-[10px] text-slate-400">09 Nov 2026 • SP2D-092</span>
                      </div>
                      <span className="font-bold text-rose-600">- Rp 48.500.000</span>
                    </div>

                    <div className="py-2 flex justify-between items-center">
                      <div>
                        <b className="text-sikoni-navy block">Transfer Hibah PBVSI (Voli)</b>
                        <span className="text-[10px] text-slate-400">07 Nov 2026 • SP2D-088</span>
                      </div>
                      <span className="font-bold text-rose-600">- Rp 14.200.000</span>
                    </div>

                    <div className="py-2 flex justify-between items-center">
                      <div>
                        <b className="text-sikoni-navy block">Penyaluran Hibah APBD Termin I</b>
                        <span className="text-[10px] text-slate-400">BPKAD Surakarta</span>
                      </div>
                      <span className="font-bold text-sikoni-green">+ Rp 4.250.000.000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PENGURUS: TAB 5 - PROFIL & PENGATURAN */}
            {pengurusTab === 'profil' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Akun Pejabat</div>
                  <h2 className="text-lg font-black text-sikoni-navy">Profil Pengurus</h2>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                  <b className="text-xs text-sikoni-navy block">Data Otoritas Verifikasi</b>
                  <div className="space-y-1 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nama:</span>
                      <b className="text-sikoni-navy">Dra. Hj. Indrawati</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Jabatan:</span>
                      <b className="text-sikoni-navy">Bendahara KONI Surakarta</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hak Akses:</span>
                      <b className="text-sikoni-teal">Full Approval & SP2D Signer</b>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Audit trail berhasil diunduh.')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-sikoni-navy rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download size={14} /> Download Rekap Audit Transaksi
                </button>
              </div>
            )}
          </div>
        )}

        {/* Selected Cabor Detail Modal (For Publik) */}
        {selectedCaborDetail && (
          <div className="absolute inset-x-3 bottom-16 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 z-50 text-xs space-y-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal uppercase block">
                  {selectedCaborDetail.category}
                </span>
                <b className="text-sm font-black text-sikoni-navy">{selectedCaborDetail.name}</b>
              </div>
              <button
                onClick={() => setSelectedCaborDetail(null)}
                className="text-slate-400 hover:text-sikoni-navy"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-slate-100 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600">
                <User size={13} className="text-sikoni-teal" />
                <span>Ketua: <b>{selectedCaborDetail.ketua}</b></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <MapPin size={13} className="text-sikoni-teal" />
                <span>{selectedCaborDetail.sekretariat}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Award size={13} className="text-sikoni-gold" />
                <span>Prestasi: {selectedCaborDetail.prestasi}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  showToast(`Membuka WhatsApp Sekretariat ${selectedCaborDetail.code}...`);
                  setSelectedCaborDetail(null);
                }}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-1 shadow-sm"
              >
                <Phone size={13} /> Kontak WhatsApp
              </button>
              <button
                onClick={() => setSelectedCaborDetail(null)}
                className="py-2 px-3 border border-slate-200 rounded-xl font-bold text-slate-600"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Selected Generic Item Detail Popup */}
        {selectedMobileItem && (
          <div className="absolute inset-x-3 bottom-16 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 z-50 text-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
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
            <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              {selectedMobileItem.desc}
            </p>
          </div>
        )}

        {/* Mobile Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 left-3 right-3 bg-sikoni-navy text-white text-[11.5px] font-bold py-2.5 px-3.5 rounded-xl shadow-xl z-50 text-center animate-in fade-in slide-in-from-top-1 border border-slate-700">
            {toastMessage}
          </div>
        )}

        {/* Mobile 5-Tab Bottom Navigation Bar (Tailored to active Persona) */}
        <div className="h-16 bg-white border-t border-slate-200 flex items-center justify-around flex-shrink-0 px-1 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
          {/* TAB BAR FOR: PUBLIK */}
          {persona === 'publik' && (
            <>
              <button
                onClick={() => setPublikTab('home')}
                className={`flex flex-col items-center gap-0.5 ${
                  publikTab === 'home' ? 'text-sikoni-navy font-black' : 'text-sikoni-muted'
                }`}
              >
                <Home size={18} />
                <span className="text-[9px]">Beranda</span>
              </button>

              <button
                onClick={() => setPublikTab('cabor-dir')}
                className={`flex flex-col items-center gap-0.5 ${
                  publikTab === 'cabor-dir' ? 'text-sikoni-navy font-black' : 'text-sikoni-muted'
                }`}
              >
                <Award size={18} />
                <span className="text-[9px]">64 Cabor</span>
              </button>

              <button
                onClick={() => setPublikTab('transparansi')}
                className={`flex flex-col items-center gap-0.5 ${
                  publikTab === 'transparansi' ? 'text-sikoni-navy font-black' : 'text-sikoni-muted'
                }`}
              >
                <TrendingUp size={18} />
                <span className="text-[9px]">Transparansi</span>
              </button>

              <button
                onClick={() => setPublikTab('jadwal')}
                className={`flex flex-col items-center gap-0.5 ${
                  publikTab === 'jadwal' ? 'text-sikoni-navy font-black' : 'text-sikoni-muted'
                }`}
              >
                <Calendar size={18} />
                <span className="text-[9px]">Jadwal</span>
              </button>

              <button
                onClick={() => setPublikTab('info')}
                className={`flex flex-col items-center gap-0.5 ${
                  publikTab === 'info' ? 'text-sikoni-navy font-black' : 'text-sikoni-muted'
                }`}
              >
                <Info size={18} />
                <span className="text-[9px]">Profil</span>
              </button>
            </>
          )}

          {/* TAB BAR FOR: OPERATOR CABOR */}
          {persona === 'cabor' && (
            <>
              <button
                onClick={() => setCaborTab('home')}
                className={`flex flex-col items-center gap-0.5 ${
                  caborTab === 'home' ? 'text-sikoni-teal font-black' : 'text-sikoni-muted'
                }`}
              >
                <Home size={18} />
                <span className="text-[9px]">Beranda</span>
              </button>

              <button
                onClick={() => setCaborTab('finance')}
                className={`flex flex-col items-center gap-0.5 ${
                  caborTab === 'finance' ? 'text-sikoni-teal font-black' : 'text-sikoni-muted'
                }`}
              >
                <Coins size={18} />
                <span className="text-[9px]">Keuangan</span>
              </button>

              <button
                onClick={() => setCaborTab('submissions')}
                className={`flex flex-col items-center gap-0.5 ${
                  caborTab === 'submissions' || caborTab === 'rab-form' || caborTab === 'expense-form'
                    ? 'text-sikoni-teal font-black'
                    : 'text-sikoni-muted'
                }`}
              >
                <Send size={18} />
                <span className="text-[9px]">Pengajuan</span>
              </button>

              <button
                onClick={() => setCaborTab('lpj')}
                className={`flex flex-col items-center gap-0.5 ${
                  caborTab === 'lpj' ? 'text-sikoni-teal font-black' : 'text-sikoni-muted'
                }`}
              >
                <FileCheck size={18} />
                <span className="text-[9px]">LPJ</span>
              </button>

              <button
                onClick={() => setCaborTab('account')}
                className={`flex flex-col items-center gap-0.5 ${
                  caborTab === 'account' ? 'text-sikoni-teal font-black' : 'text-sikoni-muted'
                }`}
              >
                <User size={18} />
                <span className="text-[9px]">Akun</span>
              </button>
            </>
          )}

          {/* TAB BAR FOR: PENGURUS KONI */}
          {persona === 'pengurus' && (
            <>
              <button
                onClick={() => setPengurusTab('dashboard')}
                className={`flex flex-col items-center gap-0.5 ${
                  pengurusTab === 'dashboard' ? 'text-amber-700 font-black' : 'text-sikoni-muted'
                }`}
              >
                <Building2 size={18} />
                <span className="text-[9px]">Dashboard</span>
              </button>

              <button
                onClick={() => setPengurusTab('approval')}
                className={`flex flex-col items-center gap-0.5 ${
                  pengurusTab === 'approval' ? 'text-amber-700 font-black' : 'text-sikoni-muted'
                }`}
              >
                <CheckCircle2 size={18} />
                <span className="text-[9px]">Approval</span>
              </button>

              <button
                onClick={() => setPengurusTab('monitoring')}
                className={`flex flex-col items-center gap-0.5 ${
                  pengurusTab === 'monitoring' ? 'text-amber-700 font-black' : 'text-sikoni-muted'
                }`}
              >
                <TrendingUp size={18} />
                <span className="text-[9px]">64 Cabor</span>
              </button>

              <button
                onClick={() => setPengurusTab('kas')}
                className={`flex flex-col items-center gap-0.5 ${
                  pengurusTab === 'kas' ? 'text-amber-700 font-black' : 'text-sikoni-muted'
                }`}
              >
                <Coins size={18} />
                <span className="text-[9px]">Giro Kas</span>
              </button>

              <button
                onClick={() => setPengurusTab('profil')}
                className={`flex flex-col items-center gap-0.5 ${
                  pengurusTab === 'profil' ? 'text-amber-700 font-black' : 'text-sikoni-muted'
                }`}
              >
                <User size={18} />
                <span className="text-[9px]">Pejabat</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
