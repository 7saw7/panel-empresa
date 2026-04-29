import type { MockActivityLog, MockRole, MockUser } from "./types";

export const usersMock: MockUser[] = [
  {
    id: 1,
    name: "Admin Principal",
    email: "admin@empresa.pe",
    role: "Administrador",
    status: "active",
    lastLogin: "2026-04-29 09:20",
  },
  {
    id: 2,
    name: "Asistente Comercial",
    email: "ventas@empresa.pe",
    role: "Ventas",
    status: "active",
    lastLogin: "2026-04-28 17:10",
  },
  {
    id: 3,
    name: "Supervisor Técnico",
    email: "operaciones@empresa.pe",
    role: "Operaciones",
    status: "invited",
    lastLogin: null,
  },
];

export const rolesMock: MockRole[] = [
  {
    id: 1,
    name: "Administrador",
    description: "Acceso completo a todos los módulos administrativos.",
    permissions: [
      "dashboard.view",
      "clients.manage",
      "quotes.manage",
      "projects.manage",
      "technicians.manage",
      "services.manage",
      "inventory.manage",
      "finances.manage",
      "evidences.manage",
      "company.manage",
      "settings.manage",
    ],
  },
  {
    id: 2,
    name: "Ventas",
    description: "Gestión comercial de clientes y cotizaciones.",
    permissions: ["dashboard.view", "clients.view", "clients.manage", "quotes.view", "quotes.manage", "projects.view"],
  },
  {
    id: 3,
    name: "Operaciones",
    description: "Gestión de proyectos, técnicos, inventario y evidencias.",
    permissions: ["dashboard.view", "projects.view", "projects.manage", "technicians.manage", "inventory.manage", "evidences.manage"],
  },
];

export const activityLogsMock: MockActivityLog[] = [
  {
    id: 1,
    userName: "Admin Principal",
    action: "Actualizó una cotización",
    module: "Cotizaciones",
    createdAt: "2026-04-29 09:30",
  },
  {
    id: 2,
    userName: "Asistente Comercial",
    action: "Registró un nuevo cliente",
    module: "Clientes",
    createdAt: "2026-04-28 16:40",
  },
  {
    id: 3,
    userName: "Luis Ramírez",
    action: "Subió una evidencia pendiente de revisión",
    module: "Evidencias",
    createdAt: "2026-04-27 11:30",
  },
];
