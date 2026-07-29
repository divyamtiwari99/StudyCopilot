export const SupportedMimeTypes = {
  PDF: ["application/pdf"],

  DOCX: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],

  PPTX: [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],

  XLSX: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],

  TXT: ["text/plain"],

  MARKDOWN: ["text/markdown"],

  IMAGE: [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
  ],

  AUDIO: [
    "audio/mpeg",
    "audio/wav",
    "audio/mp4",
  ],

  VIDEO: [
    "video/mp4",
    "video/webm",
    "video/x-matroska",
  ],

  ZIP: [
    "application/zip",
    "application/x-zip-compressed",
  ],
} as const;