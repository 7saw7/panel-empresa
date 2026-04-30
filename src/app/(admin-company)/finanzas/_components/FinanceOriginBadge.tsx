import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MockFinanceMovement } from "@/mocks";

export type FinanceOrigin = "project" | "phase" | "manual" | "quote";

export function getFinanceOrigin(movement: MockFinanceMovement): FinanceOrigin {
  const concept = movement.concept.toLowerCase();
  const notes = movement.notes?.toLowerCase() ?? "";

  if (concept.includes("fase") || notes.includes("fase") || notes.includes("hito")) return "phase";
  if (movement.projectId) return "project";
  if (movement.quoteId) return "quote";
  return "manual";
}

export function getFinanceOriginLabel(origin: FinanceOrigin) {
  const labels: Record<FinanceOrigin, string> = {
    project: "Proyecto",
    phase: "Fase",
    manual: "Manual",
    quote: "Cotización",
  };

  return labels[origin];
}

export function getFinanceOriginDescription(movement: MockFinanceMovement) {
  const origin = getFinanceOrigin(movement);

  if (origin === "phase") {
    return "Movimiento generado o programado por avance de fase del proyecto.";
  }

  if (origin === "project") {
    return movement.type === "income"
      ? "Ingreso conectado al ciclo del proyecto."
      : "Egreso asociado a ejecución, materiales o técnicos del proyecto.";
  }

  if (origin === "quote") {
    return "Movimiento relacionado con una cotización comercial.";
  }

  return "Movimiento registrado manualmente por administración.";
}

type FinanceOriginBadgeProps = {
  movement: MockFinanceMovement;
};

export function FinanceOriginBadge({ movement }: FinanceOriginBadgeProps) {
  const origin = getFinanceOrigin(movement);

  const tone =
    origin === "project"
      ? "success"
      : origin === "phase"
        ? "warning"
        : origin === "quote"
          ? "default"
          : "default";

  return <StatusBadge label={getFinanceOriginLabel(origin)} tone={tone} />;
}
