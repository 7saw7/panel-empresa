"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

type SystemStatesSettingsPanelProps = {
  onSave: () => void;
};

const initialStates = [
  { module: "Cotizaciones", states: ["Borrador", "Enviada", "Aprobada", "Rechazada"] },
  { module: "Proyectos", states: ["Pendiente", "Programado", "En proceso", "Terminado"] },
  { module: "Pagos", states: ["Pendiente", "Pagado", "Vencido", "Cancelado"] },
];

export function SystemStatesSettingsPanel({ onSave }: SystemStatesSettingsPanelProps) {
  const [states] = useState(initialStates);

  return (
    <SectionCard title="Estados del sistema" description="Estados mock usados para mostrar flujos administrativos.">
      <div className="space-y-4">
        {states.map((group) => (
          <div key={group.module} className="rounded-2xl border border-neutral-200 p-4">
            <p className="mb-3 font-medium text-neutral-950">{group.module}</p>
            <div className="flex flex-wrap gap-2">
              {group.states.map((state) => (
                <StatusBadge key={state} label={state} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button onClick={onSave}>Guardar estados</Button>
      </div>
    </SectionCard>
  );
}
