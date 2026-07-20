"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const JOB_TEMPLATES: Record<string, string> = {
  frontend:
    "Frontend Developer with experience in React, Next.js, Tailwind CSS, TypeScript, and modern UI/UX practices. Strong understanding of responsive design, performance optimization, and cross-browser compatibility.",
  backend:
    "Backend Developer skilled in Node.js, REST APIs, GraphQL, PostgreSQL, Prisma, Redis, and scalable distributed systems. Experience with Docker, CI/CD, and cloud deployments.",
  fullstack:
    "Full Stack Developer experienced in React, Node.js, TypeScript, databases, and cloud platforms. Comfortable across the entire stack from UI design to DevOps.",
  data:
    "Data Analyst with strong skills in SQL, Python, pandas, data visualization tools (Tableau, PowerBI), and statistical analysis. Experience with machine learning pipelines and ETL processes.",
  devops:
    "DevOps Engineer with expertise in Docker, Kubernetes, CI/CD pipelines, AWS/GCP/Azure, Terraform, and infrastructure automation. Strong shell scripting and monitoring skills.",
  mobile:
    "Mobile Developer proficient in React Native or Flutter, REST/GraphQL APIs, state management, and publishing to App Store and Play Store.",
};

const STATS = [
  { value: "10K+", label: "Resumes Analyzed" },
  { value: "94%", label: "Match Accuracy" },
  { value: "3x", label: "Interview Rate Boost" },
  { value: "60s", label: "Average Analysis Time" },
];

const FEATURES = [
  {
    icon: "🎯",
    title: "ATS Score Checker",
    desc: "Instantly know if your resume passes Applicant Tracking Systems used by top companies.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Feedback",
    desc: "Get line-by-line suggestions powered by Google Gemini AI for maximum impact.",
  },
  {
    icon: "📊",
    title: "Skill Gap Analysis",
    desc: "Discover missing skills and keywords compared to your target job description.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Analysis in under 60 seconds — no waiting, no sign-up needed.",
  },
  {
    icon: "📄",
    title: "PDF & DOCX Support",
    desc: "Upload resumes in PDF or Word format. We handle the parsing automatically.",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    desc: "Your data is never shared. Uploads are processed and deleted after analysis.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload Your Resume",
    desc: "Drop your PDF or DOCX resume into our secure uploader.",
  },
  {
    step: "02",
    title: "Paste Job Description",
    desc: "Add the job description or pick from our pre-built role templates.",
  },
  {
    step: "03",
    title: "Get AI Analysis",
    desc: "Our AI reviews your resume against the role and generates your score.",
  },
  {
    step: "04",
    title: "Improve & Apply",
    desc: "Follow the tailored suggestions and apply with confidence.",
  },
];

