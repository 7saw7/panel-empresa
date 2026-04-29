import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockCompany } from "@/mocks";

type CompanyGeneralFormProps = {
  company: MockCompany;
  onChange: (patch: Partial<MockCompany>) => void;
};

export function CompanyGeneralForm({ company, onChange }: CompanyGeneralFormProps) {
  return (
    <SectionCard title="Información general" description="Datos principales para identificar el negocio dentro del panel y la vista pública mock.">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Razón social"
          value={company.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
        <Input
          label="Nombre comercial"
          value={company.commercialName}
          onChange={(event) => onChange({ commercialName: event.target.value })}
        />
        <Input
          label="RUC"
          value={company.ruc}
          onChange={(event) => onChange({ ruc: event.target.value })}
        />
        <Select
          label="Rubro"
          value={company.category}
          onChange={(event) => onChange({ category: event.target.value })}
        >
          <option value="Servicios técnicos">Servicios técnicos</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Electricidad">Electricidad</option>
          <option value="Seguridad electrónica">Seguridad electrónica</option>
          <option value="Construcción">Construcción</option>
        </Select>
        <div className="md:col-span-2">
          <Textarea
            label="Descripción"
            rows={4}
            value={company.description}
            onChange={(event) => onChange({ description: event.target.value })}
          />
        </div>
      </div>
    </SectionCard>
  );
}
