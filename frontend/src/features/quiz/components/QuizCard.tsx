import {
  Brain,
  Trash2,
  ExternalLink,
  Calendar,
  X,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import type {
  QuizQuestion,
} from "../types/quiz.types";

import {
  useDeleteQuiz,
} from "../hooks/useDeleteQuiz";


interface QuizCardProps {

  quiz: {

    _id: string;

    contentId: string;

    title: string;

    json: QuizQuestion[];

    createdAt: string;

    updatedAt: string;

  };

}



export default function QuizCard({
  quiz,
}: QuizCardProps) {


  const navigate =
    useNavigate();


  const deleteMutation =
    useDeleteQuiz();



  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);




  function handleOpen() {

    navigate(
      `/dashboard/workspace/${quiz.contentId}?tab=quiz`,
    );

  }




  function handleDelete() {


    deleteMutation.mutate(
      quiz.contentId,
      {

        onSuccess() {

          toast.success(
            "Quiz removed from your library.",
          );


          setShowDeleteModal(false);

        },


        onError() {

          toast.error(
            "Failed to remove quiz.",
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
            justify-between
            gap-4
          "
        >


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

              <Brain
                size={22}
                className="text-indigo-400"
              />

            </div>



            <div>


              <h3
                className="
                  line-clamp-1
                  font-semibold
                  text-white
                "
              >

                {quiz.title}

              </h3>



              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-400
                "
              >

                <Calendar size={13}/>


                {new Date(
                  quiz.createdAt,
                ).toLocaleDateString()}


              </div>


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

            Open Quiz

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

                  Remove Quiz?

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

                This quiz will be removed from your
                library permanently.

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