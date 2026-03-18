import { useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import underwritingService from "../services/underwritingService";

export default function AssessmentAddPage() {
  const [applicationId, setApplicationId] = useState("");
  const [bureauScore, setBureauScore] = useState("");
  const [decision, setDecision] = useState("APPROVE");
  const [approvedLimit, setApprovedLimit] = useState("");
  const [remarks, setRemarks] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const score = await underwritingService.generateScore(applicationId, { bureauScore });
    const decisionResult = await underwritingService.createDecision(applicationId, { decision, approvedLimit, remarks });
    setResult({ score, decision: decisionResult });
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="CAU"
        title="New Assessment"
        description="Generate a score and create an underwriting decision for the same application in one workflow."
      />
      <div className="card form-card">
        <form className="entity-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Application ID</span>
            <input className="input" type="number" value={applicationId} onChange={(event) => setApplicationId(event.target.value)} />
          </label>
          <label className="field">
            <span>Bureau Score</span>
            <input className="input" type="number" value={bureauScore} onChange={(event) => setBureauScore(event.target.value)} />
          </label>
          <label className="field">
            <span>Decision</span>
            <select className="input" value={decision} onChange={(event) => setDecision(event.target.value)}>
              <option value="APPROVE">Approve</option>
              <option value="REJECT">Reject</option>
              <option value="CONDITIONAL">Conditional</option>
            </select>
          </label>
          <label className="field">
            <span>Approved Limit</span>
            <input className="input" type="number" value={approvedLimit} onChange={(event) => setApprovedLimit(event.target.value)} />
          </label>
          <label className="field">
            <span>Remarks</span>
            <textarea className="input input--textarea" value={remarks} onChange={(event) => setRemarks(event.target.value)} />
          </label>
          <button className="primary-button" type="submit">
            Submit Assessment
          </button>
        </form>
        {result ? (
          <div className="view-grid" style={{ marginTop: 20 }}>
            <div className="view-item">
              <span>Internal Score</span>
              <strong>{result.score.internalScore}</strong>
            </div>
            <div className="view-item">
              <span>Decision</span>
              <strong>{result.decision.decision}</strong>
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
