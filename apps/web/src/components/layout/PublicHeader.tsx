'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const PublicHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/transparansi', label: 'Transparansi' },
    { href: '/cabor', label: 'Cabang Olahraga' },
    { href: '/berita', label: 'Berita' },
    { href: '/profil', label: 'Profil' },
  ];

  return (
    <header className="h-[75px] bg-white border-b border-sikoni-line flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <div className="brand-mark">SK</div>
        <div>
          <div className="text-[16px] font-extrabold tracking-wide text-sikoni-navy">KONI SURAKARTA</div>
          <div className="text-[10px] text-sikoni-muted tracking-widest font-semibold">SISTEM INFORMASI TERPADU</div>
        </div>
      </Link>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-semibold transition-colors ${
                isActive ? 'text-sikoni-teal font-bold' : 'text-[#4a5568] hover:text-sikoni-navy'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="flex items-center gap-3 pl-4 border-l border-sikoni-line">
          {/* Quick switcher to Admin */}
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-xs font-semibold text-sikoni-navy bg-[#edf2f7] px-3 py-1.5 rounded-lg hover:bg-slate-200"
          >
            Portal Admin →
          </button>
          <Link
            href="/login"
            className="bg-sikoni-teal text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-700 shadow-sm transition-all"
          >
            Masuk
          </Link>
        </div>
      </nav>
    </header>
  );
};

export const PublicFooter: React.FC = () => {
  return (
    <footer className="py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#142a43] via-[#1b3a5c] to-[#142a43] rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sikoni-gold via-sikoni-teal to-sikoni-gold" />

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 text-white font-black grid place-items-center text-sm shadow-md">
                SK
              </div>
              <div>
                <div className="font-black text-lg tracking-wide text-white">KONI KOTA SURAKARTA</div>
                <div className="text-[10px] text-sikoni-gold tracking-widest font-bold uppercase">
                  Sistem Informasi Keolahragaan Terpadu
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-200/90 leading-relaxed">
              Mendorong prestasi olahraga dan tata kelola organisasi yang transparan, akuntabel, bebas korupsi, serta berbasis data terpadu untuk 64 cabang olahraga se-Kota Surakarta.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2">
              <b className="text-[11px] font-extrabold text-sikoni-gold uppercase tracking-wider block">
                Navigasi Publik
              </b>
              <ul className="space-y-1.5 text-slate-300">
                <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                <li><Link href="/cabor" className="hover:text-white transition-colors">64 Cabor Binaan</Link></li>
                <li><Link href="/transparansi" className="hover:text-white transition-colors">Transparansi Anggaran</Link></li>
                <li><Link href="/berita" className="hover:text-white transition-colors">Berita & Kegiatan</Link></li>
                <li><Link href="/profil" className="hover:text-white transition-colors">Profil Dewan Pengurus</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <b className="text-[11px] font-extrabold text-sikoni-gold uppercase tracking-wider block">
                Layanan Digital
              </b>
              <ul className="space-y-1.5 text-slate-300">
                <li><Link href="/android-preview" className="hover:text-white transition-colors">📱 Aplikasi Android</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">🏛️ Portal Admin KONI</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">🔐 Login Pengurus & Cabor</Link></li>
              </ul>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <b className="text-[11px] font-extrabold text-sikoni-gold uppercase tracking-wider block">
                Sekretariat
              </b>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1, Banjarsari, Surakarta.<br />
                Telp: (0271) 714930
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2 relative z-10">
          <span>© 2026 Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta.</span>
          <span className="text-[11px] text-sikoni-gold font-semibold">
            SIKONI v2.1 • Akuntabel & Berprestasi
          </span>
        </div>
      </div>
    </footer>
  );
};

