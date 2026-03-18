import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import cardService from "../services/cardService";

export default function CardViewPage() {
  const { cardId } = useParams();

  return (
    <EntityViewPage
      eyebrow="CIAS"
      title={`Card ${cardId}`}
      description="Card issuance details and status."
      loadData={() => cardService.getById(cardId)}
      fields={[
        { key: "cardId", label: "Card ID" },
        { key: "applicationId", label: "Application ID" },
        { key: "customerId", label: "Customer ID" },
        { key: "productId", label: "Product ID" },
        { key: "maskedCardNumber", label: "Masked Number" },
        { key: "expiryDate", label: "Expiry Date", format: "date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
