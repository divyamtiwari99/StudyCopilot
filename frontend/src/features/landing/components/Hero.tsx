import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
        {/* Left */}
        <div>
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
            🚀 AI Powered Learning
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Study Smarter
            <br />
            Not Harder.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Upload your PDFs, chat with your documents, generate
            summaries, notes, quizzes and flashcards — all inside one
            beautiful AI workspace.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-500"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold text-white">10K+</h2>
              <p className="text-zinc-500">Documents</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">99%</h2>
              <p className="text-zinc-500">Accuracy</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">24/7</h2>
              <p className="text-zinc-500">AI Available</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">
                  📄 Uploaded
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Operating Systems.pdf
                </h3>
              </div>

              <div className="rounded-2xl bg-violet-600/20 p-4">
                <p className="text-sm text-violet-300">
                  AI Summary
                </p>

                <p className="mt-2 text-zinc-200">
                  Memory management allows efficient allocation,
                  protection and organization of system resources...
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">
                  Quiz Generated
                </p>

                <h3 className="mt-2 text-white">
                  15 Questions Ready
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}