export default function Home() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [jobKey, setJobKey] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (jobKey && JOB_TEMPLATES[jobKey]) {
      setJobDescription(JOB_TEMPLATES[jobKey]);
    }
  }, [jobKey]);

  useEffect(() => {
    setCharCount(jobDescription.length);
    const t = setTimeout(() => {
      if (jobDescription.includes("experiance")) {
        setSuggestion("Did you mean 'experience'?");
      } else if (jobDescription.includes("teh ")) {
        setSuggestion("Did you mean 'the'?");
      } else if (jobDescription.includes("recieve")) {
        setSuggestion("Did you mean 'receive'?");
      } else {
        setSuggestion("");
      }
    }, 600);
    return () => clearTimeout(t);
  }, [jobDescription]);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (
      dropped &&
      (dropped.name.endsWith(".pdf") || dropped.name.endsWith(".docx"))
    ) {
      setFile(dropped);
      setFormError("");
    } else {
      setFormError("Only PDF or DOCX files are supported.");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setFormError("");
  }

  async function submit() {
    if (!file) {
      setFormError("Please upload your resume (PDF or DOCX).");
      return;
    }
    if (!jobDescription.trim()) {
      setFormError(
        "Please add a job description or select a role template."
      );
      return;
    }
    if (jobDescription.trim().length < 30) {
      setFormError("Job description is too short. Please add more detail.");
      return;
    }

    setFormError("");
    setLoading(true);

    const form = new FormData();
    form.append("resume", file);
    form.append("jobDescription", jobDescription);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }
      router.push(`/result/${data.id}`);
    } catch {
      setLoading(false);
      setFormError(
        "Network error. Please check your connection and try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center overflow-hidden">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-700/20 blur-[120px]" />
          <div className="absolute top-60 left-10 w-64 h-64 rounded-full bg-violet-600/10 blur-[80px]" />
          <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px]" />
        </div>

        {/* Badge */}
        <div className="relative inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          AI-Powered Resume Intelligence
        </div>

        <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl">
          Land More{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Interviews
          </span>
          <br />
          With a Smarter Resume
        </h1>

        <p className="relative mt-6 text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Upload your resume, paste a job description, and get an instant AI
          analysis — ATS score, skill gaps, and line-by-line improvement tips.
        </p>

        <div className="relative flex flex-wrap gap-4 justify-center mt-8">
          <a
            href="#analyzer"
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-7 py-3 rounded-xl text-sm shadow-lg shadow-indigo-500/30"
          >
            Analyze My Resume →
          </a>
          <a
            href="#how-it-works"
            className="border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-colors font-medium px-7 py-3 rounded-xl text-sm"
          >
            How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="relative mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className="text-xs text-gray-500 mt-1 tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
            What We Check
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything Your Resume Needs
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Our AI doesn&apos;t just count keywords. It thinks like a recruiter.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all duration-300 rounded-2xl p-6 group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-base text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-4 py-20 border-y border-white/[0.05] bg-emerald-500/[0.025]">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
          <a href="/builder" className="group rounded-3xl border border-emerald-500/20 bg-[#0d1516] p-8 hover:border-emerald-400/50 transition-all">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Resume Builder</p><h2 className="mt-3 text-3xl font-bold">Build an ATS-ready resume</h2><p className="mt-3 text-sm leading-6 text-gray-400">Choose a clean template, enter your experience, improve your writing with AI, and preview the finished resume.</p><span className="mt-6 inline-block text-sm font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">Start building →</span>
          </a>
          <a href="/latex-builder" className="group rounded-3xl border border-amber-500/20 bg-[#15130d] p-8 hover:border-amber-400/50 transition-all">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Overleaf-style Editor</p><h2 className="mt-3 text-3xl font-bold">Use popular LaTeX templates</h2><p className="mt-3 text-sm leading-6 text-gray-400">Edit Jake’s Resume, Awesome CV, Deedy CV and modern minimal templates with a live PDF-style preview.</p><span className="mt-6 inline-block text-sm font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">Open LaTeX editor →</span>
          </a>
          <a href="/company-guides" className="group lg:col-span-2 rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] p-8 hover:border-violet-400/50 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-widest text-violet-400">New · 15 company guides</p><h2 className="mt-3 text-3xl font-bold">Tailor your resume for top employers</h2><p className="mt-3 text-sm text-gray-400">Company-specific focus areas, keywords, achievement examples and official career sources.</p></div><span className="shrink-0 text-sm font-semibold text-violet-300 group-hover:translate-x-1 transition-transform">Explore guides →</span>
          </a>
        </div>
      </section>

      <section
        id="how-it-works"
        className="px-4 py-20 bg-white/[0.02] border-y border-white/[0.05]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYZER FORM ── */}
      <section id="analyzer" className="px-4 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
            Get Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Analyze Your Resume Now
          </h2>
          <p className="text-gray-400 mt-3">
            Free &bull; No sign-up required &bull; Results in under 60 seconds
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/40 p-8 md:p-10 space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Resume <span className="text-indigo-400">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  dragOver
                    ? "border-indigo-400 bg-indigo-500/10"
                    : file
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <p className="text-sm font-medium text-green-400">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB &middot; Click to
                      replace
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">📄</span>
                    <p className="text-sm text-gray-300 font-medium">
                      Drag &amp; drop or{" "}
                      <span className="text-indigo-400 underline">browse</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF or DOCX &mdash; max 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Role Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Quick Role Template{" "}
                <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(JOB_TEMPLATES).map((key) => (
                  <button
                    key={key}
                    onClick={() => setJobKey(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all border ${
                      jobKey === key
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "border-white/10 text-gray-400 hover:border-indigo-500/40 hover:text-white"
                    }`}
                  >
                    {key === "devops"
                      ? "DevOps"
                      : key === "data"
                      ? "Data Analyst"
                      : key === "mobile"
                      ? "Mobile Dev"
                      : key.charAt(0).toUpperCase() + key.slice(1) + " Dev"}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-200">
                  Job Description <span className="text-indigo-400">*</span>
                </label>
                <span
                  className={`text-xs ${
                    charCount > 50 ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  {charCount} chars
                </span>
              </div>
              <textarea
                spellCheck
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here, or select a template above…"
                className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
              {suggestion && (
                <div className="mt-2 flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">
                  <span>💡</span>
                  <span>AI Suggestion: {suggestion}</span>
                </div>
              )}
            </div>

            {/* Error */}
            {formError && (
              <div className="flex items-start gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                <span className="mt-0.5">⚠️</span>
                <span>{formError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white py-4 rounded-2xl text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Analyzing your resume…
                </>
              ) : (
                "Analyze Resume →"
              )}
            </button>

            <p className="text-center text-xs text-gray-600">
              🔒 Your resume is processed securely and never stored permanently.
            </p>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
            <p className="text-xs font-semibold text-indigo-300 mb-3 uppercase tracking-widest">
              💡 Pro Tips for Better Results
            </p>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>
                • Use a clean, single-column resume format for best ATS parsing
              </li>
              <li>
                • Paste the{" "}
                <strong className="text-gray-300">full</strong> job description
                including requirements &amp; responsibilities
              </li>
              <li>
                • Make sure your resume includes measurable achievements (e.g.,
                &ldquo;Reduced load time by 40%&rdquo;)
              </li>
              <li>
                • Both PDF and DOCX formats are supported — avoid scanned images
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-10 px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="text-lg">📋</span>
            AI Resume Checker
          </div>
          <p className="text-xs text-gray-500 max-w-sm">
            Building smarter tools to help developers and professionals land the
            roles they deserve.
          </p>
          <div className="flex gap-4 text-xs text-gray-600 mt-1">
            <span>Open Source</span>
            <span>·</span>
            <span>Built with Next.js &amp; Gemini AI</span>
            <span>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
