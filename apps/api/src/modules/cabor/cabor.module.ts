import { Module } from '@nestjs/common';
import { CaborController } from './cabor.controller';
import { CaborService } from './cabor.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [CaborController],
  providers: [CaborService, PrismaService],
  exports: [CaborService],
})
export class CaborModule {}

