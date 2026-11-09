# SIKONI — Sistem Informasi KONI Surakarta
**Enterprise Monorepo: Web Publik, Web Admin, Mobile Android & NestJS Backend**

SIKONI adalah sistem informasi terpadu Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta yang melayani tiga kanal utama menggunakan satu backend API terpusat sebagai *single source of truth*:

1. **Website Publik:** Portal informasi masyarakat untuk direktori cabang olahraga, berita & kegiatan, profil kelembagaan, serta transparansi anggaran yang telah disetujui publikasi.
2. **Web Admin KONI:** Dashboard eksekutif pengelolaan pagu anggaran, penerimaan dana masuk, realisasi pengeluaran, insentif, perpajakan, verifikasi usulan RAB, bertingkat approval workflow, pemeriksaan LPJ, master data cabor, dan arsip digital.
3. **Aplikasi Android (Mobile):** Aplikasi operasional untuk pengurus dan operator cabang olahraga untuk memantau ringkasan kegiatan, menyusun RAB, menginput pengeluaran beserta foto nota transaksi, memantau status persetujuan, dan menyusun laporan pertanggungjawaban (LPJ).

---

## 🏛️ Struktur Monorepo

```
SIKONI/
├── apps/
│   ├── api/            # Backend NestJS + TypeScript (REST + OpenAPI Swagger)
│   ├── web/            # Frontend Next.js (App Router) + TypeScript + Tailwind CSS
│   └── mobile/         # Mobile Android React Native Expo + TypeScript
├── packages/
│   ├── database/       # Prisma ORM Schema PostgreSQL (45 Tabel Domain, Migrations, Seeds)
│   └── shared/         # Shared Enums, DTOs, dan Decimal-Safe Currency Arithmetic (MoneyMath)
├── docs/
│   ├── architecture.md             # Blueprint Arsitektur, ERD Mermaid, Kamus Data & Status Model
│   ├── business-rules-questions.md # Aturan Bisnis Kritis & Pertanyaan Blocking Stakeholder
│   ├── test-plan.md                # UAT, Security Tests, Cabor Isolation, & Prosedur Backup/Restore
│   └── deployment.md               # Panduan Deployment Server Produksi, Docker & Nginx SSL
├── mockup/                         # Salinan Prototipe Mockup Asli (index.html, screenshots, README)
├── docker-compose.yml              # PostgreSQL 16, MinIO Private Storage, NestJS API, Next.js Web
└── package.json                    # Konfigurasi Monorepo Workspaces
```

---

## 🔒 Prinsip & Integritas Bisnis

- **Satu Backend Tunggal:** Aturan bisnis, validasi pagu, dan approval dieksekusi di backend NestJS. Frontend tidak pernah menyentuh database secara langsung.
- **Isolasi Akses Cabor (Cabor Scope):** Akun Operator Cabor (misal PASI) secara ketat dibatasi hanya dapat membaca dan menginput transaksi untuk cabornya sendiri melalui `CaborScopeGuard`.
- **Maker-Approver Invariant:** Pembuat transaksi (*maker*) tidak diizinkan menjadi approver untuk pengajuannya sendiri (*four-eyes principle*).
- **Pemisahan Status Keuangan:** Pengeluaran berstatus `VERIFIED` tidak otomatis berarti sudah dibayar kas. Nilai yang belum dibayar dihitung murni dari kewajiban yang telah diverifikasi sah.
- **Aritmatika Uang Bebas Galat (Decimal-Safe):** Seluruh kalkulasi nominal menggunakan class `MoneyMath` (sen berbasis integer/BigInt) dan tipe database PostgreSQL `@db.Decimal(15, 2)`, mencegah bug floating-point JavaScript.
- **Penyimpanan Berkas Privat:** Berkas bukti transaksi, invoice, dan LPJ disimpan di private object storage dengan akses menggunakan presigned URL berumur pendek (15 menit). Tidak ada bukti transaksi yang dibuka bebas ke publik.

---

## 🚀 Panduan Menjalankan Sistem Secara Lokal

### Prasyarat:
- Node.js v20+ atau v24+
- npm v10+ atau v11+
- PostgreSQL (atau via Docker Compose)

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Membangun Paket Bersama (Shared & Database)
```bash
npm run build:packages
```

### 3. Menjalankan Docker Database & MinIO (Opsional jika pakai Docker)
```bash
docker compose up -d postgres minio
```

### 4. Menjalankan Layanan Pengembangan (Dev Server)

- **Menjalankan Web Frontend (Next.js):**
  ```bash
  npm run dev:web
  ```
  Buka browser di:
  - Website Publik: [http://localhost:3000](http://localhost:3000)
  - Dashboard Admin: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)
  - Pratinjau Android Interaktif: [http://localhost:3000/android-preview](http://localhost:3000/android-preview)

- **Menjalankan Backend API (NestJS):**
  ```bash
  npm run dev:api
  ```
  - API Base URL: `http://localhost:4000/api/v1`
  - OpenAPI Swagger UI: `http://localhost:4000/api/docs`

- **Menjalankan Aplikasi Android (Expo React Native):**
  ```bash
  npm run dev:mobile
  ```

---

## 🧪 Menjalankan Pengujian Otomatis (Automated Tests)

```bash
npm run test:api
```
Pengujian mencakup:
1. `cabor-isolation.spec.ts` — Memverifikasi isolasi hak akses operator cabang olahraga.
2. `approval-maker-invariant.spec.ts` — Memverifikasi larangan pembuat menyetujui transaksinya sendiri.
3. `decimal-arithmetic.spec.ts` — Memverifikasi presisi kalkulasi Rupiah pada angka besar.

---

## 🎨 Identitas Desain Visual SIKONI
- **Navy Primary:** `#142a43`
- **Navy Secondary:** `#1d3a59`
- **Teal Accent:** `#168b8b`
- **Gold Accent:** `#d7ac57`
- **Background:** `#f4f6f9`
- **Border Radius:** `15px`
- **Card Shadow:** `0 10px 28px rgba(24, 41, 62, 0.07)`

