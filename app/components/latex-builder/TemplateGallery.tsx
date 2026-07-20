"use client";

import { TEMPLATES } from "./templates";

interface Props {
  onSelect: (id: string) => void;
  activeId: string;
}

// Tiny mock resume SVG previews per template
function TemplateThumbnail({ id, accent }: { id: string; accent: string }) {
  if (id === "jakes") return (
    <svg viewBox="0 0 120 155" className="w-full h-full">
      {/* Header centered */}
      <rect x="20" y="10" width="80" height="7" rx="1" fill={accent} opacity="0.8"/>
      <rect x="30" y="20" width="60" height="4" rx="1" fill="#555" opacity="0.5"/>
      {/* Divider */}
      <line x1="10" y1="30" x2="110" y2="30" stroke="#333" strokeWidth="0.5"/>
      {/* Section */}
      <rect x="10" y="34" width="35" height="4" rx="1" fill="#888" opacity="0.7"/>
      <line x1="10" y1="40" x2="110" y2="40" stroke="#ccc" strokeWidth="0.3"/>
      {/* Entry rows */}
      {[46, 56, 68, 78, 90, 100, 112, 122].map((y, i) => (
        <rect key={i} x="14" y={y} width={i % 3 === 0 ? 70 : i % 2 === 0 ? 55 : 80} height="3" rx="0.5" fill="#666" opacity="0.4"/>
      ))}
      <rect x="10" y="64" width="35" height="4" rx="1" fill="#888" opacity="0.7"/>
      <line x1="10" y1="70" x2="110" y2="70" stroke="#ccc" strokeWidth="0.3"/>
      <rect x="10" y="86" width="30" height="4" rx="1" fill="#888" opacity="0.7"/>
      <line x1="10" y1="92" x2="110" y2="92" stroke="#ccc" strokeWidth="0.3"/>
      <rect x="10" y="108" width="40" height="4" rx="1" fill="#888" opacity="0.7"/>
      <line x1="10" y1="114" x2="110" y2="114" stroke="#ccc" strokeWidth="0.3"/>
    </svg>
  );

  if (id === "awesome-cv") return (
    <svg viewBox="0 0 120 155" className="w-full h-full">
      <rect x="10" y="10" width="100" height="18" rx="2" fill={accent} opacity="0.15"/>
      <rect x="20" y="14" width="50" height="6" rx="1" fill={accent} opacity="0.7"/>
      <rect x="20" y="22" width="80" height="3" rx="0.5" fill="#666" opacity="0.4"/>
      {/* Colored section headings */}
      {[36, 72, 108].map((y) => (
        <g key={y}>
          <rect x="10" y={y} width="30" height="4" rx="1" fill={accent} opacity="0.7"/>
          <line x1="10" y1={y + 6} x2="110" y2={y + 6} stroke={accent} strokeWidth="0.5" opacity="0.5"/>
          <rect x="12" y={y + 10} width="75" height="3" rx="0.5" fill="#555" opacity="0.5"/>
          <rect x="12" y={y + 16} width="55" height="3" rx="0.5" fill="#666" opacity="0.35"/>
          <rect x="12" y={y + 22} width="65" height="3" rx="0.5" fill="#666" opacity="0.35"/>
          <rect x="12" y={y + 28} width="45" height="3" rx="0.5" fill="#666" opacity="0.3"/>
        </g>
      ))}
    </svg>
  );

  if (id === "academic") return (
    <svg viewBox="0 0 120 155" className="w-full h-full">
      <rect x="20" y="8" width="80" height="8" rx="1" fill={accent} opacity="0.7"/>
      <rect x="30" y="18" width="60" height="4" rx="1" fill="#555" opacity="0.4"/>
      <rect x="35" y="24" width="50" height="3" rx="0.5" fill="#555" opacity="0.3"/>
      {[34, 60, 86, 112, 134].map((y) => (
        <g key={y}>
          <rect x="10" y={y} width="25" height="4" rx="0.5" fill={accent} opacity="0.6"/>
          <line x1="10" y1={y + 6} x2="110" y2={y + 6} stroke={accent} strokeWidth="0.7"/>
          <rect x="10" y={y + 10} width="85" height="3" rx="0.5" fill="#555" opacity="0.4"/>
          <rect x="10" y={y + 16} width="70" height="3" rx="0.5" fill="#555" opacity="0.3"/>
        </g>
      ))}
    </svg>
  );

  if (id === "deedy") return (
    <svg viewBox="0 0 120 155" className="w-full h-full">
      {/* Two-column layout */}
      <rect x="10" y="8" width="100" height="14" rx="1" fill="#f5f5f5" opacity="0.05"/>
      <rect x="20" y="10" width="80" height="6" rx="1" fill="#555" opacity="0.5"/>
      <rect x="35" y="18" width="50" height="3" rx="0.5" fill="#777" opacity="0.35"/>
      <line x1="10" y1="27" x2="110" y2="27" stroke="#333" strokeWidth="0.3"/>
      {/* Left col */}
      {[32, 50, 68, 90, 110, 130].map((y, i) => (
        <rect key={i} x="10" y={y} width={i % 2 === 0 ? 28 : 24} height="3" rx="0.5" fill="#666" opacity="0.4"/>
      ))}
      {/* Right col */}
      <rect x="46" y="27" width="0.5" height="120" fill="#444" opacity="0.3"/>
      {[32, 44, 56, 68, 80, 95, 107, 119, 131].map((y, i) => (
        <rect key={i} x="50" y={y} width={i % 3 === 0 ? 55 : i % 2 === 0 ? 40 : 48} height="3" rx="0.5" fill="#666" opacity="0.4"/>
      ))}
    </svg>
  );

  // modern-minimal
  return (
    <svg viewBox="0 0 120 155" className="w-full h-full">
      <rect x="10" y="10" width="60" height="8" rx="1" fill="#1a1a1a" opacity="0.7"/>
      <rect x="10" y="20" width="100" height="3" rx="0.5" fill="#888" opacity="0.4"/>
      <line x1="10" y1="30" x2="110" y2="30" stroke="#999" strokeWidth="0.3"/>
      {[36, 62, 90, 116].map((y) => (
        <g key={y}>
          <rect x="10" y={y} width="20" height="3" rx="0.5" fill={accent} opacity="0.5"/>
          <line x1="10" y1={y + 5} x2="110" y2={y + 5} stroke="#ddd" strokeWidth="0.25" opacity="0.5"/>
          <rect x="10" y={y + 9} width="80" height="3" rx="0.5" fill="#555" opacity="0.45"/>
          <rect x="10" y={y + 15} width="90" height="3" rx="0.5" fill="#666" opacity="0.3"/>
          <rect x="10" y={y + 21} width="65" height="3" rx="0.5" fill="#666" opacity="0.25"/>
        </g>
      ))}
    </svg>
  );
}

