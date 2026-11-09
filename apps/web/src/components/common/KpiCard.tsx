import React from 'react';

interface KpiCardProps {
  label: string;
  value: string;
  foot: string;
  icon?: React.ReactNode;
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, foot, icon }) => {
  return (
    <div className="card-sikoni flex justify-between items-start">
      <div>
        <div className="text-[11px] font-semibold text-sikoni-muted">{label}</div>
        <div className="kpi-value mt-2">{value}</div>
        <div className="text-[10px] text-sikoni-muted mt-1.5">{foot}</div>
      </div>
      {icon && (
        <div className="w-[38px] h-[38px] rounded-xl bg-sikoni-teal2 text-sikoni-teal grid place-items-center font-bold text-sm">
          {icon}
        </div>
      )}
    </div>
  );
};

