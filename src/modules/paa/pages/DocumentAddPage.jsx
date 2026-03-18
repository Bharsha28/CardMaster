import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import customerService from "../services/customerService";
import applicationService from "../services/applicationService";
import documentService from "../services/documentService";

export default function DocumentAddPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    applicationId: "",
    documentType: "",
    file: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    customerService.getCurrentCustomer(user).then((customer) => {
      if (!customer?.customerId) {
        return;
      }
      applicationService.getByCustomer(customer.customerId).then(setApplications);
    });
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.file) {
      setError("Please choose a document file to upload.");
      return;
    }

    await documentService.create({
      applicationId: formData.applicationId,
      documentType: formData.documentType,
      file: formData.file,
      status: "SUBMITTED",
    });
    navigate("/paa/documents");
  }

  return (
    <AppShell>
      <PageHeader
        title="Upload Document"
        description="Attach a supporting document to one of your submitted applications. The backend currently stores the file name reference."
      />
      <div className="card form-card">
        {error ? <p className="error-banner">{error}</p> : null}
        <form className="entity-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Application</span>
            <select
              className="input"
              value={formData.applicationId}
              onChange={(event) => setFormData((value) => ({ ...value, applicationId: event.target.value }))}
            >
              <option value="">Select application</option>
              {applications.map((application) => (
                <option key={application.applicationId} value={application.applicationId}>
                  Application #{application.applicationId} - {application.status}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Document Type</span>
            <select
              className="input"
              value={formData.documentType}
              onChange={(event) => setFormData((value) => ({ ...value, documentType: event.target.value }))}
            >
              <option value="">Select type</option>
              <option value="IdentityProof">Identity Proof</option>
              <option value="AddressProof">Address Proof</option>
              <option value="IncomeProof">Income Proof</option>
            </select>
          </label>
          <label className="field">
            <span>Choose File</span>
            <input
              className="input"
              type="file"
              onChange={(event) => setFormData((value) => ({ ...value, file: event.target.files?.[0] || null }))}
            />
          </label>
          <label className="field">
            <span>Document Status</span>
            <input className="input" value="SUBMITTED" readOnly />
          </label>
          <button className="primary-button" type="submit">
            Upload Document
          </button>
        </form>
      </div>
    </AppShell>
  );
}
