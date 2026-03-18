import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import statementService from "../services/statementService";

export default function StatementEditPage() {
  const { statementId } = useParams();

  return (
    <EntityFormPage
      eyebrow="BSP"
      title={`Close Statement ${statementId}`}
      description="The statement edit route maps to the backend close action."
      initialValues={{ confirm: "CLOSED" }}
      successPath="/bsp/statements"
      submitLabel="Close Statement"
      onSubmit={() => statementService.close(statementId)}
      fields={[{ name: "confirm", label: "Confirmation" }]}
    />
  );
}
