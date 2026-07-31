import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white"
        >
          StudyCopilot
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}