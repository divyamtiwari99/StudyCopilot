import Button from "../ui/Button";

export default function UploadCard() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
      <h2 className="text-2xl font-bold">
        Upload PDF
      </h2>

      <p className="mt-3 text-slate-400">
        Drag & Drop your PDF here
      </p>

      <Button className="mt-6">
        Choose PDF
      </Button>
    </div>
  );
}