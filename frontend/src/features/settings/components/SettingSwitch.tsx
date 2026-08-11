interface Props {
  enabled: boolean;

  onToggle(): void;
}

export default function SettingSwitch({
  enabled,
  onToggle,
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
        enabled
          ? "bg-cyan-500"
          : "bg-white/10"
      }`}
    >

      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-lg transition-all duration-300 ${
          enabled
            ? "left-9"
            : "left-1"
        }`}
      />

    </button>
  );
}