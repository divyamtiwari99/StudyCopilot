import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090B]">

      <div className="mx-auto max-w-7xl px-6 py-12">


        <div className="grid gap-10 md:grid-cols-3">


          {/* Brand Section */}

          <div>

            <div className="flex items-center gap-3">

              <img
                src="/logo.png"
                alt="StudyCopilot Logo"
                className="h-12 w-12 rounded-xl object-contain"
              />


              <div>

                <h2 className="text-xl font-bold text-white">
                  StudyCopilot
                </h2>


                <p className="text-xs text-zinc-400">
                  AI Learning Assistant
                </p>

              </div>

            </div>


            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              An AI-powered learning workspace that helps students
              understand, organize and learn smarter.
            </p>

          </div>




          {/* Links */}

          <div>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h3>


            <div className="flex flex-col gap-3 text-sm text-zinc-400">


              <a
                href="#features"
                className="transition hover:text-white"
              >
                Features
              </a>


              <a
                href="#pricing"
                className="transition hover:text-white"
              >
                Pricing
              </a>


              <a
                href="#faq"
                className="transition hover:text-white"
              >
                FAQ
              </a>


            </div>

          </div>





          {/* Founder */}

          <div>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Created By
            </h3>


            <p className="font-semibold text-white">
              Divyam Tiwari
            </p>


            <p className="mt-1 text-sm text-zinc-500">
              Founder & Developer of StudyCopilot
            </p>



            <div className="mt-5 flex gap-3">


              <a
                href="https://github.com/divyamtiwari99"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >

                <FaGithub size={20} />

              </a>



              <a
                href="https://www.linkedin.com/in/divyam-tiwari-b14171329/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >

                <FaLinkedin size={20} />

              </a>


            </div>


          </div>


        </div>





        {/* Bottom */}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row">


          <p>
            © 2026 StudyCopilot. All rights reserved.
          </p>



          <div className="flex gap-6">


            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy
            </a>


            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms
            </a>


            <a
              href="#"
              className="transition hover:text-white"
            >
              Contact
            </a>


          </div>


        </div>


      </div>

    </footer>
  );
}