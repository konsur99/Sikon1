'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Trash2,
  Camera,
  FileUp,
  Sparkles,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { generateLpjWordDocument } from '../../lib/generateLpjWord';
import { useDisplayMode } from '../../context/DisplayModeContext';

import { Screen1_Submissions } from './screens/Screen1_Submissions';
import { Screen2_SP2D } from './screens/Screen2_SP2D';
import { Screen3_SPJReport } from './screens/Screen3_SPJReport';
import { Screen4_SubmitSuccess } from './screens/Screen4_SubmitSuccess';
import { Screen5_Notifications } from './screens/Screen5_Notifications';
import { Screen7_OcrModal } from './screens/Screen7_OcrModal';
import { Screen9_eTTE } from './screens/Screen9_eTTE';
import { Screen10_VerificationFlow } from './screens/Screen10_VerificationFlow';
import { Screen11_Milestone } from './screens/Screen11_Milestone';
import { Screen12_SkbDoc } from './screens/Screen12_SkbDoc';
import { Screen13_Archive } from './screens/Screen13_Archive';
import { Screen14_Termin3Form } from './screens/Screen14_Termin3Form';
import { Screen15_Termin3Success } from './screens/Screen15_Termin3Success';


export type UserPersona = 'publik' | 'cabor' | 'pengurus';

export interface ServiceCatalogItem {
  id: string;
  category: string;
  title: string;
  screenNum: string;
  desc: string;
  icon: string;
  gradient: string;
  isOcr?: boolean;
}

export const caborCatalog: ServiceCatalogItem[] = [
  // 1. Perencanaan
  {
    id: 'submissions',
    category: 'Perencanaan',
    screenNum: 'Layar 1',
    title: 'Portal Usulan RAB & LPJ',
    desc: 'Pengajuan proposal kegiatan, pagu operasional cabor & verifikasi RAB',
    icon: 'assignment_add',
    gradient: 'from-[#990d16] via-[#d32f2f] to-[#ff5252]',
  },
  {
    id: 'termin3',
    category: 'Perencanaan',
    screenNum: 'Layar 14',
    title: 'Pencairan Dana Termin III',
    desc: 'Formulir permohonan realisasi tahap akhir Porprov Jateng 2026',
    icon: 'send_and_archive',
    gradient: 'from-[#be123c] via-[#e11d48] to-[#fb7185]',
  },
  // 2. Pencairan Kasda
  {
    id: 'sp2d',
    category: 'Pencairan Kasda',
    screenNum: 'Layar 2',
    title: 'SP2D & Rekening Giro Kasda',
    desc: 'Bukti transfer BPKAD Surakarta, clearing Bank Jateng & buku kas cabor',
    icon: 'savings',
    gradient: 'from-[#1f2937] via-[#374151] to-[#111827]',
  },
  {
    id: 'milestone',
    category: 'Pencairan Kasda',
    screenNum: 'Layar 11',
    title: 'Milestone Kasda & SK Legalitas',
    desc: 'Lintasan 5 tahap persetujuan pencairan kasda dan validasi SK Pengkot',
    icon: 'verified_user',
    gradient: 'from-[#92400e] via-[#d97706] to-[#fbbf24]',
  },
  {
    id: 'termin3-success',
    category: 'Pencairan Kasda',
    screenNum: 'Layar 15',
    title: 'Bukti e-Termin III Berhasil',
    desc: 'Tanda terima pencairan dana tahap 3 dengan kode verifikasi sistem',
    icon: 'task_alt',
    gradient: 'from-[#065f46] via-[#059669] to-[#34d399]',
  },
  // 3. Pelaporan SPJ
  {
    id: 'lpj',
    category: 'Pelaporan SPJ',
    screenNum: 'Layar 3',
    title: 'Penyusunan SPJ Termin II',
    desc: 'Input nota kuitansi, alokasi 4 pos belanja & validasi sisa kas',
    icon: 'receipt_long',
    gradient: 'from-[#c27803] via-[#f59e0b] to-[#fbbf24]',
  },
  {
    id: 'ocr-trigger',
    category: 'Pelaporan SPJ',
    screenNum: 'Layar 7',
    title: 'Scanner OCR Struk & Nota',
    desc: 'Pindai nota otomatis menggunakan kamera AI untuk ekstraksi nilai kuitansi',
    icon: 'document_scanner',
    gradient: 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]',
    isOcr: true,
  },
  {
    id: 'submit-success',
    category: 'Pelaporan SPJ',
    screenNum: 'Layar 4',
    title: 'Konfirmasi Pengiriman e-SPJ',
    desc: 'Status berkas SPJ terkirim ke sekretariat dengan QR registrasi',
    icon: 'check_circle',
    gradient: 'from-[#15803d] via-[#16a34a] to-[#4ade80]',
  },
  // 4. Legalitas & e-TTE
  {
    id: 'ette',
    category: 'Legalitas & e-TTE',
    screenNum: 'Layar 9',
    title: 'Tanda Terima Elektronik (e-TTE)',
    desc: 'Sertifikat digital terenkripsi BSrE BSSN dengan verifikasi QR code resmi',
    icon: 'fingerprint',
    gradient: 'from-[#4338ca] via-[#6366f1] to-[#818cf8]',
  },
  {
    id: 'verification-flow',
    category: 'Legalitas & e-TTE',
    screenNum: 'Layar 10',
    title: 'Alur Verifikasi Bertingkat',
    desc: 'Tracking 3 lapis pemeriksaan: Verifikator, Bendahara & Ketua KONI',
    icon: 'fact_check',
    gradient: 'from-[#7c2d12] via-[#c2410c] to-[#f97316]',
  },
  {
    id: 'skb-doc',
    category: 'Legalitas & e-TTE',
    screenNum: 'Layar 12',
    title: 'Dokumen SKB-SPJ PDF Resmi',
    desc: 'Viewer surat keputusan bersama berkop resmi KONI dan stempel basah',
    icon: 'picture_as_pdf',
    gradient: 'from-[#047857] via-[#059669] to-[#10b981]',
  },
  // 5. Arsip & Notifikasi
  {
    id: 'archive',
    category: 'Arsip & Notifikasi',
    screenNum: 'Layar 13',
    title: 'Repositori Arsip Dokumen',
    desc: 'Arsip digital LPJ, SKB, dan kuitansi per tahun anggaran 2024–2026',
    icon: 'folder_open',
    gradient: 'from-[#334155] via-[#475569] to-[#64748b]',
  },
  {
    id: 'notifications',
    category: 'Arsip & Notifikasi',
    screenNum: 'Layar 5',
    title: 'Pusat Notifikasi & Surat Revisi',
    desc: 'Catatan perbaikan verifikator, pengumuman bimpres & status pencairan',
    icon: 'notifications_active',
    gradient: 'from-[#b91c1c] via-[#dc2626] to-[#ef4444]',
  },
  {
    id: 'home',
    category: 'Perencanaan',
    screenNum: 'Layar 0',
    title: 'Beranda Pagu Cabor & Hibah',
    desc: 'Dashboard ringkasan realisasi anggaran dan jadwal pencairan termin',
    icon: 'dashboard',
    gradient: 'from-[#990d16] via-[#d32f2f] to-[#ff5252]',
  },
];

export const publikCatalog: ServiceCatalogItem[] = [
  {
    id: 'home',
    category: 'Informasi & Berita',
    screenNum: 'Portal 1',
    title: 'Beranda Informasi Publik',
    desc: 'Portal utama keterbukaan informasi dan publikasi kegiatan KONI Surakarta',
    icon: 'home',
    gradient: 'from-[#0f172a] via-[#1e3a8a] to-[#3b82f6]',
  },
  {
    id: 'cabor-dir',
    category: 'Cabor & Atlet',
    screenNum: 'Portal 2',
    title: 'Direktori 64 Cabang Olahraga',
    desc: 'Katalog profil lengkap, alamat sekretariat, dan kontak pengurus cabor Kota Solo',
    icon: 'military_tech',
    gradient: 'from-[#065f46] via-[#059669] to-[#34d399]',
  },
  {
    id: 'transparansi',
    category: 'Transparansi Kasda',
    screenNum: 'Portal 3',
    title: 'Transparansi Realisasi APBD 2026',
    desc: 'Laporan terbuka alokasi hibah olahraga Rp 12,8 Miliar dan serapan kasda',
    icon: 'trending_up',
    gradient: 'from-[#92400e] via-[#d97706] to-[#fbbf24]',
  },
  {
    id: 'jadwal',
    category: 'Fasilitas & Jadwal',
    screenNum: 'Portal 4',
    title: 'Kalender Kejuaraan & Lomba',
    desc: 'Jadwal pertandingan resmi tingkat kota, kualifikasi pra-Porprov, dan open tournament',
    icon: 'calendar_month',
    gradient: 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]',
  },
  {
    id: 'info',
    category: 'Informasi & Berita',
    screenNum: 'Portal 5',
    title: 'Profil & Kontak KONI Surakarta',
    desc: 'Struktur kepengurusan masa bakti 2024-2028, kontak sekretariat, dan layanan warga',
    icon: 'info',
    gradient: 'from-[#3730a3] via-[#4f46e5] to-[#6366f1]',
  },
  {
    id: 'cabor-dir',
    category: 'Cabor & Atlet',
    screenNum: 'Portal 6',
    title: 'Data Prestasi Atlet & Medali',
    desc: 'Rekam jejak 124 medali emas kontingen Surakarta pada kejuaraan multi-event',
    icon: 'trophy',
    gradient: 'from-[#78350f] via-[#b45309] to-[#d97706]',
  },
  {
    id: 'jadwal',
    category: 'Fasilitas & Jadwal',
    screenNum: 'Portal 7',
    title: 'Fasilitas Stadion Manahan & Sriwedari',
    desc: 'Informasi arena olahraga bersejarah dan venue bertaraf internasional di Surakarta',
    icon: 'stadium',
    gradient: 'from-[#1e293b] via-[#334155] to-[#475569]',
  },
  {
    id: 'transparansi',
    category: 'Transparansi Kasda',
    screenNum: 'Portal 8',
    title: 'Akuntabilitas & Audit Publik',
    desc: 'Standar transparansi pelaporan keuangan daerah sesuai ketentuan BPKAD',
    icon: 'verified',
    gradient: 'from-[#15803d] via-[#16a34a] to-[#4ade80]',
  },
];

export const pengurusCatalog: ServiceCatalogItem[] = [
  {
    id: 'dashboard',
    category: 'Eksekutif & Kebijakan',
    screenNum: 'Modul 1',
    title: 'Dashboard Eksekutif Kasda',
    desc: 'Ringkasan komprehensif pagu Rp 12,8M, status SP2D, dan metrik serapan kasda',
    icon: 'dashboard',
    gradient: 'from-[#990d16] via-[#d32f2f] to-[#ff5252]',
  },
  {
    id: 'approval',
    category: 'Approval & Verifikasi',
    screenNum: 'Modul 2',
    title: 'Inbox Persetujuan Usulan & SPJ',
    desc: 'Otorisasi bertingkat persetujuan RAB, nota kuitansi SPJ termin, dan revisi',
    icon: 'fact_check',
    gradient: 'from-[#9f1239] via-[#e11d48] to-[#fb7185]',
  },
  {
    id: 'monitoring',
    category: 'Monitoring Serapan',
    screenNum: 'Modul 3',
    title: 'Monitoring Serapan 64 Cabor',
    desc: 'Pengawasan realisasi pagu, ranking ketaatan SPJ, dan sisa anggaran per cabor',
    icon: 'monitoring',
    gradient: 'from-[#065f46] via-[#059669] to-[#34d399]',
  },
  {
    id: 'kas',
    category: 'Kasda & Giro',
    screenNum: 'Modul 4',
    title: 'Rekening Giro Kasda Bank Jateng',
    desc: 'Buku kas clearing Bank Jateng, mutasi SP2D masuk, dan histori pencairan termin',
    icon: 'account_balance',
    gradient: 'from-[#1e293b] via-[#334155] to-[#475569]',
  },
  {
    id: 'profil',
    category: 'Eksekutif & Kebijakan',
    screenNum: 'Modul 5',
    title: 'Otoritas Pejabat & Audit RBAC',
    desc: 'Manajemen hak akses: Verifikator, Bendahara Kasda, dan Ketua Umum KONI',
    icon: 'admin_panel_settings',
    gradient: 'from-[#4338ca] via-[#6366f1] to-[#818cf8]',
  },
  {
    id: 'approval',
    category: 'Approval & Verifikasi',
    screenNum: 'Modul 6',
    title: 'Pemeriksaan Dokumen SKB & e-TTE',
    desc: 'Validasi tanda tangan digital tersertifikasi BSrE BSSN dan stempel basah',
    icon: 'fingerprint',
    gradient: 'from-[#7c2d12] via-[#c2410c] to-[#f97316]',
  },
  {
    id: 'monitoring',
    category: 'Monitoring Serapan',
    screenNum: 'Modul 7',
    title: 'Matriks Evaluasi Kepatuhan SPJ',
    desc: 'Laporan kepatuhan batas waktu SPJ untuk rekomendasi pencairan tahap berikutnya',
    icon: 'assessment',
    gradient: 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]',
  },
  {
    id: 'kas',
    category: 'Kasda & Giro',
    screenNum: 'Modul 8',
    title: 'Rekonsiliasi Kas BPKAD Surakarta',
    desc: 'Penyelarasan nomor SP2D dan tanggal clearing kasda dengan laporan resmi daerah',
    icon: 'receipt_long',
    gradient: 'from-[#047857] via-[#059669] to-[#10b981]',
  },
];

export const serviceCatalog = caborCatalog;

export type DeviceView = 'mobile' | 'tablet' | 'desktop';

export interface MobilePreviewProps {
  defaultDeviceView?: DeviceView;
}

