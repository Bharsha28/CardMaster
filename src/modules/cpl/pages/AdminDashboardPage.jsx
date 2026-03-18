import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import productService from "../services/productService";
import feeService from "../services/feeService";
import ProductDashboard from "../components/ProductDashboard";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  useEffect(() => {
    const activeProductId = products[0]?.productId;
    if (activeProductId) {
      feeService.listByProduct(activeProductId).then(setFees).catch(() => setFees([]));
    }
  }, [products]);

  return (
    <AppShell>
      <PageHeader eyebrow="CPL Dashboard" title="Admin Dashboard" description="Portfolio product configuration and pricing controls." />
      <ProductDashboard products={products} fees={fees} />
    </AppShell>
  );
}
