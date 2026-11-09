import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { PaymentStatus, ExpenseStatus } from '@sikoni/shared';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        expense: {
          include: { cabor: true, rab: true },
        },
        disbursedBy: { select: { fullName: true } },
      },
      orderBy: { paymentDate: 'desc' },
    });
  }

  async recordPayment(
    data: {
      expenseId: string;
      amountPaid: number;
      paymentReference: string;
      notes?: string;
    },
    user: any,
  ) {
    const expense = await this.prisma.expense.findUnique({
      where: { id: data.expenseId },
      include: { payments: true },
    });

    if (!expense) {
      throw new NotFoundException('Data pengeluaran tidak ditemukan');
    }

    // Business rule: Hanya pengeluaran yang sudah VERIFIED yang dapat dibayar
    if (expense.status !== ExpenseStatus.VERIFIED) {
      throw new BadRequestException('Pengeluaran belum diverifikasi. Pembayaran hanya dapat dicatat untuk pengeluaran valid.');
    }

    const totalPaidSoFar = expense.payments.reduce((acc, p) => acc + Number(p.amountPaid), 0);
    const newTotal = totalPaidSoFar + data.amountPaid;

    if (newTotal > Number(expense.amount)) {
      throw new BadRequestException('Nilai pembayaran melebihi sisa kewajiban terverifikasi');
    }

    const count = await this.prisma.payment.count();
    const paymentNumber = `PAY-${(count + 1).toString().padStart(3, '0')}`;

    const payment = await this.prisma.payment.create({
      data: {
        paymentNumber,
        expenseId: expense.id,
        paymentDate: new Date(),
        amountPaid: data.amountPaid,
        paymentReference: data.paymentReference,
        status: newTotal >= Number(expense.amount) ? PaymentStatus.PAID : PaymentStatus.PARTIAL,
        disbursedById: user.id,
        notes: data.notes,
      },
    });

    return payment;
  }
}

