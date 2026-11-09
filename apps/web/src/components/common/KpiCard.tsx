import React from 'react';

interface KpiCardProps {
  label: string;
  value: string;
  foot: string;
  icon?: React.ReactNode;
  accentColor?: 'teal' | 'navy' | 'gold' | 'green' | 'amber';
  badge?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  foot,
  icon,
  accentColor = 'teal',
  badge,
}) => {
  const accentStyles = {
    teal: {
      bar: 'bg-sikoni-teal',
      iconBg: 'bg-emerald-50 text-sikoni-teal border-emerald-100',
      badgeBg: 'bg-emerald-50 text-sikoni-teal',
    },
    navy: {
      bar: 'bg-sikoni-navy',
      iconBg: 'bg-slate-100 text-sikoni-navy border-slate-200',
      badgeBg: 'bg-slate-100 text-sikoni-navy',
    },
    gold: {
      bar: 'bg-sikoni-gold',
      iconBg: 'bg-amber-50 text-sikoni-gold border-amber-100',
      badgeBg: 'bg-amber-50 text-sikoni-gold',
    },
    green: {
      bar: 'bg-sikoni-green',
      iconBg: 'bg-green-50 text-sikoni-green border-green-100',
      badgeBg: 'bg-green-50 text-sikoni-green',
    },
    amber: {
      bar: 'bg-amber-500',
      iconBg: 'bg-orange-50 text-amber-600 border-orange-100',
      badgeBg: 'bg-orange-50 text-amber-600',
    },
  }[accentColor] || {
    bar: 'bg-sikoni-teal',
    iconBg: 'bg-emerald-50 text-sikoni-teal border-emerald-100',
    badgeBg: 'bg-emerald-50 text-sikoni-teal',
  };

  return (
    <div className="card-sikoni group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
      {/* Top micro accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3.5px] ${accentStyles.bar}`} />

      <div className="flex justify-between items-start gap-2 pt-1">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-sikoni-muted">{label}</div>
          <div className="kpi-value mt-2 text-sikoni-navy font-black tracking-tight">{value}</div>
        </div>
        {icon && (
          <div
            className={`w-11 h-11 rounded-2xl grid place-items-center font-bold text-sm border shadow-sm transition-transform group-hover:scale-110 ${accentStyles.iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-sikoni-muted">
        <span className="font-medium text-slate-500">{foot}</span>
        {badge ? (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${accentStyles.badgeBg}`}>
            {badge}
          </span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        )}
      </div>
    </div>
  );
};
