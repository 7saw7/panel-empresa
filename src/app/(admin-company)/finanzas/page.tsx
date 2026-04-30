"use client";

import { useMemo, useState } from "react";
import {
  financesMock,
  type MockFinanceMovement,
  type MockFinanceMovementType,
  type MockFinanceStatus,
  type MockTimelineEvent,
} from "@/mocks";
import { FinanceDetailDrawer } from "./_components/FinanceDetailDrawer";
import { FinanceFormModal } from "./_components/FinanceFormModal";
import { FinanceInvoicePreviewModal } from "./_components/FinanceInvoicePreviewModal";
import { getFinanceOrigin, getFinanceOriginLabel } from "./_components/FinanceOriginBadge";
import { FinancesAutomationSummary } from "./_components/FinancesAutomationSummary";
import { FinancesFilters, type FinanceStatusFilter, type FinanceTypeFilter } from "./_components/FinancesFilters";
import { FinancesHeader } from "./_components/FinancesHeader";
import { FinancesPeriodSelector, getFinancePeriodLabel, type FinanceCustomRange, type FinancePeriod } from "./_components/FinancesPeriodSelector";
import { formatFinancePeriodRange, isMovementInsidePeriod } from "./_components/finance-period.helpers";
import { FinancesStats } from "./_components/FinancesStats";
import { FinancesTable } from "./_components/FinancesTable";

const defaultPaymentMethods = [
  "Transferencia bancaria",
  "Efectivo",
  "Tarjeta empresarial",
  "Yape / Plin",
  "Depósito bancario",
];

function buildFinanceTimeline(movement: MockFinanceMovement | null): MockTimelineEvent[] {
  if (!movement) return [];

  const events: MockTimelineEvent[] = [
    {
      id: movement.id * 10 + 1,
      entityType: "finance",
      entityId: movement.id,
      title: "Movimiento registrado",
      description: `${movement.code} fue creado en el módulo de finanzas con origen ${getFinanceOriginLabel(getFinanceOrigin(movement)).toLowerCase()}.`,
      createdAt: `${movement.createdAt} 09:00`,
      createdBy: getFinanceOrigin(movement) === "manual" ? "Admin Principal" : "Sistema mock",
    },
  ];

  if (movement.status === "paid" && movement.paidAt) {
    events.push({
      id: movement.id * 10 + 2,
      entityType: "finance",
      entityId: movement.id,
      title: "Pago confirmado",
      description: `El movimiento fue marcado como pagado por ${movement.paymentMethod}.`,
      createdAt: `${movement.paidAt} 15:30`,
      createdBy: "Admin Principal",
    });
  }

  if (movement.status === "overdue") {
    events.push({
      id: movement.id * 10 + 3,
      entityType: "finance",
      entityId: movement.id,
      title: "Movimiento vencido",
      description: "El vencimiento pasó sin confirmación de pago.",
      createdAt: `${movement.dueDate} 18:00`,
      createdBy: "Sistema mock",
    });
  }

  if (movement.status === "cancelled") {
    events.push({
      id: movement.id * 10 + 4,
      entityType: "finance",
      entityId: movement.id,
      title: "Movimiento cancelado",
      description: "El movimiento fue cancelado manualmente.",
      createdAt: `${movement.createdAt} 17:00`,
      createdBy: "Admin Principal",
    });
  }

  return events;
}

