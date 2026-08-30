import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    icon: 'p-2.5 text-sm',
  };

  const variantStyles = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow-md hover:shadow-brand-500/20 focus:ring-brand-500',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm hover:border-slate-300 focus:ring-brand-500',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus:ring-slate-300',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow-rose-500/20 focus:ring-rose-500',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-emerald-500/20 focus:ring-emerald-500',
    glow: 'bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 hover:-translate-y-0.5 focus:ring-brand-500'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};
