import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an ATS resume evaluator.

Analyze EVERY LINE and EVERY WORD carefully.

Return STRICT JSON ONLY:
{
  "skillMatch": number,
  "experienceScore": number,
  "atsScore": number,
  "grammarScore": number,
  "rating": string
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
