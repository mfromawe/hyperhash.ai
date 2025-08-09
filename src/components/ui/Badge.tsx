"use client";

import React from 'react';
import clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'outline' | 'success' | 'warning';
  leadingIcon?: React.ReactNode;
}

export function Badge({ variant = 'default', className, leadingIcon, children, ...rest }: BadgeProps) {
  const base = 'badge';
  const map: Record<string,string> = {
    default: '',
    primary: 'badge-primary',
    outline: 'badge-outline',
    success: 'badge-success',
    warning: 'badge-warning'
  };
  return (
    <span className={clsx(base, map[variant], className)} {...rest}>
      {leadingIcon && <span className="inline-flex items-center" aria-hidden>{leadingIcon}</span>}
      {children}
    </span>
  );
}

export default Badge;
