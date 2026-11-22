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
    code: 'IPSI',
    name: 'Pencak Silat',
    category: 'Bela Diri',
    athletes: '64 atlet terdata',
    leader: 'M. Taufik, M.Pd.',
    venue: 'Padepokan Silat Surakarta',
    email: 'ipsi@koni-surakarta.id',
    phone: '08112233446',
  },
  {
    icon: '🥋',
    code: 'TI',
    name: 'Taekwondo',
    category: 'Bela Diri',
    athletes: '48 atlet terdata',
    leader: 'Master Donny Prasetyo',
    venue: 'Dojo Manahan Surakarta',
    email: 'ti@koni-surakarta.id',
    phone: '08112233447',
  },
  {
    icon: '🥋',
    code: 'FORKI',
    name: 'Karate',
    category: 'Bela Diri',
    athletes: '38 atlet terdata',
    leader: 'Sensei Hendra Wijaya',
    venue: 'Dojo Sriwedari',
    email: 'forki@koni-surakarta.id',
    phone: '08112233448',
  },
  {
    icon: '🏓',
    code: 'PTMSI',
    name: 'Tenis Meja',
    category: 'Permainan',
    athletes: '22 atlet terdata',
    leader: 'Ir. Budi Hartono',
    venue: 'GOR Banyuanyar',
    email: 'ptmsi@koni-surakarta.id',
    phone: '08112233449',
  },
  {
    icon: '🎾',
    code: 'PELTI',
    name: 'Tenis Lapangan',
    category: 'Permainan',
    athletes: '20 atlet terdata',
    leader: 'dr. Sugeng Riyadi',
    venue: 'Lapangan Tenis Manahan',
    email: 'pelti@koni-surakarta.id',
    phone: '08112233450',
  },
  {
    icon: '🏐',
    code: 'PBVSI',
    name: 'Bola Voli',
    category: 'Permainan',
    athletes: '32 atlet terdata',
    leader: 'Drs. Slamet Raharjo',
    venue: 'GOR Manahan',
    email: 'pbvsi@koni-surakarta.id',
    phone: '08112233451',
  },
  {
    icon: '🏀',
    code: 'PERBASI',
    name: 'Bola Basket',
    category: 'Permainan',
    athletes: '30 atlet terdata',
    leader: 'Christian Ronald, B.Sc.',
    venue: 'Sritex Arena Surakarta',
    email: 'perbasi@koni-surakarta.id',
    phone: '08112233452',
  },
  {
    icon: '♟️',
    code: 'PERCASI',
    name: 'Catur',
    category: 'Akurasi',
    athletes: '16 atlet terdata',
    leader: 'MN. Wahyu Prasetyo',
    venue: 'Gedung Kesenian Sriwedari',
    email: 'percasi@koni-surakarta.id',
    phone: '08112233453',
  },
  {
    icon: '🚣',
    code: 'PODSI',
    name: 'Dayung',
    category: 'Terukur',
    athletes: '14 atlet terdata',
    leader: 'Kapten (Mar) Maryono',
    venue: 'Waduk Cengklik & Bengawan Solo',
    email: 'podsi@koni-surakarta.id',
    phone: '08112233454',
  },
  {
    icon: '🚴',
    code: 'ISSI',
    name: 'Balap Sepeda',
    category: 'Terukur',
    athletes: '26 atlet terdata',
    leader: 'Aris Nugroho, S.T.',
    venue: 'Velodrome Manahan',
    email: 'issi@koni-surakarta.id',
    phone: '08112233455',
  },
  {
    icon: '🤿',
    code: 'POSSI',
    name: 'Selam Olahraga',
    category: 'Terukur',
    athletes: '12 atlet terdata',
    leader: 'drg. Triyono',
    venue: 'Kolam Tirtomoyo',
    email: 'possi@koni-surakarta.id',
    phone: '08112233456',
  },
  {
    icon: '🎯',
    code: 'PERBAKIN',
    name: 'Menembak',
    category: 'Akurasi',
    athletes: '20 atlet terdata',
    leader: 'Kolonel (Purn) Sunardi',
    venue: 'Lapangan Tembak Manahan',
    email: 'perbakin@koni-surakarta.id',
    phone: '08112233457',
  },
  {
    icon: '🎱',
    code: 'POBSI',
    name: 'Biliar',
    category: 'Akurasi',
    athletes: '15 atlet terdata',
    leader: 'H. Danang Wicaksono',
    venue: 'Arena Biliar Manahan',
    email: 'pobsi@koni-surakarta.id',
    phone: '08112233458',
  },
  {
    icon: '🧗',
    code: 'FPTI',
    name: 'Panjat Tebing',
    category: 'Terukur',
    athletes: '28 atlet terdata',
    leader: 'Eko Yulianto',
    venue: 'Wall Climbing Kompleks Manahan',
    email: 'fpti@koni-surakarta.id',
    phone: '08112233459',
  },
  {
    icon: '🥊',
    code: 'KODRAT',
    name: 'Tarung Derajat',
    category: 'Bela Diri',
    athletes: '22 atlet terdata',
    leader: 'Sang Guru Ridwan',
    venue: 'Ksatrian Tarung Derajat Surakarta',
    email: 'kodrat@koni-surakarta.id',
    phone: '08112233460',
  },
  {
    icon: '🃏',
    code: 'GABSI',
    name: 'Bridge',
    category: 'Akurasi',
    athletes: '12 atlet terdata',
    leader: 'Prof. Suparman',
    venue: 'Sekretariat GABSI Manahan',
    email: 'gabsi@koni-surakarta.id',
    phone: '08112233461',
  },
  {
    icon: '🪂',
    code: 'FASI',
    name: 'Aero Sport',
    category: 'Akurasi',
    athletes: '10 atlet terdata',
    leader: 'Mayor (Pnb) Sigit',
    venue: 'Lanud Adi Soemarmo',
    email: 'fasi@koni-surakarta.id',
    phone: '08112233462',
  },
  {
    icon: '🛼',
    code: 'PERSEROSI',
    name: 'Sepatu Roda',
    category: 'Terukur',
    athletes: '25 atlet terdata',
    leader: 'Yuniarti, S.Pd.',
    venue: 'Track Sepatu Roda Manahan',
    email: 'perserosi@koni-surakarta.id',
    phone: '08112233463',
  },
  {
    icon: '⚔️',
    code: 'WI',
    name: 'Wushu',
    category: 'Bela Diri',
    athletes: '34 atlet terdata',
    leader: 'Master Tony Chen',
    venue: 'Sasana Wushu Surakarta',
    email: 'wushu@koni-surakarta.id',
    phone: '08112233464',
  },
];

