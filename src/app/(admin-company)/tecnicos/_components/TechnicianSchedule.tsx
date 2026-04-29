import type { MockTechnicianScheduleItem } from "@/mocks";

type TechnicianScheduleProps = {
  schedule: MockTechnicianScheduleItem[];
};

export function TechnicianSchedule({ schedule }: TechnicianScheduleProps) {
  if (schedule.length === 0) {
    return <p className="text-sm text-neutral-500">Sin agenda registrada para esta semana.</p>;
  }

  return (
    <div className="space-y-3">
      {schedule.map((item) => (
        <article key={item.id} className="rounded-2xl border border-neutral-200 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-950">{item.day}</p>
              <p className="mt-1 text-sm text-neutral-600">{item.projectName}</p>
            </div>
            <span className="text-sm font-medium text-neutral-700">{item.time}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
