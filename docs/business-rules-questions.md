# Keputusan Bisnis & Pertanyaan Blocking untuk Stakeholder KONI Surakarta

Berdasarkan analisis prototipe mockup dan batasan sistem keuangan yang sehat, berikut adalah daftar aturan bisnis kritis dan pertanyaan yang perlu difinalisasi bersama pengurus/owner KONI Surakarta:

---

## 1. Matriks Persetujuan (Approval Matrix)
- **Kondisi Saat Ini:** Mockup menampilkan alur umum verifikasi bendahara dan persetujuan.
- **Pertanyaan Blocking:**
  1. Berapa ambang batas nominal (*threshold*) untuk jenjang persetujuan?
     - *Contoh standar:*
       - Nominal ≤ Rp 25.000.000: Cukup Verifikator Teknis + Bendahara.
       - Rp 25.000.001 – Rp 100.000.000: Verifikator + Bendahara + Sekretaris Umum.
       - Nominal > Rp 100.000.000: Wajib sampai Ketua Umum.
  2. Apakah pengajuan insentif atlet/pelatih memiliki alur approval yang berbeda dari RAB kegiatan olahraga reguler?
  3. Apakah pelimpahan wewenang (*delegation*) diizinkan saat pejabat approver sedang dinas luar kota/berhalangan?

---

## 2. Pengelolaan Pagu, Alokasi, & Kebijakan Over-Budget
- **Kondisi Saat Ini:** Di mockup, pagu alokasi per cabor terdaftar (contoh PASI Rp 320 jt, realisasi Rp 180 jt).
- **Pertanyaan Blocking:**
  1. Apakah sistem harus memblokir secara mutlak (*hard-stop*) pengajuan RAB yang melebihi sisa alokasi cabor, atau diperbolehkan mengajukan *addendum / pergeseran anggaran antar kegiatan* dengan izin tertulis?
  2. Bagaimana aturan pengembalian sisa dana panjar/uang muka yang tidak habis terpakai pada akhir kegiatan? Apakah langsung disetor ke rekening penerimaan KONI dan dicatat sebagai pengurang realisasi?

---

## 3. Ketentuan Perpajakan (Tax Rules)
- **Kondisi Saat Ini:** Mockup menampilkan transaksi PPh dan PPN. Catatan pada mockup menekankan: *Tarif pajak tidak boleh di-hardcode tanpa dasar hukum yang disahkan*.
- **Pertanyaan Blocking:**
  1. Dasar pemotongan pajak apa saja yang berlaku resmi di KONI Surakarta?
     - PPh Pasal 21 (Honorium narasumber, wasit, uang saku atlet/pelatih dengan/tanpa NPWP).
     - PPh Pasal 22 (Belanja barang pemerintah di atas Rp 2.000.000).
     - PPh Pasal 23 (Sewa venue, kendaraan, jasa event organizer).
     - PPN 11% (Faktur pajak pengadaan barang/jasa kena pajak).
  2. Apakah KONI bertindak sebagai Pemungut Pajak (WAPU) resmi dengan NPWP instansi KONI atau pemotongan dilakukan langsung oleh rekanan bendahara?

---

## 4. Standar Bukti Transaksi & Checklist LPJ
- **Kondisi Saat Ini:** Mockup mensyaratkan 5 checklist LPJ (Ringkasan, Realisasi vs RAB, Bukti Pengeluaran, Bukti Pembayaran, Dokumentasi Foto).
- **Pertanyaan Blocking:**
  1. Berapa batas maksimal hari kerja penyampaian LPJ setelah tanggal akhir kegiatan selesai (misal: maksimal 14 hari kerja)?
  2. Sanksi sistem apa yang berlaku jika cabor terlambat mengirim LPJ (misal: otomatis membekukan pengajuan RAB kegiatan cabor berikutnya hingga LPJ tuntas disetujui)?
  3. Format bukti pembayaran apa saja yang dinyatakan sah (Kuitansi bermaterai sesuai nilai transaksi, bukti transfer bank berlogo resmi, atau nota toko bermaterai)?

---

## 5. Kebijakan Retensi Dokumen & Privasi Data Atlet
- **Pertanyaan Blocking:**
  1. Berapa lama masa retensi berkas bukti transaksi digital (misal: minimal 5 atau 10 tahun sesuai UU Kearsipan dan standar BPK/Inspektorat)?
  2. Sejauh mana data pribadi atlet dan pelatih (NIK, nomor rekening, alamat rumah) dapat dilihat oleh akun auditor atau publik? (Sistem SIKONI menetapkan minimisasi data: NIK di-masking untuk level non-bendahara, dan tidak pernah ditampilkan ke publik).

