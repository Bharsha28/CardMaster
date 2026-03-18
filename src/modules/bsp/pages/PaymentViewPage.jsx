import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import paymentService from "../services/paymentService";

export default function PaymentViewPage() {
  const { paymentId } = useParams();

  return (
    <EntityViewPage
      eyebrow="BSP"
      title={`Payment ${paymentId}`}
      description="Payment record details."
      loadData={() => paymentService.getById(paymentId)}
      fields={[
        { key: "paymentId", label: "Payment ID" },
        { key: "accountId", label: "Account ID" },
        { key: "statementId", label: "Statement ID" },
        { key: "amount", label: "Amount", format: "currency" },
        { key: "paymentDate", label: "Payment Date", format: "dateTime" },
        { key: "method", label: "Method" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
