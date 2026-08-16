import { queryKeys } from "@/lib/queryKeys";

import {
  useCallback,
  useState,
} from "react";

import {
  useDropzone,
} from "react-dropzone";

import {
  toast,
} from "sonner";

import {
  CloudUpload,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  uploadDocument,
} from "../services/document.service";

export default function UploadZone() {
  const queryClient = useQueryClient();

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    uploading,
    setUploading,
  ] = useState(false);

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

        await queryClient.invalidateQueries({
          queryKey: queryKeys.documents(),
        });

        toast.success(
          "Document uploaded successfully!",
        );
      } catch (error) {
        console.error(error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Upload failed. Please try again.",
        );
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [queryClient],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [
        ".pdf",
      ],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "text/plain": [
        ".txt",
      ],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-[36px]
        border-2
        border-dashed
        p-7
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        sm:p-10
        lg:p-12
      "
      style={{
        background:
          isDragActive
            ? "color-mix(in srgb,var(--accent-color) 9%,var(--surface))"
            : "var(--surface)",
        borderColor:
          isDragActive
            ? "var(--accent-color)"
            : "var(--border)",
        boxShadow:
          isDragActive
            ? "var(--shadow-hover)"
            : "var(--shadow-soft)",
      }}
    >
      <input {...getInputProps()} />

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          blur-3xl
          opacity-10
          transition-all
          duration-500
          group-hover:opacity-20
        "
        style={{
          background:
            "var(--accent-color)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -right-20
          h-64
          w-64
          rounded-full
          blur-3xl
          opacity-5
          transition-all
          duration-500
          group-hover:opacity-15
        "
        style={{
          background:
            "var(--accent-color)",
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-widest
          "
          style={{
            color:
              "var(--accent-color)",
            background:
              "color-mix(in srgb,var(--accent-color) 8%,transparent)",
            borderColor:
              "color-mix(in srgb,var(--accent-color) 18%,var(--border))",
          }}
        >
          <Sparkles size={14} />
          AI Study Library
        </div>

        <div
          className="
            relative
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-[28px]
            border
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:-rotate-2
          "
          style={{
            background:
              "color-mix(in srgb,var(--accent-color) 12%,transparent)",
            borderColor:
              isDragActive
                ? "color-mix(in srgb,var(--accent-color) 40%,var(--border))"
                : "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
            color:
              "var(--accent-color)",
          }}
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-2
              rounded-2xl
              border
              opacity-50
            "
            style={{
              borderColor:
                "color-mix(in srgb,var(--accent-color) 20%,transparent)",
            }}
          />

          {uploading ? (
            <Loader2
              size={36}
              className="animate-spin"
            />
          ) : (
            <CloudUpload size={38} />
          )}
        </div>

        <h2
          className="
            mt-7
            text-2xl
            font-bold
            tracking-tight
            sm:text-3xl
          "
          style={{
            color:
              "var(--text)",
          }}
        >
          {uploading
            ? "Uploading..."
            : isDragActive
              ? "Drop your document here"
              : "Upload Document"}
        </h2>

        <p
          className="
            mt-3
            max-w-lg
            text-sm
            leading-7
          "
          style={{
            color:
              "var(--muted)",
          }}
        >
          {uploading
            ? "Your study material is being uploaded. Please keep this window open."
            : isDragActive
              ? "Release the file to start uploading it to StudyCopilot."
              : "Drag & drop your study material here, or click anywhere to browse from your device."}
        </p>

        {uploading && (
          <>
            <div
              className="
                mt-8
                h-3
                w-full
                max-w-xl
                overflow-hidden
                rounded-full
                border
                p-[2px]
              "
              style={{
                background:
                  "var(--surfaceHover)",
                borderColor:
                  "var(--border)",
              }}
            >
              <div
                className="
                  h-full
                  rounded-full
                  transition-all
                  duration-300
                "
                style={{
                  width:
                    `${progress}%`,
                  background:
                    "linear-gradient(90deg,var(--accent-color),color-mix(in srgb,var(--accent-color) 60%,white))",
                }}
              />
            </div>

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
              "
              style={{
                color:
                  "var(--accent-color)",
              }}
            >
              <Loader2
                size={20}
                className="animate-spin"
              />

              <span className="font-semibold">
                {progress}%
              </span>

              <span
                className="text-sm"
                style={{
                  color:
                    "var(--muted)",
                }}
              >
                Uploading your file
              </span>
            </div>
          </>
        )}

        {!uploading && (
          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              gap-4
              sm:flex-row
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                px-5
                py-3
              "
              style={{
                background:
                  "color-mix(in srgb,var(--surfaceHover) 60%,transparent)",
                borderColor:
                  "var(--border)",
              }}
            >
              <FileText
                size={20}
                style={{
                  color:
                    "var(--accent-color)",
                }}
              />

              <span
                className="text-sm font-medium"
                style={{
                  color:
                    "var(--text)",
                }}
              >
                PDF · DOCX · PPTX · TXT
              </span>
            </div>

            <span
              className="
                text-xs
                font-medium
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              Click or drop to upload
            </span>
          </div>
        )}
      </div>
    </div>
  );
}