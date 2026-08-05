import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

import type { UploadedDocument } from "@/features/dashboard/services/document.service";

interface Props {
  documents: UploadedDocument[];
}

export default function RecentDocuments({
  documents,
}: Props) {
  const navigate = useNavigate();

  return (
    <section className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-3xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Continue Learning
          </h2>

          <p className="mt-2 text-slate-400">
            Resume your recently uploaded study material.
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {documents.length === 0 && (

          <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">

            <FileText
              size={42}
              className="mx-auto text-slate-500"
            />

            <h3 className="mt-5 text-xl font-semibold text-white">
              No documents yet
            </h3>

            <p className="mt-2 text-slate-400">
              Upload your first document to start learning.
            </p>

          </div>

        )}

        {documents.map((doc) => (

          <button
            key={doc.id}
            onClick={() =>
              navigate(`/dashboard/chat/${doc.id}`)
            }
            className="group flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05]"
          >

            <div className="flex items-center gap-5">

              <div className="rounded-2xl bg-indigo-500/10 p-3">

                <FileText
                  size={22}
                  className="text-indigo-400"
                />

              </div>

              <div className="text-left">

                <h3 className="font-semibold text-white">
                  {doc.title}
                </h3>

                <div className="mt-2 flex items-center gap-3 text-sm">

                  {doc.status === "ready" && (
                    <>
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400"
                      />

                      <span className="text-emerald-400">
                        Ready
                      </span>
                    </>
                  )}

                  {(doc.status === "processing" ||
                    doc.status === "uploading") && (
                    <>
                      <Clock3
                        size={16}
                        className="text-yellow-400"
                      />

                      <span className="text-yellow-400">
                        Processing
                      </span>
                    </>
                  )}

                  {doc.status === "failed" && (
                    <>
                      <XCircle
                        size={16}
                        className="text-red-400"
                      />

                      <span className="text-red-400">
                        Failed
                      </span>
                    </>
                  )}

                </div>

              </div>

            </div>

            <ArrowRight
              className="transition group-hover:translate-x-1"
            />

          </button>

        ))}

      </div>

    </section>
  );
}