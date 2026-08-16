import type {
  ReactNode,
} from "react";

interface Props {
  title: string;

  description: string;

  value?: ReactNode;

  icon?: ReactNode;

  action?: ReactNode;
}

export default function SettingCard({
  title,
  description,
  value,
  icon,
  action,
}: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        p-5
        backdrop-blur-3xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
      style={{
        borderColor:
          "var(--border)",

        backgroundColor:
          "var(--surface)",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor =
          "color-mix(in srgb,var(--accent-color) 20%,var(--border))";

        event.currentTarget.style.backgroundColor =
          "color-mix(in srgb,var(--accent-color) 5%,var(--surface))";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor =
          "var(--border)";

        event.currentTarget.style.backgroundColor =
          "var(--surface)";
      }}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb,var(--accent-color) 60%,transparent), transparent)",
        }}
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-4
          "
        >
          {icon && (
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-300
              "
              style={{
                borderColor:
                  "var(--border)",

                backgroundColor:
                  "var(--surfaceHover)",
              }}
            >
              {icon}
            </div>
          )}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-base
                font-semibold
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              {title}
            </h3>

            <p
              className="
                mt-1
                text-sm
                leading-5
              "
              style={{
                color:
                  "var(--muted)",
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {action}
      </div>

      {value && (
        <div
          className="
            mt-5
            rounded-xl
            border
            px-4
            py-3
          "
          style={{
            borderColor:
              "var(--border)",

            backgroundColor:
              "var(--surfaceHover)",
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
}