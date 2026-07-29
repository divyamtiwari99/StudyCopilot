import {
  BookOpen,
  BrainCircuit,
  Flame,
  Target,
} from "lucide-react";

import StatsCard from "../ui/StatsCard";

export default function LearningOverview() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Study Hours"
        value="126h"
        subtitle="+12h this week"
        icon={BookOpen}
      />

      <StatsCard
        title="AI Sessions"
        value="284"
        subtitle="24 today"
        icon={BrainCircuit}
      />

      <StatsCard
        title="Current Streak"
        value="18"
        subtitle="days"
        icon={Flame}
      />

      <StatsCard
        title="Goal Progress"
        value="82%"
        subtitle="Weekly target"
        icon={Target}
      />

    </section>
  );
}