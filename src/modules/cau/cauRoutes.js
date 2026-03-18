import UnderwriterDashboardPage from "./pages/UnderwriterDashboardPage";
import AssessmentListPage from "./pages/AssessmentListPage";
import AssessmentAddPage from "./pages/AssessmentAddPage";
import AssessmentEditPage from "./pages/AssessmentEditPage";
import AssessmentViewPage from "./pages/AssessmentViewPage";

const cauRoutes = [
  { path: "/cau/dashboard", element: UnderwriterDashboardPage, allowedRoles: ["UNDERWRITER", "ADMIN"] },
  { path: "/cau/assessments", element: AssessmentListPage, allowedRoles: ["UNDERWRITER", "ADMIN"] },
  { path: "/cau/assessments/add", element: AssessmentAddPage, allowedRoles: ["UNDERWRITER", "ADMIN"] },
  { path: "/cau/assessments/:applicationId/edit", element: AssessmentEditPage, allowedRoles: ["UNDERWRITER", "ADMIN"] },
  { path: "/cau/assessments/:applicationId/view", element: AssessmentViewPage, allowedRoles: ["UNDERWRITER", "ADMIN"] },
];

export default cauRoutes;
