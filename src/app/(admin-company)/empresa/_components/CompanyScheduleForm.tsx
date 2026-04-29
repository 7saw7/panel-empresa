import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import type { MockCompanySchedule } from "@/mocks";

type CompanyScheduleFormProps = {
  schedule: MockCompanySchedule[];
  onChange: (schedule: MockCompanySchedule[]) => void;
};

export function CompanyScheduleForm({ schedule, onChange }: CompanyScheduleFormProps) {
  const updateDay = (day: string, patch: Partial<MockCompanySchedule>) => {
    onChange(
      schedule.map((item) =>
        item.day === day
          ? {
              ...item,
              ...patch,
              openTime: patch.isOpen === false ? null : patch.openTime ?? item.openTime,
              closeTime: patch.isOpen === false ? null : patch.closeTime ?? item.closeTime,
            }
          : item
      )
    );
  };

  return (
    <SectionCard title="Horarios" description="Simula los horarios de atención que verá el cliente en el perfil público.">
      <div className="space-y-3">
        {schedule.map((item) => (
          <div key={item.day} className="grid gap-3 rounded-2xl border border-neutral-100 p-4 md:grid-cols-[120px_110px_1fr_1fr] md:items-center">
            <p className="text-sm font-medium text-neutral-900">{item.day}</p>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={item.isOpen}
                onChange={(event) => updateDay(item.day, { isOpen: event.target.checked })}
                className="h-4 w-4 rounded border-neutral-300"
              />
              Abierto
            </label>
            <Input
              type="time"
              value={item.openTime ?? ""}
              disabled={!item.isOpen}
              onChange={(event) => updateDay(item.day, { openTime: event.target.value })}
            />
            <Input
              type="time"
              value={item.closeTime ?? ""}
              disabled={!item.isOpen}
              onChange={(event) => updateDay(item.day, { closeTime: event.target.value })}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
