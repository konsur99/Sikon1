import { CaborScopeGuard } from '../src/common/guards/cabor-scope.guard';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RoleName } from '@sikoni/shared';

describe('Security — Cabor Scope Isolation Guard Test', () => {
  let guard: CaborScopeGuard;

  beforeEach(() => {
    guard = new CaborScopeGuard();
  });

  const createMockContext = (user: any, params: any = {}, body: any = {}, query: any = {}): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user,
          params,
          body,
          query,
        }),
      }),
    } as any;
  };

  it('should block an Operator Cabor assigned to PASI from accessing PBSI data', () => {
    const user = {
      id: 'operator-1',
      roles: [RoleName.OPERATOR_CABOR],
      assignedCaborIds: ['cabor-pasi-id'], // Only PASI!
    };

    const context = createMockContext(user, { caborId: 'cabor-pbsi-id' }); // Trying to access PBSI!

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should allow an Operator Cabor to access their own cabor data', () => {
    const user = {
      id: 'operator-1',
      roles: [RoleName.OPERATOR_CABOR],
      assignedCaborIds: ['cabor-pasi-id'],
    };

    const context = createMockContext(user, { caborId: 'cabor-pasi-id' });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow internal KONI Admin / Bendahara to access across all cabor data', () => {
    const user = {
      id: 'admin-koni-1',
      roles: [RoleName.ADMIN_KONI],
      assignedCaborIds: [],
    };

    const context = createMockContext(user, { caborId: 'cabor-pbsi-id' });

    expect(guard.canActivate(context)).toBe(true);
  });
});

