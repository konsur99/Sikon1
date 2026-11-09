import React from 'react';
import Link from 'next/link';
import { Shield, BarChart3, Newspaper, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sikoni-navy to-sikoni-navy2 text-white py-20 px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-sikoni-gold font-bold text-xs tracking-wider uppercase">
            KONI SURAKARTA • SISTEM INFORMASI OLAHRAGA
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Membangun prestasi.<br />Memperkuat tata kelola.
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Portal informasi dan layanan administrasi olahraga Kota Surakarta. Satu ruang untuk mengenal cabang olahraga, mengikuti kegiatan, dan mengakses transparansi anggaran yang telah disahkan secara resmi.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              href="/cabor"
              className="bg-sikoni-teal text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-teal-700 shadow-lg flex items-center gap-2"
            >
              Jelajahi Cabang Olahraga <ArrowRight size={16} />
            </Link>
            <Link
              href="/transparansi"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-3 rounded-xl border border-white/20 transition-all"
            >
              Lihat Transparansi Anggaran
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Big Public Stats */}
      <section className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sikoni border border-sikoni-line">
          <div className="text-center p-3">
            <div className="text-3xl font-black text-sikoni-navy">42</div>
            <div className="text-xs text-sikoni-muted mt-1 font-medium">Cabang Olahraga Terdaftar</div>
          </div>
          <div className="text-center p-3 border-l border-sikoni-line">
            <div className="text-3xl font-black text-sikoni-navy">1.250+</div>
            <div className="text-xs text-sikoni-muted mt-1 font-medium">Atlet Kota Terdata</div>
          </div>
          <div className="text-center p-3 border-l border-sikoni-line">
            <div className="text-3xl font-black text-sikoni-navy">86</div>
            <div className="text-xs text-sikoni-muted mt-1 font-medium">Program & Kegiatan</div>
          </div>
          <div className="text-center p-3 border-l border-sikoni-line">
            <div className="text-3xl font-black text-sikoni-teal">2026</div>
            <div className="text-xs text-sikoni-muted mt-1 font-medium">Tahun Informasi Aktif</div>
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-sikoni-navy tracking-tight">Informasi dan Layanan</h2>
          <p className="text-xs text-sikoni-muted mt-1">
            Informasi publik yang telah disetujui untuk ditampilkan oleh KONI Surakarta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-sikoni flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sikoni-teal2 text-sikoni-teal grid place-items-center">
                <Shield size={24} />
              </div>
              <h3 className="text-base font-extrabold text-sikoni-navy">Cabang Olahraga</h3>
              <p className="text-xs text-sikoni-muted leading-relaxed">
                Jelajahi profil lengkap cabang olahraga resmi, kontak pengurus, dan data pembinaan atlet Kota Surakarta.
              </p>
            </div>
            <Link href="/cabor" className="text-xs font-bold text-sikoni-teal mt-4 flex items-center gap-1.5 hover:underline">
              Lihat cabor →
            </Link>
          </div>

          <div className="card-sikoni flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sikoni-gold2 text-sikoni-gold grid place-items-center">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-base font-extrabold text-sikoni-navy">Transparansi Anggaran</h3>
              <p className="text-xs text-sikoni-muted leading-relaxed">
                Ringkasan informasi alokasi dan realisasi penggunaan anggaran yang telah melalui persetujuan publikasi.
              </p>
            </div>
            <Link href="/transparansi" className="text-xs font-bold text-sikoni-gold mt-4 flex items-center gap-1.5 hover:underline">
              Lihat transparansi →
            </Link>
          </div>

          <div className="card-sikoni flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-sikoni-navy grid place-items-center">
                <Newspaper size={24} />
              </div>
              <h3 className="text-base font-extrabold text-sikoni-navy">Berita dan Kegiatan</h3>
              <p className="text-xs text-sikoni-muted leading-relaxed">
                Informasi agenda kejuaraan, pengumuman resmi organisasi, dan kabar prestasi olahraga Surakarta.
              </p>
            </div>
            <Link href="/berita" className="text-xs font-bold text-sikoni-navy mt-4 flex items-center gap-1.5 hover:underline">
              Baca berita →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

