import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyle = (s: string) => {
    switch (s) {
      case 'Disetujui':
      case 'APPROVED':
      case 'PAID':
      case 'Aktif':
      case 'Dibayar':
        return 'bg-[#e8f6f0] text-[#23846d]';
      case 'Menunggu':
      case 'SUBMITTED':
      case 'VERIFYING':
      case 'PENDING':
        return 'bg-[#fff8e8] text-[#b77a1d]';
      case 'Verifikasi':
        return 'bg-[#eaf3fb] text-[#2d73b9]';
      case 'Ditolak':
      case 'REJECTED':
      case 'CANCELLED':
        return 'bg-[#fdeeee] text-[#d95b5b]';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${getStyle(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};

