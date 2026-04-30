"use client";

import { useMemo, useState } from "react";
import {
  clientsMock,
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
import { DashboardFinancialChart } from "./_components/DashboardFinancialChart";
import { DashboardHeader } from "./_components/DashboardHeader";
import { DashboardProjectProgress } from "./_components/DashboardProjectProgress";
import { DashboardRangeSelector } from "./_components/DashboardRangeSelector";
import { DashboardStats } from "./_components/DashboardStats";
import { getDashboardRangeMock } from "./_data/dashboard-range.mock";
import type { DashboardRangeKey } from "./_types/dashboard-range.types";

export default function DashboardPage() {
  const [range, setRange] = useState<DashboardRangeKey>("30d");

  const dashboardRangeData = useMemo(() => {
    return getDashboardRangeMock(range);
  }, [range]);

  function handleExportReport() {
    window.alert(`Reporte mock exportado correctamente para el rango ${range}.`);
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <DashboardHeader onExportReport={handleExportReport} />
        <DashboardRangeSelector value={range} onChange={setRange} />
      </div>

      <DashboardStats stats={dashboardRangeData.stats} />

      <DashboardFinancialChart data={dashboardRangeData.chart} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <DashboardProjectProgress projects={dashboardRangeData.projects} />
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
        <DashboardActivity activity={dashboardRangeData.activity} />
      </div>
    </main>
  );
}
