import { prisma } from "@/lib/prisma";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReviewPage({ params }: PageProps) {
  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: { id: Number(id) },
  });

  if (!resume) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Resume not found
      </div>
    );
  }

  const analysis =
    (resume.lineAnalysis as {
      line: string;
      status: "strong" | "good" | "weak";
      reason: string;
      improved: string;
    }[]) ?? [];

  return (
    <main className="min-h-screen bg-[#0e1117] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-[260px_1fr] gap-8">

        {/* SIDEBAR */}
        <aside className="bg-[#161b22] text-white p-6 rounded-xl h-fit">
          <p className="text-sm text-gray-400">Overall Score</p>
          <p className="text-4xl font-bold">
            {resume.finalScore.toFixed(0)}
          </p>

          <div className="mt-6 text-sm space-y-2">
            <p className="text-green-400">■ Strong</p>
            <p className="text-yellow-400">■ Needs improvement</p>
            <p className="text-red-400">■ Weak</p>
          </div>

          <Link
            href={`/result/${resume.id}/insights`}
            className="block mt-6 text-sm text-gray-400"
          >
            ← Back to Insights
          </Link>
        </aside>

        {/* REVIEW */}
        <section className="bg-white rounded-xl p-8">
          <h1 className="text-xl font-bold mb-6 text-black">
            Line-by-Line Resume Review
          </h1>

          {analysis.length === 0 ? (
            <p className="text-gray-500">
              Line-by-line analysis not available. Please re-upload resume.
            </p>
          ) : (
            <div className="space-y-4 text-black text-[15px] leading-6">
              {analysis.map((item, i) => (
                <div
                  key={i}
                  className={`p-4 border-l-4 rounded ${
                    item.status === "strong"
                      ? "bg-green-50 border-green-500"
                      : item.status === "good"
                      ? "bg-yellow-50 border-yellow-400"
                      : "bg-red-50 border-red-500"
                  }`}
                >
                  <p className="font-medium">{item.line}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    ❓ {item.reason}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    ✨ Suggested: {item.improved}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
