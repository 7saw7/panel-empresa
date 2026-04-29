import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import { formatNumber, type MockTechnician, type MockTechnicianStatus } from "@/mocks";
import { TechnicianSchedule } from "./TechnicianSchedule";
import { TechnicianStatusBadge } from "./TechnicianStatusBadge";

type TechnicianDetailDrawerProps = {
  technician: MockTechnician | null;
  open: boolean;
  onClose: () => void;
  onEdit: (technician: MockTechnician) => void;
  onChangeStatus: (technician: MockTechnician, status: MockTechnicianStatus) => void;
  onAssignProject: (technician: MockTechnician) => void;
};

export function TechnicianDetailDrawer({
  technician,
  open,
  onClose,
  onEdit,
  onChangeStatus,
  onAssignProject,
}: TechnicianDetailDrawerProps) {
  if (!open || !technician) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Detalle de técnico</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">{technician.name}</h2>
            <p className="mt-1 text-sm text-neutral-500">{technician.email} · {technician.phone}</p>
          </div>
          <Button type="button" variant="ghost" onClick={onClose}>Cerrar</Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <SectionCard title="Resumen del técnico">
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Estado" value={<TechnicianStatusBadge status={technician.status} />} />
              <Info label="Zona" value={technician.zone} />
              <Info label="Proyectos activos" value={formatNumber(technician.activeProjects)} />
              <Info label="Proyectos terminados" value={formatNumber(technician.completedProjects)} />
              <Info label="Calificación" value={technician.rating.toFixed(1)} />
              <Info label="Última actividad" value={technician.lastActivity} />
            </div>
          </SectionCard>

          <SectionCard title="Disponibilidad">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <Select
                label="Cambiar estado"
                value={technician.status}
                onChange={(event) => onChangeStatus(technician, event.target.value as MockTechnicianStatus)}
              >
                <option value="available">Disponible</option>
                <option value="busy">Ocupado</option>
                <option value="offline">Fuera de horario</option>
                <option value="inactive">Inactivo</option>
              </Select>
              <Button type="button" variant="secondary" onClick={() => onAssignProject(technician)}>
                Asignar proyecto
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Especialidades">
            <div className="flex flex-wrap gap-2">
              {technician.specialties.map((specialty) => (
                <span key={specialty} className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700">{specialty}</span>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Agenda semanal">
            <TechnicianSchedule schedule={technician.schedule} />
          </SectionCard>

          <SectionCard title="Indicadores de rendimiento">
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Tiempo promedio" value="2.4 días" />
              <Metric label="Incidencias" value="1" />
              <Metric label="Satisfacción" value={`${Math.round(technician.rating * 20)}%`} />
            </div>
          </SectionCard>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 px-6 py-4">
          <Button type="button" variant="secondary" onClick={() => onEdit(technician)}>Editar</Button>
          <Button type="button" onClick={() => onAssignProject(technician)}>Asignar proyecto</Button>
        </div>
      </aside>
    </div>
  );
}

function Info({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <div className="mt-1 text-sm font-medium text-neutral-950">{value}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-50 p-4">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-950">{value}</p>
    </div>
  );
}
