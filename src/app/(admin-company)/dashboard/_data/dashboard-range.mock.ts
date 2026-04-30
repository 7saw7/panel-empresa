import type { DashboardRangeData, DashboardRangeKey } from "../_types/dashboard-range.types";
import type { MockProjectStatus, MockTimelineEvent } from "@/mocks";
import { formatCurrency } from "@/mocks";

const activityByRange: Record<DashboardRangeKey, MockTimelineEvent[]> = {
  "30d": [
    {
      id: 101,
      entityType: "project",
      entityId: 1,
      title: "Proyecto actualizado",
      description: "Instalación CCTV Miraflores avanzó al 68%.",
      createdAt: "2026-04-29 16:20",
      createdBy: "Coordinador de operaciones",
    },
    {
      id: 102,
      entityType: "finance",
      entityId: 1,
      title: "Ingreso registrado",
      description: "Adelanto asociado al proyecto PRJ-2026-001.",
      createdAt: "2026-04-29 11:10",
      createdBy: "Sistema",
    },
    {
      id: 103,
      entityType: "evidence",
      entityId: 1,
      title: "Nueva evidencia subida",
      description: "Técnico asignado cargó fotos de avance en campo.",
      createdAt: "2026-04-28 18:05",
      createdBy: "Luis Ramírez",
    },
  ],
  "3m": [
    {
      id: 201,
      entityType: "quote",
      entityId: 2,
      title: "Cotización aprobada",
      description: "Cotización comercial convertida en proyecto operativo.",
      createdAt: "2026-04-20 09:35",
      createdBy: "Ventas",
    },
    {
      id: 202,
      entityType: "project",
      entityId: 2,
      title: "Proyecto en fase de cierre",
      description: "Validación final pendiente por el cliente.",
      createdAt: "2026-04-18 14:40",
      createdBy: "Operaciones",
    },
    {
      id: 203,
      entityType: "inventory",
      entityId: 2,
      title: "Salida de materiales",
      description: "Materiales vinculados a proyecto de instalación.",
      createdAt: "2026-04-15 12:00",
      createdBy: "Almacén",
    },
  ],
  "6m": [
    {
      id: 301,
      entityType: "finance",
      entityId: 3,
      title: "Egreso operativo registrado",
      description: "Pago de técnicos y materiales asociado a proyectos.",
      createdAt: "2026-03-28 10:15",
      createdBy: "Administración",
    },
    {
      id: 302,
      entityType: "client",
      entityId: 3,
      title: "Nuevo cliente recurrente",
      description: "Cliente agregado al flujo comercial del negocio.",
      createdAt: "2026-03-10 17:00",
      createdBy: "Ventas",
    },
    {
      id: 303,
      entityType: "project",
      entityId: 4,
      title: "Proyecto finalizado",
      description: "Cierre operativo validado con evidencias internas.",
      createdAt: "2026-02-25 15:20",
      createdBy: "Operaciones",
    },
  ],
  "12m": [
    {
      id: 401,
      entityType: "system",
      entityId: null,
      title: "Resumen anual generado",
      description: "Consolidado mock de ingresos, egresos y proyectos.",
      createdAt: "2026-04-30 08:00",
      createdBy: "Sistema",
    },
    {
      id: 402,
      entityType: "finance",
      entityId: 4,
      title: "Margen anual estimado",
      description: "Resultado consolidado de proyectos finalizados y gastos operativos.",
      createdAt: "2026-04-29 19:30",
      createdBy: "Sistema",
    },
    {
      id: 403,
      entityType: "project",
      entityId: 5,
      title: "Cartera de proyectos consolidada",
      description: "Se muestran proyectos activos, cerrados y programados.",
      createdAt: "2026-04-28 10:30",
      createdBy: "Sistema",
    },
  ],
};

const projectsByRange: Record<
  DashboardRangeKey,
  Array<{ name: string; status: MockProjectStatus; progress: number }>
> = {
  "30d": [
    { name: "Instalación CCTV Miraflores", status: "in_progress", progress: 68 },
    { name: "Cableado estructurado San Isidro", status: "scheduled", progress: 25 },
    { name: "Mantenimiento cámaras Surco", status: "completed", progress: 100 },
  ],
  "3m": [
    { name: "Implementación red corporativa", status: "in_progress", progress: 74 },
    { name: "Control de accesos oficina central", status: "in_progress", progress: 52 },
    { name: "Soporte preventivo sedes Lima", status: "completed", progress: 100 },
  ],
  "6m": [
    { name: "Modernización infraestructura TI", status: "in_progress", progress: 81 },
    { name: "Renovación CCTV almacenes", status: "completed", progress: 100 },
    { name: "Cableado integral oficinas", status: "paused", progress: 45 },
  ],
  "12m": [
    { name: "Cartera anual de instalaciones", status: "in_progress", progress: 86 },
    { name: "Proyectos cerrados con evidencias", status: "completed", progress: 100 },
    { name: "Contratos recurrentes de soporte", status: "scheduled", progress: 40 },
  ],
};

