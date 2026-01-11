const { PDFParse } = require('pdf-parse');
import mammoth from "mammoth";

export async function parseResume(buffer: Buffer, type: string) {
    if (type === "application/pdf") {
        const data = await PDFParse(buffer);
        return data.text;
    }

    if (
        type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    }

    throw new Error("Unsupported file type");
}
