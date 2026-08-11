import {
  Brain,
  Trash2,
  ExternalLink,
  Calendar,
  Layers,
  X,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import type {
  Flashcard,
} from "../types/flashcard.types";

import {
  useDeleteFlashcards,
} from "../hooks/useDeleteFlashcards";



interface FlashcardCardProps {

  flashcard: {

    _id: string;

    contentId: string;

    title: string;

    json: Flashcard[];

    createdAt: string;

    updatedAt: string;

  };

}




export default function FlashcardCard({
  flashcard,
}: FlashcardCardProps) {


  const navigate =
    useNavigate();



  const deleteMutation =
    useDeleteFlashcards();




  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);





  function handleOpen() {

    navigate(
      `/dashboard/workspace/${flashcard.contentId}?tab=flashcards`,
    );

  }





  function handleDelete() {


    deleteMutation.mutate(
      flashcard.contentId,
      {

        onSuccess() {


          toast.success(
            "Flashcards removed from your library.",
          );


          setShowDeleteModal(false);


        },


        onError() {


          toast.error(
            "Failed to remove flashcards.",
          );


        },

      },
    );


  }




  return (

    <>

      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          p-5
          transition
          hover:border-white/20
        "
      >


        <div
          className="
            flex
            items-start
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

            <Brain
              size={22}
              className="text-indigo-400"
            />

          </div>



          <div className="flex-1">


            <h3
              className="
                line-clamp-1
                font-semibold
                text-white
              "
            >

              {flashcard.title}

            </h3>




            <div
              className="
                mt-2
                flex
                flex-wrap
                items-center
                gap-4
                text-xs
                text-slate-400
              "
            >

              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <Calendar size={13}/>

                {
                  new Date(
                    flashcard.createdAt,
                  ).toLocaleDateString()
                }

              </span>




              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <Layers size={13}/>

                {flashcard.json.length}
                {" "}
                Cards

              </span>


            </div>


          </div>


        </div>





        <div
          className="
            mt-5
            flex
            gap-3
          "
        >


          <button
            onClick={handleOpen}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white/10
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/20
            "
          >

            <ExternalLink size={16}/>

            Open

          </button>





          <button
            onClick={() =>
              setShowDeleteModal(true)
            }
            disabled={
              deleteMutation.isPending
            }
            className="
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              text-red-400
              transition
              hover:bg-red-500/20
              disabled:opacity-50
            "
          >

            <Trash2 size={16}/>

          </button>


        </div>


      </div>






      {
        showDeleteModal && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/60
              backdrop-blur-sm
              px-4
            "
          >


            <div
              className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-white/10
                bg-[#111827]
                p-6
              "
            >


              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >


                <h2
                  className="
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  Remove Flashcards?
                </h2>



                <button
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  className="
                    text-slate-400
                    hover:text-white
                  "
                >

                  <X size={20}/>

                </button>


              </div>





              <p
                className="
                  mt-4
                  text-sm
                  text-slate-400
                "
              >

                This flashcard set will be
                permanently removed from your library.

              </p>





              <div
                className="
                  mt-6
                  flex
                  justify-end
                  gap-3
                "
              >


                <button
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  className="
                    rounded-xl
                    bg-white/10
                    px-5
                    py-2.5
                    text-sm
                    text-white
                  "
                >

                  Cancel

                </button>





                <button
                  onClick={handleDelete}
                  disabled={
                    deleteMutation.isPending
                  }
                  className="
                    rounded-xl
                    bg-red-500
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    disabled:opacity-50
                  "
                >

                  {
                    deleteMutation.isPending
                    ? "Removing..."
                    : "Remove"
                  }

                </button>


              </div>


            </div>


          </div>

        )
      }


    </>

  );

}