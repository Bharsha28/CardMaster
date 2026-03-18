import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { currency, date } from "../../../shared/utils/formatters";
import underwritingService from "../services/underwritingService";

export default function AssessmentListPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    underwritingService.listApplications().then((data) => setRows(data.map((row) => ({ ...row, id: row.applicationId }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="CAU"
      title="Assessment Queue"
      description="Applications available for credit score generation and underwriting decisions."
      addPath="/cau/assessments/add"
      basePath="/cau/assessments"
      searchFields={["applicationId", "customerId", "status"]}
      rows={rows}
      columns={[
        { key: "applicationId", label: "Application ID" },
        { key: "customerId", label: "Customer ID" },
        { key: "requestedLimit", label: "Requested Limit", render: (row) => currency(row.requestedLimit) },
        { key: "applicationDate", label: "Submitted", render: (row) => date(row.applicationDate) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
