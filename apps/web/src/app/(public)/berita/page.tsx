'use client';

import React, { useState } from 'react';
import { Newspaper, X, Calendar, Tag, ArrowRight } from 'lucide-react';

interface NewsItem {
  icon: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  content: string;
}

const newsItems: NewsItem[] = [
  {
    icon: '🏃',
    title: 'Persiapan Kejuaraan Atletik Kota Surakarta',
    summary: 'Informasi agenda teknis dan persiapan kejuaraan atletik tingkat kota bulan November 2026 di Stadion Sriwedari.',
    date: '09 Nov 2026',
    tag: 'KOMPETISI',
    content:
      'KONI Kota Surakarta bersama Pengkot PASI Surakarta mematangkan persiapan teknis Kejuaraan Atletik Kota Surakarta 2026 yang akan diselenggarakan di lintasan sintetis Stadion Sriwedari. Kejuaraan ini mempertandingkan nomor lari sprint 100m, 200m, 400m, lompat jauh, tolak peluru, dan estafet 4x100m dengan target partisipasi lebih dari 250 atlet pelajar dan klub binaan. Seluruh anggaran operasional dan hadiah pembinaan telah dialokasikan melalui mekanisme pengajuan RAB resmi pada sistem informasi SIKONI.',
  },
  {
    icon: '🤝',
    title: 'Koordinasi Pembinaan Cabang Olahraga',
    summary: 'Pertemuan koordinasi program pembinaan jangka panjang bersama perwakilan pengurus cabor se-Kota Surakarta.',
    date: '05 Nov 2026',
    tag: 'ORGANISASI',
    content:
      'Guna memastikan efektivitas penyerapan bantuan dana hibah keolahragaan APBD 2026, KONI Surakarta menggelar Rapat Koordinasi Pembinaan bersama 42 pengurus cabang olahraga. Agenda utama mencakup kepatuhan penyusunan Laporan Pertanggungjawaban (LPJ), rekonsiliasi data atlet berprestasi penerima insentif bulanan, dan implementasi platform digital SIKONI untuk transparansi belanja organisasi.',
  },
  {
    icon: '⭐',
    title: 'Apresiasi Prestasi Atlet Kota Surakarta',
    summary: 'Penetapan apresiasi dan insentif atlet berprestasi pada kejuaraan daerah sesuai dengan SK Ketua Umum KONI.',
    date: '01 Nov 2026',
    tag: 'PRESTASI',
    content:
      'KONI Surakarta menerbitkan Surat Keputusan (SK) terkait penetapan daftar atlet dan pelatih berprestasi yang berhak menerima uang pembinaan bulanan periode semester kedua tahun 2026. Penyaluran insentif dilakukan langsung via transfer perbankan ke rekening masing-masing atlet tanpa potongan perantara, sebagai bentuk transparansi dan motivasi dalam membina talenta olahraga daerah.',
  },
];

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-sikoni-navy tracking-tight">Berita & Kegiatan</h1>
        <p className="text-xs text-sikoni-muted mt-1">
          Informasi agenda kegiatan olahraga, pengumuman resmi, dan kabar pembinaan prestasi KONI Surakarta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item, idx) => (
          <div key={idx} className="card-sikoni flex flex-col justify-between hover:shadow-lg transition-all border border-sikoni-line">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-xl grid place-items-center">
                {item.icon}
              </div>
              <div className="text-[10px] font-bold text-sikoni-muted">{item.date} • {item.tag}</div>
              <h3 className="text-sm font-extrabold text-sikoni-navy leading-snug">{item.title}</h3>
              <p className="text-xs text-sikoni-muted leading-relaxed">{item.summary}</p>
            </div>
            <button
              onClick={() => setSelectedNews(item)}
              className="text-xs font-bold text-sikoni-teal hover:underline text-left mt-4 pt-3 border-t border-sikoni-line flex items-center gap-1"
            >
              Baca selengkapnya <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Full Article Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-sikoni w-full max-w-xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal bg-teal-50 px-2 py-0.5 rounded">
                  {selectedNews.tag}
                </span>
                <h2 className="text-lg font-black text-sikoni-navy mt-1">{selectedNews.title}</h2>
                <div className="flex items-center gap-2 text-[11px] text-sikoni-muted mt-1">
                  <Calendar size={13} /> {selectedNews.date} • Sekretariat KONI Surakarta
                </div>
              </div>
              <button onClick={() => setSelectedNews(null)} className="text-sikoni-muted hover:text-sikoni-navy">
                <X size={18} />
              </button>
            </div>

            <div className="pt-2 border-t border-sikoni-line text-xs text-sikoni-ink leading-relaxed space-y-3">
              <p>{selectedNews.content}</p>
              <div className="p-3 bg-slate-50 border border-sikoni-line rounded-xl text-sikoni-muted text-[11px]">
                Publikasi resmi Komite Olahraga Nasional Indonesia Kota Surakarta.
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-sikoni-line">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-sikoni-teal text-white rounded-lg text-xs font-bold hover:bg-teal-700"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
