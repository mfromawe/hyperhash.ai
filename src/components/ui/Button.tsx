"use client";

import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "btn";
  const variants: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  return (
    <button
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      disabled={props.disabled || loading}
      {...props}
    >
      {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
      {loading && (
        <span className="mr-2 inline-flex items-center">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
      <span>{children}</span>
      {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </button>
  );
}
