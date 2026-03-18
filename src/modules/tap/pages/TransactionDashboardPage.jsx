import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import TransactionDashboard from "../components/TransactionDashboard";
import transactionService from "../services/transactionService";
import holdService from "../services/holdService";

export default function TransactionDashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [holds, setHolds] = useState([]);

  useEffect(() => {
    transactionService.list().then(setTransactions);
  }, []);

  useEffect(() => {
    const transactionId = transactions[0]?.transactionId;
    if (transactionId) {
      holdService.listByTransaction(transactionId).then(setHolds).catch(() => setHolds([]));
    }
  }, [transactions]);

  return (
    <AppShell>
      <PageHeader eyebrow="TAP Dashboard" title="Transaction Dashboard" description="Authorization and hold activity across the transaction pipeline." />
      <TransactionDashboard transactions={transactions} holds={holds} />
    </AppShell>
  );
}
