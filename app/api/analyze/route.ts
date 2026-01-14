// import { NextRequest, NextResponse } from "next/server";
// import { parseResume } from "@/lib/parser";
// import { analyzeResume } from "@/lib/ai";
// import { ruleScore } from "@/lib/rules";
// import { calculateFinalScore } from "@/lib/scoring";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("resume") as File;
//     const jobDescription = formData.get("jobDescription") as string;

//     if (!file || !jobDescription) {
//       return NextResponse.json({ error: "Missing input" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const resumeText = await parseResume(buffer, file.type);

//     const ai = await analyzeResume(resumeText, jobDescription);
//     const rules = ruleScore(resumeText);

//     const { finalScore, rating } = calculateFinalScore({
//       ...ai,
//       ruleScore: rules,
//     });

//     const saved = await prisma.resume.create({
//   data: {
//     resumeText,
//     jobDescription,

//     skillMatch: ai.skillMatch,
//     experienceScore: ai.experienceScore,
//     atsScore: ai.atsScore,
//     grammarScore: ai.grammarScore,

//     strengths: ai.strengths,
//     weaknesses: ai.weaknesses,
//     missingSkills: ai.missingSkills,
//     improvementSuggestions: ai.improvementSuggestions,
//     finalVerdict: ai.finalVerdict,

//     ruleScore: rules,
//     finalScore,
//     rating,
//   },
// });


//     return NextResponse.json({ id: saved.id });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }


//second code

// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// import { prisma } from "@/lib/prisma";
// import { parseResume } from "@/lib/parser";
// import { analyzeResume, analyzeResumeLines } from "@/lib/ai";
// import { ruleScore } from "@/lib/rules";
// import { calculateFinalScore } from "@/lib/scoring";

// export async function POST(req: NextRequest) {
//   try {
    
//     const formData = await req.formData();
//     const file = formData.get("resume") as File | null;
//     const jobDescription = formData.get("jobDescription") as string | null;

//     if (!file || !jobDescription) {
//       return NextResponse.json(
//         { error: "Resume file or job description missing" },
//         { status: 400 }
//       );
//     }

    
//     const buffer = Buffer.from(await file.arrayBuffer());

    
//     const uploadDir = path.join(process.cwd(), "public/uploads");

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const safeFileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
//     const filePath = path.join(uploadDir, safeFileName);

//     await fs.promises.writeFile(filePath, buffer);

//     const resumePdfUrl = `/uploads/${safeFileName}`;

    
//     const resumeText = await parseResume(buffer, file.type);

//     if (!resumeText || resumeText.trim().length === 0) {
//       return NextResponse.json(
//         { error: "Unable to extract resume text" },
//         { status: 400 }
//       );
//     }

    
//       // AI ANALYSIS
    
//     const ai = await analyzeResume(resumeText, jobDescription);
//     const rules = ruleScore(resumeText);

    
//     const lineAnalysis = await analyzeResumeLines(resumeText);

    
//     const { finalScore, rating } = calculateFinalScore({
//   skillMatch: ai.skillMatch,
//   experienceScore: ai.experienceScore,
//   atsScore: ai.atsScore,
//   grammarScore: ai.grammarScore,
//   ruleScore: rules,
//   missingSkills: ai.missingSkills,
//   weaknesses: ai.weaknesses,
// });


    
//     const saved = await prisma.resume.create({
//       data: {
//         resumeText,
//         rawText: resumeText,
//         resumePdfUrl,

//         jobDescription,

//         skillMatch: ai.skillMatch,
//         experienceScore: ai.experienceScore,
//         atsScore: ai.atsScore,
//         grammarScore: ai.grammarScore,

//         strengths: ai.strengths,
//         weaknesses: ai.weaknesses,
//         missingSkills: ai.missingSkills,
//         improvementSuggestions: ai.improvementSuggestions,
//         finalVerdict: ai.finalVerdict,

//         ruleScore: rules,
//         finalScore,
//         rating,
//         lineAnalysis,
//       },
//     });

  
//     return NextResponse.json({ id: saved.id });
//   } catch (error: any) {
//     console.error("ANALYZE API ERROR:", error);

//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { prisma } from "@/lib/prisma";
import { parseResume } from "@/lib/parser";
import { analyzeResume, analyzeResumeLines } from "@/lib/ai";
import { ruleScore } from "@/lib/rules";
import { calculateFinalScore } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Resume file or job description missing" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Upload PDF to Vercel Blob (FIX)
    const blob = await put(
      `resumes/${Date.now()}-${file.name}`,
      buffer,
      {
        access: "public",
        contentType: file.type,
      }
    );

    const resumePdfUrl = blob.url;

    // Parse resume text
    const resumeText = await parseResume(buffer, file.type);

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: "Unable to extract resume text" },
        { status: 400 }
      );
    }

    // AI analysis
    const ai = await analyzeResume(resumeText, jobDescription);
    const rules = ruleScore(resumeText);
    const lineAnalysis = await analyzeResumeLines(resumeText);

    // Final score
    const { finalScore, rating } = calculateFinalScore({
      skillMatch: ai.skillMatch,
      experienceScore: ai.experienceScore,
      atsScore: ai.atsScore,
      grammarScore: ai.grammarScore,
      ruleScore: rules,
      missingSkills: ai.missingSkills,
      weaknesses: ai.weaknesses,
    });

    // Save to DB
    const saved = await prisma.resume.create({
      data: {
        resumeText,
        rawText: resumeText,
        resumePdfUrl,

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
        lineAnalysis,
      },
    });

    return NextResponse.json({ id: saved.id });
  } catch (error: any) {
    console.error("ANALYZE API ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
