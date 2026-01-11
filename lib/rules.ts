export function ruleScore(resumeText: string) {
  let score = 0;

  if (/skills/i.test(resumeText)) score += 3;
  if (/project/i.test(resumeText)) score += 2;
  if (resumeText.length > 1500) score += 3;
  if (/@/.test(resumeText)) score += 2;

  return score;
}
