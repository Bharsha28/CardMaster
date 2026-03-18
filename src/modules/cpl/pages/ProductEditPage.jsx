import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import productService from "../services/productService";

export default function ProductEditPage() {
  const { productId } = useParams();

  return (
    <EntityFormPage
      eyebrow="CPL"
      title={`Review Product ${productId}`}
      description="The backend currently supports create and fetch for products, but not update."
      notice="Add a PUT /api/products/{id} endpoint in the backend to make this page fully operational."
      initialValues={{ name: "", category: "", interestRate: "", annualFee: "", status: "" }}
      loadValues={() => productService.getById(productId)}
      successPath="/cpl/products"
      submitLabel="Save Later"
      onSubmit={async () => Promise.resolve()}
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
