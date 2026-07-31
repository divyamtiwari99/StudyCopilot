import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
} from "lucide-react";

import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";

interface UploadZoneProps {
  onFilesSelected?: (files: File[]) => void;
}

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed";
}

export default function UploadZone({
  onFilesSelected,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const [uploads, setUploads] = useState<UploadItem[]>([]);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;

    const pdfs = Array.from(selected).filter(
      (file) => file.type === "application/pdf"
    );

    if (!pdfs.length) return;

    const queue: UploadItem[] = pdfs.map((file) => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: "uploading",
    }));

    setUploads((prev) => [...prev, ...queue]);

    onFilesSelected?.(pdfs);
  }

  useEffect(() => {
    if (!uploads.length) return;

    const timer = setInterval(() => {
      setUploads((prev) =>
        prev.map((upload) => {
          if (upload.status === "completed") {
            return upload;
          }

          const next = Math.min(
            upload.progress + Math.random() * 15,
            100
          );

          return {
            ...upload,
            progress: next,
            status: next >= 100 ? "completed" : "uploading",
          };
        })
      );
    }, 250);

    return () => clearInterval(timer);
  }, [uploads.length]);

  return (
    <GlassCard className="overflow-hidden p-6">
      <motion.div
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-3xl border-2 border-dashed transition-all duration-300 ${
          dragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <input
          ref={inputRef}
          hidden
          multiple
          accept=".pdf"
          type="file"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center px-10 py-16 text-center">
          <div className="mb-6 rounded-full bg-indigo-500/10 p-5 text-indigo-400">
            <UploadCloud size={42} />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Drag & Drop your PDFs
          </h2>

          <p className="mt-3 max-w-xl text-sm text-white/50">
            Upload PDFs to StudyCopilot and prepare them for
            AI Chat, Flashcards, Notes and Quiz generation.
          </p>

          <Button
            className="mt-8"
            onClick={() => inputRef.current?.click()}
          >
            Choose PDF
          </Button>
        </div>
      </motion.div>

      {uploads.length > 0 && (
        <div className="mt-8 space-y-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {upload.file.name}
                    </p>

                    <p className="text-sm text-white/40">
                      {(
                        upload.file.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>
                  </div>
                </div>

                {upload.status === "completed" ? (
                  <CheckCircle2
                    className="text-green-500"
                    size={22}
                  />
                ) : (
                  <button
                    onClick={() =>
                      setUploads((prev) =>
                        prev.filter(
                          (item) =>
                            item.id !== upload.id
                        )
                      )
                    }
                    className="rounded-xl p-2 hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs text-white/50">
                  <span>
                    {upload.status === "completed"
                      ? "Completed"
                      : "Uploading..."}
                  </span>

                  <span>
                    {Math.floor(upload.progress)}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                    style={{
                      width: `${upload.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}