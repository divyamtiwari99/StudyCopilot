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


      if (!notes)
        return [];



      let result =
        [...notes];



      if (search.trim()) {

        result =
          result.filter(
            (note) =>
              note.title
                .toLowerCase()
                .includes(
                  search
                    .toLowerCase(),
                ),
          );

      }



      result.sort(
        (a,b) => {

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


    },[
      notes,
      search,
      sort,
    ]);





  if (isLoading) {

    return (

      <div
        className="
          text-slate-400
        "
      >

        Loading notes...

      </div>

    );

  }




  if (isError) {

    return (

      <div
        className="
          rounded-3xl
          border
          border-red-500/20
          bg-red-500/10
          p-8
          text-red-400
        "
      >

        Failed to load notes.

      </div>

    );

  }





  return (

    <div
      className="
        space-y-8
      "
    >



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
              items-center
              justify-center
              rounded-2xl
              bg-indigo-500/10
            "
          >

            <Sparkles
              size={24}
              className="
                text-indigo-400
              "
            />

          </div>


          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >

              AI Notes Library

            </h1>


            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >

              All your AI generated study notes.

            </p>


          </div>


        </div>


      </div>





      {/* Toolbar */}

      <div
        className="
          flex
          flex-col
          gap-4
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
          md:flex-row
        "
      >


        <div
          className="
            flex
            flex-1
            items-center
            gap-3
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
          "
        >

          <Search
            size={18}
            className="
              text-slate-400
            "
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
              text-white
              outline-none
              placeholder:text-slate-500
            "

          />


        </div>




        <select

          value={sort}

          onChange={(e) =>
            setSort(
              e.target.value as
              "latest" |
              "oldest",
            )
          }

          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            text-sm
            text-white
            outline-none
          "

        >

          <option value="latest">
            Latest
          </option>


          <option value="oldest">
            Oldest
          </option>


        </select>


      </div>





      {/* Notes Grid */}


      {
        filteredNotes.length === 0 ? (

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-10
              text-center
            "
          >

            <FileText
              size={45}
              className="
                mx-auto
                text-slate-500
              "
            />


            <h2
              className="
                mt-4
                text-xl
                font-semibold
                text-white
              "
            >

              No Notes Found

            </h2>


            <p
              className="
                mt-2
                text-slate-400
              "
            >

              Generate notes from your workspace.

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

            {
              filteredNotes.map(
                (note) => (

                  <NotesCard

                    key={
                      note._id
                    }

                    note={
                      note
                    }

                  />

                ),
              )
            }


          </div>


        )
      }


    </div>

  );

}