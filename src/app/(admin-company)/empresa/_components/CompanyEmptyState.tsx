export function CompanyEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-neutral-950">Perfil sin información</h2>
      <p className="mt-2 text-sm text-neutral-500">
        Completa los datos principales de la empresa para activar la vista pública mock.
      </p>
    </div>
  );
}
