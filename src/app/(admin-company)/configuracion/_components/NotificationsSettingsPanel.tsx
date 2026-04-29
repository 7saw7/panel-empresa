"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

type NotificationsSettingsPanelProps = {
  onSave: () => void;
};

const options = [
  "Nueva cotización aprobada",
  "Proyecto atrasado",
  "Stock bajo",
  "Evidencia pendiente de revisión",
  "Pago vencido",
];

export function NotificationsSettingsPanel({ onSave }: NotificationsSettingsPanelProps) {
  const [enabled, setEnabled] = useState<string[]>(options.slice(0, 4));

  const toggle = (option: string) => {
    setEnabled((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  return (
    <SectionCard title="Notificaciones" description="Configura alertas internas simuladas para el panel.">
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
            <span className="text-sm font-medium text-neutral-800">{option}</span>
            <input
              type="checkbox"
              checked={enabled.includes(option)}
              onChange={() => toggle(option)}
              className="h-4 w-4 rounded border-neutral-300"
            />
          </label>
        ))}
      </div>
      <div className="mt-5">
        <Button onClick={onSave}>Guardar notificaciones</Button>
      </div>
    </SectionCard>
  );
}
