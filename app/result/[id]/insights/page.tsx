import { prisma } from "@/lib/prisma";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InsightsPage({ params }: PageProps) {
  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: { id: Number(id) },
  });

  if (!resume) {
    return <div className="p-10 text-white">Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">Resume Insights</h1>
        <p className="text-gray-400">
          AI-generated strengths, weaknesses, and improvement areas
        </p>

        <Section title="✅ Strengths" items={resume.strengths} />
        <Section title="❌ Weak Areas / Mistakes" items={resume.weaknesses} />
        <Section title="📌 Missing Skills" items={resume.missingSkills} />
        <Section
          title="📈 Improvement Suggestions"
          items={resume.improvementSuggestions}
        />

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">🧠 Final Verdict</h2>
          <p className="text-gray-300">{resume.finalVerdict}</p>
        </section>

        <div className="flex justify-between pt-6">
          <Link href={`/result/${resume.id}`} className="text-gray-400">
            ← Back to Overview
          </Link>

          <Link
            href={`/result/${resume.id}/review`}
            className="bg-white text-black px-6 py-2 rounded-md"
          >
            View Full Resume Review →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <ul className="space-y-2 text-gray-300">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </section>
  );
}
