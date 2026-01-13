export function calculateFinalScore(data: {
  skillMatch: number;       
  experienceScore: number;  
  atsScore: number;         
  grammarScore: number;     
  ruleScore: number;        
}) {
  const finalScore =
    data.skillMatch * 3 +          // 30%
    data.experienceScore * 2.5 +   // 25%
    data.atsScore * 2 +            // 20%
    data.grammarScore * 1.5 +      // 15%
    data.ruleScore * 1;            // 10%

  const roundedScore = Math.round(finalScore);

  let rating = "❌ Poor";
  if (roundedScore >= 85) rating = "⭐⭐⭐⭐⭐ Excellent";
  else if (roundedScore >= 70) rating = "⭐⭐⭐⭐ Good";
  else if (roundedScore >= 55) rating = "⭐⭐⭐ Average";
  else if (roundedScore >= 40) rating = "⭐ Needs Improvement";

  return {
    finalScore: Math.min(Math.max(roundedScore, 1), 100),
    rating,
  };
}
