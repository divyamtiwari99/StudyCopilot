interface Props {
  enabled: boolean;
  onToggle(): void;
  disabled?: boolean;
}

export default function SettingSwitch({
  enabled,
  onToggle,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={enabled}
      aria-disabled={disabled}
      className="
        relative
        h-8
        w-16
        shrink-0
        rounded-full
        transition-all
        duration-300
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      style={{
        backgroundColor: enabled
          ? "var(--accent-color)"
          : "var(--surfaceHover)",
        border: enabled
          ? "1px solid transparent"
          : "1px solid var(--border)",
      }}
    >
      <span
        className="
          absolute
          top-1
          h-6
          w-6
          rounded-full
          bg-white
          shadow-lg
          transition-all
          duration-300
        "
        style={{
          left: enabled
            ? "2.25rem"
            : "0.25rem",
        }}
      />
    </button>
  );
}
