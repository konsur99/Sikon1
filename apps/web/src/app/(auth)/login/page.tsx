'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Smartphone, Check, X, Phone, Mail, MapPin } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('admin@koni-surakarta.id');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLogin = (targetUrl = '/admin/dashboard') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(targetUrl);
    }, 500);
  };

  const selectPersona = (email: string, targetUrl: string) => {
    setIdentifier(email);
    handleLogin(targetUrl);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-6 sm:py-12 px-3.5 sm:px-4">
      <div className="card-sikoni relative overflow-hidden w-full max-w-md p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl border border-slate-200/90">
        <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
        <div className="text-center space-y-2">
          <div className="brand-mark mx-auto mb-3">SK</div>
          <h2 className="text-2xl font-black text-sikoni-navy tracking-tight">Masuk ke SIKONI</h2>
          <p className="text-xs text-sikoni-muted max-w-xs mx-auto">
            Gunakan akun resmi KONI atau akun operator cabang olahraga untuk mengakses layanan internal.
          </p>
        </div>

        {/* Quick Demo Persona Selector */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-sikoni-muted uppercase tracking-wider block">
            Pilih Akses Demo Instan:
          </span>
          <div className="grid grid-cols-3 gap-2.5 text-[11px]">
            <button
              type="button"
              onClick={() => selectPersona('admin@koni-surakarta.id', '/admin/dashboard')}
              className="p-2.5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 hover:border-sikoni-navy hover:shadow-md text-center flex flex-col items-center gap-1.5 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-sikoni-navy grid place-items-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={17} />
              </div>
              <b className="text-[10.5px] text-sikoni-navy">Admin KONI</b>
            </button>

            <button
              type="button"
              onClick={() => selectPersona('bendahara@koni-surakarta.id', '/admin/dashboard')}
              className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-50/50 to-white border border-teal-200/80 hover:border-sikoni-teal hover:shadow-md text-center flex flex-col items-center gap-1.5 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-sikoni-teal grid place-items-center group-hover:scale-110 transition-transform">
                <UserCheck size={17} />
              </div>
              <b className="text-[10.5px] text-sikoni-teal">Bendahara</b>
            </button>

            <button
              type="button"
              onClick={() => selectPersona('operator@pasi.demo', '/android-preview')}
              className="p-2.5 rounded-xl bg-gradient-to-br from-amber-50/50 to-white border border-amber-200/80 hover:border-sikoni-gold hover:shadow-md text-center flex flex-col items-center gap-1.5 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-sikoni-gold grid place-items-center group-hover:scale-110 transition-transform">
                <Smartphone size={17} />
              </div>
              <b className="text-[10.5px] text-amber-800">Operator Cabor</b>
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4 text-xs pt-2 border-t border-slate-100"
        >
          <div>
            <label className="font-bold text-sikoni-navy block mb-1">Email / Username</label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="nama@organisasi.id"
              className="w-full bg-[#f8fafc] border border-sikoni-line rounded-xl px-3.5 py-2.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal"
            />
          </div>

          <div>
            <label className="font-bold text-sikoni-navy block mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full bg-[#f8fafc] border border-sikoni-line rounded-xl px-3.5 py-2.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sikoni-teal hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md text-xs mt-2"
          >
            {loading ? 'Memverifikasi sesi...' : 'Masuk ke Sistem'}
          </button>
        </form>

        <div className="text-center text-xs text-sikoni-muted">
          Lupa kata sandi?{' '}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="text-sikoni-teal font-bold hover:underline"
          >
            Hubungi administrator
          </button>
        </div>

        <div className="pt-4 border-t border-sikoni-line text-center">
          <Link href="/" className="text-xs font-semibold text-sikoni-muted hover:text-sikoni-navy">
            ← Kembali ke Beranda Publik
          </Link>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="card-sikoni relative overflow-hidden w-[94vw] sm:w-full max-w-sm p-4 sm:p-6 space-y-4 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-sikoni-navy">Bantuan Akun & Reset Akses</h3>
              <button onClick={() => setShowHelpModal(false)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-sikoni-ink space-y-3">
              <p className="leading-relaxed">
                Untuk menjaga integritas dan keamanan data keuangan hibah, reset kata sandi dan pembaharuan akun operator cabor dilakukan langsung melalui Administrator Sekretariat KONI Surakarta:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-teal-50/60 to-white border border-teal-200/80 flex items-center gap-2 text-sikoni-navy font-semibold">
                  <Mail size={15} className="text-sikoni-teal" /> sekretariat@koni-surakarta.id
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 flex items-center gap-2 text-sikoni-navy font-semibold">
                  <Phone size={15} className="text-sikoni-teal" /> (0271) 714930
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 flex items-center gap-2 text-sikoni-muted text-[11px]">
                  <MapPin size={15} className="text-sikoni-navy" /> Gedung Sekretariat KONI, Manahan Surakarta
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-sikoni-navy text-white rounded-lg text-xs font-bold"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
