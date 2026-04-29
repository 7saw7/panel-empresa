import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel } from "@/mocks";
import type { MockEvidence, MockFinanceMovement, MockInventoryItem, MockProject } from "@/mocks";

type DashboardAlertsProps = {
  inventory: MockInventoryItem[];
  evidences: MockEvidence[];
  finances: MockFinanceMovement[];
  projects: MockProject[];
};

export function DashboardAlerts({ inventory, evidences, finances, projects }: DashboardAlertsProps) {
  const stockAlerts = inventory.filter((item) => item.status !== "available");
  const pendingEvidences = evidences.filter((evidence) => evidence.status === "pending_review");
  const overduePayments = finances.filter((movement) => movement.status === "overdue");
  const overdueProjects = projects.filter((project) => project.isOverdue);

  const alerts = [
    ...stockAlerts.map((item) => ({
      id: `stock-${item.id}`,
      title: item.name,
      description: `Stock actual: ${item.stock} ${item.unit}. Mínimo recomendado: ${item.minStock}.`,
      label: getStatusLabel(item.status),
      tone: item.status === "out_of_stock" ? "danger" as const : "warning" as const,
    })),
    ...pendingEvidences.map((evidence) => ({
      id: `evidence-${evidence.id}`,
      title: evidence.title,
      description: `Pendiente de revisión para ${evidence.projectName}.`,
      label: "Evidencia",
      tone: "info" as const,
    })),
    ...overduePayments.map((movement) => ({
      id: `finance-${movement.id}`,
      title: movement.concept,
      description: "Movimiento financiero vencido pendiente de atención.",
      label: "Vencido",
      tone: "danger" as const,
    })),
    ...overdueProjects.map((project) => ({
      id: `project-${project.id}`,
      title: project.name,
      description: `Fecha de entrega vencida: ${project.dueDate}.`,
      label: "Proyecto",
      tone: "warning" as const,
    })),
  ];

  return (
    <SectionCard
      title="Alertas"
      description="Puntos que requieren seguimiento operativo o administrativo."
    >
      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <article key={alert.id} className="rounded-2xl border border-neutral-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-neutral-950">{alert.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-500">{alert.description}</p>
                </div>
                <StatusBadge label={alert.label} tone={alert.tone} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-500">
          No hay alertas pendientes en este momento.
        </div>
      )}
    </SectionCard>
  );
}
