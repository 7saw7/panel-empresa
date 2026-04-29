"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";

type AppearanceSettingsPanelProps = {
  onSave: () => void;
};

export function AppearanceSettingsPanel({ onSave }: AppearanceSettingsPanelProps) {
  const [density, setDensity] = useState("comfortable");
  const [sidebar, setSidebar] = useState("expanded");

  return (
    <SectionCard title="Apariencia" description="Preferencias visuales mock para adaptar la experiencia del panel.">
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Densidad" value={density} onChange={(event) => setDensity(event.target.value)}>
          <option value="comfortable">Cómoda</option>
          <option value="compact">Compacta</option>
        </Select>
        <Select label="Menú lateral" value={sidebar} onChange={(event) => setSidebar(event.target.value)}>
          <option value="expanded">Expandido</option>
          <option value="collapsed">Colapsado</option>
        </Select>
      </div>
      <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
        Vista previa: modo {density === "comfortable" ? "cómodo" : "compacto"} con menú {sidebar === "expanded" ? "expandido" : "colapsado"}.
      </div>
      <div className="mt-5">
        <Button onClick={onSave}>Guardar apariencia</Button>
      </div>
    </SectionCard>
  );
}
