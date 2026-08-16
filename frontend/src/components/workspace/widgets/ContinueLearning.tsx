import { ArrowRight } from "lucide-react";


const documents = [
  {
    id:1,
    title:"Operating Systems",
    progress:68,
    lessons:"12 Chapters",
  },
  {
    id:2,
    title:"DBMS",
    progress:42,
    lessons:"8 Chapters",
  },
  {
    id:3,
    title:"Computer Networks",
    progress:21,
    lessons:"10 Chapters",
  },
];



export default function ContinueLearning(){


  return (

    <section className="mb-8">


      <div className="
        mb-5
        flex
        items-center
        justify-between
      ">


        <h2

          className="
            text-2xl
            font-bold
          "

          style={{

            color:
              "var(--text)",

          }}

        >

          Continue Learning

        </h2>




        <button

          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            transition
            hover:opacity-80
          "

          style={{

            color:
              "var(--accent-color)",

          }}

        >

          View All

          <ArrowRight size={18}/>

        </button>


      </div>





      <div

        className="
          grid
          gap-5
          lg:grid-cols-3
        "

      >


        {documents.map((doc)=>(


          <div

            key={doc.id}

            className="
              rounded-[30px]
              border
              p-6
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "

            style={{


              background:
                "var(--surface)",


              borderColor:
                "var(--border)",


            }}

          >



            <p

              className="
                text-sm
              "

              style={{

                color:
                  "var(--muted)",

              }}

            >

              {doc.lessons}

            </p>




            <h3

              className="
                mt-2
                text-xl
                font-semibold
              "

              style={{

                color:
                  "var(--text)",

              }}

            >

              {doc.title}

            </h3>





            <div

              className="
                mt-6
                h-2
                overflow-hidden
                rounded-full
              "

              style={{


                background:
                  "var(--surfaceHover)",


              }}

            >


              <div

                className="
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                "

                style={{


                  width:
                    `${doc.progress}%`,


                  background:
                    "var(--accent-color)",


                }}

              />


            </div>






            <div

              className="
                mt-4
                flex
                items-center
                justify-between
              "

            >


              <span

                className="
                  text-sm
                "

                style={{

                  color:
                    "var(--muted)",

                }}

              >

                {doc.progress}% Completed

              </span>




              <button

                className="
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  hover:opacity-90
                "

                style={{

                  background:
                    "var(--accent-color)",

                }}

              >

                Continue

              </button>


            </div>



          </div>


        ))}


      </div>


    </section>

  );

}