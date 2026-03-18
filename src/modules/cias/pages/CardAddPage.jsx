import EntityFormPage from "../../../shared/components/EntityFormPage";
import cardService from "../services/cardService";

export default function CardAddPage() {
  return (
    <EntityFormPage
      eyebrow="CIAS"
      title="Issue Card"
      description="Create a card record for an approved application."
      initialValues={{ applicationId: "", maskedCardNumber: "", expiryDate: "", cvvHash: "", status: "ISSUED" }}
      successPath="/cias/cards"
      onSubmit={cardService.create}
      fields={[
        { name: "applicationId", label: "Application ID", type: "number" },
        { name: "maskedCardNumber", label: "Masked Card Number" },
        { name: "expiryDate", label: "Expiry Date", type: "date" },
        { name: "cvvHash", label: "CVV Hash" },
        { name: "status", label: "Status" },
      ]}
    />
  );
}
