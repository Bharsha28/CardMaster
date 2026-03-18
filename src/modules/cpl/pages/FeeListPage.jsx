import { useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import Table from "../../../shared/components/Table";
import { currency } from "../../../shared/utils/formatters";
import feeService from "../services/feeService";

export default function FeeListPage() {
  const [productId, setProductId] = useState("");
  const [rows, setRows] = useState([]);

  async function loadFees() {
    if (!productId) {
      return;
    }
    const data = await feeService.listByProduct(productId);
    setRows(data.map((row) => ({ ...row, id: row.feeId })));
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="CPL"
        title="Fee Configuration"
        description="The backend lists fees by product, so select a product to view fee rules."
        actionLabel="Add Fee"
        actionTo="/cpl/fees/add"
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="table-toolbar">
          <input className="input" placeholder="Product ID" value={productId} onChange={(event) => setProductId(event.target.value)} />
          <button className="primary-button" type="button" onClick={loadFees}>
            Load Fees
          </button>
        </div>
      </div>
      <Table
        rows={rows}
        searchFields={["feeType"]}
        columns={[
          { key: "feeId", label: "Fee ID" },
          { key: "productId", label: "Product ID" },
          { key: "feeType", label: "Fee Type" },
          { key: "amount", label: "Amount", render: (row) => currency(row.amount) },
        ]}
      />
    </AppShell>
  );
}
