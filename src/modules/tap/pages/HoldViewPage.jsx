import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import holdService from "../services/holdService";

export default function HoldViewPage() {
  const { holdId } = useParams();

  return (
    <EntityViewPage
      eyebrow="TAP"
      title={`Hold ${holdId}`}
      description="Detailed hold record."
      loadData={() => holdService.getById(holdId)}
      fields={[
        { key: "holdId", label: "Hold ID" },
        { key: "transactionId", label: "Transaction ID" },
        { key: "amount", label: "Amount", format: "currency" },
        { key: "holdDate", label: "Hold Date", format: "dateTime" },
        { key: "releaseDate", label: "Release Date", format: "dateTime" },
      ]}
    />
  );
}
