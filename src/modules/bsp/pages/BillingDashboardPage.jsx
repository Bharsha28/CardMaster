import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import BillingDashboard from "../components/BillingDashboard";
import statementService from "../services/statementService";
import paymentService from "../services/paymentService";

export default function BillingDashboardPage() {
  const [statements, setStatements] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    statementService.list().then(setStatements);
    paymentService.list().then(setPayments);
  }, []);

  return (
    <AppShell>
      <PageHeader eyebrow="BSP Dashboard" title="Billing Dashboard" description="Statements, dues, and captured payments." />
      <BillingDashboard statements={statements} payments={payments} />
    </AppShell>
  );
}
