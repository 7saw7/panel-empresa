import { SectionCard } from "@/components/ui/SectionCard";
import type { MockTimelineEvent } from "@/mocks";

type DashboardActivityProps = {
  activity: MockTimelineEvent[];
};

export function DashboardActivity({ activity }: DashboardActivityProps) {
  return (
    <SectionCard
      title="Actividad reciente"
      description="Últimos movimientos relevantes dentro del panel."
    >
      <div className="space-y-3">
        {activity.map((item) => (
          <article key={item.id} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-950">{item.title}</h3>
                {item.description ? (
                  <p className="mt-1 text-sm leading-6 text-neutral-600">{item.description}</p>
                ) : null}
              </div>
              <p className="shrink-0 text-xs text-neutral-500">{item.createdAt}</p>
            </div>
            {item.createdBy ? (
              <p className="mt-2 text-xs text-neutral-500">Responsable: {item.createdBy}</p>
            ) : null}
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
