import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerAddPage from "./pages/CustomerAddPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import CustomerViewPage from "./pages/CustomerViewPage";
import ApplicationListPage from "./pages/ApplicationListPage";
import ApplicationAddPage from "./pages/ApplicationAddPage";
import ApplicationEditPage from "./pages/ApplicationEditPage";
import ApplicationViewPage from "./pages/ApplicationViewPage";
import DocumentListPage from "./pages/DocumentListPage";
import DocumentAddPage from "./pages/DocumentAddPage";
import DocumentEditPage from "./pages/DocumentEditPage";
import DocumentViewPage from "./pages/DocumentViewPage";

const paaRoutes = [
  { path: "/paa/dashboard", element: CustomerDashboardPage, allowedRoles: ["CUSTOMER"] },
  { path: "/paa/branch-dashboard", element: CustomerDashboardPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/paa/customers", element: CustomerListPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/paa/customers/add", element: CustomerAddPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/paa/customers/:customerId/edit", element: CustomerEditPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/paa/customers/:customerId/view", element: CustomerViewPage, allowedRoles: ["OFFICER", "ADMIN"] },
  { path: "/paa/applications", element: ApplicationListPage, allowedRoles: ["CUSTOMER", "ADMIN", "UNDERWRITER"] },
  { path: "/paa/applications/add", element: ApplicationAddPage, allowedRoles: ["CUSTOMER", "ADMIN"] },
  { path: "/paa/applications/:applicationId/edit", element: ApplicationEditPage, allowedRoles: ["ADMIN"] },
  { path: "/paa/applications/:applicationId/view", element: ApplicationViewPage, allowedRoles: ["CUSTOMER", "ADMIN", "UNDERWRITER"] },
  { path: "/paa/documents", element: DocumentListPage, allowedRoles: ["CUSTOMER", "ADMIN"] },
  { path: "/paa/documents/add", element: DocumentAddPage, allowedRoles: ["CUSTOMER", "ADMIN"] },
  { path: "/paa/documents/:documentId/edit", element: DocumentEditPage, allowedRoles: ["ADMIN"] },
  { path: "/paa/documents/:documentId/view", element: DocumentViewPage, allowedRoles: ["CUSTOMER", "ADMIN"] },
];

export default paaRoutes;
