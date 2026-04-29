"use client";

import { useMemo, useState } from "react";
import { servicesMock, type MockService, type MockServiceStatus } from "@/mocks";
import { ServiceDetailDrawer } from "./_components/ServiceDetailDrawer";
import { ServiceFormModal } from "./_components/ServiceFormModal";
import { ServicesFilters } from "./_components/ServicesFilters";
import { ServicesGrid } from "./_components/ServicesGrid";
import { ServicesHeader } from "./_components/ServicesHeader";
import { ServicesStats } from "./_components/ServicesStats";
import { ServicesTable } from "./_components/ServicesTable";

type ServiceStatusFilter = MockServiceStatus | "all";
type ViewMode = "table" | "grid";

function touchService(service: MockService): MockService {
  return {
    ...service,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
}

export default function ServiciosPage() {
  const [services, setServices] = useState<MockService[]>(servicesMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ServiceStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedService, setSelectedService] = useState<MockService | null>(null);
  const [editingService, setEditingService] = useState<MockService | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(services.map((service) => service.category))).sort(),
    [services]
  );

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        query.length === 0 ||
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.frequentMaterials.some((material) => material.toLowerCase().includes(query));

      const matchesStatus = statusFilter === "all" || service.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [services, search, statusFilter, categoryFilter]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const handleCreateService = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const handleEditService = (service: MockService) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleViewService = (service: MockService) => {
    setSelectedService(service);
    setIsDetailOpen(true);
  };

  const handleSubmitService = (service: MockService) => {
    const normalized = touchService(service);

    setServices((current) => {
      const exists = current.some((item) => item.id === service.id);
      if (exists) {
        return current.map((item) => (item.id === service.id ? normalized : item));
      }
      return [normalized, ...current];
    });

    setSelectedService((current) => (current?.id === service.id ? normalized : current));
    setIsFormOpen(false);
    showNotice(service.id === editingService?.id ? "Servicio actualizado correctamente." : "Servicio creado correctamente.");
  };

  const handleChangeStatus = (service: MockService, status: MockServiceStatus) => {
    const updatedService = touchService({ ...service, status });

    setServices((current) => current.map((item) => (item.id === service.id ? updatedService : item)));
    setSelectedService((current) => (current?.id === service.id ? updatedService : current));
    showNotice(`Estado de ${service.name} actualizado.`);
  };

  const handleDuplicateService = (service: MockService) => {
    const nextId = Math.max(...services.map((item) => item.id), 0) + 1;
    const duplicated: MockService = {
      ...service,
      id: nextId,
      name: `${service.name} copia`,
      status: "draft",
      timesUsed: 0,
      generatedRevenue: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setServices((current) => [duplicated, ...current]);
    showNotice("Servicio duplicado como borrador.");
  };

  const handleUseInQuote = (service: MockService) => {
    showNotice(`${service.name} agregado a una cotización mock.`);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="space-y-6">
      <ServicesHeader onCreateService={handleCreateService} />

      {notice ? (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm font-medium text-white shadow-sm">
          {notice}
        </div>
      ) : null}

      <ServicesStats services={services} />

      <ServicesFilters
        search={search}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        viewMode={viewMode}
        categories={categories}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onViewModeChange={setViewMode}
        onReset={handleResetFilters}
      />

      {viewMode === "table" ? (
        <ServicesTable
          services={filteredServices}
          onView={handleViewService}
          onEdit={handleEditService}
          onChangeStatus={handleChangeStatus}
          onDuplicate={handleDuplicateService}
          onUseInQuote={handleUseInQuote}
        />
      ) : (
        <ServicesGrid
          services={filteredServices}
          onView={handleViewService}
          onEdit={handleEditService}
          onChangeStatus={handleChangeStatus}
          onDuplicate={handleDuplicateService}
          onUseInQuote={handleUseInQuote}
        />
      )}

      <ServiceDetailDrawer
        service={selectedService}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEditService}
        onChangeStatus={handleChangeStatus}
        onDuplicate={handleDuplicateService}
        onUseInQuote={handleUseInQuote}
      />

      <ServiceFormModal
        open={isFormOpen}
        service={editingService}
        categories={categories}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitService}
      />
    </div>
  );
}
