import { useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import Table from "../../../shared/components/Table";
import { currency, dateTime } from "../../../shared/utils/formatters";
import holdService from "../services/holdService";

export default function HoldListPage() {
  const [transactionId, setTransactionId] = useState("");
  const [rows, setRows] = useState([]);

  async function loadHolds() {
    if (!transactionId) {
      return;
    }
    const data = await holdService.listByTransaction(transactionId);
    setRows(data.map((row) => ({ ...row, id: row.holdId })));
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="TAP"
        title="Transaction Holds"
        description="Fetch hold records by transaction ID using the backend hold lookup."
        actionLabel="Create Hold"
        actionTo="/tap/holds/add"
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="table-toolbar">
          <input className="input" placeholder="Transaction ID" value={transactionId} onChange={(event) => setTransactionId(event.target.value)} />
          <button className="primary-button" type="button" onClick={loadHolds}>
            Load Holds
          </button>
        </div>
      </div>
      <Table
        rows={rows}
        searchFields={["holdId", "transactionId"]}
        columns={[
          { key: "holdId", label: "Hold ID" },
          { key: "transactionId", label: "Transaction ID" },
          { key: "amount", label: "Amount", render: (row) => currency(row.amount) },
          { key: "holdDate", label: "Hold Date", render: (row) => dateTime(row.holdDate) },
          { key: "releaseDate", label: "Release Date", render: (row) => dateTime(row.releaseDate) },
        ]}
      />
    </AppShell>
  );
}
