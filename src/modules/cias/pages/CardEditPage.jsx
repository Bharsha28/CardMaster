import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import cardService from "../services/cardService";

export default function CardEditPage() {
  const { cardId } = useParams();

  return (
    <EntityFormPage
      eyebrow="CIAS"
      title={`Block Card ${cardId}`}
      description="The available card update action is block card."
      initialValues={{ confirm: "BLOCKED" }}
      loadValues={async () => ({ confirm: "BLOCKED" })}
      successPath="/cias/cards"
      submitLabel="Block Card"
      onSubmit={() => cardService.block(cardId)}
      fields={[{ name: "confirm", label: "Status Confirmation" }]}
    />
  );
}
