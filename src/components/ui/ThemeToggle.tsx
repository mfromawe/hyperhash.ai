"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const attr = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
      const stored = (localStorage.getItem("theme") as "light" | "dark" | null) || attr;
      const initial: "light" | "dark" = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch {}
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch {}
    document.documentElement.setAttribute("data-theme", next);
  };

  // Avoid showing incorrect UI before hydration
  if (!mounted) {
    return (
      <button type="button" className="btn btn-outline h-9 w-9 rounded-full" aria-hidden>
        <span className="opacity-0">•</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title={theme === "light" ? "Switch to dark" : "Switch to light"}
      className="btn btn-outline h-9 w-9 rounded-full p-0 text-sm"
    >
      <span role="img" aria-hidden>
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
