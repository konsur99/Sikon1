import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CaborService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { search?: string; status?: string; user?: any }) {
    const where: any = { deletedAt: null };

    // Jika user adalah OPERATOR_CABOR, batasi hanya ke cabor yang ditugaskan
    if (query?.user && query.user.roles?.includes('OPERATOR_CABOR') && !query.user.roles.includes('ADMIN_KONI')) {
      where.id = { in: query.user.assignedCaborIds || [] };
    }

    if (query?.status && query.status !== 'Semua') {
      where.status = query.status;
    }

    if (query?.search) {
      where.OR = [
        { code: { contains: query.search, mode: 'insensitive' } },
        { name: { contains: query.search, mode: 'insensitive' } },
        { leaderName: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.cabor.findMany({
      where,
      orderBy: { code: 'asc' },
    });
  }

  async findOne(id: string) {
    const cabor = await this.prisma.cabor.findUnique({
      where: { id },
      include: {
        budgetAllocations: {
          include: { fiscalYear: true, program: true },
        },
        activities: {
          take: 5,
          orderBy: { startDate: 'desc' },
        },
      },
    });

    if (!cabor) {
      throw new NotFoundException(`Cabang olahraga ID ${id} tidak ditemukan`);
    }

    return cabor;
  }
}

