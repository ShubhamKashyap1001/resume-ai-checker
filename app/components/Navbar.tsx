"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo */}
          <Image
            src="/resume.png"
            alt="AI Resume Checker Logo"
            width={32}
            height={32}
            priority
          />

          {/* Project Name */}
          <span className="text-base font-semibold tracking-tight text-white">
            AI Resume Checker
          </span>
        </Link>
      </div>
    </header>
  );
}
