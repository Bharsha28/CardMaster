import EntityFormPage from "../../../shared/components/EntityFormPage";
import transactionService from "../services/transactionService";

export default function TransactionAddPage() {
  return (
    <EntityFormPage
      eyebrow="TAP"
      title="Authorize Transaction"
      description="Create an authorization and reserve funds."
      initialValues={{ accountId: "", amount: "", currency: "INR", merchant: "", channel: "ONLINE" }}
      successPath="/tap/transactions"
      onSubmit={transactionService.authorize}
      fields={[
        { name: "accountId", label: "Account ID", type: "number" },
        { name: "amount", label: "Amount", type: "number" },
        { name: "currency", label: "Currency" },
        { name: "merchant", label: "Merchant" },
        { name: "channel", label: "Channel" },
      ]}
    />
  );
}
