import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import accountService from "../services/accountService";

export default function AccountViewPage() {
  const { accountId } = useParams();

  return (
    <EntityViewPage
      eyebrow="CIAS"
      title={`Account ${accountId}`}
      description="Read-only card account details."
      loadData={() => accountService.getById(accountId)}
      fields={[
        { key: "accountId", label: "Account ID" },
        { key: "cardId", label: "Card ID" },
        { key: "applicationId", label: "Application ID" },
        { key: "creditLimit", label: "Credit Limit", format: "currency" },
        { key: "availableLimit", label: "Available Limit", format: "currency" },
        { key: "openDate", label: "Open Date", format: "date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
