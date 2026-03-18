import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import underwritingService from "../services/underwritingService";

export default function AssessmentViewPage() {
  const { applicationId } = useParams();
  const [score, setScore] = useState(null);
  const [decision, setDecision] = useState(null);

  useEffect(() => {
    underwritingService.getLatestScore(applicationId).then(setScore).catch(() => null);
    underwritingService.getLatestDecision(applicationId).then(setDecision).catch(() => null);
  }, [applicationId]);

  return (
    <AppShell>
      <PageHeader eyebrow="CAU" title={`Assessment ${applicationId}`} description="Latest score and underwriting decision for the application." />
      <div className="view-grid">
        <div className="view-item">
          <span>Bureau Score</span>
          <strong>{score?.bureauScore ?? "-"}</strong>
        </div>
        <div className="view-item">
          <span>Internal Score</span>
          <strong>{score?.internalScore ?? "-"}</strong>
        </div>
        <div className="view-item">
          <span>Decision</span>
          <strong>{decision?.decision ?? "-"}</strong>
        </div>
        <div className="view-item">
          <span>Approved Limit</span>
          <strong>{decision?.approvedLimit ?? "-"}</strong>
        </div>
      </div>
    </AppShell>
  );
}
