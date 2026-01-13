import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/parser";
import { analyzeResume } from "@/lib/ai";
import { ruleScore } from "@/lib/rules";
import { calculateFinalScore } from "@/lib/scoring";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const resumeText = await parseResume(buffer, file.type);

    const ai = await analyzeResume(resumeText, jobDescription);
    const rules = ruleScore(resumeText);

    const { finalScore, rating } = calculateFinalScore({
      ...ai,
      ruleScore: rules,
    });

    const saved = await prisma.resume.create({
  data: {
    resumeText,
    jobDescription,

    skillMatch: ai.skillMatch,
    experienceScore: ai.experienceScore,
    atsScore: ai.atsScore,
    grammarScore: ai.grammarScore,

    strengths: ai.strengths,
    weaknesses: ai.weaknesses,
    missingSkills: ai.missingSkills,
    improvementSuggestions: ai.improvementSuggestions,
    finalVerdict: ai.finalVerdict,

    ruleScore: rules,
    finalScore,
    rating,
  },
});


    return NextResponse.json({ id: saved.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
