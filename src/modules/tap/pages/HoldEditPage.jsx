import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import holdService from "../services/holdService";

export default function HoldEditPage() {
  const { holdId } = useParams();

  return (
    <EntityFormPage
      eyebrow="TAP"
      title={`Release Hold ${holdId}`}
      description="The hold edit flow maps to the backend release action."
      initialValues={{ confirm: "RELEASE" }}
      successPath="/tap/holds"
      submitLabel="Release Hold"
      onSubmit={() => holdService.release(holdId)}
      fields={[{ name: "confirm", label: "Confirmation" }]}
    />
  );
}
