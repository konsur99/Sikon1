import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CaborModule } from './modules/cabor/cabor.module';
import { BudgetModule } from './modules/budget/budget.module';
import { RabModule } from './modules/rab/rab.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LpjModule } from './modules/lpj/lpj.module';
import { ApprovalModule } from './modules/approval/approval.module';
import { PublicModule } from './modules/public/public.module';
import { TaxModule } from './modules/tax/tax.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CaborModule,
    BudgetModule,
    RabModule,
    ExpensesModule,
    PaymentsModule,
    LpjModule,
    ApprovalModule,
    PublicModule,
    TaxModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

