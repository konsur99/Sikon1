import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'sikoni_super_secret_jwt_key_surakarta_2026_change_in_production',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        roles: { include: { role: true } },
        caborAssignments: { include: { cabor: true } },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Pengguna tidak aktif atau tidak ditemukan');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      roles: user.roles.map((r) => r.role.name),
      assignedCaborIds: user.caborAssignments.map((c) => c.caborId),
      assignedCabors: user.caborAssignments.map((c) => ({ id: c.cabor.id, code: c.cabor.code, name: c.cabor.name })),
    };
  }
}

