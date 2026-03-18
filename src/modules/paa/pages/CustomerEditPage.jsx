import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import customerService from "../services/customerService";

export default function CustomerEditPage() {
  const { customerId } = useParams();

  return (
    <EntityFormPage
      eyebrow="PAA"
      title={`Edit Customer ${customerId}`}
      description="Update customer profile and contact details."
      initialValues={{
        name: "",
        dob: "",
        income: "",
        employmentType: "",
        status: "",
        contactEmail: "",
        contactPhone: "",
        contactAddress: "",
      }}
      loadValues={async () => {
        const customer = await customerService.getById(customerId);
        return {
          ...customer,
          contactEmail: customer.contactInfo?.email || "",
          contactPhone: customer.contactInfo?.phone || "",
          contactAddress: customer.contactInfo?.address || "",
        };
      }}
      successPath="/paa/customers"
      onSubmit={(payload) => customerService.update(customerId, payload)}
      fields={[
        { name: "name", label: "Name" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "income", label: "Annual Income", type: "number" },
        { name: "employmentType", label: "Employment Type" },
        { name: "status", label: "Status" },
        { name: "contactEmail", label: "Contact Email", type: "email" },
        { name: "contactPhone", label: "Contact Phone" },
        { name: "contactAddress", label: "Address", type: "textarea" },
      ]}
    />
  );
}
