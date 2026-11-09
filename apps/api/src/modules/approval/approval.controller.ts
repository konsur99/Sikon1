import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApprovalService } from './approval.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApprovalDecision } from '@sikoni/shared';

@ApiTags('Approval')
@Controller('approval')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApprovalController {
  constructor(private approvalService: ApprovalService) {}

  @Get('inbox')
  @ApiOperation({ summary: 'Daftar tugas persetujuan menunggu aksi saya' })
  async getInbox(@CurrentUser() user: any) {
    return this.approvalService.getInbox(user);
  }

  @Post(':entityType/:id/decide')
  @ApiOperation({ summary: 'Memproses keputusan approval (APPROVE, REJECT, REQUEST_REVISION)' })
  async decide(
    @Param('entityType') entityType: 'RAB' | 'EXPENSE' | 'LPJ',
    @Param('id') id: string,
    @Body('decision') decision: ApprovalDecision,
    @Body('comments') comments: string,
    @CurrentUser() user: any,
  ) {
    return this.approvalService.processDecision(entityType, id, decision, comments, user);
  }
}

