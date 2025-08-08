"use client";

import React from "react";

type CommonProps = {
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & CommonProps>(
  ({ label, helperText, error, className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={["w-full", containerClassName].filter(Boolean).join(" ")}> 
        {label && (
          <label className="block mb-2 text-sm font-medium text-app">{label}</label>
        )}
        <input
          ref={ref}
          className={[
            "w-full h-11 rounded-[var(--radius-md)]",
            "border border-token bg-[color:var(--color-surface)]",
            "text-app placeholder:text-muted",
            "px-3 focus:outline-none focus:ring-2 focus:ring-brand-40",
            "transition",
            error ? "border-[color:var(--color-danger)]" : "",
            className
          ].join(" ")}
          {...props}
        />
        {(helperText || error) && (
          <p className={`mt-2 text-sm ${error ? "text-[color:var(--color-danger)]" : "text-muted"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & CommonProps>(
  ({ label, helperText, error, className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={["w-full", containerClassName].filter(Boolean).join(" ")}> 
        {label && (
          <label className="block mb-2 text-sm font-medium text-app">{label}</label>
        )}
        <textarea
          ref={ref}
          className={[
            "w-full min-h-[120px] rounded-[var(--radius-md)]",
            "border border-token bg-[color:var(--color-surface)]",
            "text-app placeholder:text-muted",
            "px-3 py-3 focus:outline-none focus:ring-2 focus:ring-brand-40",
            "transition",
            error ? "border-[color:var(--color-danger)]" : "",
            className
          ].join(" ")}
          {...props}
        />
        {(helperText || error) && (
          <p className={`mt-2 text-sm ${error ? "text-[color:var(--color-danger)]" : "text-muted"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & CommonProps>(
  ({ label, helperText, error, className = "", containerClassName = "", children, ...props }, ref) => {
    return (
      <div className={["w-full", containerClassName].filter(Boolean).join(" ")}> 
        {label && (
          <label className="block mb-2 text-sm font-medium text-app">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={[
              "w-full h-11 appearance-none rounded-[var(--radius-md)]",
              "border border-token bg-[color:var(--color-surface)]",
              "text-app px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-40",
              "transition",
              error ? "border-[color:var(--color-danger)]" : "",
              className
            ].join(" ")}
            {...props}
          >
            {children}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.08 1.04l-4.24 4.24a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
        {(helperText || error) && (
          <p className={`mt-2 text-sm ${error ? "text-[color:var(--color-danger)]" : "text-muted"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
