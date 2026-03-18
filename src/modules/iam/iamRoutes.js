import UserListPage from "./pages/UserListPage";
import UserAddPage from "./pages/UserAddPage";
import UserEditPage from "./pages/UserEditPage";
import UserViewPage from "./pages/UserViewPage";
import AuditLogListPage from "./pages/AuditLogListPage";
import RegisterPage from "./pages/RegisterPage";

const iamRoutes = [
  { path: "/register", element: RegisterPage },
  { path: "/iam/users", element: UserListPage, allowedRoles: ["ADMIN"] },
  { path: "/iam/users/add", element: UserAddPage, allowedRoles: ["ADMIN"] },
  { path: "/iam/users/:userId/edit", element: UserEditPage, allowedRoles: ["ADMIN"] },
  { path: "/iam/users/:userId/view", element: UserViewPage, allowedRoles: ["ADMIN"] },
  { path: "/iam/audit-logs", element: AuditLogListPage, allowedRoles: ["ADMIN"] },
];

export default iamRoutes;
