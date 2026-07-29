import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function AuroraBackground({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060816]">

      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-indigo-600/20 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 40, 0],
          y: [0, 80, -60, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[160px]"
      />

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}