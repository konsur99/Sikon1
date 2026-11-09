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
    <footer className="bg-white border-t border-sikoni-line py-12 px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-extrabold text-base text-sikoni-navy">KONI SURAKARTA</div>
          <p className="text-xs text-sikoni-muted mt-1 max-w-sm">
            Mendorong prestasi olahraga dan tata kelola organisasi yang transparan, akuntabel, dan berbasis data.
          </p>
        </div>

        <div>
          <div className="font-bold text-xs text-sikoni-navy uppercase tracking-wider">SIKONI</div>
          <p className="text-xs text-sikoni-muted mt-1">
            Portal Informasi Publik & Sistem Administrasi Olahraga Terpadu
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-sikoni-line text-center text-xs text-sikoni-muted">
        © 2026 KONI Kota Surakarta • Seluruh hak cipta dilindungi undang-undang.
      </div>
    </footer>
  );
};

