import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        backdrop-blur-xl
      "
      style={{
        background:
          "color-mix(in srgb,var(--background) 88%,transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="
          mx-auto
          flex
          min-h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="
            flex
            items-center
            gap-3
            transition
            hover:opacity-90
          "
        >
          <img
            src="/logo.png"
            alt="StudyCopilot Logo"
            className="h-11 w-11 rounded-xl object-contain"
          />

          <div className="flex flex-col">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              StudyCopilot
            </span>

            <span
              className="text-xs"
              style={{ color: "var(--muted)" }}
            >
              AI Learning Assistant
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm transition"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color =
                  "var(--text)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color =
                  "var(--muted)";
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="
              hidden
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-medium
              transition
              sm:inline-flex
            "
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background:
                "color-mix(in srgb,var(--surface) 70%,transparent)",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              hidden
              rounded-xl
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:-translate-y-0.5
              hover:opacity-90
              sm:inline-flex
            "
            style={{
              background: "var(--accent-color)",
              boxShadow:
                "0 10px 28px color-mix(in srgb,var(--accent-color) 22%,transparent)",
            }}
          >
            Get Started
          </Link>

          <button
            type="button"
            aria-label={
              open
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="
              inline-flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              md:hidden
            "
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in srgb,var(--surface) 70%,transparent)",
              color: "var(--text)",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="border-t px-6 py-4 md:hidden"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {item.label}
              </a>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-3 border-t pt-4"
              style={{ borderColor: "var(--border)" }}
            >
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-xl border px-4 py-3 text-center text-sm font-semibold"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
                style={{
                  background: "var(--accent-color)",
                }}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
