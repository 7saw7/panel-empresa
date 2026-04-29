"use client";

import { useMemo, useState } from "react";
import {
  calculateInventoryValue,
  getStockStatus,
  inventoryMock,
  inventoryMovementsMock,
  type MockInventoryItem,
  type MockInventoryMovement,
  type MockInventoryMovementType,
  type MockInventoryStatus,
} from "@/mocks";
import { InventoryDetailDrawer } from "./_components/InventoryDetailDrawer";
import { InventoryFilters } from "./_components/InventoryFilters";
import { InventoryFormModal } from "./_components/InventoryFormModal";
import { InventoryHeader } from "./_components/InventoryHeader";
import { InventoryMovementModal } from "./_components/InventoryMovementModal";
import { InventoryStats } from "./_components/InventoryStats";
import { InventoryTable } from "./_components/InventoryTable";

type InventoryStatusFilter = MockInventoryStatus | "all";

function normalizeItem(item: MockInventoryItem): MockInventoryItem {
  const totalValue = calculateInventoryValue(item);
  return {
    ...item,
    totalValue,
    status: getStockStatus(item.stock, item.minStock),
  };
}

export default function InventarioPage() {
  const [items, setItems] = useState<MockInventoryItem[]>(inventoryMock);
  const [movements, setMovements] = useState<MockInventoryMovement[]>(inventoryMovementsMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InventoryStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MockInventoryItem | null>(null);
  const [editingItem, setEditingItem] = useState<MockInventoryItem | null>(null);
  const [movementItem, setMovementItem] = useState<MockInventoryItem | null>(null);
  const [movementType, setMovementType] = useState<MockInventoryMovementType>("entry");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMovementOpen, setIsMovementOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))).sort(), [items]);
  const suppliers = useMemo(() => Array.from(new Set(items.map((item) => item.supplier))).sort(), [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query) ||
        item.unit.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesSupplier = supplierFilter === "all" || item.supplier === supplierFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesSupplier;
    });
  }, [items, search, statusFilter, categoryFilter, supplierFilter]);

  const selectedMovements = useMemo(() => {
    if (!selectedItem) return [];
    return movements.filter((movement) => movement.productId === selectedItem.id);
  }, [movements, selectedItem]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const handleCreateItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: MockInventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleViewItem = (item: MockInventoryItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleSubmitItem = (item: MockInventoryItem) => {
    const normalized = normalizeItem(item);

    setItems((current) => {
      const exists = current.some((currentItem) => currentItem.id === normalized.id);
      if (exists) {
        return current.map((currentItem) => (currentItem.id === normalized.id ? normalized : currentItem));
      }
      return [normalized, ...current];
    });

    setSelectedItem((current) => (current?.id === normalized.id ? normalized : current));
    setIsFormOpen(false);
    showNotice(item.id === editingItem?.id ? "Producto actualizado correctamente." : "Producto creado correctamente.");
  };

  const handleOpenMovement = (item: MockInventoryItem, type: MockInventoryMovementType) => {
    setMovementItem(item);
    setMovementType(type);
    setIsMovementOpen(true);
  };

  const handleSubmitMovement = (movement: MockInventoryMovement) => {
    setMovements((current) => [movement, ...current]);

    setItems((current) =>
      current.map((item) => {
        if (item.id !== movement.productId) return item;
        return normalizeItem({ ...item, stock: movement.newStock, lastMovementAt: movement.createdAt.slice(0, 10) });
      })
    );

    setSelectedItem((current) => {
      if (!current || current.id !== movement.productId) return current;
      return normalizeItem({ ...current, stock: movement.newStock, lastMovementAt: movement.createdAt.slice(0, 10) });
    });

    setIsMovementOpen(false);
    showNotice("Movimiento de inventario registrado correctamente.");
  };

  const handleAssociateToService = (item: MockInventoryItem) => {
    showNotice(`${item.name} asociado a un servicio mock.`);
  };

  const handleAssociateToProject = (item: MockInventoryItem) => {
    showNotice(`${item.name} asociado a un proyecto mock.`);
  };

  const handleExport = () => {
    showNotice("Reporte de inventario exportado en modo mock.");
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSupplierFilter("all");
  };

  return (
    <div className="space-y-6">
      <InventoryHeader onCreateItem={handleCreateItem} onExport={handleExport} />

      {notice ? (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm font-medium text-white shadow-sm">
          {notice}
        </div>
      ) : null}

      <InventoryStats items={items} movements={movements} />

      <InventoryFilters
        search={search}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        supplierFilter={supplierFilter}
        categories={categories}
        suppliers={suppliers}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onSupplierChange={setSupplierFilter}
        onReset={handleResetFilters}
      />

      <InventoryTable
        items={filteredItems}
        onView={handleViewItem}
        onEdit={handleEditItem}
        onEntry={(item) => handleOpenMovement(item, "entry")}
        onExit={(item) => handleOpenMovement(item, "exit")}
        onAdjust={(item) => handleOpenMovement(item, "adjustment")}
        onAssociateToService={handleAssociateToService}
        onAssociateToProject={handleAssociateToProject}
      />

      <InventoryDetailDrawer
        item={selectedItem}
        movements={selectedMovements}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEditItem}
        onEntry={(item) => handleOpenMovement(item, "entry")}
        onExit={(item) => handleOpenMovement(item, "exit")}
        onAdjust={(item) => handleOpenMovement(item, "adjustment")}
      />

      <InventoryFormModal
        open={isFormOpen}
        item={editingItem}
        categories={categories}
        suppliers={suppliers}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitItem}
      />

      <InventoryMovementModal
        open={isMovementOpen}
        item={movementItem}
        type={movementType}
        nextId={Math.max(...movements.map((movement) => movement.id), 0) + 1}
        onClose={() => setIsMovementOpen(false)}
        onSubmit={handleSubmitMovement}
      />
    </div>
  );
}
