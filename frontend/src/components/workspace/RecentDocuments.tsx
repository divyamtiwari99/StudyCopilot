import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

import type {
  UploadedDocument,
} from "@/features/dashboard/services/document.service";

interface Props {
  documents: UploadedDocument[];
}

export default function RecentDocuments({
  documents,
}: Props) {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        sm:p-7
      "
      style={{
        background:
          "color-mix(in srgb,var(--surface) 96%,transparent)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          blur-3xl
          opacity-10
        "
        style={{
          background: "var(--accent-color)",
        }}
      />

      <div className="relative z-10 mb-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
              "
              style={{
                color: "var(--text)",
              }}
            >
              Continue Learning
            </h2>

            <p
              className="
                mt-2
                text-sm
              "
              style={{
                color: "var(--muted)",
              }}
            >
              Resume your recently uploaded study material.
            </p>
          </div>

          {documents.length > 0 && (
            <span
              className="
                hidden
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-semibold
                sm:inline-flex
              "
              style={{
                color: "var(--accent-color)",
                background:
                  "color-mix(in srgb,var(--accent-color) 8%,transparent)",
                borderColor:
                  "color-mix(in srgb,var(--accent-color) 20%,var(--border))",
              }}
            >
              {documents.length}{" "}
              {documents.length === 1
                ? "document"
                : "documents"}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 space-y-3">
        {documents.length === 0 && (
          <div
            className="
              rounded-3xl
              border
              border-dashed
              p-10
              text-center
            "
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb,var(--surfaceHover) 40%,transparent)",
            }}
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
              "
              style={{
                background:
                  "color-mix(in srgb,var(--accent-color) 8%,transparent)",
                borderColor:
                  "color-mix(in srgb,var(--accent-color) 15%,var(--border))",
              }}
            >
              <FileText
                size={34}
                style={{
                  color: "var(--muted)",
                }}
              />
            </div>

            <h3
              className="
                mt-4
                text-lg
                font-semibold
              "
              style={{
                color: "var(--text)",
              }}
            >
              No documents yet
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
              "
              style={{
                color: "var(--muted)",
              }}
            >
              Upload your first document to start learning.
            </p>
          </div>
        )}

        {documents.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() =>
              navigate(
                `/dashboard/chat/${doc.id}`,
              )
            }
            className="
              group
              relative
              flex
              w-full
              items-center
              justify-between
              gap-4
              overflow-hidden
              rounded-2xl
              border
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
            "
            style={{
              background:
                "color-mix(in srgb,var(--surfaceHover) 35%,transparent)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor =
                "color-mix(in srgb,var(--accent-color) 35%,var(--border))";
              event.currentTarget.style.boxShadow =
                "var(--shadow-hover)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor =
                "var(--border)";
              event.currentTarget.style.boxShadow =
                "var(--shadow-card)";
            }}
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                blur-2xl
                opacity-0
                transition-opacity
                duration-300
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
                min-w-0
                items-center
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  background:
                    "color-mix(in srgb,var(--accent-color) 10%,transparent)",
                  borderColor:
                    "color-mix(in srgb,var(--accent-color) 18%,var(--border))",
                }}
              >
                <FileText
                  size={21}
                  style={{
                    color: "var(--accent-color)",
                  }}
                />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    font-semibold
                  "
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {doc.title}
                </h3>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-sm
                  "
                >
                  {doc.status === "ready" && (
                    <>
                      <CheckCircle2
                        size={15}
                        style={{
                          color:
                            "var(--success)",
                        }}
                      />

                      <span
                        style={{
                          color:
                            "var(--success)",
                        }}
                      >
                        Ready
                      </span>
                    </>
                  )}

                  {(doc.status === "processing" ||
                    doc.status === "uploading") && (
                    <>
                      <Clock3
                        size={15}
                        style={{
                          color:
                            "var(--warning)",
                        }}
                      />

                      <span
                        style={{
                          color:
                            "var(--warning)",
                        }}
                      >
                        Processing
                      </span>
                    </>
                  )}

                  {doc.status === "failed" && (
                    <>
                      <XCircle
                        size={15}
                        style={{
                          color:
                            "var(--danger)",
                        }}
                      />

                      <span
                        style={{
                          color:
                            "var(--danger)",
                        }}
                      >
                        Failed
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <span
              className="
                relative
                z-10
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                group-hover:translate-x-1
              "
              style={{
                borderColor:
                  "var(--border)",
                backgroundColor:
                  "var(--surface)",
                color: "var(--muted)",
              }}
            >
              <ArrowRight size={17} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}