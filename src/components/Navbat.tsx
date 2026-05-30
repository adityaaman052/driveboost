"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  showGuide?: boolean;
}

export default function Navbar({ showGuide = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-black tracking-widest text-gray-900 uppercase hover:text-gray-600 transition-colors"
      >
        DriveBoost
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-3">
        {showGuide && (
          <Link
            href="/guide"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            User Guide
          </Link>
        )}
        <Link
          href="/sign-in"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg border border-gray-900 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex md:hidden flex-col justify-center items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-900 transition-all duration-300 ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-4 right-4 z-50 rounded-2xl border border-gray-100 bg-white shadow-xl md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {showGuide && (
              <Link
                href="/guide"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                User Guide
              </Link>
            )}
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
            <div className="my-1 border-t border-gray-100" />
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-gray-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}