# Rencana Pengujian (Test Plan), UAT & Prosedur Backup/Restore SIKONI

Dokumen ini mendefinisikan strategi pengujian menyeluruh untuk memverifikasi fungsionalitas, keamanan data, isolasi cabang olahraga, integritas keuangan, dan prosedur pemulihan bencana (*Disaster Recovery*).

---

## 1. Matriks Rencana Pengujian (Test Matrix)

| Kategori Pengujian | Lingkup & Tujuan | Metodologi | Kriteria Kelulusan |
|---|---|---|---|
| **Cabor Isolation Test** | Memastikan akun Operator Cabor (misal PASI) tidak dapat membaca atau memanipulasi data cabor lain (PBSI, PSSI). | Integration Test via `CaborScopeGuard` & unit tests. | Response `403 Forbidden` jika mengakses `caborId` di luar assignment user. |
| **Maker-Approver Invariant** | Memastikan pembuat transaksi (*maker*) tidak dapat menyetujui pengajuannya sendiri (*four-eyes principle*). | Automated Unit Test pada `ApprovalService`. | Response `403 Forbidden` dengan pesan pelanggaran integritas jika `actor.id === entity.createdById`. |
| **Decimal Precision Test** | Memastikan tidak terjadi galat floating point (misal: `0.1 + 0.2 != 0.3`) pada kalkulasi uang miliaran rupiah. | Unit Test pada class `MoneyMath`. | Seluruh kalkulasi presisi hingga 2 angka desimal tanpa selisih sen. |
| **Payment Invariant Test** | Memastikan pengeluaran yang belum diverifikasi sah tidak dapat dicairkan/dibayarkan. | Backend Service Test pada `PaymentsService`. | Error `400 Bad Request` bila status pengeluaran belum `VERIFIED`. |
| **Concurrency / Idempotency Test** | Menguji ketahanan terhadap pengiriman ganda akibat retry koneksi putus (*double spending / duplicate submission*). | Stress Test 50 concurrent requests dengan idempotency key. | Tepat 1 transaksi tersimpan, 49 request lainnya menerima response cached/conflict. |
| **Public Data Sanitization** | Memastikan website publik hanya mengakses tabel publikasi snapshot ter-approve, bukan transaksi privat. | Penetration / API Inspection Test. | Tidak ada tabel `expenses`, `user_cabor`, atau NIK atlet yang bocor ke endpoint `/api/v1/public/*`. |

---

## 2. Skenario UAT (User Acceptance Testing)

### Skenario 1: Alur Pengajuan RAB oleh Operator Cabor
1. Operator Cabor PASI login ke aplikasi (Android / Web).
2. Membuka menu Buat RAB, mengisi nama kegiatan: "Kejuaraan Atletik Kota Surakarta", tanggal 20–22 Nov 2026.
3. Menambahkan 4 rincian item biaya (Sewa venue Rp 15 jt, Konsumsi Rp 9 jt, Transportasi Rp 12,5 jt, Perlengkapan Rp 12 jt).
4. Total terhitung otomatis: Rp 48.500.000.
5. Operator menekan "Simpan Draft" (tersimpan lokal/draft), lalu menekan "Kirim untuk Verifikasi".
6. **Hasil yang diharapkan:** Status berubah menjadi `SUBMITTED`. Notifikasi masuk ke akun verifikator KONI.

### Skenario 2: Alur Persetujuan oleh Bendahara KONI
1. Bendahara login ke Web Admin, membuka menu Persetujuan.
2. Memilih berkas `RAB-026/VI/26`.
3. Meninjau rincian biaya dan sisa alokasi pagu PASI.
4. Menekan tombol "Setujui Berkas".
5. **Hasil yang diharapkan:** Status berubah menjadi `APPROVED`. Komitmen aktif bertambah, pagu belum dialokasikan berkurang. Catatan tersimpan di tabel `audit_logs`.

### Skenario 3: Input Pengeluaran & Pencairan Pembayaran
1. Operator cabor menginput pengeluaran `EXP-1126` (Transportasi atlet Rp 4.500.000) dan mengunggah foto nota.
2. Tim verifikator memeriksa bukti fisik nota dan memberikan status `VERIFIED`.
3. Bendahara mencairkan pembayaran `PAY-091` sebesar Rp 4.500.000 dengan referensi transfer Bank Jateng.
4. **Hasil yang diharapkan:** Status pembayaran menjadi `PAID`. Kewajiban kas berkurang Rp 4,5 jt.

---

## 3. Prosedur Backup & Restore Database PostgreSQL

### A. Prosedur Pencadangan (Backup) Otomatis
Pencadangan dilakukan setiap hari pada pukul 01.00 WIB menggunakan script cron container:

```bash
#!/bin/bash
# Script: backup_sikoni.sh
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups/postgresql"
BACKUP_FILE="${BACKUP_DIR}/sikoni_db_${TIMESTAMP}.sql.gz"

# Jalankan pg_dump dengan kompresi gzip
docker exec sikoni_postgres pg_dump -U sikoni_user -d sikoni_db | gzip > "${BACKUP_FILE}"

# Sinkronkan ke Private S3 Object Storage
aws --endpoint-url http://localhost:9000 s3 cp "${BACKUP_FILE}" s3://sikoni-backups-private/

# Hapus backup lokal yang berusia lebih dari 30 hari
find "${BACKUP_DIR}" -type f -name "*.sql.gz" -mtime +30 -delete

echo "Backup berhasil disimpan: ${BACKUP_FILE}"
```

### B. Prosedur Pemulihan (Restore) Uji Coba
Lakukan simulasi pemulihan pada environment terisolasi / staging:

```bash
# 1. Hentikan koneksi aplikasi ke database
docker stop sikoni_api

# 2. Buat database baru / reset schema
docker exec -i sikoni_postgres psql -U sikoni_user -d postgres -c "DROP DATABASE IF EXISTS sikoni_db_restore;"
docker exec -i sikoni_postgres psql -U sikoni_user -d postgres -c "CREATE DATABASE sikoni_db_restore OWNER sikoni_user;"

# 3. Pulihkan berkas dump sql terkompresi
gunzip -c /backups/postgresql/sikoni_db_20261109_010000.sql.gz | docker exec -i sikoni_postgres psql -U sikoni_user -d sikoni_db_restore

# 4. Validasi integritas data (verifikasi jumlah tabel dan record akun)
docker exec -i sikoni_postgres psql -U sikoni_user -d sikoni_db_restore -c "SELECT count(*) FROM users; SELECT count(*) FROM rabs;"

# 5. Nyalakan kembali service API
docker start sikoni_api
```

