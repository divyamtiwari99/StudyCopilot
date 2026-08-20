import { open } from "node:fs/promises";

const signatures: Record<string, Buffer[]> = {
  "application/pdf": [Buffer.from("%PDF-")],
  "image/png": [Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])],
  "image/jpeg": [Buffer.from([0xff, 0xd8, 0xff])],
  "image/webp": [Buffer.from("RIFF"), Buffer.from("WEBP")],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [Buffer.from("PK")],
};

function startsWith(buffer: Buffer, signature: Buffer) {
  return buffer.subarray(0, signature.length).equals(signature);
}

export async function validateFileSignature(filePath: string, mimeType: string): Promise<void> {
  if (mimeType === "text/plain" || mimeType === "text/markdown") return;
  const handle = await open(filePath, "r");
  try {
    const buffer = Buffer.alloc(12);
    await handle.read(buffer, 0, buffer.length, 0);
    if (mimeType === "image/webp") {
      if (!startsWith(buffer, Buffer.from("RIFF")) || !buffer.subarray(8, 12).equals(Buffer.from("WEBP"))) {
        throw new Error("The uploaded image content does not match its file type.");
      }
      return;
    }
    const allowed = signatures[mimeType];
    if (!allowed?.some((signature) => startsWith(buffer, signature))) {
      throw new Error("The uploaded file content does not match its file type.");
    }
  } finally {
    await handle.close();
  }
}
