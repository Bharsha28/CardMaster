import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import documentService from "../services/documentService";

export default function DocumentViewPage() {
  const { documentId } = useParams();

  return (
    <EntityViewPage
      eyebrow="PAA"
      title={`Document ${documentId}`}
      description="Read-only document details from the backend."
      loadData={() => documentService.getById(documentId)}
      fields={[
        { key: "documentId", label: "Document ID" },
        { key: "applicationId", label: "Application ID" },
        { key: "documentType", label: "Document Type" },
        { key: "fileURI", label: "File URI" },
        { key: "uploadedDate", label: "Uploaded", format: "date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
