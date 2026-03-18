import { useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import OperationsDashboard from "../components/OperationsDashboard";
import cardService from "../services/cardService";
import accountService from "../services/accountService";

export default function OperationsDashboardPage() {
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);

  async function preloadExamples() {
    const card = await cardService.getById(1).catch(() => null);
    const account = await accountService.getById(1).catch(() => null);
    setCards(card ? [card] : []);
    setAccounts(account ? [account] : []);
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="CIAS Dashboard"
        title="Operations Dashboard"
        description="Operational workspace for card issuance and account setup. Use the preload action after sample data exists."
      />
      <button className="primary-button" type="button" onClick={preloadExamples} style={{ marginBottom: 16 }}>
        Load Sample Records
      </button>
      <OperationsDashboard cards={cards} accounts={accounts} />
    </AppShell>
  );
}
