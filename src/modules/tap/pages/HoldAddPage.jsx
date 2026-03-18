import EntityFormPage from "../../../shared/components/EntityFormPage";
import holdService from "../services/holdService";

export default function HoldAddPage() {
  return (
    <EntityFormPage
      eyebrow="TAP"
      title="Create Hold"
      description="Create a manual hold for a transaction."
      initialValues={{ transactionId: "", amount: "" }}
      successPath="/tap/holds"
      onSubmit={holdService.create}
      fields={[
        { name: "transactionId", label: "Transaction ID", type: "number" },
        { name: "amount", label: "Amount", type: "number" },
      ]}
    />
  );
}
