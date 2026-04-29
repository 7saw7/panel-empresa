"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { Textarea } from "@/components/ui/Textarea";

type TemplatesSettingsPanelProps = {
  onSave: () => void;
};

export function TemplatesSettingsPanel({ onSave }: TemplatesSettingsPanelProps) {
  const [quoteTemplate, setQuoteTemplate] = useState("Gracias por solicitar una cotización. La propuesta tiene una validez de 7 días.");
  const [projectTemplate, setProjectTemplate] = useState("El proyecto fue programado. Nuestro equipo coordinará los detalles operativos.");

  return (
    <SectionCard title="Plantillas" description="Textos base mock para cotizaciones y mensajes operativos.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Textarea
          label="Plantilla de cotización"
          rows={6}
          value={quoteTemplate}
          onChange={(event) => setQuoteTemplate(event.target.value)}
        />
        <Textarea
          label="Plantilla de proyecto"
          rows={6}
          value={projectTemplate}
          onChange={(event) => setProjectTemplate(event.target.value)}
        />
      </div>
      <div className="mt-5">
        <Button onClick={onSave}>Guardar plantillas</Button>
      </div>
    </SectionCard>
  );
}
