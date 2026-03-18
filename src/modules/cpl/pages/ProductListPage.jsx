import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { currency } from "../../../shared/utils/formatters";
import productService from "../services/productService";

export default function ProductListPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    productService.list().then((data) => setRows(data.map((row) => ({ ...row, id: row.productId }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="CPL"
      title="Card Products"
      description="Product setup for the credit card portfolio."
      addPath="/cpl/products/add"
      basePath="/cpl/products"
      searchFields={["productId", "name", "category", "status"]}
      rows={rows}
      columns={[
        { key: "productId", label: "Product ID" },
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "interestRate", label: "Interest Rate" },
        { key: "annualFee", label: "Annual Fee", render: (row) => currency(row.annualFee) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
