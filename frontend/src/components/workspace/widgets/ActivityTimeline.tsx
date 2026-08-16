import { Clock3 } from "lucide-react";


const activities = [
  {
    id: 1,
    title: "Operating Systems",
    action: "Quiz Generated",
    time: "5 min ago",
  },
  {
    id: 2,
    title: "DBMS Notes",
    action: "Summary Created",
    time: "18 min ago",
  },
  {
    id: 3,
    title: "Computer Networks",
    action: "AI Chat Started",
    time: "42 min ago",
  },
  {
    id: 4,
    title: "Resume Preparation",
    action: "Flashcards Created",
    time: "1 hour ago",
  },
];



export default function ActivityTimeline() {

  return (

    <section className="mb-8">


      <div className="mb-5">

        <h2

          className="
            text-2xl
            font-bold
          "

          style={{
            color:"var(--text)",
          }}

        >

          Recent Activity


        </h2>



        <p

          className="text-sm"

          style={{
            color:"var(--muted)",
          }}

        >

          Everything you've done recently


        </p>


      </div>





      <div

        className="
          rounded-3xl
          border
          p-6
          backdrop-blur-xl
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


        {activities.map((item,index)=>(


          <div

            key={item.id}

            className={`
              flex
              items-start
              gap-4
              ${
                index !== activities.length - 1
                  ? "mb-6 pb-6 border-b"
                  : ""
              }
            `}

            style={{

              borderColor:
                index !== activities.length - 1
                  ? "var(--border)"
                  : "transparent",

            }}

          >



            <div

              className="
                rounded-xl
                p-3
              "

              style={{


                background:
                  "color-mix(in srgb,var(--accent-color) 12%,transparent)",


              }}

            >


              <Clock3

                size={18}

                style={{

                  color:
                    "var(--accent-color)",

                }}

              />


            </div>





            <div className="flex-1">


              <h3

                className="font-semibold"

                style={{

                  color:
                    "var(--text)",

                }}

              >

                {item.title}


              </h3>





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

                {item.action}


              </p>


            </div>





            <span

              className="text-xs"

              style={{

                color:
                  "var(--muted)",

              }}

            >

              {item.time}


            </span>



          </div>


        ))}


      </div>


    </section>

  );

}