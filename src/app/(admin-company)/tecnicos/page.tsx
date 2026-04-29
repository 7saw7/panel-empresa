"use client";

import { useMemo, useState } from "react";
import {
  techniciansMock,
  type MockTechnician,
  type MockTechnicianStatus,
} from "@/mocks";
import { TechnicianDetailDrawer } from "./_components/TechnicianDetailDrawer";
import { TechnicianFormModal } from "./_components/TechnicianFormModal";
import { TechniciansFilters } from "./_components/TechniciansFilters";
import { TechniciansGrid } from "./_components/TechniciansGrid";
import { TechniciansHeader } from "./_components/TechniciansHeader";
import { TechniciansStats } from "./_components/TechniciansStats";
import { TechniciansTable } from "./_components/TechniciansTable";

type TechnicianStatusFilter = MockTechnicianStatus | "all";
type ViewMode = "table" | "grid";

function updateTechnicianActivity(technician: MockTechnician): MockTechnician {
  return {
    ...technician,
    lastActivity: new Date().toISOString().slice(0, 16).replace("T", " "),
  };
}

export default function TecnicosPage() {
  const [technicians, setTechnicians] = useState<MockTechnician[]>(techniciansMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TechnicianStatusFilter>("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedTechnician, setSelectedTechnician] = useState<MockTechnician | null>(null);
  const [editingTechnician, setEditingTechnician] = useState<MockTechnician | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const specialties = useMemo(
    () => Array.from(new Set(technicians.flatMap((technician) => technician.specialties))).sort(),
    [technicians]
  );

  const zones = useMemo(
    () => Array.from(new Set(technicians.map((technician) => technician.zone))).sort(),
    [technicians]
  );

  const filteredTechnicians = useMemo(() => {
    const query = search.trim().toLowerCase();

    return technicians.filter((technician) => {
      const matchesSearch =
        query.length === 0 ||
        technician.name.toLowerCase().includes(query) ||
        technician.email.toLowerCase().includes(query) ||
        technician.phone.toLowerCase().includes(query) ||
        technician.zone.toLowerCase().includes(query) ||
        technician.specialties.some((specialty) => specialty.toLowerCase().includes(query));

      const matchesStatus = statusFilter === "all" || technician.status === statusFilter;
      const matchesSpecialty = specialtyFilter === "all" || technician.specialties.includes(specialtyFilter);
      const matchesZone = zoneFilter === "all" || technician.zone === zoneFilter;

      return matchesSearch && matchesStatus && matchesSpecialty && matchesZone;
    });
  }, [technicians, search, statusFilter, specialtyFilter, zoneFilter]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const handleCreateTechnician = () => {
    setEditingTechnician(null);
    setIsFormOpen(true);
  };

  const handleEditTechnician = (technician: MockTechnician) => {
    setEditingTechnician(technician);
    setIsFormOpen(true);
  };

  const handleViewTechnician = (technician: MockTechnician) => {
    setSelectedTechnician(technician);
    setIsDetailOpen(true);
  };

  const handleSubmitTechnician = (technician: MockTechnician) => {
    setTechnicians((current) => {
      const exists = current.some((item) => item.id === technician.id);
      if (exists) {
        return current.map((item) => (item.id === technician.id ? updateTechnicianActivity(technician) : item));
      }
      return [updateTechnicianActivity(technician), ...current];
    });

    setSelectedTechnician((current) => (current?.id === technician.id ? updateTechnicianActivity(technician) : current));
    setIsFormOpen(false);
    showNotice(technician.id === editingTechnician?.id ? "Técnico actualizado correctamente." : "Técnico creado correctamente.");
  };

  const handleChangeStatus = (technician: MockTechnician, status: MockTechnicianStatus) => {
    const updatedTechnician = updateTechnicianActivity({ ...technician, status });

    setTechnicians((current) => current.map((item) => (item.id === technician.id ? updatedTechnician : item)));
    setSelectedTechnician((current) => (current?.id === technician.id ? updatedTechnician : current));
    showNotice(`Estado de ${technician.name} actualizado.`);
  };

  const handleAssignProject = (technician: MockTechnician) => {
    const updatedTechnician = updateTechnicianActivity({
      ...technician,
      status: "busy",
      activeProjects: technician.activeProjects + 1,
      assignedTo: technician.assignedTo ?? "Proyecto mock asignado",
    });

    setTechnicians((current) => current.map((item) => (item.id === technician.id ? updatedTechnician : item)));
    setSelectedTechnician((current) => (current?.id === technician.id ? updatedTechnician : current));
    showNotice(`Proyecto mock asignado a ${technician.name}.`);
  };

  const handleDeactivate = (technician: MockTechnician) => {
    handleChangeStatus(technician, "inactive");
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSpecialtyFilter("all");
    setZoneFilter("all");
  };

  return (
    <div className="space-y-6">
      <TechniciansHeader onCreateTechnician={handleCreateTechnician} />

      {notice ? (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm font-medium text-white shadow-sm">
          {notice}
        </div>
      ) : null}

      <TechniciansStats technicians={technicians} />

      <TechniciansFilters
        search={search}
        statusFilter={statusFilter}
        specialtyFilter={specialtyFilter}
        zoneFilter={zoneFilter}
        viewMode={viewMode}
        specialties={specialties}
        zones={zones}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onSpecialtyChange={setSpecialtyFilter}
        onZoneChange={setZoneFilter}
        onViewModeChange={setViewMode}
        onReset={handleResetFilters}
      />

      {viewMode === "table" ? (
        <TechniciansTable
          technicians={filteredTechnicians}
          onView={handleViewTechnician}
          onEdit={handleEditTechnician}
          onChangeStatus={handleChangeStatus}
          onAssignProject={handleAssignProject}
          onDeactivate={handleDeactivate}
        />
      ) : (
        <TechniciansGrid
          technicians={filteredTechnicians}
          onView={handleViewTechnician}
          onEdit={handleEditTechnician}
          onChangeStatus={handleChangeStatus}
          onAssignProject={handleAssignProject}
        />
      )}

      <TechnicianDetailDrawer
        technician={selectedTechnician}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleEditTechnician}
        onChangeStatus={handleChangeStatus}
        onAssignProject={handleAssignProject}
      />

      <TechnicianFormModal
        open={isFormOpen}
        technician={editingTechnician}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitTechnician}
      />
    </div>
  );
}
