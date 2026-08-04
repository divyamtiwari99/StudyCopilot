export default function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="rounded-3xl border border-white/10 bg-white/[0.05] px-6 py-5">

        <div className="flex gap-2">

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-400" />

          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-400"
            style={{
              animationDelay:
                "0.2s",
            }}
          />

          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-400"
            style={{
              animationDelay:
                "0.4s",
            }}
          />

        </div>

      </div>

    </div>
  );
}