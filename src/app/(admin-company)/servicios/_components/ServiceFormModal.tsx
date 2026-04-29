import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockService, MockServiceStatus } from "@/mocks";

type ServiceFormModalProps = {
  open: boolean;
  service: MockService | null;
  categories: string[];
  onClose: () => void;
  onSubmit: (service: MockService) => void;
};

type ServiceFormState = {
  name: string;
  category: string;
  description: string;
  status: MockServiceStatus;
  basePrice: string;
  estimatedDuration: string;
  frequentMaterials: string;
};

function createInitialState(service: MockService | null): ServiceFormState {
  return {
    name: service?.name ?? "",
    category: service?.category ?? "",
    description: service?.description ?? "",
    status: service?.status ?? "draft",
    basePrice: service ? String(service.basePrice) : "0",
    estimatedDuration: service?.estimatedDuration ?? "",
    frequentMaterials: service?.frequentMaterials.join(", ") ?? "",
  };
}

export function ServiceFormModal({ open, service, categories, onClose, onSubmit }: ServiceFormModalProps) {
  const [form, setForm] = useState<ServiceFormState>(() => createInitialState(service));

  useEffect(() => {
    if (open) setForm(createInitialState(service));
  }, [open, service]);

  const categoryOptions = useMemo(() => {
    const options = new Set(categories);
    if (form.category.trim()) options.add(form.category.trim());
    return Array.from(options).sort();
  }, [categories, form.category]);

  const handleChange = <K extends keyof ServiceFormState>(key: K, value: ServiceFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const now = new Date().toISOString().slice(0, 10);
    const materials = form.frequentMaterials.split(",").map((material) => material.trim()).filter(Boolean);

    onSubmit({
      id: service?.id ?? Date.now(),
      name: form.name.trim() || "Servicio sin nombre",
      category: form.category.trim() || "Sin categoría",
      description: form.description.trim() || "Descripción pendiente.",
      status: form.status,
      basePrice: Number(form.basePrice) || 0,
      estimatedDuration: form.estimatedDuration.trim() || "Por definir",
      timesUsed: service?.timesUsed ?? 0,
      generatedRevenue: service?.generatedRevenue ?? 0,
      frequentMaterials: materials.length > 0 ? materials : ["Por definir"],
      createdAt: service?.createdAt ?? now,
      updatedAt: now,
    });
  };

  return (
    <Modal
      open={open}
      title={service ? "Editar servicio" : "Nuevo servicio"}
      description="Completa la información comercial del servicio mock."
      onClose={onClose}
      footer={<div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit" form="service-form">Guardar servicio</Button></div>}
    >
      <form id="service-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre del servicio" value={form.name} onChange={(event) => handleChange("name", event.target.value)} placeholder="Ej. Instalación CCTV" required />
          <Input label="Categoría" list="service-categories" value={form.category} onChange={(event) => handleChange("category", event.target.value)} placeholder="Ej. Seguridad electrónica" required />
          <datalist id="service-categories">{categoryOptions.map((category) => <option key={category} value={category} />)}</datalist>
        </div>

        <Textarea label="Descripción" value={form.description} onChange={(event) => handleChange("description", event.target.value)} placeholder="Describe alcance, entregables y condiciones básicas." rows={4} />

        <div className="grid gap-4 sm:grid-cols-3">
          <Select label="Estado" value={form.status} onChange={(event) => handleChange("status", event.target.value as MockServiceStatus)}>
            <option value="draft">Borrador</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
          <Input label="Precio base" type="number" min="0" step="0.01" value={form.basePrice} onChange={(event) => handleChange("basePrice", event.target.value)} />
          <Input label="Duración estimada" value={form.estimatedDuration} onChange={(event) => handleChange("estimatedDuration", event.target.value)} placeholder="Ej. 1 día" />
        </div>

        <Textarea label="Materiales frecuentes" hint="Sepáralos por comas." value={form.frequentMaterials} onChange={(event) => handleChange("frequentMaterials", event.target.value)} placeholder="Cable UTP, conectores RJ45, NVR" rows={3} />
      </form>
    </Modal>
  );
}
