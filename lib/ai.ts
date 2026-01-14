// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// // export async function analyzeResume(
// //   resumeText: string,
// //   jobDescription: string
// // ) {
// //   const model = genAI.getGenerativeModel({
// //     model: "gemini-2.5-flash",
// //   });

// //   const prompt = `
// // You are an ATS resume evaluator.

// // Analyze EVERY LINE and EVERY WORD carefully.

// // Return STRICT JSON ONLY:
// // {
// //   "skillMatch": number,
// //   "experienceScore": number,
// //   "atsScore": number,
// //   "grammarScore": number,
// //   "rating": string
// // }

// // Resume:
// // ${resumeText}

// // Job Description:
// // ${jobDescription}
// // `;

// //   const result = await model.generateContent(prompt);
// //   const raw = result.response.text();

// //   const clean = raw.replace(/```json|```/g, "").trim();
// //   return JSON.parse(clean);
// // }


// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function analyzeResume(
//   resumeText: string,
//   jobDescription: string
// ) {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const prompt = `
// You are a senior ATS recruiter.

// Analyze the resume carefully line by line.

// Return STRICT JSON only:
// {
//   "skillMatch": number,
//   "experienceScore": number,
//   "atsScore": number,
//   "grammarScore": number,

//   "strengths": string[],
//   "weaknesses": string[],
//   "missingSkills": string[],
//   "improvementSuggestions": string[],
//   "finalVerdict": string
// }

// Resume:
// ${resumeText}

// Job Description:
// ${jobDescription}
// `;

//   const result = await model.generateContent(prompt);
//   const text = result.response.text();
//   const clean = text.replace(/```json|```/g, "").trim();

//   return JSON.parse(clean);
// }


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
You are a VERY STRICT ATS resume evaluator.

Rules:
- Scores MUST be between 0 and 100
- Average resumes score 40–65
- Strong resumes score 70–85
- Perfect resumes (90+) are EXTREMELY rare
- Penalize missing skills heavily
- Penalize vague bullets
- Penalize lack of metrics

Return STRICT JSON ONLY:
{
  "skillMatch": number,
  "experienceScore": number,
  "atsScore": number,
  "grammarScore": number,

  "strengths": string[],
  "weaknesses": string[],
  "missingSkills": string[],
  "improvementSuggestions": string[],
  "finalVerdict": string
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const clean = result.response.text().replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}


export async function analyzeResumeLines(resumeText: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are ResumeWorded.

Analyze EACH resume bullet separately.

Return STRICT JSON ARRAY only:
[
  {
    "line": "original line",
    "status": "strong | good | weak",
    "reason": "short explanation",
    "improved": "rewritten stronger version"
  }
]

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const clean = result.response.text().replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
