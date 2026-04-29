import type { MockQuote, MockTimelineEvent } from "./types";

export const quotesMock: MockQuote[] = [
  {
    id: 1,
    code: "COT-2026-001",
    clientId: 1,
    clientName: "Constructora Lima SAC",
    service: "Sistema CCTV + canalizado",
    status: "sent",
    issueDate: "2026-04-18",
    expirationDate: "2026-04-30",
    subtotal: 8750,
    tax: 1575,
    total: 10325,
    responsible: "Asistente Comercial",
    items: [
      { id: 1, description: "Instalación CCTV", quantity: 1, unitPrice: 6500, total: 6500 },
      { id: 2, description: "Canalizado y materiales", quantity: 1, unitPrice: 2250, total: 2250 },
    ],
    notes: "Validez de 12 días. 50% de adelanto.",
    terms: ["50% de adelanto", "Saldo contra entrega", "Garantía de 6 meses"],
    createdAt: "2026-04-18",
    updatedAt: "2026-04-19",
  },
  {
    id: 2,
    code: "COT-2026-002",
    clientId: 2,
    clientName: "Colegio San Marcos",
    service: "Instalación de cámaras IP",
    status: "approved",
    issueDate: "2026-04-19",
    expirationDate: "2026-04-26",
    subtotal: 12400,
    tax: 2232,
    total: 14632,
    responsible: "Admin Principal",
    items: [
      { id: 1, description: "Cámaras IP 4MP", quantity: 12, unitPrice: 520, total: 6240 },
      { id: 2, description: "Instalación y configuración", quantity: 1, unitPrice: 6160, total: 6160 },
    ],
    terms: ["40% de adelanto", "Incluye configuración remota", "No incluye obras civiles mayores"],
    createdAt: "2026-04-19",
    updatedAt: "2026-04-20",
  },
  {
    id: 3,
    code: "COT-2026-003",
    clientId: 3,
    clientName: "Condominio Las Palmas",
    service: "Canalizado en sótano",
    status: "draft",
    issueDate: "2026-04-24",
    expirationDate: "2026-05-01",
    subtotal: 4200,
    tax: 756,
    total: 4956,
    responsible: "Admin Principal",
    items: [
      { id: 1, description: "Canalizado EMT", quantity: 80, unitPrice: 35, total: 2800 },
      { id: 2, description: "Cajas de pase y accesorios", quantity: 1, unitPrice: 1400, total: 1400 },
    ],
    createdAt: "2026-04-24",
  },
];

export const quoteTimelineMock: Record<number, MockTimelineEvent[]> = {
  1: [
    { id: 1, entityType: "quote", entityId: 1, title: "Cotización creada", createdAt: "2026-04-18 10:00", createdBy: "Asistente Comercial" },
    { id: 2, entityType: "quote", entityId: 1, title: "Cotización enviada", createdAt: "2026-04-18 15:30", createdBy: "Asistente Comercial" },
  ],
  2: [
    { id: 3, entityType: "quote", entityId: 2, title: "Cotización creada", createdAt: "2026-04-19 09:10", createdBy: "Admin Principal" },
    { id: 4, entityType: "quote", entityId: 2, title: "Cotización aprobada", createdAt: "2026-04-20 11:15", createdBy: "Admin Principal" },
    { id: 5, entityType: "project", entityId: 1, title: "Convertida en proyecto", createdAt: "2026-04-20 12:00", createdBy: "Admin Principal" },
  ],
};
