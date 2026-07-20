"use client";

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean two-column layout with a color sidebar. Best for tech roles.",
    color: "#6366f1",
    preview: "M",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Single-column, ultra-clean. Ideal for finance and consulting.",
    color: "#10b981",
    preview: "M",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Bold header with structured sections. Great for senior positions.",
    color: "#f59e0b",
    preview: "E",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Vibrant and expressive. Perfect for design and marketing roles.",
    color: "#ec4899",
    preview: "C",
  },
];

interface Props {
  onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ onSelect }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-emerald-400 text-xs font-semibold">Step 1 of 3</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">Choose a Template</h1>
        <p className="text-gray-400 text-base">Pick a design that matches your style and target industry</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="group relative bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6 text-left hover:border-white/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            {/* Template preview card */}
            <div
              className="w-full h-40 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
              style={{ background: `${t.color}15`, border: `1px solid ${t.color}30` }}
            >
              {/* Mock resume lines */}
              <div className="w-full h-full p-4 flex gap-3">
                {t.id === "modern" ? (
                  <>
                    <div className="w-2/5 h-full rounded-lg" style={{ background: `${t.color}25` }} />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3 rounded-full bg-white/10 w-4/5" />
                      <div className="h-2 rounded-full bg-white/[0.06] w-3/5" />
                      <div className="mt-3 space-y-1.5">
                        <div className="h-1.5 rounded-full bg-white/[0.06] w-full" />
                        <div className="h-1.5 rounded-full bg-white/[0.06] w-4/5" />
                        <div className="h-1.5 rounded-full bg-white/[0.06] w-3/4" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 space-y-2 pt-1">
                    <div
                      className="h-6 rounded-lg w-3/5 mb-3"
                      style={{ background: `${t.color}30` }}
                    />
                    <div className="h-1.5 rounded-full bg-white/[0.06] w-full" />
                    <div className="h-1.5 rounded-full bg-white/[0.06] w-4/5" />
                    <div className="mt-3 space-y-1.5">
                      <div className="h-2 rounded-full bg-white/10 w-2/5" />
                      <div className="h-1.5 rounded-full bg-white/[0.06] w-full" />
                      <div className="h-1.5 rounded-full bg-white/[0.06] w-3/4" />
                    </div>
                  </div>
                )}
              </div>
              <div
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ background: t.color }}
              >
                {t.preview}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-base mb-1">{t.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.description}</p>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}