// import { prisma } from "@/lib/prisma";

// type PageProps = {
//   params: Promise<{ id: string }>;
// };

// export default async function Result({ params }: PageProps) {
//   const { id } = await params;
//   const resume = await prisma.resume.findUnique({
//     where: { id: Number(id) },
//   });

//   if (!resume) return <div>Not Found</div>;

//   const isStrong = resume.finalScore >= 75;

//   return (
//     <main className="max-w-4xl mx-auto p-10 space-y-8">
//       {/* HEADER */}
//       <section className="p-6 border rounded-lg">
//         <h1 className="text-3xl font-bold mb-2">Resume Analysis Result</h1>
//         <p className="text-lg">
//           Final Score: <b>{resume.finalScore.toFixed(1)}</b> / 100
//         </p>
//         <p className="mt-2 font-semibold">
//           {isStrong
//             ? "🎉 Congratulations! Your resume is strong and job-ready."
//             : "⚠️ Your resume needs improvement to be shortlisted."}
//         </p>
//       </section>

//       {/* STRENGTHS */}
//       <Section title="✅ Strengths" items={resume.strengths} />

//       {/* WEAKNESSES */}
//       <Section title="❌ Mistakes / Weak Areas" items={resume.weaknesses} />

//       {/* MISSING SKILLS */}
//       <Section title="📌 Missing Skills" items={resume.missingSkills} />

//       {/* IMPROVEMENTS */}
//       <Section
//         title="📈 How You Can Improve Your Resume"
//         items={resume.improvementSuggestions}
//       />

//       {/* FINAL VERDICT */}
//       <section className="p-6 border rounded-lg bg-gray-900">
//         <h2 className="text-xl font-bold mb-2">🧠 Final Verdict</h2>
//         <p>{resume.finalVerdict}</p>
//       </section>
//     </main>
//   );
// }

// function Section({
//   title,
//   items,
// }: {
//   title: string;
//   items: string[];
// }) {
//   if (!items || items.length === 0) return null;

//   return (
//     <section className="p-6 border rounded-lg">
//       <h2 className="text-xl font-bold mb-3">{title}</h2>
//       <ul className="list-disc pl-6 space-y-1">
//         {items.map((item, i) => (
//           <li key={i}>{item}</li>
//         ))}
//       </ul>
//     </section>
//   );
// }


//second code

import { prisma } from "@/lib/prisma";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultPage({ params }: PageProps) {
  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: { id: Number(id) },
  });

  if (!resume) {
    return <div className="p-10 text-white">Not Found</div>;
  }

  // ✅ DEFINE THIS (from old code)
  const isStrong = resume.finalScore >= 75;

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <header>
          <h1 className="text-2xl font-semibold">
            Resume Score Overview
          </h1>
          <p className="text-gray-400 mt-1">
            High-level summary of your resume performance
          </p>
        </header>

        {/* SCORE CARD */}
        <section className="bg-[#11162a] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-6">
            {/* SCORE CIRCLE */}
            <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center">
              <span className="text-3xl font-bold">
                {resume.finalScore.toFixed(0)}
              </span>
            </div>

            {/* SCORE TEXT */}
            <div>
              <p className="text-lg font-semibold">
                Your resume scored {resume.finalScore.toFixed(0)} / 100
              </p>

              <p className="text-gray-400 mt-2 max-w-xl">
                This score reflects ATS compatibility, skills alignment,
                and overall resume quality.
              </p>

              {/* ✅ CONGRATULATION / WARNING TEXT (MERGED) */}
              <p
                className={`mt-3 font-semibold ${
                  isStrong ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {isStrong
                  ? "🎉 Congratulations! Your resume is strong and job-ready."
                  : "⚠️ Your resume needs improvement to be shortlisted."}
              </p>
            </div>
          </div>
        </section>

        {/* NEXT */}
        <div className="flex justify-end">
          <Link
            href={`/result/${resume.id}/insights`}
            className="bg-white text-black px-6 py-2 rounded-md font-medium"
          >
            View Detailed Insights →
          </Link>
        </div>
      </div>
    </main>
  );
}

