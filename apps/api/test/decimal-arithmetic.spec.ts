import { MoneyMath } from '@sikoni/shared';

describe('Decimal-Safe Currency Arithmetic (MoneyMath)', () => {
  it('should avoid JavaScript floating-point rounding errors (0.1 + 0.2)', () => {
    // In standard JS: 0.1 + 0.2 === 0.30000000000000004
    const result = MoneyMath.add(0.1, 0.2);
    expect(result).toBe('0.30');
  });

  it('should accurately calculate volume * unit price for large budget items', () => {
    // 120 paket * Rp 75.000,50
    const total = MoneyMath.multiply(75000.5, 120);
    expect(total).toBe('9000060.00');
  });

  it('should properly format compact Rupiah strings', () => {
    expect(MoneyMath.formatCompactRupiah(2450000000)).toBe('Rp 2,45 M');
    expect(MoneyMath.formatCompactRupiah(48500000)).toBe('Rp 48,5 jt');
    expect(MoneyMath.formatCompactRupiah(750000)).toBe('Rp 750.000');
  });
});

