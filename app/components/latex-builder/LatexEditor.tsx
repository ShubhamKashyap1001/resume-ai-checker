"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onCompile: () => void;
}

// Simple LaTeX tokenizer for syntax highlighting
function highlight(code: string): string {
  // Escape HTML first
  let h = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Order matters — most specific first
  // Comments
  h = h.replace(/(%.+)$/gm, '<span class="lat-comment">$1</span>');
  // \begin{...} \end{...}
  h = h.replace(/(\\(?:begin|end))\{([^}]*)\}/g,
    '<span class="lat-env">$1</span><span class="lat-brace">{</span><span class="lat-envname">$2</span><span class="lat-brace">}</span>');
  // \documentclass, \usepackage etc with optional + required args
  h = h.replace(/(\\(?:documentclass|usepackage|geometry|definecolor|hypersetup|pagestyle|urlstyle|setlength|addtolength|titleformat|titlespacing|renewcommand|newcommand|fancyhf|fancyfoot|renewcommand))(\[([^\]]*)\])?\{([^}]*)\}/g,
    (_, cmd, _opts, opts, arg) =>
      `<span class="lat-pkg">${cmd}</span>${opts ? `<span class="lat-opt">[${opts}]</span>` : ""}<span class="lat-brace">{</span><span class="lat-pkgname">${arg}</span><span class="lat-brace">}</span>`
  );
  // Backslash commands (catch-all)
  h = h.replace(/\\([a-zA-Z@]+\*?)/g, '<span class="lat-cmd">\\$1</span>');
  // { } braces not yet wrapped
  h = h.replace(/(?<!<[^>]*)([{}])/g, '<span class="lat-brace">$1</span>');
  // [ ] brackets used as options
  h = h.replace(/(?<!<[^>]*)(\[[^\]]*\])/g, '<span class="lat-opt">$1</span>');

  return h;
}

export default function LatexEditor({ value, onChange, onCompile }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  // Sync scroll between textarea and highlight overlay
  const syncScroll = useCallback(() => {
    if (!textareaRef.current || !highlightRef.current) return;
    highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }, []);

  useEffect(() => {
    setLineCount((value.match(/\n/g) || []).length + 1);
    if (highlightRef.current) {
      highlightRef.current.innerHTML = highlight(value) + "\n";
    }
  }, [value]);

  // Tab key support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = textareaRef.current!;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal = value.substring(0, start) + "  " + value.substring(end);
        onChange(newVal);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
        return;
      }
      // Ctrl+Enter / Cmd+Enter = compile
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onCompile();
      }
    },
    [value, onChange, onCompile]
  );

  return (
    <div className="relative w-full h-full flex overflow-hidden font-mono text-[13px] leading-[22px]">
      {/* Line numbers */}
      <div
        className="select-none text-right pr-3 pt-4 pl-3 text-gray-700 bg-[#0d1117] border-r border-white/[0.05] shrink-0 overflow-hidden"
        style={{ minWidth: "44px", lineHeight: "22px" }}
        aria-hidden
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} className="text-[11px] leading-[22px]">{i + 1}</div>
        ))}
      </div>

      {/* Editor area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Syntax highlight layer (behind) */}
        <div
          ref={highlightRef}
          aria-hidden
          className="absolute inset-0 pt-4 pb-4 pl-4 pr-4 overflow-auto whitespace-pre pointer-events-none text-transparent"
          style={{ lineHeight: "22px", zIndex: 1 }}
        />

        {/* Actual textarea (on top, transparent text) */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={syncScroll}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="absolute inset-0 w-full h-full pt-4 pb-4 pl-4 pr-4 bg-transparent resize-none focus:outline-none caret-emerald-400 overflow-auto"
          style={{
            lineHeight: "22px",
            color: "transparent",
            caretColor: "#34d399",
            zIndex: 2,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          }}
        />
      </div>

      {/* Syntax highlight CSS */}
      <style>{`
        #latex-highlight,
        div[aria-hidden] {
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
        }
        .lat-cmd     { color: #61afef; }
        .lat-env     { color: #c678dd; }
        .lat-envname { color: #e5c07b; }
        .lat-brace   { color: #abb2bf; }
        .lat-opt     { color: #98c379; }
        .lat-pkg     { color: #c678dd; }
        .lat-pkgname { color: #e5c07b; }
        .lat-comment { color: #5c6370; font-style: italic; }
        div[aria-hidden] span { font-family: inherit; }
        div[aria-hidden] {
          color: #abb2bf !important;
          background: #0d1117;
        }
      `}</style>
    </div>
  );
}