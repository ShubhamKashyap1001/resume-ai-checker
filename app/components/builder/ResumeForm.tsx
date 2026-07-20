"use client";

import { useState } from "react";
import { ResumeData, WorkExperience, Education, Project } from "./types";
import { nanoid } from "./utils";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onAiEnhance: (section: string, content: string) => void;
}

const sectionOrder = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
];

const sectionLabels: Record<string, string> = {
  personal: "Personal Info",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
};

const sectionIcons: Record<string, string> = {
  personal: "👤",
  summary: "📝",
  experience: "💼",
  education: "🎓",
  skills: "⚡",
  projects: "🚀",
  certifications: "🏅",
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs text-gray-500 mb-1.5 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  onAiEnhance,
  sectionName,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  onAiEnhance?: (section: string, content: string) => void;
  sectionName?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs text-gray-500 font-medium">{label}</label>
        {onAiEnhance && sectionName && (
          <button
            onClick={() => onAiEnhance(sectionName, value)}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>✨</span> Enhance with AI
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all resize-none"
      />
    </div>
  );
}

export default function ResumeForm({ data, onChange, onAiEnhance }: Props) {
  const [activeSection, setActiveSection] = useState("personal");

  const update = (patch: Partial<ResumeData>) => onChange({ ...data, ...patch });

  // Experience helpers
  const addExp = () =>
    update({
      experience: [
        ...data.experience,
        {
          id: nanoid(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  const updateExp = (id: string, patch: Partial<WorkExperience>) =>
    update({
      experience: data.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    });
  const removeExp = (id: string) =>
    update({ experience: data.experience.filter((e) => e.id !== id) });

  // Education helpers
  const addEdu = () =>
    update({
      education: [
        ...data.education,
        { id: nanoid(), institution: "", degree: "", field: "", startDate: "", endDate: "" },
      ],
    });
  const updateEdu = (id: string, patch: Partial<Education>) =>
    update({ education: data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  const removeEdu = (id: string) =>
    update({ education: data.education.filter((e) => e.id !== id) });

  // Projects helpers
  const addProject = () =>
    update({
      projects: [
        ...data.projects,
        { id: nanoid(), name: "", description: "", technologies: "", link: "" },
      ],
    });
  const updateProject = (id: string, patch: Partial<Project>) =>
    update({ projects: data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  const removeProject = (id: string) =>
    update({ projects: data.projects.filter((p) => p.id !== id) });

  const sectionContent: Record<string, React.ReactNode> = {
    personal: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Full Name *"
          value={data.fullName}
          onChange={(v) => update({ fullName: v })}
          placeholder="John Doe"
          className="col-span-2"
        />
        <Field
          label="Job Title"
          value={data.jobTitle}
          onChange={(v) => update({ jobTitle: v })}
          placeholder="Senior Software Engineer"
          className="col-span-2"
        />
        <Field label="Email *" value={data.email} onChange={(v) => update({ email: v })} placeholder="john@example.com" type="email" />
        <Field label="Phone" value={data.phone} onChange={(v) => update({ phone: v })} placeholder="+1 (555) 000-0000" />
        <Field label="Location" value={data.location} onChange={(v) => update({ location: v })} placeholder="San Francisco, CA" />
        <Field label="LinkedIn" value={data.linkedin} onChange={(v) => update({ linkedin: v })} placeholder="linkedin.com/in/johndoe" />
        <Field label="GitHub" value={data.github} onChange={(v) => update({ github: v })} placeholder="github.com/johndoe" />
        <Field label="Website" value={data.website} onChange={(v) => update({ website: v })} placeholder="johndoe.dev" />
      </div>
    ),
    summary: (
      <TextArea
        label="Professional Summary"
        value={data.summary}
        onChange={(v) => update({ summary: v })}
        placeholder="A results-driven engineer with 5+ years of experience building scalable web applications..."
        rows={6}
        onAiEnhance={onAiEnhance}
        sectionName="summary"
      />
    ),
    experience: (
      <div className="space-y-5">
        {data.experience.map((exp) => (
          <div key={exp.id} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Work Experience</span>
              <button onClick={() => removeExp(exp.id)} className="text-red-500/60 hover:text-red-500 text-xs transition-colors">Remove</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Company *" value={exp.company} onChange={(v) => updateExp(exp.id, { company: v })} placeholder="Google" />
              <Field label="Role *" value={exp.role} onChange={(v) => updateExp(exp.id, { role: v })} placeholder="Software Engineer" />
              <Field label="Start Date" value={exp.startDate} onChange={(v) => updateExp(exp.id, { startDate: v })} placeholder="Jan 2022" />
              <Field label="End Date" value={exp.endDate} onChange={(v) => updateExp(exp.id, { endDate: v })} placeholder={exp.current ? "Present" : "Dec 2024"} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExp(exp.id, { current: e.target.checked })}
                className="accent-emerald-500"
              />
              <span className="text-xs text-gray-400">Currently working here</span>
            </label>
            <TextArea
              label="Description"
              value={exp.description}
              onChange={(v) => updateExp(exp.id, { description: v })}
              placeholder="• Led development of microservices that reduced latency by 40%&#10;• Mentored 3 junior engineers..."
              rows={4}
              onAiEnhance={onAiEnhance}
              sectionName={`experience at ${exp.company}`}
            />
          </div>
        ))}
        <button
          onClick={addExp}
          className="w-full border border-dashed border-white/10 rounded-2xl py-3 text-sm text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all"
        >
          + Add Experience
        </button>
      </div>
    ),
    education: (
      <div className="space-y-5">
        {data.education.map((edu) => (
          <div key={edu.id} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Education</span>
              <button onClick={() => removeEdu(edu.id)} className="text-red-500/60 hover:text-red-500 text-xs transition-colors">Remove</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Institution *" value={edu.institution} onChange={(v) => updateEdu(edu.id, { institution: v })} placeholder="MIT" className="col-span-2" />
              <Field label="Degree" value={edu.degree} onChange={(v) => updateEdu(edu.id, { degree: v })} placeholder="Bachelor of Science" />
              <Field label="Field of Study" value={edu.field} onChange={(v) => updateEdu(edu.id, { field: v })} placeholder="Computer Science" />
              <Field label="Start Year" value={edu.startDate} onChange={(v) => updateEdu(edu.id, { startDate: v })} placeholder="2018" />
              <Field label="End Year" value={edu.endDate} onChange={(v) => updateEdu(edu.id, { endDate: v })} placeholder="2022" />
              <Field label="GPA (optional)" value={edu.gpa || ""} onChange={(v) => updateEdu(edu.id, { gpa: v })} placeholder="3.8 / 4.0" />
            </div>
          </div>
        ))}
        <button
          onClick={addEdu}
          className="w-full border border-dashed border-white/10 rounded-2xl py-3 text-sm text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all"
        >
          + Add Education
        </button>
      </div>
    ),
    skills: (
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs text-gray-500 font-medium">Skills (comma-separated)</label>
          <button
            onClick={() => onAiEnhance("skills", data.skills.join(", "))}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>✨</span> Suggest more
          </button>
        </div>
        <textarea
          value={data.skills.join(", ")}
          onChange={(e) =>
            update({ skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
          }
          placeholder="React, TypeScript, Node.js, PostgreSQL, Docker, AWS..."
          rows={4}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all resize-none"
        />
        {data.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
    projects: (
      <div className="space-y-5">
        {data.projects.map((proj) => (
          <div key={proj.id} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Project</span>
              <button onClick={() => removeProject(proj.id)} className="text-red-500/60 hover:text-red-500 text-xs transition-colors">Remove</button>
            </div>
            <Field label="Project Name *" value={proj.name} onChange={(v) => updateProject(proj.id, { name: v })} placeholder="AI Resume Checker" />
            <Field label="Technologies" value={proj.technologies} onChange={(v) => updateProject(proj.id, { technologies: v })} placeholder="Next.js, TypeScript, PostgreSQL" />
            <Field label="Link (optional)" value={proj.link || ""} onChange={(v) => updateProject(proj.id, { link: v })} placeholder="github.com/user/project" />
            <TextArea
              label="Description"
              value={proj.description}
              onChange={(v) => updateProject(proj.id, { description: v })}
              placeholder="Built an AI-powered tool that analyzes resumes against job descriptions..."
              rows={3}
              onAiEnhance={onAiEnhance}
              sectionName={`project ${proj.name}`}
            />
          </div>
        ))}
        <button
          onClick={addProject}
          className="w-full border border-dashed border-white/10 rounded-2xl py-3 text-sm text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all"
        >
          + Add Project
        </button>
      </div>
    ),
    certifications: (
      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-medium">Certifications (one per line)</label>
        <textarea
          value={data.certifications.join("\n")}
          onChange={(e) =>
            update({ certifications: e.target.value.split("\n").filter(Boolean) })
          }
          placeholder="AWS Certified Solutions Architect – 2023&#10;Google Cloud Professional Data Engineer&#10;PMP Certified"
          rows={5}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all resize-none"
        />
      </div>
    ),
  };

  return (
    <div className="flex gap-5">
      {/* Sidebar nav */}
      <div className="w-48 shrink-0">
        <div className="sticky top-24 space-y-1">
          {sectionOrder.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === s
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"
              }`}
            >
              <span>{sectionIcons[s]}</span>
              {sectionLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 min-w-0">
        <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <span>{sectionIcons[activeSection]}</span>
            {sectionLabels[activeSection]}
          </h2>
          {sectionContent[activeSection]}
        </div>
      </div>
    </div>
  );
}