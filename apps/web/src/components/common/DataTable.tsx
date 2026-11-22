'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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
  defaultPageSize?: number;
}

export function DataTable<T extends Record<string, any>>({
  title,
  subtitle,
  columns,
  data,
  showFilterbar = true,
  actionButton,
  defaultPageSize = 10,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      );
      const matchesStatus =
        statusFilter === 'Semua status' ||
        row.status === statusFilter ||
        row.Status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-4 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="relative flex-1 min-w-0 sm:min-w-[220px]">
            <Search className="absolute left-3 top-2.5 text-sikoni-muted" size={15} />
            <input
              type="text"
              placeholder="Cari data, nomor, cabor, atau kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-sikoni-ink focus:outline-none focus:border-sikoni-teal focus:ring-2 focus:ring-sikoni-teal/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-white border border-slate-200 rounded-lg px-2.5 py-1 flex-1 sm:flex-initial">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Filter size={13} className="text-sikoni-muted" />
                <span className="sm:hidden text-[11px] font-bold">Filter:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none text-xs text-sikoni-ink font-medium focus:outline-none cursor-pointer flex-1 sm:flex-initial"
              >
                <option>Semua status</option>
                <option>Menunggu</option>
                <option>Verifikasi</option>
                <option>Disetujui</option>
                <option>Dibayar</option>
                <option>Ditolak</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-1">
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Per hal:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-transparent border-none text-xs text-sikoni-navy font-bold focus:outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Card View (screens < md) - Elegant responsive view to eliminate horizontal scrolling pain */}
      <div className="block md:hidden space-y-3">
        {currentData.length === 0 ? (
          <div className="text-center py-8 text-sikoni-muted bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Layers size={22} className="text-slate-300" />
              <span className="text-xs">Tidak ada data yang sesuai filter.</span>
            </div>
          </div>
        ) : (
          currentData.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2 hover:border-sikoni-teal/40 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400">#{startIndex + rowIdx + 1}</span>
                {columns.find((c) => c.isStatus) && (
                  <StatusBadge
                    status={
                      row.status ||
                      row.Status ||
                      (columns.find((c) => c.isStatus)?.accessor &&
                        typeof columns.find((c) => c.isStatus)?.accessor === 'string'
                        ? row[columns.find((c) => c.isStatus)!.accessor as string]
                        : 'Info')
                    }
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {columns
                  .filter((col) => !col.isStatus)
                  .map((col, colIdx) => {
                    let cellContent: React.ReactNode = null;
                    if (typeof col.accessor === 'function') {
                      cellContent = col.accessor(row);
                    } else if (col.accessor) {
                      cellContent = row[col.accessor];
                    }
                    return (
                      <div key={colIdx} className={colIdx === 0 ? 'col-span-2' : ''}>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {col.header}
                        </div>
                        <div className="text-sikoni-navy font-semibold text-xs mt-0.5 break-words">
                          {cellContent || '-'}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop / Tablet Table View (screens >= md) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/90 shadow-sm">
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
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-sikoni-muted">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Layers size={22} className="text-slate-300" />
                    <span>Tidak ada data yang sesuai filter.</span>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIdx) => (
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

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 mt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
        <div>
          Menampilkan <span className="font-bold text-sikoni-navy">{filteredData.length === 0 ? 0 : startIndex + 1}</span>-
          <span className="font-bold text-sikoni-navy">{endIndex}</span> dari{' '}
          <span className="font-bold text-sikoni-navy">{filteredData.length}</span> data
          {filteredData.length !== data.length && ` (disaring dari ${data.length} total)`}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Halaman Pertama"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex items-center gap-1 px-2">
            <span className="font-bold text-sikoni-navy">{currentPage}</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600">{totalPages}</span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || filteredData.length === 0}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Halaman Berikutnya"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || filteredData.length === 0}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Halaman Terakhir"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
