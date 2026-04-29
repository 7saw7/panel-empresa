import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/mocks";
import type { MockTechnician, MockTechnicianStatus } from "@/mocks";
import { TechnicianStatusBadge } from "./TechnicianStatusBadge";

type TechniciansGridProps = {
  technicians: MockTechnician[];
  onView: (technician: MockTechnician) => void;
  onEdit: (technician: MockTechnician) => void;
  onChangeStatus: (technician: MockTechnician, status: MockTechnicianStatus) => void;
  onAssignProject: (technician: MockTechnician) => void;
};

export function TechniciansGrid({ technicians, onView, onEdit, onChangeStatus, onAssignProject }: TechniciansGridProps) {
  if (technicians.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-8 text-center">
        <h3 className="text-base font-semibold text-neutral-950">No hay técnicos</h3>
        <p className="mt-2 text-sm text-neutral-500">Ajusta los filtros o registra un nuevo técnico.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {technicians.map((technician) => (
        <article key={technician.id} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-neutral-950">{technician.name}</h2>
              <p className="mt-1 text-sm text-neutral-500">{technician.zone}</p>
            </div>
            <TechnicianStatusBadge status={technician.status} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {technician.specialties.map((specialty) => (
              <span key={specialty} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{specialty}</span>
            ))}
          </div>

          <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-neutral-50 p-3">
              <dt className="text-xs text-neutral-500">Activos</dt>
              <dd className="mt-1 font-semibold text-neutral-950">{formatNumber(technician.activeProjects)}</dd>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-3">
              <dt className="text-xs text-neutral-500">Terminados</dt>
              <dd className="mt-1 font-semibold text-neutral-950">{formatNumber(technician.completedProjects)}</dd>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-3">
              <dt className="text-xs text-neutral-500">Rating</dt>
              <dd className="mt-1 font-semibold text-neutral-950">{technician.rating.toFixed(1)}</dd>
            </div>
          </dl>

          <div className="mt-5 space-y-1 text-sm text-neutral-600">
            <p>{technician.email}</p>
            <p>{technician.phone}</p>
            <p>Asignado a: {technician.assignedTo ?? "Sin asignación"}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={() => onView(technician)}>Ver detalle</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(technician)}>Editar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onAssignProject(technician)}>Asignar</Button>
            {technician.status !== "busy" ? (
              <Button type="button" size="sm" variant="ghost" onClick={() => onChangeStatus(technician, "busy")}>Ocupar</Button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
