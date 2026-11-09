import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TaxService } from './tax.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Tax')
@Controller('tax')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaxController {
  constructor(private taxService: TaxService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar transaksi pajak dan bukti setor' })
  async findAll() {
    return this.taxService.findAll();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Ringkasan kewajiban pajak' })
  async getSummary() {
    return this.taxService.getSummary();
  }
}

