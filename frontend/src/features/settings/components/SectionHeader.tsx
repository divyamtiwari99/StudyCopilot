import type {
  ReactNode,
} from "react";

interface Props {
  eyebrow: string;

  title: string;

  description: string;

  icon?: ReactNode;

  action?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
  action,
}: Props) {
  return (
    <div
      className="
        flex
        flex-wrap
        items-start
        justify-between
        gap-6
        border-b
        px-8
        py-7
      "
      style={{
        borderColor:
          "var(--border)",
      }}
    >
      <div
        className="
          flex
          items-start
          gap-5
        "
      >
        {icon && (
          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-3xl
              border
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

        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.32em]
            "
            style={{
              color:
                "var(--accent-color)",
            }}
          >
            {eyebrow}
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            {title}
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              leading-8
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
  );
}