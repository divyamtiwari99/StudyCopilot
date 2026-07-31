import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CloudUpload,
  FileText,
  Loader2,
} from "lucide-react";

import { uploadDocument } from "../services/document.service";

export default function UploadZone() {
  const [progress, setProgress] = useState(0);

  const [uploading, setUploading] =
    useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }

      try {
        setUploading(true);
        setProgress(0);

        await uploadDocument(
          acceptedFiles[0],
          setProgress,
        );

        alert("Upload Successful");
      } catch (error) {
        console.error(error);

        alert("Upload Failed");
      } finally {
        setUploading(false);
      }
    },
    [],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "text/plain": [".txt"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-[32px] border-2 border-dashed p-12 transition ${
        isDragActive
          ? "border-violet-500 bg-violet-500/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center text-center">
        <CloudUpload className="mb-6 h-14 w-14 text-violet-400" />

        <h2 className="text-3xl font-bold text-white">
          {uploading
            ? "Uploading..."
            : "Upload Document"}
        </h2>

        <p className="mt-3 text-zinc-400">
          Drag & drop or click to upload.
        </p>

        {uploading && (
          <>
            <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-violet-500 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-4 flex items-center gap-3 text-violet-400">
              <Loader2 className="animate-spin" />

              {progress}%
            </div>
          </>
        )}

        {!uploading && (
          <div className="mt-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-5 py-3">
            <FileText className="text-violet-400" />

            <span className="text-white">
              PDF · DOCX · PPTX · TXT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}