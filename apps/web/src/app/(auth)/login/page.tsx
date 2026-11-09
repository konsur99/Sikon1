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
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4">
      <div className="card-sikoni w-full max-w-md p-8 space-y-6 shadow-xl border border-sikoni-line">
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
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => selectPersona('admin@koni-surakarta.id', '/admin/dashboard')}
              className="p-2 rounded-xl bg-slate-50 border border-sikoni-line hover:border-sikoni-navy text-center flex flex-col items-center gap-1 transition-all"
            >
              <ShieldCheck size={16} className="text-sikoni-navy" />
              <b className="text-[10px] text-sikoni-navy">Admin KONI</b>
            </button>

            <button
              type="button"
              onClick={() => selectPersona('bendahara@koni-surakarta.id', '/admin/dashboard')}
              className="p-2 rounded-xl bg-slate-50 border border-sikoni-line hover:border-sikoni-teal text-center flex flex-col items-center gap-1 transition-all"
            >
              <UserCheck size={16} className="text-sikoni-teal" />
              <b className="text-[10px] text-sikoni-teal">Bendahara</b>
            </button>

            <button
              type="button"
              onClick={() => selectPersona('operator@pasi.demo', '/android-preview')}
              className="p-2 rounded-xl bg-slate-50 border border-sikoni-line hover:border-sikoni-gold text-center flex flex-col items-center gap-1 transition-all"
            >
              <Smartphone size={16} className="text-sikoni-gold" />
              <b className="text-[10px] text-sikoni-gold">Operator Cabor</b>
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4 text-xs pt-2 border-t border-sikoni-line"
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
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-sm p-6 space-y-4 shadow-2xl">
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
              <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-sikoni-navy font-semibold">
                  <Mail size={14} className="text-sikoni-teal" /> sekretariat@koni-surakarta.id
                </div>
                <div className="flex items-center gap-2 text-sikoni-navy font-semibold">
                  <Phone size={14} className="text-sikoni-teal" /> (0271) 714930
                </div>
                <div className="flex items-center gap-2 text-sikoni-muted text-[11px]">
                  <MapPin size={14} /> Gedung Sekretariat KONI, Manahan Surakarta
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
