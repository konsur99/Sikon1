import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateRabDto } from './rab.dto';
import { MoneyMath, RabStatus } from '@sikoni/shared';

@Injectable()
export class RabService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { caborId?: string; status?: string; search?: string; user?: any }) {
    const where: any = { deletedAt: null };

    // Cabor scope isolation
    if (query?.user && query.user.roles?.includes('OPERATOR_CABOR') && !query.user.roles.includes('ADMIN_KONI')) {
      where.caborId = { in: query.user.assignedCaborIds || [] };
    } else if (query?.caborId) {
      where.caborId = query.caborId;
    }

    if (query?.status && query.status !== 'Semua') {
      where.status = query.status;
    }

    if (query?.search) {
      where.OR = [
        { rabNumber: { contains: query.search, mode: 'insensitive' } },
        { name: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.rab.findMany({
      where,
      include: {
        cabor: true,
        createdBy: { select: { fullName: true, username: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, user?: any) {
    const rab = await this.prisma.rab.findUnique({
      where: { id },
      include: {
        cabor: true,
        createdBy: { select: { fullName: true, username: true, id: true } },
        items: {
          include: { expenseCategory: true },
        },
        revisions: true,
        expenses: true,
      },
    });

    if (!rab) {
      throw new NotFoundException(`RAB ID ${id} tidak ditemukan`);
    }

    // Cabor isolation check
    if (user && user.roles?.includes('OPERATOR_CABOR') && !user.roles.includes('ADMIN_KONI')) {
      if (!user.assignedCaborIds?.includes(rab.caborId)) {
        throw new ForbiddenException('Akses ditolak: RAB bukan milik cabang olahraga Anda');
      }
    }

    return rab;
  }

  async create(dto: CreateRabDto, user: any) {
    // 1. Cabor Isolation check
    if (user.roles?.includes('OPERATOR_CABOR') && !user.roles.includes('ADMIN_KONI')) {
      if (!user.assignedCaborIds?.includes(dto.caborId)) {
        throw new ForbiddenException('Anda hanya dapat membuat pengajuan untuk cabor Anda sendiri');
      }
    }

    // 2. Resolve fiscal year
    const fiscalYear = await this.prisma.fiscalYear.findFirst({
      where: { isActive: true },
    });
    if (!fiscalYear) {
      throw new BadRequestException('Tahun anggaran aktif belum dikonfigurasi');
    }

    // 3. Resolve or create activity
    let activityId = dto.activityId;
    if (!activityId) {
      let defaultProgram = await this.prisma.program.findFirst();
      if (!defaultProgram) {
        defaultProgram = await this.prisma.program.create({
          data: { code: 'PROG-DEFAULT', name: 'Program Pembinaan & Kompetisi' },
        });
      }

      const activity = await this.prisma.activity.create({
        data: {
          code: `ACT-${Date.now().toString().slice(-6)}`,
          name: dto.name,
          programId: defaultProgram.id,
          caborId: dto.caborId,
          startDate: new Date(dto.startDate),
          endDate: new Date(dto.endDate),
          location: dto.location,
        },
      });
      activityId = activity.id;
    }

    // 4. Calculate total with Decimal-safe MoneyMath
    let totalCents = 0n;
    const itemsData: any[] = [];

    const defaultCategory =
      (await this.prisma.expenseCategory.findFirst()) ||
      (await this.prisma.expenseCategory.create({
        data: { code: 'UMUM', name: 'Biaya Umum' },
      }));

    for (const [idx, item] of dto.items.entries()) {
      const itemTotal = MoneyMath.multiply(item.unitPrice, item.volume);
      totalCents += MoneyMath.toCents(itemTotal);

      itemsData.push({
        itemOrder: idx + 1,
        description: item.description,
        volume: item.volume,
        unit: item.unit,
        unitPrice: item.unitPrice,
        totalAmount: parseFloat(itemTotal),
        expenseCategoryId: defaultCategory.id,
      });
    }

    const totalRabAmount = parseFloat(MoneyMath.fromCents(totalCents));

    // 5. Generate Rab Number
    const count = await this.prisma.rab.count();
    const rabNumber = `RAB-${(count + 1).toString().padStart(3, '0')}/VI/26`;

    const rab = await this.prisma.rab.create({
      data: {
        rabNumber,
        name: dto.name,
        activityId,
        caborId: dto.caborId,
        fiscalYearId: fiscalYear.id,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        location: dto.location,
        description: dto.description,
        totalAmount: totalRabAmount,
        status: RabStatus.DRAFT,
        createdById: user.id,
        items: {
          create: itemsData,
        },
      },
      include: {
        items: true,
        cabor: true,
      },
    });

    return rab;
  }

  async submit(id: string, user: any) {
    const rab = await this.findOne(id, user);

    if (rab.status !== RabStatus.DRAFT && rab.status !== RabStatus.REVISION_REQUIRED) {
      throw new BadRequestException('Hanya RAB berstatus Draft atau Perlu Revisi yang dapat diajukan');
    }

    return this.prisma.rab.update({
      where: { id },
      data: {
        status: RabStatus.SUBMITTED,
      },
    });
  }
}

