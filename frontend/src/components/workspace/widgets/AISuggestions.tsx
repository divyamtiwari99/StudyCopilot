import {
  Sparkles,
  ArrowRight,
} from "lucide-react";


const suggestions = [
  {
    id: 1,
    title: "Generate Quiz",
    description: "Create 20 MCQs from Operating Systems",
  },
  {
    id: 2,
    title: "Summarize PDF",
    description: "Generate concise notes from DBMS",
  },
  {
    id: 3,
    title: "Interview Mode",
    description: "Practice AI mock interview",
  },
];



export default function AISuggestions() {

  return (

    <section className="mb-8">


      <div

        className="
          mb-5
          flex
          items-center
          justify-between
        "

      >

        <div>


          <h2

            className="
              text-2xl
              font-bold
            "

            style={{
              color:"var(--text)",
            }}

          >

            AI Suggestions


          </h2>




          <p

            className="
              text-sm
            "

            style={{

              color:
                "var(--muted)",

            }}

          >

            Personalized recommendations for you


          </p>


        </div>





        <Sparkles

          size={22}

          style={{

            color:
              "var(--accent-color)",

          }}

        />


      </div>






      <div

        className="
          grid
          gap-5
          lg:grid-cols-3
        "

      >

        {suggestions.map((item)=>(


          <div

            key={item.id}

            className="
              group
              rounded-3xl
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


              boxShadow:
                "var(--shadow-card)",


            }}


            onMouseEnter={(e)=>{

              e.currentTarget.style.borderColor =
                "var(--accent-color)";

            }}


            onMouseLeave={(e)=>{

              e.currentTarget.style.borderColor =
                "var(--border)";

            }}


          >




            <div

              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
              "

              style={{


                background:
                  "color-mix(in srgb,var(--accent-color) 12%,transparent)",


              }}

            >


              <Sparkles

                size={22}

                style={{

                  color:
                    "var(--accent-color)",

                }}

              />


            </div>





            <h3

              className="
                text-lg
                font-semibold
              "

              style={{

                color:
                  "var(--text)",

              }}

            >

              {item.title}


            </h3>






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

              {item.description}


            </p>






            <button

              className="
                mt-6
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                transition-all
                duration-300
                group-hover:gap-3
              "

              style={{

                color:
                  "var(--accent-color)",

              }}

            >

              Open

              <ArrowRight size={16}/>


            </button>



          </div>


        ))}


      </div>


    </section>

  );

}