'use client';

import React, { useState } from 'react';
import { Newspaper, X, Calendar, Tag, ArrowRight, BookOpen, Clock } from 'lucide-react';

interface NewsItem {
  icon: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  content: string;
  accent: string;
}

const newsItems: NewsItem[] = [
  {
    icon: '🏃',
    title: 'Persiapan Kejuaraan Atletik Kota Surakarta 2026',
    summary: 'Informasi agenda teknis dan persiapan kejuaraan atletik tingkat kota bulan November 2026 di lintasan sintetis Stadion Sriwedari.',
    date: '09 Nov 2026',
    tag: 'KOMPETISI',
    accent: 'border-t-4 border-t-sikoni-teal',
    content:
      'KONI Kota Surakarta bersama Pengkot PASI Surakarta mematangkan persiapan teknis Kejuaraan Atletik Kota Surakarta 2026 yang akan diselenggarakan di lintasan sintetis Stadion Sriwedari. Kejuaraan ini mempertandingkan nomor lari sprint 100m, 200m, 400m, lompat jauh, tolak peluru, dan estafet 4x100m dengan target partisipasi lebih dari 250 atlet pelajar dan klub binaan. Seluruh anggaran operasional dan hadiah pembinaan telah dialokasikan melalui mekanisme pengajuan RAB resmi pada sistem informasi SIKONI.',
  },
  {
    icon: '🤝',
    title: 'Koordinasi Pembinaan 64 Cabang Olahraga',
    summary: 'Pertemuan koordinasi program pembinaan jangka panjang bersama perwakilan pengurus cabor se-Kota Surakarta.',
    date: '05 Nov 2026',
    tag: 'ORGANISASI',
    accent: 'border-t-4 border-t-sikoni-gold',
    content:
      'Guna memastikan efektivitas penyerapan bantuan dana hibah keolahragaan APBD 2026, KONI Surakarta menggelar Rapat Koordinasi Pembinaan bersama 64 pengurus cabang olahraga. Agenda utama mencakup kepatuhan penyusunan Laporan Pertanggungjawaban (LPJ), rekonsiliasi data atlet berprestasi penerima insentif bulanan, dan implementasi platform digital SIKONI untuk transparansi belanja organisasi.',
  },
  {
    icon: '⭐',
    title: 'Apresiasi Prestasi & Insentif Atlet Kota Surakarta',
    summary: 'Penetapan apresiasi dan insentif atlet berprestasi pada kejuaraan daerah sesuai dengan SK Ketua Umum KONI.',
    date: '01 Nov 2026',
    tag: 'PRESTASI',
    accent: 'border-t-4 border-t-sikoni-navy',
    content:
      'KONI Surakarta menerbitkan Surat Keputusan (SK) terkait penetapan daftar atlet dan pelatih berprestasi yang berhak menerima uang pembinaan bulanan periode semester kedua tahun 2026. Penyaluran insentif dilakukan langsung via transfer perbankan ke rekening masing-masing atlet tanpa potongan perantara, sebagai bentuk transparansi dan motivasi dalam membina talenta olahraga daerah.',
  },
];

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div>
        <div className="text-xs font-extrabold text-sikoni-teal tracking-wider uppercase">
          PUBLIKASI RESMI
        </div>
        <h1 className="text-3xl font-black text-sikoni-navy tracking-tight mt-1">Berita & Kegiatan</h1>
        <p className="text-xs text-sikoni-muted mt-1 max-w-2xl leading-relaxed">
          Informasi agenda kegiatan keolahragaan, pengumuman resmi organisasi, dan kabar prestasi atlet Kota Surakarta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item, idx) => (
          <div
            key={idx}
            className={`card-sikoni flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group ${item.accent}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-xl grid place-items-center shadow-sm group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[9.5px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
                <Calendar size={11} /> {item.date}
              </div>

              <h3 className="text-sm font-extrabold text-sikoni-navy leading-snug group-hover:text-sikoni-teal transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
            </div>

            <button
              onClick={() => setSelectedNews(item)}
              className="text-xs font-bold text-sikoni-teal hover:text-teal-800 text-left mt-5 pt-3 border-t border-slate-100 flex items-center justify-between group-hover:underline"
            >
              <span>Baca Selengkapnya</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Full Article Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-sikoni-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-sikoni-teal bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  {selectedNews.tag}
                </span>
                <h2 className="text-lg font-black text-sikoni-navy mt-1.5 leading-snug">
                  {selectedNews.title}
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-sikoni-muted mt-1 font-medium">
                  <Calendar size={13} /> {selectedNews.date} • Sekretariat KONI Surakarta
                </div>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-sikoni-navy p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed space-y-3">
              <p>{selectedNews.content}</p>
              <div className="p-3.5 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl text-slate-500 text-[11px] flex items-center gap-2">
                <BookOpen size={16} className="text-sikoni-teal flex-shrink-0" />
                <span>Publikasi resmi Komite Olahraga Nasional Indonesia (KONI) Kota Surakarta.</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-sikoni-navy text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-sm"
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
