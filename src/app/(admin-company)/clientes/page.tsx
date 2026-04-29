"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  clientsMock,
  clientTimelineMock,
  projectsMock,
  quotesMock,
  type MockClient,
  type MockClientStatus,
  type MockClientType,
} from "@/mocks";
import { ClientDetailDrawer } from "./_components/ClientDetailDrawer";
import { ClientFormModal } from "./_components/ClientFormModal";
import { ClientsFilters } from "./_components/ClientsFilters";
import { ClientsHeader } from "./_components/ClientsHeader";
import { ClientsStats } from "./_components/ClientsStats";
import { ClientsTable } from "./_components/ClientsTable";

type ClientStatusFilter = MockClientStatus | "all";
type ClientTypeFilter = MockClientType | "all";

const nextStatus: Record<MockClientStatus, MockClientStatus> = {
  prospect: "active",
  active: "with_project",
  with_project: "inactive",
  inactive: "prospect",
};

export default function ClientesPage() {
  const [clients, setClients] = useState<MockClient[]>(clientsMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<ClientTypeFilter>("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<MockClient | null>(null);
  const [editingClient, setEditingClient] = useState<MockClient | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const districts = useMemo(() => {
    return Array.from(new Set(clients.map((client) => client.district))).sort();
  }, [clients]);

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        query.length === 0 ||
        client.name.toLowerCase().includes(query) ||
        client.contactName.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.district.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      const matchesType = typeFilter === "all" || client.type === typeFilter;
      const matchesDistrict = districtFilter === "all" || client.district === districtFilter;

      return matchesSearch && matchesStatus && matchesType && matchesDistrict;
    });
  }, [clients, districtFilter, search, statusFilter, typeFilter]);

  const selectedClientQuotes = selectedClient
    ? quotesMock.filter((quote) => quote.clientId === selectedClient.id)
    : [];

  const selectedClientProjects = selectedClient
    ? projectsMock.filter((project) => project.clientId === selectedClient.id)
    : [];

  const selectedClientTimeline = selectedClient
    ? clientTimelineMock[selectedClient.id] ?? []
    : [];

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  }

  function openCreateModal() {
    setEditingClient(null);
    setIsFormOpen(true);
  }

  function openEditModal(client: MockClient) {
    setEditingClient(client);
    setIsFormOpen(true);
  }

  function openDetail(client: MockClient) {
    setSelectedClient(client);
    setIsDetailOpen(true);
  }

  function handleSubmitClient(client: MockClient) {
    setClients((currentClients) => {
      const exists = currentClients.some((item) => item.id === client.id);
      if (exists) {
        return currentClients.map((item) => (item.id === client.id ? client : item));
      }
      return [client, ...currentClients];
    });

    setSelectedClient((current) => (current?.id === client.id ? client : current));
    setIsFormOpen(false);
    showNotice(editingClient ? "Cliente actualizado correctamente." : "Cliente creado correctamente.");
  }

  function handleChangeStatus(client: MockClient) {
    const updatedClient = { ...client, status: nextStatus[client.status], updatedAt: new Date().toISOString().slice(0, 10) };

    setClients((currentClients) =>
      currentClients.map((item) => (item.id === client.id ? updatedClient : item))
    );
    setSelectedClient((current) => (current?.id === client.id ? updatedClient : current));
    showNotice("Estado del cliente actualizado.");
  }

  function handleCreateQuote(client: MockClient) {
    showNotice(`Cotización mock iniciada para ${client.name}.`);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDistrictFilter("all");
  }

  return (
    <main className="space-y-6">
      <ClientsHeader onCreateClient={openCreateModal} />

      {notice ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm text-white">
          <span>{notice}</span>
          <Button type="button" size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setNotice(null)}>
            Cerrar
          </Button>
        </div>
      ) : null}

      <ClientsStats clients={clients} />

      <ClientsFilters
        search={search}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        districtFilter={districtFilter}
        districts={districts}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
        onDistrictChange={setDistrictFilter}
        onReset={resetFilters}
      />

      <ClientsTable
        clients={filteredClients}
        onView={openDetail}
        onEdit={openEditModal}
        onCreateQuote={handleCreateQuote}
        onChangeStatus={handleChangeStatus}
      />

      <ClientDetailDrawer
        client={selectedClient}
        open={isDetailOpen}
        quotes={selectedClientQuotes}
        projects={selectedClientProjects}
        timeline={selectedClientTimeline}
        onClose={() => setIsDetailOpen(false)}
        onEdit={(client) => {
          setIsDetailOpen(false);
          openEditModal(client);
        }}
        onCreateQuote={handleCreateQuote}
      />

      <ClientFormModal
        open={isFormOpen}
        client={editingClient}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitClient}
      />
    </main>
  );
}
