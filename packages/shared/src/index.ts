// ==============================================================================
// SIKONI — Shared Enums, Types, & Decimal-safe Arithmetic Utilities
// ==============================================================================

export enum RoleName {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN_KONI = 'ADMIN_KONI',
  BENDAHARA = 'BENDAHARA',
  KETUA_UMUM = 'KETUA_UMUM',
  SEKRETARIS = 'SEKRETARIS',
  OPERATOR_CABOR = 'OPERATOR_CABOR',
  AUDITOR = 'AUDITOR',
}

export enum RabStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  VERIFYING = 'VERIFYING',
  REVISION_REQUIRED = 'REVISION_REQUIRED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum ExpenseStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum PaymentMethod {
  ADVANCE_PANJAR = 'ADVANCE_PANJAR',
  REIMBURSEMENT = 'REIMBURSEMENT',
  DIRECT_PAYMENT = 'DIRECT_PAYMENT',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum LpjStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  VERIFYING = 'VERIFYING',
  REVISION_REQUIRED = 'REVISION_REQUIRED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ApprovalDecision {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REQUEST_REVISION = 'REQUEST_REVISION',
}

export enum TaxType {
  PPH21 = 'PPH21',
  PPH22 = 'PPH22',
  PPH23 = 'PPH23',
  PPN11 = 'PPN11',
}

export enum PublicationStatus {
  DRAFT = 'DRAFT',
  APPROVED_FOR_PUBLICATION = 'APPROVED_FOR_PUBLICATION',
  ARCHIVED = 'ARCHIVED',
}

// Decimal-safe currency calculations using integer cents (Sen / Ratusan Rupiah)
export class MoneyMath {
  /**
   * Mengonversi nilai float/string ke bigint sen (skala 2 desimal)
   */
  static toCents(val: number | string): bigint {
    const str = typeof val === 'number' ? val.toFixed(2) : parseFloat(val || '0').toFixed(2);
    const [intPart, decPart = '00'] = str.split('.');
    const cleanDec = (decPart + '00').slice(0, 2);
    return BigInt(intPart) * 100n + BigInt(cleanDec);
  }

  /**
   * Mengonversi bigint sen kembali ke string angka dengan 2 desimal
   */
  static fromCents(cents: bigint): string {
    const sign = cents < 0n ? '-' : '';
    const abs = cents < 0n ? -cents : cents;
    const intPart = (abs / 100n).toString();
    const decPart = (abs % 100n).toString().padStart(2, '0');
    return `${sign}${intPart}.${decPart}`;
  }

  static add(a: number | string, b: number | string): string {
    return this.fromCents(this.toCents(a) + this.toCents(b));
  }

  static subtract(a: number | string, b: number | string): string {
    return this.fromCents(this.toCents(a) - this.toCents(b));
  }

  static multiply(a: number | string, factor: number): string {
    const factorCents = Math.round(factor * 100);
    const resultCents = (this.toCents(a) * BigInt(factorCents)) / 100n;
    return this.fromCents(resultCents);
  }

  static formatRupiah(amount: number | string): string {
    const num = typeof amount === 'number' ? amount : parseFloat(amount || '0');
    return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
  }

  static formatCompactRupiah(amount: number | string): string {
    const num = typeof amount === 'number' ? amount : parseFloat(amount || '0');
    if (num >= 1_000_000_000) {
      return `Rp ${(num / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} M`;
    }
    if (num >= 1_000_000) {
      return `Rp ${(num / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`;
    }
    return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
  }
}

