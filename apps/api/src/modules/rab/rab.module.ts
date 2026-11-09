import { Module } from '@nestjs/common';
import { RabController } from './rab.controller';
import { RabService } from './rab.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [RabController],
  providers: [RabService, PrismaService],
  exports: [RabService],
})
export class RabModule {}

