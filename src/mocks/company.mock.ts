import type { MockCompany, MockCompanySchedule } from "./types";

export const companyMock: MockCompany = {
  id: 1,
  name: "ElectroServicios Lima",
  commercialName: "ElectroLima Pro",
  ruc: "20601234567",
  category: "Servicios técnicos",
  description:
    "Empresa especializada en CCTV, canalizado, mantenimiento preventivo y soluciones técnicas para hogares, empresas e instituciones.",
  logoUrl: "/mock/company/logo.png",
  coverUrl: "/mock/company/cover.jpg",
  status: "active",
  profileCompletion: 82,
  address: "Av. Principal 123, Santiago de Surco",
  districtsCoverage: ["Santiago de Surco", "Miraflores", "San Borja", "San Miguel"],
  phone: "987 654 321",
  email: "contacto@electrolimapro.pe",
  website: "https://electrolimapro.pe",
  socialLinks: {
    facebook: "https://facebook.com/electrolimapro",
    instagram: "https://instagram.com/electrolimapro",
    tiktok: "",
    linkedin: "",
  },
  legalRepresentative: "Carlos Mendoza",
  createdAt: "2026-04-01",
};

export const companyScheduleMock: MockCompanySchedule[] = [
  { day: "Lunes", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Martes", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Miércoles", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Jueves", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Viernes", isOpen: true, openTime: "08:00", closeTime: "18:00" },
  { day: "Sábado", isOpen: true, openTime: "09:00", closeTime: "13:00" },
  { day: "Domingo", isOpen: false, openTime: null, closeTime: null },
];
