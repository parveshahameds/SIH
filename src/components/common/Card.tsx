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

  const isLight = className.includes('bg-white') || className.includes('border-brand') || className.includes('border-indigo');

  const variantStyles = {
    default: hasCustomBg
      ? 'border border-slate-200'
      : 'bg-white border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow duration-200 text-slate-900',
    elevated: hasCustomBg
      ? 'border border-slate-200 shadow-md'
      : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 text-slate-900',
    bordered: hasCustomBg
      ? 'border-2 border-slate-300'
      : 'bg-white border-2 border-slate-200 shadow-none text-slate-900',
    glass: 'glass-panel shadow-sm border border-slate-200 text-slate-900',
    interactive: hasCustomBg
      ? 'border border-slate-200 hover:border-indigo-400 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-xs'
      : 'bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-400 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-slate-900',
    cyber: 'cyber-glass border border-slate-200 shadow-sm hover:border-indigo-400 transition-all duration-200 text-slate-900',
    dark: 'bg-white border border-slate-200 shadow-sm text-slate-900',
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
