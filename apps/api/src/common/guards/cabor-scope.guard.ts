import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RoleName } from '@sikoni/shared';

@Injectable()
export class CaborScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Autentikasi diperlukan');
    }

    // Role internal KONI memiliki akses lintas cabor (SUPERADMIN, ADMIN_KONI, BENDAHARA, KETUA_UMUM, AUDITOR)
    const isInternalKoni = user.roles?.some((r: string) =>
      [RoleName.SUPERADMIN, RoleName.ADMIN_KONI, RoleName.BENDAHARA, RoleName.KETUA_UMUM, RoleName.AUDITOR].includes(
        r as RoleName,
      ),
    );

    if (isInternalKoni) {
      return true;
    }

    // Untuk role OPERATOR_CABOR, batasi hanya ke cabor yang ditugaskan
    const isOperatorCabor = user.roles?.includes(RoleName.OPERATOR_CABOR);
    if (!isOperatorCabor) {
      return true;
    }

    // Dapatkan target caborId dari parameter query, body, atau route param
    const targetCaborId = request.params?.caborId || request.body?.caborId || request.query?.caborId;

    if (!targetCaborId) {
      // Jika tidak ada target spesifik, teruskan, namun handler harus memfilter berdasarkan user.assignedCaborIds
      return true;
    }

    const assignedCaborIds: string[] = user.assignedCaborIds || [];
    if (!assignedCaborIds.includes(targetCaborId)) {
      throw new ForbiddenException(
        `Pelanggaran isolasi cabor: Anda tidak berwenang mengakses data cabang olahraga ID: ${targetCaborId}`,
      );
    }

    return true;
  }
}

