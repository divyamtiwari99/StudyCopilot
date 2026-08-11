import AICommandCenter from "../components/workspace/AICommandCenter";
import LearningOverview from "../components/workspace/LearningOverview";
import WorkspaceHero from "../components/workspace/WorkspaceHero";
import RecentDocuments from "../components/workspace/RecentDocuments";

import { useDashboard } from "../features/dashboard/hooks/useDashboard";


export default function DashboardPage() {


  const dashboard = useDashboard();



  if (dashboard.isLoading) {

    return (

      <div className="
        space-y-6
      ">


        <div
          className="
            h-[280px]
            animate-pulse
            rounded-3xl
            bg-white/[0.04]
          "
        />



        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {Array.from({
            length: 4,
          }).map((_, index) => (

            <div

              key={index}

              className="
                h-[150px]
                animate-pulse
                rounded-3xl
                bg-white/[0.04]
              "

            />

          ))}


        </div>




        <div
          className="
            h-[350px]
            animate-pulse
            rounded-3xl
            bg-white/[0.04]
          "
        />


      </div>

    );

  }




  return (

    <div
      className="
        space-y-6
      "
    >


      <WorkspaceHero />



      <LearningOverview

        dashboard={dashboard}

      />



      <AICommandCenter />



      <RecentDocuments

        documents={
          dashboard.recentDocuments
        }

      />


    </div>

  );

}