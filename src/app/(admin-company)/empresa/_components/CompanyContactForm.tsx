import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import type { MockCompany } from "@/mocks";

type CompanyContactFormProps = {
  company: MockCompany;
  onChange: (patch: Partial<MockCompany>) => void;
};

export function CompanyContactForm({ company, onChange }: CompanyContactFormProps) {
  const districtsText = company.districtsCoverage.join(", ");

  return (
    <SectionCard title="Contacto y cobertura" description="Información que el equipo comercial puede mostrar al cliente durante el demo.">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Teléfono"
          value={company.phone}
          onChange={(event) => onChange({ phone: event.target.value })}
        />
        <Input
          label="Correo"
          type="email"
          value={company.email}
          onChange={(event) => onChange({ email: event.target.value })}
        />
        <Input
          label="Sitio web"
          value={company.website}
          onChange={(event) => onChange({ website: event.target.value })}
        />
        <Input
          label="Dirección principal"
          value={company.address}
          onChange={(event) => onChange({ address: event.target.value })}
        />
        <div className="md:col-span-2">
          <Input
            label="Distritos de cobertura"
            hint="Separar distritos por coma. Ejemplo: Surco, Miraflores, San Borja"
            value={districtsText}
            onChange={(event) =>
              onChange({
                districtsCoverage: event.target.value
                  .split(",")
                  .map((district) => district.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      </div>
    </SectionCard>
  );
}
