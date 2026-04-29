"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { calculateQuoteTotals, clientsMock, servicesMock } from "@/mocks";
import type { MockQuote, MockQuoteStatus } from "@/mocks";

type QuoteFormModalProps = {
  open: boolean;
  quote: MockQuote | null;
  nextCode: string;
  onClose: () => void;
  onSubmit: (quote: MockQuote) => void;
};

type QuoteItemFormState = {
  id: number;
  description: string;
  quantity: string;
  unitPrice: string;
};

type QuoteFormState = {
  clientId: string;
  service: string;
  status: MockQuoteStatus;
  issueDate: string;
  expirationDate: string;
  responsible: string;
  notes: string;
  terms: string;
  items: QuoteItemFormState[];
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultExpirationDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
}

const emptyForm: QuoteFormState = {
  clientId: String(clientsMock[0]?.id ?? 1),
  service: servicesMock[0]?.name ?? "Servicio técnico",
  status: "draft",
  issueDate: getToday(),
  expirationDate: getDefaultExpirationDate(),
  responsible: "Admin Principal",
  notes: "Validez de 7 días. Montos expresados en soles.",
  terms: "50% de adelanto, Saldo contra entrega, Garantía de 6 meses",
  items: [{ id: 1, description: servicesMock[0]?.name ?? "Servicio técnico", quantity: "1", unitPrice: "850" }],
};

function quoteToForm(quote: MockQuote | null): QuoteFormState {
  if (!quote) return emptyForm;

  return {
    clientId: String(quote.clientId),
    service: quote.service,
    status: quote.status,
    issueDate: quote.issueDate,
    expirationDate: quote.expirationDate,
    responsible: quote.responsible,
    notes: quote.notes ?? "",
    terms: quote.terms?.join(", ") ?? "",
    items: quote.items.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: String(item.quantity),
      unitPrice: String(item.unitPrice),
    })),
  };
}

export function QuoteFormModal({ open, quote, nextCode, onClose, onSubmit }: QuoteFormModalProps) {
  const [form, setForm] = useState<QuoteFormState>(emptyForm);

  useEffect(() => {
    if (open) setForm(quoteToForm(quote));
  }, [open, quote]);

  const isEditing = Boolean(quote);
  const normalizedItems = form.items.map((item) => ({
    id: item.id,
    description: item.description.trim(),
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unitPrice) || 0,
  }));
  const totals = calculateQuoteTotals(normalizedItems);

  function updateForm<Key extends keyof QuoteFormState>(key: Key, value: QuoteFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateItem(id: number, key: keyof QuoteItemFormState, value: string) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }));
  }

  function addItem() {
    setForm((current) => ({
      ...current,
      items: [...current.items, { id: Date.now(), description: "", quantity: "1", unitPrice: "0" }],
    }));
  }

  function removeItem(id: number) {
    setForm((current) => ({ ...current, items: current.items.filter((item) => item.id !== id) }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const client = clientsMock.find((item) => String(item.id) === form.clientId) ?? clientsMock[0];
    const now = getToday();
    const items = normalizedItems
      .filter((item) => item.description.length > 0 && item.quantity > 0)
      .map((item, index) => ({ ...item, id: index + 1, total: Number((item.quantity * item.unitPrice).toFixed(2)) }));
    const calculated = calculateQuoteTotals(items);

    onSubmit({
      id: quote?.id ?? Date.now(),
      code: quote?.code ?? nextCode,
      clientId: client?.id ?? Number(form.clientId),
      clientName: client?.name ?? "Cliente sin nombre",
      service: form.service.trim(),
      status: form.status,
      issueDate: form.issueDate,
      expirationDate: form.expirationDate,
      subtotal: calculated.subtotal,
      tax: calculated.tax,
      total: calculated.total,
      responsible: form.responsible.trim(),
      items,
      notes: form.notes.trim() || undefined,
      terms: form.terms.split(",").map((term) => term.trim()).filter(Boolean),
      createdAt: quote?.createdAt ?? now,
      updatedAt: now,
    });
  }

  return (
    <Modal
      open={open}
      title={isEditing ? "Editar cotización" : "Nueva cotización"}
      description="Formulario mock con cálculo automático de subtotal, IGV y total."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="quote-form">Guardar cotización</Button>
        </div>
      }
    >
      <form id="quote-form" className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Cliente" value={form.clientId} onChange={(event) => updateForm("clientId", event.target.value)}>
            {clientsMock.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
          </Select>
          <Input required label="Servicio principal" value={form.service} onChange={(event) => updateForm("service", event.target.value)} />
          <Select label="Estado" value={form.status} onChange={(event) => updateForm("status", event.target.value as MockQuoteStatus)}>
            <option value="draft">Borrador</option>
            <option value="sent">Enviada</option>
            <option value="approved">Aprobada</option>
            <option value="rejected">Rechazada</option>
            <option value="expired">Vencida</option>
          </Select>
          <Input required label="Responsable" value={form.responsible} onChange={(event) => updateForm("responsible", event.target.value)} />
          <Input required type="date" label="Fecha emisión" value={form.issueDate} onChange={(event) => updateForm("issueDate", event.target.value)} />
          <Input required type="date" label="Fecha vencimiento" value={form.expirationDate} onChange={(event) => updateForm("expirationDate", event.target.value)} />
        </div>

        <div className="space-y-3 rounded-3xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-neutral-950">Items</p>
              <p className="text-sm text-neutral-500">Servicios, productos o conceptos cotizados.</p>
            </div>
            <Button type="button" size="sm" variant="secondary" onClick={addItem}>Agregar item</Button>
          </div>

          {form.items.map((item) => (
            <div key={item.id} className="grid gap-3 rounded-2xl bg-neutral-50 p-3 md:grid-cols-[1.5fr_0.5fr_0.7fr_auto] md:items-end">
              <Input required label="Descripción" value={item.description} onChange={(event) => updateItem(item.id, "description", event.target.value)} />
              <Input required min="1" type="number" label="Cantidad" value={item.quantity} onChange={(event) => updateItem(item.id, "quantity", event.target.value)} />
              <Input required min="0" type="number" label="P. unitario" value={item.unitPrice} onChange={(event) => updateItem(item.id, "unitPrice", event.target.value)} />
              <Button type="button" variant="ghost" onClick={() => removeItem(item.id)} disabled={form.items.length === 1}>Quitar</Button>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-neutral-50 p-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>S/ {totals.subtotal.toFixed(2)}</span></div>
          <div className="mt-2 flex justify-between"><span>IGV 18%</span><span>S/ {totals.tax.toFixed(2)}</span></div>
          <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2 text-base font-semibold text-neutral-950"><span>Total</span><span>S/ {totals.total.toFixed(2)}</span></div>
        </div>

        <Textarea label="Notas" rows={3} value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} />
        <Textarea label="Condiciones" rows={3} hint="Separadas por comas" value={form.terms} onChange={(event) => updateForm("terms", event.target.value)} />
      </form>
    </Modal>
  );
}
