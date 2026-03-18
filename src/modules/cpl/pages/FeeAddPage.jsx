import EntityFormPage from "../../../shared/components/EntityFormPage";
import feeService from "../services/feeService";

export default function FeeAddPage() {
  return (
    <EntityFormPage
      eyebrow="CPL"
      title="Add Fee Rule"
      description="Create a fee configuration linked to a product."
      initialValues={{ productId: "", feeType: "ANNUAL", amount: "" }}
      successPath="/cpl/fees"
      onSubmit={feeService.create}
      fields={[
        { name: "productId", label: "Product ID", type: "number" },
        { name: "feeType", label: "Fee Type" },
        { name: "amount", label: "Amount", type: "number" },
      ]}
    />
  );
}
