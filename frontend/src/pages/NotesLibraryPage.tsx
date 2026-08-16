import {
  Search,
  FileText,
  Sparkles,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useAllNotes,
} from "@/features/notes/hooks/useAllNotes";

import NotesCard from "@/features/notes/components/NotesCard";

export default function NotesLibraryPage() {
  const {
    data: notes,
    isLoading,
    isError,
  } = useAllNotes();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    sort,
    setSort,
  ] = useState<
    "latest" | "oldest"
  >("latest");

  const filteredNotes =
    useMemo(() => {
      if (!notes) {
        return [];
      }

      let result = [
        ...notes,
      ];

      if (search.trim()) {
        const keyword =
          search
            .trim()
            .toLowerCase();

        result =
          result.filter(
            (note) =>
              note.title
                .toLowerCase()
                .includes(keyword),
          );
      }

      result.sort(
        (a, b) => {
          const first =
            new Date(
              a.createdAt,
            ).getTime();

          const second =
            new Date(
              b.createdAt,
            ).getTime();

          return sort === "latest"
            ? second - first
            : first - second;
        },
      );

      return result;
    }, [
      notes,
      search,
      sort,
    ]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}

        <div
          className="
            h-16
            w-72
            animate-pulse
            rounded-2xl
          "
          style={{
            background:
              "var(--surfaceHover)",
          }}
        />

        {/* Loading Toolbar */}

        <div
          className="
            h-20
            animate-pulse
            rounded-3xl
          "
          style={{
            background:
              "var(--surfaceHover)",
          }}
        />

        {/* Loading Grid */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-52
                  animate-pulse
                  rounded-3xl
                "
                style={{
                  background:
                    "var(--surfaceHover)",
                }}
              />
            ),
          )}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          rounded-3xl
          border
          p-8
        "
        style={{
          background:
            "color-mix(in srgb,var(--danger) 8%,var(--surface))",

          borderColor:
            "color-mix(in srgb,var(--danger) 25%,var(--border))",

          color:
            "var(--danger)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--danger) 12%,transparent)",
            }}
          >
            <FileText size={19} />
          </div>

          <div>
            <h2 className="font-semibold">
              Failed to load notes
            </h2>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "color-mix(in srgb,var(--danger) 75%,var(--muted))",
              }}
            >
              Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 10%,transparent)",

              borderColor:
                "color-mix(in srgb,var(--accent-color) 20%,var(--border))",

              color:
                "var(--accent-color)",
            }}
          >
            <Sparkles size={24} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              AI Notes Library
            </h1>

            <p
              className="
                mt-1
                text-sm
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              All your AI generated
              study notes.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}

      <div
        className="
          rounded-3xl
          border
          p-5
          backdrop-blur-xl
          transition-all
          duration-300
        "
        style={{
          background:
            "var(--surface)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
          "
        >
          {/* Search */}

          <div
            className="
              flex
              flex-1
              items-center
              gap-3
              rounded-xl
              border
              px-4
              transition-all
              duration-200
            "
            style={{
              background:
                "var(--surfaceHover)",

              borderColor:
                "var(--border)",
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor =
                "color-mix(in srgb,var(--accent-color) 35%,var(--border))";
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor =
                "var(--border)";
            }}
          >
            <Search
              size={18}
              style={{
                color:
                  "var(--muted)",
              }}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value,
                )
              }
              placeholder="Search notes..."
              className="
                w-full
                bg-transparent
                py-3
                text-sm
                outline-none
                placeholder:text-[var(--muted)]
              "
              style={{
                color:
                  "var(--text)",
              }}
            />
          </div>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value as
                  | "latest"
                  | "oldest",
              )
            }
            className="
              rounded-xl
              border
              px-4
              py-3
              text-sm
              outline-none
              transition-all
              duration-200
              [&>option]:bg-[var(--surface)]
              [&>option]:text-[var(--text)]
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
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}

      {filteredNotes.length ===
      0 ? (
        <div
          className="
            rounded-3xl
            border
            p-10
            text-center
          "
          style={{
            background:
              "var(--surface)",

            borderColor:
              "var(--border)",

            boxShadow:
              "var(--shadow-card)",
          }}
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
            "
            style={{
              background:
                "color-mix(in srgb,var(--accent-color) 9%,transparent)",

              color:
                "var(--accent-color)",
            }}
          >
            <FileText size={28} />
          </div>

          <h2
            className="
              mt-4
              text-xl
              font-semibold
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            No Notes Found
          </h2>

          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color:
                "var(--muted)",
            }}
          >
            Generate notes from
            your workspace.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredNotes.map(
            (note) => (
              <NotesCard
                key={note._id}
                note={note}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}