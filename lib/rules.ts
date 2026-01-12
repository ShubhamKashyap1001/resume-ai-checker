export function ruleScore(resumeText: string) {
  let score = 0;

  if (/skills/i.test(resumeText)) score += 3;
  if (/projects?/i.test(resumeText)) score += 3;
  if (resumeText.length > 1200) score += 4;
  if (/@\w+\.\w+/.test(resumeText)) score += 2;

  return score;
}
