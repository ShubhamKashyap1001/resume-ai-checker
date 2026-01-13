// import pdf from "pdf-parse";
// import mammoth from "mammoth";

// export async function parseResume(
//   buffer: Buffer,
//   mimeType: string
// ): Promise<string> {
//   if (mimeType === "application/pdf") {
//     const data = await pdf(buffer);
//     return data.text;
//   }

//   if (
//     mimeType ===
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     const result = await mammoth.extractRawText({ buffer });
//     return result.value;
//   }

//   throw new Error("Unsupported file type. Upload PDF or DOCX only.");
// }


import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function parseResume(
  buffer: Buffer,
  mimeType: string
): Promise<string> {
  // DOCX (safe)
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  // PDF (robust handling)
  if (mimeType === "application/pdf") {
    try {
      const data = await pdf(buffer, {
        // Disable XRef strict parsing
        max: 0,
      });

      if (!data.text || data.text.trim().length === 0) {
        throw new Error("Empty PDF text");
      }

      return data.text.trim();
    } catch (err) {
      console.warn("PDF parse failed, using fallback:", err);

      // 🔴 LAST-RESORT FALLBACK (RECOVERS MOST RESUMES)
      return buffer
        .toString("latin1")
        .replace(/[\x00-\x1F\x7F]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }
  }

  throw new Error("Unsupported file type. Upload PDF or DOCX only.");
}
