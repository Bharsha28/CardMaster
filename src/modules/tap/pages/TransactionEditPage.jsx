import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import transactionService from "../services/transactionService";

export default function TransactionEditPage() {
  const { transactionId } = useParams();

  return (
    <EntityFormPage
      eyebrow="TAP"
      title={`Post Transaction ${transactionId}`}
      description="This edit flow uses the backend post/capture action."
      initialValues={{ confirm: "POSTED" }}
      successPath="/tap/transactions"
      submitLabel="Post Transaction"
      onSubmit={() => transactionService.post(transactionId)}
      fields={[{ name: "confirm", label: "Confirmation" }]}
    />
  );
}
