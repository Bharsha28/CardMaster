import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";

export default function FeeEditPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="CPL" title="Edit Fee Rule" description="Fee update endpoints are not exposed in the backend yet." />
      <div className="card">
        <p className="inline-notice">Add PUT and GET-by-fee-id APIs to make this edit flow fully functional.</p>
      </div>
    </AppShell>
  );
}
