import type { MockDashboard } from "./types";
import { formatCurrency } from "./helpers";
import { evidencesMock } from "./evidences.mock";
import { financesSummaryMock } from "./finances.mock";
import { inventoryMock } from "./inventory.mock";
import { projectsMock } from "./projects.mock";
import { quotesMock } from "./quotes.mock";

export const dashboardActivityMock = [
  {
    id: 1,
    entityType: "quote" as const,
    entityId: 1,
    title: "Cotización enviada",
    description: "COT-2026-001 fue enviada a Constructora Lima SAC.",
    createdAt: "2026-04-28 15:30",
    createdBy: "Asistente Comercial",
  },
  {
    id: 2,
    entityType: "inventory" as const,
    entityId: 2,
    title: "Stock bajo detectado",
    description: "Cable UTP Cat6 está por debajo del stock mínimo.",
    createdAt: "2026-04-28 10:10",
    createdBy: "Sistema",
  },
  {
    id: 3,
    entityType: "evidence" as const,
    entityId: 1,
    title: "Evidencia pendiente",
    description: "Luis Ramírez subió una foto de avance para revisión.",
    createdAt: "2026-04-27 11:30",
    createdBy: "Luis Ramírez",
  },
];

export const dashboardMock: MockDashboard = {
  stats: [
    {
      label: "Cotizaciones pendientes",
      value: String(quotesMock.filter((quote) => quote.status === "sent").length),
      helper: "Requieren seguimiento comercial",
    },
    {
      label: "Proyectos activos",
      value: String(projectsMock.filter((project) => project.status === "in_progress" || project.status === "scheduled").length),
      helper: "En ejecución o programados",
    },
    {
      label: "Utilidad estimada",
      value: formatCurrency(financesSummaryMock.estimatedProfit),
      helper: "Ingresos pagados menos egresos pagados",
    },
    {
      label: "Alertas operativas",
      value: String(
        inventoryMock.filter((item) => item.status !== "available").length +
          evidencesMock.filter((evidence) => evidence.status === "pending_review").length,
      ),
      helper: "Stock crítico + evidencias pendientes",
    },
  ],
  projects: projectsMock.map((project) => ({
    name: project.name,
    status: project.status,
    progress: project.progress,
  })),
  activity: dashboardActivityMock,
};
