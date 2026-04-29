"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockClient, MockClientStatus, MockClientType } from "@/mocks";

type ClientFormModalProps = {
  open: boolean;
  client: MockClient | null;
  onClose: () => void;
  onSubmit: (client: MockClient) => void;
};

type ClientFormState = {
  name: string;
  contactName: string;
  phone: string;
  email: string;
  district: string;
  address: string;
  type: MockClientType;
  status: MockClientStatus;
  tags: string;
  notes: string;
};

const emptyForm: ClientFormState = {
  name: "",
  contactName: "",
  phone: "",
  email: "",
  district: "",
  address: "",
  type: "Empresa",
  status: "prospect",
  tags: "Nuevo",
  notes: "",
};

function clientToForm(client: MockClient | null): ClientFormState {
  if (!client) return emptyForm;

  return {
    name: client.name,
    contactName: client.contactName,
    phone: client.phone,
    email: client.email,
    district: client.district,
    address: client.address ?? "",
    type: client.type,
    status: client.status,
    tags: client.tags.join(", "),
    notes: client.notes ?? "",
  };
}

export function ClientFormModal({ open, client, onClose, onSubmit }: ClientFormModalProps) {
  const [form, setForm] = useState<ClientFormState>(emptyForm);

  useEffect(() => {
    if (open) setForm(clientToForm(client));
  }, [client, open]);

  const isEditing = Boolean(client);

  function updateForm<Key extends keyof ClientFormState>(key: Key, value: ClientFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const now = new Date().toISOString().slice(0, 10);
    const normalizedTags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit({
      id: client?.id ?? Date.now(),
      name: form.name.trim(),
      contactName: form.contactName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      district: form.district.trim(),
      address: form.address.trim() || undefined,
      type: form.type,
      status: form.status,
      tags: normalizedTags.length > 0 ? normalizedTags : ["Nuevo"],
      notes: form.notes.trim() || undefined,
      createdAt: client?.createdAt ?? now,
      updatedAt: now,
    });
  }

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar cliente" : "Nuevo cliente"}
      description="Formulario mock con estado local. Luego puede conectarse a API real."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="client-form">
            Guardar cliente
          </Button>
        </div>
      }
    >
      <form id="client-form" className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            required
            label="Nombre del cliente"
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
          />
          <Input
            required
            label="Nombre de contacto"
            value={form.contactName}
            onChange={(event) => updateForm("contactName", event.target.value)}
          />
          <Input
            required
            label="Teléfono"
            value={form.phone}
            onChange={(event) => updateForm("phone", event.target.value)}
          />
          <Input
            required
            type="email"
            label="Correo"
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
          />
          <Input
            required
            label="Distrito"
            value={form.district}
            onChange={(event) => updateForm("district", event.target.value)}
          />
          <Input
            label="Dirección"
            value={form.address}
            onChange={(event) => updateForm("address", event.target.value)}
          />
          <Select
            label="Tipo"
            value={form.type}
            onChange={(event) => updateForm("type", event.target.value as MockClientType)}
          >
            <option value="Empresa">Empresa</option>
            <option value="Residencial">Residencial</option>
            <option value="Institución">Institución</option>
          </Select>
          <Select
            label="Estado"
            value={form.status}
            onChange={(event) => updateForm("status", event.target.value as MockClientStatus)}
          >
            <option value="active">Activo</option>
            <option value="prospect">Prospecto</option>
            <option value="with_project">Con proyecto</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </div>

        <Input
          label="Etiquetas"
          hint="Separadas por coma. Ejemplo: VIP, Frecuente"
          value={form.tags}
          onChange={(event) => updateForm("tags", event.target.value)}
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
