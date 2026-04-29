"use client";

import {
  clientsMock,
  dashboardMock,
  evidencesMock,
  financesMock,
  financesSummaryMock,
  inventoryMock,
  projectsMock,
  quotesMock,
  servicesMock,
} from "@/mocks";
import { DashboardActivity } from "./_components/DashboardActivity";
import { DashboardAlerts } from "./_components/DashboardAlerts";
import { DashboardBusinessSnapshot } from "./_components/DashboardBusinessSnapshot";
import { DashboardHeader } from "./_components/DashboardHeader";
import { DashboardProjectProgress } from "./_components/DashboardProjectProgress";
import { DashboardStats } from "./_components/DashboardStats";

export default function DashboardPage() {
  function handleExportReport() {
    window.alert("Reporte mock exportado correctamente.");
  }

  return (
    <main className="space-y-6">
      <DashboardHeader onExportReport={handleExportReport} />
      <DashboardStats stats={dashboardMock.stats} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <DashboardProjectProgress projects={dashboardMock.projects} />
        <DashboardAlerts
          inventory={inventoryMock}
          evidences={evidencesMock}
          finances={financesMock}
          projects={projectsMock}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <DashboardBusinessSnapshot
          clients={clientsMock}
          quotes={quotesMock}
          services={servicesMock}
          inventory={inventoryMock}
          finances={financesSummaryMock}
        />
        <DashboardActivity activity={dashboardMock.activity} />
      </div>
    </main>
  );
}
