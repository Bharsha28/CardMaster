import BillingDashboardPage from "./pages/BillingDashboardPage";
import StatementListPage from "./pages/StatementListPage";
import StatementAddPage from "./pages/StatementAddPage";
import StatementEditPage from "./pages/StatementEditPage";
import StatementViewPage from "./pages/StatementViewPage";
import PaymentListPage from "./pages/PaymentListPage";
import PaymentAddPage from "./pages/PaymentAddPage";
import PaymentEditPage from "./pages/PaymentEditPage";
import PaymentViewPage from "./pages/PaymentViewPage";

const bspRoutes = [
  { path: "/bsp/dashboard", element: BillingDashboardPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN"] },
  { path: "/bsp/statements", element: StatementListPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN"] },
  { path: "/bsp/statements/add", element: StatementAddPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/bsp/statements/:statementId/edit", element: StatementEditPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/bsp/statements/:statementId/view", element: StatementViewPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN"] },
  { path: "/bsp/payments", element: PaymentListPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN"] },
  { path: "/bsp/payments/add", element: PaymentAddPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN"] },
  { path: "/bsp/payments/:paymentId/edit", element: PaymentEditPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/bsp/payments/:paymentId/view", element: PaymentViewPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN"] },
];

export default bspRoutes;
