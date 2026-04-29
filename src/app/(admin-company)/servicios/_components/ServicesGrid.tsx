import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatNumber, type MockService, type MockServiceStatus } from "@/mocks";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

type ServicesGridProps = {
  services: MockService[];
  onView: (service: MockService) => void;
  onEdit: (service: MockService) => void;
  onChangeStatus: (service: MockService, status: MockServiceStatus) => void;
  onDuplicate: (service: MockService) => void;
  onUseInQuote: (service: MockService) => void;
};

export function ServicesGrid({ services, onView, onEdit, onChangeStatus, onDuplicate, onUseInQuote }: ServicesGridProps) {
  if (services.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-8 text-center">
        <h3 className="text-base font-semibold text-neutral-950">No hay servicios</h3>
        <p className="mt-2 text-sm text-neutral-600">Ajusta los filtros o registra un nuevo servicio.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {services.map((service) => (
        <SectionCard key={service.id} className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{service.category}</p>
              <h3 className="mt-1 text-lg font-semibold text-neutral-950">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{service.description}</p>
            </div>
            <ServiceStatusBadge status={service.status} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-neutral-50 p-3"><p className="text-xs text-neutral-500">Precio base</p><p className="mt-1 font-semibold text-neutral-950">{formatCurrency(service.basePrice)}</p></div>
            <div className="rounded-2xl bg-neutral-50 p-3"><p className="text-xs text-neutral-500">Duración</p><p className="mt-1 font-semibold text-neutral-950">{service.estimatedDuration}</p></div>
            <div className="rounded-2xl bg-neutral-50 p-3"><p className="text-xs text-neutral-500">Uso</p><p className="mt-1 font-semibold text-neutral-950">{formatNumber(service.timesUsed)}</p></div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {service.frequentMaterials.map((material) => <span key={material} className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700">{material}</span>)}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={() => onView(service)}>Ver</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(service)}>Editar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onDuplicate(service)}>Duplicar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => onUseInQuote(service)}>Cotizar</Button>
            {service.status === "active" ? (
              <Button type="button" size="sm" variant="danger" onClick={() => onChangeStatus(service, "inactive")}>Desactivar</Button>
            ) : (
              <Button type="button" size="sm" variant="ghost" onClick={() => onChangeStatus(service, "active")}>Activar</Button>
            )}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
