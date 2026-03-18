import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import transactionService from "../services/transactionService";

export default function TransactionViewPage() {
  const { transactionId } = useParams();

  return (
    <EntityViewPage
      eyebrow="TAP"
      title={`Transaction ${transactionId}`}
      description="Transaction details and current lifecycle status."
      loadData={() => transactionService.getById(transactionId)}
      fields={[
        { key: "transactionId", label: "Transaction ID" },
        { key: "accountId", label: "Account ID" },
        { key: "amount", label: "Amount", format: "currency" },
        { key: "currency", label: "Currency" },
        { key: "merchant", label: "Merchant" },
        { key: "channel", label: "Channel" },
        { key: "transactionDate", label: "Transaction Date", format: "dateTime" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
