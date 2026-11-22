import React from 'react';
import Link from 'next/link';
import { Shield, BarChart3, Newspaper, ArrowRight, Award, Trophy, Users, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#142a43] via-[#1b395a] to-[#168b8b] text-white py-12 sm:py-20 px-4 sm:px-8 relative overflow-hidden shadow-xl">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sikoni-gold font-bold text-[10.5px] sm:text-xs tracking-wider uppercase border border-white/15 backdrop-blur-sm shadow-sm">
            <Trophy size={14} className="text-sikoni-gold flex-shrink-0" />
            <span className="truncate">KONI SURAKARTA • SISTEM OLAHRAGA TERPADU</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Membangun Prestasi Juara.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sikoni-gold via-amber-200 to-sikoni-gold">
              Memperkuat Tata Kelola Akuntabel.
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Portal informasi resmi dan layanan terpadu pembinaan olahraga Kota Surakarta. Akses direktori 64 cabang olahraga, agenda kejuaraan daerah, serta transparansi dana hibah APBD secara terbuka dan akuntabel.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/cabor"
              className="bg-sikoni-gold hover:bg-amber-400 text-sikoni-navy font-black text-xs px-5 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <span>Jelajahi 64 Cabor</span> <ArrowRight size={15} />
            </Link>
            <Link
              href="/transparansi"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/25 transition-all backdrop-blur-sm text-center"
            >
              Transparansi Anggaran
            </Link>
            <Link
              href="/admin/dashboard"
              className="bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl border border-emerald-400/30 transition-all backdrop-blur-sm text-center"
            >
              🏛️ Portal Admin & LPJ →
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Big Public Stats in Premium Elevated Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-6 rounded-2xl shadow-[0_12px_36px_rgba(20,42,67,0.12)] border border-slate-200/90 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
          <div className="text-center p-2.5 sm:p-3">
            <div className="text-2xl sm:text-3xl font-black text-sikoni-navy">64</div>
            <div className="text-[10px] sm:text-xs text-sikoni-muted mt-1 font-bold">Cabang Olahraga</div>
          </div>
          <div className="text-center p-2.5 sm:p-3 border-l border-slate-200">
            <div className="text-2xl sm:text-3xl font-black text-sikoni-teal">1.450+</div>
            <div className="text-[10px] sm:text-xs text-sikoni-muted mt-1 font-bold">Atlet & Pelatih</div>
          </div>
          <div className="text-center p-2.5 sm:p-3 border-t sm:border-t-0 md:border-l border-slate-200">
            <div className="text-2xl sm:text-3xl font-black text-sikoni-gold">124</div>
            <div className="text-[10px] sm:text-xs text-sikoni-muted mt-1 font-bold">Medali Porprov</div>
          </div>
          <div className="text-center p-2.5 sm:p-3 border-t sm:border-t-0 border-l border-slate-200">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">Rp 12,8 M</div>
            <div className="text-[10px] sm:text-xs text-sikoni-muted mt-1 font-bold">Hibah APBD Terbuka</div>
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-sikoni-navy tracking-tight">Informasi dan Layanan Publik</h2>
            <p className="text-xs text-sikoni-muted mt-1">
              Data resmi kepengurusan, transparansi penggunaan anggaran, dan informasi keolahragaan Surakarta.
            </p>
          </div>
          <span className="text-xs font-bold text-sikoni-teal bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 self-start md:self-auto">
            Terbuka Untuk Publik
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Cabor */}
          <div className="card-sikoni flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-teal" />
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-sikoni-teal grid place-items-center shadow-sm border border-emerald-100 group-hover:scale-105 transition-transform">
                <Shield size={24} />
              </div>
              <h3 className="text-base font-extrabold text-sikoni-navy group-hover:text-sikoni-teal transition-colors">
                64 Cabang Olahraga
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jelajahi profil lengkap 64 cabor resmi, susunan dewan pengurus, kontak sekretariat, dan data pembinaan atlet Kota Surakarta.
              </p>
            </div>
            <Link
              href="/cabor"
              className="text-xs font-bold text-sikoni-teal mt-5 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline"
            >
              <span>Buka Direktori Cabor</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Transparansi */}
          <div className="card-sikoni flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-gold" />
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-sikoni-gold grid place-items-center shadow-sm border border-amber-100 group-hover:scale-105 transition-transform">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-base font-extrabold text-sikoni-navy group-hover:text-amber-700 transition-colors">
                Transparansi Anggaran
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ringkasan alokasi dana hibah APBD dan realisasi kas per bidang yang telah disahkan secara resmi dan bebas gratifikasi.
              </p>
            </div>
            <Link
              href="/transparansi"
              className="text-xs font-bold text-amber-700 mt-5 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline"
            >
              <span>Lihat Anggaran Publik</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Berita & Prestasi */}
          <div className="card-sikoni flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-navy" />
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-sikoni-navy grid place-items-center shadow-sm border border-slate-200 group-hover:scale-105 transition-transform">
                <Newspaper size={24} />
              </div>
              <h3 className="text-base font-extrabold text-sikoni-navy group-hover:text-sikoni-teal transition-colors">
                Berita & Prestasi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Informasi agenda kejuaraan, liputan pembinaan atlet berprestasi, pengumuman resmi, dan galeri kegiatan olahraga Surakarta.
              </p>
            </div>
            <Link
              href="/berita"
              className="text-xs font-bold text-sikoni-navy mt-5 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline"
            >
              <span>Baca Berita Terkini</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