export default function FinanzasPage() {
  const [movements, setMovements] = useState<MockFinanceMovement[]>(financesMock);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FinanceTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<FinanceStatusFilter>("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [period, setPeriod] = useState<FinancePeriod>("this_month");
  const [customRange, setCustomRange] = useState<FinanceCustomRange>({
    from: "2026-04-01",
    to: "2026-04-30",
  });
  const [selectedMovement, setSelectedMovement] = useState<MockFinanceMovement | null>(null);
  const [editingMovement, setEditingMovement] = useState<MockFinanceMovement | null>(null);
  const [previewMovement, setPreviewMovement] = useState<MockFinanceMovement | null>(null);
  const [defaultType, setDefaultType] = useState<MockFinanceMovementType>("income");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const paymentMethods = useMemo(() => {
    const values = new Set([...defaultPaymentMethods, ...movements.map((movement) => movement.paymentMethod)]);
    return Array.from(values).sort();
  }, [movements]);

  const filteredMovements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return movements.filter((movement) => {
      const thirdParty = movement.clientName ?? movement.providerName ?? "";
      const matchesSearch =
        query.length === 0 ||
        movement.code.toLowerCase().includes(query) ||
        movement.concept.toLowerCase().includes(query) ||
        thirdParty.toLowerCase().includes(query) ||
        (movement.projectName ?? "").toLowerCase().includes(query) ||
        movement.paymentMethod.toLowerCase().includes(query);

      const matchesType = typeFilter === "all" || movement.type === typeFilter;
      const matchesStatus = statusFilter === "all" || movement.status === statusFilter;
      const matchesMethod = methodFilter === "all" || movement.paymentMethod === methodFilter;
      const matchesPeriod = isMovementInsidePeriod(movement, period, customRange);

      return matchesSearch && matchesType && matchesStatus && matchesMethod && matchesPeriod;
    });
  }, [movements, search, typeFilter, statusFilter, methodFilter, period, customRange]);

  const selectedTimeline = useMemo(() => buildFinanceTimeline(selectedMovement), [selectedMovement]);

  const periodSummaryLabel = `${getFinancePeriodLabel(period)} · ${formatFinancePeriodRange(period, customRange)}`;

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const updateMovement = (movement: MockFinanceMovement, message: string) => {
    setMovements((current) => current.map((item) => (item.id === movement.id ? movement : item)));
    setSelectedMovement((current) => (current?.id === movement.id ? movement : current));
    setPreviewMovement((current) => (current?.id === movement.id ? movement : current));
    showNotice(message);
  };

  const handleCreateMovement = (type: MockFinanceMovementType) => {
    setDefaultType(type);
    setEditingMovement(null);
    setIsFormOpen(true);
  };

  const handleViewMovement = (movement: MockFinanceMovement) => {
    setSelectedMovement(movement);
    setIsDetailOpen(true);
  };

  const handleEditMovement = (movement: MockFinanceMovement) => {
    setEditingMovement(movement);
    setDefaultType(movement.type);
    setIsFormOpen(true);
  };

  const handlePreviewMovement = (movement: MockFinanceMovement) => {
    setPreviewMovement(movement);
    setIsPreviewOpen(true);
  };

  const handleSubmitMovement = (movement: MockFinanceMovement) => {
    setMovements((current) => {
      const exists = current.some((item) => item.id === movement.id);
      if (exists) return current.map((item) => (item.id === movement.id ? movement : item));
      return [movement, ...current];
    });

    setSelectedMovement((current) => (current?.id === movement.id ? movement : current));
    setIsFormOpen(false);
    showNotice(editingMovement ? "Movimiento actualizado correctamente." : "Movimiento creado correctamente.");
  };

  const handleMarkAsPaid = (movement: MockFinanceMovement) => {
    updateMovement(
      {
        ...movement,
        status: "paid",
        paidAt: new Date().toISOString().slice(0, 10),
      },
      "Movimiento marcado como pagado."
    );
  };

  const handleCancelMovement = (movement: MockFinanceMovement) => {
    updateMovement({ ...movement, status: "cancelled" }, "Movimiento cancelado correctamente.");
  };

  const handleDuplicateMovement = (movement: MockFinanceMovement) => {
    const nextId = Math.max(...movements.map((item) => item.id), 0) + 1;
    const duplicated: MockFinanceMovement = {
      ...movement,
      id: nextId,
      code: `FIN-2026-${String(nextId).padStart(3, "0")}`,
      status: "pending",
      paidAt: null,
      createdAt: new Date().toISOString().slice(0, 10),
      concept: `${movement.concept} (copia)`,
    };

    setMovements((current) => [duplicated, ...current]);
    showNotice("Movimiento duplicado correctamente.");
  };

  const handleResetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setMethodFilter("all");
  };

  return (
    <div className="space-y-8">
      <FinancesHeader
        onCreateIncome={() => handleCreateMovement("income")}
        onCreateExpense={() => handleCreateMovement("expense")}
        onExport={() => showNotice(`Reporte financiero mock exportado correctamente: ${periodSummaryLabel}.`)}
      />

      {notice ? (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm text-white shadow-sm">
          {notice}
        </div>
      ) : null}

      <FinancesPeriodSelector
        value={period}
        customRange={customRange}
        onChange={setPeriod}
        onCustomRangeChange={setCustomRange}
      />

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
        Mostrando movimientos del periodo: <span className="font-semibold text-neutral-950">{periodSummaryLabel}</span>
      </div>

      <FinancesStats movements={filteredMovements} />

      <FinancesAutomationSummary movements={filteredMovements} />

      <FinancesFilters
        search={search}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        methodFilter={methodFilter}
        methods={paymentMethods}
        onSearchChange={setSearch}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onMethodChange={setMethodFilter}
        onReset={handleResetFilters}
      />

      <FinancesTable
        movements={filteredMovements}
        onView={handleViewMovement}
        onEdit={handleEditMovement}
        onMarkAsPaid={handleMarkAsPaid}
        onPreview={handlePreviewMovement}
        onDuplicate={handleDuplicateMovement}
        onCancel={handleCancelMovement}
      />

      <FinanceDetailDrawer
        movement={selectedMovement}
        timeline={selectedTimeline}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEditMovement}
        onMarkAsPaid={handleMarkAsPaid}
        onPreview={handlePreviewMovement}
        onCancel={handleCancelMovement}
      />

      <FinanceFormModal
        open={isFormOpen}
        movement={editingMovement}
        defaultType={defaultType}
        paymentMethods={paymentMethods}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitMovement}
      />

      <FinanceInvoicePreviewModal
        open={isPreviewOpen}
        movement={previewMovement}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={() => showNotice("Comprobante mock descargado correctamente.")}
      />
    </div>
  );
}
