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
    <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 px-8 py-7">

      <div className="flex items-start gap-5">

        {icon && (

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04]">

            {icon}

          </div>

        )}

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-400">

            {eyebrow}

          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">

            {title}

          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-slate-400">

            {description}

          </p>

        </div>

      </div>

      {action}

    </div>
  );
}