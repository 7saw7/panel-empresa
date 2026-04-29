import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  FolderKanban,
  HardHat,
  Image,
  LayoutDashboard,
  Package,
  Settings,
  UserRound,
  Wrench,
} from "lucide-react";

export type AdminCompanyNavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

export const ADMIN_COMPANY_NAV: AdminCompanyNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Clientes",
    href: "/clientes",
    icon: UserRound,
  },
  {
    label: "Cotizaciones",
    href: "/cotizaciones",
    icon: FileText,
  },
  {
    label: "Proyectos / Obras",
    href: "/proyectos",
    icon: FolderKanban,
  },
  {
    label: "Inventario",
    href: "/inventario",
    icon: Package,
  },
  {
    label: "Técnicos",
    href: "/tecnicos",
    icon: HardHat,
  },
  {
    label: "Finanzas",
    href: "/finanzas",
    icon: BarChart3,
  },
  {
    label: "Evidencias",
    href: "/evidencias",
    icon: Image,
  },
  {
    label: "Servicios",
    href: "/servicios",
    icon: Wrench,
  },
  {
    label: "Empresa",
    href: "/empresa",
    icon: BriefcaseBusiness,
  },
  {
    label: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
];