import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import DashboardCards from "../../../shared/components/DashboardCards";
import PageHeader from "../../../shared/components/PageHeader";
import userService from "../services/userService";
import auditLogService from "../services/auditLogService";
import customerService from "../../paa/services/customerService";
import applicationService from "../../paa/services/applicationService";
import productService from "../../cpl/services/productService";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    users: 0,
    logs: 0,
    customers: 0,
    applications: 0,
    products: 0,
  });

  useEffect(() => {
    Promise.all([
      userService.list().catch(() => []),
      auditLogService.list().catch(() => []),
      customerService.list().catch(() => []),
      applicationService.list().catch(() => []),
      productService.list().catch(() => []),
    ]).then(([users, logs, customers, applications, products]) =>
      setStats({
        users: users.length,
        logs: logs.length,
        customers: customers.length,
        applications: applications.length,
        products: products.length,
      }),
    );
  }, []);

  return (
    <AppShell>
      <PageHeader
        title="Admin Dashboard"
        description="System-wide overview. Admin access includes users, applications, underwriting, products, cards, transactions, and billing."
      />
      <DashboardCards
        cards={[
          { label: "Users", value: stats.users, caption: "All registered users" },
          { label: "Audit Events", value: stats.logs, caption: "Recent tracked actions" },
          { label: "Customers", value: stats.customers, caption: "Customer profiles on file" },
          { label: "Applications", value: stats.applications, caption: "Applications across stages" },
          { label: "Products", value: stats.products, caption: "Configured card products" },
        ]}
      />
    </AppShell>
  );
}