export const MobilePreview: React.FC<MobilePreviewProps> = ({ defaultDeviceView }) => {
  const { isAndroid } = useDisplayMode();
  const [deviceView, setDeviceView] = useState<DeviceView>(
    defaultDeviceView || (isAndroid ? 'mobile' : 'desktop')
  );

  // Synchronize deviceView with global display mode (controlled exclusively by the bottom switcher)
  useEffect(() => {
    setDeviceView(isAndroid ? 'mobile' : 'desktop');
  }, [isAndroid]);

  // Active Persona: 'publik' | 'cabor' | 'pengurus'
  const [persona, setPersona] = useState<UserPersona>('cabor');

  // Persona-specific tab states
  const [caborTab, setCaborTab] = useState<
    | 'home'
    | 'submissions'
    | 'finance'
    | 'sp2d'
    | 'lpj'
    | 'account'
    | 'rab-form'
    | 'expense-form'
    | 'submit-success'
    | 'notifications'
    | 'ette'
    | 'verification-flow'
    | 'milestone'
    | 'skb-doc'
    | 'archive'
    | 'termin3'
    | 'termin3-success'
  >('home');
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [isAllServicesSheetOpen, setIsAllServicesSheetOpen] = useState(false);
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('Semua');
  const [serviceSearch, setServiceSearch] = useState('');
  const [isHubRibbonCollapsed, setIsHubRibbonCollapsed] = useState(false);

  const [publikTab, setPublikTab] = useState<
    'home' | 'cabor-dir' | 'transparansi' | 'jadwal' | 'info'
  >('home');

  const [pengurusTab, setPengurusTab] = useState<
    'dashboard' | 'approval' | 'monitoring' | 'kas' | 'profil'
  >('dashboard');

  // Dedicated scroll refs for all 3 personas to eliminate stuck scroll positions on tab switch
  const caborScrollRef = useRef<HTMLDivElement>(null);
  const publikScrollRef = useRef<HTMLDivElement>(null);
  const pengurusScrollRef = useRef<HTMLDivElement>(null);

  // Smooth scroll reset to top when switching tabs or screens
  useEffect(() => {
    caborScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [caborTab]);

  useEffect(() => {
    publikScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [publikTab]);

  useEffect(() => {
    pengurusScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pengurusTab]);

  useEffect(() => {
    caborScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    publikScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    pengurusScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    setServiceCategoryFilter('Semua');
    setServiceSearch('');
  }, [persona]);

  const activeCatalog = useMemo(() => {
    if (persona === 'publik') return publikCatalog;
    if (persona === 'pengurus') return pengurusCatalog;
    return caborCatalog;
  }, [persona]);

  const activeCategories = useMemo(() => {
    if (persona === 'publik') {
      return ['Semua', 'Informasi & Berita', 'Transparansi Kasda', 'Cabor & Atlet', 'Fasilitas & Jadwal'];
    }
    if (persona === 'pengurus') {
      return ['Semua', 'Eksekutif & Kebijakan', 'Approval & Verifikasi', 'Monitoring Serapan', 'Kasda & Giro'];
    }
    return ['Semua', 'Perencanaan', 'Pencairan Kasda', 'Pelaporan SPJ', 'Legalitas & e-TTE', 'Arsip & Notifikasi'];
  }, [persona]);

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

  // Interactive Mobile LPJ State (Columns / Isian)
  const [mobileLpjForm, setMobileLpjForm] = useState({
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
    closingNotes: 'Demikian LPJ ini disusun dengan penuh tanggung jawab demi kejayaan olahraga Surakarta.',
    leaderName: 'Dr. Bambang Setiawan, M.Pd.',
    secretaryName: 'Wahyu Hidayat, S.Or.',
    treasurerName: 'Siti Aminah, S.E.',
    koniLeaderName: 'Drs. H. Sri Nugroho, M.Si.',
    cityDate: 'Surakarta, 10 November 2026',
  });

  const [mobileLpjItems, setMobileLpjItems] = useState([
    { id: 1, item: 'Sewa lintasan & venue Stadion Sriwedari', proofNumber: 'KWT-01', volume: 3, unit: 'Hari', unitPrice: 3500000 },
    { id: 2, item: 'Konsumsi atlet & ofisial pertandingan', proofNumber: 'NOTA-02', volume: 180, unit: 'Paket', unitPrice: 45000 },
    { id: 3, item: 'Honor wasit & juri berlisensi nasional', proofNumber: 'KWT-03', volume: 16, unit: 'Orang', unitPrice: 400000 },
    { id: 4, item: 'Medali kejuaraan & trofi', proofNumber: 'INV-04', volume: 1, unit: 'Paket', unitPrice: 6500000 },
  ]);

  const totalMobileLpjRealization = mobileLpjItems.reduce(
    (acc, curr) => acc + curr.volume * curr.unitPrice,
    0
  );

  const handleAddMobileLpjItem = () => {
    const nextId = mobileLpjItems.length > 0 ? Math.max(...mobileLpjItems.map((i) => i.id)) + 1 : 1;
    setMobileLpjItems([
      ...mobileLpjItems,
      {
        id: nextId,
        item: 'Pengeluaran Kegiatan Tambahan',
        proofNumber: `KWT-${String(nextId).padStart(2, '0')}`,
        volume: 1,
        unit: 'Paket',
        unitPrice: 1000000,
      },
    ]);
  };

  const handleRemoveMobileLpjItem = (id: number) => {
    if (mobileLpjItems.length <= 1) {
      showToast('Minimal harus ada 1 item rincian belanja');
      return;
    }
    setMobileLpjItems(mobileLpjItems.filter((i) => i.id !== id));
  };

  const handleUpdateMobileLpjItem = (id: number, field: string, val: any) => {
    setMobileLpjItems(
      mobileLpjItems.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

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
    <div className="w-full flex flex-col items-center justify-center sm:py-6 min-h-screen sm:min-h-[calc(100vh-56px)] bg-[#0d1c2d] sm:bg-[#e9edf1]">
      {/* Top Device & Multi-Persona Selector Bar */}
      <div className="hidden sm:flex mb-3 flex-col items-center gap-2.5 max-w-6xl mx-auto w-full px-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200/90 shadow-sm">
          {/* Persona Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider hidden lg:inline">Peran:</span>
            <button
              onClick={() => { setPersona('publik'); setIsMobileNotifOpen(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                persona === 'publik' ? 'bg-sikoni-navy text-white shadow-sm' : 'text-slate-600 hover:text-onyx'
              }`}
            >
              <Users size={13} /> Publik
            </button>
            <button
              onClick={() => { setPersona('cabor'); setIsMobileNotifOpen(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                persona === 'cabor' ? 'bg-[#d32f2f] text-white shadow-sm' : 'text-slate-600 hover:text-onyx'
              }`}
            >
              <Award size={13} /> Cabor
            </button>
            <button
              onClick={() => { setPersona('pengurus'); setIsMobileNotifOpen(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                persona === 'pengurus' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-onyx'
              }`}
            >
              <Building2 size={13} /> Pengurus KONI
            </button>
          </div>

          {/* Active Persona Scope Description Pill */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className={`w-2 h-2 rounded-full ${
              persona === 'cabor' ? 'bg-[#d32f2f]' : persona === 'pengurus' ? 'bg-amber-500' : 'bg-sikoni-navy'
            }`} />
            <span className="text-slate-500 text-[11.5px] font-semibold">
              {persona === 'publik'
                ? 'Portal Publik: Keterbukaan APBD 2026, Direktori 64 Cabor, & Jadwal Lomba'
                : persona === 'cabor'
                  ? 'Portal Cabor: Pengajuan Pagu RAB, Pencairan SP2D Kasda, & e-SPJ Termin'
                  : 'Portal Pengurus: Otoritas Approval Berkas, Monitoring 64 Cabor, & Giro Kasda'}
            </span>
          </div>

          {/* Active Mode Indicator (Switch mode via bottom FloatingModeSwitcher) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-600 font-medium">Mode:</span>
            <span className="font-black text-onyx">{deviceView === 'desktop' ? '💻 Desktop Lebar' : '📱 Android Mobile'}</span>
          </div>
        </div>
      </div>

      
        {/* Screen Direct Navigator Strip (Adapts automatically to Persona Scope) */}
        <div className="w-full max-w-xl mx-auto mb-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200/90 shadow-sm transition-all">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#0f172a]">
              <span className={`w-2.5 h-2.5 rounded-full ${
                persona === 'cabor' ? 'bg-[#d32f2f]' : persona === 'pengurus' ? 'bg-amber-500' : 'bg-sikoni-navy'
              } animate-pulse`} />
              <span>
                {persona === 'cabor'
                  ? 'Stitch Screen Direct Hub (15 Layar Cabor)'
                  : persona === 'pengurus'
                    ? 'Navigasi Cepat Eksekutif Pengurus (5 Modul)'
                    : 'Navigasi Cepat Informasi Publik (5 Layanan)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`hidden sm:inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                persona === 'cabor'
                  ? 'text-red-800 bg-red-100 border-red-300'
                  : persona === 'pengurus'
                    ? 'text-amber-800 bg-amber-100 border-amber-300'
                    : 'text-sky-800 bg-sky-100 border-sky-300'
              }`}>
                {persona === 'cabor' ? 'Garuda Flame Athletic' : persona === 'pengurus' ? 'Otoritas Eksekutif' : 'Portal Publik'}
              </span>
              <button
                type="button"
                onClick={() => setIsHubRibbonCollapsed((prev) => !prev)}
                className="text-[10px] font-black text-primary hover:text-red-700 bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{isHubRibbonCollapsed ? 'Buka Menu ▼' : 'Sembunyikan ▲'}</span>
              </button>
            </div>
          </div>

          {!isHubRibbonCollapsed && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-0.5 animate-in fade-in duration-150">
              {persona === 'cabor' &&
                [
                  { id: 'home', label: '0. Beranda Cabor' },
                  { id: 'submissions', label: '1. Portal RAB & LPJ' },
                  { id: 'sp2d', label: '2. SP2D & Bukti Kas' },
                  { id: 'lpj', label: '3. SPJ Termin II' },
                  { id: 'submit-success', label: '4. e-SPJ Sukses' },
                  { id: 'notifications', label: '5. Pusat Notifikasi' },
                  { id: 'ocr-trigger', label: '7. Scan OCR Nota' },
                  { id: 'ette', label: '9. e-TTE Digital' },
                  { id: 'verification-flow', label: '10. Alur Verifikasi' },
                  { id: 'milestone', label: '11. Milestone Kasda' },
                  { id: 'skb-doc', label: '12. Dokumen SKB PDF' },
                  { id: 'archive', label: '13. Arsip SPJ' },
                  { id: 'termin3', label: '14. Termin III' },
                  { id: 'termin3-success', label: '15. e-Termin III' },
                ].map((scr) => (
                  <button
                    key={scr.id}
                    type="button"
                    onClick={() => {
                      if (scr.id === 'ocr-trigger') {
                        setIsOcrModalOpen(true);
                      } else {
                        setCaborTab(scr.id as any);
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black shrink-0 transition-all cursor-pointer active:scale-95 ${
                      caborTab === scr.id || (scr.id === 'ocr-trigger' && isOcrModalOpen)
                        ? 'bg-[#d32f2f] text-white shadow-md shadow-red-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {scr.label}
                  </button>
                ))}

              {persona === 'publik' &&
                [
                  { id: 'home', label: '1. Beranda Informasi Publik' },
                  { id: 'cabor-dir', label: '2. Direktori 64 Cabor Solo' },
                  { id: 'transparansi', label: '3. Transparansi APBD 2026' },
                  { id: 'jadwal', label: '4. Kalender Kejuaraan Kota' },
                  { id: 'info', label: '5. Profil & Kontak KONI Solo' },
                ].map((scr) => (
                  <button
                    key={scr.id}
                    type="button"
                    onClick={() => setPublikTab(scr.id as any)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black shrink-0 transition-all cursor-pointer active:scale-95 ${
                      publikTab === scr.id
                        ? 'bg-sikoni-navy text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {scr.label}
                  </button>
                ))}

              {persona === 'pengurus' &&
                [
                  { id: 'dashboard', label: '1. Dashboard Eksekutif Kasda' },
                  { id: 'approval', label: `2. Inbox Persetujuan (${approvalList.filter(a => a.status === 'Menunggu').length})` },
                  { id: 'monitoring', label: '3. Monitoring Serapan 64 Cabor' },
                  { id: 'kas', label: '4. Rekening Giro Bank Jateng' },
                  { id: 'profil', label: '5. Otoritas Pejabat & RBAC' },
                ].map((scr) => (
                  <button
                    key={scr.id}
                    type="button"
                    onClick={() => setPengurusTab(scr.id as any)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black shrink-0 transition-all cursor-pointer active:scale-95 ${
                      pengurusTab === scr.id
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {scr.label}
                  </button>
                ))}
            </div>
          )}
        </div>

      {/* Device Frame: Adapts seamlessly between Mobile (412px), Tablet (768px), and Wide Desktop (1280px) */}
      <div
        className={`bg-white transition-all duration-300 flex flex-col overflow-hidden relative mx-auto ${
          deviceView === 'mobile'
            ? 'w-full sm:w-[412px] h-[100dvh] sm:h-[840px] rounded-none sm:rounded-[44px] shadow-none sm:shadow-[0_25px_70px_rgba(20,42,67,0.3)] border-0 sm:border-[10px] sm:border-[#142a43]'
            : deviceView === 'tablet'
              ? 'w-full sm:w-[768px] h-[100dvh] sm:h-[900px] rounded-none sm:rounded-[36px] shadow-none sm:shadow-[0_25px_70px_rgba(20,42,67,0.3)] border-0 sm:border-[10px] sm:border-[#142a43]'
              : 'w-full max-w-7xl h-[calc(100dvh-120px)] min-h-[660px] rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 my-2'
        }`}
      >
        {/* Android Native Status Bar (Only visible on mobile and tablet simulation) */}
        {deviceView !== 'desktop' && (
          <div className="h-6 bg-[#142a43] text-white px-4 flex items-center justify-between text-[10px] font-bold tracking-wider select-none flex-shrink-0">
            <span>12:30</span>
            <div className="flex items-center gap-1.5 text-[9.5px]">
              <span className="text-[9px] font-black tracking-normal text-sikoni-gold">5G</span>
              <span>📶</span>
              <span>100% 🔋</span>
            </div>
          </div>
        )}

        {/* Mobile Quick Role Switcher for Android Phones */}
        <div className="sm:hidden bg-[#142a43] px-3 py-2 flex items-center justify-between gap-1.5 border-b border-white/10 flex-shrink-0 shadow-inner">
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Peran:</span>
          <div className="flex items-center gap-1 bg-black/25 p-1 rounded-xl flex-1 max-w-[280px] justify-between">
            <button
              onClick={() => { setPersona('publik'); setIsMobileNotifOpen(false); }}
              className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-black transition-all flex items-center justify-center gap-1 active:scale-95 ${persona === 'publik' ? 'bg-white text-sikoni-navy shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
            >
              <Users size={12} />
              <span>Publik</span>
            </button>
            <button
              onClick={() => { setPersona('cabor'); setIsMobileNotifOpen(false); }}
              className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-black transition-all flex items-center justify-center gap-1 active:scale-95 ${persona === 'cabor' ? 'bg-sikoni-teal text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
            >
              <Award size={12} />
              <span>Cabor</span>
            </button>
            <button
              onClick={() => { setPersona('pengurus'); setIsMobileNotifOpen(false); }}
              className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-black transition-all flex items-center justify-center gap-1 active:scale-95 ${persona === 'pengurus' ? 'bg-sikoni-gold text-sikoni-navy shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
            >
              <Building2 size={12} />
              <span>Pengurus</span>
            </button>
          </div>
        </div>

        {/* 1. TOP APP BAR & BRAND IDENTITY */}
        {(persona !== 'cabor' || caborTab === 'home' || deviceView === 'desktop') && (
          <header className={`sticky top-0 inset-x-0 z-30 pt-safe bg-surface/90 backdrop-blur-xl border-b border-outline-variant/50 ${
            deviceView === 'desktop' ? 'px-4 lg:px-6' : ''
          }`}>
            <div className="h-16 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-12 shrink-0 flex items-center justify-center p-1 rounded-2xl bg-white shadow-sm border border-outline-variant/60">
                  <img
                    alt="Logo KONI Surakarta"
                    className="h-full w-full object-contain filter drop-shadow-sm"
                    src="/images/logo_koni.png"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-md text-[15px] font-extrabold tracking-tight uppercase text-onyx leading-none">
                      KONI SURAKARTA
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  </div>
                  <span className="font-label-md text-[9.5px] uppercase tracking-[0.14em] text-on-surface-variant font-bold leading-tight mt-1 truncate">
                    {persona === 'publik'
                      ? 'PORTAL INFORMASI RESMI'
                      : persona === 'pengurus'
                        ? 'PENGURUS KONI SURAKARTA'
                        : 'KOTA SURAKARTA'}
                  </span>
                </div>
              </div>

              {/* Desktop Nav Items (when deviceView === 'desktop') */}
              {deviceView === 'desktop' && (
                <div className="hidden lg:flex items-center gap-1.5">
                  {persona === 'cabor' && (
                    <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
                      {[
                        { id: 'home', label: 'Beranda', icon: 'dashboard' },
                        { id: 'submissions', label: 'Portal RAB & LPJ', icon: 'assignment_add' },
                        { id: 'sp2d', label: 'SP2D & Kasda', icon: 'savings' },
                        { id: 'lpj', label: 'SPJ Termin II', icon: 'receipt_long' },
                        { id: 'archive', label: 'Arsip Dokumen', icon: 'folder_open' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setCaborTab(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                            caborTab === tab.id
                              ? 'bg-[#d32f2f] text-white shadow-sm'
                              : 'text-slate-600 hover:text-onyx hover:bg-white/80'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  )}

                  {persona === 'publik' && (
                    <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
                      {[
                        { id: 'home', label: 'Beranda', icon: 'home' },
                        { id: 'cabor-dir', label: 'Direktori 64 Cabor', icon: 'military_tech' },
                        { id: 'transparansi', label: 'Transparansi APBD', icon: 'trending_up' },
                        { id: 'jadwal', label: 'Jadwal Kejuaraan', icon: 'calendar_month' },
                        { id: 'info', label: 'Profil KONI', icon: 'info' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setPublikTab(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                            publikTab === tab.id
                              ? 'bg-sikoni-navy text-white shadow-sm'
                              : 'text-slate-600 hover:text-onyx hover:bg-white/80'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  )}

                  {persona === 'pengurus' && (
                    <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
                      {[
                        { id: 'dashboard', label: 'Dashboard Eksekutif', icon: 'dashboard' },
                        { id: 'approval', label: 'Inbox Persetujuan', icon: 'check_circle' },
                        { id: 'monitoring', label: 'Monitoring 64 Cabor', icon: 'monitoring' },
                        { id: 'kas', label: 'Mutasi Giro Kasda', icon: 'payments' },
                        { id: 'profil', label: 'Pejabat & RBAC', icon: 'admin_panel_settings' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setPengurusTab(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                            pengurusTab === tab.id
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-onyx hover:bg-white/80'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAllServicesSheetOpen(true)}
                  className={`hidden md:flex text-xs font-extrabold px-3 py-1.5 rounded-xl items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                    persona === 'cabor'
                      ? 'text-[#d32f2f] bg-red-50 hover:bg-red-100 border border-red-200'
                      : persona === 'pengurus'
                        ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                        : 'text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200'
                  }`}
                  title={
                    persona === 'cabor'
                      ? 'Buka Katalog 15 Layar Cabor'
                      : persona === 'pengurus'
                        ? 'Buka Katalog Eksekutif Pengurus'
                        : 'Buka Katalog Layanan Publik'
                  }
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {persona === 'publik' ? 'menu_book' : persona === 'pengurus' ? 'shield_person' : 'apps'}
                  </span>
                  <span>
                    {persona === 'cabor'
                      ? '15 Layar Cabor'
                      : persona === 'pengurus'
                        ? 'Katalog Modul'
                        : 'Katalog Publik'}
                  </span>
                </button>

                <button
                  onClick={() => setIsMobileNotifOpen((prev) => !prev)}
                  aria-label="Notifikasi"
                  className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest border border-outline-variant/60 text-onyx hover:text-primary transition-all active:scale-95 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[21px]">notifications</span>
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white animate-pulse" />
                </button>

                <div
                  onClick={() => {
                    if (persona === 'cabor') setCaborTab('account');
                    else if (persona === 'pengurus') setPengurusTab('profil');
                    else setPublikTab('info');
                  }}
                  className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-secondary-fixed via-secondary to-amber-200 shadow-sm cursor-pointer active:scale-95 transition-transform"
                  title="Profil Pengguna"
                >
                  <div className="w-full h-full rounded-full bg-onyx flex items-center justify-center text-white overflow-hidden">
                    <span className="material-symbols-outlined text-[20px] text-amber-300">person</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

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
          <div
            ref={publikScrollRef}
            className={`flex-1 overflow-y-auto overscroll-contain scroll-smooth smooth-scroll bg-[#F8F9FD] text-on-surface ${
              deviceView === 'desktop'
                ? 'p-6 lg:p-8 pb-24 space-y-6 max-w-6xl mx-auto w-full'
                : 'p-3 sm:p-4 pb-24 space-y-4'
            }`}
          >
            {/* PUBLIK: TAB 1 - BERANDA */}
            {publikTab === 'home' && (
              <div key="home" className="tab-transition-in space-y-4">
                {/* 1. HERO BANNER: KOTA SURAKARTA JUARA (ATHLETIC GARUDA FLAME) */}
                <div className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-[0_16px_36px_rgba(18,19,22,0.12)] border border-outline-variant/40">
                  <img
                    alt="Stadion Manahan Solo Athletic Track"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                    src="/images/track_manahan.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#120406] via-[#8b0000]/95 to-[#d32f2f]/85 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 carbon-pattern opacity-25" />

                  <div className="relative z-10 flex flex-col justify-between min-h-[175px]">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-amber-300 font-extrabold text-[10px] tracking-wider uppercase border border-amber-400/30 backdrop-blur-md shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>KOTA SURAKARTA JUARA • PORPROV 2026</span>
                      </div>
                      <span className="font-label-md text-[10px] uppercase tracking-wider text-white/80 font-bold">
                        64 CABOR RESMI
                      </span>
                    </div>

                    <div className="my-2">
                      <span className="font-label-md text-[11px] uppercase tracking-wider text-amber-200/90 font-bold block">
                        Prestasi Emas Surakarta
                      </span>
                      <div className="font-headline-lg text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                        124 Medali Emas
                      </div>
                      <p className="font-body-sm text-[11px] sm:text-xs text-white/85 mt-1 leading-snug">
                        88 Perak • 95 Perunggu • Rekor Juara Umum Kontingen Surakarta
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPublikTab('cabor-dir')}
                          className="px-3.5 py-1.5 rounded-xl red-flame-btn text-white font-label-md text-[11px] font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">military_tech</span>
                          <span>64 Cabor</span>
                        </button>
                        <button
                          onClick={() => setPublikTab('transparansi')}
                          className="px-3.5 py-1.5 rounded-xl gold-shimmer text-onyx font-label-md text-[11px] font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">trending_up</span>
                          <span>APBD 2026</span>
                        </button>
                      </div>
                      <button
                        onClick={() => setIsAllServicesSheetOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-label-md text-[10.5px] font-bold backdrop-blur-xs transition-colors flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Katalog Publik</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. RINGKASAN STATISTIK PUBLIK (BENTO 2-KOLOM) */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPublikTab('transparansi')}
                    className="bg-surface-container-lowest rounded-[24px] p-3.5 sm:p-4 border border-outline-variant/60 shadow-[0_8px_24px_rgba(18,19,22,0.04)] cursor-pointer hover:border-amber-400/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600">
                        <span className="material-symbols-outlined text-[18px]">account_balance</span>
                      </div>
                      <span className="font-label-md text-[9px] uppercase font-extrabold tracking-wider text-amber-800 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300/40">
                        APBD 2026
                      </span>
                    </div>
                    <div className="font-data-metric text-[16px] sm:text-[18px] font-extrabold text-onyx mt-1">
                      Rp 12,8 Miliar
                    </div>
                    <span className="font-body-sm text-[10.5px] text-on-surface-variant mt-0.5 block font-medium">
                      Serapan Kasda 68,4%
                    </span>
                  </div>

                  <div
                    onClick={() => setPublikTab('cabor-dir')}
                    className="bg-surface-container-lowest rounded-[24px] p-3.5 sm:p-4 border border-outline-variant/60 shadow-[0_8px_24px_rgba(18,19,22,0.04)] cursor-pointer hover:border-emerald-400/60 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined text-[18px]">sports</span>
                      </div>
                      <span className="font-label-md text-[9px] uppercase font-extrabold tracking-wider text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300/40">
                        ATLET AKTIF
                      </span>
                    </div>
                    <div className="font-data-metric text-[16px] sm:text-[18px] font-extrabold text-onyx mt-1">
                      1.450+ Insan Olahraga
                    </div>
                    <span className="font-body-sm text-[10.5px] text-on-surface-variant mt-0.5 block font-medium">
                      64 Cabor Terbina
                    </span>
                  </div>
                </div>

                {/* 3. 8 MENU UTAMA & KATALOG PUBLIK (GRID SQUIRCLES SINKRON CABOR) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-5 rounded-full bg-primary" />
                      <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                        Layanan & Informasi Publik
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsAllServicesSheetOpen(true)}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-md text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      <span>Lihat Semua</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* 8 Squircle 3D Tactile Grid (4 Columns on mobile, 8 Columns on widescreen desktop) */}
                  <div className={`grid gap-2 sm:gap-3 ${deviceView === 'desktop' ? 'grid-cols-4 lg:grid-cols-8' : 'grid-cols-4'}`}>
                    {/* 1. 64 Cabor */}
                    <button
                      onClick={() => setPublikTab('cabor-dir')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-emerald-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#065f46] via-[#059669] to-[#34d399] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(5,150,105,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">military_tech</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="text-[8px] font-black text-onyx">64</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        64 Cabor
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Direktori
                      </span>
                    </button>

                    {/* 2. Transparansi APBD */}
                    <button
                      onClick={() => setPublikTab('transparansi')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#c27803] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(245,158,11,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">trending_up</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-black">done</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Transparansi
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        APBD 2026
                      </span>
                    </button>

                    {/* 3. Jadwal Kejuaraan */}
                    <button
                      onClick={() => setPublikTab('jadwal')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-sky-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0369a1] via-[#0284c7] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">calendar_month</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">event</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Jadwal Lomba
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Kejuaraan Solo
                      </span>
                    </button>

                    {/* 4. Berita Terkini */}
                    <button
                      onClick={() =>
                        setSelectedMobileItem({
                          title: 'Pemkot & KONI Surakarta Salurkan Bonus Atlet Sea Games',
                          sub: 'Liputan Resmi KONI Surakarta',
                          val: 'Rp 1,4 Miliar Bonus',
                          status: 'Resmi',
                          desc: 'Pemberian apresiasi atlet dan pelatih berprestasi di Balai Kota Surakarta disaksikan Walikota dan Ketua Umum KONI Surakarta.',
                        })
                      }
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-rose-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9f1239] via-[#e11d48] to-[#fb7185] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(225,29,72,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">newspaper</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">campaign</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Kabar Solo
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Berita Atlet
                      </span>
                    </button>

                    {/* 5. 124 Medali Emas */}
                    <button
                      onClick={() =>
                        setSelectedMobileItem({
                          title: 'Rekor 124 Medali Emas Porprov Jateng XVII',
                          sub: 'Prestasi Juara Umum Kontingen Surakarta',
                          val: '124 Emas • 88 Perak • 95 Perunggu',
                          status: 'Juara',
                          desc: 'Pencapaian luar biasa 64 cabang olahraga binaan KONI Surakarta dengan torehan total 307 medali kejuaraan provinsi.',
                        })
                      }
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#78350f] via-[#b45309] to-[#d97706] flex items-center justify-center text-amber-200 shadow-[0_6px_16px_-2px_rgba(180,83,9,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-amber-300/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">trophy</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full gold-shimmer border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">star</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        124 Emas
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Porprov Jateng
                      </span>
                    </button>

                    {/* 6. Fasilitas Manahan & Sriwedari */}
                    <button
                      onClick={() =>
                        setSelectedMobileItem({
                          title: 'Kawasan Olahraga Bersejarah Surakarta',
                          sub: 'Heritage Sriwedari & Kompleks Manahan',
                          val: 'Fasilitas Standar Internasional',
                          status: 'Aktif',
                          desc: 'Stadion Sriwedari sebagai tempat PON I 1948 dan Stadion Manahan bertaraf internasional sebagai pusat pembinaan olahraga prestasi Kota Surakarta.',
                        })
                      }
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-slate-500/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1f2937] via-[#374151] to-[#4b5563] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(55,65,81,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">stadium</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">place</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Fasilitas
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Manahan Solo
                      </span>
                    </button>

                    {/* 7. Profil KONI */}
                    <button
                      onClick={() => setPublikTab('info')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-indigo-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3730a3] via-[#4f46e5] to-[#6366f1] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(79,70,229,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">info</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-bold">check</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Profil KONI
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Sekretariat
                      </span>
                    </button>

                    {/* 8. Semua Menu (Katalog Publik) */}
                    <button
                      onClick={() => setIsAllServicesSheetOpen(true)}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-gradient-to-b from-sky-50 to-blue-50/60 rounded-2xl border border-sky-300/80 shadow-xs hover:border-sky-400 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0369a1] via-[#0284c7] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/60">
                        <span className="material-symbols-outlined text-[24px] text-white font-bold drop-shadow-xs">menu_book</span>
                        <div className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-sikoni-navy text-white text-[8.5px] font-black border border-white shadow-xs">
                          8
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-sky-950 leading-tight line-clamp-1">
                        Katalog Publik
                      </span>
                      <span className="font-body-sm text-[9px] text-sky-800 font-bold mt-0.5 line-clamp-1">
                        Semua Info
                      </span>
                    </button>
                  </div>
                </div>

                {/* 4 & 5: WIDESCREEN 2-COLUMN LAYOUT ON DESKTOP, STACKED ON MOBILE */}
                <div className={deviceView === 'desktop' ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start' : 'space-y-4'}>
                  {/* Left Column (7 cols): Kejuaraan Terdekat & Berita Olahraga */}
                  <div className={deviceView === 'desktop' ? 'lg:col-span-7 space-y-4' : 'space-y-4'}>
                    {/* Upcoming Events Feed */}
                    <div className="bg-surface-container-lowest rounded-[28px] p-5 shadow-[0_8px_24px_rgba(18,19,22,0.04)] border border-outline-variant/60">
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-secondary" />
                          <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                            Kejuaraan Terdekat di Solo
                          </h2>
                        </div>
                        <button
                          onClick={() => setPublikTab('jadwal')}
                          className="font-label-md text-[11px] uppercase text-primary font-extrabold hover:underline flex items-center gap-0.5 tracking-wider"
                        >
                          Semua
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div
                          onClick={() =>
                            setSelectedMobileItem({
                              title: 'Kejuaraan Atletik Antar Pelajar Surakarta 2026',
                              sub: '15 November 2026 • Stadion Sriwedari Solo',
                              val: 'Nomor Lari 100m, 400m, Estafet',
                              status: 'Terbuka',
                              desc: 'Penyelenggaraan seleksi atletik tingkat pelajar se-Surakarta untuk pembinaan bibit atlet Porprov 2026. Tiket masuk gratis untuk masyarakat umum.',
                            })
                          }
                          className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-start gap-3 cursor-pointer hover:border-amber-400/60 transition-colors shadow-xs"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-700 flex-shrink-0 flex flex-col items-center justify-center font-black text-xs border border-emerald-300/40 shadow-xs">
                            <span className="text-[13px] font-black leading-none">15</span>
                            <span className="text-[8px] font-bold tracking-wider uppercase">NOV</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <b className="font-title-md text-[13px] text-onyx block leading-tight font-bold truncate">
                              Kejuaraan Atletik Antar Pelajar Solo
                            </b>
                            <span className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-1 truncate">
                              <span className="material-symbols-outlined text-[13px] text-primary">stadium</span>
                              Stadion Sriwedari • KONI Surakarta
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant self-center">
                            chevron_right
                          </span>
                        </div>

                        <div
                          onClick={() =>
                            setSelectedMobileItem({
                              title: 'Turnamen Bola Voli Walikota Cup 2026',
                              sub: '22 November 2026 • GOR Manahan Solo',
                              val: '32 Tim Pelajar & Klub',
                              status: 'Terbuka',
                              desc: 'Turnamen tahunan memperebutkan Piala Bergilir Walikota Surakarta dengan partisipasi klub voli resmi binaan PBVSI Solo.',
                            })
                          }
                          className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-start gap-3 cursor-pointer hover:border-amber-400/60 transition-colors shadow-xs"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-800 flex-shrink-0 flex flex-col items-center justify-center font-black text-xs border border-amber-300/40 shadow-xs">
                            <span className="text-[13px] font-black leading-none">22</span>
                            <span className="text-[8px] font-bold tracking-wider uppercase">NOV</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <b className="font-title-md text-[13px] text-onyx block leading-tight font-bold truncate">
                              Turnamen Bola Voli Walikota Cup
                            </b>
                            <span className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-1 truncate">
                              <span className="material-symbols-outlined text-[13px] text-amber-600">sports_volleyball</span>
                              GOR Manahan Solo • PBVSI Surakarta
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant self-center">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Latest News Feed */}
                    <div className="bg-surface-container-lowest rounded-[28px] p-5 shadow-[0_8px_24px_rgba(18,19,22,0.04)] border border-outline-variant/60">
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-primary" />
                          <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                            Kabar Olahraga Surakarta
                          </h2>
                        </div>
                        <span className="font-label-md text-[10px] uppercase tracking-wider text-primary font-bold">
                          TERBARU
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          setSelectedMobileItem({
                            title: 'Pemkot & KONI Surakarta Salurkan Bonus Atlet Berprestasi',
                            sub: 'Penyerahan Resmi di Balai Kota Solo',
                            val: 'Total Bonus Rp 1,4 Miliar',
                            status: 'Resmi',
                            desc: 'Apresiasi tertinggi dari Pemerintah Kota Surakarta dan KONI kepada para atlet peraih medali kejuaraan nasional dan internasional tahun 2026.',
                          })
                        }
                        className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/60 shadow-xs space-y-2 cursor-pointer hover:border-primary/50 transition-colors border-l-4 border-l-primary"
                      >
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9.5px] font-bold">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          Apresiasi Atlet
                        </span>
                        <h3 className="font-title-md text-[13px] font-bold text-onyx leading-snug">
                          Pemkot dan KONI Surakarta Salurkan Bonus Atlet Berprestasi SEA Games
                        </h3>
                        <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                          Total bonus sebesar Rp 1,4 Miliar diserahkan secara simbolis di Balai Kota Surakarta untuk memicu semangat Porprov 2026.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (5 cols): Sorotan Atlet & Fasilitas Solo (Matching Cabor) */}
                  <div className={deviceView === 'desktop' ? 'lg:col-span-5 space-y-4' : 'space-y-3'}>
                    {/* Banner Prestasi Juara */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-onyx via-[#221013] to-onyx rounded-[24px] p-4 text-white shadow-lg border border-amber-400/30">
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/25 rounded-full blur-2xl pointer-events-none" />
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-2xl ring-2 ring-amber-400 overflow-hidden shrink-0 shadow-md">
                          <img
                            alt="Sprinter Atletik Surakarta"
                            className="w-full h-full object-cover object-top"
                            src="/images/sprinter_solo.jpg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-0.5">
                            <span className="material-symbols-outlined text-[13px]">military_tech</span>
                            <span className="font-label-md text-[9.5px] uppercase font-bold tracking-wider">
                              TARGET EMAS PORPROV
                            </span>
                          </div>
                          <h3 className="font-headline-md text-[16px] font-black text-white leading-tight truncate">
                            1.450+ Atlet Solo Siap
                          </h3>
                          <p className="font-body-sm text-[11px] text-white/80 truncate">
                            Pembinaan terpusat di Kompleks Manahan & Sriwedari.
                          </p>
                        </div>
                        <button
                          onClick={() => setPublikTab('cabor-dir')}
                          className="shrink-0 px-3 py-2 rounded-xl gold-shimmer text-onyx font-label-md text-[11px] uppercase font-black shadow-md active:scale-95 transition-transform"
                        >
                          Cabor
                        </button>
                      </div>
                    </div>

                    {/* Dual Photo Cards: Kawasan Sriwedari & Manahan */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-amber-400" />
                        <h2 className="font-headline-md text-[17px] font-extrabold text-onyx tracking-tight">
                          Sorotan Atlet & Fasilitas Solo
                        </h2>
                      </div>
                      <span className="font-label-md text-[10.5px] uppercase text-primary font-bold tracking-wider">
                        Prestasi
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Card 1: Pelatnas Porprov */}
                      <div
                        onClick={() =>
                          setSelectedMobileItem({
                            title: 'Pemusatan Latihan Atlet Solo 2026',
                            sub: 'Nomor Sprint, Lompat, dan Lempar',
                            val: '64 Cabang Olahraga',
                            status: 'Aktif',
                            desc: 'Pemusatan latihan daerah atlet Surakarta di Stadion Manahan dengan target merebut predikat Juara Umum Porprov Jateng.',
                          })
                        }
                        className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 flex flex-col group cursor-pointer"
                      >
                        <div className="relative h-28 w-full overflow-hidden">
                          <img
                            alt="Pelatnas Porprov Atletik Solo"
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            src="/images/sprinter_solo.jpg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-white font-label-md text-[9px] font-extrabold tracking-wider uppercase shadow-sm">
                            Atletik Solo
                          </span>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-title-md text-[13px] font-bold text-onyx leading-tight line-clamp-1">
                              Pelatnas Atlet Solo
                            </h3>
                            <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">
                              Stadion Manahan
                            </p>
                          </div>
                          <div className="mt-2 pt-1 border-t border-outline-variant/50 flex items-center justify-between text-primary font-label-md text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">military_tech</span>Emas
                            </span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Sriwedari Heritage */}
                      <div
                        onClick={() =>
                          setSelectedMobileItem({
                            title: 'Kawasan Olahraga Bersejarah Surakarta',
                            sub: 'Heritage Sriwedari & Kompleks Manahan',
                            val: 'Fasilitas Standar Internasional',
                            status: 'Aktif',
                            desc: 'Stadion Sriwedari sebagai tempat PON I 1948 dan Stadion Manahan bertaraf internasional sebagai pusat pembinaan olahraga prestasi Kota Surakarta.',
                          })
                        }
                        className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 flex flex-col group cursor-pointer"
                      >
                        <div className="relative h-28 w-full overflow-hidden">
                          <img
                            alt="Stadion Sriwedari dan Kawasan Manahan Solo"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src="/images/sriwedari_manahan.jpg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-400 text-onyx font-label-md text-[9px] font-extrabold tracking-wider uppercase shadow-sm">
                            Heritage Solo
                          </span>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-title-md text-[13px] font-bold text-onyx leading-tight line-clamp-1">
                              Kota Atlet & Budaya
                            </h3>
                            <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">
                              Sriwedari & Manahan
                            </p>
                          </div>
                          <div className="mt-2 pt-1 border-t border-outline-variant/50 flex items-center justify-between text-secondary-dark font-label-md text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">stadium</span>Kawasan
                            </span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PUBLIK: TAB 2 - DIREKTORI CABOR */}
            {publikTab === 'cabor-dir' && (
              <div key="cabor-dir" className="tab-transition-in space-y-3">
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
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-bold transition-all ${caborCategory === cat
                        ? 'bg-sikoni-navy text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Cabor List: Responsive Grid on Desktop, Stack on Mobile */}
                <div className={`grid gap-2.5 ${deviceView === 'desktop' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
              <div key="transparansi" className="tab-transition-in space-y-3">
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
              <div key="jadwal" className="tab-transition-in space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Kalender Kompetisi</div>
                  <h2 className="text-lg font-black text-sikoni-navy tracking-tight">
                    Jadwal Kejuaraan Kota
                  </h2>
                </div>

                <div className={`grid gap-2.5 text-xs ${deviceView === 'desktop' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Mendatang • 15 Nov 2026
                    </span>
                    <b className="text-xs text-sikoni-navy block">
                      Kejuaraan Daerah Atletik Pelajar Solo
                    </b>
                    <p className="text-[10.5px] text-slate-500">
                      Diselenggarakan oleh KONI Surakarta bersama Pengcab di Stadion Sriwedari. Terbuka untuk umum.
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
              <div key="info" className="tab-transition-in space-y-3">
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
          <div
            ref={caborScrollRef}
            className={`flex-1 overflow-y-auto overscroll-contain scroll-smooth smooth-scroll bg-[#F8F9FD] ${
              caborTab === 'home'
                ? deviceView === 'desktop'
                  ? 'p-6 lg:p-8 pb-24 space-y-6 max-w-6xl mx-auto w-full'
                  : 'p-4 pb-24 space-y-4'
                : 'p-0 pb-16'
            }`}
          >
            {/* CABOR: TAB 1 - BERANDA (GARUDA FLAME ATHLETIC - 100% PERSIS STITCH) */}
            {caborTab === 'home' && (
              <div key="home" className="tab-transition-in space-y-4 pb-12">
                {/* 2. HERO BANNER CABOR "KONI SURAKARTA" */}
                <div>
                  <div className="relative w-full overflow-hidden rounded-[28px] shadow-[0_18px_36px_-10px_rgba(139,0,0,0.45)] p-5 text-white border border-amber-400/30">
                    {/* Background Athletic Photo */}
                    <img
                      alt="Stadion Manahan Solo Athletic Track"
                      className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                      src="/images/track_manahan.jpg"
                    />
                    {/* Obsidian to Crimson Flame Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#120406] via-[#8b0000]/90 to-[#d32f2f]/80 backdrop-blur-[1px]" />
                    <div className="absolute inset-0 carbon-pattern opacity-25" />
                    {/* Banner Header Meta */}
                    <div className="relative z-10 flex items-center justify-between mb-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-amber-300/40 shadow-inner">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="font-label-md text-[10px] tracking-widest uppercase text-amber-300 font-bold">
                          HIBAH APBD 2025 TERVERIFIKASI
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                        <span className="material-symbols-outlined text-[13px] text-amber-300">verified</span>
                        <span className="font-label-md text-[9.5px] font-extrabold uppercase tracking-widest text-white">
                          KONI SOLO
                        </span>
                      </div>
                    </div>
                    {/* Title & Cabor Identity */}
                    <div className="relative z-10 mb-4">
                      <div className="inline-flex items-center gap-1.5 text-amber-300/90 font-label-md text-[11px] font-bold uppercase tracking-[0.2em]">
                        <span className="material-symbols-outlined text-[14px]">sports_score</span>
                        CABOR ATLETIK RESMI
                      </div>
                      <h1 className="font-headline-lg text-[30px] font-black tracking-tight text-white leading-tight mt-0.5 drop-shadow-md">
                        KONI SURAKARTA
                      </h1>
                      <p className="font-body-sm text-[12px] text-white/90 mt-1 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[15px] text-amber-400">location_on</span>
                        Basis Pembinaan: Stadion Manahan & Stadion Sriwedari
                      </p>
                    </div>
                    {/* Quick Action Buttons 3D */}
                    <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={() => setCaborTab('rab-form')}
                        className="gold-shimmer py-3 px-3.5 rounded-2xl shadow-[0_8px_18px_rgba(255,168,0,0.45)] border-t border-white/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-onyx font-label-lg text-[12.5px] uppercase font-black tracking-wide"
                      >
                        <span className="material-symbols-outlined text-[20px] font-black">add_circle</span>
                        + Buat RAB Baru
                      </button>
                      <button
                        onClick={() => showToast('Membuka Juknis Hibah Olahraga KONI Surakarta 2026...')}
                        className="py-3 px-3.5 rounded-2xl bg-white/15 hover:bg-white/20 backdrop-blur-md border border-amber-300/40 text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-label-lg text-[12.5px] uppercase font-bold tracking-wide shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px] text-amber-300">menu_book</span>
                        Juknis & Panduan
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. FLOATING STATUS ALERT (URGENT REVISION PILL) */}
                <div>
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#9b0b14] via-[#c62828] to-[#d32f2f] rounded-2xl p-3 shadow-[0_6px_20px_rgba(198,40,40,0.28)] border-l-4 border-amber-400">
                    <div className="absolute inset-0 carbon-pattern opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 text-amber-300">
                          <span className="material-symbols-outlined text-[20px] animate-pulse">warning</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-label-md text-[10px] uppercase font-extrabold tracking-wider text-amber-300">
                              PERLU REVISI SEGERA
                            </span>
                            <span className="font-body-sm text-[10px] text-white/80 font-medium">· Batas 18 Mei</span>
                          </div>
                          <p className="font-body-sm text-[12px] font-semibold text-white truncate leading-tight mt-0.5">
                            RAB Pra-Porprov Atletik (Koreksi Uang Saku)
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCaborTab('notifications')}
                        className="shrink-0 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-onyx font-label-md text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-0.5 shadow-sm active:scale-95 transition-transform"
                      >
                        Perbaiki
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. REALISASI ANGGARAN DANA HIBAH (GAUGE FUTURISTIK & LUXURY BENTO) */}
                <div>
                  <div className="bg-surface-container-lowest rounded-[28px] p-5 shadow-[0_12px_32px_rgba(18,19,22,0.05)] border border-outline-variant/60 relative overflow-hidden">
                    {/* Glow ambient background */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    {/* Card Title */}
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary via-secondary to-amber-300" />
                        <h2 className="font-headline-md text-[17px] font-extrabold text-onyx tracking-tight">
                          Realisasi Dana Hibah
                        </h2>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-md text-[10px] uppercase font-bold text-on-surface-variant flex items-center gap-1.5 border border-outline-variant/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        T.A. 2025
                      </span>
                    </div>
                    {/* Cyber Athletic Neon Arc Gauge */}
                    <div className="relative flex flex-col items-center justify-center pt-1 pb-2 z-10">
                      <div className="relative w-64 h-36 flex items-center justify-center">
                        <svg className="w-64 h-36 overflow-visible drop-shadow-sm" viewBox="0 0 200 115">
                          <defs>
                            <linearGradient id="cyberGauge" x1="0%" x2="100%" y1="100%" y2="0%">
                              <stop offset="0%" stopColor="#e53935" />
                              <stop offset="50%" stopColor="#ff9800" />
                              <stop offset="100%" stopColor="#ffc107" />
                            </linearGradient>
                            <filter height="150%" id="neonGlow" width="150%" x="-25%" y="-25%">
                              <feDropShadow dx="0" dy="2" floodColor="#ff9800" floodOpacity="0.5" stdDeviation="4" />
                            </filter>
                          </defs>
                          {/* Background Arc Track */}
                          <path
                            d="M 24 105 A 76 76 0 0 1 176 105"
                            fill="none"
                            opacity="0.3"
                            stroke="#cbd5e1"
                            strokeLinecap="round"
                            strokeWidth="14"
                          />
                          {/* Futuristic Ticks Arc */}
                          <path
                            d="M 24 105 A 76 76 0 0 1 176 105"
                            fill="none"
                            opacity="0.4"
                            stroke="#8f6f6c"
                            strokeDasharray="2 7"
                            strokeWidth="2"
                          />
                          {/* Glowing Filled Arc (60% of ~238.7 length = offset ~95.5) */}
                          <path
                            d="M 24 105 A 76 76 0 0 1 176 105"
                            fill="none"
                            filter="url(#neonGlow)"
                            stroke="url(#cyberGauge)"
                            strokeDasharray="238.7"
                            strokeDashoffset="95.5"
                            strokeLinecap="round"
                            strokeWidth="14"
                          />
                          {/* Indicator Needle Dot at ~60% arc position (around 108 deg) */}
                          <circle
                            className="drop-shadow-lg"
                            cx="127"
                            cy="34"
                            fill="#ffffff"
                            r="7"
                            stroke="#ffc107"
                            strokeWidth="3.5"
                          />
                          <circle cx="127" cy="34" fill="#d32f2f" r="2.5" />
                        </svg>
                        {/* Center Floating Badge */}
                        <div className="absolute bottom-2 flex flex-col items-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-onyx to-[#2b080d] text-white shadow-md border border-amber-400/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            <span className="font-data-metric text-[22px] font-black text-amber-300 leading-none">
                              60%
                            </span>
                            <span className="font-label-md text-[10px] tracking-wider uppercase font-bold text-white/90">
                              TERSERAP
                            </span>
                          </div>
                          <span className="font-label-md text-[9.5px] uppercase tracking-widest text-on-surface-variant font-bold mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-amber-500">speed</span>
                            REAL-TIME SYNC
                          </span>
                        </div>
                      </div>
                      {/* Main Nominal */}
                      <div className="w-full text-center mt-1">
                        <span className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                          Total Dana Dicairkan
                        </span>
                        <div className="font-data-metric text-[30px] text-primary font-black tracking-tight leading-none mt-1">
                          Rp 72.000.000
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/60 mt-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-dark" />
                          <span className="font-body-sm text-[11px] text-on-surface-variant">
                            Pagu Tahunan: <strong className="text-onyx font-bold">Rp 120.000.000</strong> (T.A. 2025)
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Bento Satelite Cards */}
                    <div className="grid grid-cols-2 gap-3 pt-3.5 mt-2 border-t border-outline-variant/50 relative z-10">
                      {/* Bento 1: Sisa Kas */}
                      <div
                        onClick={() => setCaborTab('finance')}
                        className="relative overflow-hidden bg-gradient-to-br from-amber-50/60 to-surface-container-low p-3.5 rounded-2xl border border-amber-300/40 shadow-xs cursor-pointer hover:border-amber-400 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600">
                            <span className="material-symbols-outlined text-[17px]">account_balance_wallet</span>
                          </div>
                          <span className="font-label-md text-[9px] uppercase font-extrabold tracking-wider text-amber-700 px-2 py-0.5 rounded-full bg-amber-200/50">
                            SISA KAS
                          </span>
                        </div>
                        <div className="font-data-metric text-[17px] font-extrabold text-onyx mt-1">
                          Rp 48.000.000
                        </div>
                        <span className="font-body-sm text-[10.5px] text-on-surface-variant mt-0.5 block font-medium">
                          Alokasi Smt. 2 (40%)
                        </span>
                      </div>
                      {/* Bento 2: Target Realisasi */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/60 to-surface-container-low p-3.5 rounded-2xl border border-rose-300/40 shadow-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[17px]">trending_up</span>
                          </div>
                          <span className="font-label-md text-[9px] uppercase font-extrabold tracking-wider text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300/40">
                            +10% Ahead
                          </span>
                        </div>
                        <div className="font-data-metric text-[17px] font-extrabold text-onyx mt-1">
                          50% <span className="text-[12px] font-medium text-on-surface-variant">Target Smt 1</span>
                        </div>
                        <span className="font-body-sm text-[10.5px] text-emerald-700 mt-0.5 flex items-center gap-1 font-semibold">
                          <span className="material-symbols-outlined text-[13px]">check_circle</span> Tercapai Aman
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. 8 MENU UTAMA & KATALOG SEMUA LAYANAN (GRID 4x2 ATHLETIC SQUIRCLES) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-5 rounded-full bg-primary" />
                      <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                        Layanan Administrasi Cabor
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsAllServicesSheetOpen(true)}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-md text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                      <span>Lihat Semua</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* 8 Squircle 3D Tactile Grid (4 Columns on mobile, 8 Columns on widescreen desktop) */}
                  <div className={`grid gap-2 sm:gap-3 ${deviceView === 'desktop' ? 'grid-cols-4 lg:grid-cols-8' : 'grid-cols-4'}`}>
                    {/* 1. Ajukan RAB */}
                    <button
                      onClick={() => setCaborTab('submissions')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-primary/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#990d16] via-[#d32f2f] to-[#ff5252] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(211,47,47,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">note_add</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full gold-shimmer border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-black">add</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Ajukan RAB
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Proposal
                      </span>
                    </button>

                    {/* 2. SPJ Kegiatan */}
                    <button
                      onClick={() => setCaborTab('lpj')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#c27803] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(245,158,11,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">receipt_long</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-black">done</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        SPJ Kegiatan
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Kwitansi
                      </span>
                    </button>

                    {/* 3. Scan OCR Nota */}
                    <button
                      onClick={() => setIsOcrModalOpen(true)}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-sky-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0369a1] via-[#0284c7] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">document_scanner</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">photo_camera</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Scan OCR
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Foto Nota
                      </span>
                    </button>

                    {/* 4. Buku Kas & SP2D */}
                    <button
                      onClick={() => setCaborTab('sp2d')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#374151] via-[#1f2937] to-[#111827] flex items-center justify-center text-amber-400 shadow-[0_6px_16px_-2px_rgba(31,41,55,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-amber-300/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">savings</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full gold-shimmer border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">payments</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Buku Kas
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Mutasi SP2D
                      </span>
                    </button>

                    {/* 5. SKB Dokumen */}
                    <button
                      onClick={() => setCaborTab('skb-doc')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-emerald-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#065f46] via-[#059669] to-[#34d399] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(5,150,105,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">picture_as_pdf</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">check</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        SKB PDF
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Legalitas
                      </span>
                    </button>

                    {/* 6. e-TTE Digital */}
                    <button
                      onClick={() => setCaborTab('ette')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-indigo-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4338ca] via-[#6366f1] to-[#818cf8] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(99,102,241,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">fingerprint</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-bold">shield</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        e-TTE BSrE
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Tanda Tangan
                      </span>
                    </button>

                    {/* 7. Pencairan T-III */}
                    <button
                      onClick={() => setCaborTab('termin3')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-rose-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9f1239] via-[#e11d48] to-[#fb7185] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(225,29,72,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">send_and_archive</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">forward</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Termin III
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Pencairan
                      </span>
                    </button>

                    {/* 8. Semua Layanan (15 Layar) */}
                    <button
                      onClick={() => setIsAllServicesSheetOpen(true)}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-gradient-to-b from-amber-50 to-orange-50/60 rounded-2xl border border-amber-300/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d97706] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-slate-900 shadow-[0_6px_16px_-2px_rgba(245,158,11,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/60">
                        <span className="material-symbols-outlined text-[24px] text-slate-900 font-bold drop-shadow-xs">apps</span>
                        <div className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-[#d32f2f] text-white text-[8.5px] font-black border border-white shadow-xs">
                          15
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-amber-950 leading-tight line-clamp-1">
                        Semua Menu
                      </span>
                      <span className="font-body-sm text-[9px] text-amber-800 font-bold mt-0.5 line-clamp-1">
                        15 Layar
                      </span>
                    </button>
                  </div>
                </div>

                {/* 6 & 7: WIDESCREEN 2-COLUMN LAYOUT ON DESKTOP, STACKED ON MOBILE */}
                <div className={deviceView === 'desktop' ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start' : 'space-y-4'}>
                  {/* 6. LINTASAN BERKAS TERKINI (ATHLETIC TIMELINE) */}
                  <div className={deviceView === 'desktop' ? 'lg:col-span-7' : ''}>
                    <div className="bg-surface-container-lowest rounded-[28px] p-5 shadow-[0_8px_24px_rgba(18,19,22,0.04)] border border-outline-variant/60">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-secondary" />
                          <h2 className="font-headline-md text-[17px] font-extrabold text-onyx tracking-tight">
                            Lintasan Berkas Terkini
                          </h2>
                        </div>
                        <button
                          onClick={() => setCaborTab('submissions')}
                          className="font-label-md text-[11px] uppercase text-primary font-extrabold hover:underline flex items-center gap-0.5 tracking-wider"
                        >
                          Semua
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </button>
                      </div>
                      {/* Timeline Track */}
                      <div className="relative pl-6 space-y-3.5">
                        {/* Visual Running Track Line */}
                        <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-400 via-primary to-surface-container-high" />
                        {/* Track 1: Dalam Review Verifikator */}
                        <div
                          onClick={() =>
                            setSelectedMobileItem({
                              title: 'RAB Pemusatan Latihan Atletik (TC Porprov 2026)',
                              sub: '12 Mei 2025 • Usulan Cabor',
                              val: 'Rp 35.000.000',
                              status: 'Verifikasi',
                              desc: 'Proposal usulan TC intensif atlet Porprov Surakarta. Saat ini dalam antrean verifikasi teknis oleh tim verifikasi KONI Surakarta.',
                            })
                          }
                          className="relative cursor-pointer group"
                        >
                          <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-md">
                            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                          </div>
                          <div className="bg-surface-container-low rounded-2xl p-3.5 border border-outline-variant/40 shadow-xs group-hover:border-amber-400/60 transition-colors">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-label-md text-[9.5px] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/40 font-extrabold tracking-wider">
                                DALAM REVIEW VERIFIKATOR
                              </span>
                              <span className="font-body-sm text-[10.5px] text-on-surface-variant font-medium">12 Mei 2025</span>
                            </div>
                            <h3 className="font-title-md text-[13.5px] font-bold text-onyx leading-snug mt-1">
                              RAB Pemusatan Latihan Atletik (TC Porprov 2026)
                            </h3>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/40 text-[11px] text-on-surface-variant">
                              <span>
                                Nominal Usulan: <strong className="text-onyx font-bold">Rp 35.000.000</strong>
                              </span>
                              <span className="flex items-center gap-1 text-amber-700 font-semibold">
                                <span className="material-symbols-outlined text-[13px]">hourglass_top</span> Tim Verifikasi KONI
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Track 2: Disetujui & Siap Cair */}
                        <div
                          onClick={() =>
                            setSelectedMobileItem({
                              title: 'LPJ Kejurda Atletik Solo Open 2025',
                              sub: '08 Mei 2025 • LPJ Sah',
                              val: 'Rp 25.000.000',
                              status: 'Disetujui',
                              desc: 'Berkas kuitansi, absensi, dan laporan teknis telah lengkap dan diverifikasi sah oleh BPKAD & Bendahara KONI Surakarta.',
                            })
                          }
                          className="relative cursor-pointer group"
                        >
                          <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-md">
                            <span className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-white text-[8px] font-bold">
                              ✓
                            </span>
                          </div>
                          <div className="bg-surface-container-low rounded-2xl p-3.5 border border-outline-variant/40 shadow-xs group-hover:border-emerald-400/60 transition-colors">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-label-md text-[9.5px] uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/40 font-extrabold tracking-wider">
                                DISETUJUI & SIAP CAIR
                              </span>
                              <span className="font-body-sm text-[10.5px] text-on-surface-variant font-medium">08 Mei 2025</span>
                            </div>
                            <h3 className="font-title-md text-[13.5px] font-bold text-onyx leading-snug mt-1">
                              LPJ Kejurda Atletik Solo Open 2025
                            </h3>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/40 text-[11px] text-on-surface-variant">
                              <span>
                                Terealisasi: <strong className="text-onyx font-bold">Rp 25.000.000</strong>
                              </span>
                              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                                <span className="material-symbols-outlined text-[13px]">done_all</span> Arsip Lengkap
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Real-time Synchronization Ribbon */}
                      <div className="mt-4 pt-2.5 flex items-center justify-between bg-surface-container rounded-xl px-3 py-2 text-on-surface-variant border border-outline-variant/50">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="font-body-sm text-[11px] truncate font-medium">
                            Terhubung langsung ke Sekretariat KONI Solo - Stadion Manahan
                          </span>
                        </div>
                        <button
                          onClick={() => showToast('Sinkronisasi data real-time dengan Sekretariat KONI Solo berhasil!')}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors shrink-0"
                        >
                          <span className="material-symbols-outlined text-[16px]">sync</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 7. BANNER PRESTASI & SOROTAN ATLET */}
                  <div className={deviceView === 'desktop' ? 'lg:col-span-5 space-y-4' : 'space-y-3'}>
                    {/* Moment of Delight: Target Emas Porprov */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-onyx via-[#221013] to-onyx rounded-[24px] p-4 text-white shadow-lg border border-amber-400/30">
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/25 rounded-full blur-2xl pointer-events-none" />
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-2xl ring-2 ring-amber-400 overflow-hidden shrink-0 shadow-md">
                          <img
                            alt="Sprinter Atletik Surakarta"
                            className="w-full h-full object-cover object-top"
                            src="/images/sprinter_solo.jpg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-0.5">
                            <span className="material-symbols-outlined text-[13px]">military_tech</span>
                            <span className="font-label-md text-[9.5px] uppercase font-bold tracking-wider">
                              TARGET EMAS PORPROV
                            </span>
                          </div>
                          <h3 className="font-headline-md text-[16px] font-black text-white leading-tight truncate">
                            3 Atlet Lolos Seleksi
                          </h3>
                          <p className="font-body-sm text-[11px] text-white/80 truncate">
                            Nomor Lari 100m, 400m, dan Lompat Jauh Putra.
                          </p>
                        </div>
                        <button
                          onClick={() => setCaborTab('account')}
                          className="shrink-0 px-3 py-2 rounded-xl gold-shimmer text-onyx font-label-md text-[11px] uppercase font-black shadow-md active:scale-95 transition-transform"
                        >
                          Profil
                        </button>
                      </div>
                    </div>
                    {/* Dual Photo Highlight: Pelatnas & Fasilitas Solo */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-primary to-amber-400" />
                        <h2 className="font-headline-md text-[17px] font-extrabold text-onyx tracking-tight">
                          Sorotan Atlet & Fasilitas Solo
                        </h2>
                      </div>
                      <span className="font-label-md text-[10.5px] uppercase text-primary font-bold tracking-wider">
                        Prestasi
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Card 1: Pelatnas Porprov 2026 */}
                      <div
                        onClick={() =>
                          setSelectedMobileItem({
                            title: 'Pelatnas Porprov 2026 — Atletik Surakarta',
                            sub: 'Nomor Sprint 100m, 200m, 400m',
                            val: '38 Atlet Terbina',
                            status: 'Aktif',
                            desc: 'Pemusatan latihan daerah atlet sprint Surakarta di Stadion Manahan dengan target merebut minimal 8 Medali Emas Porprov Jateng.',
                          })
                        }
                        className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 flex flex-col group cursor-pointer"
                      >
                        <div className="relative h-28 w-full overflow-hidden">
                          <img
                            alt="Pelatnas Porprov Atletik Solo"
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            src="/images/sprinter_solo.jpg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-white font-label-md text-[9px] font-extrabold tracking-wider uppercase shadow-sm">
                            Sprint 100m/400m
                          </span>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-title-md text-[13px] font-bold text-onyx leading-tight line-clamp-1">
                              Pelatnas Porprov 2026
                            </h3>
                            <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">
                              38 Atlet Terbina di Manahan
                            </p>
                          </div>
                          <div className="mt-2 pt-1 border-t border-outline-variant/50 flex items-center justify-between text-primary font-label-md text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">military_tech</span>Emas
                            </span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </div>
                        </div>
                      </div>
                      {/* Card 2: Kota Atlet & Budaya Solo */}
                      <div
                        onClick={() =>
                          setSelectedMobileItem({
                            title: 'Kawasan Olahraga Bersejarah Surakarta',
                            sub: 'Heritage Sriwedari & Kompleks Manahan',
                            val: 'Fasilitas Standar Internasional',
                            status: 'Aktif',
                            desc: 'Stadion Sriwedari sebagai tempat PON I 1948 dan Stadion Manahan bertaraf internasional sebagai pusat pembinaan olahraga prestasi Kota Surakarta.',
                          })
                        }
                        className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 flex flex-col group cursor-pointer"
                      >
                        <div className="relative h-28 w-full overflow-hidden">
                          <img
                            alt="Stadion Sriwedari dan Kawasan Manahan Solo"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src="/images/sriwedari_manahan.jpg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-400 text-onyx font-label-md text-[9px] font-extrabold tracking-wider uppercase shadow-sm">
                            Heritage Solo
                          </span>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-title-md text-[13px] font-bold text-onyx leading-tight line-clamp-1">
                              Kota Atlet & Budaya Solo
                            </h3>
                            <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">
                              Sriwedari & Manahan
                            </p>
                          </div>
                          <div className="mt-2 pt-1 border-t border-outline-variant/50 flex items-center justify-between text-secondary-dark font-label-md text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">stadium</span>Kawasan
                            </span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CABOR SCREEN 1: PORTAL PENGAJUAN RAB & LPJ */}
            {caborTab === 'submissions' && (
              <Screen1_Submissions
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 2: SP2D & BUKTI PENCAIRAN */}
            {(caborTab === 'sp2d' || caborTab === 'finance') && (
              <Screen2_SP2D
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 3 & 8: PELAPORAN SPJ TERMIN II */}
            {caborTab === 'lpj' && (
              <Screen3_SPJReport
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
                onOpenOcrModal={() => setIsOcrModalOpen(true)}
              />
            )}

            {/* CABOR SCREEN 4: STATUS PENGIRIMAN E-SPJ */}
            {caborTab === 'submit-success' && (
              <Screen4_SubmitSuccess
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 5 & 6: PUSAT NOTIFIKASI & INFORMASI */}
            {caborTab === 'notifications' && (
              <Screen5_Notifications
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
                onOpenOcrModal={() => setIsOcrModalOpen(true)}
              />
            )}

            {/* CABOR SCREEN 9: TANDA TERIMA ELEKTRONIK (E-TTE) */}
            {caborTab === 'ette' && (
              <Screen9_eTTE
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 10: ALUR VERIFIKASI BERTINGKAT */}
            {caborTab === 'verification-flow' && (
              <Screen10_VerificationFlow
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 11: MILESTONE PERSETUJUAN */}
            {caborTab === 'milestone' && (
              <Screen11_Milestone
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 12: DOKUMEN SKB-SPJ (PDF RESMI) */}
            {caborTab === 'skb-doc' && (
              <Screen12_SkbDoc
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 13: ARSIP DOKUMEN SPJ */}
            {caborTab === 'archive' && (
              <Screen13_Archive
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 14: FORMULIR PENCAIRAN TERMIN III */}
            {caborTab === 'termin3' && (
              <Screen14_Termin3Form
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
            )}

            {/* CABOR SCREEN 15: KONFIRMASI PENCAIRAN TERMIN III */}
            {caborTab === 'termin3-success' && (
              <Screen15_Termin3Success
                onBack={() => setCaborTab('home')}
                onNavigate={(k) => setCaborTab(k as any)}
                onShowToast={showToast}
              />
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
                    <label className="border-2 border-dashed border-slate-300 hover:border-sikoni-teal rounded-xl p-3 text-center block cursor-pointer bg-slate-50 transition-colors">
                      <input
                        type="file"
                        accept="application/pdf,application/zip"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) showToast(`✓ Dokumen proposal "${f.name}" berhasil diunggah.`);
                        }}
                      />
                      <div className="flex items-center justify-center gap-2 text-sikoni-teal font-bold text-xs mb-1">
                        <FileUp size={16} />
                        <span>Pilih Dokumen Proposal PDF</span>
                      </div>
                      <span className="text-[9.5px] text-slate-500 block">
                        Format PDF (Maksimal 10 MB) • Otomatis verifikasi tanda tangan digital
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setCaborTab('home')}
                    className="flex-1 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 active:scale-95 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      showToast('✓ Usulan RAB berhasil dikirim ke antrean verifikasi KONI!');
                      setCaborTab('home');
                    }}
                    className="flex-1 py-2 bg-sikoni-teal text-white rounded-xl font-bold active:scale-95 transition-all"
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
                      Foto Kuitansi / Bukti Pembayaran
                    </label>
                    <label className="border-2 border-dashed border-slate-300 hover:border-sikoni-teal rounded-xl p-3 text-center block cursor-pointer bg-slate-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) showToast(`✓ Foto "${f.name}" berhasil diambil via kamera.`);
                        }}
                      />
                      <div className="flex items-center justify-center gap-2 text-sikoni-teal font-bold text-xs mb-1">
                        <Camera size={16} />
                        <span>Ambil Foto via Kamera / Galeri</span>
                      </div>
                      <span className="text-[9.5px] text-slate-500 block">
                        Format JPG/PNG • Otomatis geotag & kompresi foto kuitansi
                      </span>
                    </label>
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
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                  <button
                    onClick={() => setCaborTab('home')}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                    aria-label="Kembali"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  </button>
                  <div>
                    <div className="text-[11px] text-sikoni-muted font-bold">Profil Kepengurusan</div>
                    <h2 className="text-base font-black text-sikoni-navy leading-tight">PASI Surakarta</h2>
                  </div>
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
          <div
            ref={pengurusScrollRef}
            className={`flex-1 overflow-y-auto overscroll-contain scroll-smooth smooth-scroll bg-[#F8F9FD] text-on-surface ${
              deviceView === 'desktop'
                ? 'p-6 lg:p-8 pb-24 space-y-6 max-w-6xl mx-auto w-full'
                : 'p-3 sm:p-4 pb-24 space-y-4'
            }`}
          >
            {/* PENGURUS: TAB 1 - DASHBOARD EKSEKUTIF */}
            {pengurusTab === 'dashboard' && (
              <div key="dashboard" className="tab-transition-in space-y-4">
                {/* 1. HERO BANNER: KASDA HIBAH APBD EKSEKUTIF */}
                <div className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-[0_16px_36px_rgba(18,19,22,0.12)] border border-outline-variant/40">
                  <img
                    alt="Stadion Manahan Solo Athletic Track"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                    src="/images/track_manahan.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#120406] via-[#1e293b]/95 to-[#0f172a]/90 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 carbon-pattern opacity-25" />

                  <div className="relative z-10 flex flex-col justify-between min-h-[175px]">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-amber-300 font-extrabold text-[10px] tracking-wider uppercase border border-amber-400/30 backdrop-blur-md shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>DASHBOARD EKSEKUTIF • APBD 2026</span>
                      </div>
                      <span className="font-label-md text-[10px] uppercase tracking-wider text-emerald-300 font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        BANK JATENG HOST
                      </span>
                    </div>

                    <div className="my-2">
                      <span className="font-label-md text-[11px] uppercase tracking-wider text-amber-200/90 font-bold block">
                        Total Pagu Induk Hibah Olahraga
                      </span>
                      <div className="font-headline-lg text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                        Rp 12.800.000.000
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-white/85">
                        <span>Serapan: <strong className="text-amber-300 font-bold">Rp 8,75 M (68,4%)</strong></span>
                        <span>•</span>
                        <span>Sisa Giro Kasda: <strong className="text-emerald-300 font-bold">Rp 4,05 M</strong></span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPengurusTab('approval')}
                          className="px-3.5 py-1.5 rounded-xl red-flame-btn text-white font-label-md text-[11px] font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">fact_check</span>
                          <span>Inbox Approval ({approvalList.filter((a) => a.status === 'Menunggu').length})</span>
                        </button>
                        <button
                          onClick={() => setPengurusTab('kas')}
                          className="px-3.5 py-1.5 rounded-xl gold-shimmer text-onyx font-label-md text-[11px] font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">account_balance</span>
                          <span>Mutasi Giro</span>
                        </button>
                      </div>
                      <button
                        onClick={() => setIsAllServicesSheetOpen(true)}
                        className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-label-md text-[10.5px] font-bold backdrop-blur-xs transition-colors flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Katalog Modul</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. 4 KPIS EKSEKUTIF (BENTO GRID 2-KOLOM / 4-KOLOM DESKTOP) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div
                    onClick={() => setPengurusTab('approval')}
                    className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/60 shadow-xs hover:border-amber-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600">
                        <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                      </div>
                      <span className="font-label-md text-[9px] uppercase font-extrabold text-amber-800 px-1.5 py-0.5 rounded-full bg-amber-100">
                        ANTREAN
                      </span>
                    </div>
                    <div className="font-data-metric text-[17px] font-extrabold text-onyx mt-1">
                      {approvalList.filter((a) => a.status === 'Menunggu').length} Berkas
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant font-medium">
                      Menunggu TTD
                    </span>
                  </div>

                  <div
                    onClick={() => setPengurusTab('approval')}
                    className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/60 shadow-xs hover:border-emerald-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                      </div>
                      <span className="font-label-md text-[9px] uppercase font-extrabold text-emerald-800 px-1.5 py-0.5 rounded-full bg-emerald-100">
                        SAH
                      </span>
                    </div>
                    <div className="font-data-metric text-[17px] font-extrabold text-onyx mt-1">
                      04 Laporan
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant font-medium">
                      LPJ Terverifikasi
                    </span>
                  </div>

                  <div
                    onClick={() => setPengurusTab('kas')}
                    className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/60 shadow-xs hover:border-sky-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-7 h-7 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600">
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                      </div>
                      <span className="font-label-md text-[9px] uppercase font-extrabold text-sky-800 px-1.5 py-0.5 rounded-full bg-sky-100">
                        PAJAK
                      </span>
                    </div>
                    <div className="font-data-metric text-[17px] font-extrabold text-onyx mt-1">
                      Rp 184 Juta
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant font-medium">
                      PPh & PPN Terkumpul
                    </span>
                  </div>

                  <div
                    onClick={() => setPengurusTab('monitoring')}
                    className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/60 shadow-xs hover:border-indigo-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600">
                        <span className="material-symbols-outlined text-[16px]">military_tech</span>
                      </div>
                      <span className="font-label-md text-[9px] uppercase font-extrabold text-indigo-800 px-1.5 py-0.5 rounded-full bg-indigo-100">
                        CABOR
                      </span>
                    </div>
                    <div className="font-data-metric text-[17px] font-extrabold text-onyx mt-1">
                      64 Cabor
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant font-medium">
                      Binaan Aktif
                    </span>
                  </div>
                </div>

                {/* 3. 8 MENU UTAMA & KATALOG PENGURUS (GRID SQUIRCLES SINKRON CABOR) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-5 rounded-full bg-secondary" />
                      <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                        Portal Eksekutif & Otorisasi
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsAllServicesSheetOpen(true)}
                      className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary-dark font-label-md text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 hover:bg-secondary/20 transition-colors cursor-pointer"
                    >
                      <span>Lihat Semua</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* 8 Squircle 3D Tactile Grid (4 Columns on mobile, 8 Columns on widescreen desktop) */}
                  <div className={`grid gap-2 sm:gap-3 ${deviceView === 'desktop' ? 'grid-cols-4 lg:grid-cols-8' : 'grid-cols-4'}`}>
                    {/* 1. Approval Inbox */}
                    <button
                      onClick={() => setPengurusTab('approval')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-primary/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#990d16] via-[#d32f2f] to-[#ff5252] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(211,47,47,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">fact_check</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full gold-shimmer border border-white flex items-center justify-center shadow-xs">
                          <span className="text-[8px] font-black text-onyx">{approvalList.filter((a) => a.status === 'Menunggu').length}</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Persetujuan
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        RAB & Nota
                      </span>
                    </button>

                    {/* 2. Monitoring 64 Cabor */}
                    <button
                      onClick={() => setPengurusTab('monitoring')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-emerald-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#065f46] via-[#059669] to-[#34d399] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(5,150,105,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">monitoring</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="text-[8px] font-black text-onyx">64</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        64 Cabor
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Kontrol Pagu
                      </span>
                    </button>

                    {/* 3. Kas & Giro Bank Jateng */}
                    <button
                      onClick={() => setPengurusTab('kas')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-slate-600/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1e293b] via-[#334155] to-[#475569] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(30,41,59,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">account_balance</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-black">done</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Giro Kasda
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Bank Jateng
                      </span>
                    </button>

                    {/* 4. Otorisasi SP2D */}
                    <button
                      onClick={() => setPengurusTab('kas')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#c27803] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(245,158,11,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">payments</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-xs">
                          <span className="text-[7.5px] font-bold text-amber-900">SP2D</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Buku SP2D
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Otorisasi Kas
                      </span>
                    </button>

                    {/* 5. Verifikasi LPJ */}
                    <button
                      onClick={() => setPengurusTab('approval')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-sky-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0369a1] via-[#0284c7] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">receipt_long</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-bold">check</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        Audit SPJ
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Kwitansi Cabor
                      </span>
                    </button>

                    {/* 6. e-TTE BSrE Digital */}
                    <button
                      onClick={() => setPengurusTab('approval')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-indigo-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4338ca] via-[#6366f1] to-[#818cf8] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(99,102,241,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">fingerprint</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-white font-bold">shield</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        e-TTE BSrE
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Tanda Tangan
                      </span>
                    </button>

                    {/* 7. SKB & Legalitas */}
                    <button
                      onClick={() => setPengurusTab('monitoring')}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xs hover:border-teal-400/50 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0f766e] via-[#0d9488] to-[#14b8a6] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(13,148,136,0.4)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/40">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">picture_as_pdf</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[9px] text-onyx font-bold">check</span>
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-onyx leading-tight line-clamp-1">
                        SKB Kasda
                      </span>
                      <span className="font-body-sm text-[9px] text-on-surface-variant font-medium mt-0.5 line-clamp-1">
                        Dokumen Resmi
                      </span>
                    </button>

                    {/* 8. Semua Modul Pengurus */}
                    <button
                      onClick={() => setIsAllServicesSheetOpen(true)}
                      className="group relative flex flex-col items-center text-center p-2 sm:p-2.5 bg-gradient-to-b from-amber-50 to-orange-50/60 rounded-2xl border border-amber-300/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#92400e] via-[#b45309] to-[#f59e0b] flex items-center justify-center text-white shadow-[0_6px_16px_-2px_rgba(245,158,11,0.45)] mb-1.5 group-hover:scale-105 transition-transform border-t border-white/60">
                        <span className="material-symbols-outlined text-[24px] text-white font-bold drop-shadow-xs">shield_person</span>
                        <div className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-amber-700 text-white text-[8.5px] font-black border border-white shadow-xs">
                          8
                        </div>
                      </div>
                      <span className="font-title-md text-[11px] sm:text-[11.5px] font-extrabold text-amber-950 leading-tight line-clamp-1">
                        Katalog Modul
                      </span>
                      <span className="font-body-sm text-[9px] text-amber-800 font-bold mt-0.5 line-clamp-1">
                        Eksekutif
                      </span>
                    </button>
                  </div>
                </div>

                {/* 4 & 5: WIDESCREEN 2-COLUMN LAYOUT ON DESKTOP, STACKED ON MOBILE */}
                <div className={deviceView === 'desktop' ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start' : 'space-y-4'}>
                  {/* Left Column (7 cols): Approval Banner & Monitoring Serapan */}
                  <div className={deviceView === 'desktop' ? 'lg:col-span-7 space-y-4' : 'space-y-4'}>
                    {/* Approval Quick Action Banner */}
                    <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-surface-container-lowest border border-amber-300/70 p-4 rounded-[24px] flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[22px]">notifications_active</span>
                        </div>
                        <div className="min-w-0">
                          <b className="font-title-md text-xs sm:text-[13px] text-amber-950 block leading-tight truncate">
                            {approvalList.filter((a) => a.status === 'Menunggu').length} Berkas Menunggu Disposisi
                          </b>
                          <small className="font-body-sm text-[10.5px] text-amber-800/90 block truncate mt-0.5">
                            Tinjau usulan proposal RAB dan bukti nota kas cabor
                          </small>
                        </div>
                      </div>
                      <button
                        onClick={() => setPengurusTab('approval')}
                        className="gold-shimmer text-onyx text-[11px] font-black px-3.5 py-2 rounded-xl shadow-sm flex-shrink-0 active:scale-95 transition-transform"
                      >
                        Buka Inbox →
                      </button>
                    </div>

                    {/* Top 5 Cabor Serapan */}
                    <div className="bg-surface-container-lowest rounded-[28px] p-5 shadow-[0_8px_24px_rgba(18,19,22,0.04)] border border-outline-variant/60 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-secondary" />
                          <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                            Monitoring Serapan 64 Cabor
                          </h2>
                        </div>
                        <button
                          onClick={() => setPengurusTab('monitoring')}
                          className="font-label-md text-[11px] uppercase text-primary font-extrabold hover:underline flex items-center gap-0.5 tracking-wider"
                        >
                          Semua 64 Cabor
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3 bg-surface-container-low rounded-2xl border border-outline-variant/60 shadow-xs">
                          <div className="flex justify-between text-[11.5px] mb-1.5 font-bold">
                            <span className="text-onyx">PASI (Atletik Surakarta)</span>
                            <span className="text-primary font-black">Rp 48 jt / Rp 120 jt (40%)</span>
                          </div>
                          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '40%' }} />
                          </div>
                        </div>

                        <div className="p-3 bg-surface-container-low rounded-2xl border border-outline-variant/60 shadow-xs">
                          <div className="flex justify-between text-[11.5px] mb-1.5 font-bold">
                            <span className="text-onyx">PBVSI (Bola Voli)</span>
                            <span className="text-emerald-700 font-black">Rp 75 jt / Rp 100 jt (75%)</span>
                          </div>
                          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '75%' }} />
                          </div>
                        </div>

                        <div className="p-3 bg-surface-container-low rounded-2xl border border-outline-variant/60 shadow-xs">
                          <div className="flex justify-between text-[11.5px] mb-1.5 font-bold">
                            <span className="text-onyx">PBSI (Bulu Tangkis)</span>
                            <span className="text-amber-700 font-black">Rp 92 jt / Rp 110 jt (83%)</span>
                          </div>
                          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '83%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (5 cols): Rekening Giro & Mutasi Kasda */}
                  <div className={deviceView === 'desktop' ? 'lg:col-span-5 space-y-4' : 'space-y-3'}>
                    <div className="bg-surface-container-lowest rounded-[28px] p-5 shadow-[0_8px_24px_rgba(18,19,22,0.04)] border border-outline-variant/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 rounded-full bg-emerald-500" />
                          <h2 className="font-headline-md text-[16px] sm:text-[17px] font-extrabold text-onyx tracking-tight">
                            Rekening Giro Bank Jateng
                          </h2>
                        </div>
                        <span className="font-label-md text-[9.5px] uppercase font-bold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-100">
                          HOST-TO-HOST
                        </span>
                      </div>

                      <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white shadow-md space-y-1">
                        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                          SALDO REKENING KAS DAERAH
                        </span>
                        <div className="text-2xl font-black text-white">Rp 4.050.000.000</div>
                        <span className="text-[10.5px] text-slate-300 block">
                          No. Rek: 102.001.99281 • Cabang Surakarta
                        </span>
                      </div>

                      <div className="pt-2 border-t border-outline-variant/40">
                        <b className="font-label-md text-[11px] uppercase text-on-surface-variant font-bold block mb-2 tracking-wider">
                          Mutasi Terkini Kasda
                        </b>
                        <div className="space-y-2 text-[11px]">
                          <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center justify-between">
                            <div>
                              <b className="text-onyx block font-bold leading-tight">Transfer Hibah PASI (Atletik)</b>
                              <span className="text-[10px] text-on-surface-variant">09 Nov 2026 • SP2D-092</span>
                            </div>
                            <span className="font-bold text-rose-600">- Rp 48.500.000</span>
                          </div>

                          <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center justify-between">
                            <div>
                              <b className="text-onyx block font-bold leading-tight">Transfer Hibah PBVSI (Voli)</b>
                              <span className="text-[10px] text-on-surface-variant">07 Nov 2026 • SP2D-088</span>
                            </div>
                            <span className="font-bold text-rose-600">- Rp 14.200.000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PENGURUS: TAB 2 - VERIFIKASI & APPROVAL */}
            {pengurusTab === 'approval' && (
              <div key="approval" className="tab-transition-in space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Disposisi & Tanda Tangan</div>
                  <h2 className="text-lg font-black text-sikoni-navy">Inbox Persetujuan</h2>
                </div>

                <div className={`grid gap-3 text-xs ${deviceView === 'desktop' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
              <div key="monitoring" className="tab-transition-in space-y-3">
                <div>
                  <div className="text-[11px] text-sikoni-muted">Kontrol Alokasi Pagu</div>
                  <h2 className="text-lg font-black text-sikoni-navy">Monitoring 64 Cabor</h2>
                </div>

                <div className={`grid gap-2.5 text-xs ${deviceView === 'desktop' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
              <div key="kas" className="tab-transition-in space-y-3">
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
              <div key="profil" className="tab-transition-in space-y-3">
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

        {/* Selected Cabor Detail Bottom Sheet (Android Native Style) */}
        {selectedCaborDetail && (
          <div
            className="fixed sm:absolute inset-0 bg-black/60 z-50 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-150"
            onClick={() => setSelectedCaborDetail(null)}
          >
            <div
              className="w-full bg-white rounded-t-[32px] p-5 pb-8 shadow-2xl border-t border-slate-200/90 text-xs space-y-3 animate-in slide-in-from-bottom duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle */}
              <div
                className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 cursor-pointer"
                onClick={() => setSelectedCaborDetail(null)}
              />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10.5px] font-extrabold text-sikoni-teal uppercase tracking-wider block">
                    {selectedCaborDetail.category}
                  </span>
                  <b className="text-base font-black text-sikoni-navy">{selectedCaborDetail.name}</b>
                </div>
                <button
                  onClick={() => setSelectedCaborDetail(null)}
                  className="text-slate-400 hover:text-sikoni-navy p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <User size={15} className="text-sikoni-teal flex-shrink-0" />
                  <span>Ketua Umum: <b>{selectedCaborDetail.ketua}</b></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={15} className="text-sikoni-teal flex-shrink-0" />
                  <span>Sekretariat: {selectedCaborDetail.sekretariat}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Award size={15} className="text-sikoni-gold flex-shrink-0" />
                  <span>Prestasi: <b className="text-sikoni-navy">{selectedCaborDetail.prestasi}</b></span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>🏃 {selectedCaborDetail.atlet} Atlet Binaan</div>
                  <div>👨‍🏫 {selectedCaborDetail.pelatih} Pelatih Berlisensi</div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    showToast(`✓ Menghubungi WhatsApp Sekretariat ${selectedCaborDetail.code} (${selectedCaborDetail.phone})...`);
                    setSelectedCaborDetail(null);
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Phone size={14} /> Hubungi WhatsApp
                </button>
                <button
                  onClick={() => setSelectedCaborDetail(null)}
                  className="py-3 px-4 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-slate-600 active:scale-95 transition-all cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Generic Item Detail Bottom Sheet (Android Native Style) */}
        {selectedMobileItem && (
          <div
            className="fixed sm:absolute inset-0 bg-black/60 z-50 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-150"
            onClick={() => setSelectedMobileItem(null)}
          >
            <div
              className="w-full bg-white rounded-t-[32px] p-5 pb-8 shadow-2xl border-t border-slate-200/90 text-xs space-y-3 animate-in slide-in-from-bottom duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle */}
              <div
                className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 cursor-pointer"
                onClick={() => setSelectedMobileItem(null)}
              />

              <div className="flex justify-between items-start">
                <div>
                  <b className="text-sm font-black text-sikoni-navy block">{selectedMobileItem.title}</b>
                  <small className="text-[11px] text-sikoni-muted">{selectedMobileItem.sub}</small>
                </div>
                <button
                  onClick={() => setSelectedMobileItem(null)}
                  className="text-slate-400 hover:text-sikoni-navy p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Nominal Berkas</span>
                  <span className="font-black text-base text-sikoni-navy">{selectedMobileItem.val}</span>
                </div>
                <StatusBadge status={selectedMobileItem.status} />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                {selectedMobileItem.desc}
              </p>

              <button
                onClick={() => setSelectedMobileItem(null)}
                className="w-full py-2.5 bg-sikoni-navy text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        )}

        {/* Mobile Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 left-3 right-3 bg-sikoni-navy text-white text-[11.5px] font-bold py-2.5 px-3.5 rounded-xl shadow-xl z-50 text-center animate-in fade-in slide-in-from-top-1 border border-slate-700">
            {toastMessage}
          </div>
        )}

        {/* ========================================================
            BOTTOM SHEET: KATALOG LENGKAP SIKONI (PERSONA-ADAPTIVE)
           ======================================================== */}
        {isAllServicesSheetOpen && (
          <div className={`absolute inset-0 z-50 flex flex-col ${deviceView === 'desktop' ? 'justify-center items-center p-4' : 'justify-end'} animate-in fade-in duration-200`}>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
              onClick={() => setIsAllServicesSheetOpen(false)}
            />

            {/* Sheet Card */}
            <div className={`relative bg-white ${deviceView === 'desktop' ? 'w-full max-w-4xl rounded-3xl border border-slate-200 h-[85vh]' : 'w-full rounded-t-[32px] border-t border-slate-200 max-h-[85%]'} shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-250`}>
              {/* Drag Pill */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-2 shrink-0" />

              {/* Header */}
              <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${
                    persona === 'publik'
                      ? 'bg-gradient-to-tr from-[#0f172a] to-[#1e3a8a]'
                      : persona === 'pengurus'
                        ? 'bg-gradient-to-tr from-[#78350f] to-[#d97706]'
                        : 'bg-gradient-to-tr from-[#990d16] to-[#d32f2f]'
                  } text-white flex items-center justify-center shadow-xs`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {persona === 'publik' ? 'menu_book' : persona === 'pengurus' ? 'shield_person' : 'apps'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-sm font-black text-onyx leading-tight">
                      {persona === 'cabor'
                        ? 'Katalog 15 Layar & Layanan Cabor'
                        : persona === 'pengurus'
                          ? 'Katalog Modul Eksekutif & Pengurus'
                          : 'Katalog Layanan & Informasi Publik'}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {persona === 'cabor'
                        ? 'Akses cepat seluruh modul administrasi & kasda cabor'
                        : persona === 'pengurus'
                          ? 'Akses instrumen persetujuan, monitoring serapan 64 cabor & kasda'
                          : 'Akses transparansi APBD, direktori 64 cabor, jadwal & profil KONI'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAllServicesSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Search Bar inside Sheet */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/70 shrink-0">
                <div className="h-9 px-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-xs focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all shadow-inner">
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="text"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    placeholder={
                      persona === 'cabor'
                        ? 'Cari layar cabor (misal: OCR, SKB, Termin, SP2D)...'
                        : persona === 'pengurus'
                          ? 'Cari modul pengurus (misal: Approval, Serapan, Giro)...'
                          : 'Cari informasi publik (misal: Cabor, APBD, Jadwal, Medali)...'
                    }
                    className="w-full bg-transparent outline-none text-xs text-onyx font-medium placeholder:text-slate-400"
                  />
                  {serviceSearch && (
                    <button onClick={() => setServiceSearch('')} className="text-slate-400 hover:text-onyx cursor-pointer">
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
                  {activeCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setServiceCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 transition-all cursor-pointer ${
                        serviceCategoryFilter === cat
                          ? persona === 'cabor'
                            ? 'bg-[#d32f2f] text-white shadow-xs'
                            : persona === 'pengurus'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-sikoni-navy text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Catalog Items List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
                {activeCatalog
                  .filter((item) => {
                    const matchCategory = serviceCategoryFilter === 'Semua' || item.category === serviceCategoryFilter;
                    const matchQuery =
                      item.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                      item.desc.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                      item.screenNum.toLowerCase().includes(serviceSearch.toLowerCase());
                    return matchCategory && matchQuery;
                  })
                  .map((item) => (
                    <button
                      key={`${persona}-${item.id}-${item.screenNum}`}
                      onClick={() => {
                        setIsAllServicesSheetOpen(false);
                        if (item.isOcr) {
                          setIsOcrModalOpen(true);
                        } else if (persona === 'publik') {
                          setPublikTab(item.id as any);
                        } else if (persona === 'pengurus') {
                          setPengurusTab(item.id as any);
                        } else {
                          setCaborTab(item.id as any);
                        }
                      }}
                      className="w-full p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-primary/40 hover:bg-slate-50/80 flex items-center justify-between text-left transition-all active:scale-[0.98] shadow-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shrink-0 shadow-sm border-t border-white/30 group-hover:scale-105 transition-transform`}
                        >
                          <span className="material-symbols-outlined text-[20px] drop-shadow-xs">
                            {item.icon}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-black uppercase tracking-wide px-1.5 py-0.2 rounded-md ${
                              persona === 'publik'
                                ? 'bg-sky-100 text-sky-800'
                                : persona === 'pengurus'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-primary/10 text-primary'
                            }`}>
                              {item.screenNum}
                            </span>
                            <span className="text-[10.5px] font-bold text-slate-400">
                              • {item.category}
                            </span>
                          </div>
                          <h4 className="font-title-md text-xs font-black text-onyx truncate mt-0.5">
                            {item.title}
                          </h4>
                          <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2">
                        chevron_right
                      </span>
                    </button>
                  ))}
              </div>

              {/* Bottom Sheet Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-[10.5px] text-slate-500 font-semibold flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    persona === 'publik' ? 'bg-sky-500' : persona === 'pengurus' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  {persona === 'cabor'
                    ? 'Total 15 Layar Administrasi Cabor Aktif'
                    : persona === 'pengurus'
                      ? 'Total 8 Modul Eksekutif & Pengawasan Kasda'
                      : 'Total 8 Kanal Layanan & Informasi Publik'}
                </span>
                <button
                  onClick={() => setIsAllServicesSheetOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Tutup Katalog
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation Bar: Floating Circular Athletic Dock for ALL personas */}
        {caborTab !== 'skb-doc' && (
          <nav className={`z-30 px-4 pointer-events-none ${deviceView === 'desktop' ? 'sticky bottom-3 mt-auto' : 'absolute bottom-3 inset-x-0'}`}>
            <div className="pointer-events-auto max-w-[340px] sm:max-w-[360px] mx-auto bg-surface-container-lowest/95 backdrop-blur-2xl border border-white/80 shadow-[0_16px_36px_rgba(18,19,22,0.18)] rounded-full px-3 py-1.5 flex items-center justify-between">
              {/* PERSONA 1: CABOR */}
              {persona === 'cabor' && (
                <>
                  {/* Tab 1: Beranda */}
                  <button
                    onClick={() => setCaborTab('home')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {caborTab === 'home' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">dashboard</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">dashboard</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        caborTab === 'home' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Beranda
                    </span>
                  </button>

                  {/* Tab 2: Pengajuan */}
                  <button
                    onClick={() => setCaborTab('submissions')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {caborTab === 'submissions' || caborTab === 'rab-form' || caborTab === 'expense-form' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">assignment_add</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">assignment_add</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        caborTab === 'submissions' || caborTab === 'rab-form' || caborTab === 'expense-form'
                          ? 'text-primary font-extrabold'
                          : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Pengajuan
                    </span>
                  </button>

                  {/* Tab 3: Keuangan */}
                  <button
                    onClick={() => setCaborTab('sp2d')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {caborTab === 'sp2d' || caborTab === 'finance' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">account_balance_wallet</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">account_balance_wallet</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        caborTab === 'finance' || caborTab === 'sp2d' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Keuangan
                    </span>
                  </button>

                  {/* Tab 4: LPJ */}
                  <button
                    onClick={() => setCaborTab('lpj')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {caborTab === 'lpj' || caborTab === 'submit-success' || caborTab === 'ette' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">receipt_long</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">receipt_long</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        caborTab === 'lpj' || caborTab === 'submit-success' || caborTab === 'ette'
                          ? 'text-primary font-extrabold'
                          : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      LPJ
                    </span>
                  </button>

                  {/* Tab 5: Arsip */}
                  <button
                    onClick={() => setCaborTab('archive')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {caborTab === 'archive' || caborTab === 'account' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">shield_person</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">shield_person</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        caborTab === 'account' || caborTab === 'archive' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Arsip
                    </span>
                  </button>
                </>
              )}

              {/* PERSONA 2: PUBLIK */}
              {persona === 'publik' && (
                <>
                  {/* Tab 1: Beranda */}
                  <button
                    onClick={() => setPublikTab('home')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {publikTab === 'home' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">home</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">home</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        publikTab === 'home' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Beranda
                    </span>
                  </button>

                  {/* Tab 2: 64 Cabor */}
                  <button
                    onClick={() => setPublikTab('cabor-dir')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {publikTab === 'cabor-dir' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">military_tech</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">military_tech</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        publikTab === 'cabor-dir' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      64 Cabor
                    </span>
                  </button>

                  {/* Tab 3: Transparansi */}
                  <button
                    onClick={() => setPublikTab('transparansi')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {publikTab === 'transparansi' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">trending_up</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">trending_up</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        publikTab === 'transparansi' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      APBD
                    </span>
                  </button>

                  {/* Tab 4: Jadwal */}
                  <button
                    onClick={() => setPublikTab('jadwal')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {publikTab === 'jadwal' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">calendar_month</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">calendar_month</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        publikTab === 'jadwal' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Jadwal
                    </span>
                  </button>

                  {/* Tab 5: Profil */}
                  <button
                    onClick={() => setPublikTab('info')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {publikTab === 'info' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">info</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">info</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        publikTab === 'info' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Profil
                    </span>
                  </button>
                </>
              )}

              {/* PERSONA 3: PENGURUS */}
              {persona === 'pengurus' && (
                <>
                  {/* Tab 1: Dashboard */}
                  <button
                    onClick={() => setPengurusTab('dashboard')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {pengurusTab === 'dashboard' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">dashboard</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">dashboard</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        pengurusTab === 'dashboard' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Eksekutif
                    </span>
                  </button>

                  {/* Tab 2: Approval */}
                  <button
                    onClick={() => setPengurusTab('approval')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {pengurusTab === 'approval' ? (
                      <div className="relative w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">fact_check</span>
                        {approvalList.filter((a) => a.status === 'Menunggu').length > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-onyx text-[8px] font-black border border-white flex items-center justify-center shadow-xs">
                            {approvalList.filter((a) => a.status === 'Menunggu').length}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="relative w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">fact_check</span>
                        {approvalList.filter((a) => a.status === 'Menunggu').length > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d32f2f] text-white text-[8px] font-black border border-white flex items-center justify-center shadow-xs">
                            {approvalList.filter((a) => a.status === 'Menunggu').length}
                          </span>
                        )}
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        pengurusTab === 'approval' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Approval
                    </span>
                  </button>

                  {/* Tab 3: Monitoring 64 Cabor */}
                  <button
                    onClick={() => setPengurusTab('monitoring')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {pengurusTab === 'monitoring' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">monitoring</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">monitoring</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        pengurusTab === 'monitoring' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      64 Cabor
                    </span>
                  </button>

                  {/* Tab 4: Kas & Giro */}
                  <button
                    onClick={() => setPengurusTab('kas')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {pengurusTab === 'kas' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">account_balance</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">account_balance</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        pengurusTab === 'kas' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Giro
                    </span>
                  </button>

                  {/* Tab 5: Pejabat */}
                  <button
                    onClick={() => setPengurusTab('profil')}
                    className="group flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer"
                  >
                    {pengurusTab === 'profil' ? (
                      <div className="w-11 h-11 rounded-full red-flame-btn text-white flex items-center justify-center -mt-4 ring-4 ring-white border-2 border-amber-300 transition-transform group-hover:scale-105 shadow-[0_8px_18px_rgba(211,47,47,0.5)]">
                        <span className="material-symbols-outlined text-[22px] drop-shadow-md">shield_person</span>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-xs group-hover:border-primary/40">
                        <span className="material-symbols-outlined text-[19px]">shield_person</span>
                      </div>
                    )}
                    <span
                      className={`font-label-md text-[9.5px] tracking-wide uppercase mt-0.5 ${
                        pengurusTab === 'profil' ? 'text-primary font-extrabold' : 'text-on-surface-variant font-bold'
                      }`}
                    >
                      Pejabat
                    </span>
                  </button>
                </>
              )}
            </div>
          </nav>
        )}

        {/* Android Native Gesture Navigation Bar Pill (Only on mobile and tablet) */}
        {deviceView !== 'desktop' && (
          <div className="h-4 bg-white flex items-center justify-center flex-shrink-0 select-none pb-1">
            <div className="w-28 h-1 bg-slate-300 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
