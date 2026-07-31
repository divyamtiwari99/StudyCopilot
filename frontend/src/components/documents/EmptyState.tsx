import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03] text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
        <UploadCloud size={36} />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">
        No documents yet
      </h2>

      <p className="mt-3 max-w-md text-white/50">
        Upload your first PDF and start chatting with AI,
        generate notes, quizzes and flashcards instantly.
      </p>

      <button className="mt-8 rounded-2xl bg-cyan-500 px-6 py-3 font-medium text-black transition hover:scale-105">
        Upload PDF
      </button>
    </motion.div>
  );
}