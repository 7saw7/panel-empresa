import type {
  MockFinanceMovement,
  MockFinanceSummary,
  MockInventoryItem,
  MockInventoryStatus,
  MockPriority,
  MockQuoteItem,
  MockStatus,
} from "./types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("es-PE").format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export function getStockStatus(stock: number, minStock: number): MockInventoryStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock <= minStock) return "low_stock";
  return "available";
}

export function calculateInventoryValue(item: Pick<MockInventoryItem, "stock" | "unitCost">) {
  return item.stock * item.unitCost;
}

export function calculateQuoteTotals(items: Array<Pick<MockQuoteItem, "quantity" | "unitPrice">>) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = Number((subtotal * 0.18).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return { subtotal, tax, total };
}

export function calculateFinanceSummary(movements: MockFinanceMovement[]): MockFinanceSummary {
  const paidIncome = movements
    .filter((movement) => movement.type === "income" && movement.status === "paid")
    .reduce((sum, movement) => sum + movement.amount, 0);

  const paidExpenses = movements
    .filter((movement) => movement.type === "expense" && movement.status === "paid")
    .reduce((sum, movement) => sum + movement.amount, 0);

  const pendingAmount = movements
    .filter((movement) => movement.status === "pending")
    .reduce((sum, movement) => sum + movement.amount, 0);

  const overdueAmount = movements
    .filter((movement) => movement.status === "overdue")
    .reduce((sum, movement) => sum + movement.amount, 0);

  return {
    monthlyIncome: paidIncome,
    monthlyExpenses: paidExpenses,
    estimatedProfit: paidIncome - paidExpenses,
    pendingAmount,
    overdueAmount,
  };
}

export function getPriorityLabel(priority: MockPriority) {
  const labels: Record<MockPriority, string> = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
    urgent: "Urgente",
  };
  return labels[priority];
}

export function getStatusLabel(status: MockStatus) {
  const labels: Record<MockStatus, string> = {
    active: "Activo",
    inactive: "Inactivo",
    prospect: "Prospecto",
    with_project: "Con proyecto",
    draft: "Borrador",
    sent: "Enviada",
    approved: "Aprobada",
    rejected: "Rechazada",
    expired: "Vencida",
    pending: "Pendiente",
    scheduled: "Programado",
    in_progress: "En proceso",
    paused: "Pausado",
    completed: "Terminado",
    cancelled: "Cancelado",
    available: "Disponible",
    busy: "Ocupado",
    offline: "Fuera de horario",
    low_stock: "Stock bajo",
    out_of_stock: "Sin stock",
    paid: "Pagado",
    overdue: "Vencido",
    pending_review: "Pendiente revisión",
    archived: "Archivado",
    pending_verification: "Pendiente verificación",
    invited: "Invitado",
  };

  return labels[status];
}
