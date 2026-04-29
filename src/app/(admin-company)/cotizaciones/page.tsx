"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  quoteTimelineMock,
  quotesMock,
  type MockQuote,
  type MockQuoteStatus,
} from "@/mocks";
import { QuoteDetailDrawer } from "./_components/QuoteDetailDrawer";
import { QuoteFormModal } from "./_components/QuoteFormModal";
import { QuotePreviewModal } from "./_components/QuotePreviewModal";
import { QuotesFilters } from "./_components/QuotesFilters";
import { QuotesHeader } from "./_components/QuotesHeader";
import { QuotesStats } from "./_components/QuotesStats";
import { QuotesTable } from "./_components/QuotesTable";

type QuoteStatusFilter = MockQuoteStatus | "all";

function buildNextCode(quotes: MockQuote[]) {
  const maxId = quotes.reduce((max, quote) => Math.max(max, quote.id), 0) + 1;
  return `COT-2026-${String(maxId).padStart(3, "0")}`;
}

export default function CotizacionesPage() {
  const [quotes, setQuotes] = useState<MockQuote[]>(quotesMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatusFilter>("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [responsibleFilter, setResponsibleFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<MockQuote | null>(null);
  const [editingQuote, setEditingQuote] = useState<MockQuote | null>(null);
  const [previewQuote, setPreviewQuote] = useState<MockQuote | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const clients = useMemo(() => Array.from(new Set(quotes.map((quote) => quote.clientName))).sort(), [quotes]);
  const responsibles = useMemo(() => Array.from(new Set(quotes.map((quote) => quote.responsible))).sort(), [quotes]);

  const filteredQuotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return quotes.filter((quote) => {
      const matchesSearch =
        query.length === 0 ||
        quote.code.toLowerCase().includes(query) ||
        quote.clientName.toLowerCase().includes(query) ||
        quote.service.toLowerCase().includes(query) ||
        quote.responsible.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || quote.status === statusFilter;
      const matchesClient = clientFilter === "all" || quote.clientName === clientFilter;
      const matchesResponsible = responsibleFilter === "all" || quote.responsible === responsibleFilter;

      return matchesSearch && matchesStatus && matchesClient && matchesResponsible;
    });
  }, [clientFilter, quotes, responsibleFilter, search, statusFilter]);

  const selectedTimeline = selectedQuote ? quoteTimelineMock[selectedQuote.id] ?? [] : [];
  const nextCode = useMemo(() => buildNextCode(quotes), [quotes]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  }

  function openCreateModal() {
    setEditingQuote(null);
    setIsFormOpen(true);
  }

  function openEditModal(quote: MockQuote) {
    setEditingQuote(quote);
    setIsFormOpen(true);
  }

  function openDetail(quote: MockQuote) {
    setSelectedQuote(quote);
    setIsDetailOpen(true);
  }

  function openPreview(quote: MockQuote) {
    setPreviewQuote(quote);
    setIsPreviewOpen(true);
  }

  function upsertQuote(quote: MockQuote) {
    setQuotes((currentQuotes) => {
      const exists = currentQuotes.some((item) => item.id === quote.id);
      if (exists) return currentQuotes.map((item) => (item.id === quote.id ? quote : item));
      return [quote, ...currentQuotes];
    });

    setSelectedQuote((current) => (current?.id === quote.id ? quote : current));
    setPreviewQuote((current) => (current?.id === quote.id ? quote : current));
    setIsFormOpen(false);
    showNotice(editingQuote ? "Cotización actualizada correctamente." : "Cotización creada correctamente.");
  }

  function updateQuoteStatus(quote: MockQuote, status: MockQuoteStatus, message: string) {
    const updatedQuote: MockQuote = {
      ...quote,
      status,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setQuotes((currentQuotes) => currentQuotes.map((item) => (item.id === quote.id ? updatedQuote : item)));
    setSelectedQuote((current) => (current?.id === quote.id ? updatedQuote : current));
    setPreviewQuote((current) => (current?.id === quote.id ? updatedQuote : current));
    showNotice(message);
  }

  function handleDuplicate(quote: MockQuote) {
    const duplicated: MockQuote = {
      ...quote,
      id: Date.now(),
      code: buildNextCode(quotes),
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: undefined,
    };

    setQuotes((currentQuotes) => [duplicated, ...currentQuotes]);
    showNotice(`Se duplicó ${quote.code} como ${duplicated.code}.`);
  }

  function handleConvertToProject(quote: MockQuote) {
    const message = quote.status === "approved"
      ? `Proyecto mock iniciado desde ${quote.code}.`
      : `Primero se recomienda aprobar ${quote.code}; conversión simulada.`;
    showNotice(message);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setClientFilter("all");
    setResponsibleFilter("all");
  }

  return (
    <main className="space-y-6">
      <QuotesHeader onCreateQuote={openCreateModal} />

      {notice ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm text-white">
          <span>{notice}</span>
          <Button type="button" size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setNotice(null)}>
            Cerrar
          </Button>
        </div>
      ) : null}

      <QuotesStats quotes={quotes} />

      <QuotesFilters
        search={search}
        statusFilter={statusFilter}
        clientFilter={clientFilter}
        responsibleFilter={responsibleFilter}
        clients={clients}
        responsibles={responsibles}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onClientChange={setClientFilter}
        onResponsibleChange={setResponsibleFilter}
        onReset={resetFilters}
      />

      <QuotesTable
        quotes={filteredQuotes}
        onView={openDetail}
        onEdit={openEditModal}
        onPreview={openPreview}
        onDuplicate={handleDuplicate}
        onSend={(quote) => updateQuoteStatus(quote, "sent", "Cotización marcada como enviada.")}
        onApprove={(quote) => updateQuoteStatus(quote, "approved", "Cotización aprobada correctamente.")}
        onConvertToProject={handleConvertToProject}
      />

      <QuoteDetailDrawer
        quote={selectedQuote}
        open={isDetailOpen}
        timeline={selectedTimeline}
        onClose={() => setIsDetailOpen(false)}
        onEdit={openEditModal}
        onPreview={openPreview}
        onSend={(quote) => updateQuoteStatus(quote, "sent", "Cotización marcada como enviada.")}
        onApprove={(quote) => updateQuoteStatus(quote, "approved", "Cotización aprobada correctamente.")}
        onConvertToProject={handleConvertToProject}
      />

      <QuoteFormModal
        open={isFormOpen}
        quote={editingQuote}
        nextCode={nextCode}
        onClose={() => setIsFormOpen(false)}
        onSubmit={upsertQuote}
      />

      <QuotePreviewModal
        open={isPreviewOpen}
        quote={previewQuote}
        onClose={() => setIsPreviewOpen(false)}
      />
    </main>
  );
}
