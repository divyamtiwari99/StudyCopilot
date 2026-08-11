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

    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-6
        backdrop-blur-3xl
      "
    >



      <div
        className="
          mb-6
        "
      >


        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >

          Continue Learning

        </h2>



        <p
          className="
            mt-2
            text-slate-400
          "
        >

          Resume your recently uploaded study material.

        </p>


      </div>




      <div className="space-y-3">


        {documents.length === 0 && (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-white/10
              p-10
              text-center
            "
          >

            <FileText

              size={40}

              className="
                mx-auto
                text-slate-500
              "

            />


            <h3
              className="
                mt-4
                text-lg
                font-semibold
                text-white
              "
            >

              No documents yet

            </h3>



            <p
              className="
                mt-2
                text-sm
                text-slate-400
              "
            >

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

            className="
              group
              flex
              w-full
              items-center
              justify-between
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
              text-left
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[var(--accent-color)]
              hover:bg-white/[0.06]
            "

          >



            <div
              className="
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
                  border-white/10
                  bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                "
              >

                <FileText

                  size={21}

                  style={{
                    color: "var(--accent-color)"
                  }}

                />

              </div>




              <div
                className="
                  min-w-0
                "
              >


                <h3
                  className="
                    truncate
                    font-semibold
                    text-white
                  "
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

                          size={15}

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

                        size={15}

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

              size={18}

              className="
                shrink-0
                text-slate-500
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-white
              "

            />


          </button>


        ))}


      </div>


    </section>

  );

}