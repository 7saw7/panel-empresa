import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import type { MockInventoryItem } from "@/mocks";

type InventoryFormModalProps = {
  open: boolean;
  item: MockInventoryItem | null;
  categories: string[];
  suppliers: string[];
  onClose: () => void;
  onSubmit: (item: MockInventoryItem) => void;
};

type InventoryFormState = {
  name: string;
  category: string;
  stock: string;
  minStock: string;
  unit: string;
  supplier: string;
  unitCost: string;
};

function createInitialState(item: MockInventoryItem | null): InventoryFormState {
  return {
    name: item?.name ?? "",
    category: item?.category ?? "",
    stock: item ? String(item.stock) : "0",
    minStock: item ? String(item.minStock) : "0",
    unit: item?.unit ?? "unidades",
    supplier: item?.supplier ?? "",
    unitCost: item ? String(item.unitCost) : "0",
  };
}

export function InventoryFormModal({ open, item, categories, suppliers, onClose, onSubmit }: InventoryFormModalProps) {
  const [form, setForm] = useState<InventoryFormState>(() => createInitialState(item));

  useEffect(() => {
    if (open) setForm(createInitialState(item));
  }, [open, item]);

  const categoryOptions = useMemo(() => {
    const options = new Set(categories);
    if (form.category.trim()) options.add(form.category.trim());
    return Array.from(options).sort();
  }, [categories, form.category]);

  const supplierOptions = useMemo(() => {
    const options = new Set(suppliers);
    if (form.supplier.trim()) options.add(form.supplier.trim());
    return Array.from(options).sort();
  }, [suppliers, form.supplier]);

  const handleChange = <K extends keyof InventoryFormState>(key: K, value: InventoryFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const now = new Date().toISOString().slice(0, 10);
    const stock = Number(form.stock) || 0;
    const minStock = Number(form.minStock) || 0;
    const unitCost = Number(form.unitCost) || 0;

    onSubmit({
      id: item?.id ?? Date.now(),
      name: form.name.trim() || "Producto sin nombre",
      category: form.category.trim() || "Sin categoría",
      stock,
      minStock,
      unit: form.unit.trim() || "unidades",
      supplier: form.supplier.trim() || "Sin proveedor",
      unitCost,
      totalValue: stock * unitCost,
      status: item?.status ?? "available",
      lastMovementAt: item?.lastMovementAt ?? now,
    });
  };

  return (
    <Modal
      open={open}
      title={item ? "Editar producto" : "Nuevo producto"}
      description="Completa los datos base del material o producto de inventario."
      onClose={onClose}
      footer={<div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit" form="inventory-form">Guardar producto</Button></div>}
    >
      <form id="inventory-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Producto" value={form.name} onChange={(event) => handleChange("name", event.target.value)} placeholder="Ej. Cámara IP 4MP" required />
          <Input label="Categoría" list="inventory-categories" value={form.category} onChange={(event) => handleChange("category", event.target.value)} placeholder="Ej. Cámaras" required />
          <datalist id="inventory-categories">{categoryOptions.map((category) => <option key={category} value={category} />)}</datalist>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Stock actual" type="number" min="0" value={form.stock} onChange={(event) => handleChange("stock", event.target.value)} />
          <Input label="Stock mínimo" type="number" min="0" value={form.minStock} onChange={(event) => handleChange("minStock", event.target.value)} />
          <Input label="Unidad" value={form.unit} onChange={(event) => handleChange("unit", event.target.value)} placeholder="unidades, cajas, metros" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Proveedor" list="inventory-suppliers" value={form.supplier} onChange={(event) => handleChange("supplier", event.target.value)} placeholder="Ej. Distribuidora Lima" />
          <datalist id="inventory-suppliers">{supplierOptions.map((supplier) => <option key={supplier} value={supplier} />)}</datalist>
          <Input label="Costo unitario" type="number" min="0" step="0.01" value={form.unitCost} onChange={(event) => handleChange("unitCost", event.target.value)} />
        </div>
      </form>
    </Modal>
  );
}
