import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string | number;
    isPositive?: boolean;
    isNeutral?: boolean;
    label?: string;
  };
  badge?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-brand-50',
  iconColor = 'text-brand-600',
  trend,
  badge,
  className = '',
}) => {
  return (
    <Card variant="default" padding="md" className={`relative overflow-hidden ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h4 className="mt-2 text-2xl font-bold text-slate-900 tracking-tight">{value}</h4>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>

        <div className={`p-3 rounded-2xl ${iconBgColor} ${iconColor} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(trend || badge) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend && (
            <div className="flex items-center gap-1.5 font-medium">
              {trend.isNeutral ? (
                <Minus className="w-3.5 h-3.5 text-slate-400" />
              ) : trend.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
              )}
              <span
                className={
                  trend.isNeutral
                    ? 'text-slate-500'
                    : trend.isPositive
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }
              >
                {trend.value}
              </span>
              {trend.label && <span className="text-slate-400 font-normal">{trend.label}</span>}
            </div>
          )}

          {badge && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[11px]">
              {badge}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
