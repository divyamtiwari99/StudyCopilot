import {
  useMemo,
  useState,
} from "react";

import {
  Search,
  SlidersHorizontal,
  ArrowDownUp,
} from "lucide-react";

import UploadZone from "@/features/dashboard/components/UploadZone";
import DocumentGrid from "@/components/documents/DocumentGrid";

import {
  useDocuments,
} from "@/features/documents/hooks/useDocuments";

import type {
  Document,
} from "@/components/documents/DocumentCard";

type FilterStatus =
  | "all"
  | "uploading"
  | "processing"
  | "ready"
  | "failed";

type SortType =
  | "newest"
  | "oldest"
  | "name"
  | "size";

export default function DocumentsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDocuments();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<FilterStatus>("all");

  const [
    sort,
    setSort,
  ] = useState<SortType>("newest");

  const documents = data ?? [];

  const filteredDocuments = useMemo(() => {
    let list = [...documents];

    const keyword = search
      .trim()
      .toLowerCase();

    const normalizeStatus = (
      documentStatus: Document["status"],
    ): string => String(documentStatus);

    if (keyword) {
      list = list.filter((doc) =>
        (
          doc.title ??
          doc.originalName
        )
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (status !== "all") {
      list = list.filter(
        (doc) =>
          normalizeStatus(
            doc.status,
          ) === status,
      );
    }

    switch (sort) {
      case "oldest":
        list.sort(
          (a, b) =>
            new Date(
              a.createdAt,
            ).getTime() -
            new Date(
              b.createdAt,
            ).getTime(),
        );
        break;

      case "name":
        list.sort((a, b) =>
          (
            a.title ??
            a.originalName
          ).localeCompare(
            b.title ??
            b.originalName,
          ),
        );
        break;

      case "size":
        list.sort(
          (a, b) =>
            b.size -
            a.size,
        );
        break;

      default:
        list.sort(
          (a, b) =>
            new Date(
              b.createdAt,
            ).getTime() -
            new Date(
              a.createdAt,
            ).getTime(),
        );
    }

    return list;
  }, [
    documents,
    search,
    status,
    sort,
  ]);

  const gridDocuments = useMemo<Document[]>(
    () => {
      return filteredDocuments.map(
        (doc) => {
          return {
            id: doc.id,

            name:
              doc.title ||
              doc.originalName,

            pages: doc.pages ?? 0,

            size: `${(
              doc.size /
              1024 /
              1024
            ).toFixed(2)} MB`,

            uploadedAt:
              new Date(
                doc.createdAt,
              ).toLocaleDateString(),

            status:
              doc.status,
          };
        },
      );
    },
    [filteredDocuments],
  );

  if (isLoading) {
    return (
      <div
        className="space-y-6"
        aria-busy="true"
        aria-label="Loading documents"
      >
        <div
          className="
            h-64
            animate-pulse
            rounded-[32px]
            border
          "
          style={{
            background:
              "var(--surfaceHover)",
            borderColor:
              "var(--border)",
          }}
        />

        <div
          className="
            h-96
            animate-pulse
            rounded-[32px]
            border
          "
          style={{
            background:
              "var(--surfaceHover)",
            borderColor:
              "var(--border)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          p-7
          sm:p-8
        "
        style={{
          background:
            "color-mix(in srgb,var(--surface) 96%,transparent)",
          borderColor:
            "var(--border)",
          boxShadow:
            "var(--shadow-soft)",
        }}
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-64
            w-64
            rounded-full
            blur-3xl
            opacity-10
          "
          style={{
            background:
              "var(--accent-color)",
          }}
        />

        <div className="relative z-10">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-4
              py-2
              text-sm
              font-semibold
            "
            style={{
              color:
                "var(--accent-color)",
              background:
                "color-mix(in srgb,var(--accent-color) 10%,transparent)",
              borderColor:
                "color-mix(in srgb,var(--accent-color) 20%,transparent)",
            }}
          >
            <SlidersHorizontal size={15} />

            Study Library
          </div>

          <h1
            className="
              mt-5
              text-4xl
              font-black
              tracking-tight
              sm:text-5xl
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            Documents
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              sm:text-base
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            Manage your study materials
            and AI documents.
          </p>
        </div>
      </section>

      {/* Upload */}
      <UploadZone />

      {/* Library */}
      <section
        className="
          rounded-[32px]
          border
          p-5
          sm:p-6
        "
        style={{
          background:
            "color-mix(in srgb,var(--surface) 96%,transparent)",
          borderColor:
            "var(--border)",
          boxShadow:
            "var(--shadow-soft)",
        }}
      >
        {/* Toolbar */}
        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}
          <div
            className="
              relative
              w-full
              lg:max-w-md
            "
          >
            <Search
              size={18}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
              "
              style={{
                color:
                  "var(--muted)",
              }}
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search documents..."
              aria-label="Search documents"
              className="
                h-12
                w-full
                rounded-2xl
                border
                pl-11
                pr-4
                text-sm
                outline-none
                transition
              "
              style={{
                background:
                  "var(--surfaceHover)",
                borderColor:
                  "var(--border)",
                color:
                  "var(--text)",
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--accent-color)";

                event.currentTarget.style.boxShadow =
                  "0 0 0 3px color-mix(in srgb,var(--accent-color) 10%,transparent)";
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border)";

                event.currentTarget.style.boxShadow =
                  "none";
              }}
            />
          </div>

          {/* Filters */}
          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {/* Status */}
            <div className="relative">
              <SlidersHorizontal
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  -translate-y-1/2
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              />

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as FilterStatus,
                  )
                }
                aria-label="Filter by status"
                className="
                  h-12
                  rounded-2xl
                  border
                  pl-9
                  pr-4
                  text-sm
                  outline-none
                  transition
                "
                style={{
                  background:
                    "var(--surfaceHover)",
                  borderColor:
                    "var(--border)",
                  color:
                    "var(--text)",
                }}
              >
                <option value="all">
                  All
                </option>

                <option value="ready">
                  Ready
                </option>

                <option value="processing">
                  Processing
                </option>

                <option value="uploading">
                  Uploading
                </option>

                <option value="failed">
                  Failed
                </option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowDownUp
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  -translate-y-1/2
                "
                style={{
                  color:
                    "var(--muted)",
                }}
              />

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value as SortType,
                  )
                }
                aria-label="Sort documents"
                className="
                  h-12
                  rounded-2xl
                  border
                  pl-9
                  pr-4
                  text-sm
                  outline-none
                  transition
                "
                style={{
                  background:
                    "var(--surfaceHover)",
                  borderColor:
                    "var(--border)",
                  color:
                    "var(--text)",
                }}
              >
                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>

                <option value="name">
                  Name
                </option>

                <option value="size">
                  Size
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              p-4
              text-sm
            "
            style={{
              background:
                "color-mix(in srgb,var(--danger) 10%,transparent)",
              borderColor:
                "color-mix(in srgb,var(--danger) 30%,transparent)",
              color:
                "var(--danger)",
            }}
          >
            Failed to load documents.
            Please try again.
          </div>
        )}

        {/* Documents */}
        <DocumentGrid
          documents={gridDocuments}
        />
      </section>
    </div>
  );
}