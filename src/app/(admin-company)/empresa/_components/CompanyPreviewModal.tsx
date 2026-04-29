import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MockCompany, MockCompanySchedule } from "@/mocks";

const openSchedule = (schedule: MockCompanySchedule[]) =>
  schedule.filter((item) => item.isOpen && item.openTime && item.closeTime);

type CompanyPreviewModalProps = {
  open: boolean;
  company: MockCompany;
  schedule: MockCompanySchedule[];
  onClose: () => void;
};

export function CompanyPreviewModal({ open, company, schedule, onClose }: CompanyPreviewModalProps) {
  const availableSchedule = openSchedule(schedule);

  return (
    <Modal
      open={open}
      title="Vista previa pública"
      description="Previsualización mock del perfil que vería un cliente."
      onClose={onClose}
      footer={
        <div className="flex justify-end">
          <Button type="button" onClick={onClose}>Cerrar vista previa</Button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
        <div className="flex h-36 items-center justify-center bg-neutral-100 text-sm font-medium text-neutral-400">
          Portada del negocio
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-lg font-semibold text-neutral-900 shadow-sm">
                {company.commercialName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-neutral-950">
                  {company.commercialName}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{company.category}</p>
              </div>
            </div>
            <StatusBadge label={`${company.profileCompletion}% completo`} tone="info" />
          </div>

          <p className="mt-5 text-sm leading-6 text-neutral-600">{company.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-100 p-4">
              <p className="text-sm font-semibold text-neutral-900">Contacto</p>
              <div className="mt-3 space-y-2 text-sm text-neutral-600">
                <p>{company.phone}</p>
                <p>{company.email}</p>
                <p>{company.website}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-100 p-4">
              <p className="text-sm font-semibold text-neutral-900">Ubicación y cobertura</p>
              <div className="mt-3 space-y-2 text-sm text-neutral-600">
                <p>{company.address}</p>
                <p>{company.districtsCoverage.join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-neutral-100 p-4">
            <p className="text-sm font-semibold text-neutral-900">Horarios</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {availableSchedule.map((item) => (
                <p key={item.day} className="text-sm text-neutral-600">
                  <span className="font-medium text-neutral-900">{item.day}:</span> {item.openTime} - {item.closeTime}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
