import OperationsDashboardPage from "./pages/OperationsDashboardPage";
import CardListPage from "./pages/CardListPage";
import CardAddPage from "./pages/CardAddPage";
import CardEditPage from "./pages/CardEditPage";
import CardViewPage from "./pages/CardViewPage";
import AccountListPage from "./pages/AccountListPage";
import AccountAddPage from "./pages/AccountAddPage";
import AccountEditPage from "./pages/AccountEditPage";
import AccountViewPage from "./pages/AccountViewPage";

const ciasRoutes = [
  { path: "/cias/dashboard", element: OperationsDashboardPage, allowedRoles: ["OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/cards", element: CardListPage, allowedRoles: ["CUSTOMER", "OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/cards/add", element: CardAddPage, allowedRoles: ["OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/cards/:cardId/edit", element: CardEditPage, allowedRoles: ["OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/cards/:cardId/view", element: CardViewPage, allowedRoles: ["CUSTOMER", "OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/accounts", element: AccountListPage, allowedRoles: ["CUSTOMER", "OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/accounts/add", element: AccountAddPage, allowedRoles: ["OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/accounts/:accountId/edit", element: AccountEditPage, allowedRoles: ["OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
  { path: "/cias/accounts/:accountId/view", element: AccountViewPage, allowedRoles: ["CUSTOMER", "OPERATIONS_ANALYST", "OFFICER", "ADMIN"] },
];

export default ciasRoutes;
