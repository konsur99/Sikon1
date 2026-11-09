import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return [
      {
        id: 'tax-1',
        reference: 'EXP-1108',
        taxType: 'PPh 23 (Sewa Venue)',
        taxableBase: 12000000,
        taxAmount: 240000,
        depositDate: '2026-11-06',
        status: 'Dibayar',
      },
      {
        id: 'tax-2',
        reference: 'EXP-1097',
        taxType: 'PPN 11% (Pengadaan Alat)',
        taxableBase: 25000000,
        taxAmount: 2750000,
        depositDate: null,
        status: 'Menunggu',
      },
    ];
  }

  async getSummary() {
    return {
      totalCalculatedTax: 48500000,
      totalDepositedTax: 42100000,
      unpaidTax: 6400000,
      depositProofCount: 18,
    };
  }
}

