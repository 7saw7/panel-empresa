import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockFinanceMovement, MockFinanceMovementType, MockFinanceStatus } from "@/mocks";

type FinanceFormModalProps = {
  open: boolean;
  movement: MockFinanceMovement | null;
  defaultType: MockFinanceMovementType;
  paymentMethods: string[];
  onClose: () => void;
  onSubmit: (movement: MockFinanceMovement) => void;
};

type FinanceFormState = {
  type: MockFinanceMovementType;
  concept: string;
  clientName: string;
  providerName: string;
  projectName: string;
  paymentMethod: string;
  status: MockFinanceStatus;
  amount: string;
  dueDate: string;
  paidAt: string;
  notes: string;
};

function createInitialState(movement: MockFinanceMovement | null, defaultType: MockFinanceMovementType): FinanceFormState {
  return {
    type: movement?.type ?? defaultType,
    concept: movement?.concept ?? "",
    clientName: movement?.clientName ?? "",
    providerName: movement?.providerName ?? "",
    projectName: movement?.projectName ?? "",
    paymentMethod: movement?.paymentMethod ?? "Transferencia bancaria",
    status: movement?.status ?? "pending",
    amount: movement ? String(movement.amount) : "0",
    dueDate: movement?.dueDate ?? "2026-04-30",
    paidAt: movement?.paidAt ?? "",
    notes: movement?.notes ?? "",
  };
}

export function FinanceFormModal({ open, movement, defaultType, paymentMethods, onClose, onSubmit }: FinanceFormModalProps) {
  const [form, setForm] = useState<FinanceFormState>(() => createInitialState(movement, defaultType));

  useEffect(() => {
    if (open) setForm(createInitialState(movement, defaultType));
  }, [open, movement, defaultType]);

  const updateField = <K extends keyof FinanceFormState>(key: K, value: FinanceFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(form.amount) || 0;
    const id = movement?.id ?? Date.now();
    const code = movement?.code ?? `FIN-2026-${String(id).slice(-3).padStart(3, "0")}`;

    onSubmit({
      id,
      code,
      type: form.type,
      concept: form.concept.trim() || "Movimiento financiero mock",
      clientName: form.type === "income" ? form.clientName.trim() || null : null,
      providerName: form.type === "expense" ? form.providerName.trim() || null : null,
      projectId: movement?.projectId ?? null,
      projectName: form.projectName.trim() || null,
      quoteId: movement?.quoteId ?? null,
      paymentMethod: form.paymentMethod,
      status: form.status,
      amount,
      dueDate: form.dueDate,
      paidAt: form.status === "paid" ? form.paidAt || form.dueDate : null,
      createdAt: movement?.createdAt ?? new Date().toISOString().slice(0, 10),
      notes: form.notes.trim() || undefined,
    });
  };

  return (
    <Modal
      open={open}
      title={movement ? "Editar movimiento" : form.type === "income" ? "Nuevo ingreso" : "Nuevo egreso"}
      description="Formulario mock para simular movimientos financieros sin backend."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="finance-form">Guardar</Button>
        </div>
      }
    >
      <form id="finance-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Tipo" value={form.type} onChange={(event) => updateField("type", event.target.value as MockFinanceMovementType)}>
            <option value="income">Ingreso</option>
            <option value="expense">Egreso</option>
          </Select>

          <Select label="Estado" value={form.status} onChange={(event) => updateField("status", event.target.value as MockFinanceStatus)}>
            <option value="paid">Pagado</option>
            <option value="pending">Pendiente</option>
            <option value="overdue">Vencido</option>
            <option value="cancelled">Cancelado</option>
          </Select>
        </div>

        <Input label="Concepto" value={form.concept} onChange={(event) => updateField("concept", event.target.value)} placeholder="Pago inicial, compra de materiales..." />

        <div className="grid gap-4 sm:grid-cols-2">
          {form.type === "income" ? (
            <Input label="Cliente" value={form.clientName} onChange={(event) => updateField("clientName", event.target.value)} placeholder="Nombre del cliente" />
          ) : (
            <Input label="Proveedor" value={form.providerName} onChange={(event) => updateField("providerName", event.target.value)} placeholder="Nombre del proveedor" />
          )}

          <Input label="Proyecto asociado" value={form.projectName} onChange={(event) => updateField("projectName", event.target.value)} placeholder="Opcional" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Monto" type="number" min="0" step="0.01" value={form.amount} onChange={(event) => updateField("amount", event.target.value)} />

          <Select label="Método de pago" value={form.paymentMethod} onChange={(event) => updateField("paymentMethod", event.target.value)}>
            {paymentMethods.map((method) => <option key={method} value={method}>{method}</option>)}
          </Select>

          <Input label="Fecha vencimiento" type="date" value={form.dueDate} onChange={(event) => updateField("dueDate", event.target.value)} />
        </div>

        {form.status === "paid" ? (
          <Input label="Fecha de pago" type="date" value={form.paidAt} onChange={(event) => updateField("paidAt", event.target.value)} />
        ) : null}

        <Textarea label="Notas internas" rows={3} value={form.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Condiciones, observaciones o referencia interna." />
      </form>
    </Modal>
  );
}
