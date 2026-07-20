import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 503 });
    const { latex } = await req.json();
    if (typeof latex !== "string" || latex.length < 20) return NextResponse.json({ error: "Valid LaTeX source is required." }, { status: 400 });
    if (latex.length > 100_000) return NextResponse.json({ error: "LaTeX source is too large." }, { status: 413 });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json", temperature: 0.1 } });
    const prompt = `You are a LaTeX resume compiler. Interpret the complete source below, including custom commands, variables, tables, escaped characters, and resume macros. Do not improve, invent, or rewrite content. Return JSON only:
{"name":"candidate name","headline":"degree or title","contact":[{"label":"visible text","url":"exact href target or empty"}],"sections":[{"title":"section title","entries":[{"heading":"organization/project/degree","technology":"technology stack or other italic heading text","subheading":"role or supporting text","date":"date/location","links":[{"label":"Live, GitHub, LinkedIn, etc.","url":"exact href target"}],"bullets":[{"text":"complete plain text bullet","bold":["each exact phrase originally inside textbf"]}],"details":["other visible line"]}]}]}
Preserve section order and all visible resume content. Preserve text inside LaTeX \\textbf as exact phrases in the matching bold array. Preserve \\emph or italic technology text in the technology field. Every LaTeX \\href{URL}{LABEL} and \\url{URL} MUST be preserved with its exact URL. Put header links in contact and project or profile links in the matching entry links. Preserve mailto: links. Never create, shorten, or alter a URL. Omit LaTeX setup, comments, layout commands, image filenames, and empty values. Convert other LaTeX escapes to normal text.

LATEX SOURCE:
${latex}`;
    const result = await model.generateContent(prompt);
    return NextResponse.json({ compiled: JSON.parse(result.response.text()) });
  } catch (error) {
    console.error("Gemini LaTeX compile error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Gemini could not compile this template." }, { status: 500 });
  }
}
