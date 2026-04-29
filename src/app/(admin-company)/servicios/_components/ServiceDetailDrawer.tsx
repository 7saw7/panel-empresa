import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate, formatNumber, type MockService, type MockServiceStatus } from "@/mocks";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

type ServiceDetailDrawerProps = {
  service: MockService | null;
  open: boolean;
  onClose: () => void;
  onEdit: (service: MockService) => void;
  onChangeStatus: (service: MockService, status: MockServiceStatus) => void;
  onDuplicate: (service: MockService) => void;
  onUseInQuote: (service: MockService) => void;
};

export function ServiceDetailDrawer({ service, open, onClose, onEdit, onChangeStatus, onDuplicate, onUseInQuote }: ServiceDetailDrawerProps) {
  if (!service) return null;

  return (
    <Modal
      open={open}
      title={service.name}
      description="Detalle comercial y operativo del servicio mock."
      onClose={onClose}
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="secondary" onClick={() => onEdit(service)}>Editar</Button>
          <Button type="button" variant="ghost" onClick={() => onDuplicate(service)}>Duplicar</Button>
          <Button type="button" variant="ghost" onClick={() => onUseInQuote(service)}>Usar en cotización</Button>
          {service.status === "active" ? (
            <Button type="button" variant="danger" onClick={() => onChangeStatus(service, "inactive")}>Desactivar</Button>
          ) : (
            <Button type="button" onClick={() => onChangeStatus(service, "active")}>Activar</Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <ServiceStatusBadge status={service.status} />
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">{service.category}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-neutral-50 p-4"><p className="text-xs text-neutral-500">Precio base</p><p className="mt-1 text-lg font-semibold text-neutral-950">{formatCurrency(service.basePrice)}</p></div>
          <div className="rounded-2xl bg-neutral-50 p-4"><p className="text-xs text-neutral-500">Duración estimada</p><p className="mt-1 text-lg font-semibold text-neutral-950">{service.estimatedDuration}</p></div>
          <div className="rounded-2xl bg-neutral-50 p-4"><p className="text-xs text-neutral-500">Ingresos mock</p><p className="mt-1 text-lg font-semibold text-neutral-950">{formatCurrency(service.generatedRevenue)}</p></div>
        </div>

        <section>
          <h3 className="text-sm font-semibold text-neutral-950">Descripción</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{service.description}</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-neutral-950">Materiales frecuentes</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.frequentMaterials.map((material) => <span key={material} className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">{material}</span>)}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-neutral-950">Uso comercial</h3>
            <p className="mt-2 text-sm text-neutral-600">{formatNumber(service.timesUsed)} veces usado en cotizaciones/proyectos mock.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-950">Fechas</h3>
            <p className="mt-2 text-sm text-neutral-600">Creado: {formatDate(service.createdAt)}</p>
            <p className="text-sm text-neutral-600">Actualizado: {service.updatedAt ? formatDate(service.updatedAt) : "Sin cambios"}</p>
          </div>
        </section>
      </div>
    </Modal>
  );
}
