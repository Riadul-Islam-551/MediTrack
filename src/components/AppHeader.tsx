"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import navLogo from "../../public/assets/nav-logo.png";

const PORTALS = [
  {
    href: "/patient",
    label: "Patient Portal",
    shortLabel: "Patient",
    colorTheme: {
      active:
        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10",
      hover: "hover:text-emerald-300 hover:bg-emerald-500/5",
      accent: "bg-emerald-400",
    },
    icon: (className: string) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    href: "/doctor",
    label: "Doctor Portal",
    shortLabel: "Doctor",
    colorTheme: {
      active: "text-sky-400 bg-sky-500/10 border-sky-500/20 shadow-sky-500/10",
      hover: "hover:text-sky-300 hover:bg-sky-500/5",
      accent: "bg-sky-400",
    },
    icon: (className: string) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    href: "/admin",
    label: "Admin Portal",
    shortLabel: "Admin",
    colorTheme: {
      active:
        "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/10",
      hover: "hover:text-rose-300 hover:bg-rose-500/5",
      accent: "bg-rose-400",
    },
    icon: (className: string) => (
      <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
] as const;

function isPortalActive(pathName: string, href: string) {
  return pathName === href || pathName.startsWith(`${href}/`);
}

export default function AppHeader() {
  const pathName = usePathname();
  console.log(pathName)
  const [menuOpen, setMenuOpen] = useState(false);

  const activePortal = PORTALS.find((portal) =>
    isPortalActive(pathName, portal.href),
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          {/* Logo & Dynamic Tag */}
          <Link
            href="/patient"
            className="flex items-center gap-3 shrink-0 group focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl transition-transform duration-300 group-hover:scale-110 w-10 ">
                <Image
                  src={navLogo}
                  alt="Medi Track log"
                  width={200}
                  height={200}
                  className="w-full"
                ></Image>
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-white transition">
                MediTrack
              </span>
            </div>

            {/* Smooth Dynamic Badge */}
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider border transition-all duration-300 ${
                activePortal
                  ? `${activePortal.colorTheme.active}`
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {activePortal && (
                <span
                  className={`size-1.5 rounded-full ${activePortal.colorTheme.accent} animate-pulse`}
                />
              )}
              {activePortal ? activePortal.shortLabel : "AI Portal"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {PORTALS.map((portal) => {
              const active = isPortalActive(pathName, portal.href);

              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    active
                      ? activePortal?.colorTheme.active
                      : `text-slate-400 ${portal.colorTheme.hover}`
                  }`}
                >
                  {/* Sliding Background Track pill */}
                  {active && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={`absolute inset-0 rounded-lg border -z-10 ${portal.colorTheme.active} shadow-sm`}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {portal.icon(
                    `size-4 transition-transform duration-200 group-hover:scale-105 ${active ? "" : "opacity-70"}`,
                  )}
                  <span>{portal.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 p-2.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg
              className="size-5 transition-transform duration-200"
              style={{ transform: menuOpen ? "rotate(90deg)" : "none" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu Expand */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-lg px-4 py-3 flex flex-col gap-1.5 shadow-xl"
          >
            {PORTALS.map((portal) => {
              const active = isPortalActive(pathName, portal.href);

              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-base font-medium transition-all duration-200 ${
                    active
                      ? `${portal.colorTheme.active}`
                      : `bg-transparent border-transparent text-slate-400 ${portal.colorTheme.hover}`
                  }`}
                >
                  {portal.icon("size-5")}
                  <span className="flex-1">{portal.label}</span>
                  {active && (
                    <span className="text-xs uppercase tracking-wider font-bold opacity-80">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
