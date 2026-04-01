"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#080c14]/80 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/90 flex items-center justify-center text-base shadow-md shadow-indigo-500/30 group-hover:bg-indigo-500 transition-colors">
            📋
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            AI Resume Checker
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#analyzer" className="hover:text-white transition-colors">
            Features
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#analyzer"
          className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-indigo-500/20"
        >
          Analyze Resume →
        </a>
      </div>
    </header>
  );
}
