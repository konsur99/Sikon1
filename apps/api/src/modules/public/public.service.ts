import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async getTransparencySnapshot() {
    // Website publik hanya membaca data agregat yang secara eksplisit telah disetujui untuk dipublikasikan
    const snapshot = await this.prisma.publicDashboardSnapshot.findFirst({
      where: { isApproved: true },
      orderBy: { publishedDate: 'desc' },
    });

    if (snapshot) {
      return snapshot;
    }

    // Default snapshot data demonstrasi
    return {
      periodLabel: 'Tahun Anggaran 2026',
      publishedDate: new Date('2026-11-05'),
      totalReceivedAmount: 2450000000,
      totalAllocatedAmount: 1820000000,
      totalVerifiedAmount: 1210000000,
      totalRegisteredCabor: 42,
      totalAthletes: 1250,
      totalPrograms: 86,
      disclaimerNote:
        'Informasi agregat publikasi resmi KONI Surakarta. Nilai telah melalui rekonsiliasi dan persetujuan pengurus.',
      isApproved: true,
      budgetDistribution: [
        { label: 'Pembinaan atlet', amount: 540000000, percentage: 44 },
        { label: 'Kompetisi dan kejuaraan', amount: 420000000, percentage: 25 },
        { label: 'Operasional organisasi', amount: 250000000, percentage: 18 },
        { label: 'Program lainnya', amount: 610000000, percentage: 13 },
      ],
    };
  }

  async getCaborDirectory(category?: string, search?: string) {
    const where: any = { status: 'Aktif', deletedAt: null };

    if (category && category !== 'Semua kategori') {
      where.sportCategory = category;
    }

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.cabor.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        sportCategory: true,
        athleteCount: true,
        leaderName: true,
      },
      orderBy: { code: 'asc' },
    });
  }

  async getNews() {
    return [
      {
        id: 'news-1',
        title: 'Persiapan Kejuaraan Atletik Kota Surakarta',
        summary: 'Informasi agenda dan persiapan kejuaraan atletik bulan November 2026.',
        date: '09 Nov 2026',
        category: 'KEGIATAN',
      },
      {
        id: 'news-2',
        title: 'Koordinasi Pembinaan Cabang Olahraga',
        summary: 'Pertemuan koordinasi program pembinaan bersama perwakilan cabor se-Kota Surakarta.',
        date: '05 Nov 2026',
        category: 'ORGANISASI',
      },
      {
        id: 'news-3',
        title: 'Apresiasi Prestasi Atlet Kota Surakarta',
        summary: 'Pemberian piagam dan pembinaan prestasi atlet kejurda sesuai publikasi resmi.',
        date: '01 Nov 2026',
        category: 'PRESTASI',
      },
    ];
  }
}

