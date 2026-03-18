import TransactionDashboardPage from "./pages/TransactionDashboardPage";
import TransactionListPage from "./pages/TransactionListPage";
import TransactionAddPage from "./pages/TransactionAddPage";
import TransactionEditPage from "./pages/TransactionEditPage";
import TransactionViewPage from "./pages/TransactionViewPage";
import HoldListPage from "./pages/HoldListPage";
import HoldAddPage from "./pages/HoldAddPage";
import HoldEditPage from "./pages/HoldEditPage";
import HoldViewPage from "./pages/HoldViewPage";

const tapRoutes = [
  { path: "/tap/dashboard", element: TransactionDashboardPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN", "RISK"] },
  { path: "/tap/transactions", element: TransactionListPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN", "RISK"] },
  { path: "/tap/transactions/add", element: TransactionAddPage, allowedRoles: ["CUSTOMER", "ADMIN"] },
  { path: "/tap/transactions/:transactionId/edit", element: TransactionEditPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/tap/transactions/:transactionId/view", element: TransactionViewPage, allowedRoles: ["CUSTOMER", "OFFICER", "ADMIN", "RISK"] },
  { path: "/tap/holds", element: HoldListPage, allowedRoles: ["OFFICER", "ADMIN", "RISK"] },
  { path: "/tap/holds/add", element: HoldAddPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/tap/holds/:holdId/edit", element: HoldEditPage, allowedRoles: ["OFFICER", "ADMIN", "RISK"] },
  { path: "/tap/holds/:holdId/view", element: HoldViewPage, allowedRoles: ["OFFICER", "ADMIN", "RISK"] },
];

export default tapRoutes;
