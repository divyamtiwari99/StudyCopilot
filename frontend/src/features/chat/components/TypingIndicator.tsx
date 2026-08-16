export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="
          rounded-3xl
          border
          px-6
          py-5
          backdrop-blur-xl
        "
        style={{
          background:
            "var(--surface)",

          borderColor:
            "var(--border)",

          boxShadow:
            "var(--shadow-card)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="
              h-2.5
              w-2.5
              animate-bounce
              rounded-full
            "
            style={{
              backgroundColor:
                "var(--accent-color)",

              boxShadow:
                "0 0 8px color-mix(in srgb,var(--accent-color) 45%,transparent)",
            }}
          />

          <span
            className="
              h-2.5
              w-2.5
              animate-bounce
              rounded-full
            "
            style={{
              backgroundColor:
                "var(--accent-color)",

              boxShadow:
                "0 0 8px color-mix(in srgb,var(--accent-color) 45%,transparent)",

              animationDelay:
                "0.2s",
            }}
          />

          <span
            className="
              h-2.5
              w-2.5
              animate-bounce
              rounded-full
            "
            style={{
              backgroundColor:
                "var(--accent-color)",

              boxShadow:
                "0 0 8px color-mix(in srgb,var(--accent-color) 45%,transparent)",

              animationDelay:
                "0.4s",
            }}
          />
        </div>
      </div>
    </div>
  );
}