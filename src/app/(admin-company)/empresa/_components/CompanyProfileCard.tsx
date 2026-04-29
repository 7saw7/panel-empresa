import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MockCompany } from "@/mocks";
import { getStatusLabel } from "@/mocks";

const statusTone = {
  active: "success",
  inactive: "default",
  pending_verification: "warning",
} as const;

type CompanyProfileCardProps = {
  company: MockCompany;
  completion: number;
};

export function CompanyProfileCard({ company, completion }: CompanyProfileCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="h-28 bg-neutral-100">
        <div className="flex h-full items-center justify-center text-xs font-medium text-neutral-400">
          Portada mock
        </div>
      </div>

      <div className="p-6">
        <div className="-mt-14 flex items-end justify-between gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-neutral-200 bg-white text-xl font-semibold text-neutral-900 shadow-sm">
            {company.commercialName.slice(0, 2).toUpperCase()}
          </div>
          <StatusBadge label={getStatusLabel(company.status)} tone={statusTone[company.status]} />
        </div>

        <div className="mt-5 space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
            {company.commercialName}
          </h2>
          <p className="text-sm text-neutral-500">{company.name}</p>
          <p className="text-sm font-medium text-neutral-700">{company.category}</p>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Completitud</span>
            <span className="font-medium text-neutral-900">{completion}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-neutral-950" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-neutral-600">
          <p><span className="font-medium text-neutral-900">RUC:</span> {company.ruc}</p>
          <p><span className="font-medium text-neutral-900">Teléfono:</span> {company.phone}</p>
          <p><span className="font-medium text-neutral-900">Correo:</span> {company.email}</p>
        </div>
      </div>
    </section>
  );
}
