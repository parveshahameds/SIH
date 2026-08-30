import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'interactive';
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

  const variantStyles = {
    default: 'bg-white border border-slate-100 shadow-sm hover:shadow-card transition-shadow duration-200',
    elevated: 'bg-white border border-slate-100/80 shadow-card hover:shadow-card-hover transition-all duration-300',
    bordered: 'bg-white border-2 border-slate-100 shadow-none',
    glass: 'glass-panel shadow-sm',
    interactive: 'bg-white border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
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
