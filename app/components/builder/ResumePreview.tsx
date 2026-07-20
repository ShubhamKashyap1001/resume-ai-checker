"use client";

import { useRef } from "react";
import { ResumeData } from "./types";

interface Props {
  data: ResumeData;
  template: string;
  onBack: () => void;
}

function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "Georgia, serif", display: "flex", minHeight: "100%", backgroundColor: "#fff", color: "#111" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#1e293b", color: "#fff", padding: "32px 20px", flexShrink: 0 }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "4px", color: "#fff" }}>{data.fullName || "Your Name"}</h1>
          <p style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.4" }}>{data.jobTitle}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#64748b", marginBottom: "10px" }}>Contact</h3>
          {data.email && <p style={{ fontSize: "10px", color: "#cbd5e1", marginBottom: "5px" }}>✉ {data.email}</p>}
          {data.phone && <p style={{ fontSize: "10px", color: "#cbd5e1", marginBottom: "5px" }}>📞 {data.phone}</p>}
          {data.location && <p style={{ fontSize: "10px", color: "#cbd5e1", marginBottom: "5px" }}>📍 {data.location}</p>}
          {data.linkedin && <p style={{ fontSize: "10px", color: "#cbd5e1", marginBottom: "5px" }}>🔗 {data.linkedin}</p>}
          {data.github && <p style={{ fontSize: "10px", color: "#cbd5e1", marginBottom: "5px" }}>⭐ {data.github}</p>}
        </div>
        {data.skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#64748b", marginBottom: "10px" }}>Skills</h3>
            {data.skills.map((s, i) => (
              <div key={i} style={{ fontSize: "10px", color: "#cbd5e1", marginBottom: "4px" }}>• {s}</div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px 28px" }}>
        {data.summary && (
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6366f1", marginBottom: "8px", fontWeight: "700" }}>Summary</h2>
            <p style={{ fontSize: "11px", lineHeight: "1.7", color: "#334155" }}>{data.summary}</p>
          </div>
        )}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px", fontWeight: "700" }}>Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                  <div>
                    <strong style={{ fontSize: "12px", color: "#0f172a" }}>{exp.role}</strong>
                    <span style={{ fontSize: "11px", color: "#6366f1", marginLeft: "6px" }}>@ {exp.company}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#64748b", whiteSpace: "nowrap" }}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#475569", whiteSpace: "pre-line" }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.education.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px", fontWeight: "700" }}>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>{edu.degree} {edu.field && `in ${edu.field}`}</strong>
                  <span style={{ fontSize: "10px", color: "#64748b" }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <p style={{ fontSize: "11px", color: "#475569" }}>{edu.institution}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        )}
        {data.projects.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px", fontWeight: "700" }}>Projects</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>{proj.name}</strong>
                  {proj.link && <span style={{ fontSize: "10px", color: "#6366f1" }}>{proj.link}</span>}
                </div>
                {proj.technologies && <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "2px" }}>{proj.technologies}</p>}
                <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#475569" }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6366f1", marginBottom: "8px", fontWeight: "700" }}>Certifications</h2>
            {data.certifications.map((cert, i) => (
              <p key={i} style={{ fontSize: "11px", color: "#475569", marginBottom: "4px" }}>• {cert}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "'Times New Roman', serif", padding: "48px 56px", backgroundColor: "#fff", color: "#111", minHeight: "100%" }}>
      <div style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: "16px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>{data.fullName || "Your Name"}</h1>
        {data.jobTitle && <p style={{ fontSize: "12px", color: "#555", marginBottom: "8px" }}>{data.jobTitle}</p>}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", fontSize: "10px", color: "#444" }}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {data.summary && (
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "11px", lineHeight: "1.8", color: "#333", textAlign: "justify" }}>{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <Section title="EXPERIENCE">
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: "12px" }}>{exp.role}, {exp.company}</strong>
                <span style={{ fontSize: "10px", color: "#555" }}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: "11px", lineHeight: "1.7", color: "#333", marginTop: "4px", whiteSpace: "pre-line" }}>{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="EDUCATION">
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: "12px" }}>{edu.institution}</strong>
                <span style={{ fontSize: "10px", color: "#555" }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ fontSize: "11px", color: "#444" }}>{edu.degree} {edu.field && `in ${edu.field}`}{edu.gpa && ` · ${edu.gpa}`}</p>
            </div>
          ))}
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title="SKILLS">
          <p style={{ fontSize: "11px", color: "#333", lineHeight: "1.7" }}>{data.skills.join(" · ")}</p>
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="PROJECTS">
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "12px" }}>{proj.name}</strong>
              {proj.technologies && <span style={{ fontSize: "10px", color: "#555" }}> ({proj.technologies})</span>}
              <p style={{ fontSize: "11px", lineHeight: "1.7", color: "#333", marginTop: "3px" }}>{proj.description}</p>
            </div>
          ))}
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title="CERTIFICATIONS">
          {data.certifications.map((cert, i) => (
            <p key={i} style={{ fontSize: "11px", color: "#333", marginBottom: "3px" }}>• {cert}</p>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <h2 style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: "700", borderBottom: "1px solid #bbb", paddingBottom: "4px", marginBottom: "10px" }}>{title}</h2>
      {children}
    </div>
  );
}