export default function TemplateGallery({ onSelect, activeId }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-[11px] font-semibold tracking-wide uppercase">LaTeX Editor — like Overleaf</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Choose a Template
        </h1>
        <p className="text-gray-400 text-sm max-w-lg">
          Pick a free LaTeX resume template. The full LaTeX source opens in the split-screen editor — edit the code, see changes live.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className={`group text-left flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-xl ${
              activeId === tpl.id
                ? "border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                : "border-white/[0.07] hover:border-white/20"
            }`}
          >
            {/* Thumbnail */}
            <div
              className="relative w-full aspect-[3/4] flex items-center justify-center p-3"
              style={{ background: "#ffffff" }}
            >
              <TemplateThumbnail id={tpl.id} accent={tpl.accent} />
              {activeId === tpl.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-[9px]">✓</span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div
                  className="px-3 py-1.5 rounded-full text-white text-[11px] font-bold shadow-lg"
                  style={{ background: tpl.accent }}
                >
                  Open in Editor
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-[#0d1117] border-t border-white/[0.05] flex-1">
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-white text-[12px] font-semibold leading-tight">{tpl.name}</span>
              </div>
              <p className="text-gray-600 text-[10px] mb-2 leading-tight">by {tpl.author}</p>
              <div className="flex flex-wrap gap-1">
                {tpl.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${tpl.accent}18`, color: tpl.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info strip */}
      <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-gray-600 border-t border-white/[0.05] pt-6">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">✓</span>
          All templates are free & open source
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">✓</span>
          Full LaTeX source — no restrictions
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500">✓</span>
          Edit code → live preview → download PDF
        </div>
      </div>
    </div>
  );
}