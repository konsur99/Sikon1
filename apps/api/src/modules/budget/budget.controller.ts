import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Budget')
@Controller('budget')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Ringkasan KPI keuangan anggaran, komitmen, & realisasi' })
  async getSummary(@Query('year') year?: number) {
    return this.budgetService.getDashboardSummary(year ? Number(year) : 2026);
  }

  @Get('fund-receipts')
  @ApiOperation({ summary: 'Daftar dana masuk berdasarkan tanggal dan sumber dana' })
  async getFundReceipts(@Query('year') year?: number) {
    return this.budgetService.getFundReceipts(year ? Number(year) : 2026);
  }

  @Get('cabor-allocations')
  @ApiOperation({ summary: 'Alokasi anggaran per cabang olahraga' })
  async getCaborAllocations(@Query('year') year?: number) {
    return this.budgetService.getCaborAllocations(year ? Number(year) : 2026);
  }
}

