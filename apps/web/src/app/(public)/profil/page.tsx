import React from 'react';
import { Target, Compass, Users, MapPin, Mail, Phone, Clock, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const leadershipBoard = [
    {
      name: 'Her Suprabu, S.P., M.M.',
      role: 'Ketua Umum',
      cabor: 'KONI Kota Surakarta (2025–2029)',
      image: '/images/pengurus/her_suprabu.png',
    },
    {
      name: 'Rudi Jauhari',
      role: 'Bendahara Umum',
      cabor: 'Keuangan & Perbendaharaan',
      image: '/images/pengurus/rudi_jauhari.jpg',
    },
    {
      name: 'Bambang',
      role: 'Organisasi & MSD',
      cabor: 'Hukum & Tata Kelola Cabor',
      image: '/images/pengurus/bambang.jpg',
    },
    {
      name: 'Dwi Puspita Ningrum',
      role: 'Ketua Bidang Humas',
      cabor: 'Media & Hubungan Publik',
      image: '/images/pengurus/dwi_puspita.jpg',
    },
    {
      name: 'Antonius',
      role: 'Wakil Bendahara',
      cabor: 'Verifikasi Kasda & Giro',
      image: '/images/pengurus/rudi_jauhari.jpg',
    },
  ];

  const missionItems = [
    {
      num: '1',
      title: 'Pembinaan Usia Dini & Puslatkot',
      desc: 'Mengoptimalkan pembinaan berjenjang usia dini dan pemusatan latihan atlet unggulan daerah secara berkesinambungan.',
    },
    {
      num: '2',
      title: 'Kompetisi Olahraga Berkualitas',
      desc: 'Menyelenggarakan kejuaraan olahraga tingkat kota yang kompetitif, berintegritas, dan terukur menuju Porprov Jateng.',
    },
    {
      num: '3',
      title: 'Digitalisasi Tata Kelola & Akuntabilitas',
      desc: 'Memodernisasi tata kelola bantuan hibah keolahragaan berbasis digital yang transparan dan bebas korupsi via SIKONI.',
    },
    {
      num: '4',
      title: 'Kesejahteraan & Insentif Atlet',
      desc: 'Memberikan jaminan perlindungan, apresiasi, dan honorarium insentif tepat waktu bagi atlet dan pelatih berprestasi.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
      <div>
        <div className="text-[11px] sm:text-xs font-extrabold text-sikoni-teal tracking-wider uppercase">
          TENTANG ORGANISASI
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-sikoni-navy tracking-tight mt-1">Profil KONI Surakarta</h1>
        <p className="text-xs text-sikoni-muted mt-1 max-w-2xl leading-relaxed">
          Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta adalah wadah tunggal gerakan pembinaan dan pengembangan keolahragaan prestasi di Kota Bengawan.
        </p>
      </div>

      {/* Visi & Misi Cards in Styled Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visi Card */}
        <div className="card-sikoni space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-sikoni-teal" />
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-sikoni-teal grid place-items-center shadow-sm">
                <Target size={20} />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-sikoni-navy">Visi KONI Surakarta</h2>
                <p className="text-[11px] text-sikoni-muted">Arah strategis pembinaan olahraga prestasi</p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/90 shadow-sm mt-4 border-l-4 border-l-sikoni-teal">
              <p className="text-xs text-sikoni-ink leading-relaxed font-semibold italic">
                "Mewujudkan Kota Surakarta sebagai episentrum prestasi olahraga nasional yang berkarakter, berdaya saing global, mandiri, dan berintegritas tinggi dalam tata kelola keorganisasian."
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 font-medium flex items-center gap-2">
            <ShieldCheck size={16} className="text-sikoni-teal flex-shrink-0" />
            <span>Berlandaskan UU No. 11 Tahun 2022 tentang Keolahragaan Nasional.</span>
          </div>
        </div>

        {/* Misi Card */}
        <div className="card-sikoni space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-sikoni-gold" />
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-sikoni-gold grid place-items-center shadow-sm">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-sikoni-navy">Misi Pembangunan Prestasi</h2>
              <p className="text-[11px] text-sikoni-muted">4 pilar langkah strategis operasional</p>
            </div>
          </div>

          {/* 4 Distinct Styled Sub-Boxes for Mission Items */}
          <div className="space-y-2 text-xs">
            {missionItems.map((m) => (
              <div
                key={m.num}
                className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-2.5 hover:bg-white hover:shadow-sm transition-all border-l-4 border-l-sikoni-gold group"
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-black grid place-items-center text-[10.5px] flex-shrink-0 mt-0.5 shadow-sm">
                  {m.num}
                </span>
                <div>
                  <b className="text-sikoni-navy block text-xs group-hover:text-amber-700 transition-colors">
                    {m.title}
                  </b>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Structure Board */}
      <div className="card-sikoni space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-sikoni-navy" />
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-sikoni-navy grid place-items-center shadow-sm">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-sikoni-navy">Pengurus Inti KONI Surakarta</h2>
              <p className="text-[11px] text-sikoni-muted">Masa Bakti 2025 – 2029</p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-slate-100 text-sikoni-navy px-2.5 py-1 rounded-full">
            Surat Keputusan Resmi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-1">
          {leadershipBoard.map((leader, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 p-4 rounded-xl text-center space-y-2.5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border-t-4 border-t-sikoni-teal group"
            >
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-sikoni-gold mx-auto shadow-md group-hover:scale-105 transition-transform bg-slate-800">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <b className="text-xs text-sikoni-navy block leading-snug group-hover:text-sikoni-teal transition-colors">
                  {leader.name}
                </b>
                <span className="text-[11px] font-bold text-sikoni-teal mt-0.5 block">{leader.role}</span>
                <small className="text-[10px] text-slate-500 block mt-0.5">{leader.cabor}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Secretariat Info in Themed Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-sikoni space-y-3 relative overflow-hidden border-l-4 border-l-sikoni-teal">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-sikoni-teal grid place-items-center shadow-sm">
            <MapPin size={18} />
          </div>
          <b className="text-xs text-sikoni-navy block">Alamat Sekretariat Resmi</b>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1, Banjarsari, Kota Surakarta, Jawa Tengah 57139
          </p>
        </div>

        <div className="card-sikoni space-y-3 relative overflow-hidden border-l-4 border-l-sikoni-gold">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-sikoni-gold grid place-items-center shadow-sm">
            <Mail size={18} />
          </div>
          <b className="text-xs text-sikoni-navy block">Saluran Komunikasi Resmi</b>
          <div className="text-xs text-slate-600 space-y-1">
            <p>Email: <b className="text-sikoni-navy">sekretariat@koni-surakarta.id</b></p>
            <p>Telepon: <b className="text-sikoni-navy">(0271) 714930</b></p>
          </div>
        </div>

        <div className="card-sikoni space-y-3 relative overflow-hidden border-l-4 border-l-sikoni-navy">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-sikoni-navy grid place-items-center shadow-sm">
            <Clock size={18} />
          </div>
          <b className="text-xs text-sikoni-navy block">Jam Layanan Kantor</b>
          <div className="text-xs text-slate-600 space-y-1">
            <p>Senin – Kamis: <b className="text-sikoni-navy">08.00 – 16.00 WIB</b></p>
            <p>Jumat: <b className="text-sikoni-navy">08.00 – 15.30 WIB</b></p>
            <p className="text-[10px] text-sikoni-teal font-semibold">Sabtu, Minggu & Libur Nasional Tutup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
