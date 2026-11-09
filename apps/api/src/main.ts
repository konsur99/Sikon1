import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet());

  // CORS configuration
  app.enableCors({
    origin: [
      process.env.WEB_PUBLIC_URL || 'http://localhost:3000',
      process.env.WEB_ADMIN_URL || 'http://localhost:3000',
      'http://localhost:19006', // Expo Web
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API Prefix
  app.setGlobalPrefix('api/v1');

  // OpenAPI / Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('SIKONI API — KONI Surakarta')
    .setDescription(
      'Satu backend API sebagai sumber aturan bisnis untuk Website Publik, Web Admin KONI, dan Aplikasi Android.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Autentikasi & Profil Akun')
    .addTag('Cabor', 'Master Data & Penugasan Cabang Olahraga')
    .addTag('Budget', 'Pagu, Alokasi, & Dana Masuk')
    .addTag('RAB', 'Rencana Anggaran Biaya & Rincian Item')
    .addTag('Expenses', 'Realisasi Pengeluaran & Bukti Transaksi')
    .addTag('Payments', 'Pencatatan Pembayaran & Rekonsiliasi')
    .addTag('LPJ', 'Laporan Pertanggungjawaban Kegiatan')
    .addTag('Approval', 'Approval Workflow Engine')
    .addTag('Public', 'Portal Informasi & Transparansi Publik')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`SIKONI API is running on http://localhost:${port}/api/v1`);
  console.log(`Swagger OpenAPI Documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();

