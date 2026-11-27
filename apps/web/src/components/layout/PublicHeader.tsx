'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, Smartphone, Building2, User } from 'lucide-react';
import { useDisplayMode } from '../../context/DisplayModeContext';
import { useAuth } from '../../context/AuthContext';

export const PublicHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setMode } = useDisplayMode();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/transparansi', label: 'Transparansi' },
    { href: '/cabor', label: 'Cabang Olahraga' },
    { href: '/berita', label: 'Berita' },
    { href: '/profil', label: 'Profil' },
  ];

  return (
    <header className="h-16 sm:h-[68px] bg-white/95 backdrop-blur-md border-b border-sikoni-line flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
      <Link href="/" className="flex items-center gap-2.5 sm:gap-3" onClick={() => setMobileMenuOpen(false)}>
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center p-0.5 rounded-xl bg-white shadow-xs border border-slate-200/80 overflow-hidden">
          <img
            alt="Logo KONI Surakarta"
            width={40}
            height={40}
            className="w-full h-full max-w-full max-h-full object-contain filter drop-shadow-xs"
            src="/images/logo_koni.png"
          />
        </div>
        <div>
          <div className="text-[13px] sm:text-[15px] font-black tracking-tight text-onyx flex items-center gap-1.5 leading-none">
            <span>KONI SURAKARTA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
          </div>
          <div className="text-[8.5px] sm:text-[9.5px] text-slate-400 tracking-wider font-extrabold uppercase mt-0.5">
            KOTA SURAKARTA · SISTEM INFORMASI TERPADU
          </div>
        </div>
      </Link>

      {/* Desktop Navigation Links (Laptop / PC) */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-semibold transition-colors ${isActive ? 'text-sikoni-teal font-bold' : 'text-[#4a5568] hover:text-sikoni-navy'
                }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="flex items-center gap-2.5 pl-4 border-l border-sikoni-line">
          {/* SIKONI Android App Button */}
          <button
            onClick={() => {
              setMode('android');
              router.push('/');
            }}
            className="text-xs font-bold text-sikoni-teal bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone size={13} />
            <span>Versi Android</span>
          </button>

          {/* Quick switcher to Admin with Auth Check */}
          {user ? (
            <Link
              href="/admin/dashboard"
              className="text-xs font-bold text-sikoni-navy bg-[#edf2f7] hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <User size={13} className="text-sikoni-teal" />
              <span>{user.name.split(',')[0]} (Admin) →</span>
            </Link>
          ) : (
            <>
              <button
                onClick={() => router.push('/login?redirect=/admin/dashboard')}
                className="text-xs font-semibold text-sikoni-navy bg-[#edf2f7] px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Building2 size={13} className="text-sikoni-teal" />
                <span>Portal Admin →</span>
              </button>
              <Link
                href="/login"
                className="bg-sikoni-teal text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-700 shadow-sm transition-all"
              >
                Masuk
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Hamburger Button (Android / Smartphone) */}
      <div className="flex items-center gap-2 md:hidden">
        <Link
          href="/login"
          className="bg-sikoni-teal text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm"
        >
          Masuk
        </Link>
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Mobile Menu"
          className="p-2 text-sikoni-navy hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu (Android Screen Adaptive) */}
      {mobileMenuOpen && (
        <div className="absolute top-16 sm:top-[68px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-5 z-40 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            <span className="text-[10px] font-bold text-sikoni-muted uppercase tracking-wider px-2">
              Menu Navigasi
            </span>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${isActive
                    ? 'bg-emerald-50 text-sikoni-teal font-bold border border-emerald-200/80'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sikoni-teal" />}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMode('android');
                  router.push('/');
                }}
                className="w-full text-center text-xs font-bold text-white bg-gradient-to-r from-sikoni-teal to-teal-700 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Smartphone size={14} />
                <span>Buka SIKONI Versi Android</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (user) {
                    router.push('/admin/dashboard');
                  } else {
                    router.push('/login?redirect=/admin/dashboard');
                  }
                }}
                className="w-full text-center text-xs font-bold text-sikoni-navy bg-slate-100 py-2.5 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Building2 size={14} className="text-sikoni-teal" />
                <span>{user ? 'Dashboard Administrasi' : 'Masuk Portal Admin'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const PublicFooter: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 mt-auto">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#142a43] via-[#1b3a5c] to-[#142a43] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs w-full md:w-auto">
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
                <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">🏛️ Portal Admin KONI</Link></li>
                <li><Link href="/admin/lpj" className="hover:text-white transition-colors">📄 Generator Word LPJ</Link></li>
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
            SIKONI v2.1 • Responsif Android & Desktop
          </span>
        </div>
      </div>
    </footer>
  );
};