export const dashboardRangeMock: Record<DashboardRangeKey, DashboardRangeData> = {
  "30d": {
    stats: [
      { label: "Ingresos", value: formatCurrency(18500), helper: "Ingresos generados en los últimos 30 días" },
      { label: "Egresos", value: formatCurrency(9200), helper: "Costos operativos y gastos registrados" },
      { label: "Proyectos activos", value: "6", helper: "En ejecución o programados" },
      { label: "Margen estimado", value: formatCurrency(9300), helper: "Ingresos menos egresos del periodo" },
    ],
    projects: projectsByRange["30d"],
    activity: activityByRange["30d"],
    chart: [
      { label: "Sem 1", income: 4200, expenses: 2100, profit: 2100 },
      { label: "Sem 2", income: 3900, expenses: 1900, profit: 2000 },
      { label: "Sem 3", income: 5100, expenses: 2600, profit: 2500 },
      { label: "Sem 4", income: 5300, expenses: 2600, profit: 2700 },
    ],
  },
  "3m": {
    stats: [
      { label: "Ingresos", value: formatCurrency(54800), helper: "Ingresos acumulados en 3 meses" },
      { label: "Egresos", value: formatCurrency(29100), helper: "Gastos operativos del periodo" },
      { label: "Proyectos activos", value: "14", helper: "Proyectos abiertos o recientes" },
      { label: "Margen estimado", value: formatCurrency(25700), helper: "Margen calculado por periodo" },
    ],
    projects: projectsByRange["3m"],
    activity: activityByRange["3m"],
    chart: [
      { label: "Feb", income: 16500, expenses: 8700, profit: 7800 },
      { label: "Mar", income: 18400, expenses: 9900, profit: 8500 },
      { label: "Abr", income: 19900, expenses: 10500, profit: 9400 },
    ],
  },
  "6m": {
    stats: [
      { label: "Ingresos", value: formatCurrency(112600), helper: "Ingresos acumulados en 6 meses" },
      { label: "Egresos", value: formatCurrency(62400), helper: "Egresos operativos y materiales" },
      { label: "Proyectos activos", value: "28", helper: "Proyectos gestionados en el periodo" },
      { label: "Margen estimado", value: formatCurrency(50200), helper: "Utilidad estimada del semestre" },
    ],
    projects: projectsByRange["6m"],
    activity: activityByRange["6m"],
    chart: [
      { label: "Nov", income: 14200, expenses: 7600, profit: 6600 },
      { label: "Dic", income: 16800, expenses: 8800, profit: 8000 },
      { label: "Ene", income: 18300, expenses: 10400, profit: 7900 },
      { label: "Feb", income: 19600, expenses: 10800, profit: 8800 },
      { label: "Mar", income: 21100, expenses: 11900, profit: 9200 },
      { label: "Abr", income: 22600, expenses: 12900, profit: 9700 },
    ],
  },
  "12m": {
    stats: [
      { label: "Ingresos", value: formatCurrency(245900), helper: "Ingresos consolidados en 12 meses" },
      { label: "Egresos", value: formatCurrency(139700), helper: "Gastos, materiales y operación anual" },
      { label: "Proyectos activos", value: "52", helper: "Proyectos gestionados en el año" },
      { label: "Margen estimado", value: formatCurrency(106200), helper: "Resultado estimado anual" },
    ],
    projects: projectsByRange["12m"],
    activity: activityByRange["12m"],
    chart: [
      { label: "May", income: 15500, expenses: 9000, profit: 6500 },
      { label: "Jun", income: 17200, expenses: 9800, profit: 7400 },
      { label: "Jul", income: 18100, expenses: 10100, profit: 8000 },
      { label: "Ago", income: 19400, expenses: 10800, profit: 8600 },
      { label: "Sep", income: 20100, expenses: 11400, profit: 8700 },
      { label: "Oct", income: 19600, expenses: 11200, profit: 8400 },
      { label: "Nov", income: 21100, expenses: 11800, profit: 9300 },
      { label: "Dic", income: 23200, expenses: 13200, profit: 10000 },
      { label: "Ene", income: 20500, expenses: 11900, profit: 8600 },
      { label: "Feb", income: 21800, expenses: 12300, profit: 9500 },
      { label: "Mar", income: 23700, expenses: 13200, profit: 10500 },
      { label: "Abr", income: 25700, expenses: 15000, profit: 10700 },
    ],
  },
};

export function getDashboardRangeMock(range: DashboardRangeKey): DashboardRangeData {
  return dashboardRangeMock[range];
}
