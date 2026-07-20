"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isBuilder = pathname?.startsWith("/builder");
  const isLatex = pathname?.startsWith("/latex-builder");
  const isGuide = pathname?.startsWith("/company-guides");
  const isHome = !isBuilder && !isLatex && !isGuide;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080c14]/80 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/90 flex items-center justify-center text-base shadow-md shadow-indigo-500/30 group-hover:bg-indigo-500 transition-colors">
            📋
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            AI Resume
          </span>
        </Link>

        {/* Mode toggle (3 modes) */}
        <nav className="hidden sm:flex items-center">
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isHome ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Resume Checker
            </Link>
            <Link
              href="/builder"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isBuilder ? "bg-emerald-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Form Builder
            </Link>
            <Link
              href="/latex-builder"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isLatex ? "bg-amber-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">tex</span>
              LaTeX Editor
            </Link>
            <Link href="/company-guides" className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isGuide ? "bg-violet-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"}`}>
              Company Guides
            </Link>
          </div>
        </nav>

        {/* CTA */}
        {isGuide ? (
          <Link href="/builder" className="bg-violet-600 hover:bg-violet-500 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md">Build Resume →</Link>
        ) : isLatex ? (
          <Link
            href="/latex-builder"
            className="bg-amber-600 hover:bg-amber-500 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            Open Editor →
          </Link>
        ) : isBuilder ? (
          <Link
            href="/builder"
            className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-emerald-500/20"
          >
            Build Resume →
          </Link>
        ) : (
          <a
            href="#analyzer"
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-indigo-500/20"
          >
            Analyze Resume →
          </a>
        )}
      </div>
    </header>
  );
}
