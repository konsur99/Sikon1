import React from 'react';
import { Target, Compass, Users, MapPin, Mail, Phone, Clock, Award, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const leadershipBoard = [
    { name: 'Drs. H. Sri Nugroho, M.Si.', role: 'Ketua Umum', cabor: 'KONI Kota Surakarta' },
    { name: 'Bambang Triyono, S.H.', role: 'Wakil Ketua Umum I', cabor: 'Bidang Organisasi & Hukum' },
    { name: 'Dr. Agus Hariyanto, M.Pd.', role: 'Wakil Ketua Umum II', cabor: 'Bidang Pembinaan Prestasi' },
    { name: 'Eko Sulistyo, S.Sos.', role: 'Sekretaris Umum', cabor: 'Sekretariat & Administrasi' },
    { name: 'Hj. Wahyuningsih, S.E., Ak.', role: 'Bendahara Umum', cabor: 'Keuangan & Perbendaharaan' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div>
        <div className="text-xs font-extrabold text-sikoni-teal tracking-wider uppercase">
          TENTANG ORGANISASI
        </div>
        <h1 className="text-3xl font-black text-sikoni-navy tracking-tight mt-1">Profil KONI Surakarta</h1>
        <p className="text-xs text-sikoni-muted mt-1 max-w-2xl leading-relaxed">
          Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta adalah wadah tunggal gerakan pembinaan dan pengembangan keolahragaan prestasi di Kota Bengawan.
        </p>
      </div>

      {/* Visi & Misi Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-sikoni space-y-4 border-t-4 border-t-sikoni-teal">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sikoni-teal2 text-sikoni-teal grid place-items-center">
              <Target size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-sikoni-navy">Visi KONI Surakarta</h2>
              <p className="text-[11px] text-sikoni-muted">Arah strategis pembinaan olahraga prestasi</p>
            </div>
          </div>
          <p className="text-xs text-sikoni-ink leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-sikoni-line">
            "Mewujudkan Kota Surakarta sebagai episentrum prestasi olahraga nasional yang berkarakter, berdaya saing global, mandiri, dan berintegritas tinggi dalam tata kelola keorganisasian."
          </p>
        </div>

        <div className="card-sikoni space-y-4 border-t-4 border-t-sikoni-gold">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sikoni-gold2 text-sikoni-gold grid place-items-center">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-sikoni-navy">Misi Pembangunan Prestasi</h2>
              <p className="text-[11px] text-sikoni-muted">4 pilar langkah strategis</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-sikoni-ink">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sikoni-gold/20 text-sikoni-gold font-bold grid place-items-center text-[10px] flex-shrink-0 mt-0.5">
                1
              </span>
              <span>Mengoptimalkan pembinaan berjenjang usia dini dan pemusatan latihan atlet unggulan daerah.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sikoni-gold/20 text-sikoni-gold font-bold grid place-items-center text-[10px] flex-shrink-0 mt-0.5">
                2
              </span>
              <span>Menyelenggarakan kompetisi olahraga tingkat kota yang berkualitas, berkelanjutan, dan kompetitif.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sikoni-gold/20 text-sikoni-gold font-bold grid place-items-center text-[10px] flex-shrink-0 mt-0.5">
                3
              </span>
              <span>Memodernisasi tata kelola bantuan hibah keolahragaan berbasis digital yang transparan melalui sistem SIKONI.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sikoni-gold/20 text-sikoni-gold font-bold grid place-items-center text-[10px] flex-shrink-0 mt-0.5">
                4
              </span>
              <span>Memberikan perlindungan, apresiasi, dan jaminan insentif bagi para atlet, pelatih, serta ofisial berprestasi.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Structure Board */}
      <div className="card-sikoni space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-sikoni-navy grid place-items-center">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-sikoni-navy">Pengurus Inti KONI Surakarta</h2>
            <p className="text-[11px] text-sikoni-muted">Masa Bakti 2025 – 2029</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
          {leadershipBoard.map((leader, idx) => (
            <div key={idx} className="bg-slate-50 border border-sikoni-line p-4 rounded-xl text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-sikoni-navy text-white mx-auto grid place-items-center font-bold text-xs">
                {leader.name.split(' ')[0][0] + (leader.name.split(' ')[1] ? leader.name.split(' ')[1][0] : '')}
              </div>
              <div>
                <b className="text-xs text-sikoni-navy block leading-snug">{leader.name}</b>
                <span className="text-[11px] font-bold text-sikoni-teal mt-0.5 block">{leader.role}</span>
                <small className="text-[10px] text-sikoni-muted block mt-0.5">{leader.cabor}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Secretariat Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-sikoni space-y-3">
          <div className="w-9 h-9 rounded-xl bg-sikoni-teal2 text-sikoni-teal grid place-items-center">
            <MapPin size={18} />
          </div>
          <b className="text-xs text-sikoni-navy block">Alamat Sekretariat</b>
          <p className="text-xs text-sikoni-muted leading-relaxed">
            Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1, Banjarsari, Kota Surakarta, Jawa Tengah 57139
          </p>
        </div>

        <div className="card-sikoni space-y-3">
          <div className="w-9 h-9 rounded-xl bg-sikoni-gold2 text-sikoni-gold grid place-items-center">
            <Mail size={18} />
          </div>
          <b className="text-xs text-sikoni-navy block">Saluran Komunikasi Resmi</b>
          <div className="text-xs text-sikoni-muted space-y-1">
            <p>Email: <b className="text-sikoni-navy">sekretariat@koni-surakarta.id</b></p>
            <p>Telepon: <b className="text-sikoni-navy">(0271) 714930</b></p>
          </div>
        </div>

        <div className="card-sikoni space-y-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-sikoni-navy grid place-items-center">
            <Clock size={18} />
          </div>
          <b className="text-xs text-sikoni-navy block">Jam Layanan Kantor</b>
          <div className="text-xs text-sikoni-muted space-y-1">
            <p>Senin – Kamis: <b className="text-sikoni-navy">08.00 – 16.00 WIB</b></p>
            <p>Jumat: <b className="text-sikoni-navy">08.00 – 15.30 WIB</b></p>
            <p className="text-[10px] text-sikoni-teal font-semibold">Sabtu, Minggu & Libur Nasional Tutup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
