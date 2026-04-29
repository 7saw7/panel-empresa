"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockTechnician, MockTechnicianStatus } from "@/mocks";

type TechnicianFormModalProps = {
  open: boolean;
  technician: MockTechnician | null;
  onClose: () => void;
  onSubmit: (technician: MockTechnician) => void;
};

type TechnicianFormState = {
  name: string;
  phone: string;
  email: string;
  status: MockTechnicianStatus;
  zone: string;
  specialties: string;
  activeProjects: string;
  completedProjects: string;
  rating: string;
  assignedTo: string;
};

const emptyForm: TechnicianFormState = {
  name: "",
  phone: "",
  email: "",
  status: "available",
  zone: "",
  specialties: "",
  activeProjects: "0",
  completedProjects: "0",
  rating: "4.5",
  assignedTo: "",
};

function technicianToForm(technician: MockTechnician | null): TechnicianFormState {
  if (!technician) return emptyForm;

  return {
    name: technician.name,
    phone: technician.phone,
    email: technician.email,
    status: technician.status,
    zone: technician.zone,
    specialties: technician.specialties.join(", "),
    activeProjects: String(technician.activeProjects),
    completedProjects: String(technician.completedProjects),
    rating: String(technician.rating),
    assignedTo: technician.assignedTo ?? "",
  };
}

export function TechnicianFormModal({ open, technician, onClose, onSubmit }: TechnicianFormModalProps) {
  const [form, setForm] = useState<TechnicianFormState>(() => technicianToForm(technician));

  useEffect(() => {
    if (open) setForm(technicianToForm(technician));
  }, [open, technician]);

  const updateField = <K extends keyof TechnicianFormState>(field: K, value: TechnicianFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const nextTechnician: MockTechnician = {
      id: technician?.id ?? Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      status: form.status,
      zone: form.zone.trim(),
      specialties: form.specialties.split(",").map((specialty) => specialty.trim()).filter(Boolean),
      activeProjects: Number(form.activeProjects) || 0,
      completedProjects: Number(form.completedProjects) || 0,
      rating: Math.min(5, Math.max(0, Number(form.rating) || 0)),
      lastActivity: technician?.lastActivity ?? now,
      assignedTo: form.assignedTo.trim() || undefined,
      schedule: technician?.schedule ?? [],
    };

    onSubmit(nextTechnician);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={technician ? "Editar técnico" : "Nuevo técnico"}
      description="Registra información operativa del técnico. Todo se guarda solo en estado local mock."
      footer={
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="technician-form">Guardar</Button>
        </div>
      }
    >
      <form id="technician-form" className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nombre" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          <Input label="Teléfono" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
          <Input label="Correo" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
          <Select label="Estado" value={form.status} onChange={(event) => updateField("status", event.target.value as MockTechnicianStatus)}>
            <option value="available">Disponible</option>
            <option value="busy">Ocupado</option>
            <option value="offline">Fuera de horario</option>
            <option value="inactive">Inactivo</option>
          </Select>
          <Input label="Zona" value={form.zone} onChange={(event) => updateField("zone", event.target.value)} required />
          <Input label="Asignado a" value={form.assignedTo} onChange={(event) => updateField("assignedTo", event.target.value)} placeholder="Cliente o proyecto actual" />
          <Input label="Proyectos activos" type="number" min={0} value={form.activeProjects} onChange={(event) => updateField("activeProjects", event.target.value)} />
          <Input label="Proyectos terminados" type="number" min={0} value={form.completedProjects} onChange={(event) => updateField("completedProjects", event.target.value)} />
          <Input label="Calificación" type="number" min={0} max={5} step="0.1" value={form.rating} onChange={(event) => updateField("rating", event.target.value)} />
        </div>

        <Textarea
          label="Especialidades"
          hint="Separadas por coma. Ejemplo: CCTV, Redes, Cableado estructurado"
          value={form.specialties}
          onChange={(event) => updateField("specialties", event.target.value)}
          rows={3}
        />
      </form>
    </Modal>
  );
}
