import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";



export default function Footer() {

  return (

    <footer className="border-t border-[var(--border)] bg-[var(--background)]">


      <div className="mx-auto max-w-7xl px-6 py-14">



        <div className="grid gap-12 md:grid-cols-3">





          {/* Brand */}


          <div>


            <div className="flex items-center gap-3">


              <img

                src="/logo.png"

                alt="StudyCopilot Logo"

                className="
                  h-12
                  w-12
                  rounded-xl
                  object-contain
                "

              />



              <div>


                <h2 className="text-xl font-bold text-[var(--text)]">

                  StudyCopilot

                </h2>



                <p className="text-xs text-[var(--muted)]">

                  AI Learning Assistant

                </p>


              </div>


            </div>




            <p

              className="
                mt-5
                max-w-sm
                text-sm
                leading-7
                text-[var(--muted)]
              "

            >

              An AI-powered learning workspace built for students
              to understand concepts, create notes and prepare
              smarter with artificial intelligence.

            </p>



          </div>









          {/* Product */}


          <div>


            <h3

              className="
                mb-5
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-[var(--text)]
              "

            >

              Product

            </h3>




            <div

              className="
                flex
                flex-col
                gap-3
                text-sm
                text-[var(--muted)]
              "

            >


              <a

                href="#features"

                className="
                  transition
                  hover:text-[var(--text)]
                "

              >

                Features

              </a>




              <a

                href="#pricing"

                className="
                  transition
                  hover:text-[var(--text)]
                "

              >

                Pricing

              </a>





              <a

                href="#faq"

                className="
                  transition
                  hover:text-[var(--text)]
                "

              >

                FAQ

              </a>



            </div>


          </div>









          {/* Founder */}


          <div>


            <h3

              className="
                mb-5
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-[var(--text)]
              "

            >

              Created By

            </h3>




            <div

              className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                p-5
              "

            >


              <p className="font-semibold text-[var(--text)]">

                Divyam Tiwari

              </p>




              <p

                className="
                  mt-1
                  text-sm
                  text-[var(--muted)]
                "

              >

                Founder & Developer

              </p>





              <div className="mt-5 flex gap-3">



                <a

                  href="https://github.com/divyamtiwari99"

                  target="_blank"

                  rel="noopener noreferrer"

                  className="
                    rounded-xl
                    border
                    border-[var(--border)]
                    p-3
                    text-[var(--muted)]
                    transition
                    hover:bg-[color-mix(in_srgb,var(--surface)_85%,transparent)]
                    hover:text-[var(--text)]
                  "

                >

                  <FaGithub size={18}/>


                </a>






                <a

                  href="https://www.linkedin.com/in/divyam-tiwari-b14171329/"

                  target="_blank"

                  rel="noopener noreferrer"

                  className="
                    rounded-xl
                    border
                    border-[var(--border)]
                    p-3
                    text-[var(--muted)]
                    transition
                    hover:bg-[color-mix(in_srgb,var(--surface)_85%,transparent)]
                    hover:text-[var(--text)]
                  "

                >

                  <FaLinkedin size={18}/>


                </a>



              </div>


            </div>



          </div>




        </div>









        {/* Bottom */}



        <div

          className="
            mt-12
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-[var(--border)]
            pt-6
            text-sm
            text-[var(--muted)]
            md:flex-row
          "

        >



          <p>

            © 2026 StudyCopilot. All rights reserved.

          </p>




          <div className="flex gap-6">





            <a
              href="mailto:support@studycopilot.com"
              className="transition hover:text-[var(--text)]"
            >

              Contact

            </a>



          </div>



        </div>



      </div>



    </footer>

  );

}