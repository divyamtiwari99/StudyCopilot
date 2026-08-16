import DashboardLayout from "../components/DashboardLayout";
import UploadZone from "../components/UploadZone";


export default function DashboardHome() {

  return (

    <DashboardLayout>

      <div
        className="
          space-y-10
        "
      >


        {/* Hero */}

        <section

          className="
            rounded-[36px]
            border
            p-10
            backdrop-blur-xl
            transition-all
            duration-300
          "

          style={{

            background:
              "color-mix(in srgb,var(--surface),transparent 10%)",

            borderColor:
              "var(--border)",

            boxShadow:
              "0 20px 45px rgba(15,23,42,0.06)",

          }}

        >


          <div
            className="
              max-w-3xl
            "
          >


            <p

              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.25em]
              "

              style={{

                color:
                  "var(--accent-color)",

              }}

            >

              AI Learning Workspace

            </p>





            <h1

              className="
                mt-5
                text-5xl
                font-bold
                tracking-tight
              "

              style={{

                color:
                  "var(--text)",

              }}

            >

              Welcome Back 👋

            </h1>






            <p

              className="
                mt-4
                max-w-xl
                text-lg
                leading-8
              "

              style={{

                color:
                  "var(--muted)",

              }}

            >

              Upload your study material and let StudyCopilot
              transform it into notes, explanations and smart
              learning resources.

            </p>



          </div>



        </section>






        {/* Upload */}

        <section>

          <UploadZone />

        </section>



      </div>


    </DashboardLayout>

  );

}