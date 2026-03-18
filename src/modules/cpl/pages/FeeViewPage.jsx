import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";

export default function FeeViewPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="CPL" title="Fee Detail" description="The current backend exposes fees only by product lookup." />
      <div className="card">
        <p className="inline-notice">Use the fee list page with a product ID to inspect fee records until a dedicated GET /api/fees/{id} endpoint exists.</p>
      </div>
    </AppShell>
  );
}
