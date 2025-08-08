"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
};

type ToastContextType = {
  add: (t: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const add = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {items.map((i) => (
          <div
            key={i.id}
            role="status"
            aria-live="polite"
            className={[
              "card p-4 min-w-[240px] text-app",
              i.variant === "success" ? "border-[rgba(34,197,94,0.4)]" : "",
              i.variant === "error" ? "border-[rgba(239,68,68,0.4)]" : "",
            ].join(" ")}
          >
            {i.title && <div className="font-semibold mb-1">{i.title}</div>}
            {i.description && <div className="text-muted text-sm">{i.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
