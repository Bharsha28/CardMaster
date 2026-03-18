import DashboardCards from "../../../shared/components/DashboardCards";

export default function TransactionDashboard({ transactions = [], holds = [] }) {
  return (
    <DashboardCards
      cards={[
        { label: "Transactions", value: transactions.length, caption: "Visible transaction records" },
        {
          label: "Posted",
          value: transactions.filter((item) => item.status === "POSTED").length,
          caption: "Settled transactions",
        },
        { label: "Holds", value: holds.length, caption: "Captured or active holds" },
      ]}
    />
  );
}
