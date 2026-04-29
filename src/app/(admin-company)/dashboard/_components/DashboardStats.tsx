import { StatCard } from "@/components/ui/StatCard";
import type { MockDashboardStat } from "@/mocks";

type DashboardStatsProps = {
  stats: MockDashboardStat[];
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          helper={stat.helper}
        />
      ))}
    </section>
  );
}
