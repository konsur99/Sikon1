import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RoleName } from '@sikoni/shared';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar transaksi pembayaran & pencairan kas' })
  async findAll() {
    return this.paymentsService.findAll();
  }

  @Post()
  @Roles(RoleName.BENDAHARA, RoleName.ADMIN_KONI, RoleName.SUPERADMIN)
  @ApiOperation({ summary: 'Catat pembayaran kewajiban terverifikasi (Bendahara only)' })
  async recordPayment(
    @Body()
    dto: {
      expenseId: string;
      amountPaid: number;
      paymentReference: string;
      notes?: string;
    },
    @CurrentUser() user: any,
  ) {
    return this.paymentsService.recordPayment(dto, user);
  }
}

