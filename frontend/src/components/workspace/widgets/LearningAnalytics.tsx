import {
  BookOpen,
  Brain,
  Clock,
  Trophy,
} from "lucide-react";


const stats = [
  {
    title: "Study Hours",
    value: "42h",
    icon: Clock,
  },
  {
    title: "Documents",
    value: "12",
    icon: BookOpen,
  },
  {
    title: "AI Sessions",
    value: "86",
    icon: Brain,
  },
  {
    title: "Achievements",
    value: "08",
    icon: Trophy,
  },
];



export default function LearningAnalytics() {

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

          Learning Analytics


        </h2>



        <p

          className="
            text-sm
          "

          style={{
            color:"var(--muted)",
          }}

        >

          Your learning progress at a glance


        </p>


      </div>





      <div

        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "

      >

        {stats.map((item)=>{


          const Icon = item.icon;



          return (

            <div

              key={item.title}

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
                  mb-5
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


                <Icon

                  size={22}

                  style={{

                    color:
                      "var(--accent-color)",

                  }}

                />


              </div>





              <p

                className="
                  text-sm
                "

                style={{

                  color:
                    "var(--muted)",

                }}

              >

                {item.title}


              </p>





              <h3

                className="
                  mt-2
                  text-3xl
                  font-bold
                "

                style={{

                  color:
                    "var(--text)",

                }}

              >

                {item.value}


              </h3>


            </div>


          );


        })}


      </div>


    </section>

  );

}