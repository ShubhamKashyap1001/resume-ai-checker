import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeResume(
    resumeText: string,
    jobDescription: string
){
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    });

    const prompt = `You are an ATS resume analyzer. Return ONLY valid JSON.
    {
        "skillMatch": number,
        "experienceScore" : number,
        "atsScore": number,
        "grammarScore": number
    }
        
    Resume:${resumeText}
    Job Description:${jobDescription}    
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g,"").trim();
    return JSON.parse(clean);
}