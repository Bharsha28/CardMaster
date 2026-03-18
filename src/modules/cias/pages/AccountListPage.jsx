import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import Table from "../../../shared/components/Table";
import { useAuth } from "../../../context/AuthContext";
import { canManageAccounts } from "../../../shared/utils/access";
import { currency, date } from "../../../shared/utils/formatters";
import accountService from "../services/accountService";

export default function AccountListPage() {
  const { user } = useAuth();
  const [accountId, setAccountId] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user?.role === "CUSTOMER") {
      accountService
        .getById(1)
        .then((account) => setRows(account ? [{ ...account, id: account.accountId }] : []))
        .catch(() => setRows([]));
    }
  }, [user?.role]);

  async function searchAccount() {
    if (!accountId) {
      return;
    }
    const account = await accountService.getById(accountId);
    setRows([{ ...account, id: account.accountId }]);
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="CIAS"
        title={user?.role === "CUSTOMER" ? "My Account" : "Accounts"}
        description={
          user?.role === "CUSTOMER"
            ? "View the card account tied to your access."
            : "Account setup lookup. The current backend exposes account fetch by ID, not a list endpoint."
        }
        actionLabel={canManageAccounts(user?.role) ? "Create Account" : null}
        actionTo={canManageAccounts(user?.role) ? "/cias/accounts/add" : null}
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="table-toolbar">
          <input className="input" placeholder="Account ID" value={accountId} onChange={(event) => setAccountId(event.target.value)} />
          <button className="primary-button" type="button" onClick={searchAccount}>
            Search
          </button>
        </div>
      </div>
      <Table
        rows={rows}
        searchFields={["accountId", "status"]}
        actions={(row) => (
          <div className="table-actions">
            <Link className="text-link" to={`/cias/accounts/${row.id}/view`}>
              View
            </Link>
            {canManageAccounts(user?.role) ? (
              <Link className="text-link" to={`/cias/accounts/${row.id}/edit`}>
                Edit
              </Link>
            ) : null}
          </div>
        )}
        columns={[
          { key: "accountId", label: "Account ID" },
          { key: "cardId", label: "Card ID" },
          { key: "creditLimit", label: "Credit Limit", render: (row) => currency(row.creditLimit) },
          { key: "availableLimit", label: "Available Limit", render: (row) => currency(row.availableLimit) },
          { key: "openDate", label: "Open Date", render: (row) => date(row.openDate) },
          { key: "status", label: "Status" },
        ]}
      />
    </AppShell>
  );
}
