import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ExpenseStatus, PaymentMethod } from '@sikoni/shared';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { caborId?: string; status?: string; search?: string; user?: any }) {
    const where: any = {};

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
        { expenseNumber: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.expense.findMany({
      where,
      include: {
        cabor: true,
        rab: true,
        payments: true,
        attachments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    data: {
      rabId: string;
      description: string;
      amount: number;
      expenseDate: string;
      paymentMethod: PaymentMethod;
      notes?: string;
    },
    user: any,
  ) {
    const rab = await this.prisma.rab.findUnique({
      where: { id: data.rabId },
    });

    if (!rab) {
      throw new NotFoundException('RAB tidak ditemukan');
    }

    if (user.roles?.includes('OPERATOR_CABOR') && !user.roles.includes('ADMIN_KONI')) {
      if (!user.assignedCaborIds?.includes(rab.caborId)) {
        throw new ForbiddenException('Akses ditolak: RAB bukan milik cabor Anda');
      }
    }

    const count = await this.prisma.expense.count();
    const expenseNumber = `EXP-${1126 + count}`;

    return this.prisma.expense.create({
      data: {
        expenseNumber,
        rabId: rab.id,
        activityId: rab.activityId,
        caborId: rab.caborId,
        expenseDate: new Date(data.expenseDate),
        description: data.description,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        status: ExpenseStatus.SUBMITTED,
        notes: data.notes,
      },
      include: {
        cabor: true,
        rab: true,
      },
    });
  }

  async verify(id: string, decision: 'VERIFIED' | 'REJECTED', user: any) {
    return this.prisma.expense.update({
      where: { id },
      data: {
        status: decision === 'VERIFIED' ? ExpenseStatus.VERIFIED : ExpenseStatus.REJECTED,
        verifiedById: user.id,
        verifiedAt: new Date(),
      },
    });
  }
}

