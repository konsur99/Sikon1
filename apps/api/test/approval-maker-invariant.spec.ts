import { ApprovalService } from '../src/modules/approval/approval.service';
import { ApprovalDecision } from '@sikoni/shared';
import { ForbiddenException } from '@nestjs/common';

describe('Approval Workflow — Maker Approver Invariant Test', () => {
  let approvalService: ApprovalService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      rab: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      auditLog: {
        create: jest.fn(),
      },
      $transaction: jest.fn(async (cb) => cb(mockPrisma)),
    };
    approvalService = new ApprovalService(mockPrisma);
  });

  it('should block the maker from approving their own RAB submission', async () => {
    const creatorUserId = 'user-pasi-operator-1';

    // Mock existing RAB created by user-pasi-operator-1
    mockPrisma.rab.findUnique.mockResolvedValue({
      id: 'rab-026',
      rabNumber: 'RAB-026/VI/26',
      createdById: creatorUserId,
      status: 'SUBMITTED',
    });

    const actorUser = {
      id: creatorUserId, // SAME USER trying to approve their own RAB
      roles: ['BENDAHARA', 'OPERATOR_CABOR'],
    };

    await expect(
      approvalService.processDecision('RAB', 'rab-026', ApprovalDecision.APPROVE, 'Disetujui', actorUser),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow another authorized approver to approve the RAB', async () => {
    const creatorUserId = 'user-pasi-operator-1';
    const approverUserId = 'user-bendahara-koni-2';

    mockPrisma.rab.findUnique.mockResolvedValue({
      id: 'rab-026',
      rabNumber: 'RAB-026/VI/26',
      createdById: creatorUserId,
      status: 'SUBMITTED',
    });

    mockPrisma.rab.update.mockResolvedValue({
      id: 'rab-026',
      status: 'APPROVED',
    });

    const approverUser = {
      id: approverUserId, // DIFFERENT user
      roles: ['BENDAHARA'],
    };

    const res = await approvalService.processDecision(
      'RAB',
      'rab-026',
      ApprovalDecision.APPROVE,
      'Dokumen lengkap dan valid',
      approverUser,
    );

    expect(res.status).toBe('APPROVED');
  });
});

