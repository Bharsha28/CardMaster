import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import documentService from "../services/documentService";

export default function DocumentEditPage() {
  const { documentId } = useParams();

  return (
    <EntityFormPage
      eyebrow="PAA"
      title={`Update Document ${documentId}`}
      description="Document updates are status-only in the current backend."
      initialValues={{ status: "" }}
      loadValues={async () => {
        const document = await documentService.getById(documentId);
        return { status: document.status };
      }}
      successPath="/paa/documents"
      submitLabel="Update Status"
      onSubmit={(payload) => documentService.updateStatus(documentId, payload.status)}
      fields={[{ name: "status", label: "Status" }]}
    />
  );
}
