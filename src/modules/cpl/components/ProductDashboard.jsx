import DashboardCards from "../../../shared/components/DashboardCards";

export default function ProductDashboard({ products = [], fees = [] }) {
  return (
    <DashboardCards
      cards={[
        { label: "Products", value: products.length, caption: "Configured card products" },
        { label: "Active Products", value: products.filter((product) => product.status === "ACTIVE").length, caption: "Ready for sale" },
        { label: "Fee Rules", value: fees.length, caption: "Loaded fee configurations" },
      ]}
    />
  );
}
