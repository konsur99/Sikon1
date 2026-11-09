# SIKONI — UI Mockup & HTML Prototype

Prototype antarmuka SIKONI (Sistem Informasi KONI Surakarta) untuk tiga kanal:

1. Website publik.
2. Web Admin KONI.
3. Aplikasi Android untuk operator cabor/pengurus (tampilan mobile).

## Cara menjalankan

1. Ekstrak folder proyek.
2. Buka `index.html` menggunakan Chrome, Edge, atau Firefox.
3. Navigasi demo tersedia pada switcher kanan atas: **Publik / Admin / Android**.
4. Di mode Admin, gunakan sidebar untuk membuka seluruh menu. Di mode Android, gunakan bottom navigation dan shortcut pada Beranda.
5. Tidak membutuhkan instalasi package atau koneksi internet. HTML, CSS, dan JavaScript sudah berada dalam satu file.

## Daftar screenshot

### Website publik
- `pub-home.png` — Beranda publik.
- `pub-transparency.png` — Transparansi anggaran.
- `pub-cabor.png` — Direktori cabang olahraga.
- `pub-news.png` — Berita dan kegiatan.
- `pub-profile.png` — Profil KONI.
- `pub-login.png` — Login internal.

### Web Admin
- `00-admin-dashboard.png` — Dashboard.
- `adm-finance.png` — Ringkasan keuangan.
- `adm-fund.png` — Dana masuk.
- `adm-budget.png` — Anggaran dan alokasi.
- `adm-realization.png` — Realisasi pengeluaran.
- `adm-incentive.png` — Insentif.
- `adm-tax.png` — Pajak.
- `adm-submissions.png` — Pengajuan.
- `adm-approvals.png` — Persetujuan.
- `adm-rab.png` — Form/detail RAB.
- `adm-lpj.png` — LPJ.
- `adm-cabor.png` — Data cabor.
- `adm-documents.png` — Dokumen.
- `adm-reports.png` — Laporan.
- `adm-settings.png` — Pengaturan.

### Android / mobile
- `mob-home.png` — Beranda.
- `mob-finance.png` — Keuangan.
- `mob-submissions.png` — Pengajuan.
- `mob-notifications.png` — Notifikasi.
- `mob-account.png` — Akun.
- `mob-rab-form.png` — Form RAB.
- `mob-expense-form.png` — Input pengeluaran.
- `mob-lpj.png` — LPJ.

## Cakupan prototipe

- Navigasi antarmenu dan perpindahan kanal.
- Form demo, modal konfirmasi, notifikasi toast, filter tabel sederhana.
- Komponen dashboard, KPI, chart ilustratif, tabel, status, kartu, form, dan responsive layout.
- Visualisasi desktop untuk web dan viewport mobile untuk Android.

## Batasan — bukan aplikasi produksi

Data angka, cabor, transaksi, dan nama kegiatan adalah **data ilustrasi**. Form dan tombol hanya mensimulasikan interaksi di browser. Belum ada:

- Backend NestJS, REST API, database PostgreSQL, autentikasi, RBAC server-side.
- Approval workflow yang benar-benar menyimpan keputusan.
- Upload dokumen ke object storage, push notification, audit log permanen, PDF/Excel resmi.
- Validasi pagu dan transaksi yang mengikat ke data database.
- Build Android APK/AAB atau integrasi Google Play.

Jangan menggunakan prototipe ini untuk memproses transaksi atau data pribadi/keuangan nyata.

## Rekomendasi implementasi lanjutan

- Web: Next.js + TypeScript.
- Mobile: React Native + Expo + TypeScript.
- API: NestJS + TypeScript.
- Database: PostgreSQL; gunakan decimal/money-safe arithmetic.
- ORM: Prisma stable release.
- API contract: OpenAPI/Swagger.
- File: S3-compatible private object storage.
- Notification: Firebase Cloud Messaging.
- Deployment: Docker; pisahkan development, staging, production.

Finalisasi Business Rules, approval matrix, ERD, dan API contract sebelum implementasi transaksi keuangan.
