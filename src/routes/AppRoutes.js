import { createElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "../shared/components/ProtectedRoute";
import { ROLE_HOME, ROLES } from "../shared/constants/roles";
import iamRoutes from "../modules/iam/iamRoutes";
import paaRoutes from "../modules/paa/paaRoutes";
import cauRoutes from "../modules/cau/cauRoutes";
import cplRoutes from "../modules/cpl/cplRoutes";
import ciasRoutes from "../modules/cias/ciasRoutes";
import tapRoutes from "../modules/tap/tapRoutes";
import bspRoutes from "../modules/bsp/bspRoutes";
import LoginPage from "../modules/iam/pages/LoginPage";
import AdminOverviewPage from "../modules/iam/pages/AdminOverviewPage";

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  return createElement(
    Routes,
    null,
    createElement(Route, { path: "/login", element: createElement(LoginPage) }),
    createElement(Route, { path: "/register", element: createElement(iamRoutes[0].element) }),
    createElement(Route, {
      path: "/",
      element: createElement(Navigate, {
        to: isAuthenticated ? ROLE_HOME[user?.role] || "/paa/dashboard" : "/login",
        replace: true,
      }),
    }),
    createElement(Route, {
      path: "/unauthorized",
      element: createElement(SimpleState, {
        title: "Unauthorized",
        text: "You do not have access to this module.",
      }),
    }),
    ...buildProtectedRouteElements([{ path: "/admin/dashboard", element: AdminOverviewPage, allowedRoles: [ROLES.ADMIN] }]),
    ...buildProtectedRouteElements(iamRoutes.slice(1)),
    ...buildProtectedRouteElements(paaRoutes),
    ...buildProtectedRouteElements(cauRoutes),
    ...buildProtectedRouteElements(cplRoutes),
    ...buildProtectedRouteElements(ciasRoutes),
    ...buildProtectedRouteElements(tapRoutes),
    ...buildProtectedRouteElements(bspRoutes),
    createElement(Route, {
      path: "*",
      element: createElement(SimpleState, {
        title: "Not Found",
        text: "The page you requested does not exist.",
      }),
    }),
  );
}

function buildProtectedRouteElements(routeList) {
  return routeList.map((route) =>
    createElement(
      Route,
      {
        key: route.path,
        element: createElement(ProtectedRoute, { allowedRoles: route.allowedRoles || [] }),
      },
      createElement(Route, {
        path: route.path,
        element: createElement(route.element),
      }),
    ),
  );
}

function SimpleState({ title, text }) {
  return createElement(
    "div",
    { className: "simple-state" },
    createElement("h1", null, title),
    createElement("p", null, text),
  );
}
