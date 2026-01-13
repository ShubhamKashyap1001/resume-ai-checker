/*
  Warnings:

  - You are about to alter the column `ruleScore` on the `Resume` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "finalVerdict" TEXT,
ADD COLUMN     "improvementSuggestions" TEXT[],
ADD COLUMN     "missingSkills" TEXT[],
ADD COLUMN     "strengths" TEXT[],
ADD COLUMN     "weaknesses" TEXT[],
ALTER COLUMN "ruleScore" SET DATA TYPE INTEGER;
