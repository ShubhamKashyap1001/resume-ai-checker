"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  async function submit() {
    if (!file) return alert("Upload resume");

    const form = new FormData();
    form.append("resume", file);
    form.append("jobDescription", jobDescription);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    window.location.href = `/result/${data.id}`;
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Resume Checker</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <textarea
        placeholder="Paste Job Description"
        className="border w-full p-2 mb-4"
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2"
      >
        Analyze Resume
      </button>
    </main>
  );
}
