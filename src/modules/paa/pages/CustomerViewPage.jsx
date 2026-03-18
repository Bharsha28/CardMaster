import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import customerService from "../services/customerService";

export default function CustomerViewPage() {
  const { customerId } = useParams();

  return (
    <EntityViewPage
      eyebrow="PAA"
      title={`Customer ${customerId}`}
      description="Read-only customer details from the backend."
      loadData={() => customerService.getById(customerId)}
      fields={[
        { key: "customerId", label: "Customer ID" },
        { key: "name", label: "Name" },
        { key: "dob", label: "Date of Birth" },
        { key: "employmentType", label: "Employment" },
        { key: "income", label: "Income", format: "currency" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
