import { open } from "node:fs/promises";
import { ValidationError } from "../errors/validation.error.js";

export async function validateFileSignature(filePath: string, mimeType: string): Promise<void> {
  const handle = await open(filePath, "r");
  try {
    const header = Buffer.alloc(16);
    const { bytesRead } = await handle.read(header, 0, header.length, 0);
    const bytes = header.subarray(0, bytesRead);
    const isPdf = bytes.subarray(0, 5).toString("ascii") === "%PDF-";
    const isZip = bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
    const isPng = bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const isWebp = bytes.length >= 12 && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";

    if (mimeType === "application/pdf" && !isPdf) throw new ValidationError("The uploaded file is not a valid PDF.");
    if (mimeType.includes("wordprocessingml") && !isZip) throw new ValidationError("The uploaded file is not a valid DOCX file.");
    if (mimeType === "image/png" && !isPng) throw new ValidationError("The uploaded file is not a valid PNG image.");
    if (mimeType === "image/jpeg" && !isJpeg) throw new ValidationError("The uploaded file is not a valid JPEG image.");
    if (mimeType === "image/webp" && !isWebp) throw new ValidationError("The uploaded file is not a valid WebP image.");
  } finally {
    await handle.close();
  }
}
