import EntityFormPage from "../../../shared/components/EntityFormPage";
import productService from "../services/productService";

export default function ProductAddPage() {
  return (
    <EntityFormPage
      eyebrow="CPL"
      title="Add Product"
      description="Create a card product record."
      initialValues={{ name: "", category: "Standard", interestRate: "", annualFee: "", status: "ACTIVE" }}
      successPath="/cpl/products"
      onSubmit={productService.create}
      fields={[
        { name: "name", label: "Product Name" },
        { name: "category", label: "Category" },
        { name: "interestRate", label: "Interest Rate", type: "number" },
        { name: "annualFee", label: "Annual Fee", type: "number" },
        { name: "status", label: "Status" },
      ]}
    />
  );
}
