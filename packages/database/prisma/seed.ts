// ==============================================================================
// SIKONI — Master & Prototype Seed Data
// ==============================================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SIKONI master data...');

  // 1. Roles
  const roles = [
    { name: 'SUPERADMIN', description: 'Administrator Sistem IT' },
    { name: 'ADMIN_KONI', description: 'Administrator Sekretariat KONI' },
    { name: 'BENDAHARA', description: 'Bendahara & Pejabat Keuangan KONI' },
    { name: 'KETUA_UMUM', description: 'Ketua Umum KONI Surakarta' },
    { name: 'OPERATOR_CABOR', description: 'Operator Pengurus Cabang Olahraga' },
    { name: 'AUDITOR', description: 'Pemeriksa Internal / Pengawas Keuangan' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }

  // 2. Users (Passwords: hashed representation for demo)
  const defaultPasswordHash = '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ec5PQSVjy8xVzPn/m'; // "Password123!"

  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN_KONI' } });
  const bendaharaRole = await prisma.role.findUnique({ where: { name: 'BENDAHARA' } });
  const operatorRole = await prisma.role.findUnique({ where: { name: 'OPERATOR_CABOR' } });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@koni-surakarta.id' },
    update: {},
    create: {
      username: 'adminkoni',
      email: 'admin@koni-surakarta.id',
      passwordHash: defaultPasswordHash,
      fullName: 'Admin KONI Surakarta',
      phoneNumber: '081234567890',
    },
  });

  const bendaharaUser = await prisma.user.upsert({
    where: { email: 'bendahara@koni-surakarta.id' },
    update: {},
    create: {
      username: 'bendahara',
      email: 'bendahara@koni-surakarta.id',
      passwordHash: defaultPasswordHash,
      fullName: 'Bendahara KONI',
      phoneNumber: '081234567891',
    },
  });

  const operatorPasi = await prisma.user.upsert({
    where: { email: 'operator@pasi.demo' },
    update: {},
    create: {
      username: 'operator_pasi',
      email: 'operator@pasi.demo',
      passwordHash: defaultPasswordHash,
      fullName: 'Operator PASI Surakarta',
      phoneNumber: '081234567892',
    },
  });

  if (adminRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
      update: {},
      create: { userId: adminUser.id, roleId: adminRole.id },
    });
  }

  if (bendaharaRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: bendaharaUser.id, roleId: bendaharaRole.id } },
      update: {},
      create: { userId: bendaharaUser.id, roleId: bendaharaRole.id },
    });
  }

  if (operatorRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: operatorPasi.id, roleId: operatorRole.id } },
      update: {},
      create: { userId: operatorPasi.id, roleId: operatorRole.id },
    });
  }

  // 3. Cabor Master Data
  const caborList = [
    { code: 'PASI', name: 'Persatuan Atletik Seluruh Indonesia', sportCategory: 'Terukur', leaderName: 'Dr. Bambang Setiawan', officialEmail: 'pasi@koni-surakarta.id', phoneNumber: '08112233441', athleteCount: 42 },
    { code: 'PBSI', name: 'Persatuan Bulutangkis Seluruh Indonesia', sportCategory: 'Permainan', leaderName: 'H. Suryanto', officialEmail: 'pbsi@koni-surakarta.id', phoneNumber: '08112233442', athleteCount: 36 },
    { code: 'PSSI', name: 'Persatuan Sepakbola Seluruh Indonesia', sportCategory: 'Permainan', leaderName: 'Agus Wibowo, S.E.', officialEmail: 'pssi@koni-surakarta.id', phoneNumber: '08112233443', athleteCount: 58 },
    { code: 'PRSI', name: 'Persatuan Renang Seluruh Indonesia', sportCategory: 'Terukur', leaderName: 'Dra. Endang Purwanti', officialEmail: 'prsi@koni-surakarta.id', phoneNumber: '08112233444', athleteCount: 24 },
    { code: 'PERPANI', name: 'Persatuan Panahan Indonesia', sportCategory: 'Akurasi', leaderName: 'Joko Susilo', officialEmail: 'perpani@koni-surakarta.id', phoneNumber: '08112233445', athleteCount: 18 },
    { code: 'PERSILAT', name: 'Ikatan Pencak Silat Indonesia', sportCategory: 'Bela Diri', leaderName: 'M. Taufik, M.Pd.', officialEmail: 'ipsi@koni-surakarta.id', phoneNumber: '08112233446', athleteCount: 64 },
  ];

  for (const c of caborList) {
    const createdCabor = await prisma.cabor.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });

    if (c.code === 'PASI') {
      await prisma.userCabor.upsert({
        where: { userId_caborId: { userId: operatorPasi.id, caborId: createdCabor.id } },
        update: {},
        create: { userId: operatorPasi.id, caborId: createdCabor.id, isPrimary: true },
      });
    }
  }

  // 4. Fiscal Year 2026
  const fiscalYear2026 = await prisma.fiscalYear.upsert({
    where: { year: 2026 },
    update: {},
    create: {
      year: 2026,
      totalPagu: 2450000000.0,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      isActive: true,
    },
  });

  // 5. Fund Sources
  const fundSources = [
    { code: 'HIB-PEMDA', name: 'Hibah Pemerintah Daerah', description: 'Dana APBD Kota Surakarta' },
    { code: 'BANTUAN-PROV', name: 'Bantuan Pembinaan', description: 'Bantuan dari Pemerintah Provinsi' },
    { code: 'SPONSOR', name: 'Sponsor Kegiatan', description: 'Kerjasama mitra swasta / BUMD' },
    { code: 'LAINNYA', name: 'Penerimaan lainnya', description: 'Pendapatan sah lainnya' },
  ];

  for (const f of fundSources) {
    await prisma.fundSource.upsert({
      where: { code: f.code },
      update: {},
      create: f,
    });
  }

  // 6. Expense Categories
  const expenseCategories = [
    { code: 'VENUE', name: 'Sewa Venue & Lapangan' },
    { code: 'KONSUMSI', name: 'Konsumsi Atlet & Ofisial' },
    { code: 'TRANSPORT', name: 'Transportasi & Akomodasi' },
    { code: 'ALAT', name: 'Perlengkapan & Peralatan Tanding' },
    { code: 'HONOR', name: 'Honorium Wasit & Juri' },
  ];

  for (const ec of expenseCategories) {
    await prisma.expenseCategory.upsert({
      where: { code: ec.code },
      update: {},
      create: ec,
    });
  }

  // 7. Public Dashboard Snapshot
  await prisma.publicDashboardSnapshot.create({
    data: {
      periodLabel: 'Tahun Anggaran 2026',
      publishedDate: new Date('2026-11-05'),
      totalReceivedAmount: 2450000000.0,
      totalAllocatedAmount: 1820000000.0,
      totalVerifiedAmount: 1210000000.0,
      totalRegisteredCabor: 42,
      totalAthletes: 1250,
      totalPrograms: 86,
      disclaimerNote: 'Data ringkasan publikasi resmi yang telah disahkan oleh KONI Surakarta.',
      isApproved: true,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

