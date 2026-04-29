"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockClient, MockPriority, MockProject, MockProjectStatus, MockQuote, MockTechnician } from "@/mocks";

type ProjectFormModalProps = {
  open: boolean;
  project: MockProject | null;
  nextCode: string;
  clients: MockClient[];
  quotes: MockQuote[];
  technicians: MockTechnician[];
  onClose: () => void;
  onSubmit: (project: MockProject) => void;
};

type ProjectFormState = {
  name: string;
  clientId: string;
  quoteId: string;
  technicianId: string;
  status: MockProjectStatus;
  priority: MockPriority;
  startDate: string;
  dueDate: string;
  budget: string;
  progress: string;
  checklist: string;
  notes: string;
};

const emptyForm: ProjectFormState = {
  name: "",
  clientId: "",
  quoteId: "",
  technicianId: "",
  status: "pending",
  priority: "medium",
  startDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date().toISOString().slice(0, 10),
  budget: "0",
  progress: "0",
  checklist: "Asignar técnico\nCoordinar fecha de inicio\nEjecutar servicio\nEntregar conformidad",
  notes: "",
};

function projectToForm(project: MockProject | null): ProjectFormState {
  if (!project) return emptyForm;

  return {
    name: project.name,
    clientId: String(project.clientId),
    quoteId: project.quoteId ? String(project.quoteId) : "",
    technicianId: project.technicianId ? String(project.technicianId) : "",
    status: project.status,
    priority: project.priority,
    startDate: project.startDate,
    dueDate: project.dueDate,
    budget: String(project.budget),
    progress: String(project.progress),
    checklist: project.checklist.map((task) => task.title).join("\n"),
    notes: project.notes ?? "",
  };
}

export function ProjectFormModal({ open, project, nextCode, clients, quotes, technicians, onClose, onSubmit }: ProjectFormModalProps) {
  const [form, setForm] = useState<ProjectFormState>(emptyForm);

  useEffect(() => {
    if (open) setForm(projectToForm(project));
  }, [open, project]);

  const isEditing = Boolean(project);
  const selectedClient = useMemo(() => clients.find((client) => String(client.id) === form.clientId) ?? null, [clients, form.clientId]);
  const selectedQuote = useMemo(() => quotes.find((quote) => String(quote.id) === form.quoteId) ?? null, [form.quoteId, quotes]);
  const selectedTechnician = useMemo(
    () => technicians.find((technician) => String(technician.id) === form.technicianId) ?? null,
    [form.technicianId, technicians]
  );

  function updateForm<Key extends keyof ProjectFormState>(key: Key, value: ProjectFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleQuoteChange(value: string) {
    const quote = quotes.find((item) => String(item.id) === value);
    setForm((current) => ({
      ...current,
      quoteId: value,
      clientId: quote ? String(quote.clientId) : current.clientId,
      name: quote && current.name.trim().length === 0 ? quote.service : current.name,
      budget: quote ? String(quote.total) : current.budget,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const now = new Date().toISOString().slice(0, 10);
    const checklistTitles = form.checklist
      .split("\n")
      .map((title) => title.trim())
      .filter(Boolean);

    const checklist = checklistTitles.map((title, index) => {
      const previousTask = project?.checklist[index];
      return {
        id: previousTask?.id ?? index + 1,
        title,
        completed: previousTask?.completed ?? false,
      };
    });

    const budget = Number(form.budget) || 0;
    const progress = Math.min(100, Math.max(0, Number(form.progress) || 0));
    const client = selectedClient ?? clients[0];
    const technician = selectedTechnician;

    onSubmit({
      id: project?.id ?? Date.now(),
      code: project?.code ?? nextCode,
      name: form.name.trim(),
      clientId: client.id,
      clientName: client.name,
      quoteId: selectedQuote?.id ?? null,
      technicianId: technician?.id ?? null,
      technicianName: technician?.name ?? null,
      status: form.status,
      priority: form.priority,
      startDate: form.startDate,
      dueDate: form.dueDate,
      progress,
      isOverdue: form.status !== "completed" && new Date(form.dueDate) < new Date(now),
      budget,
      checklist,
      notes: form.notes.trim() || undefined,
      createdAt: project?.createdAt ?? now,
      updatedAt: now,
    });
  }

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar proyecto" : "Nuevo proyecto"}
      description="Formulario mock con estado local. Mantiene estructura lista para futura API."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="project-form">Guardar proyecto</Button>
        </div>
      }
    >
      <form id="project-form" className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            required
            label="Nombre del proyecto"
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
          />
          <Input label="Código" value={project?.code ?? nextCode} disabled />
          <Select label="Cotización asociada" value={form.quoteId} onChange={(event) => handleQuoteChange(event.target.value)}>
            <option value="">Sin cotización</option>
            {quotes.map((quote) => (
              <option key={quote.id} value={quote.id}>{quote.code} · {quote.clientName}</option>
            ))}
          </Select>
          <Select required label="Cliente" value={form.clientId} onChange={(event) => updateForm("clientId", event.target.value)}>
            <option value="" disabled>Selecciona cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </Select>
          <Select label="Técnico" value={form.technicianId} onChange={(event) => updateForm("technicianId", event.target.value)}>
            <option value="">Sin asignar</option>
            {technicians.map((technician) => (
              <option key={technician.id} value={technician.id}>{technician.name}</option>
            ))}
          </Select>
          <Select label="Estado" value={form.status} onChange={(event) => updateForm("status", event.target.value as MockProjectStatus)}>
            <option value="pending">Pendiente</option>
            <option value="scheduled">Programado</option>
            <option value="in_progress">En proceso</option>
            <option value="paused">Pausado</option>
            <option value="completed">Terminado</option>
            <option value="cancelled">Cancelado</option>
          </Select>
          <Select label="Prioridad" value={form.priority} onChange={(event) => updateForm("priority", event.target.value as MockPriority)}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="urgent">Urgente</option>
          </Select>
          <Input
            type="number"
            min={0}
            max={100}
            label="Avance %"
            value={form.progress}
            onChange={(event) => updateForm("progress", event.target.value)}
          />
          <Input
            required
            type="date"
            label="Fecha inicio"
            value={form.startDate}
            onChange={(event) => updateForm("startDate", event.target.value)}
          />
          <Input
            required
            type="date"
            label="Fecha entrega"
            value={form.dueDate}
            onChange={(event) => updateForm("dueDate", event.target.value)}
          />
          <Input
            required
            type="number"
            min={0}
            step="0.01"
            label="Presupuesto"
            value={form.budget}
            onChange={(event) => updateForm("budget", event.target.value)}
          />
        </div>

        <Textarea
          label="Checklist"
          hint="Una tarea por línea."
          rows={5}
          value={form.checklist}
          onChange={(event) => updateForm("checklist", event.target.value)}
        />

        <Textarea
          label="Notas internas"
          rows={4}
          value={form.notes}
          onChange={(event) => updateForm("notes", event.target.value)}
        />
      </form>
    </Modal>
  );
}
