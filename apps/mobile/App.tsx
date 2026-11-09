import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'finance' | 'submissions' | 'notifications' | 'account' | 'rab' | 'expense' | 'lpj'>('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>SK</Text>
          </View>
          <Text style={styles.brandName}>SIKONI</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.caborBadge}>
            <Text style={styles.caborBadgeText}>PASI</Text>
          </View>
          <TouchableOpacity onPress={() => setActiveTab('notifications')} style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 24 }}>
        {activeTab === 'home' && (
          <View>
            <Text style={styles.greeting}>Selamat pagi, Operator Cabor</Text>
            <Text style={styles.heading}>Ringkasan aktivitas</Text>

            {/* Summary Banner */}
            <View style={styles.summaryCard}>
              <Text style={styles.summarySub}>RINGKASAN PENGAJUAN TAHUN 2026</Text>
              <Text style={styles.summaryValue}>Rp 82.500.000</Text>
              <Text style={styles.summaryFoot}>Total RAB disetujui • PASI</Text>
            </View>

            {/* 4 Mini KPIs */}
            <View style={styles.kpiGrid}>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Pengajuan diproses</Text>
                <Text style={styles.kpiNumber}>03</Text>
              </View>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Perlu tindakan</Text>
                <Text style={[styles.kpiNumber, { color: '#b77a1d' }]}>02</Text>
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

            {/* Quick Action Shortcuts */}
            <View style={styles.shortcutsRow}>
              <TouchableOpacity onPress={() => setActiveTab('rab')} style={styles.shortcutBtn}>
                <View style={[styles.shortcutCircle, { backgroundColor: '#e8f5f4' }]}>
                  <Text style={{ color: '#168b8b', fontWeight: 'bold' }}>＋</Text>
                </View>
                <Text style={styles.shortcutText}>Buat RAB</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('expense')} style={styles.shortcutBtn}>
                <View style={[styles.shortcutCircle, { backgroundColor: '#f7f0df' }]}>
                  <Text style={{ color: '#d7ac57', fontWeight: 'bold' }}>⇧</Text>
                </View>
                <Text style={styles.shortcutText}>Pengeluaran</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('lpj')} style={styles.shortcutBtn}>
                <View style={[styles.shortcutCircle, { backgroundColor: '#e0e7ff' }]}>
                  <Text style={{ color: '#4338ca', fontWeight: 'bold' }}>▧</Text>
                </View>
                <Text style={styles.shortcutText}>LPJ</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('notifications')} style={styles.shortcutBtn}>
                <View style={[styles.shortcutCircle, { backgroundColor: '#ffe4e6' }]}>
                  <Text style={{ color: '#e11d48', fontWeight: 'bold' }}>🔔</Text>
                </View>
                <Text style={styles.shortcutText}>Notifikasi</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Submissions */}
            <View style={styles.card}>
              <View style={styles.cardHead}>
                <Text style={styles.cardTitle}>Pengajuan terbaru</Text>
                <TouchableOpacity onPress={() => setActiveTab('submissions')}>
                  <Text style={styles.cardLink}>Lihat semua</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.itemTitle}>RAB Kejuaraan Atletik Kota</Text>
                  <Text style={styles.itemSub}>RAB-026 • 09 Nov 2026</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemVal}>Rp 48,5 jt</Text>
                  <Text style={[styles.tag, { backgroundColor: '#fff8e8', color: '#b77a1d' }]}>Menunggu</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.itemTitle}>Transportasi Atlet</Text>
                  <Text style={styles.itemSub}>EXP-1126 • 08 Nov 2026</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemVal}>Rp 4,5 jt</Text>
                  <Text style={[styles.tag, { backgroundColor: '#eaf3fb', color: '#2d73b9' }]}>Verifikasi</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* TAB: KEUANGAN */}
        {activeTab === 'finance' && (
          <View>
            <Text style={styles.greeting}>Keuangan cabor</Text>
            <Text style={styles.heading}>Ringkasan Keuangan</Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summarySub}>RAB DISETUJUI</Text>
              <Text style={styles.summaryValue}>Rp 82.500.000</Text>
              <Text style={styles.summaryFoot}>Tahun anggaran 2026 • PASI</Text>
            </View>

            <View style={styles.kpiGrid}>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Realisasi valid</Text>
                <Text style={styles.kpiNumber}>Rp 48 jt</Text>
              </View>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Sudah dibayar</Text>
                <Text style={[styles.kpiNumber, { color: '#23846d' }]}>Rp 40 jt</Text>
              </View>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Belum dibayar</Text>
                <Text style={[styles.kpiNumber, { color: '#b77a1d' }]}>Rp 8 jt</Text>
              </View>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiLabel}>Sisa alokasi*</Text>
                <Text style={[styles.kpiNumber, { color: '#168b8b' }]}>Rp 12 jt</Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB: PENGAJUAN */}
        {activeTab === 'submissions' && (
          <View>
            <Text style={styles.greeting}>Kelola dokumen kegiatan</Text>
            <Text style={styles.heading}>Pengajuan</Text>

            <View style={styles.card}>
              <View style={styles.cardHead}>
                <Text style={styles.cardTitle}>Daftar pengajuan</Text>
                <TouchableOpacity onPress={() => setActiveTab('rab')}>
                  <Text style={styles.cardLink}>＋ Baru</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.itemTitle}>Kejuaraan Atletik Kota</Text>
                  <Text style={styles.itemSub}>RAB-026 • 09 Nov 2026</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemVal}>Rp 48,5 jt</Text>
                  <Text style={[styles.tag, { backgroundColor: '#fff8e8', color: '#b77a1d' }]}>Menunggu</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.itemTitle}>Pemusatan Latihan Kejurda</Text>
                  <Text style={styles.itemSub}>RAB-021 • 28 Okt 2026</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemVal}>Rp 32 jt</Text>
                  <Text style={[styles.tag, { backgroundColor: '#e8f6f0', color: '#23846d' }]}>Disetujui</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* SCREEN: BUAT RAB (STEPPER WIZARD) */}
        {activeTab === 'rab' && (
          <View>
            <Text style={styles.greeting}>Pengajuan anggaran kegiatan</Text>
            <Text style={styles.heading}>Buat RAB</Text>

            <View style={styles.card}>
              <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 8, color: '#142a43' }}>Informasi Kegiatan</Text>
              <TextInput style={styles.input} placeholder="Nama Kegiatan *" defaultValue="Kejuaraan Atletik Kota" />
              <TextInput style={styles.input} placeholder="Program" defaultValue="Pembinaan dan kompetisi" />
              <TextInput style={styles.input} placeholder="Periode Kegiatan" defaultValue="20–22 November 2026" />
              <TextInput style={styles.input} placeholder="Lokasi Pelaksanaan" defaultValue="Stadion Sriwedari, Surakarta" />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <TouchableOpacity onPress={() => setActiveTab('home')} style={[styles.btn, { flex: 1, backgroundColor: '#ffffff' }]}>
                <Text style={{ color: '#142a43', fontWeight: 'bold' }}>Simpan Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Lanjut ke rincian biaya')} style={[styles.btn, { flex: 1, backgroundColor: '#168b8b' }]}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Lanjut →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* SCREEN: INPUT PENGELUARAN */}
        {activeTab === 'expense' && (
          <View>
            <Text style={styles.greeting}>Pencatatan realisasi</Text>
            <Text style={styles.heading}>Input Pengeluaran</Text>

            <View style={styles.card}>
              <TextInput style={styles.input} placeholder="Kegiatan / RAB Terkait" defaultValue="Kejuaraan Atletik Kota — RAB-026" />
              <TextInput style={styles.input} placeholder="Tanggal Pengeluaran" defaultValue="2026-11-09" />
              <TextInput style={styles.input} placeholder="Uraian Pengeluaran *" defaultValue="Konsumsi atlet dan ofisial" />
              <TextInput style={styles.input} placeholder="Nilai Pengeluaran (Rp) *" keyboardType="numeric" defaultValue="4500000" />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <TouchableOpacity onPress={() => setActiveTab('home')} style={[styles.btn, { flex: 1, backgroundColor: '#ffffff' }]}>
                <Text style={{ color: '#142a43', fontWeight: 'bold' }}>Simpan Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { alert('Pengeluaran berhasil diajukan'); setActiveTab('home'); }} style={[styles.btn, { flex: 1, backgroundColor: '#168b8b' }]}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Kirim Verifikasi</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB: NOTIFIKASI */}
        {activeTab === 'notifications' && (
          <View>
            <Text style={styles.greeting}>Pembaruan sistem</Text>
            <Text style={styles.heading}>Notifikasi</Text>

            <View style={styles.card}>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.itemTitle}>RAB memerlukan verifikasi</Text>
                  <Text style={styles.itemSub}>RAB-026 • 09:12</Text>
                </View>
                <Text style={[styles.tag, { backgroundColor: '#fff8e8', color: '#b77a1d' }]}>Menunggu</Text>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.itemTitle}>Dokumen berhasil diunggah</Text>
                  <Text style={styles.itemSub}>EXP-1126 • 08:45</Text>
                </View>
                <Text style={[styles.tag, { backgroundColor: '#eaf3fb', color: '#2d73b9' }]}>Terkirim</Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB: AKUN */}
        {activeTab === 'account' && (
          <View>
            <Text style={styles.greeting}>Profil pengguna</Text>
            <Text style={styles.heading}>Akun Operator</Text>

            <View style={styles.card}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#142a43' }}>Operator PASI</Text>
              <Text style={{ fontSize: 11, color: '#718096', marginBottom: 12 }}>PASI — Cabang Olahraga Atletik</Text>
              <Text style={{ fontSize: 12, color: '#142a43', paddingVertical: 4 }}>Email: operator@pasi.demo</Text>
              <Text style={{ fontSize: 12, color: '#142a43', paddingVertical: 4 }}>Hak Akses: Operator Cabor</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 5-Menu Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.navBtn}>
          <Text style={[styles.navIcon, activeTab === 'home' && styles.navActive]}>🏠</Text>
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navActive]}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('finance')} style={styles.navBtn}>
          <Text style={[styles.navIcon, activeTab === 'finance' && styles.navActive]}>💰</Text>
          <Text style={[styles.navLabel, activeTab === 'finance' && styles.navActive]}>Keuangan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('submissions')} style={styles.navBtn}>
          <Text style={[styles.navIcon, (activeTab === 'submissions' || activeTab === 'rab' || activeTab === 'expense' || activeTab === 'lpj') && styles.navActive]}>📤</Text>
          <Text style={[styles.navLabel, (activeTab === 'submissions' || activeTab === 'rab' || activeTab === 'expense' || activeTab === 'lpj') && styles.navActive]}>Pengajuan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('notifications')} style={styles.navBtn}>
          <Text style={[styles.navIcon, activeTab === 'notifications' && styles.navActive]}>🔔</Text>
          <Text style={[styles.navLabel, activeTab === 'notifications' && styles.navActive]}>Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('account')} style={styles.navBtn}>
          <Text style={[styles.navIcon, activeTab === 'account' && styles.navActive]}>👤</Text>
          <Text style={[styles.navLabel, activeTab === 'account' && styles.navActive]}>Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  header: { height: 60, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#e7ebf0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandMark: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#142a43', alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: '#ffffff', fontWeight: '900', fontSize: 13 },
  brandName: { fontSize: 15, fontWeight: '800', color: '#142a43' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  caborBadge: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  caborBadgeText: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  notifBtn: { position: 'relative', padding: 4 },
  notifIcon: { fontSize: 16 },
  notifDot: { position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: 4, backgroundColor: '#d95b5b' },
  content: { flex: 1, padding: 16 },
  greeting: { fontSize: 11, color: '#718096' },
  heading: { fontSize: 18, fontWeight: '800', color: '#142a43', marginBottom: 12 },
  summaryCard: { backgroundColor: '#142a43', borderRadius: 16, padding: 16, marginBottom: 12 },
  summarySub: { fontSize: 9, fontWeight: '700', color: '#94a3b8', letterSpacing: 0.5 },
  summaryValue: { fontSize: 22, fontWeight: '900', color: '#ffffff', marginTop: 4 },
  summaryFoot: { fontSize: 10, color: '#d7ac57', marginTop: 4 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  kpiBox: { width: '48%', backgroundColor: '#ffffff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e7ebf0' },
  kpiLabel: { fontSize: 10, color: '#718096' },
  kpiNumber: { fontSize: 16, fontWeight: '800', color: '#142a43', marginTop: 4 },
  shortcutsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  shortcutBtn: { flex: 1, alignItems: 'center', backgroundColor: '#ffffff', marginHorizontal: 3, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#e7ebf0' },
  shortcutCircle: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  shortcutText: { fontSize: 9, fontWeight: '700', color: '#142a43' },
  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#e7ebf0', marginBottom: 12 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 12, fontWeight: '800', color: '#142a43' },
  cardLink: { fontSize: 10, fontWeight: '700', color: '#168b8b' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#f1f5f9' },
  itemTitle: { fontSize: 11, fontWeight: '700', color: '#142a43' },
  itemSub: { fontSize: 9, color: '#718096', marginTop: 2 },
  itemVal: { fontSize: 11, fontWeight: '700', color: '#142a43' },
  tag: { fontSize: 9, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, marginTop: 2 },
  input: { borderWidth: 1, borderColor: '#e7ebf0', borderRadius: 8, padding: 8, fontSize: 11, marginBottom: 8, color: '#142a43' },
  btn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e7ebf0' },
  bottomNav: { height: 60, backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#e7ebf0', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navBtn: { alignItems: 'center' },
  navIcon: { fontSize: 16, color: '#718096' },
  navLabel: { fontSize: 9, color: '#718096', marginTop: 2 },
  navActive: { color: '#142a43', fontWeight: 'bold' },
});

