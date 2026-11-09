'use client';

import React, { useState } from 'react';
import { Search, Shield, X, MapPin, Mail, Phone, Users } from 'lucide-react';

interface CaborItem {
  icon: string;
  code: string;
  name: string;
  category: string;
  athletes: string;
  leader: string;
  venue: string;
  email: string;
  phone: string;
}

const caborList: CaborItem[] = [
  {
    icon: '🏃',
    code: 'PASI',
    name: 'Atletik',
    category: 'Terukur',
    athletes: '42 atlet terdata',
    leader: 'Dr. Bambang Setiawan',
    venue: 'Stadion Sriwedari, Surakarta',
    email: 'pasi@koni-surakarta.id',
    phone: '08112233441',
  },
  {
    icon: '🏸',
    code: 'PBSI',
    name: 'Bulutangkis',
    category: 'Permainan',
    athletes: '36 atlet terdata',
    leader: 'H. Suryanto',
    venue: 'GOR Manahan, Surakarta',
    email: 'pbsi@koni-surakarta.id',
    phone: '08112233442',
  },
  {
    icon: '⚽',
    code: 'PSSI',
    name: 'Sepak Bola',
    category: 'Permainan',
    athletes: '58 atlet terdata',
    leader: 'Agus Wibowo, S.E.',
    venue: 'Stadion Manahan & Lapangan Kota Barat',
    email: 'pssi@koni-surakarta.id',
    phone: '08112233443',
  },
  {
    icon: '🏊',
    code: 'PRSI',
    name: 'Renang',
    category: 'Terukur',
    athletes: '24 atlet terdata',
    leader: 'Dra. Endang Purwanti',
    venue: 'Kolam Renang Tirtomoyo Manahan',
    email: 'prsi@koni-surakarta.id',
    phone: '08112233444',
  },
  {
    icon: '🏹',
    code: 'PERPANI',
    name: 'Panahan',
    category: 'Akurasi',
    athletes: '18 atlet terdata',
    leader: 'Joko Susilo',
    venue: 'Lapangan Panahan Manahan',
    email: 'perpani@koni-surakarta.id',
    phone: '08112233445',
  },
  {
    icon: '🥋',
    code: 'PERSILAT',
    name: 'Pencak Silat',
    category: 'Bela Diri',
    athletes: '64 atlet terdata',
    leader: 'M. Taufik, M.Pd.',
    venue: 'Padepokan Silat Surakarta',
    email: 'ipsi@koni-surakarta.id',
    phone: '08112233446',
  },
];

export default function PublicCaborPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua kategori');
  const [selectedCabor, setSelectedCabor] = useState<CaborItem | null>(null);

  const filtered = caborList.filter((c) => {
    const matchSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Semua kategori' || c.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-sikoni-navy tracking-tight">Cabang Olahraga</h1>
        <p className="text-xs text-sikoni-muted mt-1">
          Temukan direktori cabang olahraga yang berada dalam pembinaan resmi KONI Kota Surakarta.
        </p>
      </div>

      {/* Toolbar Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-sikoni-line shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 text-sikoni-muted" size={15} />
          <input
            type="text"
            placeholder="Cari cabang olahraga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f8fafc] border border-sikoni-line rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-sikoni-teal"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-sikoni-line rounded-xl px-3 py-2 text-xs text-sikoni-ink focus:outline-none"
        >
          <option>Semua kategori</option>
          <option>Permainan</option>
          <option>Terukur</option>
          <option>Bela Diri</option>
          <option>Akurasi</option>
        </select>
      </div>

      {/* Cabor Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cabor) => (
          <div
            key={cabor.code}
            className="card-sikoni flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group border-t-4 border-t-sikoni-teal"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-2xl grid place-items-center shadow-sm border border-emerald-100 group-hover:scale-105 transition-transform">
                  {cabor.icon}
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {cabor.category}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <b className="text-base font-extrabold text-sikoni-navy group-hover:text-sikoni-teal transition-colors">
                  {cabor.code}
                </b>
                <span className="text-xs text-slate-600 font-medium">— {cabor.name}</span>
              </div>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {cabor.athletes} • Tempat latihan resmi di {cabor.venue.split(',')[0]}.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10.5px] text-slate-400 font-medium">Binaan KONI Surakarta</span>
              <button
                onClick={() => setSelectedCabor(cabor)}
                className="bg-emerald-50 hover:bg-emerald-100 text-sikoni-teal text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
              >
                Lihat Profil Lengkap →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cabor Profile Modal */}
      {selectedCabor && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sikoni-teal2 text-2xl grid place-items-center">
                  {selectedCabor.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-sikoni-navy">
                    {selectedCabor.code} — {selectedCabor.name}
                  </h3>
                  <span className="text-xs text-sikoni-teal font-bold">Kategori {selectedCabor.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCabor(null)}
                className="text-sikoni-muted hover:text-sikoni-navy"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-sikoni-line rounded-xl space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-sikoni-ink">
                <Users size={15} className="text-sikoni-muted" />
                <span className="text-sikoni-muted">Ketua Umum:</span>
                <b>{selectedCabor.leader}</b>
              </div>
              <div className="flex items-center gap-2 text-sikoni-ink">
                <MapPin size={15} className="text-sikoni-muted" />
                <span className="text-sikoni-muted">Tempat Latihan:</span>
                <b>{selectedCabor.venue}</b>
              </div>
              <div className="flex items-center gap-2 text-sikoni-ink">
                <Mail size={15} className="text-sikoni-muted" />
                <span className="text-sikoni-muted">Email Resmi:</span>
                <b>{selectedCabor.email}</b>
              </div>
              <div className="flex items-center gap-2 text-sikoni-ink">
                <Phone size={15} className="text-sikoni-muted" />
                <span className="text-sikoni-muted">Kontak Pengkot:</span>
                <b>{selectedCabor.phone}</b>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-sikoni-line">
              <button
                onClick={() => setSelectedCabor(null)}
                className="px-5 py-2 bg-sikoni-navy text-white text-xs font-bold rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
