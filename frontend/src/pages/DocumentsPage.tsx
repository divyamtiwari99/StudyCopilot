import { useMemo, useState } from "react";

import UploadZone from "@/features/dashboard/components/UploadZone";
import DocumentGrid from "@/components/documents/DocumentGrid";

import { useDocuments } from "@/features/documents/hooks/useDocuments";

import type {
  Document,
} from "@/components/documents/DocumentCard";

import {
  Search,
  ArrowUpDown,
  Filter,
  FileText,
} from "lucide-react";


type StatusFilter =
  | "all"
  | "ready"
  | "processing"
  | "failed";


type SortOption =
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
  ] = useState<StatusFilter>("all");


  const [
    sort,
    setSort,
  ] = useState<SortOption>("newest");



  const documents: Document[] =
    (data ?? []).map((doc) => ({
      id: doc.id,

      name: doc.title,

      pages: 0,

      size: `${(
        doc.size /
        1024 /
        1024
      ).toFixed(2)} MB`,

      uploadedAt:
        new Date(
          doc.createdAt,
        ).toLocaleDateString(),

      status: doc.status,
    }));



  const filtered =
    useMemo(() => {

      let list =
        [...documents];


      if (search.trim()) {

        const keyword =
          search.toLowerCase();


        list =
          list.filter((doc) =>
            doc.name
              .toLowerCase()
              .includes(keyword),
          );

      }


      if (status !== "all") {

        list =
          list.filter(
            (doc) =>
              doc.status === status,
          );

      }


      switch(sort) {

        case "name":

          list.sort(
            (a,b) =>
              a.name.localeCompare(
                b.name,
              ),
          );

          break;


        case "oldest":

          list.reverse();

          break;


        case "size":

          list.sort(
            (a,b) =>
              parseFloat(b.size) -
              parseFloat(a.size),
          );

          break;

      }


      return list;


    },[
      documents,
      search,
      status,
      sort,
    ]);



  return (
    <main className="space-y-6">


      <section
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Documents
          </h1>


          <p
            className="
              mt-3
              max-w-2xl
              text-slate-400
            "
          >
            Manage your study material,
            organize documents and
            prepare them for AI.
          </p>

        </div>


        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-6
            py-4
          "
        >

          <p className="text-sm text-slate-400">
            Total Documents
          </p>


          <h2
            className="
              mt-1
              text-3xl
              font-bold
              text-white
            "
          >
            {documents.length}
          </h2>

        </div>

      </section>



      <UploadZone />



      <section
        className="
          flex
          flex-col
          gap-4
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
          xl:flex-row
        "
      >

        <div className="relative flex-1">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />


          <input
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
            placeholder="Search documents..."
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              pl-11
              pr-4
              text-white
              outline-none
              transition
              focus:border-[var(--accent-color)]
            "
          />

        </div>
                <div className="flex gap-4">

          <div className="relative">

            <Filter
              size={16}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />


            <select
              value={status}
              onChange={(e)=>
                setStatus(
                  e.target.value as StatusFilter,
                )
              }
              className="
                h-12
                rounded-2xl
                border
                border-white/10
                bg-black/30
                pl-10
                pr-8
                text-white
                outline-none
              "
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

              <option value="failed">
                Failed
              </option>

            </select>

          </div>



          <div className="relative">

            <ArrowUpDown
              size={16}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />


            <select
              value={sort}
              onChange={(e)=>
                setSort(
                  e.target.value as SortOption,
                )
              }
              className="
                h-12
                rounded-2xl
                border
                border-white/10
                bg-black/30
                pl-10
                pr-8
                text-white
                outline-none
              "
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


      </section>




      <div
        className="
          flex
          items-center
          gap-2
          text-sm
          text-slate-400
        "
      >

        <FileText size={16}/>


        <span>

          Showing

          <span
            className="
              mx-1
              font-semibold
              text-white
            "
          >
            {filtered.length}
          </span>

          of

          <span
            className="
              mx-1
              font-semibold
              text-white
            "
          >
            {documents.length}
          </span>

          documents

        </span>

      </div>




      {isLoading && (

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-16
            text-center
          "
        >

          <div
            className="
              mx-auto
              h-14
              w-14
              animate-spin
              rounded-full
              border-4
              border-[var(--accent-color)]
              border-t-transparent
            "
          />


          <h2
            className="
              mt-6
              text-2xl
              font-semibold
              text-white
            "
          >
            Loading documents...
          </h2>


          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Please wait while we fetch your study materials.
          </p>


        </div>

      )}





      {!isLoading && isError && (

        <div
          className="
            rounded-3xl
            border
            border-red-500/20
            bg-red-500/10
            p-16
            text-center
          "
        >

          <h2
            className="
              text-2xl
              font-semibold
              text-red-300
            "
          >
            Failed to load documents
          </h2>


          <p
            className="
              mt-3
              text-red-400
            "
          >
            Please refresh the page and try again.
          </p>

        </div>

      )}
            {!isLoading &&
        !isError &&
        documents.length === 0 && (

        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-white/10
            bg-white/[0.03]
            p-16
            text-center
          "
        >

          <FileText
            size={56}
            className="mx-auto"
            style={{
              color:
                "var(--accent-color)",
            }}
          />


          <h2
            className="
              mt-6
              text-3xl
              font-bold
              text-white
            "
          >
            No Documents Yet
          </h2>


          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-slate-400
            "
          >
            Upload your first study material to unlock
            AI Chat, Notes, Flashcards, Quiz and more.
          </p>


        </div>

      )}




      {!isLoading &&
        !isError &&
        documents.length > 0 &&
        filtered.length === 0 && (

        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-white/10
            bg-white/[0.03]
            p-16
            text-center
          "
        >

          <Search
            size={56}
            className="
              mx-auto
              text-slate-500
            "
          />


          <h2
            className="
              mt-6
              text-2xl
              font-semibold
              text-white
            "
          >
            No matching documents
          </h2>


          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Try changing your search or filter.
          </p>


        </div>

      )}




      {!isLoading &&
        !isError &&
        filtered.length > 0 && (

        <DocumentGrid
          documents={filtered}
        />

      )}


    </main>
  );
}