import EmptyState from "../ui/empty-state";



export default function RecentDocuments() {



  return (



    <section



      className="

        rounded-[32px]

        border

        p-7

        backdrop-blur-xl

        transition-all

        duration-300

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





      <div



        className="

          flex

          items-center

          justify-between

        "



      >



        <div>



          <h2



            className="

              text-xl

              font-bold

              tracking-tight

            "



            style={{



              color:

                "var(--text)",



            }}



          >



            Recent Documents



          </h2>






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



            Your latest uploaded study material.



          </p>



        </div>





      </div>







      <div



        className="

          mt-7

        "



      >



        <EmptyState



          title="No documents uploaded yet"



          description="Upload your first PDF and start learning with AI."



        />



      </div>







    </section>



  );

}