import { ROLES } from "./roles";

export const moduleNavigation = [
  {
    label: "IAM",
    key: "iam",
    roles: [ROLES.ADMIN],
    links: [
      { label: "Overview", to: "/admin/dashboard", roles: [ROLES.ADMIN] },
      { label: "Users", to: "/iam/users", roles: [ROLES.ADMIN] },
      { label: "Register User", to: "/iam/users/add", roles: [ROLES.ADMIN] },
      { label: "Audit Logs", to: "/iam/audit-logs", roles: [ROLES.ADMIN] },
    ],
  },
  {
    label: "Profile & Application",
    key: "paa",
    roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN],
    links: [
      { label: "Dashboard", to: "/paa/dashboard", roles: [ROLES.CUSTOMER] },
      { label: "Dashboard", to: "/paa/branch-dashboard", roles: [ROLES.BRANCH, ROLES.ADMIN] },
      { label: "Customers", to: "/paa/customers", roles: [ROLES.ADMIN, ROLES.BRANCH] },
      { label: "Applications", to: "/paa/applications", roles: [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.UNDERWRITER] },
      { label: "Documents", to: "/paa/documents", roles: [ROLES.CUSTOMER, ROLES.ADMIN] },
    ],
  },
  {
    label: "Credit Assessment",
    key: "cau",
    roles: [ROLES.UNDERWRITER, ROLES.ADMIN],
    links: [
      { label: "Dashboard", to: "/cau/dashboard", roles: [ROLES.UNDERWRITER, ROLES.ADMIN] },
      { label: "Assessments", to: "/cau/assessments", roles: [ROLES.UNDERWRITER, ROLES.ADMIN] },
      { label: "New Assessment", to: "/cau/assessments/add", roles: [ROLES.UNDERWRITER, ROLES.ADMIN] },
    ],
  },
  {
    label: "Card Product & Limit",
    key: "cpl",
    roles: [ROLES.ADMIN],
    links: [
      { label: "Product Dashboard", to: "/cpl/dashboard", roles: [ROLES.ADMIN] },
      { label: "Products", to: "/cpl/products", roles: [ROLES.ADMIN] },
      { label: "Fees", to: "/cpl/fees", roles: [ROLES.ADMIN] },
    ],
  },
  {
    label: "Card Issuance",
    key: "cias",
    roles: [ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK, ROLES.ADMIN],
    links: [
      { label: "Operations Dashboard", to: "/cias/dashboard", roles: [ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK] },
      { label: "Cards", to: "/cias/cards", roles: [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK] },
      { label: "Accounts", to: "/cias/accounts", roles: [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK] },
    ],
  },
  {
    label: "Transactions",
    key: "tap",
    roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN, ROLES.RISK],
    links: [
      { label: "Dashboard", to: "/tap/dashboard", roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN, ROLES.RISK] },
      { label: "Transactions", to: "/tap/transactions", roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN, ROLES.RISK] },
      { label: "Holds", to: "/tap/holds", roles: [ROLES.BRANCH, ROLES.ADMIN, ROLES.RISK] },
    ],
  },
  {
    label: "Billing & Payments",
    key: "bsp",
    roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN],
    links: [
      { label: "Dashboard", to: "/bsp/dashboard", roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN] },
      { label: "Statements", to: "/bsp/statements", roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN] },
      { label: "Payments", to: "/bsp/payments", roles: [ROLES.CUSTOMER, ROLES.BRANCH, ROLES.ADMIN] },
    ],
  },
];
