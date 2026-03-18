import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";

export default function PaymentEditPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="BSP" title="Payment Edit" description="Payments are captured as create-only records in the current backend." />
      <div className="card">
        <p className="inline-notice">Add a payment adjustment API if you want a true edit workflow here.</p>
      </div>
    </AppShell>
  );
}
