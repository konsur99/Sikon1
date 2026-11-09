'use client';

import React, { useState } from 'react';
import { Search, Filter, Layers } from 'lucide-react';
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
    <div className="card-sikoni relative overflow-hidden">
      {/* Top subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sikoni-navy via-sikoni-teal to-sikoni-gold" />

      {(title || subtitle || actionButton) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            {title && (
              <h3 className="text-base font-extrabold text-sikoni-navy tracking-tight flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-xs text-sikoni-muted mt-0.5">{subtitle}</p>}
          </div>
          {actionButton}
        </div>
      )}

      {showFilterbar && (
        <div className="flex flex-wrap items-center gap-3 mb-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 text-sikoni-muted" size={15} />
            <input
              type="text"
              placeholder="Cari nomor, cabor, atau kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2.5 py-1">
            <Filter size={13} className="text-sikoni-muted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-sikoni-ink font-medium focus:outline-none cursor-pointer"
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

      <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 via-[#f5f8fb] to-slate-50 border-b border-slate-200 text-sikoni-navy font-black text-[10.5px] uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className="py-3.5 px-4">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-sikoni-muted">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Layers size={22} className="text-slate-300" />
                    <span>Tidak ada data yang sesuai filter.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`transition-colors duration-150 group ${
                    rowIdx % 2 === 1 ? 'bg-[#fcfdfe]' : 'bg-white'
                  } hover:bg-emerald-50/40`}
                >
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

      <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 font-medium">
        <span>Menampilkan {filteredData.length} dari {data.length} data</span>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
          SIKONI Database
        </span>
      </div>
    </div>
  );
}
