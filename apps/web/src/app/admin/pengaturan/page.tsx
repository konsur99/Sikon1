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
        <div className="card-sikoni space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sikoni-teal2 text-sikoni-teal grid place-items-center">
              <Users size={18} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-sikoni-navy">Pengguna & Hak Akses</h3>
              <p className="text-[11px] text-sikoni-muted">Manajemen kredensial dan batas wewenang</p>
            </div>
          </div>

          <div className="divide-y divide-sikoni-line text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Manajemen Akun Pengguna</span>
              <button
                onClick={() => setActiveModal('users')}
                className="text-xs font-bold text-sikoni-teal hover:underline flex items-center gap-1"
              >
                Kelola <ArrowRight size={13} />
              </button>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Role & Granular Permission</span>
              <button
                onClick={() => setActiveModal('roles')}
                className="text-xs font-bold text-sikoni-teal hover:underline flex items-center gap-1"
              >
                Kelola <ArrowRight size={13} />
              </button>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Relasi Pengguna – Cabang Olahraga (Cabor Scope)</span>
              <button
                onClick={() => setActiveModal('cabor-scope')}
                className="text-xs font-bold text-sikoni-teal hover:underline flex items-center gap-1"
              >
                Kelola <ArrowRight size={13} />
              </button>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Reset Akses & Multi-Factor Auth (MFA)</span>
              <button
                onClick={() => setActiveModal('mfa')}
                className="text-xs font-bold text-sikoni-teal hover:underline flex items-center gap-1"
              >
                Kelola <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Workflow & Business Parameters */}
        <div className="card-sikoni space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sikoni-gold2 text-sikoni-gold grid place-items-center">
              <Workflow size={18} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-sikoni-navy">Workflow & Parameter Bisnis</h3>
              <p className="text-[11px] text-sikoni-muted">Aturan dan ambang batas yang disahkan KONI</p>
            </div>
          </div>

          <div className="divide-y divide-sikoni-line text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Approval Matrix (Jenjang Persetujuan Bertingkat)</span>
              <button
                onClick={() => setActiveModal('approval-matrix')}
                className="text-xs font-bold text-sikoni-gold hover:underline flex items-center gap-1"
              >
                Konfigurasi <ArrowRight size={13} />
              </button>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Tahun Anggaran & Penetapan Pagu Induk</span>
              <button
                onClick={() => setActiveModal('fiscal-year')}
                className="text-xs font-bold text-sikoni-gold hover:underline flex items-center gap-1"
              >
                Konfigurasi <ArrowRight size={13} />
              </button>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Kategori Standar Biaya Masukan (SBM)</span>
              <button
                onClick={() => setActiveModal('sbm')}
                className="text-xs font-bold text-sikoni-gold hover:underline flex items-center gap-1"
              >
                Konfigurasi <ArrowRight size={13} />
              </button>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-sikoni-ink font-medium">Konfigurasi Aturan Pajak Transaksi</span>
              <Link href="/admin/pajak" className="text-xs font-bold text-sikoni-gold hover:underline flex items-center gap-1">
                Buka Modul <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Audit System */}
      <div className="card-sikoni space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-sikoni-navy">Keamanan, Audit, & Keandalan Infrastruktur</h3>
            <p className="text-[11px] text-sikoni-muted">Parameter operasional sistem kritikal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase">Audit Trail</span>
            <b className="text-xs text-sikoni-navy mt-1 block">Aktif (Append-Only)</b>
            <small className="text-[10px] text-sikoni-green">Mencatat IP & payload</small>
          </div>

          <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase">Backup Database</span>
            <b className="text-xs text-sikoni-navy mt-1 block">Otomatis Tiap Hari</b>
            <small className="text-[10px] text-sikoni-teal">Dump terenkripsi S3</small>
          </div>

          <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase">Masa Retensi Berkas</span>
            <b className="text-xs text-sikoni-navy mt-1 block">10 Tahun</b>
            <small className="text-[10px] text-sikoni-muted">Standar BPK/Inspektorat</small>
          </div>

          <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl">
            <span className="text-[10px] text-sikoni-muted font-bold block uppercase">Notifikasi Push</span>
            <b className="text-xs text-sikoni-navy mt-1 block">FCM Terhubung</b>
            <small className="text-[10px] text-sikoni-teal">Android & Web Push</small>
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
