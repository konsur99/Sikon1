/**
 * Utility untuk mengekspor data tabel ke berkas CSV yang kompatibel dengan Microsoft Excel (UTF-8 BOM).
 */
export function exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  // \uFEFF adalah BOM (Byte Order Mark) agar Excel di Windows membaca UTF-8 dengan benar (karakter Rp, spasi, simbol).
  const csvContent =
    '\uFEFF' +
    [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const str = cell === null || cell === undefined ? '' : String(cell);
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(','),
      ),
    ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

