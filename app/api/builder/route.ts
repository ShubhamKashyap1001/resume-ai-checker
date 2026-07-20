import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { section, content } = await req.json();

    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 });
    }

    const prompts: Record<string, string> = {
      summary: `You are a professional resume writer. Improve the following professional summary to be concise, impactful, and ATS-friendly. Use strong action verbs and quantify achievements where possible. Return only the improved text, no explanation.\n\nOriginal summary:\n${content || "(empty)"}`,

      skills: `You are a career coach. The candidate has listed these skills: ${content || "(none listed)"}. Suggest 8-12 additional relevant technical and soft skills that complement these. Return only a comma-separated list of skill names, no explanation.`,

      default: `You are a professional resume writer. Improve the following resume section (${section}) to be more impactful, specific, and ATS-optimized. Use bullet points starting with strong action verbs. Quantify achievements where possible. Return only the improved text.\n\nOriginal:\n${content || "(empty)"}`,
    };

    const prompt =
      prompts[section.toLowerCase().includes("summary") ? "summary" : section.toLowerCase().includes("skill") ? "skills" : "default"];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const suggestion = result.response.text().trim();

    return NextResponse.json({ suggestion });
  } catch (err: unknown) {
    console.error("Builder AI error:", err);
    const message = err instanceof Error ? err.message : "AI enhancement failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}