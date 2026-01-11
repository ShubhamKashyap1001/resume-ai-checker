import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/parser";
import { analyzeResume } from "@/lib/ai";
import { ruleScore } from "@/lib/rules";
import { calculateFinalScore } from "@/lib/scoring";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest){
    const formData = await req.formData();

    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    const buffer = Buffer.from(await file.arrayBuffer());
    const resumeText = await parseResume(buffer, file.type);

    const aiResult = await analyzeResume(resumeText, jobDescription);
    const rules = ruleScore(resumeText);

    const { finalScore, rating } = calculateFinalScore({
        ...aiResult,
        ruleScore: rules,
    });

    const resume = await prisma.resume.create({
        data: {
            resumeText,
            jobDescription,
            ...aiResult,
            ruleScore: rules,
            finalScore,
            rating,
        },
    });

    return NextResponse.json({ id: resume.id })
}