import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

export type UserPersona = 'publik' | 'cabor' | 'pengurus';

export default function App() {
  const [persona, setPersona] = useState<UserPersona>('cabor');
  const [caborTab, setCaborTab] = useState<'home' | 'finance' | 'submissions' | 'lpj' | 'account' | 'rab' | 'expense'>('home');
  const [publikTab, setPublikTab] = useState<'home' | 'cabor-dir' | 'transparansi' | 'jadwal' | 'info'>('home');
  const [pengurusTab, setPengurusTab] = useState<'dashboard' | 'approval' | 'monitoring' | 'kas' | 'profil'>('dashboard');

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Approval data for Pengurus
  const [approvalList, setApprovalList] = useState([
    { id: '1', cabor: 'PASI', title: 'RAB Kejuaraan Atletik Kota', val: 'Rp 48.500.000', status: 'Menunggu' },
    { id: '2', cabor: 'PBVSI', title: 'Sewa Lapangan & Honor Wasit', val: 'Rp 14.200.000', status: 'Menunggu' },
    { id: '3', cabor: 'PGSI', title: 'Insentif & Nutrisi Atlet', val: 'Rp 8.400.000', status: 'Menunggu' },
    { id: '4', cabor: 'PBSI', title: 'Pemusatan Latihan Porprov', val: 'Rp 32.000.000', status: 'Disetujui' },
  ]);

  const handleApprove = (id: string, title: string) => {
    setApprovalList(prev => prev.map(item => item.id === id ? { ...item, status: 'Disetujui' } : item));
    Alert.alert('Sukses', `Berkas ${title} berhasil disetujui!`);
  };

  const handleRevise = (id: string, title: string) => {
    setApprovalList(prev => prev.map(item => item.id === id ? { ...item, status: 'Verifikasi' } : item));
    Alert.alert('Revisi', `Catatan revisi dikirim ke operator ${title}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Persona Switcher Pill */}
      <View style={styles.personaBar}>
        <TouchableOpacity
          onPress={() => { setPersona('publik'); setIsNotifOpen(false); }}
          style={[styles.personaPill, persona === 'publik' && styles.personaPillActiveNavy]}
        >
          <Text style={[styles.personaPillText, persona === 'publik' && styles.personaPillTextActive]}>👥 Publik</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setPersona('cabor'); setIsNotifOpen(false); }}
          style={[styles.personaPill, persona === 'cabor' && styles.personaPillActiveTeal]}
        >
          <Text style={[styles.personaPillText, persona === 'cabor' && styles.personaPillTextActive]}>🏃 Cabor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setPersona('pengurus'); setIsNotifOpen(false); }}
          style={[styles.personaPill, persona === 'pengurus' && styles.personaPillActiveGold]}
        >
          <Text style={[styles.personaPillText, persona === 'pengurus' && styles.personaPillTextActive]}>🏛️ Pengurus</Text>
        </TouchableOpacity>
      </View>

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>SK</Text>
          </View>
          <View>
            <Text style={styles.brandName}>SIKONI Mobile</Text>
            <Text style={styles.brandSub}>KONI Kota Surakarta</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.caborBadge}>
            <Text style={styles.caborBadgeText}>
              {persona === 'publik' && 'Publik Solo'}
              {persona === 'cabor' && 'PASI (Cabor)'}
              {persona === 'pengurus' && 'Bendahara'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsNotifOpen(!isNotifOpen)} style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification Dropdown Popover */}
      {isNotifOpen && (
        <View style={styles.notifDropdown}>
          <View style={styles.notifHeader}>
            <Text style={styles.notifHeaderTitle}>Notifikasi Sistem SIKONI</Text>
            <TouchableOpacity onPress={() => setIsNotifOpen(false)}>
              <Text style={styles.notifCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notifBody}>
            <TouchableOpacity onPress={() => { Alert.alert('Notifikasi', 'RAB Kejuaraan Atletik Disetujui'); setIsNotifOpen(false); }} style={styles.notifItem}>
              <Text style={styles.notifItemTitle}>RAB Kejuaraan Atletik Disetujui</Text>
              <Text style={styles.notifItemSub}>Dana termin I Rp 48,5 jt siap disalurkan ke rekening PASI.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert('Notifikasi', 'Revisi bukti nota kasir BPKAD diterima.'); setIsNotifOpen(false); }} style={styles.notifItem}>
              <Text style={styles.notifItemTitle}>Revisi Bukti Kuitansi Diterima</Text>
              <Text style={styles.notifItemSub}>Kuitansi sewa venue tervalidasi.</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ==================== SCREEN CONTENT ==================== */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* ================= PERSONA: PUBLIK ================= */}
        {persona === 'publik' && (
          <View>
            {publikTab === 'home' && (
              <View>
                <Text style={styles.greeting}>Masyarakat & Pecinta Olahraga</Text>
                <Text style={styles.heading}>Portal Olahraga Surakarta</Text>

                {/* Banner */}
                <View style={styles.summaryCard}>
                  <Text style={styles.summarySub}>KOTA SURAKARTA JUARA</Text>
                  <Text style={styles.summaryValue}>Porprov Jateng XVII</Text>
                  <Text style={styles.summaryFoot}>🥇 124 Emas • 🥈 88 Perak • 🥉 95 Perunggu</Text>
                </View>

                {/* Transparansi Ringkas */}
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Transparansi Hibah Olahraga</Text>
                  <Text style={[styles.summaryValue, { color: '#142a43', fontSize: 22, marginTop: 4 }]}>
                    Rp 12.800.000.000
                  </Text>
                  <Text style={{ fontSize: 11, color: '#718096', marginTop: 4 }}>
                    Terserap 68,4% oleh 64 cabor untuk pembinaan atlet & fasilitas tanding.
                  </Text>
                  <TouchableOpacity onPress={() => setPublikTab('transparansi')} style={[styles.outlineBtn, { marginTop: 10 }]}>
                    <Text style={styles.outlineBtnText}>Lihat Keterbukaan Anggaran →</Text>
                  </TouchableOpacity>
                </View>

                {/* Agenda Kejuaraan */}
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Agenda Kejuaraan Terdekat</Text>
                  <View style={styles.activityItem}>
                    <Text style={styles.activityTitle}>Kejurda Atletik Pelajar Solo</Text>
                    <Text style={styles.activitySub}>15 Nov 2026 • Stadion Sriwedari Surakarta</Text>
                  </View>
                  <View style={styles.activityItem}>
                    <Text style={styles.activityTitle}>Piala Walikota Surakarta Bola Voli</Text>
                    <Text style={styles.activitySub}>22 Nov 2026 • GOR Manahan Solo</Text>
                  </View>
                </View>
              </View>
            )}

            {publikTab === 'cabor-dir' && (
              <View>
                <Text style={styles.greeting}>Direktori Resmi</Text>
                <Text style={styles.heading}>64 Cabang Olahraga</Text>

                {[
                  { code: 'PASI', name: 'Persatuan Atletik Seluruh Indonesia', atlet: 38 },
                  { code: 'PBVSI', name: 'Persatuan Bola Voli Seluruh Indonesia', atlet: 45 },
                  { code: 'PBSI', name: 'Persatuan Bulutangkis Seluruh Indonesia', atlet: 52 },
                  { code: 'IPSI', name: 'Ikatan Pencak Silat Indonesia', atlet: 64 },
                  { code: 'PERBASI', name: 'Persatuan Bola Basket Seluruh Indonesia', atlet: 40 },
                ].map((c, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => Alert.alert(c.code, `${c.name}\nJumlah atlet binaan: ${c.atlet}\nSekretariat: Stadion Manahan Solo`)}
                    style={styles.caborCard}
                  >
                    <View style={styles.caborIconBox}>
                      <Text style={styles.caborIconText}>{c.code}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.caborName}>{c.name}</Text>
                      <Text style={styles.caborSub}>{c.atlet} Atlet Terdaftar</Text>
                    </View>
                    <Text style={{ color: '#cbd5e1' }}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {publikTab === 'transparansi' && (
              <View>
                <Text style={styles.greeting}>Akuntabilitas Publik</Text>
                <Text style={styles.heading}>Alokasi APBD Hibah 2026</Text>

                <View style={styles.summaryCard}>
                  <Text style={styles.summarySub}>TOTAL PAGU HIBAH</Text>
                  <Text style={styles.summaryValue}>Rp 12.800.000.000</Text>
                  <Text style={styles.summaryFoot}>Bebas Korupsi & Terbuka untuk Publik</Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Distribusi Alokasi Bidang</Text>
                  <Text style={styles.lineItem}>• Pembinaan Prestasi Cabor: Rp 5,63 M (44%)</Text>
                  <Text style={styles.lineItem}>• Perlengkapan Tanding: Rp 3,20 M (25%)</Text>
                  <Text style={styles.lineItem}>• Insentif Atlet & Pelatih: Rp 2,30 M (18%)</Text>
                  <Text style={styles.lineItem}>• Operasional Kesekretariatan: Rp 1,67 M (13%)</Text>
                </View>
              </View>
            )}

            {publikTab === 'jadwal' && (
              <View>
                <Text style={styles.greeting}>Kalender Olahraga</Text>
                <Text style={styles.heading}>Jadwal Event Solo</Text>
                <View style={styles.card}>
                  <Text style={styles.activityTitle}>🏆 Kejuaraan Daerah Atletik Pelajar</Text>
                  <Text style={styles.activitySub}>15 November 2026 • Stadion Sriwedari</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.activityTitle}>🏐 Turnamen Bola Voli Walikota Cup</Text>
                  <Text style={styles.activitySub}>22 November 2026 • GOR Manahan Solo</Text>
                </View>
              </View>
            )}

            {publikTab === 'info' && (
              <View>
                <Text style={styles.greeting}>Tentang Organisasi</Text>
                <Text style={styles.heading}>KONI Kota Surakarta</Text>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Dewan Pengurus 2024-2028</Text>
                  <Text style={styles.lineItem}>Ketua Umum: Drs. H. Sri Mulyanto</Text>
                  <Text style={styles.lineItem}>Sekretaris: Ir. Joko Prasetyo</Text>
                  <Text style={styles.lineItem}>Bendahara: Dra. Hj. Indrawati</Text>
                  <Text style={[styles.lineItem, { marginTop: 8, fontStyle: 'italic' }]}>
                    Sekretariat: Jl. Adi Sucipto No. 1 Manahan, Surakarta.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* ================= PERSONA: OPERATOR CABOR ================= */}
        {persona === 'cabor' && (
          <View>
            {caborTab === 'home' && (
              <View>
                <Text style={styles.greeting}>Selamat bertugas, Operator Cabor</Text>
                <Text style={styles.heading}>PASI Surakarta</Text>

                <View style={styles.summaryCard}>
                  <Text style={styles.summarySub}>PAGU ALOKASI CABOR 2026</Text>
                  <Text style={styles.summaryValue}>Rp 120.000.000</Text>
                  <Text style={styles.summaryFoot}>Realisasi: Rp 48 jt • Sisa: Rp 72 jt</Text>
                </View>

                {/* 4 KPIs */}
                <View style={styles.kpiGrid}>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>Pengajuan proses</Text>
                    <Text style={styles.kpiNumber}>03</Text>
                  </View>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>Perlu tindakan</Text>
                    <Text style={[styles.kpiNumber, { color: '#b77a1d' }]}>01</Text>
                  </View>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>Realisasi valid</Text>
                    <Text style={[styles.kpiNumber, { color: '#23846d' }]}>Rp 48 jt</Text>
                  </View>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>LPJ disetujui</Text>
                    <Text style={[styles.kpiNumber, { color: '#168b8b' }]}>04</Text>
                  </View>
                </View>

                {/* Shortcuts */}
                <View style={styles.shortcutsRow}>
                  <TouchableOpacity onPress={() => setCaborTab('rab')} style={styles.shortcutBtn}>
                    <View style={[styles.shortcutCircle, { backgroundColor: '#e8f5f4' }]}>
                      <Text style={{ color: '#168b8b', fontWeight: 'bold' }}>＋</Text>
                    </View>
                    <Text style={styles.shortcutText}>Buat RAB</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setCaborTab('expense')} style={styles.shortcutBtn}>
                    <View style={[styles.shortcutCircle, { backgroundColor: '#f7f0df' }]}>
                      <Text style={{ color: '#d7ac57', fontWeight: 'bold' }}>⇧</Text>
                    </View>
                    <Text style={styles.shortcutText}>Input Nota</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setCaborTab('lpj')} style={styles.shortcutBtn}>
                    <View style={[styles.shortcutCircle, { backgroundColor: '#e0e7ff' }]}>
                      <Text style={{ color: '#4338ca', fontWeight: 'bold' }}>▧</Text>
                    </View>
                    <Text style={styles.shortcutText}>Susun LPJ</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Alert.alert('Insentif', 'Data penerima insentif atlet & pelatih')} style={styles.shortcutBtn}>
                    <View style={[styles.shortcutCircle, { backgroundColor: '#ffe4e6' }]}>
                      <Text style={{ color: '#e11d48', fontWeight: 'bold' }}>🎖️</Text>
                    </View>
                    <Text style={styles.shortcutText}>Insentif</Text>
                  </TouchableOpacity>
                </View>

                {/* Recent Items */}
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Pengajuan Berjalan</Text>
                  <View style={styles.activityItem}>
                    <Text style={styles.activityTitle}>RAB Kejuaraan Atletik Kota</Text>
                    <Text style={styles.activitySub}>Rp 48.500.000 • Menunggu Approval</Text>
                  </View>
                  <View style={styles.activityItem}>
                    <Text style={styles.activityTitle}>Transportasi Bus Atlet</Text>
                    <Text style={styles.activitySub}>Rp 4.500.000 • Verifikasi Nota</Text>
                  </View>
                </View>
              </View>
            )}

            {caborTab === 'finance' && (
              <View>
                <Text style={styles.greeting}>Pembukuan Keuangan</Text>
                <Text style={styles.heading}>Kas Cabor PASI</Text>
                <View style={styles.summaryCard}>
                  <Text style={styles.summarySub}>SALDO KAS CABOR</Text>
                  <Text style={styles.summaryValue}>Rp 32.500.000</Text>
                  <Text style={styles.summaryFoot}>Rekening Giro Bank Jateng No. 102-992-811</Text>
                </View>
              </View>
            )}

            {caborTab === 'rab' && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Form Usulan RAB Baru</Text>
                <TextInput style={styles.input} placeholder="Nama Kegiatan Cabor" defaultValue="Kejuaraan Atletik Kota" />
                <TextInput style={styles.input} placeholder="Nominal Anggaran (Rp)" defaultValue="25.000.000" keyboardType="numeric" />
                <TouchableOpacity
                  onPress={() => { Alert.alert('Sukses', 'RAB berhasil dikirim ke pengurus KONI!'); setCaborTab('home'); }}
                  style={[styles.primaryBtn, { marginTop: 10 }]}
                >
                  <Text style={styles.primaryBtnText}>Kirim Usulan RAB</Text>
                </TouchableOpacity>
              </View>
            )}

            {caborTab === 'expense' && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Input Kuitansi Kas</Text>
                <TextInput style={styles.input} placeholder="Nomor Kuitansi / Bukti" defaultValue="KWT-2026-089" />
                <TextInput style={styles.input} placeholder="Nominal Kuitansi (Rp)" defaultValue="3.450.000" keyboardType="numeric" />
                <TouchableOpacity
                  onPress={() => { Alert.alert('Sukses', 'Nota kas berhasil disimpan!'); setCaborTab('home'); }}
                  style={[styles.primaryBtn, { marginTop: 10, backgroundColor: '#142a43' }]}
                >
                  <Text style={styles.primaryBtnText}>Simpan Nota</Text>
                </TouchableOpacity>
              </View>
            )}

            {caborTab === 'lpj' && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Unggah LPJ Kegiatan</Text>
                <Text style={{ fontSize: 11, color: '#718096', marginBottom: 12 }}>
                  Silakan unggah dokumen PDF rangkuman kegiatan, kuitansi bermeterai, dan foto dokumentasi.
                </Text>
                <TouchableOpacity
                  onPress={() => { Alert.alert('Sukses', 'Berkas LPJ berhasil dikirim untuk diaudit!'); setCaborTab('home'); }}
                  style={styles.primaryBtn}
                >
                  <Text style={styles.primaryBtnText}>Kirim Berkas LPJ</Text>
                </TouchableOpacity>
              </View>
            )}

            {caborTab === 'account' && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>SK Kepengurusan Cabor</Text>
                <Text style={styles.lineItem}>SK-KONI-SKA/2024/042</Text>
                <Text style={styles.lineItem}>Masa Bakti: 2024 – 2028</Text>
                <Text style={styles.lineItem}>Total Atlet Binaan: 38 Atlet</Text>
              </View>
            )}
          </View>
        )}

        {/* ================= PERSONA: PENGURUS KONI ================= */}
        {persona === 'pengurus' && (
          <View>
            {pengurusTab === 'dashboard' && (
              <View>
                <Text style={styles.greeting}>Pengurus Harian KONI</Text>
                <Text style={styles.heading}>Dashboard Eksekutif</Text>

                <View style={styles.summaryCard}>
                  <Text style={styles.summarySub}>KAS HIBAH APBD SURAKARTA 2026</Text>
                  <Text style={styles.summaryValue}>Rp 12.800.000.000</Text>
                  <Text style={styles.summaryFoot}>Terserap: Rp 8,75 M (68,4%) • Sisa Kas: Rp 4,05 M</Text>
                </View>

                {/* 4 KPIs */}
                <View style={styles.kpiGrid}>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>Antrean approval</Text>
                    <Text style={[styles.kpiNumber, { color: '#b77a1d' }]}>
                      {approvalList.filter(a => a.status === 'Menunggu').length} Berkas
                    </Text>
                  </View>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>LPJ verifikasi</Text>
                    <Text style={[styles.kpiNumber, { color: '#168b8b' }]}>04 Laporan</Text>
                  </View>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>Pajak disetor</Text>
                    <Text style={[styles.kpiNumber, { color: '#23846d' }]}>Rp 184 jt</Text>
                  </View>
                  <View style={styles.kpiBox}>
                    <Text style={styles.kpiLabel}>Total cabor</Text>
                    <Text style={styles.kpiNumber}>64</Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => setPengurusTab('approval')} style={[styles.card, { backgroundColor: '#fffbeb', borderColor: '#fde68a' }]}>
                  <Text style={[styles.cardTitle, { color: '#92400e' }]}>Inbox Approval Berkas</Text>
                  <Text style={{ fontSize: 11, color: '#b45309', marginTop: 2 }}>
                    Terdapat berkas pengajuan cabor menunggu tanda tangan disposisi Anda.
                  </Text>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#b45309', marginTop: 8 }}>
                    Buka Inbox Approval →
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {pengurusTab === 'approval' && (
              <View>
                <Text style={styles.greeting}>Verifikasi & Disposisi</Text>
                <Text style={styles.heading}>Inbox Persetujuan</Text>

                {approvalList.map(item => (
                  <View key={item.id} style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#168b8b' }}>{item.cabor}</Text>
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: item.status === 'Disetujui' ? '#23846d' : '#b77a1d' }}>
                        {item.status}
                      </Text>
                    </View>
                    <Text style={[styles.cardTitle, { marginTop: 2 }]}>{item.title}</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#142a43', marginTop: 4 }}>{item.val}</Text>

                    {item.status === 'Menunggu' && (
                      <View style={{ flexDirection: 'row', gap: 6, marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#e2e8f0' }}>
                        <TouchableOpacity onPress={() => handleApprove(item.id, item.title)} style={[styles.actionBtn, { backgroundColor: '#10b981' }]}>
                          <Text style={styles.actionBtnText}>✓ Setujui</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRevise(item.id, item.title)} style={[styles.actionBtn, { backgroundColor: '#f59e0b' }]}>
                          <Text style={styles.actionBtnText}>↺ Revisi</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {pengurusTab === 'monitoring' && (
              <View>
                <Text style={styles.greeting}>Monitoring Pagu Realtime</Text>
                <Text style={styles.heading}>Realisasi 64 Cabor</Text>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>PASI (Atletik)</Text>
                  <Text style={{ fontSize: 11, color: '#718096' }}>Realisasi: Rp 48 jt / Pagu: Rp 120 jt (40%)</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>PBVSI (Bola Voli)</Text>
                  <Text style={{ fontSize: 11, color: '#718096' }}>Realisasi: Rp 75 jt / Pagu: Rp 100 jt (75%)</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>PBSI (Bulu Tangkis)</Text>
                  <Text style={{ fontSize: 11, color: '#718096' }}>Realisasi: Rp 92 jt / Pagu: Rp 110 jt (83%)</Text>
                </View>
              </View>
            )}

            {pengurusTab === 'kas' && (
              <View>
                <Text style={styles.greeting}>Kasda & Kasir</Text>
                <Text style={styles.heading}>Rekening Giro Bank</Text>
                <View style={styles.summaryCard}>
                  <Text style={styles.summarySub}>SALDO BANK JATENG SURAKARTA</Text>
                  <Text style={styles.summaryValue}>Rp 4.050.000.000</Text>
                  <Text style={styles.summaryFoot}>Giro No. 102.001.99281</Text>
                </View>
              </View>
            )}

            {pengurusTab === 'profil' && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Otoritas Verifikator</Text>
                <Text style={styles.lineItem}>Nama: Dra. Hj. Indrawati</Text>
                <Text style={styles.lineItem}>Jabatan: Bendahara KONI Surakarta</Text>
                <Text style={styles.lineItem}>Hak Akses: SP2D Signer & Disposisi</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.tabBar}>
        {persona === 'publik' && (
          <>
            <TouchableOpacity onPress={() => setPublikTab('home')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>🏠</Text>
              <Text style={[styles.tabLabel, publikTab === 'home' && styles.tabLabelActive]}>Beranda</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPublikTab('cabor-dir')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>🏅</Text>
              <Text style={[styles.tabLabel, publikTab === 'cabor-dir' && styles.tabLabelActive]}>Cabor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPublikTab('transparansi')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>📊</Text>
              <Text style={[styles.tabLabel, publikTab === 'transparansi' && styles.tabLabelActive]}>Transparansi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPublikTab('jadwal')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>📅</Text>
              <Text style={[styles.tabLabel, publikTab === 'jadwal' && styles.tabLabelActive]}>Jadwal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPublikTab('info')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>ℹ️</Text>
              <Text style={[styles.tabLabel, publikTab === 'info' && styles.tabLabelActive]}>Profil</Text>
            </TouchableOpacity>
          </>
        )}

        {persona === 'cabor' && (
          <>
            <TouchableOpacity onPress={() => setCaborTab('home')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>🏠</Text>
              <Text style={[styles.tabLabel, caborTab === 'home' && styles.tabLabelActive]}>Beranda</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCaborTab('finance')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>💰</Text>
              <Text style={[styles.tabLabel, caborTab === 'finance' && styles.tabLabelActive]}>Keuangan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCaborTab('submissions')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>📝</Text>
              <Text style={[styles.tabLabel, caborTab === 'submissions' && styles.tabLabelActive]}>Pengajuan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCaborTab('lpj')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>📋</Text>
              <Text style={[styles.tabLabel, caborTab === 'lpj' && styles.tabLabelActive]}>LPJ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCaborTab('account')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>👤</Text>
              <Text style={[styles.tabLabel, caborTab === 'account' && styles.tabLabelActive]}>Akun</Text>
            </TouchableOpacity>
          </>
        )}

        {persona === 'pengurus' && (
          <>
            <TouchableOpacity onPress={() => setPengurusTab('dashboard')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>🏛️</Text>
              <Text style={[styles.tabLabel, pengurusTab === 'dashboard' && styles.tabLabelActive]}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPengurusTab('approval')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>✅</Text>
              <Text style={[styles.tabLabel, pengurusTab === 'approval' && styles.tabLabelActive]}>Approval</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPengurusTab('monitoring')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>📈</Text>
              <Text style={[styles.tabLabel, pengurusTab === 'monitoring' && styles.tabLabelActive]}>64 Cabor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPengurusTab('kas')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>🏦</Text>
              <Text style={[styles.tabLabel, pengurusTab === 'kas' && styles.tabLabelActive]}>Kas Giro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPengurusTab('profil')} style={styles.tabItem}>
              <Text style={styles.tabIcon}>👤</Text>
              <Text style={[styles.tabLabel, pengurusTab === 'profil' && styles.tabLabelActive]}>Pejabat</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  personaBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  personaPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
  },
  personaPillActiveNavy: {
    backgroundColor: '#142a43',
  },
  personaPillActiveTeal: {
    backgroundColor: '#168b8b',
  },
  personaPillActiveGold: {
    backgroundColor: '#d97706',
  },
  personaPillText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
  },
  personaPillTextActive: {
    color: '#ffffff',
  },
  header: {
    height: 56,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#142a43',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandMarkText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 12,
  },
  brandName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#142a43',
  },
  brandSub: {
    fontSize: 8.5,
    color: '#718096',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caborBadge: {
    backgroundColor: '#e8f5f4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  caborBadgeText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#168b8b',
  },
  notifBtn: {
    position: 'relative',
    padding: 4,
  },
  notifIcon: {
    fontSize: 18,
  },
  notifDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#d95b5b',
  },
  notifDropdown: {
    position: 'absolute',
    top: 105,
    left: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 99,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#142a43',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  notifHeaderTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  notifCloseText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  notifBody: {
    padding: 8,
  },
  notifItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  notifItemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#142a43',
  },
  notifItemSub: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    fontSize: 11,
    color: '#718096',
    fontWeight: '500',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#142a43',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#142a43',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  summarySub: {
    fontSize: 9.5,
    color: '#d7ac57',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginTop: 4,
  },
  summaryFoot: {
    fontSize: 10.5,
    color: '#cbd5e1',
    marginTop: 4,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  kpiBox: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  kpiLabel: {
    fontSize: 10,
    color: '#718096',
    fontWeight: '600',
  },
  kpiNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#142a43',
    marginTop: 4,
  },
  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  shortcutBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    width: '23%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  shortcutCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  shortcutText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#142a43',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#142a43',
    marginBottom: 6,
  },
  activityItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#142a43',
  },
  activitySub: {
    fontSize: 10,
    color: '#718096',
    marginTop: 2,
  },
  lineItem: {
    fontSize: 11,
    color: '#4a5568',
    marginVertical: 3,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    fontSize: 11,
    color: '#142a43',
    marginBottom: 8,
  },
  primaryBtn: {
    backgroundColor: '#168b8b',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: '#168b8b',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  outlineBtnText: {
    color: '#168b8b',
    fontWeight: 'bold',
    fontSize: 10.5,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  caborCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  caborIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caborIconText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#142a43',
  },
  caborName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#142a43',
  },
  caborSub: {
    fontSize: 9.5,
    color: '#168b8b',
  },
  tabBar: {
    height: 58,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: 9,
    color: '#718096',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#142a43',
    fontWeight: 'bold',
  },
});
