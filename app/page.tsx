"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const JOB_TEMPLATES: Record<string, string> = {
  frontend:
    "Frontend Developer with experience in React, Next.js, Tailwind CSS, and modern UI practices.",
  backend:
    "Backend Developer skilled in Node.js, REST APIs, PostgreSQL, Prisma, and scalable systems.",
  fullstack:
    "Full Stack Developer experienced in React, Node.js, databases, and cloud platforms.",
  data:
    "Data Analyst with strong skills in SQL, Python, data analysis, and visualization.",
};

export default function Home() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [jobKey, setJobKey] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    if (jobKey && JOB_TEMPLATES[jobKey]) {
      setJobDescription(JOB_TEMPLATES[jobKey]);
    }
  }, [jobKey]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (jobDescription.includes("experiance")) {
        setSuggestion("Did you mean 'experience'?");
      } else if (jobDescription.includes("teh")) {
        setSuggestion("Did you mean 'the'?");
      } else {
        setSuggestion("");
      }
    }, 600);

    return () => clearTimeout(t);
  }, [jobDescription]);

  async function submit() {
    if (!file) return alert("Please upload your resume");
    if (!jobDescription.trim()) return alert("Job description is required");

    setLoading(true);

    const form = new FormData();
    form.append("resume", file);
    form.append("jobDescription", jobDescription);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert(data.error);
    router.push(`/result/${data.id}`);
  }

  return (
   <section className="min-h-[calc(100vh-64px)] flex flex-col px-4 pt-20">

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-xl p-8">
          <h1 className="text-2xl font-semibold mb-1">
            AI Resume Checker
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Match your resume with the right opportunity
          </p>

          {/* Resume */}
          <label className="block mb-4">
            <span className="text-sm text-gray-300">Resume</span>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-gray-300 file:bg-black file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md"
            />
          </label>

          {/* Job Role */}
          <label className="block mb-4">
            <span className="text-sm text-gray-300">Job Role</span>
            <select
              value={jobKey}
              onChange={(e) => setJobKey(e.target.value)}
              className="mt-2 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm text-white"
            >
              <option value="">— Select role —</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="data">Data Analyst</option>
            </select>
          </label>

          {/* Job Description */}
          <label className="block mb-2">
            <span className="text-sm text-gray-300">Job Description</span>
            <textarea
              spellCheck
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="mt-2 w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </label>

          {suggestion && (
            <p className="text-xs text-yellow-400 mb-4">
              AI Suggestion: {suggestion}
            </p>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-white text-black py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>

      {/* Footer Separator */}
      <div className="border-t border-white/10 my-8" />

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pb-6">
        <p className="mb-2">
          Building smarter tools to help people grow their careers
        </p>
        <p className="text-xs text-gray-600">
          © 2026 · Proudly Open Source
        </p>
      </footer>
    </section>
  );
}
