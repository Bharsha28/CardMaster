import DashboardCards from "../../../shared/components/DashboardCards";

export default function AdminDashboard({ users = [], logs = [] }) {
  return (
    <DashboardCards
      cards={[
        { label: "Admin Users", value: users.filter((user) => user.role === "ADMIN").length, caption: "Privileged access holders" },
        { label: "Registered Users", value: users.length, caption: "Across all banking roles" },
        { label: "Audit Events", value: logs.length, caption: "Recent recorded actions" },
      ]}
    />
  );
}
