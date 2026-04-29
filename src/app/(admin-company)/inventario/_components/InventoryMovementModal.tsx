import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockInventoryItem, MockInventoryMovement, MockInventoryMovementType } from "@/mocks";

type InventoryMovementModalProps = {
  open: boolean;
  item: MockInventoryItem | null;
  type: MockInventoryMovementType;
  nextId: number;
  onClose: () => void;
  onSubmit: (movement: MockInventoryMovement) => void;
};

type MovementFormState = {
  type: MockInventoryMovementType;
  quantity: string;
  reason: string;
  projectName: string;
  responsible: string;
};

function getMovementLabel(type: MockInventoryMovementType) {
  if (type === "entry") return "Entrada";
  if (type === "exit") return "Salida";
  return "Ajuste";
}

function calculateNewStock(previousStock: number, type: MockInventoryMovementType, quantity: number) {
  if (type === "entry") return previousStock + quantity;
  if (type === "exit") return Math.max(previousStock - quantity, 0);
  return Math.max(quantity, 0);
}

export function InventoryMovementModal({ open, item, type, nextId, onClose, onSubmit }: InventoryMovementModalProps) {
  const [form, setForm] = useState<MovementFormState>({
    type,
    quantity: "1",
    reason: "",
    projectName: "",
    responsible: "Admin Principal",
  });

  useEffect(() => {
    if (open) {
      setForm({
        type,
        quantity: type === "adjustment" && item ? String(item.stock) : "1",
        reason: "",
        projectName: "",
        responsible: "Admin Principal",
      });
    }
  }, [open, type, item]);

  const handleChange = <K extends keyof MovementFormState>(key: K, value: MovementFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!item) return;

    const quantity = Math.max(Number(form.quantity) || 0, 0);
    const previousStock = item.stock;
    const newStock = calculateNewStock(previousStock, form.type, quantity);
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");

    onSubmit({
      id: nextId,
      productId: item.id,
      productName: item.name,
      type: form.type,
      quantity,
      previousStock,
      newStock,
      reason: form.reason.trim() || `${getMovementLabel(form.type)} registrada en modo mock`,
      projectId: form.projectName.trim() ? Date.now() : null,
      projectName: form.projectName.trim() || null,
      responsible: form.responsible.trim() || "Admin Principal",
      createdAt: now,
    });
  };

  return (
    <Modal
      open={open}
      title={`${getMovementLabel(form.type)} de inventario`}
      description={item ? `${item.name} · stock actual ${item.stock} ${item.unit}` : "Selecciona un producto para registrar movimiento."}
      onClose={onClose}
      footer={<div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit" form="inventory-movement-form" disabled={!item}>Registrar movimiento</Button></div>}
    >
      <form id="inventory-movement-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Tipo" value={form.type} onChange={(event) => handleChange("type", event.target.value as MockInventoryMovementType)}>
            <option value="entry">Entrada</option>
            <option value="exit">Salida</option>
            <option value="adjustment">Ajuste</option>
          </Select>
          <Input
            label={form.type === "adjustment" ? "Nuevo stock" : "Cantidad"}
            type="number"
            min="0"
            value={form.quantity}
            onChange={(event) => handleChange("quantity", event.target.value)}
          />
        </div>

        {item ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
            Stock resultante: <span className="font-semibold text-neutral-950">{calculateNewStock(item.stock, form.type, Number(form.quantity) || 0)} {item.unit}</span>
          </div>
        ) : null}

        <Textarea label="Motivo" value={form.reason} onChange={(event) => handleChange("reason", event.target.value)} placeholder="Ej. Uso en proyecto, reposición de stock, corrección de conteo..." rows={3} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Proyecto asociado" value={form.projectName} onChange={(event) => handleChange("projectName", event.target.value)} placeholder="Opcional" />
          <Input label="Responsable" value={form.responsible} onChange={(event) => handleChange("responsible", event.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
