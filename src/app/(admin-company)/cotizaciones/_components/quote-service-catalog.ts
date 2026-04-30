export type QuoteCatalogService = {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  suggestedQuantity: number;
  category: "instalacion" | "mantenimiento" | "materiales" | "diagnostico";
};

export const quoteCatalogServices: QuoteCatalogService[] = [
  {
    id: "cctv-install",
    name: "Instalación CCTV",
    description: "Servicio de instalación, configuración y pruebas de cámaras.",
    unitPrice: 6500,
    suggestedQuantity: 1,
    category: "instalacion",
  },
  {
    id: "ip-camera",
    name: "Cámara IP 4MP",
    description: "Cámara IP para proyectos de videovigilancia.",
    unitPrice: 520,
    suggestedQuantity: 4,
    category: "materiales",
  },
  {
    id: "structured-cabling",
    name: "Canalizado EMT",
    description: "Canalizado, cableado y accesorios de instalación.",
    unitPrice: 35,
    suggestedQuantity: 40,
    category: "materiales",
  },
  {
    id: "preventive-maintenance",
    name: "Mantenimiento preventivo",
    description: "Revisión programada, limpieza, pruebas y reporte técnico.",
    unitPrice: 1200,
    suggestedQuantity: 1,
    category: "mantenimiento",
  },
  {
    id: "technical-report",
    name: "Reporte técnico con evidencias",
    description: "Informe operativo con fotos, observaciones y recomendaciones.",
    unitPrice: 600,
    suggestedQuantity: 1,
    category: "diagnostico",
  },
  {
    id: "technical-diagnosis",
    name: "Diagnóstico técnico",
    description: "Visita técnica para evaluación de fallas o alcance.",
    unitPrice: 450,
    suggestedQuantity: 1,
    category: "diagnostico",
  },
];

export function getCatalogServiceById(serviceId: string) {
  return quoteCatalogServices.find((service) => service.id === serviceId) ?? null;
}
