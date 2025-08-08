"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButtons from "@/components/auth/AuthButtons";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/tools", label: "🛠️ Tools" },
    { href: "/trends", label: "📈 Trends" },
    { href: "/guides", label: "📚 Guides" },
    { href: "/blog", label: "✍️ Blog" },
    { href: "/pricing", label: "💎 Pricing" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-token-70 backdrop-blur bg-app-translucent">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-app text-2xl font-bold">
            Hyper<span className="text-gradient">Hash</span>
            <span className="text-sm font-normal ml-1 text-muted">AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-muted hover:text-app transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AuthButtons />
            <button
              className="md:hidden btn btn-outline"
              aria-label="Toggle Menu"
              onClick={() => setOpen(v => !v)}
            >
              ☰
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-3 flex flex-col gap-2">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-muted hover:text-app transition-colors font-medium py-2">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
