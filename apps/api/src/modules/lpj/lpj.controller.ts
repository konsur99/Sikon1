import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LpjService } from './lpj.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('LPJ')
@Controller('lpj')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LpjController {
  constructor(private lpjService: LpjService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar dokumen Laporan Pertanggungjawaban' })
  async findAll(@Query('caborId') caborId: string, @Query('status') status: string, @CurrentUser() user: any) {
    return this.lpjService.findAll({ caborId, status, user });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail LPJ & checklist kelengkapan berkas' })
  async findOne(@Param('id') id: string) {
    return this.lpjService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat draf LPJ baru untuk kegiatan selesai' })
  async create(@Body() dto: { activityId: string; executiveSummary?: string }, @CurrentUser() user: any) {
    return this.lpjService.create(dto, user);
  }
}

