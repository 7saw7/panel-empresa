import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatNumber } from "@/mocks";
import type { MockTechnician, MockTechnicianStatus } from "@/mocks";
import { TechnicianStatusBadge } from "./TechnicianStatusBadge";

type TechniciansTableProps = {
  technicians: MockTechnician[];
  onView: (technician: MockTechnician) => void;
  onEdit: (technician: MockTechnician) => void;
  onChangeStatus: (technician: MockTechnician, status: MockTechnicianStatus) => void;
  onAssignProject: (technician: MockTechnician) => void;
  onDeactivate: (technician: MockTechnician) => void;
};

export function TechniciansTable({ technicians, onView, onEdit, onChangeStatus, onAssignProject, onDeactivate }: TechniciansTableProps) {
  const columns: Array<DataTableColumn<MockTechnician>> = [
    {
      key: "technician",
      header: "Técnico",
      render: (technician) => (
        <div>
          <p className="font-medium text-neutral-950">{technician.name}</p>
          <p className="text-xs text-neutral-500">{technician.email}</p>
        </div>
      ),
    },
    {
      key: "specialties",
      header: "Especialidades",
      render: (technician) => (
        <div className="flex max-w-xs flex-wrap gap-1.5">
          {technician.specialties.map((specialty) => (
            <span key={specialty} className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700">{specialty}</span>
          ))}
        </div>
      ),
    },
    { key: "zone", header: "Zona", render: (technician) => technician.zone },
    { key: "status", header: "Estado", render: (technician) => <TechnicianStatusBadge status={technician.status} /> },
    {
      key: "workload",
      header: "Carga",
      render: (technician) => (
        <div>
          <p>{formatNumber(technician.activeProjects)} activos</p>
          <p className="text-xs text-neutral-500">{formatNumber(technician.completedProjects)} terminados</p>
        </div>
      ),
    },
    { key: "rating", header: "Rating", render: (technician) => technician.rating.toFixed(1) },
    { key: "activity", header: "Última actividad", render: (technician) => technician.lastActivity },
    {
      key: "actions",
      header: "Acciones",
      className: "w-80",
      render: (technician) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(technician)}>Ver</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(technician)}>Editar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onAssignProject(technician)}>Asignar</Button>
          {technician.status !== "available" ? (
            <Button type="button" size="sm" variant="ghost" onClick={() => onChangeStatus(technician, "available")}>Disponible</Button>
          ) : null}
          {technician.status !== "inactive" ? (
            <Button type="button" size="sm" variant="danger" onClick={() => onDeactivate(technician)}>Desactivar</Button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={technicians}
      columns={columns}
      getRowKey={(technician) => String(technician.id)}
      caption="Listado de técnicos"
      emptyTitle="No hay técnicos"
      emptyDescription="Ajusta los filtros o registra un nuevo técnico para continuar."
    />
  );
}
