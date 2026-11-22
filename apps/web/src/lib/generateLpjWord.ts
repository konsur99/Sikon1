/**
 * Helper untuk meng-generate dokumen Laporan Pertanggungjawaban (LPJ) resmi
 * langsung menjadi file Microsoft Word (.doc / .docx compatible)
 * dengan format standar A4, kop surat KONI, tabel anggaran terstruktur,
 * dan lembar pengesahan tanda tangan empat pihak.
 */

export interface LpjBudgetItem {
  id: number;
  item: string;
  proofNumber: string;
  volume: number;
  unit: string;
  unitPrice: number;
}

export interface LpjDocumentData {
  number: string;
  activity: string;
  cabor: string;
  caborCode: string;
  skNumber: string;
  budgetGrant: number;
  period: string;
  location: string;
  targetParticipants: string;
  achievements: string;
  background: string;
  closingNotes: string;
  leaderName: string;
  secretaryName: string;
  treasurerName: string;
  koniLeaderName: string;
  cityDate: string;
  items: LpjBudgetItem[];
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateLpjWordDocument(data: LpjDocumentData): void {
  const totalRealization = data.items.reduce((sum, it) => sum + it.volume * it.unitPrice, 0);
  const remainingBudget = data.budgetGrant - totalRealization;

  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Laporan Pertanggungjawaban (LPJ) - ${data.activity}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 21.0cm 29.7cm; /* A4 Paper */
      margin: 2.5cm 2.0cm 2.5cm 2.5cm; /* Top, Right, Bottom, Left */
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.35;
      color: #000000;
    }
    .kop-wrapper {
      text-align: center;
      border-bottom: 3px double #000000;
      padding-bottom: 8pt;
      margin-bottom: 16pt;
    }
    .kop-lembaga {
      font-size: 12pt;
      font-weight: bold;
      letter-spacing: 0.5pt;
      text-transform: uppercase;
      margin: 0;
    }
    .kop-cabor {
      font-size: 14pt;
      font-weight: bold;
      letter-spacing: 1pt;
      text-transform: uppercase;
      color: #142a43;
      margin: 2pt 0;
    }
    .kop-koni {
      font-size: 11pt;
      font-weight: bold;
      margin: 1pt 0;
    }
    .kop-alamat {
      font-size: 9pt;
      font-style: italic;
      margin: 2pt 0 0 0;
      color: #333333;
    }
    .doc-title {
      text-align: center;
      margin: 14pt 0 4pt 0;
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      text-decoration: underline;
    }
    .doc-number {
      text-align: center;
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 18pt;
    }
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 14pt;
      margin-bottom: 4pt;
    }
    p {
      margin: 4pt 0;
      text-align: justify;
      text-indent: 28pt;
    }
    .p-no-indent {
      text-indent: 0pt;
      margin: 3pt 0;
    }
    table.meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6pt 0 10pt 0;
      font-size: 11.5pt;
    }
    table.meta-table td {
      padding: 3pt 2pt;
      vertical-align: top;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8pt;
      margin-bottom: 12pt;
      font-size: 10pt;
    }
    table.data-table th {
      border: 1pt solid #000000;
      background-color: #eef2f7;
      padding: 6pt 4pt;
      text-align: center;
      font-weight: bold;
    }
    table.data-table td {
      border: 1pt solid #000000;
      padding: 5pt 5pt;
      vertical-align: top;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-bold { font-weight: bold; }
    table.recap-box {
      width: 100%;
      border-collapse: collapse;
      margin: 8pt 0 14pt 0;
      font-size: 11pt;
    }
    table.recap-box td {
      border: 1pt solid #000000;
      padding: 5pt 8pt;
    }
    table.sig-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 24pt;
      page-break-inside: avoid;
    }
    table.sig-table td {
      text-align: center;
      vertical-align: top;
      padding: 4pt;
      font-size: 11pt;
    }
    .sig-space {
      height: 55pt;
    }
    .sig-name {
      font-weight: bold;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- KOP SURAT RESMI -->
    <div class="kop-wrapper">
      <div class="kop-lembaga">KOMITE OLAHRAGA NASIONAL INDONESIA (KONI) KOTA SURAKARTA</div>
      <div class="kop-cabor">PENGURUS KOTA ${data.cabor.toUpperCase()} (${data.caborCode.toUpperCase()})</div>
      <div class="kop-koni">BADAN ANGGOTA PEMBINAAN PRESTASI OLAHRAGA KOTA SURAKARTA</div>
      <div class="kop-alamat">Sekretariat: Kompleks Stadion Manahan, Jl. Adi Sucipto No. 1 Surakarta | Email: ${data.caborCode.toLowerCase()}@koni-surakarta.id | Telp: (0271) 714930</div>
    </div>

    <!-- JUDUL DOKUMEN -->
    <div class="doc-title">LAPORAN PERTANGGUNGJAWABAN (LPJ) PELAKSANAAN KEGIATAN</div>
    <div class="doc-number">Nomor Berkas: ${data.number}</div>

    <!-- BAB I: PENDAHULUAN -->
    <div class="section-title">BAB I. PENDAHULUAN</div>
    <p>
      ${data.background || 'Puji dan syukur kami panjatkan ke hadirat Tuhan Yang Maha Esa atas terlaksananya rangkaian kegiatan olahraga prestasi binaan KONI Kota Surakarta. Laporan Pertanggungjawaban ini disusun secara transparan, akuntabel, dan berbasis data riil sebagai wujud kepatuhan terhadap tertib administrasi penggunaan dana hibah keolahragaan APBD Pemerintah Kota Surakarta tahun anggaran 2026.'}
    </p>

    <table class="meta-table">
      <tr>
        <td style="width: 28%;">1. Nama Kegiatan</td>
        <td style="width: 2%;">:</td>
        <td style="width: 70%;" class="font-bold">${data.activity}</td>
      </tr>
      <tr>
        <td>2. Cabang Olahraga / Unit</td>
        <td>:</td>
        <td class="font-bold">${data.cabor} (${data.caborCode})</td>
      </tr>
      <tr>
        <td>3. Dasar Pelaksanaan (SK)</td>
        <td>:</td>
        <td>${data.skNumber || 'SK Penetapan Pengkot Cabor & Rekomendasi Teknis KONI Kota Surakarta'}</td>
      </tr>
      <tr>
        <td>4. Waktu / Periode Pelaksanaan</td>
        <td>:</td>
        <td>${data.period}</td>
      </tr>
      <tr>
        <td>5. Tempat / Lokasi Kegiatan</td>
        <td>:</td>
        <td>${data.location}</td>
      </tr>
      <tr>
        <td>6. Partisipan Atlet & Ofisial</td>
        <td>:</td>
        <td>${data.targetParticipants}</td>
      </tr>
      <tr>
        <td>7. Total Dana Hibah Diterima</td>
        <td>:</td>
        <td class="font-bold">${formatRupiah(data.budgetGrant)}</td>
      </tr>
    </table>

    <!-- BAB II: HASIL PELAKSANAAN & CAPAIAN PRESTASI -->
    <div class="section-title">BAB II. HASIL PELAKSANAAN & CAPAIAN PRESTASI</div>
    <p>
      Kegiatan <b>${data.activity}</b> telah selesai dilaksanakan dengan lancar, tertib, dan menjunjung tinggi nilai sportivitas serta standar pembinaan atlet Kota Surakarta. Adapun hasil capaian prestasi dan evaluasi pelaksanaan adalah sebagai berikut:
    </p>
    <div style="margin-left: 28pt; margin-top: 4pt; margin-bottom: 8pt; font-size: 11pt;">
      <b>Capaian Prestasi / Target:</b><br/>
      ${data.achievements || 'Seluruh atlet binaan berhasil menyelesaikan seluruh rangkaian kejuaraan/pemusatan latihan dengan performa optimal sesuai target Bidang Pembinaan Prestasi KONI Surakarta.'}
    </div>

    <!-- BAB III: REALISASI PENGGUNAAN ANGGARAN -->
    <div class="section-title">BAB III. REALISASI KEUANGAN & BUKTI BELANJA</div>
    <p class="p-no-indent">
      Berikut adalah rincian seluruh realisasi belanja operasional kegiatan yang telah didukung bukti transaksi fisik sah (kuitansi, nota, faktur, dan bukti transfer perbankan):
    </p>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 5%;">No</th>
          <th style="width: 33%;">Uraian Pengeluaran / Belanja</th>
          <th style="width: 17%;">No. Kuitansi / Bukti</th>
          <th style="width: 8%;">Vol</th>
          <th style="width: 9%;">Satuan</th>
          <th style="width: 13%;">Harga Satuan</th>
          <th style="width: 15%;">Jumlah Realisasi</th>
        </tr>
      </thead>
      <tbody>
        ${data.items
          .map(
            (it, idx) => `
        <tr>
          <td class="text-center">${idx + 1}</td>
          <td>${it.item}</td>
          <td class="text-center font-bold" style="font-size: 9pt;">${it.proofNumber || '-'}</td>
          <td class="text-center">${it.volume}</td>
          <td class="text-center">${it.unit}</td>
          <td class="text-right">${formatRupiah(it.unitPrice)}</td>
          <td class="text-right font-bold">${formatRupiah(it.volume * it.unitPrice)}</td>
        </tr>`,
          )
          .join('')}
        <tr style="background-color: #f7f9fb; font-weight: bold;">
          <td colspan="6" class="text-right">TOTAL PENGELUARAN REALISASI (A) :</td>
          <td class="text-right">${formatRupiah(totalRealization)}</td>
        </tr>
      </tbody>
    </table>

    <!-- REKAPITULASI KEUANGAN -->
    <table class="recap-box">
      <tr style="background-color: #eef2f7; font-weight: bold;">
        <td colspan="2">REKAPITULASI SALDO DANA HIBAH KEGIATAN</td>
      </tr>
      <tr>
        <td style="width: 70%;">1. Total Penerimaan Dana Hibah Kasda (B)</td>
        <td style="width: 30%;" class="text-right font-bold">${formatRupiah(data.budgetGrant)}</td>
      </tr>
      <tr>
        <td>2. Total Realisasi Belanja Sah Terverifikasi (A)</td>
        <td class="text-right font-bold">${formatRupiah(totalRealization)}</td>
      </tr>
      <tr style="background-color: ${remainingBudget >= 0 ? '#fafafa' : '#fff5f5'};">
        <td><b>3. Sisa Saldo Dana ${remainingBudget >= 0 ? '(Disetor ke Kas KONI)' : '(Defisit Mandiri)'}</b></td>
        <td class="text-right font-bold" style="color: ${remainingBudget >= 0 ? '#168b8b' : '#c53030'};">
          ${formatRupiah(Math.abs(remainingBudget))} ${remainingBudget === 0 ? '(Nihil / Pas)' : ''}
        </td>
      </tr>
    </table>

    <!-- BAB IV: PENUTUP -->
    <div class="section-title">BAB IV. PENUTUP</div>
    <p>
      ${data.closingNotes || 'Demikian Laporan Pertanggungjawaban (LPJ) ini kami susun dengan sebenarnya dan penuh rasa tanggung jawab. Seluruh bukti pendukung berupa kuitansi, nota, presensi, serta dokumentasi foto lapangan terlampir lengkap sebagai satu kesatuan tak terpisahkan dari laporan ini.'}
    </p>

    <!-- LEMBAR PENGESAHAN TANDA TANGAN -->
    <table class="sig-table">
      <tr>
        <td colspan="3" style="text-align: right; padding-bottom: 12pt;">
          ${data.cityDate || 'Surakarta, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </td>
      </tr>
      <tr>
        <td style="width: 33%;">
          Mengetahui / Mengajukan,<br/>
          <b>Ketua Pengkot Cabor</b>
          <div class="sig-space"></div>
          <div class="sig-name">${data.leaderName || '...........................................'}</div>
          <div>Ketua Pengkot ${data.caborCode}</div>
        </td>
        <td style="width: 33%;">
          Menyetujui,<br/>
          <b>Sekretaris Pengkot</b>
          <div class="sig-space"></div>
          <div class="sig-name">${data.secretaryName || '...........................................'}</div>
          <div>Sekretaris Pengkot ${data.caborCode}</div>
        </td>
        <td style="width: 34%;">
          Memeriksa & Membukukan,<br/>
          <b>Bendahara Pengkot</b>
          <div class="sig-space"></div>
          <div class="sig-name">${data.treasurerName || '...........................................'}</div>
          <div>Bendahara Pengkot ${data.caborCode}</div>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="padding-top: 24pt;">
          Mengesahkan & Menelaah,<br/>
          <b>KETUA UMUM KONI KOTA SURAKARTA</b>
          <div class="sig-space"></div>
          <div class="sig-name">${data.koniLeaderName || 'Drs. H. Sri Nugroho, M.Si.'}</div>
          <div>Ketua Umum KONI Surakarta</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
`;

  // Download trigger as .doc (Microsoft Word binary HTML format with BOM)
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });

  const sanitizedFileName = `LPJ_${data.caborCode.replace(/\s+/g, '_')}_${data.activity.replace(/[^a-zA-Z0-9]/g, '_')}_2026.doc`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = sanitizedFileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

