import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import applicationService from "../services/applicationService";

export default function ApplicationViewPage() {
  const { applicationId } = useParams();

  return (
    <EntityViewPage
      eyebrow="PAA"
      title={`Application ${applicationId}`}
      description="View the application record that feeds underwriting."
      loadData={() => applicationService.getById(applicationId)}
      fields={[
        { key: "applicationId", label: "Application ID" },
        { key: "customerId", label: "Customer ID" },
        { key: "productId", label: "Product ID" },
        { key: "requestedLimit", label: "Requested Limit", format: "currency" },
        { key: "applicationDate", label: "Application Date", format: "date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
