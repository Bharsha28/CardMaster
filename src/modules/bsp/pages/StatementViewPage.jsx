import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import statementService from "../services/statementService";

export default function StatementViewPage() {
  const { statementId } = useParams();

  return (
    <EntityViewPage
      eyebrow="BSP"
      title={`Statement ${statementId}`}
      description="Billing statement details."
      loadData={() => statementService.getById(statementId)}
      fields={[
        { key: "statementId", label: "Statement ID" },
        { key: "accountId", label: "Account ID" },
        { key: "periodStart", label: "Period Start", format: "date" },
        { key: "periodEnd", label: "Period End", format: "date" },
        { key: "totalDue", label: "Total Due", format: "currency" },
        { key: "minimumDue", label: "Minimum Due", format: "currency" },
        { key: "generatedDate", label: "Generated Date", format: "date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
