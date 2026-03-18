import { currency } from "../utils/formatters";

export default function DashboardCards({ cards }) {
  return (
    <div className="dashboard-grid">
      {cards.map((card) => (
        <article key={card.label} className="dashboard-card">
          <p>{card.label}</p>
          <h3>{card.type === "currency" ? currency(card.value) : card.value}</h3>
          <span>{card.caption}</span>
        </article>
      ))}
    </div>
  );
}
