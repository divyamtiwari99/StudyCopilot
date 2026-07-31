import GradientText from "./GradientText";

interface Props {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
        {title}{" "}
        {highlight && (
          <GradientText>{highlight}</GradientText>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}