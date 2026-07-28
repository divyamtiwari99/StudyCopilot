import Card from "../components/ui/Card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Welcome back 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold">
            PDFs
          </h2>

          <p className="mt-3 text-4xl font-bold">
            0
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            AI Chats
          </h2>

          <p className="mt-3 text-4xl font-bold">
            0
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">
            Notes
          </h2>

          <p className="mt-3 text-4xl font-bold">
            0
          </p>
        </Card>
      </div>
    </div>
  );
}