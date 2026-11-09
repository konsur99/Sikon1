import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RabService } from './rab.service';
import { CreateRabDto } from './rab.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('RAB')
@Controller('rab')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RabController {
  constructor(private rabService: RabService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar pengajuan RAB (terisolasi cabor)' })
  async findAll(
    @Query('caborId') caborId: string,
    @Query('status') status: string,
    @Query('search') search: string,
    @CurrentUser() user: any,
  ) {
    return this.rabService.findAll({ caborId, status, search, user });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail RAB & rincian biaya' })
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.rabService.findOne(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Buat draf RAB baru dengan rincian biaya' })
  async create(@Body() dto: CreateRabDto, @CurrentUser() user: any) {
    return this.rabService.create(dto, user);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Kirim RAB ke proses verifikasi dan approval' })
  async submit(@Param('id') id: string, @CurrentUser() user: any) {
    return this.rabService.submit(id, user);
  }
}

