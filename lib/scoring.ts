export function calculateFinalScore(data: {
  skillMatch: number;       
  experienceScore: number;  
  atsScore: number;         
  grammarScore: number;     
  ruleScore: number;        
  missingSkills?: string[];
  weaknesses?: string[];
}) {
  // Normalize ruleScore (0–10 → 0–100)
  const normalizedRuleScore = data.ruleScore * 10;

  // ✅ WEIGHTED AVERAGE (REALISTIC)
  let score =
    data.skillMatch * 0.30 +          // 30%
    data.experienceScore * 0.25 +     // 25%
    data.atsScore * 0.20 +            // 20%
    data.grammarScore * 0.15 +        // 15%
    normalizedRuleScore * 0.10;       // 10%

  // 🔴 PENALTIES (THIS MAKES IT REAL)
  if (data.missingSkills) {
    score -= data.missingSkills.length * 4;
  }

  if (data.weaknesses) {
    score -= data.weaknesses.length * 2;
  }

  // Clamp score between 1–100
  score = Math.max(1, Math.min(100, score));

  const roundedScore = Math.round(score);

  let rating = "❌ Poor";
  if (roundedScore >= 85) rating = "⭐⭐⭐⭐⭐ Excellent";
  else if (roundedScore >= 70) rating = "⭐⭐⭐⭐ Good";
  else if (roundedScore >= 55) rating = "⭐⭐⭐ Average";
  else if (roundedScore >= 40) rating = "⭐ Needs Improvement";

  return {
    finalScore: roundedScore,
    rating,
  };
}
