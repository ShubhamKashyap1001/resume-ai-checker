import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Result({ params }: PageProps) {
  const { id } = await params;
  const resume = await prisma.resume.findUnique({
    where: { id: Number(id) },
  });

  if (!resume) return <div>Not Found</div>;

  const isStrong = resume.finalScore >= 75;

  return (
    <main className="max-w-4xl mx-auto p-10 space-y-8">
      {/* HEADER */}
      <section className="p-6 border rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Resume Analysis Result</h1>
        <p className="text-lg">
          Final Score: <b>{resume.finalScore.toFixed(1)}</b> / 100
        </p>
        <p className="mt-2 font-semibold">
          {isStrong
            ? "🎉 Congratulations! Your resume is strong and job-ready."
            : "⚠️ Your resume needs improvement to be shortlisted."}
        </p>
      </section>

      {/* STRENGTHS */}
      <Section title="✅ Strengths" items={resume.strengths} />

      {/* WEAKNESSES */}
      <Section title="❌ Mistakes / Weak Areas" items={resume.weaknesses} />

      {/* MISSING SKILLS */}
      <Section title="📌 Missing Skills" items={resume.missingSkills} />

      {/* IMPROVEMENTS */}
      <Section
        title="📈 How You Can Improve Your Resume"
        items={resume.improvementSuggestions}
      />

      {/* FINAL VERDICT */}
      <section className="p-6 border rounded-lg bg-gray-900">
        <h2 className="text-xl font-bold mb-2">🧠 Final Verdict</h2>
        <p>{resume.finalVerdict}</p>
      </section>
    </main>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <ul className="list-disc pl-6 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
