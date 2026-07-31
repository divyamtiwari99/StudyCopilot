export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            🚀 StudyCopilot
          </span>

          <h1 className="mt-8 text-6xl font-bold">
            Learn Smarter with AI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Upload PDFs, chat with your notes,
            generate quizzes, flashcards,
            summaries and much more.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/register"
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}