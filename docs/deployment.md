# Panduan Deployment Produksi & Konfigurasi Server SIKONI

Panduan ini menjelaskan langkah demi langkah untuk melakukan deployment sistem SIKONI (Sistem Informasi KONI Surakarta) pada server Ubuntu 22.04 LTS / 24.04 LTS menggunakan Docker dan Nginx Reverse Proxy dengan enkripsi SSL Let's Encrypt.

---

## 1. Topologi Infrastruktur Server

```
                          Internet (HTTPS / Port 443)
                                       │
                                       ▼
                   ┌───────────────────────────────────────┐
                   │       Nginx Reverse Proxy & SSL       │
                   └───────────────────┬───────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                │                                             │
    Proxy ke Port 3000                            Proxy ke Port 4000
                │                                             │
                ▼                                             ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│     Next.js Web Frontend      │             │       NestJS Backend API      │
│ (Publik & Web Admin SIKONI)   │             │   (Single Source of Truth)    │
└───────────────────────────────┘             └───────────────┬───────────────┘
                                                              │
                                            ┌─────────────────┴─────────────────┐
                                            │                                   │
                                            ▼                                   ▼
                            ┌───────────────────────────────┐   ┌───────────────────────────────┐
                            │      PostgreSQL Database      │   │    MinIO Private Storage      │
                            │   (Decimal Money Arithmetic)  │   │  (Short-lived Signed URLs)    │
                            └───────────────────────────────┘   └───────────────────────────────┘
```

---

## 2. Prasyarat Server (Hardware & Software)

- **OS:** Ubuntu 22.04 LTS atau 24.04 LTS x86_64
- **Spesifikasi Minimum:** 4 vCPU, 8 GB RAM, 100 GB SSD (NVMe direkomendasikan)
- **Domain:**
  - `sikoni.surakarta.go.id` (Website Publik & Web Admin)
  - `api-sikoni.surakarta.go.id` (API Gateway & OpenAPI Docs)
  - `storage-sikoni.surakarta.go.id` (Private Object Storage)
- **Software:** Docker CE & Docker Compose v2, Git, Nginx, Certbot.

---

## 3. Langkah-Langkah Deployment

### Langkah 1: Clone Repositori Monorepo
```bash
git clone https://github.com/koni-surakarta/sikoni.git /var/www/sikoni
cd /var/www/sikoni
```

### Langkah 2: Konfigurasi Environment Variables
Salin file `.env.example` ke `.env` dan perbarui parameter produksi:
```bash
cp .env.example .env
nano .env
```
Pastikan mengubah nilai `JWT_SECRET`, kredensial database `POSTGRES_PASSWORD`, dan secret MinIO.

### Langkah 3: Menjalankan Kontainer dengan Docker Compose
```bash
docker compose up -d --build
```
Periksa status kontainer:
```bash
docker compose ps
```

### Langkah 4: Menjalankan Migrasi dan Seeding Data
```bash
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

---

## 4. Konfigurasi Nginx Reverse Proxy & SSL

Buat file konfigurasi `/etc/nginx/sites-available/sikoni.conf`:

```nginx
# 1. API Backend Gateway
server {
    server_name api-sikoni.surakarta.go.id;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 25M;
    }
}

# 2. Web Frontend (Publik & Admin)
server {
    server_name sikoni.surakarta.go.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan konfigurasi dan terapkan sertifikat SSL Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/sikoni.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d sikoni.surakarta.go.id -d api-sikoni.surakarta.go.id
```

---

## 5. Build dan Rilis Aplikasi Android APK / AAB
Aplikasi mobile dikompilasi menggunakan Expo Application Services (EAS):
```bash
cd apps/mobile
npm install -g eas-cli
eas login
eas build --platform android --profile production
```
File APK/AAB hasil build akan siap didistribusikan ke pengurus cabor atau Google Play Store.

