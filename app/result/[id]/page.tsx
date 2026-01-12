import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Result({ params }: PageProps) {
  // ✅ UNWRAP params FIRST
  const { id } = await params;

  const resumeId = Number(id);

  if (Number.isNaN(resumeId)) {
    return <div>Invalid Resume ID</div>;
  }

  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
  });

  if (!resume) {
    return <div>Not Found</div>;
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resume Result</h1>
      <p>Final Score: {resume.finalScore.toFixed(2)}</p>
      <p>Rating: {resume.rating}</p>
    </main>
  );
}
