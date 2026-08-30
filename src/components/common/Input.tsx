import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon: Icon,
      iconPosition = 'left',
      rightElement,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-sm">
          {Icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
              Icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${Icon && iconPosition === 'right' ? 'pr-10' : ''} ${
              rightElement ? 'pr-12' : ''
            } ${
              error
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-400'
                : 'border-slate-200 hover:border-slate-300'
            } ${className}`}
            {...props}
          />
          {Icon && iconPosition === 'right' && !rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <Icon className="h-4 w-4" />
            </div>
          )}
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
