import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProductListPage from "./pages/ProductListPage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductViewPage from "./pages/ProductViewPage";
import FeeListPage from "./pages/FeeListPage";
import FeeAddPage from "./pages/FeeAddPage";
import FeeEditPage from "./pages/FeeEditPage";
import FeeViewPage from "./pages/FeeViewPage";

const cplRoutes = [
  { path: "/cpl/dashboard", element: AdminDashboardPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/products", element: ProductListPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/products/add", element: ProductAddPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/products/:productId/edit", element: ProductEditPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/products/:productId/view", element: ProductViewPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/fees", element: FeeListPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/fees/add", element: FeeAddPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/fees/:feeId/edit", element: FeeEditPage, allowedRoles: ["ADMIN"] },
  { path: "/cpl/fees/:feeId/view", element: FeeViewPage, allowedRoles: ["ADMIN"] },
];

export default cplRoutes;
