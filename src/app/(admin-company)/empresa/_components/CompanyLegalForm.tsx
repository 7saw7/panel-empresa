import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import type { MockCompany } from "@/mocks";

type CompanyLegalFormProps = {
  company: MockCompany;
  onChange: (patch: Partial<MockCompany>) => void;
};

export function CompanyLegalForm({ company, onChange }: CompanyLegalFormProps) {
  return (
    <SectionCard title="Datos legales" description="Información simulada para cerrar el perfil administrativo del negocio.">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Representante legal"
          value={company.legalRepresentative}
          onChange={(event) => onChange({ legalRepresentative: event.target.value })}
        />
        <Input label="Fecha de registro" value={company.createdAt} disabled />
      </div>
    </SectionCard>
  );
}
