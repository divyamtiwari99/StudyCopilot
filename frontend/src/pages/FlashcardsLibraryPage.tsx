import {
  Brain,
  Sparkles,
} from "lucide-react";


import FlashcardCard from "@/features/flashcards/components/FlashcardCard";


import {
  useAllFlashcards,
} from "@/features/flashcards/hooks/useAllFlashcards";



export default function FlashcardsLibraryPage() {


  const {
    data: flashcards,
    isLoading,
    isError,
  } = useAllFlashcards();





  if (isLoading) {

    return (

      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          text-white
        "
      >

        Loading flashcards...

      </div>

    );

  }





  if (isError) {

    return (

      <div
        className="
          flex
          min-h-[400px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-red-500/20
          bg-red-500/5
          p-10
          text-center
        "
      >

        <Brain
          size={48}
          className="mb-4 text-red-400"
        />


        <h2
          className="
            text-xl
            font-semibold
            text-white
          "
        >
          Failed to load flashcards
        </h2>


        <p
          className="
            mt-2
            text-zinc-400
          "
        >
          Something went wrong while loading your flashcard library.
        </p>


      </div>

    );

  }





  if (
    !flashcards ||
    flashcards.length === 0
  ) {


    return (

      <div
        className="
          flex
          min-h-[450px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-10
          text-center
        "
      >

        <Brain
          size={56}
          className="mb-5 text-zinc-500"
        />


        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          No Flashcards Found
        </h2>


        <p
          className="
            mt-3
            max-w-md
            text-zinc-400
          "
        >
          Generate flashcards from your document workspace
          using the AI Command Center.
        </p>


      </div>

    );

  }





  return (

    <div
      className="
        space-y-8
      "
    >


      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
          "
        >


          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-indigo-500/10
            "
          >

            <Sparkles
              size={26}
              className="text-indigo-400"
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
              Flashcard Library
            </h1>



            <p
              className="
                mt-1
                text-zinc-400
              "
            >
              Review and practice your generated flashcards.
            </p>


          </div>


        </div>




        <div
          className="
            mt-6
            inline-flex
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            text-zinc-300
          "
        >

          {flashcards.length} Flashcard Set
          {flashcards.length !== 1 && "s"}

        </div>


      </div>





      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {
          flashcards.map((flashcard) => (

            <FlashcardCard
              key={flashcard._id}
              flashcard={flashcard}
            />

          ))
        }

      </div>


    </div>

  );

}