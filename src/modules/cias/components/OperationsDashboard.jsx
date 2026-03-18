import DashboardCards from "../../../shared/components/DashboardCards";

export default function OperationsDashboard({ cards = [], accounts = [] }) {
  return (
    <DashboardCards
      cards={[
        { label: "Cards Queried", value: cards.length, caption: "Searched card records" },
        { label: "Accounts Queried", value: accounts.length, caption: "Searched account records" },
        { label: "Operational Tasks", value: cards.length + accounts.length, caption: "Recent operational actions" },
      ]}
    />
  );
}
