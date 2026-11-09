import React from 'react';

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-sikoni-navy tracking-tight">Profil KONI Surakarta</h1>
        <p className="text-xs text-sikoni-muted mt-1">
          Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-sikoni space-y-4">
          <h2 className="text-base font-extrabold text-sikoni-navy">Tentang KONI Surakarta</h2>
          <p className="text-xs text-sikoni-ink leading-relaxed">
            KONI Surakarta berperan sentral dalam koordinasi, perencanaan, pembinaan, dan pengembangan prestasi olahraga di tingkat kota bersama seluruh induk cabang olahraga anggota.
          </p>
          <p className="text-xs text-sikoni-muted leading-relaxed">
            Melalui sistem informasi SIKONI, organisasi berkomitmen mewujudkan keterbukaan tata kelola keuangan hibah dan integrasi data pembinaan atlet berbasis digital.
          </p>
        </div>

        <div className="card-sikoni space-y-4">
          <h2 className="text-base font-extrabold text-sikoni-navy">Kontak Sekretariat</h2>
          <div className="divide-y divide-sikoni-line text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-sikoni-muted">Alamat</span>
              <b className="text-sikoni-navy text-right">Jl. Adi Sucipto No. 1, Manahan, Surakarta</b>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-sikoni-muted">Email Resmi</span>
              <b className="text-sikoni-navy">sekretariat@koni-surakarta.id</b>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-sikoni-muted">Jam Layanan</span>
              <b className="text-sikoni-navy">Senin – Jumat (08.00 – 16.00 WIB)</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

