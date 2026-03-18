import DashboardCards from "../../../shared/components/DashboardCards";

export default function BillingDashboard({ statements = [], payments = [] }) {
  return (
    <DashboardCards
      cards={[
        { label: "Statements", value: statements.length, caption: "Billing cycles generated" },
        { label: "Open Statements", value: statements.filter((item) => item.status === "OPEN").length, caption: "Awaiting payment" },
        { label: "Payments", value: payments.length, caption: "Captured payment records" },
      ]}
    />
  );
}
