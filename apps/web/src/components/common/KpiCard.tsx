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
      bar: 'bg-gradient-to-r from-sikoni-teal to-teal-400',
      glow: 'from-teal-500/15 via-transparent to-transparent',
      iconBg: 'bg-gradient-to-br from-emerald-50 to-teal-100/70 text-sikoni-teal border-teal-200/90 shadow-xs',
      badgeBg: 'bg-emerald-50/90 text-sikoni-teal border border-emerald-200',
    },
    navy: {
      bar: 'bg-gradient-to-r from-sikoni-navy to-slate-600',
      glow: 'from-slate-700/15 via-transparent to-transparent',
      iconBg: 'bg-gradient-to-br from-slate-100 to-slate-200/80 text-sikoni-navy border-slate-300/90 shadow-xs',
      badgeBg: 'bg-slate-100/90 text-sikoni-navy border border-slate-200',
    },
    gold: {
      bar: 'bg-gradient-to-r from-sikoni-gold to-amber-300',
      glow: 'from-amber-500/15 via-transparent to-transparent',
      iconBg: 'bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-700 border-amber-200/90 shadow-xs',
      badgeBg: 'bg-amber-50/90 text-amber-800 border border-amber-200',
    },
    green: {
      bar: 'bg-gradient-to-r from-sikoni-green to-emerald-400',
      glow: 'from-emerald-600/15 via-transparent to-transparent',
      iconBg: 'bg-gradient-to-br from-green-50 to-emerald-100/70 text-sikoni-green border-green-200/90 shadow-xs',
      badgeBg: 'bg-green-50/90 text-sikoni-green border border-green-200',
    },
    amber: {
      bar: 'bg-gradient-to-r from-amber-500 to-orange-400',
      glow: 'from-orange-500/15 via-transparent to-transparent',
      iconBg: 'bg-gradient-to-br from-orange-50 to-amber-100/70 text-amber-700 border-orange-200/90 shadow-xs',
      badgeBg: 'bg-orange-50/90 text-amber-800 border border-orange-200',
    },
  }[accentColor] || {
    bar: 'bg-gradient-to-r from-sikoni-teal to-teal-400',
    glow: 'from-teal-500/15 via-transparent to-transparent',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-teal-100/70 text-sikoni-teal border-teal-200/90 shadow-xs',
    badgeBg: 'bg-emerald-50/90 text-sikoni-teal border border-emerald-200',
  };

  return (
    <div className="card-sikoni group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
      {/* Top micro accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3.5px] ${accentStyles.bar}`} />

      {/* Decorative corner glow */}
      <div
        className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${accentStyles.glow} pointer-events-none group-hover:scale-125 transition-transform duration-500`}
      />

      <div className="flex justify-between items-start gap-2 pt-1 relative z-10">
        <div>
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-sikoni-muted">{label}</div>
          <div className="kpi-value mt-1.5 text-sikoni-navy font-black tracking-tight">{value}</div>
        </div>
        {icon && (
          <div
            className={`w-11 h-11 rounded-2xl grid place-items-center font-bold text-sm border shadow-xs transition-transform duration-300 group-hover:scale-110 ${accentStyles.iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-sikoni-muted relative z-10">
        <span className="font-medium text-slate-500">{foot}</span>
        {badge ? (
          <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full ${accentStyles.badgeBg}`}>
            {badge}
          </span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        )}
      </div>
    </div>
  );
};
