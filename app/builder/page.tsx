"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResumeForm from "../components/builder/ResumeForm";
import ResumePreview from "../components/builder/ResumePreview";
import TemplateSelector from "../components/builder/TemplateSelector";
import { ResumeData, defaultResumeData } from "../components/builder/types";

type Step = "template" | "edit" | "preview";

export default function BuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [showAiPanel, setShowAiPanel] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep("edit");
  };

  const handleAiEnhance = async (section: string, content: string) => {
    setIsGenerating(true);
    setShowAiPanel(true);
    setAiSuggestion("");
    try {
      const res = await fetch("/api/builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, content }),
      });
      const data = await res.json();
      setAiSuggestion(data.suggestion || "No suggestion returned.");
    } catch {
      setAiSuggestion("Failed to get AI suggestion. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#080c14]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/90 flex items-center justify-center text-base shadow-md shadow-indigo-500/30 group-hover:bg-indigo-500 transition-colors">
                📋
              </div>
              <span className="text-sm font-bold tracking-tight text-white">
                AI Resume Checker
              </span>
            </a>
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
              <span>/</span>
              <span className="text-emerald-400 font-semibold ml-1">Resume Builder</span>
            </div>
          </div>

          {/* Step indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {(["template", "edit", "preview"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => step !== "template" && setStep(s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    step === s
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : step > s || (step === "edit" && s === "template") || (step === "preview")
                      ? "text-gray-400 hover:text-white cursor-pointer"
                      : "text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    step === s ? "bg-emerald-500 text-black font-bold" : "bg-white/10"
                  }`}>{i + 1}</span>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
                {i < 2 && <span className="text-gray-700">→</span>}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {step === "edit" && (
              <button
                onClick={() => setStep("preview")}
                className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md"
              >
                Preview →
              </button>
            )}
            {step === "preview" && (
              <button
                onClick={() => setStep("edit")}
                className="border border-white/10 hover:border-white/20 text-gray-300 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                ← Edit
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {step === "template" && (
        <TemplateSelector onSelect={handleTemplateSelect} />
      )}

      {step === "edit" && (
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
          {/* Form Panel */}
          <div className="flex-1 min-w-0">
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              onAiEnhance={handleAiEnhance}
            />
          </div>

          {/* AI Panel */}
          {showAiPanel && (
            <div className="w-80 shrink-0">
              <div className="sticky top-24 bg-[#0d1117] border border-emerald-500/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span className="text-sm font-semibold text-emerald-400">AI Suggestion</span>
                  </div>
                  <button
                    onClick={() => setShowAiPanel(false)}
                    className="text-gray-500 hover:text-gray-300 text-sm"
                  >✕</button>
                </div>
                {isGenerating ? (
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-4/5" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-full" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-3/5" />
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{aiSuggestion}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {step === "preview" && (
        <ResumePreview
          data={resumeData}
          template={selectedTemplate}
          onBack={() => setStep("edit")}
        />
      )}
    </div>
  );
}