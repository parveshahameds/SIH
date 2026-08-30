import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'gradient';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  variant = 'brand',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantStyles = {
    brand: 'bg-brand-600',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    gradient: 'bg-gradient-to-r from-brand-600 via-indigo-500 to-sky-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5 text-xs font-medium text-slate-700">
          {label && <span>{label}</span>}
          {showValue && <span className="font-semibold text-slate-900">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightStyles[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantStyles[variant]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
