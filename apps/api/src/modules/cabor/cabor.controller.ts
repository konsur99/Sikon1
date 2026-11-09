import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CaborService } from './cabor.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CaborScopeGuard } from '../../common/guards/cabor-scope.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Cabor')
@Controller('cabor')
@UseGuards(JwtAuthGuard, CaborScopeGuard)
@ApiBearerAuth()
export class CaborController {
  constructor(private caborService: CaborService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar cabang olahraga (terisolasi otomatis untuk Operator Cabor)' })
  async findAll(@Query('search') search: string, @Query('status') status: string, @CurrentUser() user: any) {
    return this.caborService.findAll({ search, status, user });
  }

  @Get(':caborId')
  @ApiOperation({ summary: 'Detail profil & alokasi cabang olahraga' })
  async findOne(@Param('caborId') caborId: string) {
    return this.caborService.findOne(caborId);
  }
}

