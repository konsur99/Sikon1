'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Workflow, ShieldCheck, Database, Bell, ArrowRight, X, Check, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // System settings state
  const [approvalThresholds, setApprovalThresholds] = useState({
    verifikatorLimit: 25000000,
    bendaharaLimit: 100000000,
    ketumThreshold: 100000000,
  });

  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Admin KONI Surakarta', email: 'admin@koni-surakarta.id', role: 'ADMIN_KONI', cabor: 'Semua Cabor' },
    { id: '2', name: 'Bendahara KONI', email: 'bendahara@koni-surakarta.id', role: 'BENDAHARA', cabor: 'Semua Cabor' },
    { id: '3', name: 'Operator PASI', email: 'operator@pasi.demo', role: 'OPERATOR_CABOR', cabor: 'PASI (Atletik)' },
    { id: '4', name: 'Operator PBSI', email: 'operator@pbsi.demo', role: 'OPERATOR_CABOR', cabor: 'PBSI (Bulutangkis)' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] text-sikoni-muted mb-1">SIKONI / Sistem / Pengaturan</div>
        <h1 className="text-2xl font-black text-sikoni-navy tracking-tight">Pengaturan Sistem</h1>
        <p className="text-xs text-sikoni-muted mt-0.5">
          Konfigurasi sistem enterprise, hak akses pengguna, matriks persetujuan, dan parameter operasional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User & RBAC Management */}
        <div className="card-sikoni space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-teal" />
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-sikoni-teal grid place-items-center shadow-sm">
                <Users size={18} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy">Pengguna & Hak Akses</h3>
                <p className="text-[11px] text-sikoni-muted">Manajemen kredensial dan batas wewenang</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-sikoni-teal px-2 py-0.5 rounded-full border border-emerald-200">
              RBAC Aktif
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-sikoni-teal transition-colors">
                  Manajemen Akun Pengguna
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Tambah, nonaktifkan, dan ubah profil pejabat</span>
              </div>
              <button
                onClick={() => setActiveModal('users')}
                className="bg-white border border-slate-200 hover:border-sikoni-teal text-sikoni-teal px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Kelola <ArrowRight size={12} />
              </button>
            </div>

            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-sikoni-teal transition-colors">
                  Role & Granular Permission
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Admin, Bendahara, Verifikator, & Operator Cabor</span>
              </div>
              <button
                onClick={() => setActiveModal('roles')}
                className="bg-white border border-slate-200 hover:border-sikoni-teal text-sikoni-teal px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Kelola <ArrowRight size={12} />
              </button>
            </div>

            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-sikoni-teal transition-colors">
                  Relasi Scope Cabang Olahraga
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Isolasi data antar cabor (Multi-tenant Cabor Scope)</span>
              </div>
              <button
                onClick={() => setActiveModal('cabor-scope')}
                className="bg-white border border-slate-200 hover:border-sikoni-teal text-sikoni-teal px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Kelola <ArrowRight size={12} />
              </button>
            </div>

            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-teal group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-sikoni-teal transition-colors">
                  Keamanan & Multi-Factor Auth (MFA)
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Autentikasi dua faktor untuk verifikator & bendahara</span>
              </div>
              <button
                onClick={() => setActiveModal('mfa')}
                className="bg-white border border-slate-200 hover:border-sikoni-teal text-sikoni-teal px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Kelola <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Workflow & Business Parameters */}
        <div className="card-sikoni space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-gold" />
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-sikoni-gold grid place-items-center shadow-sm">
                <Workflow size={18} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-sikoni-navy">Workflow & Parameter Bisnis</h3>
                <p className="text-[11px] text-sikoni-muted">Aturan dan ambang batas yang disahkan KONI</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
              Parametrik
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-amber-700 transition-colors">
                  Approval Matrix (Persetujuan Bertingkat)
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Batas nominal disposisi Verifikator, Bendahara, & Ketum</span>
              </div>
              <button
                onClick={() => setActiveModal('approval-matrix')}
                className="bg-white border border-slate-200 hover:border-sikoni-gold text-amber-700 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Konfigurasi <ArrowRight size={12} />
              </button>
            </div>

            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-amber-700 transition-colors">
                  Tahun Anggaran & Pagu Induk
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Penetapan batas plafon dana hibah tahun 2026</span>
              </div>
              <button
                onClick={() => setActiveModal('fiscal-year')}
                className="bg-white border border-slate-200 hover:border-sikoni-gold text-amber-700 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Konfigurasi <ArrowRight size={12} />
              </button>
            </div>

            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-amber-700 transition-colors">
                  Standar Biaya Masukan (SBM)
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Plafon uang saku atlet, transport, dan katering</span>
              </div>
              <button
                onClick={() => setActiveModal('sbm')}
                className="bg-white border border-slate-200 hover:border-sikoni-gold text-amber-700 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Konfigurasi <ArrowRight size={12} />
              </button>
            </div>

            <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold group">
              <div>
                <b className="text-sikoni-navy block text-xs group-hover:text-amber-700 transition-colors">
                  Konfigurasi Aturan Pajak Transaksi
                </b>
                <span className="text-[10.5px] text-slate-500 font-medium">Rumus PPh 21, PPh 23, PPN, dan tarif NPWP</span>
              </div>
              <Link
                href="/admin/pajak"
                className="bg-white border border-slate-200 hover:border-sikoni-gold text-amber-700 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1"
              >
                Buka Modul <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Audit System */}
      <div className="card-sikoni space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-sikoni-navy" />
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 grid place-items-center shadow-sm">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-sikoni-navy">Keamanan, Audit, & Keandalan Infrastruktur</h3>
              <p className="text-[11px] text-sikoni-muted">Parameter operasional sistem kritikal Kota Surakarta</p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
            Audit Trail Siap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-emerald-600 hover:shadow-md transition-all">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase tracking-wider">Audit Trail</span>
            <b className="text-xs text-sikoni-navy mt-1 block">Aktif (Append-Only)</b>
            <small className="text-[10px] text-sikoni-green font-semibold">Mencatat IP & payload mutasi</small>
          </div>

          <div className="p-3.5 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-sikoni-teal hover:shadow-md transition-all">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase tracking-wider">Backup Database</span>
            <b className="text-xs text-sikoni-navy mt-1 block">Otomatis Tiap Hari</b>
            <small className="text-[10px] text-sikoni-teal font-semibold">Dump terenkripsi PostgreSQL</small>
          </div>

          <div className="p-3.5 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-sikoni-navy hover:shadow-md transition-all">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase tracking-wider">Masa Retensi Berkas</span>
            <b className="text-xs text-sikoni-navy mt-1 block">10 Tahun Fiskal</b>
            <small className="text-[10px] text-slate-500 font-semibold">Standar BPK & Inspektorat</small>
          </div>

          <div className="p-3.5 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl shadow-sm border-l-4 border-l-sikoni-gold hover:shadow-md transition-all">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase tracking-wider">Notifikasi Push</span>
            <b className="text-xs text-sikoni-navy mt-1 block">FCM Terhubung</b>
            <small className="text-[10px] text-amber-700 font-semibold">Android & Web Popover</small>
          </div>
        </div>
      </div>

      {/* Dynamic Setting Modals */}
      {activeModal === 'users' && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-sikoni-navy">Manajemen Akun Pengguna</h3>
              <button onClick={() => setActiveModal(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-sikoni-line text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-sikoni-line font-bold text-sikoni-muted">
                  <tr>
                    <th className="p-2.5">Nama</th>
                    <th className="p-2.5">Email</th>
                    <th className="p-2.5">Role</th>
                    <th className="p-2.5">Scope Cabor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sikoni-line">
                  {usersList.map((u) => (
                    <tr key={u.id}>
                      <td className="p-2.5 font-bold text-sikoni-navy">{u.name}</td>
                      <td className="p-2.5 text-sikoni-muted">{u.email}</td>
                      <td className="p-2.5"><span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-[10px]">{u.role}</span></td>
                      <td className="p-2.5 text-sikoni-teal font-semibold">{u.cabor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-sikoni-navy text-white text-xs font-bold rounded-xl">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'approval-matrix' && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-sikoni-navy">Konfigurasi Approval Matrix</h3>
              <button onClick={() => setActiveModal(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-sikoni-muted">
              Atur ambang batas nominal (*threshold*) untuk tahapan persetujuan usulan RAB & LPJ.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl space-y-2">
                <b className="text-sikoni-navy block">Tahap 1: Verifikator Teknis</b>
                <span className="text-sikoni-muted block">Memvalidasi kelengkapan berkas untuk semua nominal usulan.</span>
              </div>

              <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl space-y-2">
                <b className="text-sikoni-navy block">Tahap 2: Bendahara KONI</b>
                <span className="text-sikoni-muted block">Persetujuan keuangan & ketersediaan pagu cabor (s.d. Rp 100.000.000).</span>
              </div>

              <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl space-y-2">
                <b className="text-sikoni-navy block">Tahap 3: Ketua Umum KONI</b>
                <span className="text-sikoni-muted block">Persetujuan akhir untuk usulan bernilai di atas Rp 100.000.000.</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sikoni-line">
              <button onClick={() => setActiveModal(null)} className="px-3.5 py-2 text-xs font-bold text-sikoni-muted">
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Pengaturan approval matrix berhasil diperbarui');
                  setActiveModal(null);
                }}
                className="px-4 py-2 bg-sikoni-teal text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Save size={14} /> Simpan Aturan
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'fiscal-year' && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-sikoni-navy">Tahun Anggaran Aktif</h3>
              <button onClick={() => setActiveModal(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="font-bold text-sikoni-navy block mb-1">Tahun Anggaran</label>
              <input type="number" defaultValue="2026" className="w-full border border-sikoni-line rounded-lg p-2.5" />
            </div>

            <div>
              <label className="font-bold text-sikoni-navy block mb-1">Total Pagu Induk Hibah (APBD)</label>
              <input type="text" defaultValue="Rp 2.450.000.000" className="w-full border border-sikoni-line rounded-lg p-2.5 font-bold text-sikoni-navy" />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sikoni-line">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-sikoni-navy text-white font-bold rounded-xl">
                Simpan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {(activeModal === 'roles' || activeModal === 'cabor-scope' || activeModal === 'mfa' || activeModal === 'sbm') && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-sikoni-navy">Konfigurasi Pengaturan</h3>
              <button onClick={() => setActiveModal(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>
            <p className="text-sikoni-muted leading-relaxed">
              Modul ini siap dikonfigurasi sesuai pedoman tata kelola resmi KONI Surakarta. Pengaturan hak akses granular terikat pada tabel <code>permissions</code> dan <code>user_cabor</code>.
            </p>
            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-sikoni-navy text-white font-bold rounded-xl">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
