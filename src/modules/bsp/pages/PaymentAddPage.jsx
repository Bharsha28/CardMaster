import EntityFormPage from "../../../shared/components/EntityFormPage";
import paymentService from "../services/paymentService";

export default function PaymentAddPage() {
  return (
    <EntityFormPage
      eyebrow="BSP"
      title="Capture Payment"
      description="Record a payment against an account and statement."
      initialValues={{ accountId: "", statementId: "", amount: "", method: "UPI", status: "COMPLETED" }}
      successPath="/bsp/payments"
      onSubmit={paymentService.capture}
      fields={[
        { name: "accountId", label: "Account ID", type: "number" },
        { name: "statementId", label: "Statement ID", type: "number" },
        { name: "amount", label: "Amount", type: "number" },
        { name: "method", label: "Method" },
        { name: "status", label: "Status" },
      ]}
    />
  );
}