export default function PublicCaborPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua kategori');
  const [selectedCabor, setSelectedCabor] = useState<CaborItem | null>(null);

  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'Terukur':
        return {
          border: 'border-t-4 border-t-sikoni-navy',
          badge: 'bg-slate-100 text-sikoni-navy border-slate-300/80',
          glow: 'from-slate-700/15',
          btn: 'from-sikoni-navy to-slate-800 hover:from-slate-800 hover:to-sikoni-teal',
        };
      case 'Permainan':
        return {
          border: 'border-t-4 border-t-sikoni-teal',
          badge: 'bg-emerald-50 text-sikoni-teal border-emerald-200/90',
          glow: 'from-teal-500/15',
          btn: 'from-sikoni-teal to-teal-700 hover:from-teal-700 hover:to-sikoni-navy',
        };
      case 'Bela Diri':
        return {
          border: 'border-t-4 border-t-sikoni-gold',
          badge: 'bg-amber-50 text-amber-800 border-amber-200/90',
          glow: 'from-amber-500/15',
          btn: 'from-amber-600 to-amber-700 hover:from-amber-700 hover:to-sikoni-navy',
        };
      case 'Akurasi':
        return {
          border: 'border-t-4 border-t-indigo-600',
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/90',
          glow: 'from-indigo-600/15',
          btn: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-sikoni-navy',
        };
      default:
        return {
          border: 'border-t-4 border-t-sikoni-teal',
          badge: 'bg-emerald-50 text-sikoni-teal border-emerald-200',
          glow: 'from-teal-500/15',
          btn: 'from-sikoni-teal to-teal-700 hover:from-teal-700 hover:to-sikoni-navy',
        };
    }
  };

  const filtered = caborList.filter((c) => {
    const matchSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Semua kategori' || c.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      <div>
        <div className="text-[11px] sm:text-xs font-black text-sikoni-teal tracking-widest uppercase mb-1">
          DIREKTORI RESMI CABANG OLAHRAGA
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-sikoni-navy tracking-tight">Cabang Olahraga</h1>
        <p className="text-xs text-sikoni-muted mt-1 max-w-2xl leading-relaxed">
          Temukan direktori cabang olahraga binaan resmi KONI Kota Surakarta lengkap dengan data atlet terdaftar, lokasi venue latihan, dan kontak pengurus kota.
        </p>
      </div>

      {/* Toolbar Search & Filter in Themed Elevated Container */}
      <div className="card-sikoni relative overflow-hidden p-4">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-3 text-sikoni-muted" size={15} />
            <input
              type="text"
              placeholder="Cari nama cabor, kode (PASI, PBSI), atau venue latihan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200/90 rounded-xl pl-10 pr-3 py-2.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 shadow-xs transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-xl px-3 py-2 shadow-xs">
            <span className="text-[10.5px] font-bold text-sikoni-muted uppercase">Kategori:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent border-none text-xs text-sikoni-ink font-bold focus:outline-none cursor-pointer"
            >
              <option>Semua kategori</option>
              <option>Permainan</option>
              <option>Terukur</option>
              <option>Bela Diri</option>
              <option>Akurasi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cabor Card Grid with Themed Sub-boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cabor) => {
          const catStyle = getCategoryStyles(cabor.category);
          return (
            <div
              key={cabor.code}
              className={`card-sikoni flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group ${catStyle.border}`}
            >
              {/* Corner decorative ambient glow */}
              <div
                className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${catStyle.glow} via-transparent to-transparent pointer-events-none group-hover:scale-125 transition-transform duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-13 h-13 p-2.5 rounded-2xl bg-white shadow-xs border border-slate-200/90 text-2xl grid place-items-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-300">
                    {cabor.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs ${catStyle.badge}`}
                    >
                      {cabor.category}
                    </span>
                    <span className="text-[9.5px] font-semibold text-slate-400">Pengkot Aktif</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <b className="text-lg font-black text-sikoni-navy group-hover:text-sikoni-teal transition-colors">
                      {cabor.code}
                    </b>
                    <span className="text-xs text-slate-600 font-bold">— {cabor.name}</span>
                  </div>
                </div>

                {/* Structured Sub-boxes for Cabor Information */}
                <div className="grid grid-cols-2 gap-2 mt-3.5">
                  <div className="p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-xs flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-sikoni-teal flex items-center justify-center shrink-0">
                      <Users size={13} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-extrabold text-sikoni-muted uppercase block leading-none">
                        Atlet Binaan
                      </span>
                      <b className="text-[11px] text-sikoni-navy font-black truncate block mt-0.5">
                        {cabor.athletes.split(' ')[0]} Atlet
                      </b>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-xs flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-sikoni-gold flex items-center justify-center shrink-0">
                      <MapPin size={13} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-extrabold text-sikoni-muted uppercase block leading-none">
                        Lokasi Latihan
                      </span>
                      <b className="text-[11px] text-sikoni-navy font-black truncate block mt-0.5">
                        {cabor.venue.split(',')[0]}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Sub-box Ketua Umum */}
                <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/80 flex items-center justify-between text-xs shadow-xs">
                  <span className="text-[10px] text-slate-500 font-medium">Ketua Umum:</span>
                  <b className="text-[11px] text-sikoni-navy font-bold truncate max-w-[170px]">
                    {cabor.leader}
                  </b>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  KONI Surakarta
                </span>
                <button
                  onClick={() => setSelectedCabor(cabor)}
                  className={`bg-gradient-to-r ${catStyle.btn} text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 group-hover:translate-x-0.5`}
                >
                  <span>Lihat Profil</span>
                  <span className="text-[11px]">→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cabor Profile Modal with Top Accent Line */}
      {selectedCabor && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="card-sikoni relative overflow-hidden w-[94vw] sm:w-full max-w-lg p-4 sm:p-6 space-y-4 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-2xl grid place-items-center shadow-xs border border-emerald-200/70">
                  {selectedCabor.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-sikoni-navy">
                    {selectedCabor.code} — {selectedCabor.name}
                  </h3>
                  <span className="text-xs text-sikoni-teal font-extrabold">Kategori {selectedCabor.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCabor(null)}
                className="text-sikoni-muted hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Ketua Umum Pengkot</span>
                <b className="text-xs text-sikoni-navy mt-0.5 block">{selectedCabor.leader}</b>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Tempat Latihan Resmi</span>
                <b className="text-xs text-sikoni-navy mt-0.5 block">{selectedCabor.venue}</b>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Email Resmi</span>
                <b className="text-xs text-sikoni-teal mt-0.5 block">{selectedCabor.email}</b>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-bold text-sikoni-muted uppercase block">Nomor Kontak WhatsApp</span>
                <b className="text-xs text-sikoni-navy mt-0.5 block">{selectedCabor.phone}</b>
              </div>
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-gradient-to-r from-teal-50/50 via-white to-slate-50 border border-teal-200/70 flex justify-between items-center shadow-xs">
                <span className="text-xs font-bold text-sikoni-navy">Total Atlet Binaan Terdaftar:</span>
                <span className="px-3 py-1 rounded-full bg-sikoni-teal text-white font-black text-xs shadow-xs">
                  {selectedCabor.athletes}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedCabor(null)}
                className="px-5 py-2 bg-sikoni-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
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