function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", color: "#111", minHeight: "100%" }}>
      <div style={{ background: "#1a1a2e", color: "#fff", padding: "36px 48px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "1px", marginBottom: "4px" }}>{data.fullName || "Your Name"}</h1>
        {data.jobTitle && <p style={{ fontSize: "13px", color: "#a5b4fc", marginBottom: "12px", fontWeight: "500" }}>{data.jobTitle}</p>}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "11px", color: "#c7d2fe" }}>
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.linkedin && <span>in {data.linkedin}</span>}
          {data.github && <span>⭐ {data.github}</span>}
        </div>
      </div>
      <div style={{ padding: "32px 48px" }}>
        {data.summary && (
          <div style={{ marginBottom: "24px", padding: "16px", background: "#f8fafc", borderLeft: "4px solid #6366f1", borderRadius: "4px" }}>
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#334155" }}>{data.summary}</p>
          </div>
        )}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", borderBottom: "2px solid #6366f1", paddingBottom: "6px", marginBottom: "14px" }}>PROFESSIONAL EXPERIENCE</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: "13px", color: "#0f172a" }}>{exp.role}</strong>
                    <span style={{ fontSize: "12px", color: "#6366f1", marginLeft: "8px" }}>{exp.company}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px" }}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: "11px", lineHeight: "1.7", color: "#475569", marginTop: "6px", whiteSpace: "pre-line" }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div>
            {data.education.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", borderBottom: "2px solid #6366f1", paddingBottom: "6px", marginBottom: "12px" }}>EDUCATION</h2>
                {data.education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: "10px" }}>
                    <strong style={{ fontSize: "12px" }}>{edu.degree} in {edu.field}</strong>
                    <p style={{ fontSize: "11px", color: "#555" }}>{edu.institution}</p>
                    <p style={{ fontSize: "10px", color: "#64748b" }}>{edu.startDate} – {edu.endDate}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            )}
            {data.certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", borderBottom: "2px solid #6366f1", paddingBottom: "6px", marginBottom: "10px" }}>CERTIFICATIONS</h2>
                {data.certifications.map((cert, i) => (
                  <p key={i} style={{ fontSize: "11px", color: "#333", marginBottom: "4px" }}>✓ {cert}</p>
                ))}
              </div>
            )}
          </div>
          <div>
            {data.skills.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", borderBottom: "2px solid #6366f1", paddingBottom: "6px", marginBottom: "10px" }}>CORE SKILLS</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {data.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: "10px", background: "#ede9fe", color: "#4c1d95", padding: "3px 8px", borderRadius: "4px" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {data.projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a2e", borderBottom: "2px solid #6366f1", paddingBottom: "6px", marginBottom: "10px" }}>KEY PROJECTS</h2>
                {data.projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: "10px" }}>
                    <strong style={{ fontSize: "12px" }}>{proj.name}</strong>
                    {proj.technologies && <p style={{ fontSize: "10px", color: "#6366f1" }}>{proj.technologies}</p>}
                    <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.6" }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff", color: "#111", minHeight: "100%" }}>
      <div style={{ background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)", padding: "40px 48px 32px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "900", color: "#fff", letterSpacing: "-0.5px", marginBottom: "4px" }}>{data.fullName || "Your Name"}</h1>
        {data.jobTitle && <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "16px" }}>{data.jobTitle}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.linkedin && <span>🔗 {data.linkedin}</span>}
          {data.github && <span>⭐ {data.github}</span>}
          {data.website && <span>🌐 {data.website}</span>}
        </div>
      </div>
      <div style={{ padding: "28px 48px", display: "grid", gridTemplateColumns: "3fr 2fr", gap: "32px" }}>
        <div>
          {data.summary && (
            <div style={{ marginBottom: "22px" }}>
              <h2 style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", textTransform: "uppercase", color: "#ec4899", marginBottom: "8px" }}>About Me</h2>
              <p style={{ fontSize: "11.5px", lineHeight: "1.8", color: "#334155" }}>{data.summary}</p>
            </div>
          )}
          {data.experience.length > 0 && (
            <div style={{ marginBottom: "22px" }}>
              <h2 style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", textTransform: "uppercase", color: "#ec4899", marginBottom: "12px" }}>Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: "16px", paddingLeft: "12px", borderLeft: "3px solid #f9a8d4" }}>
                  <strong style={{ fontSize: "12px" }}>{exp.role}</strong>
                  <p style={{ fontSize: "11px", color: "#a855f7", fontWeight: "600" }}>{exp.company}</p>
                  <p style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "4px" }}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</p>
                  <p style={{ fontSize: "11px", lineHeight: "1.7", color: "#475569", whiteSpace: "pre-line" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}
          {data.projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", textTransform: "uppercase", color: "#ec4899", marginBottom: "12px" }}>Projects</h2>
              {data.projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: "14px", padding: "10px", background: "#fdf4ff", borderRadius: "8px" }}>
                  <strong style={{ fontSize: "12px" }}>{proj.name}</strong>
                  {proj.technologies && <p style={{ fontSize: "10px", color: "#a855f7", marginBottom: "4px" }}>{proj.technologies}</p>}
                  <p style={{ fontSize: "11px", lineHeight: "1.6", color: "#475569" }}>{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", textTransform: "uppercase", color: "#a855f7", marginBottom: "10px" }}>Skills</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {data.skills.map((s, i) => (
                  <span key={i} style={{ fontSize: "10px", background: "#fdf4ff", color: "#7e22ce", padding: "3px 9px", borderRadius: "20px", border: "1px solid #e9d5ff" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.education.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", textTransform: "uppercase", color: "#a855f7", marginBottom: "10px" }}>Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "10px" }}>
                  <strong style={{ fontSize: "12px" }}>{edu.institution}</strong>
                  <p style={{ fontSize: "11px", color: "#555" }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p style={{ fontSize: "10px", color: "#94a3b8" }}>{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
          {data.certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", textTransform: "uppercase", color: "#a855f7", marginBottom: "10px" }}>Certifications</h2>
              {data.certifications.map((cert, i) => (
                <p key={i} style={{ fontSize: "11px", color: "#333", marginBottom: "5px" }}>🏅 {cert}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TEMPLATE_MAP: Record<string, React.FC<{ data: ResumeData }>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
};

export default function ResumePreview({ data, template, onBack }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = TEMPLATE_MAP[template] || ModernTemplate;

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.fullName || "Resume"}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 0; size: A4; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Preview</h2>
          <p className="text-xs text-gray-500 mt-0.5">This is how your resume will look when printed</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="border border-white/10 hover:border-white/20 text-gray-300 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            ← Edit
          </button>
          <button
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors shadow-md"
          >
            🖨️ Download / Print
          </button>
        </div>
      </div>

      {/* Resume Paper */}
      <div className="flex justify-center">
        <div
          className="shadow-2xl shadow-black/50 rounded-lg overflow-hidden"
          style={{ width: "794px", minHeight: "1123px", background: "#fff" }}
          ref={printRef}
        >
          <TemplateComponent data={data} />
        </div>
      </div>
    </div>
  );
}