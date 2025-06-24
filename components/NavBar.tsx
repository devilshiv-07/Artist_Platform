"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/artists", label: "Artists" },
  { href: "/onboard", label: "Onboard" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center py-4 px-2 sm:px-4 lg:px-8 border-b bg-background z-50">
      {/* Logo/Brand */}
      <Link href="/" className="text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
        Artistly.com
      </Link>
      {/* Desktop Nav */}
      <nav className="hidden sm:flex gap-4 items-center">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="font-medium text-base px-3 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
      {/* Mobile Nav */}
      <div className="sm:hidden flex items-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <span className="text-2xl">✖️</span>
          ) : (
            <span className="text-2xl">⋯</span>
          )}
        </Button>
        {open && (
          <Card className="absolute right-2 top-16 z-50 w-48 p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 bg-background border shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">Menu</span>
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-base px-3 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Card>
        )}
      </div>
    </header>
  );
} 