import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ApprovalDecision, RabStatus } from '@sikoni/shared';

@Injectable()
export class ApprovalService {
  constructor(private prisma: PrismaService) {}

  async getInbox(user: any) {
    // Ambil daftar submission RAB / LPJ / Expense yang menunggu persetujuan
    const pendingRabs = await this.prisma.rab.findMany({
      where: {
        status: { in: [RabStatus.SUBMITTED, RabStatus.VERIFYING] },
      },
      include: {
        cabor: true,
        createdBy: { select: { fullName: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return pendingRabs.map((r) => ({
      id: r.id,
      entityType: 'RAB',
      number: r.rabNumber,
      title: r.name,
      cabor: r.cabor.name,
      amount: r.totalAmount,
      submittedDate: r.createdAt,
      currentStep: 'Verifikasi Bendahara & Pimpinan',
      createdById: r.createdById,
    }));
  }

  async processDecision(
    entityType: 'RAB' | 'EXPENSE' | 'LPJ',
    entityId: string,
    decision: ApprovalDecision,
    comments: string,
    user: any,
  ) {
    if (entityType === 'RAB') {
      const rab = await this.prisma.rab.findUnique({
        where: { id: entityId },
      });

      if (!rab) {
        throw new NotFoundException('RAB tidak ditemukan');
      }

      // 1. Maker invariant: Pembuat tidak boleh menyetujui pengajuannya sendiri
      if (rab.createdById === user.id) {
        throw new ForbiddenException('Pelanggaran integritas: Pembuat transaksi tidak boleh menyetujui pengajuannya sendiri');
      }

      let newStatus: RabStatus;
      if (decision === ApprovalDecision.APPROVE) {
        newStatus = RabStatus.APPROVED;
      } else if (decision === ApprovalDecision.REJECT) {
        newStatus = RabStatus.REJECTED;
      } else {
        newStatus = RabStatus.REVISION_REQUIRED;
      }

      // Update RAB & record audit log dalam transaksi
      const updated = await this.prisma.$transaction(async (tx) => {
        const res = await tx.rab.update({
          where: { id: entityId },
          data: { status: newStatus },
        });

        await tx.auditLog.create({
          data: {
            userId: user.id,
            action: `APPROVAL_${decision}`,
            resourceType: 'RAB',
            resourceId: entityId,
            payloadBefore: { status: rab.status },
            payloadAfter: { status: newStatus, comments },
          },
        });

        return res;
      });

      return updated;
    }

    throw new BadRequestException(`Modul ${entityType} belum didukung`);
  }
}

