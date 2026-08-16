import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("StudyCopilot UI error", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main
        className="flex min-h-screen items-center justify-center px-6 py-12"
        style={{
          background: "var(--background)",
          color: "var(--text)",
        }}
      >
        <section
          className="w-full max-w-lg rounded-3xl border p-8 text-center shadow-xl"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-color)",
            }}
          >
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
            StudyCopilot hit an unexpected UI error. Your saved data is not
            intentionally cleared. Reload the page to continue.
          </p>

          <button
            type="button"
            onClick={this.handleReload}
            className="mt-7 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            style={{
              background: "var(--accent-color)",
              boxShadow:
                "0 10px 24px color-mix(in srgb,var(--accent-color) 22%,transparent)",
            }}
          >
            Reload StudyCopilot
          </button>
        </section>
      </main>
    );
  }
}
