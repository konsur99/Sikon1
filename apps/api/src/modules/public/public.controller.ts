import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PublicService } from './public.service';

@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(private publicService: PublicService) {}

  @Get('transparency')
  @ApiOperation({ summary: 'Ringkasan data transparansi anggaran yang disetujui publikasi' })
  async getTransparency() {
    return this.publicService.getTransparencySnapshot();
  }

  @Get('cabor')
  @ApiOperation({ summary: 'Direktori cabang olahraga publik' })
  async getCabor(@Query('category') category?: string, @Query('search') search?: string) {
    return this.publicService.getCaborDirectory(category, search);
  }

  @Get('news')
  @ApiOperation({ summary: 'Daftar pengumuman & berita kegiatan resmi' })
  async getNews() {
    return this.publicService.getNews();
  }
}

