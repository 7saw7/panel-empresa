import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatCurrency, formatNumber, type MockService, type MockServiceStatus } from "@/mocks";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

type ServicesTableProps = {
  services: MockService[];
  onView: (service: MockService) => void;
  onEdit: (service: MockService) => void;
  onChangeStatus: (service: MockService, status: MockServiceStatus) => void;
  onDuplicate: (service: MockService) => void;
  onUseInQuote: (service: MockService) => void;
};

export function ServicesTable({ services, onView, onEdit, onChangeStatus, onDuplicate, onUseInQuote }: ServicesTableProps) {
  const columns: Array<DataTableColumn<MockService>> = [
    {
      key: "service",
      header: "Servicio",
      render: (service) => (
        <div>
          <p className="font-medium text-neutral-950">{service.name}</p>
          <p className="line-clamp-2 max-w-sm text-xs leading-5 text-neutral-500">{service.description}</p>
        </div>
      ),
    },
    { key: "category", header: "Categoría", render: (service) => service.category },
    { key: "price", header: "Precio base", render: (service) => formatCurrency(service.basePrice) },
    { key: "duration", header: "Duración", render: (service) => service.estimatedDuration },
    { key: "status", header: "Estado", render: (service) => <ServiceStatusBadge status={service.status} /> },
    {
      key: "usage",
      header: "Uso",
      render: (service) => (
        <div>
          <p>{formatNumber(service.timesUsed)} usos</p>
          <p className="text-xs text-neutral-500">{formatCurrency(service.generatedRevenue)}</p>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      className: "w-96",
      render: (service) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(service)}>Ver</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(service)}>Editar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onDuplicate(service)}>Duplicar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onUseInQuote(service)}>Cotizar</Button>
          {service.status !== "active" ? (
            <Button type="button" size="sm" variant="ghost" onClick={() => onChangeStatus(service, "active")}>Activar</Button>
          ) : (
            <Button type="button" size="sm" variant="danger" onClick={() => onChangeStatus(service, "inactive")}>Desactivar</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={services}
      columns={columns}
      getRowKey={(service) => String(service.id)}
      caption="Listado de servicios"
      emptyTitle="No hay servicios"
      emptyDescription="Ajusta los filtros o registra un nuevo servicio para continuar."
    />
  );
}
