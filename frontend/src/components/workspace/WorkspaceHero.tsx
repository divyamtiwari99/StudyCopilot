import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Upload,
} from "lucide-react";

import Button from "../ui/Button";
import { useAuthStore } from "@/store/auth.store";

export default function WorkspaceHero() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user,
  );


  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 18) {
      return "Good Afternoon";
    }

    return "Good Evening";
  }, []);


  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-3xl
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at top left,color-mix(in srgb,var(--accent-color) 12%,transparent),transparent 45%)",
        }}
      />


      <div
        className="
          relative
          p-8
          lg:p-10
        "
      >


        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
          "
          style={{
            color:
              "var(--accent-color)",

            backgroundColor:
              "color-mix(in srgb,var(--accent-color) 10%,transparent)",

            border:
              "1px solid color-mix(in srgb,var(--accent-color) 20%,transparent)",
          }}
        >

          <Sparkles size={15} />

          Dashboard

        </div>



        <h1
          className="
            mt-6
            text-4xl
            font-black
            text-white
            lg:text-5xl
          "
        >

          {greeting} {user?.name ?? ""} 👋

        </h1>



        <p
          className="
            mt-4
            max-w-3xl
            text-lg
            leading-8
            text-slate-400
          "
        >

          Ready to continue learning?
          Upload new material or continue chatting
          with your existing documents.

        </p>



        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-4
          "
        >

          <Button
            size="lg"
            className="gap-3"
            onClick={() =>
              navigate("/dashboard/documents")
            }
          >

            <Upload size={20} />

            Upload Document

          </Button>



          <Button
            variant="secondary"
            size="lg"
            className="gap-3"
            onClick={() =>
              navigate("/dashboard/chat")
            }
          >

            <BrainCircuit size={20} />

            Continue Chat

            <ArrowRight size={18} />

          </Button>


        </div>


      </div>


    </section>
  );
}