import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import DashboardCards from "../../../shared/components/DashboardCards";
import Table from "../../../shared/components/Table";
import { useAuth } from "../../../context/AuthContext";
import { currency, date, dateTime } from "../../../shared/utils/formatters";
import customerService from "../services/customerService";
import applicationService from "../services/applicationService";
import documentService from "../services/documentService";
import cardService from "../../cias/services/cardService";
import accountService from "../../cias/services/accountService";
import transactionService from "../../tap/services/transactionService";
import statementService from "../../bsp/services/statementService";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [card, setCard] = useState(null);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [statements, setStatements] = useState([]);
  const [statementFilter, setStatementFilter] = useState({ from: "", to: "" });

  useEffect(() => {
    async function loadCustomerData() {
      if (user?.role === "CUSTOMER") {
        const currentCustomer = await customerService.getCurrentCustomer(user);
        setCustomer(currentCustomer);

        const currentApplications = currentCustomer?.customerId
          ? await applicationService.getByCustomer(currentCustomer.customerId)
          : [];
        setApplications(currentApplications);

        const allDocuments = await documentService.list();
        const applicationIds = new Set(currentApplications.map((item) => item.applicationId));
        setDocuments(allDocuments.filter((item) => applicationIds.has(item.applicationId)));
      } else {
        const customers = await customerService.list();
        const allApplications = await applicationService.list();
        const allDocuments = await documentService.list();
        setCustomer(customers[0] || null);
        setApplications(allApplications);
        setDocuments(allDocuments);
      }

      const [currentCard, currentAccount, allTransactions, allStatements] = await Promise.all([
        cardService.getById(1).catch(() => null),
        accountService.getById(1).catch(() => null),
        transactionService.list().catch(() => []),
        statementService.list().catch(() => []),
      ]);

      setCard(currentCard);
      setAccount(currentAccount);
      setTransactions(currentAccount ? allTransactions.filter((item) => item.accountId === currentAccount.accountId) : allTransactions);
      setStatements(currentAccount ? allStatements.filter((item) => item.accountId === currentAccount.accountId) : allStatements);
    }

    loadCustomerData();
  }, [user]);

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((left, right) => new Date(right.transactionDate) - new Date(left.transactionDate))
        .slice(0, 5)
        .map((item) => ({ ...item, id: item.transactionId })),
    [transactions],
  );

  const filteredStatements = useMemo(() => {
    return statements
      .filter((statement) => {
        const fromOk = !statementFilter.from || statement.periodStart >= statementFilter.from;
        const toOk = !statementFilter.to || statement.periodEnd <= statementFilter.to;
        return fromOk && toOk;
      })
      .map((item) => ({ ...item, id: item.statementId }));
  }, [statements, statementFilter]);

  if (user?.role !== "CUSTOMER") {
    return (
      <AppShell>
        <PageHeader
          title={user?.role === "OFFICER" ? "Branch Dashboard" : "Customer Dashboard"}
          description="A quick view of customer onboarding, application throughput, and document readiness."
        />
        <DashboardCards
          cards={[
            { label: "Applications", value: applications.length, caption: "Tracked applications" },
            { label: "Documents", value: documents.length, caption: "Document records" },
            { label: "Customers", value: customer ? 1 : 0, caption: "Customer profile in focus" },
          ]}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Customer Dashboard"
        description="Track your card, balances, application progress, documents, recent transactions, and statements in one place."
      />

      <DashboardCards
        cards={[
          { label: "Available Limit", value: account?.availableLimit || 0, caption: "Spendable balance", type: "currency" },
          { label: "Credit Limit", value: account?.creditLimit || 0, caption: "Approved account limit", type: "currency" },
          { label: "Open Statements", value: statements.filter((item) => item.status === "OPEN").length, caption: "Statements awaiting payment" },
          { label: "Applications", value: applications.length, caption: "Submitted credit card applications" },
        ]}
      />

      <div className="view-grid" style={{ marginTop: 16 }}>
        <div className="view-item">
          <span>Customer Name</span>
          <strong>{customer?.name || "-"}</strong>
        </div>
        <div className="view-item">
          <span>Card Number</span>
          <strong>{card?.maskedCardNumber || "No card issued yet"}</strong>
        </div>
        <div className="view-item">
          <span>Card Status</span>
          <strong>{card?.status || "-"}</strong>
        </div>
        <div className="view-item">
          <span>Latest Application Status</span>
          <strong>{applications[0]?.status || "No application yet"}</strong>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="page-header" style={{ marginBottom: 12 }}>
          <div>
            <h1 style={{ fontSize: "1.25rem" }}>Quick Actions</h1>
            <p className="page-header__description">Apply for a card or upload documents to support your application.</p>
          </div>
        </div>
        <div className="table-actions">
          <Link className="primary-button" to="/paa/applications/add">
            Apply for Card
          </Link>
          <Link className="ghost-button" to="/paa/documents/add">
            Upload Documents
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Table
          rows={applications.map((item) => ({ ...item, id: item.applicationId }))}
          searchFields={["status"]}
          pageSize={5}
          columns={[
            { key: "applicationId", label: "Application ID" },
            { key: "applicationDate", label: "Date", render: (row) => date(row.applicationDate) },
            { key: "requestedLimit", label: "Requested Limit", render: (row) => currency(row.requestedLimit) },
            { key: "status", label: "Status" },
          ]}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <Table
          rows={recentTransactions}
          searchFields={["merchant", "status", "channel"]}
          pageSize={5}
          columns={[
            { key: "transactionId", label: "Transaction ID" },
            { key: "merchant", label: "Merchant" },
            { key: "amount", label: "Amount", render: (row) => currency(row.amount) },
            { key: "transactionDate", label: "Date", render: (row) => dateTime(row.transactionDate) },
            { key: "status", label: "Status" },
          ]}
        />
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="table-toolbar">
          <input
            className="input"
            type="date"
            value={statementFilter.from}
            onChange={(event) => setStatementFilter((value) => ({ ...value, from: event.target.value }))}
          />
          <input
            className="input"
            type="date"
            value={statementFilter.to}
            onChange={(event) => setStatementFilter((value) => ({ ...value, to: event.target.value }))}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Table
          rows={filteredStatements}
          searchFields={["status"]}
          pageSize={5}
          columns={[
            { key: "statementId", label: "Statement ID" },
            { key: "periodStart", label: "Period Start", render: (row) => date(row.periodStart) },
            { key: "periodEnd", label: "Period End", render: (row) => date(row.periodEnd) },
            { key: "totalDue", label: "Total Due", render: (row) => currency(row.totalDue) },
            { key: "minimumDue", label: "Minimum Due", render: (row) => currency(row.minimumDue) },
            { key: "status", label: "Status" },
          ]}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <Table
          rows={documents.map((item) => ({ ...item, id: item.documentId }))}
          searchFields={["documentType", "status"]}
          pageSize={5}
          columns={[
            { key: "documentId", label: "Document ID" },
            { key: "documentType", label: "Document Type" },
            { key: "uploadedDate", label: "Uploaded", render: (row) => date(row.uploadedDate) },
            { key: "status", label: "Status" },
          ]}
        />
      </div>
    </AppShell>
  );
}
