import { Module } from '@nestjs/common';
import { LpjController } from './lpj.controller';
import { LpjService } from './lpj.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [LpjController],
  providers: [LpjService, PrismaService],
  exports: [LpjService],
})
export class LpjModule {}

