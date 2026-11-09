import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { LpjStatus } from '@sikoni/shared';

@Injectable()
export class LpjService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { caborId?: string; status?: string; user?: any }) {
    const where: any = {};

    if (query?.user && query.user.roles?.includes('OPERATOR_CABOR') && !query.user.roles.includes('ADMIN_KONI')) {
      where.caborId = { in: query.user.assignedCaborIds || [] };
    } else if (query?.caborId) {
      where.caborId = query.caborId;
    }

    if (query?.status && query.status !== 'Semua') {
      where.status = query.status;
    }

    return this.prisma.lpj.findMany({
      where,
      include: {
        cabor: true,
        activity: true,
        sections: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const lpj = await this.prisma.lpj.findUnique({
      where: { id },
      include: {
        cabor: true,
        activity: true,
        sections: true,
        attachments: true,
        revisions: true,
      },
    });

    if (!lpj) {
      throw new NotFoundException(`LPJ ID ${id} tidak ditemukan`);
    }

    return lpj;
  }

  async create(data: { activityId: string; executiveSummary?: string }, user: any) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: data.activityId },
      include: { cabor: true },
    });

    if (!activity || !activity.caborId) {
      throw new BadRequestException('Kegiatan tidak valid');
    }

    const count = await this.prisma.lpj.count();
    const lpjNumber = `LPJ-${(count + 1).toString().padStart(3, '0')}/X/26`;

    return this.prisma.lpj.create({
      data: {
        lpjNumber,
        activityId: activity.id,
        caborId: activity.caborId,
        totalRealizedAmount: 0,
        status: LpjStatus.DRAFT,
        executiveSummary: data.executiveSummary,
        sections: {
          create: [
            { sectionName: 'Identitas dan ringkasan kegiatan', isCompleted: true },
            { sectionName: 'Realisasi terhadap RAB', isCompleted: true },
            { sectionName: 'Bukti pengeluaran', isCompleted: false },
            { sectionName: 'Bukti pembayaran', isCompleted: false },
            { sectionName: 'Dokumentasi kegiatan', isCompleted: true },
          ],
        },
      },
      include: { sections: true, cabor: true },
    });
  }
}

