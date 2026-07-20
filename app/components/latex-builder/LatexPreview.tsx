"use client";

import { useEffect, useMemo, useRef } from "react";

interface Props {
  latexCode: string;
  compileTrigger: number;
  aiDocument?: CompiledResume | null;
}

export interface CompiledResume {
  name?: string;
  headline?: string;
  contact?: Array<string | { label?: string; url?: string }>;
  sections?: Array<{ title?: string; entries?: Array<{ heading?: string; technology?: string; subheading?: string; date?: string; links?: Array<{ label?: string; url?: string }>; bullets?: Array<string | { text?: string; bold?: string[] }>; details?: string[] }> }>;
}

// ─────────────────────────────────────────────────────────
// LaTeX → HTML renderer
// Handles the specific commands used in all 5 templates
// ─────────────────────────────────────────────────────────
function renderLatex(code: string): string {
  // Detect template style from documentclass or defining characteristics
  const isDeedy = code.includes("\\begin{tabular}{LR}") || code.includes("minipage");
  const isTwoCol = isDeedy;

  let html = code;

  // ── 1. Strip preamble (everything before \begin{document}) ──
  const docStart = html.indexOf("\\begin{document}");
  if (docStart !== -1) html = html.slice(docStart + "\\begin{document}".length);
  const docEnd = html.indexOf("\\end{document}");
  if (docEnd !== -1) html = html.slice(0, docEnd);

  // ── 2. Strip comments ──
  html = html.replace(/%.*/g, "");

  // ── 3. Remove known layout/preamble commands that appear in body ──
  const stripCmds = [
    /\\pagestyle\{[^}]*\}/g, /\\urlstyle\{[^}]*\}/g,
    /\\fancyhf\{[^}]*\}/g, /\\fancyfoot\{[^}]*\}/g,
    /\\raggedbottom/g, /\\raggedright/g,
    /\\setlength\{[^}]*\}\{[^}]*\}/g,
    /\\addtolength\{[^}]*\}\{[^}]*\}/g,
    /\\vspace\*?\{[^}]*\}/g,
    /\\hspace\{[^}]*\}/g,
    /\\noindent/g, /\\newpage/g,
    /\\par\b/g,
    /\\label\{[^}]*\}/g,
    /\\color\{[^}]*\}/g,
    /\\fontsize\{[^}]*\}\{[^}]*\}\\selectfont/g,
    /\\selectfont/g,
    /\\scshape\b/g, /\\bfseries\b/g, /\\itshape\b/g, /\\normalsize\b/g,
    /\\small\b/g, /\\large\b/g, /\\Large\b/g, /\\LARGE\b/g, /\\huge\b/g, /\\Huge\b/g,
    /\\normalfont\b/g,
    /\\extracolsep\{[^}]*\}/g,
    /\\vcenter\{[^}]*\}/g,
  ];
  stripCmds.forEach((r) => { html = html.replace(r, ""); });

  // ── 4. Environments ──
  // tabular (used in Deedy two-col & skill tables)
  html = html.replace(/\\begin\{tabular\*?\}\{[^}]*\}([\s\S]*?)\\end\{tabular\*?\}/g, (_, body) => {
    // Handle simple key-value rows (used in skills)
    const rows = body.split(/\\\\/g).map((row: string) => {
      const cells = row.split("&").map((c: string) => c.trim());
      if (cells.length === 0 || cells.every((c: string) => !c)) return "";
      return `<tr>${cells.map((c: string, i: number) =>
        `<td style="padding:2px 8px 2px ${i===0?"0":"8px"};vertical-align:top;${i===0?"font-weight:600;white-space:nowrap;color:#333":""}">${c}</td>`
      ).join("")}</tr>`;
    }).filter(Boolean);
    return `<table style="width:100%;border-collapse:collapse;margin:6px 0">${rows.join("")}</table>`;
  });

  // minipage (Deedy two-column)
  const minipages: string[] = [];
  html = html.replace(/\\begin\{minipage\}[^{]*\{[^}]*\}([\s\S]*?)\\end\{minipage\}/g, (_, body) => {
    minipages.push(body);
    return `__MINIPAGE_${minipages.length - 1}__`;
  });
  if (minipages.length >= 2) {
    // Replace the two-column tabular that wraps minipages
    html = html.replace(
      /\\begin\{tabular\}\{LR\}[\s\S]*?\\end\{tabular\}/,
      `<div style="display:flex;gap:20px;align-items:flex-start">
        <div style="width:28%;min-width:120px">${minipages[0]||""}</div>
        <div style="width:1px;background:#ddd;align-self:stretch"></div>
        <div style="flex:1">${minipages[1]||""}</div>
      </div>`
    );
    // Clean leftover minipage placeholders
    minipages.forEach((_, i) => { html = html.replace(`__MINIPAGE_${i}__`, ""); });
  }

  // enumerate / itemize → ul
  html = html.replace(/\\begin\{enumerate\}(\[[^\]]*\])?([\s\S]*?)\\end\{enumerate\}/g, (_, __, body) =>
    `<ol style="margin:4px 0 6px 0;padding-left:20px;font-size:11px;color:#333">${body}</ol>`
  );
  html = html.replace(/\\begin\{itemize\}(\[[^\]]*\])?([\s\S]*?)\\end\{itemize\}/g, (_, __, body) =>
    `<ul style="margin:4px 0 6px 0;padding-left:16px;list-style:disc;font-size:11px;color:#333">${body}</ul>`
  );
  html = html.replace(/\\item\[([^\]]*)\]/g, (_, label) => `<li style="margin-bottom:3px"><b>${label}</b> `);
  html = html.replace(/\\item\b/g, "<li style=\"margin-bottom:3px\">");

  // center environment
  html = html.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
    `<div style="text-align:center;margin-bottom:10px">$1</div>`);

  // ── 5. Custom resume commands from Jake's template ──
  // \resumeSubHeadingListStart / End → div wrapper
  html = html.replace(/\\resumeSubHeadingListStart/g, '<div class="rsh-list">');
  html = html.replace(/\\resumeSubHeadingListEnd/g, '</div>');
  html = html.replace(/\\resumeItemListStart/g, '<ul class="ritem-list">');
  html = html.replace(/\\resumeItemListEnd/g, '</ul>');

  // \resumeSubheading{Co}{Loc}{Role}{Date}
  html = html.replace(
    /\\resumeSubheading\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g,
    `<div class="rsubhead"><div class="rsubhead-row"><strong>$1</strong><span class="rdate">$2</span></div><div class="rsubhead-row"><em style="color:#555;font-size:11px">$3</em><span class="rdate">$4</span></div></div>`
  );

  // \resumeProjectHeading{name|tech}{date}
  html = html.replace(
    /\\resumeProjectHeading\{([^}]*)\}\{([^}]*)\}/g,
    `<div class="rsubhead"><div class="rsubhead-row"><span>$1</span><span class="rdate">$2</span></div></div>`
  );

  // \resumeItem{text}
  html = html.replace(/\\resumeItem\{([^}]*)\}/g, "<li style=\"margin-bottom:2px;font-size:11px\">$1</li>");
  html = html.replace(/\\resumeSubItem\{([^}]*)\}/g, "<li style=\"margin-bottom:2px;font-size:11px\">$1</li>");

  // ── 6. Sections ──
  html = html.replace(/\\section\{([^}]*)\}/g,
    `<div class="latex-section"><div class="latex-section-title">$1</div></div>`);

  // ── 7. Text formatting ──
  html = html.replace(/\\textbf\{([^}]*)\}/g, "<strong>$1</strong>");
  html = html.replace(/\\textit\{([^}]*)\}/g, "<em>$1</em>");
  html = html.replace(/\\emph\{([^}]*)\}/g, "<em>$1</em>");
  html = html.replace(/\\underline\{([^}]*)\}/g, "<u>$1</u>");
  html = html.replace(/\\textsc\{([^}]*)\}/g, "<span style='font-variant:small-caps'>$1</span>");
  html = html.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g, "<span style='color:#666'>$1</span>");
  html = html.replace(/\\color\{[^}]*\}/g, "");

  // ── 8. Hyperlinks ──
  html = html.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g,
    `<a href="$1" style="color:#0066cc;text-decoration:none" target="_blank">$2</a>`);
  html = html.replace(/\\url\{([^}]*)\}/g,
    `<a href="$1" style="color:#0066cc;text-decoration:none" target="_blank">$1</a>`);

  // ── 9. Math & special chars ──
  html = html.replace(/\$\\\|\\$|\\cdot/g, "·");
  html = html.replace(/\$\\cdot\$/g, "·");
  html = html.replace(/\$\\vcenter\{[^}]*\}\$/g, "•");
  html = html.replace(/\$[^$]*\$/g, "•");
  html = html.replace(/\\&/g, "&amp;");
  html = html.replace(/\\%/g, "%");
  html = html.replace(/\\#/g, "#");
  html = html.replace(/\\LaTeX\b/g, "LaTeX");
  html = html.replace(/\\TeX\b/g, "TeX");
  html = html.replace(/\\\$/g, "$");
  html = html.replace(/\\textless\{\}/g, "&lt;");
  html = html.replace(/\\textgreater\{\}/g, "&gt;");

  // ── 10. Line breaks ──
  html = html.replace(/\\\\(\[([^\]]*)\])?/g, "<br>");
  html = html.replace(/\\newline\b/g, "<br>");

  // ── 11. Separators: | and · used inline ──
  html = html.replace(/\s*\$\|\$\s*/g, " <span style='color:#aaa'>|</span> ");
  html = html.replace(/\s*\$\\cdot\$\s*/g, " · ");
  html = html.replace(/\s*\\quad\s*/g, "  ");

  // ── 12. Spacing commands ──
  html = html.replace(/\\vspace\*?\{[^}]*\}/g, "");
  html = html.replace(/\\medskip/g, "");
  html = html.replace(/\\bigskip/g, "");
  html = html.replace(/\\smallskip/g, "");
  html = html.replace(/\\hfill\b/g, '<span style="flex:1"></span>');
  html = html.replace(/\\fill\b/g, '<span style="flex:1"></span>');

  // ── 13. Remaining backslash commands ──
  html = html.replace(/\\[a-zA-Z]+\*?\{[^}]*\}/g, "");
  html = html.replace(/\\[a-zA-Z]+\*/g, "");
  html = html.replace(/\\[a-zA-Z]+/g, "");

  // ── 14. Braces ──
  html = html.replace(/[{}]/g, "");

  // ── 15. Cleanup whitespace ──
  html = html.replace(/\n{3,}/g, "\n\n");
  html = html.trim();

  return html;
}

export default function LatexPreview({ latexCode, compileTrigger, aiDocument }: Props) {
  const rendered = useMemo(() => renderLatex(latexCode), [compileTrigger]);
  const containerRef = useRef<HTMLDivElement>(null);

  const emphasizedText = (value: string, phrases: string[] = []) => {
    if (!phrases.length) return value;
    const escaped = phrases.filter(Boolean).map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!escaped.length) return value;
    const pattern = new RegExp(`(${escaped.join("|")})`, "g");
    return value.split(pattern).map((part, index) => phrases.includes(part) ? <strong key={index}>{part}</strong> : part);
  };

  const downloadPdf = () => {
    if (!containerRef.current) return;
    const popup = window.open("", "_blank", "width=900,height=1100");
    if (!popup) return;
    popup.document.write(`<!doctype html><html><head><title>Resume</title><style>@page{size:letter;margin:0}*{box-sizing:border-box}body{margin:0;background:#fff;font-family:'Latin Modern Roman','CMU Serif','Computer Modern',Georgia,'Times New Roman',serif;color:#000}.paper{width:8.5in;min-height:11in;padding:.44in .5in;font-size:10.5pt;line-height:1.18}a{color:#000;text-decoration:underline}.latex-section-title{font-size:12.5pt;font-weight:400;font-variant:small-caps;text-transform:uppercase;letter-spacing:.25px;border-bottom:.55pt solid #000;padding-bottom:1px;margin:8px 0 4px}.rdate{font-size:10.5pt;color:#000;white-space:nowrap}.ritem-list{margin:1px 0 4px;padding-left:19px}.ritem-list li{margin:0}.flex{display:flex}.justify-between{justify-content:space-between}.gap-4{gap:16px}.text-center{text-align:center}.mb-2{margin-bottom:5px}.mb-3{margin-bottom:7px}.mb-4{margin-bottom:9px}.mt-1{margin-top:1px}.mt-2{margin-top:3px}.font-bold,strong{font-weight:700}.italic{font-style:italic}.text-gray-600{color:#000}h1{margin:0;font-size:25pt;font-weight:700;font-variant:small-caps;text-transform:uppercase;letter-spacing:1px}p{margin:0}</style></head><body><div class="paper">${containerRef.current.innerHTML}</div><script>window.onload=()=>window.print()<\/script></body></html>`);
    popup.document.close();
  };

  return (
    <div className="min-h-full flex flex-col items-center p-8 gap-3" style={{ background: "#1a1a1a" }}>
      <div className="w-[816px] flex justify-end"><button onClick={downloadPdf} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500">Download PDF with working links</button></div>
      {/* Paper */}
      <div
        ref={containerRef}
        className="bg-white shadow-2xl"
        style={{
          width: "816px",
          minHeight: "1056px",
          padding: "42px 48px",
          fontFamily: "'Latin Modern Roman', 'CMU Serif', 'Computer Modern', Georgia, 'Times New Roman', serif",
          fontSize: "14px",
          lineHeight: "1.18",
          color: "#000",
          boxSizing: "border-box",
        }}
      >
        {aiDocument ? <div style={{ height: "100%" }}>
          <div className="resume-header text-center mb-4"><h1>{aiDocument.name}</h1>{aiDocument.headline && <p className="mt-1 resume-headline">{aiDocument.headline}</p>}<p className="mt-2 resume-contact">{aiDocument.contact?.map((contact, i) => { const item = typeof contact === "string" ? { label: contact, url: "" } : contact; const icon = item.url?.startsWith("mailto:") ? "✉" : item.url?.includes("linkedin") ? "in" : item.url?.includes("github") ? "●" : item.url?.startsWith("http") ? "↗" : "☎"; return <span key={i} className="contact-item">{i > 0 && <span className="contact-separator"> </span>}<span className="contact-icon">{icon}</span>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.label || item.url}</a> : item.label}</span>; })}</p></div>
          {aiDocument.sections?.map((section, sectionIndex) => <section key={`${section.title}-${sectionIndex}`} className="mb-3"><div className="latex-section-title">{section.title}</div>{section.entries?.map((entry, entryIndex) => <div key={`${entry.heading}-${entryIndex}`} className="mb-2"><div className="flex justify-between gap-4"><strong>{entry.heading}</strong>{entry.technology && <span className="italic"> | {entry.technology}</span>}<span className="rdate">{entry.date}</span></div>{entry.subheading && <div className="text-[11px] italic text-gray-600">{entry.subheading}</div>}{!!entry.links?.length && <div className="text-[11px]">{entry.links.map((link, i) => <span key={i}>{i > 0 && " | "}<a href={link.url} target="_blank" rel="noreferrer" className="text-blue-700 underline">{link.label || link.url}</a></span>)}</div>}{entry.details?.map((detail, i) => <div key={i} className="text-[11px]">{detail}</div>)}{!!entry.bullets?.length && <ul className="ritem-list">{entry.bullets.map((bullet, i) => { const item = typeof bullet === "string" ? { text: bullet, bold: [] as string[] } : bullet; return <li key={i}>{emphasizedText(item.text || "", item.bold)}</li>; })}</ul>}</div>)}</section>)}
        </div> : <div dangerouslySetInnerHTML={{ __html: rendered }} style={{ height: "100%" }} />}
      </div>

      {/* Scoped styles for resume elements */}
      <style>{`
        .latex-section {
          margin: 8px 0 3px 0;
        }
        .latex-section-title {
          font-size: 16px;
          font-weight: 400;
          font-variant: small-caps;
          text-transform: uppercase;
          letter-spacing: 0.25px;
          border-bottom: 1px solid #000;
          padding-bottom: 1px;
          margin-bottom: 4px;
          color: #000;
        }
        .rsh-list {
          margin: 0;
          padding: 0;
        }
        .rsubhead {
          margin-bottom: 5px;
          padding: 0;
        }
        .rsubhead-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 12px;
          line-height: 1.2;
        }
        .rdate {
          font-size: 13px;
          color: #000;
          white-space: nowrap;
          margin-left: 8px;
        }
        .ritem-list {
          margin: 1px 0 4px 0;
          padding-left: 18px;
          list-style: disc;
        }
        .ritem-list li {
          margin-bottom: 1px;
          font-size: 13px;
          line-height: 1.2;
          color: #000;
        }
        /* Fix hfill flex layout inside rsubhead-row */
        .rsubhead-row span[style*="flex:1"] {
          display: inline-flex;
          flex: 1;
        }
        /* center div fix for header */
        [style*="text-align:center"] br {
          display: block;
          content: "";
          margin-top: 2px;
        }
        [style*="text-align:center"] {
          margin-bottom: 10px;
        }
        .resume-header h1 { margin: 0; font-size: 34px; line-height: 1.02; font-weight: 700; font-variant: small-caps; text-transform: uppercase; letter-spacing: 1.2px; }
        .resume-headline { margin: 4px 0 0; font-size: 14px; color: #000; }
        .resume-contact { margin: 7px 0 0; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 14px; font-size: 13px; color: #000; }
        .contact-item { display: inline-flex; align-items: center; gap: 4px; }
        .contact-icon { font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; }
        .resume-contact a, .text-blue-700 { color: #000 !important; text-decoration: none !important; }
        section.mb-3 { margin-bottom: 6px; }
        section .mb-2 { margin-bottom: 5px; }
        /* table cells */
        table td {
          font-size: 11px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
