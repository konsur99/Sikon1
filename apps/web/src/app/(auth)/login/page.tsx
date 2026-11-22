'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Smartphone, Check, X, Phone, Mail, MapPin, FileCheck2, Lock } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../../../context/AuthContext';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin/dashboard';
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('admin@koni-surakarta.id');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLogin = (email = identifier, target = redirectTarget) => {
    setLoading(true);
    setTimeout(() => {
      login(email, target);
      setLoading(false);
    }, 400);
  };

  const selectPersona = (email: string, target = redirectTarget) => {
    setIdentifier(email);
    handleLogin(email, target);
  };

  return (
    <div className="card-sikoni relative overflow-hidden w-full max-w-md p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl border border-slate-200/90">
      <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
      
      <div className="text-center space-y-2">
        <div className="brand-mark mx-auto mb-3">SK</div>
        <h2 className="text-2xl font-black text-sikoni-navy tracking-tight">Portal Akses SIKONI</h2>
        <p className="text-xs text-sikoni-muted max-w-xs mx-auto">
          Autentikasi resmi pengurus KONI Kota Surakarta & operator cabang olahraga.
        </p>
      </div>

      {/* Security notice if redirected from protected route */}
      {searchParams.get('redirect') && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
          <Lock size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <span>
            <b>Sesi Diperlukan:</b> Rute <code>{searchParams.get('redirect')}</code> memerlukan autentikasi. Silakan login atau pilih akun demo di bawah untuk melanjutkan.
          </span>
        </div>
      )}

      {/* Quick Demo Persona Selector */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-sikoni-muted uppercase tracking-wider">
            Pilih Peran Demo Pengujian:
          </span>
          <span className="text-[10px] bg-emerald-50 text-sikoni-teal px-2 py-0.5 rounded-full font-bold border border-emerald-100">
            Aman (Staging)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => selectPersona('admin@koni-surakarta.id')}
            className="p-2.5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 hover:border-sikoni-navy hover:shadow-md text-left flex items-center gap-2.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-sikoni-navy grid place-items-center group-hover:scale-105 transition-transform flex-shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <b className="text-[11px] text-sikoni-navy block leading-tight">Admin KONI</b>
              <span className="text-[9.5px] text-slate-500">Full Access</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => selectPersona('bendahara@koni-surakarta.id')}
            className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-50/50 to-white border border-teal-200/80 hover:border-sikoni-teal hover:shadow-md text-left flex items-center gap-2.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-sikoni-teal grid place-items-center group-hover:scale-105 transition-transform flex-shrink-0">
              <UserCheck size={16} />
            </div>
            <div>
              <b className="text-[11px] text-sikoni-teal block leading-tight">Bendahara</b>
              <span className="text-[9.5px] text-slate-500">Keuangan & SP2D</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => selectPersona('verifikator@koni-surakarta.id')}
            className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-200/80 hover:border-indigo-600 hover:shadow-md text-left flex items-center gap-2.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center group-hover:scale-105 transition-transform flex-shrink-0">
              <FileCheck2 size={16} />
            </div>
            <div>
              <b className="text-[11px] text-indigo-700 block leading-tight">Verifikator</b>
              <span className="text-[9.5px] text-slate-500">Review LPJ & RAB</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => selectPersona('pasi@cabor.koni-surakarta.id')}
            className="p-2.5 rounded-xl bg-gradient-to-br from-amber-50/50 to-white border border-amber-200/80 hover:border-sikoni-gold hover:shadow-md text-left flex items-center gap-2.5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-sikoni-gold grid place-items-center group-hover:scale-105 transition-transform flex-shrink-0">
              <Smartphone size={16} />
            </div>
            <div>
              <b className="text-[11px] text-amber-800 block leading-tight">Operator PASI</b>
              <span className="text-[9.5px] text-slate-500">Cabor Atletik</span>
            </div>
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-3.5 text-xs pt-2 border-t border-slate-100"
      >
        <div>
          <label className="font-bold text-sikoni-navy block mb-1">Email / Akun Resmi</label>
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
          className="w-full bg-sikoni-teal hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md text-xs mt-2 cursor-pointer active:scale-95"
        >
          {loading ? 'Memvalidasi Sesi & Hak Akses...' : 'Masuk ke Portal Internal'}
        </button>
      </form>

      <div className="text-center text-xs text-sikoni-muted">
        Lupa kata sandi atau butuh akses?{' '}
        <button
          type="button"
          onClick={() => setShowHelpModal(true)}
          className="text-sikoni-teal font-bold hover:underline"
        >
          Hubungi Sekretariat
        </button>
      </div>

      <div className="pt-3 border-t border-sikoni-line text-center">
        <Link href="/" className="text-xs font-semibold text-sikoni-muted hover:text-sikoni-navy">
          ← Kembali ke Beranda Publik
        </Link>
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
                Untuk menjaga integritas dan keamanan data keuangan hibah, penerbitan akun operator cabor dan reset kredensial dilakukan langsung oleh Administrator Sekretariat KONI Surakarta:
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

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-6 sm:py-12 px-3.5 sm:px-4">
      <Suspense fallback={<div className="text-xs text-slate-400">Memuat formulir login...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
