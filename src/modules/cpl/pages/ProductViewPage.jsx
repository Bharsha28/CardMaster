import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import productService from "../services/productService";

export default function ProductViewPage() {
  const { productId } = useParams();

  return (
    <EntityViewPage
      eyebrow="CPL"
      title={`Product ${productId}`}
      description="Read-only card product details."
      loadData={() => productService.getById(productId)}
      fields={[
        { key: "productId", label: "Product ID" },
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "interestRate", label: "Interest Rate" },
        { key: "annualFee", label: "Annual Fee", format: "currency" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
