"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import LatexEditor from "../components/latex-builder/LatexEditor";
import LatexPreview from "../components/latex-builder/LatexPreview";
import type { CompiledResume } from "../components/latex-builder/LatexPreview";
import TemplateGallery from "../components/latex-builder/TemplateGallery";
import { TEMPLATES } from "../components/latex-builder/templates";

type View = "gallery" | "editor";

export default function LatexBuilderPage() {
  const [view, setView] = useState<View>("gallery");
  const [latexCode, setLatexCode] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");
  const [compileTrigger, setCompileTrigger] = useState(0);
  const [compiledResume, setCompiledResume] = useState<CompiledResume | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState("");
  const [splitPos, setSplitPos] = useState(50); // percent
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectTemplate = (id: string) => {
    const tpl = TEMPLATES.find((t) => t.id === id);
    if (tpl) {
      setLatexCode(tpl.code);
      setActiveTemplate(id);
      setCompiledResume(null);
      setView("editor");
      setCompileTrigger((n) => n + 1);
    }
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setCompileError("");
    try {
      const response = await fetch("/api/latex-compile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ latex: latexCode }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Compilation failed");
      setCompiledResume(data.compiled);
      setCompileTrigger((n) => n + 1);
    } catch (error) {
      setCompiledResume(null);
      setCompileTrigger((n) => n + 1);
      setCompileError(error instanceof Error ? error.message : "Compilation failed");
    } finally {
      setIsCompiling(false);
    }
  };

  // Resizable divider
  const onMouseDown = useCallback(() => { dragging.current = true; }, []);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPos(Math.min(75, Math.max(25, pct)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#0a0d14] overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-white/[0.07] bg-[#0a0d14] shrink-0 z-20">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-indigo-600/90 flex items-center justify-center text-sm shadow shadow-indigo-500/30 group-hover:bg-indigo-500 transition-colors">📋</div>
            <span className="text-xs font-bold text-white tracking-tight hidden sm:block">AI Resume</span>
          </a>
          <span className="text-gray-700 text-xs">/</span>
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-0.5">
            <a href="/builder" className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-gray-400 hover:text-gray-200 transition-colors">Form Builder</a>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-600 text-white">LaTeX Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {view === "editor" && (
            <>
              <button
                onClick={() => setView("gallery")}
                className="text-[11px] text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                ← Templates
              </button>
              <button
                disabled={isCompiling}
                onClick={handleCompile}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow shadow-emerald-500/20"
              >
                <span className="text-xs">{isCompiling ? "◌" : "▶"}</span> {isCompiling ? "Gemini compiling…" : "Compile with Gemini"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      {view === "gallery" ? (
        <div className="flex-1 overflow-y-auto">
          <TemplateGallery onSelect={handleSelectTemplate} activeId={activeTemplate} />
        </div>
      ) : (
        <div ref={containerRef} className="flex-1 flex overflow-hidden select-none">
          {/* Editor pane */}
          <div style={{ width: `${splitPos}%` }} className="flex flex-col border-r border-white/[0.07] overflow-hidden">
            <div className="h-8 flex items-center gap-2 px-3 bg-[#0d1117] border-b border-white/[0.06] shrink-0">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] text-gray-600 ml-2 font-mono">resume.tex</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <LatexEditor value={latexCode} onChange={(value) => { setLatexCode(value); setCompiledResume(null); setCompileError(""); }} onCompile={handleCompile} />
            </div>
          </div>

          {/* Drag handle */}
          <div
            onMouseDown={onMouseDown}
            className="w-1 bg-white/[0.04] hover:bg-emerald-500/40 cursor-col-resize transition-colors shrink-0 active:bg-emerald-500/60"
          />

          {/* Preview pane */}
          <div style={{ width: `${100 - splitPos}%` }} className="flex flex-col overflow-hidden">
            <div className="h-8 flex items-center justify-between px-3 bg-[#0d1117] border-b border-white/[0.06] shrink-0">
              <span className="text-[10px] text-gray-600 font-mono">preview (PDF-style)</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-500/70 font-mono">live render</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-[#1a1a1a]">
              {compileError && <div className="sticky top-2 z-10 mx-4 mt-3 rounded-lg border border-amber-500/30 bg-amber-950/90 px-3 py-2 text-xs text-amber-200">Gemini unavailable: {compileError}. Showing local preview.</div>}
              <LatexPreview latexCode={latexCode} compileTrigger={compileTrigger} aiDocument={compiledResume} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
