import { SectionCard } from "@/components/ui/SectionCard";
import type { MockCompany } from "@/mocks";

type CompanyCompletionCardProps = {
  company: MockCompany;
  completion: number;
};

type CompletionItem = {
  label: string;
  completed: boolean;
};

export function CompanyCompletionCard({ company, completion }: CompanyCompletionCardProps) {
  const items: CompletionItem[] = [
    { label: "Nombre comercial", completed: Boolean(company.commercialName) },
    { label: "RUC registrado", completed: Boolean(company.ruc) },
    { label: "Descripción clara", completed: company.description.length > 30 },
    { label: "Contacto principal", completed: Boolean(company.phone && company.email) },
    { label: "Cobertura definida", completed: company.districtsCoverage.length > 0 },
    { label: "Red social activa", completed: Boolean(company.socialLinks.facebook || company.socialLinks.instagram) },
    { label: "Representante legal", completed: Boolean(company.legalRepresentative) },
  ];

  return (
    <SectionCard title="Checklist del perfil" description={`Perfil completado al ${completion}%.`}>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 px-4 py-3">
            <span className="text-sm text-neutral-700">{item.label}</span>
            <span className={item.completed ? "text-sm font-medium text-emerald-700" : "text-sm font-medium text-neutral-400"}>
              {item.completed ? "Completo" : "Pendiente"}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
