import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { toast } from "sonner";
import { FileText, ImagePlus, Loader2, Paperclip, SendHorizonal, X } from "lucide-react";

interface Props {
  loading: boolean;
  onSend: (question: string, attachments?: File[]) => Promise<void>;
}

const documentAccept = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
].join(",");
const imageAccept = "image/png,image/jpeg,image/webp";
const MAX_FILES = 4;
const MAX_IMAGES = 2;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 50 * 1024 * 1024;

export default function ChatInput({ loading, onSend }: Props) {
  const [question, setQuestion] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const documentInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const file of attachments) {
      if (file.type.startsWith("image/")) next[`${file.name}-${file.size}-${file.lastModified}`] = URL.createObjectURL(file);
    }
    setPreviewUrls(next);
    return () => Object.values(next).forEach((url) => URL.revokeObjectURL(url));
  }, [attachments]);

  function chooseAttachments(files: FileList | null) {
    if (!files?.length) return;
    const incoming = Array.from(files);
    const next = [...attachments];

    for (const file of incoming) {
      if (next.length >= MAX_FILES) {
        toast.error(`You can attach up to ${MAX_FILES} files per message.`);
        break;
      }
      const isImage = file.type.startsWith("image/");
      if (isImage && file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} is larger than 10 MB.`);
        continue;
      }
      if (!isImage && file.size > MAX_DOCUMENT_SIZE) {
        toast.error(`${file.name} is larger than 50 MB.`);
        continue;
      }
      if (isImage && next.filter((item) => item.type.startsWith("image/")).length >= MAX_IMAGES) {
        toast.error("You can attach up to 2 images per message.");
        continue;
      }
      if (next.some((item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) continue;
      next.push(file);
    }

    setAttachments(next);
    setMenuOpen(false);
  }

  function removeAttachment(index: number) {
    setAttachments((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function submitMessage() {
    const text = question.trim();
    if ((!text && !attachments.length) || loading) return;
    const nextAttachments = [...attachments];
    const nextText = text;
    setQuestion("");
    setAttachments([]);
    setMenuOpen(false);
    try {
      await onSend(nextText, nextAttachments);
    } catch (error) {
      setQuestion(nextText);
      setAttachments(nextAttachments);
      const response = (error as { response?: { data?: { message?: unknown } } }).response;
      const message = typeof response?.data?.message === "string" ? response.data.message : "Unable to send your message. Please try again.";
      toast.error(message);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await submitMessage();
  }

  async function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await submitMessage();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[30px] border p-3 backdrop-blur-3xl transition-all duration-300 sm:p-4" style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}>
      {attachments.length > 0 && (
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {attachments.map((attachment, index) => {
            const previewUrl = previewUrls[`${attachment.name}-${attachment.size}-${attachment.lastModified}`];
            return (
              <div key={`${attachment.name}-${attachment.size}-${attachment.lastModified}`} className="relative flex w-64 shrink-0 items-center gap-3 rounded-2xl border p-2.5" style={{ borderColor: "var(--border)", background: "var(--surfaceHover)" }}>
                {previewUrl ? (
                  <img src={previewUrl} alt={attachment.name} className="h-16 w-16 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--accent-color)" }}>
                    <FileText size={26} />
                  </div>
                )}
                <div className="min-w-0 flex-1 pr-5">
                  <p className="truncate text-sm font-semibold" style={{ color: "var(--text)" }}>{attachment.name}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                    {attachment.type.startsWith("image/") ? "Image" : "Document"} · {Math.max(1, Math.round(attachment.size / 1024))} KB
                  </p>
                </div>
                <button type="button" aria-label={`Remove ${attachment.name}`} onClick={() => removeAttachment(index)} className="absolute right-2 top-2 rounded-lg p-1.5 hover:bg-black/5" style={{ color: "var(--muted)" }}>
                  <X size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-end gap-2 sm:gap-3">
        <div className="relative shrink-0">
          <button type="button" aria-label="Add attachment" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)} disabled={loading} className="flex h-12 w-12 items-center justify-center rounded-2xl border transition hover:-translate-y-0.5 disabled:opacity-50 sm:h-14 sm:w-14" style={{ borderColor: "var(--border)", background: "var(--surfaceHover)", color: "var(--accent-color)" }}>
            <Paperclip size={20} />
          </button>
          {menuOpen && (
            <div className="absolute bottom-full left-0 z-50 mb-2 w-60 overflow-hidden rounded-2xl border p-2 shadow-2xl" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <button type="button" onClick={() => documentInputRef.current?.click()} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-[var(--surfaceHover)]" style={{ color: "var(--text)" }}>
                <FileText size={18} style={{ color: "var(--accent-color)" }} />
                <span><strong className="block">Add documents</strong><span className="text-xs" style={{ color: "var(--muted)" }}>PDF, DOCX, TXT or Markdown</span></span>
              </button>
              <button type="button" onClick={() => imageInputRef.current?.click()} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-[var(--surfaceHover)]" style={{ color: "var(--text)" }}>
                <ImagePlus size={18} style={{ color: "var(--accent-color)" }} />
                <span><strong className="block">Add images</strong><span className="text-xs" style={{ color: "var(--muted)" }}>PNG, JPEG or WebP · up to 2</span></span>
              </button>
            </div>
          )}
          <input ref={documentInputRef} type="file" accept={documentAccept} multiple className="hidden" onChange={(event: ChangeEvent<HTMLInputElement>) => { chooseAttachments(event.target.files); event.target.value = ""; }} />
          <input ref={imageInputRef} type="file" accept={imageAccept} multiple className="hidden" onChange={(event: ChangeEvent<HTMLInputElement>) => { chooseAttachments(event.target.files); event.target.value = ""; }} />
        </div>

        <textarea rows={2} value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => void handleKeyDown(event)} placeholder={attachments.length ? "Ask about these files..." : "Ask anything..."} className="min-h-[60px] flex-1 resize-none bg-transparent px-1 py-2 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none" style={{ caretColor: "var(--accent-color)" }} />
        <button type="submit" disabled={loading || (!question.trim() && !attachments.length)} aria-label={loading ? "Sending message" : "Send message"} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14" style={{ background: "var(--accent-color)", color: "#ffffff", boxShadow: "0 10px 26px color-mix(in srgb,var(--accent-color) 22%,transparent)" }}>
          {loading ? <Loader2 size={22} className="animate-spin" /> : <SendHorizonal size={22} />}
        </button>
      </div>
    </form>
  );
}
