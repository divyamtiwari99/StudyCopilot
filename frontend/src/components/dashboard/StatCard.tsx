interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-slate-400">{title}</h3>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}