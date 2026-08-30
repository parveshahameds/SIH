import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'interactive' | 'cyber' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'lg' | 'xl' | '2xl' | '3xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  rounded = '2xl',
  className = '',
  ...props
}) => {
  const roundedStyles = {
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  const hasCustomBg =
    className.includes('bg-') ||
    className.includes('cyber-glass') ||
    className.includes('institutional-card');

  const variantStyles = {
    default: hasCustomBg ? 'border border-slate-800' : 'bg-white border border-slate-100 shadow-sm hover:shadow-card transition-shadow duration-200',
    elevated: hasCustomBg ? 'border border-slate-800 shadow-xl' : 'bg-white border border-slate-100/80 shadow-card hover:shadow-card-hover transition-all duration-300',
    bordered: hasCustomBg ? 'border-2 border-slate-800' : 'bg-white border-2 border-slate-100 shadow-none',
    glass: 'glass-panel shadow-sm border border-slate-200/60',
    interactive: hasCustomBg ? 'border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : 'bg-white border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
    cyber: 'cyber-glass border border-slate-800/80 shadow-xl hover:border-cyan-500/40 transition-all duration-200',
    dark: 'bg-slate-900 border border-slate-800 shadow-md text-slate-100',
  };

  return (
    <div
      className={`${roundedStyles[rounded]} ${paddingStyles[padding]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
