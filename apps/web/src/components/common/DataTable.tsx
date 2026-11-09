'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface Column<T> {
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  isStatus?: boolean;
}

interface DataTableProps<T> {
  title?: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  showFilterbar?: boolean;
  actionButton?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  title,
  subtitle,
  columns,
  data,
  showFilterbar = true,
  actionButton,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua status');

  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const matchesStatus =
      statusFilter === 'Semua status' ||
      row.status === statusFilter ||
      row.Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="card-sikoni">
      {(title || subtitle || actionButton) && (
        <div className="flex justify-between items-start mb-4">
          <div>
            {title && <h3 className="text-sm font-extrabold text-sikoni-navy">{title}</h3>}
            {subtitle && <p className="text-[11px] text-sikoni-muted mt-0.5">{subtitle}</p>}
          </div>
          {actionButton}
        </div>
      )}

      {showFilterbar && (
        <div className="flex flex-wrap items-center gap-3 mb-4 bg-slate-50/70 p-2.5 rounded-xl border border-sikoni-line">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-sikoni-muted" size={14} />
            <input
              type="text"
              placeholder="Cari nomor / kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-sikoni-line rounded-lg pl-8 pr-3 py-1.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={13} className="text-sikoni-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-sikoni-line rounded-lg px-2.5 py-1.5 text-xs text-sikoni-ink focus:outline-none"
            >
              <option>Semua status</option>
              <option>Menunggu</option>
              <option>Verifikasi</option>
              <option>Disetujui</option>
              <option>Ditolak</option>
            </select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-sikoni-line">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f7f9fb] border-b border-sikoni-line text-sikoni-muted font-bold text-[11px]">
              {columns.map((col, idx) => (
                <th key={idx} className="py-3 px-4 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sikoni-line bg-white">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-sikoni-muted">
                  Tidak ada data yang sesuai.
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col, colIdx) => {
                    let cellContent: React.ReactNode = null;
                    if (typeof col.accessor === 'function') {
                      cellContent = col.accessor(row);
                    } else if (col.accessor) {
                      cellContent = row[col.accessor];
                    }

                    if (col.isStatus && typeof cellContent === 'string') {
                      cellContent = <StatusBadge status={cellContent} />;
                    }

                    return (
                      <td key={colIdx} className="py-3.5 px-4 text-sikoni-ink font-medium">
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

