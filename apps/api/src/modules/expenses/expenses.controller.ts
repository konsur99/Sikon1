import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PaymentMethod } from '@sikoni/shared';

@ApiTags('Expenses')
@Controller('expenses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar pengeluaran & realisasi cabor' })
  async findAll(
    @Query('caborId') caborId: string,
    @Query('status') status: string,
    @Query('search') search: string,
    @CurrentUser() user: any,
  ) {
    return this.expensesService.findAll({ caborId, status, search, user });
  }

  @Post()
  @ApiOperation({ summary: 'Input pengeluaran kegiatan (Mobile / Web)' })
  async create(
    @Body()
    dto: {
      rabId: string;
      description: string;
      amount: number;
      expenseDate: string;
      paymentMethod: PaymentMethod;
      notes?: string;
    },
    @CurrentUser() user: any,
  ) {
    return this.expensesService.create(dto, user);
  }

  @Post(':id/verify')
  @ApiOperation({ summary: 'Verifikasi pengeluaran oleh Verifikator / Bendahara' })
  async verify(@Param('id') id: string, @Body('decision') decision: 'VERIFIED' | 'REJECTED', @CurrentUser() user: any) {
    return this.expensesService.verify(id, decision, user);
  }
}

