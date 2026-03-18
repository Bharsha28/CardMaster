import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import Table from "../../../shared/components/Table";
import { useAuth } from "../../../context/AuthContext";
import { canManageCards } from "../../../shared/utils/access";
import cardService from "../services/cardService";

export default function CardListPage() {
  const { user } = useAuth();
  const [cardId, setCardId] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user?.role === "CUSTOMER") {
      cardService.getById(1).then((card) => setRows(card ? [{ ...card, id: card.cardId }] : [])).catch(() => setRows([]));
    }
  }, [user?.role]);

  async function searchCard() {
    if (!cardId) {
      return;
    }
    const card = await cardService.getById(cardId);
    setRows([{ ...card, id: card.cardId }]);
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="CIAS"
        title={user?.role === "CUSTOMER" ? "My Card" : "Cards"}
        description={
          user?.role === "CUSTOMER"
            ? "View the card details available to your login."
            : "The backend exposes card fetch by ID rather than a full list endpoint, so this page works as an operational lookup table."
        }
        actionLabel={canManageCards(user?.role) ? "Issue Card" : null}
        actionTo={canManageCards(user?.role) ? "/cias/cards/add" : null}
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="table-toolbar">
          <input className="input" placeholder="Card ID" value={cardId} onChange={(event) => setCardId(event.target.value)} />
          <button className="primary-button" type="button" onClick={searchCard}>
            Search
          </button>
        </div>
      </div>
      <Table
        rows={rows}
        searchFields={["cardId", "status", "maskedCardNumber"]}
        actions={(row) => (
          <div className="table-actions">
            <Link className="text-link" to={`/cias/cards/${row.id}/view`}>
              View
            </Link>
            {canManageCards(user?.role) ? (
              <Link className="text-link" to={`/cias/cards/${row.id}/edit`}>
                Edit
              </Link>
            ) : null}
          </div>
        )}
        columns={[
          { key: "cardId", label: "Card ID" },
          { key: "applicationId", label: "Application ID" },
          { key: "maskedCardNumber", label: "Masked Number" },
          { key: "status", label: "Status" },
        ]}
      />
    </AppShell>
  );
}
