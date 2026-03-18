import { useParams } from "react-router-dom";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";

export default function AssessmentEditPage() {
  const { applicationId } = useParams();

  return (
    <AppShell>
      <PageHeader
        eyebrow="CAU"
        title={`Reassessment ${applicationId}`}
        description="The backend does not currently expose PUT endpoints for credit scores or underwriting decisions."
      />
      <div className="card">
        <p className="inline-notice">
          This edit route is included to satisfy the module CRUD layout. To support real reassessment updates, add PUT endpoints for
          `/applications/{applicationId}/scores` and `/applications/{applicationId}/decisions`.
        </p>
      </div>
    </AppShell>
  );
}
