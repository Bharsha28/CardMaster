import EntityFormPage from "../../../shared/components/EntityFormPage";
import customerService from "../services/customerService";

export default function CustomerAddPage() {
  return (
    <EntityFormPage
      eyebrow="PAA"
      title="Add Customer"
      description="Create a new customer profile before application intake."
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
      successPath="/paa/customers"
      onSubmit={customerService.create}
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
