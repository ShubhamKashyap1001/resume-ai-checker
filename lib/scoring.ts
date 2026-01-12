export function calculateFinalScore(data: {
  skillMatch: number;
  experienceScore: number;
  atsScore: number;
  grammarScore: number;
  ruleScore: number;
}) {
  const finalScore =
    data.skillMatch * 10 * 0.3 +
    data.experienceScore * 10 * 0.25 +
    data.atsScore * 10 * 0.2 +
    data.grammarScore * 10 * 0.15 +
    data.ruleScore * 10 * 0.1;

  let rating = "❌ Poor";
  if (finalScore >= 85) rating = "⭐⭐⭐⭐⭐ Excellent";
  else if (finalScore >= 70) rating = "⭐⭐⭐⭐ Good";
  else if (finalScore >= 55) rating = "⭐⭐⭐ Average";
  else if (finalScore >= 40) rating = "⭐ Needs Improvement";

  return { finalScore, rating };
}
