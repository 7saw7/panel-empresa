"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  clientsMock,
  projectTimelineMock,
  projectsMock,
  quotesMock,
  techniciansMock,
  type MockPriority,
  type MockProject,
  type MockProjectStatus,
  type MockProjectTask,
} from "@/mocks";
import { ProjectDetailDrawer } from "./_components/ProjectDetailDrawer";
import { ProjectFormModal } from "./_components/ProjectFormModal";
import { ProjectsFilters } from "./_components/ProjectsFilters";
import { ProjectsHeader } from "./_components/ProjectsHeader";
import { ProjectsKanban } from "./_components/ProjectsKanban";
import { ProjectsStats } from "./_components/ProjectsStats";
import { ProjectsTable } from "./_components/ProjectsTable";

type ProjectStatusFilter = MockProjectStatus | "all";
type ProjectPriorityFilter = MockPriority | "all";
type ViewMode = "table" | "kanban";

function buildNextCode(projects: MockProject[]) {
  const nextNumber = projects.reduce((max, project) => Math.max(max, project.id), 0) + 1;
  return `PROY-2026-${String(nextNumber).padStart(3, "0")}`;
}

function calculateProgress(tasks: MockProjectTask[]) {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((task) => task.completed).length;
  return Math.round((completed / tasks.length) * 100);
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<MockProject[]>(projectsMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<ProjectPriorityFilter>("all");
  const [technicianFilter, setTechnicianFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [editingProject, setEditingProject] = useState<MockProject | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const clients = useMemo(() => Array.from(new Set(projects.map((project) => project.clientName))).sort(), [projects]);
  const technicians = useMemo(
    () => Array.from(new Set(projects.map((project) => project.technicianName).filter(Boolean) as string[])).sort(),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        query.length === 0 ||
        project.code.toLowerCase().includes(query) ||
        project.name.toLowerCase().includes(query) ||
        project.clientName.toLowerCase().includes(query) ||
        (project.technicianName ?? "").toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
      const matchesTechnician = technicianFilter === "all" || project.technicianName === technicianFilter;
      const matchesClient = clientFilter === "all" || project.clientName === clientFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesTechnician && matchesClient;
    });
  }, [clientFilter, priorityFilter, projects, search, statusFilter, technicianFilter]);

  const selectedTimeline = selectedProject ? projectTimelineMock[selectedProject.id] ?? [] : [];
  const nextCode = useMemo(() => buildNextCode(projects), [projects]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  }

  function openCreateModal() {
    setEditingProject(null);
    setIsFormOpen(true);
  }

  function openEditModal(project: MockProject) {
    setEditingProject(project);
    setIsFormOpen(true);
  }

  function openDetail(project: MockProject) {
    setSelectedProject(project);
    setIsDetailOpen(true);
  }

  function upsertProject(project: MockProject) {
    setProjects((currentProjects) => {
      const exists = currentProjects.some((item) => item.id === project.id);
      if (exists) return currentProjects.map((item) => (item.id === project.id ? project : item));
      return [project, ...currentProjects];
    });

    setSelectedProject((current) => (current?.id === project.id ? project : current));
    setIsFormOpen(false);
    showNotice(editingProject ? "Proyecto actualizado correctamente." : "Proyecto creado correctamente.");
  }

  function updateProject(project: MockProject, message: string) {
    setProjects((currentProjects) => currentProjects.map((item) => (item.id === project.id ? project : item)));
    setSelectedProject((current) => (current?.id === project.id ? project : current));
    showNotice(message);
  }

  function updateProjectStatus(project: MockProject, status: MockProjectStatus, message: string) {
    const updatedProject: MockProject = {
      ...project,
      status,
      progress: status === "completed" ? 100 : project.progress,
      checklist: status === "completed" ? project.checklist.map((task) => ({ ...task, completed: true })) : project.checklist,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    updateProject(updatedProject, message);
  }

  function assignTechnician(project: MockProject, technicianId: number) {
    const technician = techniciansMock.find((item) => item.id === technicianId);
    if (!technician) return;

    updateProject(
      {
        ...project,
        technicianId: technician.id,
        technicianName: technician.name,
        status: project.status === "pending" ? "scheduled" : project.status,
        updatedAt: new Date().toISOString().slice(0, 10),
      },
      `${technician.name} fue asignado a ${project.code}.`
    );
  }

  function toggleTask(project: MockProject, taskId: number) {
    const checklist = project.checklist.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
    const progress = calculateProgress(checklist);

    updateProject(
      {
        ...project,
        checklist,
        progress,
        status: progress === 100 ? "completed" : project.status,
        updatedAt: new Date().toISOString().slice(0, 10),
      },
      "Checklist actualizado."
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setTechnicianFilter("all");
    setClientFilter("all");
  }

  return (
    <main className="space-y-6">
      <ProjectsHeader onCreateProject={openCreateModal} />

      {notice ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm text-white">
          <span>{notice}</span>
          <Button type="button" size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setNotice(null)}>
            Cerrar
          </Button>
        </div>
      ) : null}

      <ProjectsStats projects={projects} />

      <ProjectsFilters
        search={search}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        technicianFilter={technicianFilter}
        clientFilter={clientFilter}
        viewMode={viewMode}
        clients={clients}
        technicians={technicians}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onTechnicianChange={setTechnicianFilter}
        onClientChange={setClientFilter}
        onViewModeChange={setViewMode}
        onReset={resetFilters}
      />

      {viewMode === "table" ? (
        <ProjectsTable
          projects={filteredProjects}
          onView={openDetail}
          onEdit={openEditModal}
          onStart={(project) => updateProjectStatus(project, "in_progress", "Proyecto marcado como en proceso.")}
          onPause={(project) => updateProjectStatus(project, "paused", "Proyecto pausado.")}
          onComplete={(project) => updateProjectStatus(project, "completed", "Proyecto marcado como terminado.")}
          onCancel={(project) => updateProjectStatus(project, "cancelled", "Proyecto cancelado.")}
        />
      ) : (
        <ProjectsKanban
          projects={filteredProjects}
          onView={openDetail}
          onEdit={openEditModal}
          onMove={(project, status) => updateProjectStatus(project, status, "Estado actualizado desde kanban.")}
        />
      )}

      <ProjectDetailDrawer
        project={selectedProject}
        open={isDetailOpen}
        timeline={selectedTimeline}
        technicians={techniciansMock}
        onClose={() => setIsDetailOpen(false)}
        onEdit={openEditModal}
        onAssignTechnician={assignTechnician}
        onToggleTask={toggleTask}
        onStart={(project) => updateProjectStatus(project, "in_progress", "Proyecto marcado como en proceso.")}
        onPause={(project) => updateProjectStatus(project, "paused", "Proyecto pausado.")}
        onComplete={(project) => updateProjectStatus(project, "completed", "Proyecto marcado como terminado.")}
      />

      <ProjectFormModal
        open={isFormOpen}
        project={editingProject}
        nextCode={nextCode}
        clients={clientsMock}
        quotes={quotesMock}
        technicians={techniciansMock}
        onClose={() => setIsFormOpen(false)}
        onSubmit={upsertProject}
      />
    </main>
  );
}
