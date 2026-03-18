import EntityFormPage from "../../../shared/components/EntityFormPage";
import statementService from "../services/statementService";

export default function StatementAddPage() {
  return (
    <EntityFormPage
      eyebrow="BSP"
      title="Generate Statement"
      description="Generate a statement for an account and billing period."
      initialValues={{ accountId: "", periodStart: "", periodEnd: "", totalDue: 0, minimumDue: 0, status: "OPEN" }}
      successPath="/bsp/statements"
      onSubmit={statementService.generate}
      fields={[
        { name: "accountId", label: "Account ID", type: "number" },
        { name: "periodStart", label: "Period Start", type: "date" },
        { name: "periodEnd", label: "Period End", type: "date" },
        { name: "status", label: "Status" },
      ]}
    />
  );
}
