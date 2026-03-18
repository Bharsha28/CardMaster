import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import applicationService from "../services/applicationService";

export default function ApplicationEditPage() {
  const { applicationId } = useParams();

  return (
    <EntityFormPage
      eyebrow="PAA"
      title={`Update Application ${applicationId}`}
      description="The backend exposes application updates as a status-only operation."
      initialValues={{ status: "" }}
      loadValues={async () => {
        const application = await applicationService.getById(applicationId);
        return { status: application.status };
      }}
      successPath="/paa/applications"
      submitLabel="Update Status"
      onSubmit={(payload) => applicationService.updateStatus(applicationId, payload.status)}
      fields={[{ name: "status", label: "Status" }]}
    />
  );
}
